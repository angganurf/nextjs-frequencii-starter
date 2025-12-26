import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendProductEmail, sendAdminNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
	const privateKey = process.env.TRIPAY_PRIVATE_KEY;

	if (!privateKey) {
		console.error("TRIPAY_PRIVATE_KEY is not defined");
		return NextResponse.json(
			{ success: false, message: "Server configuration error" },
			{ status: 500 }
		);
	}

	try {
		const signature = req.headers.get("x-callback-signature");
		const body = await req.json();
		const event = req.headers.get("x-callback-event");

		if (!signature) {
			return NextResponse.json(
				{ success: false, message: "Signature is required" },
				{ status: 400 }
			);
		}

		// specific logic for signature calculation in callback
		// Signature = HMAC-SHA256(JSON.stringify(body), privateKey)
		const hmac = crypto.createHmac("sha256", privateKey);
		const calculatedSignature = hmac.update(JSON.stringify(body)).digest("hex");

		// Perform secure comparison
		if (signature !== calculatedSignature) {
			console.warn("Invalid Tripay Callback Signature", {
				received: signature,
				calculated: calculatedSignature,
			});
			return NextResponse.json(
				{ success: false, message: "Invalid signature" },
				{ status: 400 }
			);
		}

		// Handle 'payment_status' event
		if (event === "payment_status") {
			const { merchant_ref, status, customer_email, customer_name } = body;

			if (status === "PAID") {
				console.log(`Payment received for order ${merchant_ref}`);

				// 1. Database: Update Transaction & User
				try {
					const tripayReference = body.reference;

					const transaction = await prisma.transaction.findUnique({
						where: { referenceId: tripayReference },
						include: { user: true },
					});

					if (transaction) {
						// Generate Credentials
						const cleanName = (customer_name || "user")
							.replace(/\s+/g, "")
							.toLowerCase()
							.slice(0, 10);
						const username = `${cleanName}${crypto
							.randomBytes(2)
							.toString("hex")}`;
						const plainPassword = crypto
							.randomInt(10000000, 99999999)
							.toString(); // 8 digit number

						const hashedPassword = await bcrypt.hash(plainPassword, 10);

						// Update User
						await prisma.user.update({
							where: { id: transaction.userId },
							data: {
								isActive: true,
								username: username,
								password: hashedPassword, // Hashed password
							},
						});

						// Update Transaction
						await prisma.transaction.update({
							where: { id: transaction.id },
							data: { status: "PAID" },
						});

						if (customer_email) {
							// Calc fees from callback payload
							// Tripay sends: total_amount, fee_merchant, fee_customer, amount_received
							// We construct the invoice based on what the customer PAID (total_amount)
							const totalAmount = body.total_amount || 95000;
							const amount = 95000; // Base Price
							const fee = body.total_fee || totalAmount - amount;
							const invoiceData = {
								date: new Date().toLocaleDateString("id-ID", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								}),
								orderId: merchant_ref,
								productName: "Editin Foto Premium - Unlimited",
								price: amount,
								fee: fee,
								total: totalAmount,
							};

							const emailSent = await sendProductEmail({
								to: customer_email,
								customerName: customer_name || "Customer",
								credentials: { username, password: plainPassword },
								invoice: invoiceData,
							});
							if (emailSent) {
								console.log(`Product email sent to ${customer_email}`);

								// Send Admin Notification
								await sendAdminNotification({
									customerName: customer_name || "Customer",
									customerEmail: customer_email,
									amount: totalAmount,
									credentials: { username, password: plainPassword },
									invoice: invoiceData,
								});
							} else {
								console.error(
									`Failed to send product email to ${customer_email}`
								);
							}
						}
					} else {
						console.error(
							`Transaction not found for reference: ${tripayReference}`
						);
					}
				} catch (dbError) {
					console.error("Database Error in Callback:", dbError);
				}
			} else if (status === "EXPIRED" || status === "FAILED") {
				console.log(`Payment failed/expired for order ${merchant_ref}`);
				// Optional: Update transaction status to SHL
				const tripayReference = body.reference;
				if (tripayReference) {
					await prisma.transaction
						.update({
							where: { referenceId: tripayReference },
							data: { status: status },
						})
						.catch((e) => console.error("Failed to update failed status", e));
				}
			}
		}

		// Always return success to Tripay to acknowledge receipt
		return NextResponse.json({ success: true });
	} catch (error: any) {
		console.error("Tripay Callback Error:", error);
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 500 }
		);
	}
}

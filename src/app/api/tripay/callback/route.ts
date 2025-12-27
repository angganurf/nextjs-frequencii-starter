import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendProductEmail, sendAdminNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
	const privateKey = process.env.TRIPAY_PRIVATE_KEY;

	console.log("=== TRIPAY CALLBACK RECEIVED ===");
	console.log("Timestamp:", new Date().toISOString());

	if (!privateKey) {
		console.error("❌ TRIPAY_PRIVATE_KEY is not defined");
		return NextResponse.json(
			{ success: false, message: "Server configuration error" },
			{ status: 500 }
		);
	}

	try {
		const signature = req.headers.get("x-callback-signature");
		const rawBody = await req.text();
		const body = JSON.parse(rawBody);
		const event = req.headers.get("x-callback-event");

		console.log("📨 Event:", event);
		console.log("📦 Body:", JSON.stringify(body, null, 2));

		if (!signature) {
			console.error("❌ Missing signature header");
			return NextResponse.json(
				{ success: false, message: "Signature is required" },
				{ status: 400 }
			);
		}

		// Signature calculation - use rawBody for consistency
		const hmac = crypto.createHmac("sha256", privateKey);
		const calculatedSignature = hmac.update(rawBody).digest("hex");

		console.log("🔐 Received signature:", signature);
		console.log("🔐 Calculated signature:", calculatedSignature);

		// Perform secure comparison
		if (signature !== calculatedSignature) {
			console.warn("❌ Invalid Tripay Callback Signature");
			return NextResponse.json(
				{ success: false, message: "Invalid signature" },
				{ status: 400 }
			);
		}

		console.log("✅ Signature validated successfully");

		// Handle 'payment_status' event
		if (event === "payment_status") {
			const { merchant_ref, status, customer_email, customer_name, reference } =
				body;

			console.log("📋 Payment Status Details:");
			console.log("   - Merchant Ref:", merchant_ref);
			console.log("   - Tripay Reference:", reference);
			console.log("   - Status:", status);
			console.log("   - Customer Email:", customer_email);
			console.log("   - Customer Name:", customer_name);

			if (status === "PAID") {
				console.log(`✅ Payment PAID for order ${merchant_ref}`);

				// 1. Database: Update Transaction & User
				try {
					const tripayReference = reference;
					console.log(
						"🔍 Looking for transaction with reference:",
						tripayReference
					);

					const transaction = await prisma.transaction.findUnique({
						where: { referenceId: tripayReference },
						include: { user: true },
					});

					if (transaction) {
						console.log("✅ Transaction found:", transaction.id);
						console.log("   - User ID:", transaction.userId);
						console.log("   - User Email:", transaction.user.email);
						console.log("   - User Name:", transaction.user.fullName);
						console.log("   - Current Status:", transaction.status);

						// Use user data from database (Tripay callback doesn't include customer info)
						const userEmail = transaction.user.email;
						const userName = transaction.user.fullName || "Customer";

						// Generate Credentials
						const cleanName = (userName || "user")
							.replace(/\s+/g, "")
							.toLowerCase()
							.slice(0, 10);
						const username = `${cleanName}${crypto
							.randomBytes(2)
							.toString("hex")}`;
						const plainPassword = crypto
							.randomInt(10000000, 99999999)
							.toString();

						console.log("🔑 Generated credentials:");
						console.log("   - Username:", username);

						const hashedPassword = await bcrypt.hash(plainPassword, 10);

						// Update User
						await prisma.user.update({
							where: { id: transaction.userId },
							data: {
								isActive: true,
								username: username,
								password: hashedPassword,
							},
						});
						console.log("✅ User updated successfully");

						// Update Transaction
						await prisma.transaction.update({
							where: { id: transaction.id },
							data: { status: "PAID" },
						});
						console.log("✅ Transaction status updated to PAID");

						// Send Email - Use email from database
						if (userEmail) {
							console.log("📧 Preparing to send email to:", userEmail);

							// Check Resend API Key
							const resendKey = process.env.RESEND_API_KEY;
							console.log("📧 RESEND_API_KEY exists:", !!resendKey);
							console.log(
								"📧 RESEND_FROM_EMAIL:",
								process.env.RESEND_FROM_EMAIL
							);

							const totalAmount = body.total_amount || 1000;
							const amount = 1000;
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

							console.log("📧 Invoice data:", JSON.stringify(invoiceData));

							const emailSent = await sendProductEmail({
								to: userEmail,
								customerName: userName,
								credentials: { username, password: plainPassword },
								invoice: invoiceData,
							});

							if (emailSent) {
								console.log(`✅ Product email sent to ${userEmail}`);

								// Send Admin Notification
								const adminSent = await sendAdminNotification({
									customerName: userName,
									customerEmail: userEmail,
									amount: totalAmount,
									credentials: { username, password: plainPassword },
									invoice: invoiceData,
								});
								console.log("✅ Admin notification sent:", adminSent);
							} else {
								console.error(
									`❌ Failed to send product email to ${userEmail}`
								);
							}
						} else {
							console.error("❌ No email found in user record!");
						}
					} else {
						console.error(
							`❌ Transaction NOT FOUND for reference: ${tripayReference}`
						);

						// Try to find by merchant_ref as fallback
						console.log("🔍 Trying to find by merchant_ref:", merchant_ref);
						const allTransactions = await prisma.transaction.findMany({
							take: 5,
							orderBy: { createdAt: "desc" },
						});
						console.log(
							"📋 Recent transactions:",
							allTransactions.map((t) => ({
								id: t.id,
								referenceId: t.referenceId,
								status: t.status,
							}))
						);
					}
				} catch (dbError) {
					console.error("❌ Database Error in Callback:", dbError);
				}
			} else if (status === "EXPIRED" || status === "FAILED") {
				console.log(`⚠️ Payment ${status} for order ${merchant_ref}`);
				const tripayReference = reference;
				if (tripayReference) {
					await prisma.transaction
						.update({
							where: { referenceId: tripayReference },
							data: { status: status },
						})
						.catch((e) => console.error("Failed to update status:", e));
				}
			}
		} else {
			console.log("⚠️ Unhandled event type:", event);
		}

		console.log("=== TRIPAY CALLBACK COMPLETED ===");
		return NextResponse.json({ success: true });
	} catch (error: any) {
		console.error("❌ Tripay Callback Error:", error);
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 500 }
		);
	}
}

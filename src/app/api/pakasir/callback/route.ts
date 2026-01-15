import { NextResponse } from "next/server";
import { sendProductEmail, sendAdminNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(req: Request) {
	const apiKey = process.env.PAKASIR_API_KEY;
	const project = process.env.PAKASIR_PROJECT_ID;

	console.log("=== PAKASIR CALLBACK RECEIVED ===");
	console.log("Timestamp:", new Date().toISOString());

	if (!apiKey || !project) {
		console.error("❌ PAKASIR_API_KEY or PAKASIR_PROJECT_ID is not defined");
		return NextResponse.json(
			{ success: false, message: "Server configuration error" },
			{ status: 500 }
		);
	}

	try {
		const body = await req.json();
		console.log("📦 Body:", JSON.stringify(body, null, 2));

		const { order_id, status, amount } = body;

		if (!order_id) {
			return NextResponse.json(
				{ success: false, message: "Missing order_id" },
				{ status: 400 }
			);
		}

		// Security: Verify transaction status with Pakasir API
		// Docs E. Transaction Detail API
		// GET https://app.pakasir.com/api/transactiondetail?project={slug}&amount={amount}&order_id={order_id}&api_key={api_key}

		const verifyUrl = `https://app.pakasir.com/api/transactiondetail?project=${project}&amount=${amount}&order_id=${order_id}&api_key=${apiKey}`;
		console.log(
			"🔍 Verifying with Pakasir API:",
			verifyUrl.replace(apiKey, "xxx")
		);

		const verifyRes = await fetch(verifyUrl);
		const verifyData = await verifyRes.json();
		console.log("🔍 Verification Data:", JSON.stringify(verifyData, null, 2));

		if (!verifyData.transaction) {
			console.error(
				"❌ Transaction verification failed (not found in Pakasir)"
			);
			return NextResponse.json(
				{ success: false, message: "Transaction verification failed" },
				{ status: 400 }
			);
		}

		let realStatus = verifyData.transaction?.status; // "completed"

		// Development Bypass for Simulation Script
		// Allows testing DB updates without real payment on Pakasir side
		if (process.env.NODE_ENV === "development" && body._dev_simulate === true) {
			console.log("🚧 DEV MODE: Bypassing Pakasir Verification");
			realStatus = "completed";
		}

		if (realStatus === "completed") {
			console.log(`✅ Payment COMPLETED for order ${order_id}`);

			// 1. Database: Update Transaction & User
			try {
				// Find transaction by our order_id (which is stored as referenceId AND maybe we should have stored it as referenceId)
				// IN transaction creation: referenceId: orderId

				const transaction = await prisma.transaction.findFirst({
					where: { referenceId: order_id },
					include: { user: true },
				});

				if (transaction) {
					console.log("✅ Transaction found:", transaction.id);

					// Check if already paid to avoid duplicate processing
					if (transaction.status === "PAID") {
						console.log("⚠️ Transaction already PAID, skipping processing.");
						return NextResponse.json({
							success: true,
							message: "Already processed",
						});
					}

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
					const plainPassword = crypto.randomInt(10000000, 99999999).toString();

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

					// Update Transaction
					await prisma.transaction.update({
						where: { id: transaction.id },
						data: { status: "PAID" },
					});

					// Send Email
					let emailSent = false;
					if (userEmail) {
						const invoiceData = {
							date: new Date().toLocaleDateString("id-ID", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							}),
							orderId: order_id,
							productName: "Editin Foto Premium - Unlimited",
							price: transaction.amount,
							fee: 0, // Pakasir fee logic might differ
							total: transaction.amount,
						};

						const emailResult = await sendProductEmail({
							to: userEmail,
							customerName: userName,
							credentials: { username, password: plainPassword },
							invoice: invoiceData,
						});
						emailSent = !!emailResult;

						if (emailSent) {
							await sendAdminNotification({
								customerName: userName,
								customerEmail: userEmail,
								amount: transaction.amount,
								credentials: { username, password: plainPassword },
								invoice: invoiceData,
							});
						}
					}

					// Send CAPI
					let capiSent = false;
					try {
						const { sendCapiEvent, hashData } = await import("@/lib/capi");
						const userEmailForCapi = userEmail;
						const fullName = transaction.user.fullName || "";
						const nameParts = fullName.trim().toLowerCase().split(/\s+/);
						const fn = nameParts.length > 0 ? nameParts[0] : "";
						const ln = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

						await sendCapiEvent({
							event_name: "Purchase",
							event_id: order_id,
							user_data: {
								client_ip_address: transaction.ipAddress,
								client_user_agent: transaction.userAgent,
								fbp: transaction.fbp,
								fbc: transaction.fbc,
								em: userEmailForCapi ? hashData(userEmailForCapi) : null,
								ph: transaction.customerPhone
									? hashData(transaction.customerPhone)
									: null,
								fn: fn ? hashData(fn) : null,
								ln: ln ? hashData(ln) : null,
								country: hashData("id"),
								external_id: hashData(String(transaction.userId)),
							},
							custom_data: {
								currency: "IDR",
								value: transaction.amount,
								content_name: "Editin Foto Premium - Unlimited",
							},
						});
						capiSent = true;
					} catch (e) {
						console.error("CAPI Error:", e);
					}

					return NextResponse.json({ success: true, capi_sent: capiSent });
				} else {
					console.error(`❌ Transaction NOT FOUND for reference: ${order_id}`);
					return NextResponse.json(
						{ success: false, message: "Transaction not found" },
						{ status: 404 }
					);
				}
			} catch (dbError) {
				console.error("❌ Database Error:", dbError);
				return NextResponse.json(
					{ success: false, message: "Database error" },
					{ status: 500 }
				);
			}
		} else {
			console.log(`⚠️ Transaction status is ${realStatus}, ignored.`);
			return NextResponse.json({ success: true, message: "Ignored status" });
		}
	} catch (error: any) {
		console.error("❌ Pakasir Callback Error:", error);
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 500 }
		);
	}
}

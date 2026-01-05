import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	const apiKey = process.env.TRIPAY_API_KEY;
	const privateKey = process.env.TRIPAY_PRIVATE_KEY;
	const merchantCode = process.env.TRIPAY_MERCHANT_CODE;
	const apiUrl = process.env.TRIPAY_API_URL;

	if (!apiKey || !privateKey || !merchantCode || !apiUrl) {
		return NextResponse.json(
			{ success: false, message: "Server configuration error" },
			{ status: 500 }
		);
	}

	try {
		const body = await req.json();
		const {
			method,
			customer_name,
			customer_email,
			customer_phone,
			customer_city,
			user_agent, // Receive from client body
		} = body;

		// Robust IP Extraction
		const ip =
			req.headers.get("x-forwarded-for")?.split(",")[0] ||
			req.headers.get("x-real-ip") ||
			"127.0.0.1";

		// Prioritize Client-Side User Agent (from body), fallback to Header
		const finalUserAgent =
			user_agent || req.headers.get("user-agent") || "Unknown";

		console.log("📍 Captured IP:", ip);
		console.log("📱 Captured User Agent:", finalUserAgent);
		// Retrieve FB cookies from body (sent by client)
		const { fbp, fbc } = body;

		// Fixed amount for the product
		const amount = 95000;
		const merchantRef = `TRX-${Date.now()}`;
		const expiry = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours

		// data = merchant_code + merchant_ref + amount
		const signaturePayload = merchantCode + merchantRef + amount;
		const signature = crypto
			.createHmac("sha256", privateKey)
			.update(signaturePayload)
			.digest("hex");

		const payload = {
			method,
			merchant_ref: merchantRef,
			amount,
			customer_name,
			customer_email,
			customer_phone,
			order_items: [
				{
					sku: "EDITIN-FOTO-001",
					name: "Editin Foto Premium - Unlimited",
					price: amount,
					quantity: 1,
				},
			],
			return_url: "https://editinfoto.site/payment/success",
			callback_url: "https://editinfoto.site/api/tripay/callback",
			expired_time: expiry,
			signature: signature,
		};

		const response = await fetch(`${apiUrl}transaction/create`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		const data = await response.json();

		if (!response.ok) {
			console.error("Tripay Error Response:", data);
			throw new Error(data.message || "Failed to create transaction");
		}

		// Database Input: Only after successful Tripay Transaction
		if (data.success && data.data) {
			// 1. Find or Create User
			let user = await prisma.user.findUnique({
				where: { email: customer_email },
			});

			if (!user) {
				user = await prisma.user.create({
					data: {
						email: customer_email,
						username: `guest_${Date.now()}`,
						password: crypto.randomBytes(8).toString("hex"),
						fullName: customer_name,
						address: customer_city || null,
						isActive: false,
					},
				});
			} else {
				// Update existing user's address if city is provided
				if (customer_city) {
					await prisma.user.update({
						where: { id: user.id },
						data: { address: customer_city },
					});
				}
			}

			// 2. Create Transaction Record
			await prisma.transaction.create({
				data: {
					userId: user.id,
					amount: amount,
					status: "PENDING",
					referenceId: data.data.reference,
					channel: method,
					// Store CAPI Data
					ipAddress: ip,
					userAgent: finalUserAgent,
					fbp: fbp || null,
					fbc: fbc || null,
					customerPhone: customer_phone,
				},
			});
		}

		return NextResponse.json(data);
	} catch (error: any) {
		console.error("Tripay Transaction Error:", error);
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 500 }
		);
	}
}

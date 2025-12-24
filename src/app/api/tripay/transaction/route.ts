import { NextResponse } from "next/server";
import crypto from "crypto";

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
		const { method, customer_name, customer_email, customer_phone } = body;

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
			return_url: "https://editinfoto.site/payment/success", // Placeholder
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

		return NextResponse.json(data);
	} catch (error: any) {
		console.error("Tripay Transaction Error:", error);
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 500 }
		);
	}
}

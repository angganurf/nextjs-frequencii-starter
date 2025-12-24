import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendProductEmail } from "@/lib/email";

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
			// Note: In some cases, depending on how body is parsed, JSON.stringify might fail to match
			// the raw body used by Tripay. Ensure strict JSON handling.
			// For this starter, we will log invalid signature but strictly return failure.
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

				// Send email product delivery
				if (customer_email) {
					const emailSent = await sendProductEmail(
						customer_email,
						customer_name || "Customer"
					);
					if (emailSent) {
						console.log(`Product email sent to ${customer_email}`);
					} else {
						console.error(`Failed to send product email to ${customer_email}`);
					}
				} else {
					console.warn(
						"No customer email found in callback for:",
						merchant_ref
					);
				}
			} else if (status === "EXPIRED" || status === "FAILED") {
				console.log(`Payment failed/expired for order ${merchant_ref}`);
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

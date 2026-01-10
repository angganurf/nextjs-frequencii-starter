import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	const apiKey = process.env.PAKASIR_API_KEY;
	const project = process.env.PAKASIR_PROJECT_ID; // "depodomain" or similar slug
	// Pakasir creates transaction by method: https://app.pakasir.com/api/transactioncreate/{method}

	if (!apiKey || !project) {
		return NextResponse.json(
			{
				success: false,
				message: "Server configuration error (API Key or Project ID missing)",
			},
			{ status: 500 }
		);
	}

	try {
		const body = await req.json();
		const {
			method, // e.g. "qris", "bca_va"
			customer_name,
			customer_email,
			customer_phone,
			customer_city,
			user_agent,
			fbp,
			fbc,
		} = body;

		// Robust IP Extraction
		const ip =
			req.headers.get("x-forwarded-for")?.split(",")[0] ||
			req.headers.get("x-real-ip") ||
			"127.0.0.1";

		// Prioritize Client-Side User Agent
		const finalUserAgent =
			user_agent || req.headers.get("user-agent") || "Unknown";

		console.log("📍 Captured IP:", ip);
		console.log("📱 Captured User Agent:", finalUserAgent);

		// Fixed amount for the product
		const amount = 95000;
		// Order ID must be unique. Using timestamp + random
		const orderId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

		// Create payload for Pakasir
		const payload = {
			project: project,
			order_id: orderId,
			amount: amount,
			api_key: apiKey,
		};

		console.log("🚀 Creating Pakasir Transaction:", payload);
		console.log(
			`Endpoint: https://app.pakasir.com/api/transactioncreate/${method}`
		);

		const response = await fetch(
			`https://app.pakasir.com/api/transactioncreate/${method}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			}
		);

		const data = await response.json();
		console.log("📦 Pakasir Response:", data);

		// Check if response has payment data
		// Response format: { "payment": { ... } } or error
		if (!data.payment) {
			console.error("Pakasir Transaction Failed:", data);
			throw new Error(JSON.stringify(data));
		}

		// Database Input: Only after successful Pakasir Transaction
		if (data.payment) {
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
			// Map Pakasir data to our schema
			// We store 'order_id' (our generated one) as referenceId for matching in callback
			await prisma.transaction.create({
				data: {
					userId: user.id,
					amount: amount,
					status: "PENDING",
					referenceId: orderId, // Store our locally generated orderId
					channel: method,
					// Store CAPI Data
					ipAddress: ip,
					userAgent: finalUserAgent,
					fbp: fbp || null,
					fbc: fbc || null,
					customerPhone: customer_phone,
				},
			});

			// If QRIS, Pakasir returns a QR string to be converted to image.
			// Or payment_number for VA.
			// We need to return a "checkout_url" or similar to frontend.
			// Since Pakasir is direct API, we might need a custom success page that renders the QR/VA.
			// For now, let's construct a checkout return that fits the frontend expectation if possible,
			// or we modify frontend to handle raw data.
			// BUT, Tripay returns a checkout_url. Pakasir returns raw data (QR string, VA number).
			// To keep it simple without major frontend refactor, we might want to redirect to a local "instruction" page
			// passing the data.

			// For this MVP, let's construct a redirect URL to our own success/instruction page with query params.
			// IMPORTANT: Modify frontend to handle this or just redirect.

			// Update: The current frontend expects `data.data.checkout_url`.
			// We can create a temporary "hosted" page on our side or pass the raw data if we change frontend.
			// Let's stick to the "checkout_url" pattern by pointing to a new page `payment/pakasir-instruction`?
			// Or just return the data structure and let frontend handle it.

			// Let's try to mimic the structure and maybe redirect to a generic success page with params?
			// Actually, Tripay's checkout_url is a hosted page. Pakasir doesn't seem to have one in the same way (it's white label API).
			// We need to build the UI for it.
			// However, the task description says "tanpa menghilangkan atau mengganti logika pembayaran yang sebelumnya".
			// TRIPAY redirects. PAKASIR gives data.
			// I should create a page `src/app/[locale]/payment/pakasir/page.tsx` that acts as the "checkout" page.

			const checkoutUrl = `/payment/pakasir?order_id=${orderId}&amount=${amount}&method=${method}&payment_number=${encodeURIComponent(
				data.payment.payment_number
			)}&expired_at=${encodeURIComponent(data.payment.expired_at)}`;

			return NextResponse.json({
				success: true,
				data: {
					reference: orderId,
					merchant_ref: orderId,
					checkout_url: checkoutUrl,
					payment_details: {
						amount: amount,
						method: method,
						payment_number: data.payment.payment_number,
						expired_at: data.payment.expired_at,
					},
				},
			});
		}

		return NextResponse.json({
			success: false,
			message: "Failed to create transaction",
		});
	} catch (error: any) {
		console.error("Pakasir Transaction Error:", error);
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 500 }
		);
	}
}

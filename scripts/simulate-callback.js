const crypto = require("crypto");
// Load environment variables from .env file
require("dotenv").config({ path: ".env.local" }); // Try .env.local first
require("dotenv").config(); // Fallback to .env

async function simulateCallback() {
    const privateKey = process.env.TRIPAY_PRIVATE_KEY;
    const apiUrl = "http://localhost:3000/api/tripay/callback"; // Adjust port if needed

    if (!privateKey) {
        console.error("❌ Error: TRIPAY_PRIVATE_KEY not found in environment variables.");
        console.error("Make sure you are running this script from the project root.");
        process.exit(1);
    }

    // 1. Create a dummy transaction payload
    // You might need to adjust 'merchant_ref' to match an existing pending transaction in your DB
    // if you want to test the full flow (DB update + Email).
    // Or create a new one via the UI first, grab the ref, and put it here.
    const merchantRef = "TRX-1735950000000"; // Example Ref
    const reference = "DEV-REF-" + Date.now();

    const payload = {
        reference: reference,
        merchant_ref: merchantRef,
        payment_method: "BCAVA",
        payment_method_code: "BCAVA",
        total_amount: 95000,
        fee_merchant: 0,
        fee_customer: 0,
        total_fee: 0,
        amount_received: 95000,
        is_closed_payment: 1,
        status: "PAID",
        paid_at: Math.floor(Date.now() / 1000),
        note: "Simulation",
    };

    const jsonPayload = JSON.stringify(payload);

    // 2. Generate Signature
    const hmac = crypto.createHmac("sha256", privateKey);
    const signature = hmac.update(jsonPayload).digest("hex");

    console.log("🚀 Simulating Tripay Callback...");
    console.log("PAYLOAD:", payload);
    console.log("SIGNATURE:", signature);

    // 3. Send Request
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-callback-event": "payment_status",
                "x-callback-signature": signature,
                "User-Agent": "Tripay/1.0.0 Simulation",
            },
            body: jsonPayload,
        });

        const data = await response.json();
        console.log("RESPONSE status:", response.status);
        console.log("RESPONSE body:", data);

        if (response.ok) {
            console.log("\n✅ Callback simulation successful!");
            console.log("👉 Check your server logs for 'Sending CAPI Purchase Event...'");
        } else {
            console.log("\n❌ Callback failed.");
        }
    } catch (error) {
        console.error("\n❌ Request failed:", error.message);
        if (error.cause) console.error(error.cause);
    }
}

simulateCallback();

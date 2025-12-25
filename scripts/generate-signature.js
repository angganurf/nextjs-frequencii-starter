const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Manually read .env.local to avoid needing 'dotenv' dependency
let privateKey = '';
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/TRIPAY_PRIVATE_KEY=(.*)/);
        if (match && match[1]) {
            privateKey = match[1].trim();
            // Remove quotes if present
            if ((privateKey.startsWith('"') && privateKey.endsWith('"')) ||
                (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
                privateKey = privateKey.slice(1, -1);
            }
        }
    }
} catch (err) {
    console.error('Error reading .env.local:', err.message);
}

if (!privateKey) {
    console.error('Error: TRIPAY_PRIVATE_KEY not found in .env.local');
    console.log('Usage: Ensure your .env.local has TRIPAY_PRIVATE_KEY set.');
    process.exit(1);
}

// The exact JSON body you are sending in request.http
// IMPORTANT: strict JSON stringification must match what is used by the server to verify.
// In the http file, you are sending a JSON body. The signature must be generated from the EXACT string.

const payload = {
    "merchant_ref": "TX1234567890",
    "status": "PAID",
    "customer_email": "angganurfaizal190300@gmail.com",
    "customer_name": "Angga nurfaisal",
    "payment_method": "BCAVA",
    "payment_method_code": "BCAVA",
    "total_amount": 95000,
    "fee_merchant": 0,
    "fee_customer": 0,
    "total_fee": 0,
    "amount_received": 95000,
    "is_closed_payment": 1,
    "reference": "REF123",
    "checkout_url": "https://tripay.co.id/checkout/REF123",
    "status_code": 1,
    "paid_at": 1641234567,
    "note": null
};

const jsonString = JSON.stringify(payload);
const hmac = crypto.createHmac('sha256', privateKey);
const signature = hmac.update(jsonString).digest('hex');

console.log('--- HMAC Signature Generator ---');
console.log('Private Key Used (First 5 chars):', privateKey.substring(0, 5) + '...');
console.log('\nPayload (Copy and replace the body in request.http if needed to ensure whitespace match):');
console.log(jsonString);
console.log('\nX-Callback-Signature (Paste this in request.http):');
console.log(signature);

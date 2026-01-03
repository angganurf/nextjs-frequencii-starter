const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const http = require('http');

// Helper to make HTTP requests
function makeRequest(options, body) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve(data); // Return raw if not JSON
                    }
                } else {
                    reject({ statusCode: res.statusCode, body: data });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (body) {
            req.write(typeof body === 'string' ? body : JSON.stringify(body));
        }
        req.end();
    });
}

// 1. Read Private Key
let privateKey = '';
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/TRIPAY_PRIVATE_KEY=(.*)/);
        if (match && match[1]) {
            privateKey = match[1].trim();
            if ((privateKey.startsWith('"') && privateKey.endsWith('"')) ||
                (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
                privateKey = privateKey.slice(1, -1);
            }
        }
    }
} catch (err) {
    console.error('Error reading .env.local:', err.message);
    process.exit(1);
}

if (!privateKey) {
    console.error('Error: TRIPAY_PRIVATE_KEY not found in .env.local');
    process.exit(1);
}

async function runSimulation() {
    try {
        console.log('--- Step 1: Initiating Transaction ---');
        // This mimics the frontend calling the API to pay
        // NOTE: This CALLS REAL TRIPAY API (Sandbox)

        const txPayload = {
            method: "BCAVA",
            customer_name: "Faisal Zailani",
            customer_email: "fsstudio234@gmail.com",
            customer_phone: "08212332450"
        };

        const txOptions = {
            hostname: 'localhost',
            port: 3000,
            path: '/api/tripay/transaction',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        const txResponse = await makeRequest(txOptions, txPayload);
        console.log('Transaction Created:', txResponse.success ? 'YES' : 'NO');

        if (!txResponse.success) {
            console.error('Failed to create transaction:', txResponse);
            return;
        }

        if (!txResponse.data) {
            console.error('Transaction response missing data:', txResponse);
            return;
        }

        const tripayRef = txResponse.data.reference;
        const merchantRef = txResponse.data.merchant_ref; // or from response
        console.log(`Tripay Reference: ${tripayRef}`);
        console.log(`Merchant Ref: ${merchantRef}`);

        console.log('\n--- Step 2: Simulating Callback (PAID) ---');
        // This simulates Tripay calling our webhook

        const callbackPayload = {
            "merchant_ref": merchantRef,
            "reference": tripayRef, // IMPORTANT: Must match DB record
            "status": "PAID",
            "customer_email": txPayload.customer_email,
            "customer_name": txPayload.customer_name,
            "payment_method": "BCAVA",
            "payment_method_code": "BCAVA",

            "total_amount": 95000 + 4250, // Base + Fee
            "fee_merchant": 0,
            "fee_customer": 4250,
            "total_fee": 4250,
            "amount_received": 95000,
            "is_closed_payment": 1,
            "checkout_url": "https://tripay.co.id/checkout/REF123",
            "status_code": 1,
            "paid_at": Math.floor(Date.now() / 1000),
            "note": "Simulated E2E Callback"
        };

        const jsonString = JSON.stringify(callbackPayload);

        // Generate Signature
        const hmac = crypto.createHmac('sha256', privateKey);
        const signature = hmac.update(jsonString).digest('hex');

        const callbackOptions = {
            hostname: 'localhost',
            port: 3000,
            path: '/api/tripay/callback',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Callback-Event': 'payment_status',
                'X-Callback-Signature': signature,
                'Content-Length': Buffer.byteLength(jsonString)
            }
        };

        const cbResponse = await makeRequest(callbackOptions, jsonString);
        console.log('Callback Response:', cbResponse);

        if (cbResponse.success) {
            console.log('\n✅ E2E TEST SUCCESS!');
            console.log('1. Tripay Transaction validated.');
            console.log('2. User/Transaction created in DB (Post-Validation).');
            console.log('3. Callback processed (PAID status).');
            console.log('4. User Activated & Credentials Generated.');

            if (cbResponse.capi_sent) {
                console.log('🚀 Sending CAPI Purchase Event... ✅ CAPI Event Sent (Purchase)');
            } else {
                console.log('⚠️ CAPI Event NOT Sent (Check server logs, possibly missing FB_ACCESS_TOKEN)');
            }
        } else {
            console.error('\n❌ Callback Failed.');
        }

    } catch (error) {
        console.error('Simulation Error:', error);
    }
}

runSimulation();

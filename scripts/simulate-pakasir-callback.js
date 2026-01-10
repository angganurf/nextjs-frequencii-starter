const fs = require('fs');
const path = require('path');
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

// 1. Read Env
let apiKey = '';
let projectId = '';
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const matchKey = envContent.match(/PAKASIR_API_KEY=(.*)/);
        const matchProj = envContent.match(/PAKASIR_PROJECT_ID=(.*)/);

        if (matchKey && matchKey[1]) apiKey = matchKey[1].trim();
        if (matchProj && matchProj[1]) projectId = matchProj[1].trim();
    }
} catch (err) {
    console.error('Error reading .env.local:', err.message);
    // Continue, maybe env vars are set in process (but this is a script)
}

// Fallback to process.env if running with dotenv preloaded, or just warn
if (!apiKey || !projectId) {
    console.warn('⚠️ Warning: PAKASIR_API_KEY or PAKASIR_PROJECT_ID not found in .env.local parsing. Ensure they are set.');
}

async function runSimulation() {
    try {
        console.log('--- Step 1: Initiating Transaction (PAKASIR) ---');

        const txPayload = {
            method: "qris", // Pakasir method
            customer_name: "Simulated User",
            customer_email: "simulated.pakasir@example.com",
            customer_phone: "081234567890",
            customer_city: "Jakarta",
            user_agent: "SimulationScript/1.0",
            fbp: "fb.1.123456789",
            fbc: "fb.1.987654321"
        };

        const txOptions = {
            hostname: 'localhost',
            port: 3000,
            path: '/api/pakasir/transaction',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        const txResponse = await makeRequest(txOptions, txPayload);
        console.log('Transaction Created:', txResponse.success ? 'YES' : 'NO');

        if (!txResponse.success) {
            console.error('Failed to create transaction:', txResponse);
            return;
        }

        const data = txResponse.data;
        const orderId = data.reference; // This matches referenceId in DB

        console.log(`Order ID: ${orderId}`);
        console.log(`Checkout URL: ${data.checkout_url}`);

        console.log('\n--- Step 2: Simulating Callback (COMPLETED) ---');
        // NOTE: The real Pakasir callback verification checks with the REAL Pakasir API.
        // If we fake the callback here, the server validation will FAIL because this transaction 
        // does not actually exist as "completed" in Pakasir's system (unless we actually paid it).
        // BUT, since we are creating a REAL transaction in Step 1 against Pakasir API (via our route),
        // the transaction DOES exist in Pakasir as pending.
        // The verification step in our callback route checks `transaction.status`.
        // If we just created it, it is likely "pending".
        // SO, we cannot fully simulate a "completed" callback end-to-end without actually paying or mocking the verification.

        // HOWEVER, for development, this script initiates the flow.
        // To really test success, we'd need to mock the `fetch` in the callback route or use a sandbox mode if Pakasir has one that allows auto-complete.
        // Pakasir docs mention: "Jika proyek Anda masih di mode Sandbox, Anda dapat lakukan simulasi pembayaran untuk mengetes webhook."
        // Endpoint: https://app.pakasir.com/api/paymentsimulation

        console.log('ℹ️ Attempting to trigger Pakasir Sandbox Payment Simulation...');

        // Triggers the REAL webhook from Pakasir to our server (if we were on public IP)
        // OR we can call the sandbox simulation API which might update the status on their end,
        // allowing our local verification to pass IF we then call our local callback.

        // Let's try calling Pakasir's payment simulation endpoint first to mark it as paid on THEIR end.
        if (apiKey && projectId) {
            const simPayload = {
                project: projectId,
                order_id: orderId,
                amount: 95000,
                api_key: apiKey
            };

            // This needs to be sent to PAKASIR, not localhost
            console.log('Sending Payment Simulation to Pakasir...');
            // We can't use our simple http wrapper easily for https external, let's use node https or fetch if available (node 18+)
            // Assuming Node 18+
            try {
                const simRes = await fetch('https://app.pakasir.com/api/paymentsimulation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(simPayload)
                });
                const simData = await simRes.json();
                console.log('Pakasir Simulation Response:', simData);

                // If that worked, the status on Pakasir is now "completed".
                // Now we can call our local webhook handler which will verify against Pakasir.

                console.log('\n--- Step 3: Triggering Local Webhook Handler ---');
                const callbackPayload = {
                    amount: 95000,
                    order_id: orderId,
                    project: projectId,
                    status: "completed",
                    payment_method: "qris",
                    completed_at: new Date().toISOString()
                };

                const cbOptions = {
                    hostname: 'localhost',
                    port: 3000,
                    path: '/api/pakasir/callback',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                };

                const cbResponse = await makeRequest(cbOptions, callbackPayload);
                console.log('Callback Response:', cbResponse);

                if (cbResponse.success) {
                    console.log('\n✅ E2E TEST SUCCESS!');
                } else {
                    console.log('\n❌ Callback Failed (Check logs).');
                }

            } catch (e) {
                console.error('Failed to call Pakasir Simulation API:', e);
            }

        } else {
            console.log('❌ Skipping sandbox simulation: Env vars missing in script context.');
        }

    } catch (error) {
        console.error('Simulation Error:', error);
    }
}

runSimulation();

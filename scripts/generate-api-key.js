/**
 * API Key Generator Script
 * 
 * Run with: node scripts/generate-api-key.js
 * 
 * This generates a secure, non-expiring API key that can be used
 * to authenticate external API requests.
 */

const crypto = require('crypto');

function generateApiKey(prefix = 'efk') {
    // Generate 32 random bytes and convert to hex (64 characters)
    const randomPart = crypto.randomBytes(32).toString('hex');

    // Create a prefixed key for easy identification
    // Format: efk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    const apiKey = `${prefix}_${randomPart}`;

    return apiKey;
}

// Generate a new API key
const newApiKey = generateApiKey();

console.log('\n========================================');
console.log('   🔑 API KEY GENERATED SUCCESSFULLY');
console.log('========================================\n');
console.log('Your new API Key (non-expiring):');
console.log(`\n   ${newApiKey}\n`);
console.log('----------------------------------------');
console.log('To use this key:\n');
console.log('1. Add to your .env file:');
console.log(`   EXTERNAL_API_KEY=${newApiKey}\n`);
console.log('2. Send requests with header:');
console.log(`   X-API-KEY: ${newApiKey}\n`);
console.log('========================================\n');

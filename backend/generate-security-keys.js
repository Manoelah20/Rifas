#!/usr/bin/env node
/**
 * Security Keys Generator
 * Generates secure cryptographic keys for your application
 * 
 * Usage: node generate-security-keys.js
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

console.log(`
╔════════════════════════════════════════════════════════════════╗
║         🔒 Security Keys Generator for Raffle System          ║
╚════════════════════════════════════════════════════════════════╝
`);

// Generate keys
const keys = {
  JWT_SECRET: crypto.randomBytes(32).toString('hex'),
  JWT_REFRESH_SECRET: crypto.randomBytes(32).toString('hex'),
  ENCRYPTION_KEY: crypto.randomBytes(32).toString('hex'),
  SESSION_SECRET: crypto.randomBytes(32).toString('hex')
};

console.log(`
Generated Security Keys:
────────────────────────────────────────────────────────────────

📌 JWT_SECRET (for token signing):
${keys.JWT_SECRET}

📌 JWT_REFRESH_SECRET (for refresh tokens):
${keys.JWT_REFRESH_SECRET}

📌 ENCRYPTION_KEY (for data protection):
${keys.ENCRYPTION_KEY}

📌 SESSION_SECRET (for session security):
${keys.SESSION_SECRET}

────────────────────────────────────────────────────────────────

⚠️  IMPORTANT INSTRUCTIONS:

1. Copy these values to your .env file:

   JWT_SECRET=${keys.JWT_SECRET}
   JWT_REFRESH_SECRET=${keys.JWT_REFRESH_SECRET}
   ENCRYPTION_KEY=${keys.ENCRYPTION_KEY}
   SESSION_SECRET=${keys.SESSION_SECRET}

2. NEVER commit these keys to version control
3. Use different keys for each environment (dev, staging, prod)
4. Rotate these keys periodically in production
5. Keep .env file secure and never share these values

✅ Keys are strong and cryptographically secure (256-bit)

For more details, see SECURITY.md
`);

// Option to save to .env.local (for development only)
const args = process.argv.slice(2);
if (args.includes('--save-local')) {
  const envPath = path.join(__dirname, '.env.local');
  
  let envContent = '';
  Object.entries(keys).forEach(([key, value]) => {
    envContent += `${key}=${value}\n`;
  });
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log(`\n✅ Keys saved to ${envPath}`);
    console.log('   ⚠️  Remember to add .env.local to .gitignore\n');
  } catch (error) {
    console.error(`\n❌ Error saving keys: ${error.message}\n`);
  }
}

console.log(`
For production deployment:
- Generate new keys for each environment
- Use a secret management service (AWS Secrets Manager, Azure Key Vault, etc.)
- Implement key rotation policy
- Enable audit logging for key access

════════════════════════════════════════════════════════════════
`);

const crypto = require('crypto');

/**
 * Encryption utility for sensitive data
 * Uses AES-256-GCM for authenticated encryption
 */

class EncryptionService {
  constructor() {
    const encryptionKey =
      process.env.ENCRYPTION_KEY ||
      (process.env.NODE_ENV !== 'production' ? 'dev-fallback-encryption-key' : '');

    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY is not defined in environment variables');
    }

    if (!process.env.ENCRYPTION_KEY && process.env.NODE_ENV !== 'production') {
      console.warn('[security] ENCRYPTION_KEY not set. Using development fallback key.');
    }
    // Ensure key is 32 bytes for AES-256
    this.key = crypto.scryptSync(encryptionKey, 'salt', 32);
  }

  /**
   * Encrypt data
   * @param {string} data - Data to encrypt
   * @returns {string} Encrypted data in format: iv:authTag:encryptedData
   */
  encrypt(data) {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv);
      
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const authTag = cipher.getAuthTag();
      
      // Return iv:authTag:encryptedData for easy parsing
      return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  /**
   * Decrypt data
   * @param {string} encryptedData - Encrypted data in format: iv:authTag:encryptedData
   * @returns {string} Decrypted data
   */
  decrypt(encryptedData) {
    try {
      const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
      
      if (!ivHex || !authTagHex || !encrypted) {
        throw new Error('Invalid encrypted data format');
      }

      const iv = Buffer.from(ivHex, 'hex');
      const authTag = Buffer.from(authTagHex, 'hex');
      
      const decipher = crypto.createDecipheriv('aes-256-gcm', this.key, iv);
      decipher.setAuthTag(authTag);
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  /**
   * Hash data (one-way, for verification)
   * @param {string} data - Data to hash
   * @returns {string} Hashed data
   */
  hash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Generate secure random token
   * @param {number} length - Token length in bytes
   * @returns {string} Random token
   */
  generateSecureToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }
}

module.exports = new EncryptionService();

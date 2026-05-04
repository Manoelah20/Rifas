const fs = require('fs');
const path = require('path');

/**
 * Security Logger - Logs security-related events
 */

class SecurityLogger {
  constructor() {
    this.logsDir = path.join(__dirname, '../logs');
    this.ensureLogsDirectory();
  }

  ensureLogsDirectory() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  /**
   * Format log timestamp
   */
  getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Get log filename with date
   */
  getLogFilename(type = 'security') {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logsDir, `${type}-${date}.log`);
  }

  /**
   * Log security event
   * @param {string} eventType - Type of security event
   * @param {object} details - Event details
   */
  logSecurityEvent(eventType, details) {
    const logEntry = {
      timestamp: this.getTimestamp(),
      type: eventType,
      userId: details.userId || 'anonymous',
      ip: details.ip || 'unknown',
      action: details.action,
      result: details.result || 'unknown',
      details: details.details || {}
    };

    const logMessage = JSON.stringify(logEntry);
    const logFile = this.getLogFilename('security');

    try {
      fs.appendFileSync(logFile, logMessage + '\n');
      console.log(`[SECURITY] ${eventType}: ${JSON.stringify(logEntry)}`);
    } catch (error) {
      console.error('Failed to write security log:', error);
    }
  }

  /**
   * Log authentication event
   */
  logAuthEvent(details) {
    this.logSecurityEvent('AUTH_EVENT', details);
  }

  /**
   * Log suspicious activity
   */
  logSuspiciousActivity(details) {
    this.logSecurityEvent('SUSPICIOUS_ACTIVITY', {
      ...details,
      alert: true
    });
  }

  /**
   * Log data access
   */
  logDataAccess(userId, resource, action) {
    this.logSecurityEvent('DATA_ACCESS', {
      userId,
      action: `${action} on ${resource}`,
      result: 'success'
    });
  }

  /**
   * Log failed validation
   */
  logValidationFailure(details) {
    this.logSecurityEvent('VALIDATION_FAILURE', details);
  }

  /**
   * Log payment event
   */
  logPaymentEvent(details) {
    this.logSecurityEvent('PAYMENT_EVENT', details);
  }
}

module.exports = new SecurityLogger();

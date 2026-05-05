/**
 * Auditoria de Segurança
 * Monitora: login, dados sensíveis, transações, deletions
 */

const fs = require('fs');
const path = require('path');

class AuditLog {
  constructor() {
    this.logDir = process.env.LOG_DIR || './logs';
    this.ensureLogDir();
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Gerar nome do arquivo de log com data
   */
  _getLogFileName(type = 'audit') {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `${date}-${type}.log`);
  }

  /**
   * Registrar evento de auditoria
   */
  logAudit(action, userId, details, severity = 'INFO') {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      action,
      userId,
      details,
      severity,
      ipAddress: details.ipAddress || 'unknown'
    };

    this._writeLog('audit', logEntry);
  }

  /**
   * Registrar acesso a dados sensíveis
   */
  logSensitiveAccess(userId, dataType, raffleId, action) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      action: `SENSITIVE_ACCESS_${dataType}`,
      userId,
      raffleId,
      dataType,
      operation: action,
      severity: 'WARNING'
    };

    this._writeLog('sensitive', logEntry);
  }

  /**
   * Registrar transação/pagamento
   */
  logTransaction(userId, transactionId, amount, status, platform) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      action: 'TRANSACTION',
      userId,
      transactionId,
      amount,
      status,
      platform,
      severity: 'INFO'
    };

    this._writeLog('transaction', logEntry);
  }

  /**
   * Registrar tentativa de autenticação
   */
  logAuthAttempt(email, success, ipAddress, reason = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      action: success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILED',
      email,
      success,
      ipAddress,
      reason,
      severity: success ? 'INFO' : 'WARNING'
    };

    this._writeLog('auth', logEntry);
  }

  /**
   * Registrar exclusão de dados
   */
  logDataDeletion(userId, entityType, entityId, reason) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      action: 'DATA_DELETION',
      userId,
      entityType,
      entityId,
      reason,
      severity: 'CRITICAL'
    };

    this._writeLog('deletion', logEntry);
  }

  /**
   * Registrar alteração de dados sensíveis
   */
  logDataModification(userId, entityType, entityId, changes) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      action: 'DATA_MODIFICATION',
      userId,
      entityType,
      entityId,
      changes,
      severity: 'WARNING'
    };

    this._writeLog('modification', logEntry);
  }

  /**
   * Escrever no arquivo de log
   */
  _writeLog(type, logEntry) {
    const fileName = this._getLogFileName(type);
    const logLine = JSON.stringify(logEntry) + '\n';

    fs.appendFileSync(fileName, logLine);

    // Também registrar em console durante desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      const severity = logEntry.severity;
      const prefix = {
        'INFO': '📋',
        'WARNING': '⚠️',
        'CRITICAL': '🚨'
      }[severity] || '📝';

      console.log(`${prefix} [${type.toUpperCase()}] ${logEntry.action}`);
    }
  }

  /**
   * Ler logs (com filtros)
   */
  readLogs(type = 'audit', days = 7) {
    const fileName = this._getLogFileName(type);

    if (!fs.existsSync(fileName)) {
      return [];
    }

    const logs = fs
      .readFileSync(fileName, 'utf-8')
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(log => {
        if (!log) return false;
        const logDate = new Date(log.timestamp);
        const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        return logDate > cutoffDate;
      });

    return logs;
  }

  /**
   * Exportar logs para análise
   */
  exportLogs(type = 'audit', days = 30) {
    const logs = this.readLogs(type, days);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const exportFileName = path.join(
      this.logDir,
      `export-${type}-${timestamp}.json`
    );

    fs.writeFileSync(exportFileName, JSON.stringify(logs, null, 2));

    return {
      filename: exportFileName,
      recordCount: logs.length,
      period: `${days} days`,
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Limpar logs antigos
   */
  cleanOldLogs(daysToKeep = 90) {
    const cutoffDate = Date.now() - daysToKeep * 24 * 60 * 60 * 1000;

    const files = fs.readdirSync(this.logDir);
    let deletedCount = 0;

    files.forEach(file => {
      const filePath = path.join(this.logDir, file);
      const stats = fs.statSync(filePath);

      if (stats.mtimeMs < cutoffDate) {
        fs.unlinkSync(filePath);
        deletedCount++;
      }
    });

    return { deletedCount, daysKept: daysToKeep };
  }

  /**
   * Gerar relatório de segurança
   */
  generateSecurityReport(days = 7) {
    const authLogs = this.readLogs('auth', days);
    const auditLogs = this.readLogs('audit', days);
    const sensitiveAccessLogs = this.readLogs('sensitive', days);

    const failedLogins = authLogs.filter(log => !log.success).length;
    const successfulLogins = authLogs.filter(log => log.success).length;
    const uniqueUsers = new Set(authLogs.map(log => log.email)).size;

    return {
      period: `${days} days`,
      generatedAt: new Date().toISOString(),
      authentication: {
        totalAttempts: authLogs.length,
        successfulLogins,
        failedLogins,
        failureRate: ((failedLogins / authLogs.length) * 100).toFixed(2) + '%',
        uniqueUsers
      },
      security: {
        totalEvents: auditLogs.length,
        sensitiveAccessAttempts: sensitiveAccessLogs.length,
        dataModifications: auditLogs.filter(log => log.action === 'DATA_MODIFICATION').length,
        deletions: auditLogs.filter(log => log.action === 'DATA_DELETION').length
      },
      topFailureReasons: this._getTopFailureReasons(authLogs, 5)
    };
  }

  /**
   * Obter principais razões de falha
   */
  _getTopFailureReasons(logs, limit = 5) {
    const reasons = {};

    logs
      .filter(log => !log.success && log.reason)
      .forEach(log => {
        reasons[log.reason] = (reasons[log.reason] || 0) + 1;
      });

    return Object.entries(reasons)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([reason, count]) => ({ reason, count }));
  }
}

module.exports = new AuditLog();

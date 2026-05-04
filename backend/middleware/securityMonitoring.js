const SecurityLogger = require('../utils/logger');

/**
 * Security middleware for logging and monitoring
 */

// Log suspicious activities
const logSuspiciousActivity = (req, res, next) => {
  // Check for common attack patterns
  const suspiciousPatterns = [
    /(\bor\b|\band\b|union|select|insert|drop|delete|update|exec|script)/i,
    /<script|onerror|onload|onclick/i,
    /\.\.\//,
    /%00/
  ];

  const bodyStr = JSON.stringify(req.body).toLowerCase();
  const queryStr = JSON.stringify(req.query).toLowerCase();

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(bodyStr) || pattern.test(queryStr)) {
      SecurityLogger.logSuspiciousActivity({
        ip: req.ip,
        userId: req.user?.id,
        action: 'Potential injection attack detected',
        endpoint: req.originalUrl,
        method: req.method,
        details: {
          pattern: pattern.source
        }
      });
      break;
    }
  }

  next();
};

// Log all API access
const logApiAccess = (req, res, next) => {
  const start = Date.now();

  // Capture response
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - start;
    
    SecurityLogger.logSecurityEvent('API_ACCESS', {
      ip: req.ip,
      userId: req.user?.id,
      action: `${req.method} ${req.path}`,
      result: res.statusCode,
      details: {
        statusCode: res.statusCode,
        duration: `${duration}ms`
      }
    });

    originalSend.call(this, data);
  };

  next();
};

// Prevent CSRF attacks via token
const csrfProtection = (req, res, next) => {
  // Only for state-changing requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const token = req.header('X-CSRF-Token') || req.body._csrf;
  const sessionToken = req.session?.csrfToken;

  if (!token || token !== sessionToken) {
    SecurityLogger.logSuspiciousActivity({
      ip: req.ip,
      userId: req.user?.id,
      action: 'CSRF token validation failed',
      endpoint: req.originalUrl,
      method: req.method
    });

    return res.status(403).json({
      success: false,
      error: 'CSRF token inválido ou ausente'
    });
  }

  next();
};

// Validate request size
const validateRequestSize = (maxSize = 10 * 1024 * 1024) => {
  return (req, res, next) => {
    if (req.headers['content-length'] > maxSize) {
      SecurityLogger.logValidationFailure({
        ip: req.ip,
        userId: req.user?.id,
        action: 'Request size exceeded',
        details: {
          contentLength: req.headers['content-length'],
          maxSize
        }
      });

      return res.status(413).json({
        success: false,
        error: 'Requisição muito grande'
      });
    }

    next();
  };
};

// Rate limit per user (in addition to IP rate limiting)
const perUserRateLimit = new Map();

const userRateLimit = (maxRequests = 1000, windowMs = 3600000) => {
  return (req, res, next) => {
    if (!req.user) {
      return next();
    }

    const userId = req.user.id;
    const now = Date.now();

    if (!perUserRateLimit.has(userId)) {
      perUserRateLimit.set(userId, {
        count: 0,
        resetTime: now + windowMs
      });
    }

    const userLimit = perUserRateLimit.get(userId);

    if (now > userLimit.resetTime) {
      userLimit.count = 0;
      userLimit.resetTime = now + windowMs;
    }

    userLimit.count++;

    if (userLimit.count > maxRequests) {
      SecurityLogger.logSuspiciousActivity({
        userId,
        ip: req.ip,
        action: 'Rate limit exceeded',
        details: {
          requestCount: userLimit.count,
          maxAllowed: maxRequests
        }
      });

      return res.status(429).json({
        success: false,
        error: 'Muitas requisições. Tente novamente mais tarde.'
      });
    }

    next();
  };
};

module.exports = {
  logSuspiciousActivity,
  logApiAccess,
  csrfProtection,
  validateRequestSize,
  userRateLimit
};

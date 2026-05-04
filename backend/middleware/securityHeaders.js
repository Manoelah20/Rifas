const loadOptionalMiddleware = (moduleName) => {
  try {
    return require(moduleName);
  } catch (error) {
    console.warn(`[security] Optional dependency not found: ${moduleName}. Using fallback middleware.`);
    return () => (req, res, next) => next();
  }
};

const sanitizeNoSQLPayload = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizeNoSQLPayload);
  }

  if (value && typeof value === 'object') {
    return Object.keys(value).reduce((acc, key) => {
      const sanitizedKey = key.replace(/^\$+/g, '').replace(/\./g, '');
      acc[sanitizedKey] = sanitizeNoSQLPayload(value[key]);
      return acc;
    }, {});
  }

  return value;
};

const xss = loadOptionalMiddleware('xss-clean');
const hpp = loadOptionalMiddleware('hpp');

/**
 * Additional security middleware
 * Applied on top of helmet
 */

const securityHeaders = (app) => {
  // Data sanitization against NoSQL injection
  app.use((req, res, next) => {
    req.body = sanitizeNoSQLPayload(req.body);
    req.query = sanitizeNoSQLPayload(req.query);
    req.params = sanitizeNoSQLPayload(req.params);
    next();
  });

  // Data sanitization against XSS
  app.use(xss());

  // Parameter pollution prevention
  app.use(hpp());

  // Custom security headers
  app.use((req, res, next) => {
    // Enforce HTTPS in production
    if (process.env.NODE_ENV === 'production') {
      if (req.header('x-forwarded-proto') !== 'https') {
        return res.redirect(301, `https://${req.header('host')}${req.url}`);
      }
    }

    // Set additional security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'");
    
    next();
  });

  // Disable powered by header
  app.disable('x-powered-by');
};

module.exports = securityHeaders;

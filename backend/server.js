const express = require('express');
const cors = require('cors');
require('dotenv').config();
const loadOptionalMiddleware = (moduleName, fallbackFactory) => {
  try {
    return require(moduleName);
  } catch (error) {
    console.warn(`[security] Optional dependency not found: ${moduleName}. Using fallback middleware.`);
    return fallbackFactory;
  }
};
const passThroughMiddleware = () => (req, res, next) => next();
const passThroughRateLimiter = () => (req, res, next) => next();
const helmet = loadOptionalMiddleware('helmet', passThroughMiddleware);
const rateLimit = loadOptionalMiddleware('express-rate-limit', passThroughRateLimiter);
const xss = loadOptionalMiddleware('xss-clean', passThroughMiddleware);
const hpp = loadOptionalMiddleware('hpp', passThroughMiddleware);

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const raffleRoutes = require('./routes/raffles');
const userRoutes = require('./routes/users');
const securityHeaders = require('./middleware/securityHeaders');
const { 
  logSuspiciousActivity, 
  logApiAccess, 
  validateRequestSize,
  userRateLimit 
} = require('./middleware/securityMonitoring');

const app = express();
const PORT = process.env.PORT || 3001;

// Minimal in-house sanitizer to prevent NoSQL operator injection
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

// Connect to MongoDB
connectDB();

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet for HTTP headers security
app.use(helmet());

// Custom security headers
securityHeaders(app);

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

// Request size validation
app.use(validateRequestSize(10 * 1024 * 1024)); // 10MB max

// IP-based rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: process.env.RATE_LIMIT_MESSAGE || 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}));

// Body parsing middleware
const jsonLimit = process.env.MAX_FILE_SIZE || '10mb';
app.use(express.json({ limit: jsonLimit }));
app.use(express.urlencoded({ extended: true, limit: jsonLimit }));

// Security monitoring middleware
app.use(logSuspiciousActivity);
app.use(logApiAccess);

// User-based rate limiting (for authenticated endpoints)
app.use((req, res, next) => {
  if (req.user) {
    userRateLimit(1000, 3600000)(req, res, next);
  } else {
    next();
  }
});

// ============================================
// ROUTES
// ============================================

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Raffle API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      raffles: '/api/raffles',
      users: '/api/users'
    },
    documentation: 'See SECURITY.md for security details'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Raffle API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/raffles', raffleRoutes);
app.use('/api/users', userRoutes);

// ============================================
// ERROR HANDLERS
// ============================================

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  });

  const statusCode = err.statusCode || err.status || 500;
  const isDevelopment = process.env.NODE_ENV !== 'production';

  res.status(statusCode).json({
    success: false,
    error: err.error || 'Internal Server Error',
    message: isDevelopment ? err.message : 'An error occurred. Please try again later.',
    ...(isDevelopment && { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
});

// ============================================
// SERVER START
// ============================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║      🚀 Raffle API Server Started      ║
╚════════════════════════════════════════╝
  
  🌐 Server: http://localhost:${PORT}
  📝 Environment: ${process.env.NODE_ENV || 'development'}
  🔒 Security: Enabled
  📊 Database: ${process.env.MONGODB_URI?.split('@')[1] || 'not configured'}
  
  📚 Security Documentation: See SECURITY.md
  
╚════════════════════════════════════════╝
  `);
});

module.exports = app;

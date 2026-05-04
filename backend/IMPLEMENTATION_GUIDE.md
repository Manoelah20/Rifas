# Implementation Guide - Data Protection & Security

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
```bash
# Copy and customize the example file
cp .env.example .env

# Generate secure keys
node -e "console.log('JWT_SECRET:', require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('ENCRYPTION_KEY:', require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('SESSION_SECRET:', require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Update `.env` with Generated Values
```env
# Critical Settings
NODE_ENV=production
JWT_SECRET=<your-generated-jwt-secret>
ENCRYPTION_KEY=<your-generated-encryption-key>
JS_SESSION_SECRET=<your-generated-session-secret>
MONGODB_URI=mongodb://username:password@host:port/database

# Frontend URL
FRONTEND_URL=https://your-frontend-domain.com

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4. Start the Server
```bash
# Development
npm run dev

# Production
npm start
```

## 🔒 Security Features Implemented

### Data Encryption
- ✅ AES-256-GCM encryption for PIX keys
- ✅ AES-256-GCM encryption for phone numbers
- ✅ bcryptjs password hashing (12 salt rounds)

### Authentication & Authorization
- ✅ JWT-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Account lockout after 5 failed login attempts
- ✅ Login attempt tracking

### Input Validation
- ✅ Comprehensive validator library
- ✅ Email validation and normalization
- ✅ Strong password requirements
- ✅ PIX key type validation
- ✅ Payment amount validation

### Protection Against Common Attacks
- ✅ SQL Injection - via parameterized queries and sanitization
- ✅ NoSQL Injection - via mongo-sanitize
- ✅ XSS - via xss-clean
- ✅ HTTP Parameter Pollution - via hpp
- ✅ CSRF - via validation tokens
- ✅ Rate Limiting - IP-based and user-based

### Security Headers
- ✅ Content-Security-Policy
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ X-XSS-Protection
- ✅ Strict-Transport-Security

### Logging & Monitoring
- ✅ Security event logging
- ✅ Failed login tracking
- ✅ Suspicious activity detection
- ✅ Data access logging
- ✅ Payment event logging

## 📋 Pre-Deployment Checklist

Before deploying to production:

- [ ] All `.env` variables configured with unique values
- [ ] `NODE_ENV=production` set
- [ ] HTTPS/SSL certificates configured
- [ ] ENCRYPTION_KEY and JWT_SECRET are secure (32+ characters)
- [ ] Database backups enabled
- [ ] Logging configured
- [ ] CORS origin restricted to production domain
- [ ] Rate limits adjusted for expected load
- [ ] Email credentials verified
- [ ] Payment platforms tested
- [ ] Database connection string uses authentication
- [ ] MongoDB encryption at rest enabled
- [ ] Daily backup strategy implemented

## 🔐 Using the Security Features

### Example: Register with Strong Password
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "SecurePass123@",
    "phone": "11999999999"
  }'
```

### Example: Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "SecurePass123@"
  }'
```

### Example: Create Raffle with PIX Payment
```bash
curl -X POST http://localhost:3001/api/raffles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "iPhone 15 Raffle",
    "description": "Win an iPhone 15 Pro Max!",
    "prize": "iPhone 15 Pro Max 256GB",
    "totalNumbers": 100,
    "pricePerNumber": 10.00,
    "paymentPlatform": "pix",
    "pixKey": "12345678912345",
    "pixKeyType": "cpf",
    "paymentInstructions": "Transfer via PIX",
    "drawDate": "2024-06-01T20:00:00Z"
  }'
```

## 📝 File Structure

```
backend/
├── config/
│   └── database.js              # MongoDB connection
├── controllers/
│   ├── authController.js        # Auth logic
│   └── raffleController.js      # Raffle logic
├── middleware/
│   ├── auth.js                  # JWT verification
│   ├── securityHeaders.js       # Security headers
│   └── securityMonitoring.js    # Threat detection
├── models/
│   ├── User.js                  # User with encryption
│   ├── Raffle.js                # Raffle with encryption
│   └── Ticket.js                # Ticket model
├── routes/
│   ├── auth.js                  # Auth routes
│   ├── raffles.js               # Raffle routes
│   └── users.js                 # User routes
├── utils/
│   ├── encryption.js            # AES-256-GCM encryption
│   ├── logger.js                # Security logging
│   └── validators.js            # Input validation
├── logs/                        # Security logs
├── .env.example                 # Environment template
├── SECURITY.md                  # Security documentation
└── server.js                    # Main server file
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Security Audit
```bash
npm run security:audit
npm run security:check
```

## 📚 Additional Documentation

- [SECURITY.md](./SECURITY.md) - Comprehensive security documentation
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security](https://nodejs.org/en/docs/guides/nodejs-security/)

## 🆘 Troubleshooting

### Encryption Key Error
```
Error: ENCRYPTION_KEY is not defined in environment variables
```
**Solution**: Generate and add ENCRYPTION_KEY to `.env`

### JWT Secret Too Short
```
Error: JWT_SECRET must be at least 32 characters
```
**Solution**: Generate a longer JWT_SECRET using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Database Connection Error
```
Error: MongoDB connection failed
```
**Solution**: Verify MONGODB_URI is correct and MongoDB is running

### Rate Limit Error
```
Error: 429 Too Many Requests
```
**Solution**: Wait 15 minutes or adjust rate limit in `.env`

## 📞 Support

For security issues, contact: security@example.com

**Never commit sensitive information to version control!**

# Security & Data Protection Documentation

## 📋 Overview

This document outlines the comprehensive security measures implemented in the Raffle System to protect user data and ensure secure operations.

## 🔒 Security Features Implemented

### 1. **Encryption & Data Protection**

#### 1.1 Sensitive Data Encryption
- **Algorithm**: AES-256-GCM (Authenticated Encryption with Associated Data)
- **Implementation**: `backend/utils/encryption.js`
- **Protected Fields**:
  - PIX Keys (pixKey)
  - Phone Numbers
  - Personal Identity Numbers (CPF/CNPJ)
  - Payment Information

#### 1.2 Password Security
- **Hashing**: bcryptjs with salt rounds = 12
- **Password Requirements**:
  - Minimum 8 characters, maximum 128 characters
  - Must contain: uppercase, lowercase, number, special character (@$!%*?&)
  - Never transmitted in plaintext
  - Never stored in logs

#### 1.3 Token Security
- **JWT (JSON Web Tokens)**:
  - Expiration: 7 days
  - Algorithm: HS256
  - Refresh tokens: 30 days
  - Stored securely with HttpOnly cookies
  - Algorithm: HS256
  - Stored securely with HttpOnly cookies

### 2. **Authentication & Authorization**

#### 2.1 Multi-Layer Authentication
```
┌─────────────────────────────────────────┐
│ 1. Input Validation & Sanitization      │
│ 2. Credential Verification              │
│ 3. JWT Token Generation                 │
│ 4. Token Verification on Each Request   │
│ 5. Role-Based Access Control (RBAC)     │
└─────────────────────────────────────────┘
```

#### 2.2 Authorization Levels
- **Guest**: Public endpoints only
- **User**: Standard user operations
- **Admin**: Administrative operations

### 3. **Input Validation & Sanitization**

#### 3.1 Validation Rules (in `backend/utils/validators.js`)

| Field | Rules | Purpose |
|-------|-------|---------|
| Email | Valid email format, normalized | Email integrity |
| Password | 8-128 chars, complexity rules | Account security |
| Name | 2-50 chars, allowed characters only | Data quality |
| Phone | Valid Brazilian format | Data validation |
| PIX Key | Type-specific validation | Payment security |
| Amount | 0.01 - 999,999.99 | Transaction limits |
| Title | 3-100 chars, allowed chars | Content moderation |
| Description | 10-500 chars | Content quality |

#### 3.2 Protection Against:
- **SQL Injection**: Parameter sanitization, parameterized queries
- **NoSQL Injection**: Mongo-sanitize library
- **XSS (Cross-Site Scripting)**: xss-clean library
- **HTTP Parameter Pollution (HPP)**: hpp library
- **Oversized Requests**: Request size validation

### 4. **HTTP Security Headers**

Security headers configured via `backend/middleware/securityHeaders.js`:

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
```

### 5. **Rate Limiting**

#### 5.1 IP-Based Rate Limiting
- **Window**: 15 minutes
- **Limit**: 100 requests per IP
- **Applied to**: All `/api/` routes

#### 5.2 User-Based Rate Limiting
- **Window**: 1 hour
- **Limit**: 1,000 requests per user
- **Applied to**: Authenticated endpoints

#### 5.3 Endpoint-Specific Limits
- Login attempts: 5 attempts per 15 minutes
- Password reset: 3 attempts per 24 hours

### 6. **CORS (Cross-Origin Resource Sharing)**

```javascript
{
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}
```

### 7. **Security Logging & Monitoring**

#### 7.1 Events Logged
- Authentication attempts (success/failure)
- Failed validations
- Suspicious activities detected
- Data access operations
- Payment events
- Admin actions

#### 7.2 Log Format
```json
{
  "timestamp": "2024-04-29T10:30:00.000Z",
  "type": "AUTH_EVENT",
  "userId": "user_id",
  "ip": "192.168.1.1",
  "action": "User login",
  "result": "success"
}
```

#### 7.3 Log Files
- Location: `backend/logs/`
- Naming: `{event-type}-{date}.log`
- Archived daily

### 8. **Database Security**

#### 8.1 Connection Security
- MongoDB URI from environment variables
- TLS/SSL encryption in production
- Connection pooling with timeout
- Graceful connection management

#### 8.2 Data Validation
- Schema-level validation in Mongoose
- Field constraints (min/max length, format)
- Type checking
- Unique indexes on sensitive fields

### 9. **Environment Security**

#### 9.1 Configuration via `.env`
```
ENCRYPTION_KEY=<random_hex_string>
JWT_SECRET=<long_random_string>
MONGODB_URI=<connection_string>
FRONTEND_URL=<allowed_origin>
NODE_ENV=production
```

⚠️ **Never commit `.env` files to version control**

#### 9.2 Generate Secure Keys
```bash
# Generate ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 10. **Payment Security**

#### 10.1 PIX Payment Protection
- Encrypted PIX keys storage
- Type validation (CPF, CNPJ, Email, Phone, Random)
- HTTPS-only payment links
- Amount validation (0.01 - 999,999.99)
- Payment platform validation

#### 10.2 PCI Compliance
- Never log full payment information
- Payment details encrypted at rest
- Secure payment gateway integration

## 🔐 Security Checklist

### Before Production Deployment

- [ ] Generated unique `.env` variables (not using example values)
- [ ] Set `NODE_ENV=production`
- [ ] Configured HTTPS/SSL certificates
- [ ] Verified ENCRYPTION_KEY is set and secure
- [ ] Updated FRONTEND_URL to production domain
- [ ] Enabled MongoDB encryption
- [ ] Set strong JWT_SECRET (minimum 32 characters)
- [ ] Configured CORS for production domain only
- [ ] Set up server monitoring and alerting
- [ ] Configured log rotation (daily/weekly)
- [ ] Enabled security audit logging
- [ ] Backup strategy in place
- [ ] Database backups encrypted
- [ ] API rate limits appropriate for production load
- [ ] CORS credentials properly configured
- [ ] Database user has minimal required permissions

### Regular Maintenance

- [ ] Review security logs weekly
- [ ] Update dependencies monthly
- [ ] Rotate encryption keys quarterly
- [ ] Audit user permissions quarterly
- [ ] Test disaster recovery semi-annually
- [ ] Security audit annually

## 🛡️ Best Practices for Users

### User Account Security
1. Use strong, unique passwords
2. Enable two-factor authentication (when available)
3. Never share recovery codes
4. Logout after session ends
5. Use HTTPS-only connections

### Data Privacy
1. Review privacy policy
2. Only provide necessary information
3. Verify HTTPS before entering sensitive data
4. Be cautious with payment information

## 📋 Compliance

This system implements security measures aligned with:

- **OWASP Top 10**: Protection against common vulnerabilities
- **GDPR**: User data protection and privacy
- **PCI DSS**: Payment card data security
- **NIST Cybersecurity Framework**: Best practices

## 🚨 Security Incident Response

### If a breach is suspected:

1. **Immediate Actions**:
   - Stop all operations if necessary
   - Secure affected systems
   - Preserve evidence/logs
   - Contact security team

2. **Investigation**:
   - Review security logs
   - Identify affected data
   - Determine breach timeline
   - Assess data exposure

3. **Notification**:
   - Alert affected users
   - Comply with legal requirements
   - Update security measures
   - Public communication

## 📞 Security Contact

For security issues, please report responsibly to: security@example.com

**Do not disclose security vulnerabilities publicly**

## 📚 Additional Resources

- [OWASP Security Best Practices](https://owasp.org/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/nodejs-security/)
- [MongoDB Security Documentation](https://docs.mongodb.com/manual/security/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Last Updated**: April 29, 2024
**Version**: 1.0.0

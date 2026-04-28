# Raffle Backend API

Backend API for the Raffle System built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- JWT-based authorization
- Raffle management
- Ticket purchasing system
- User profile management
- Input validation and security
- Rate limiting
- CORS support

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
- MongoDB connection string
- JWT secret
- Frontend URL
- Email configuration (optional)

4. Make sure MongoDB is running on your system

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Raffles
- `POST /api/raffles` - Create new raffle (authenticated)
- `GET /api/raffles` - Get all raffles (public)
- `GET /api/raffles/:id` - Get raffle by ID (public)
- `POST /api/raffles/:id/tickets` - Buy tickets (authenticated)
- `GET /api/raffles/my/tickets` - Get user's tickets (authenticated)

### Users
- `GET /api/users/:userId/tickets` - Get user tickets (authenticated)

## Data Models

### User
- name (string, required)
- email (string, required, unique)
- password (string, required)
- phone (string, optional)
- role (enum: user, admin)
- isActive (boolean)

### Raffle
- title (string, required)
- description (string, required)
- prize (string, required)
- prizeImage (string, optional)
- totalNumbers (number, required)
- pricePerNumber (number, required)
- createdBy (ObjectId, ref: User)
- status (enum: active, completed, cancelled)
- drawDate (Date, required)
- winnerNumber (number, optional)
- winnerUser (ObjectId, ref: User, optional)

### Ticket
- raffleId (ObjectId, ref: Raffle)
- userId (ObjectId, ref: User)
- number (number, required)
- status (enum: reserved, paid, cancelled)
- paymentMethod (enum: pix, credit_card, bank_transfer)
- paymentId (string, optional)
- paidAt (Date, optional)
- reservedAt (Date, default: now)
- expiresAt (Date, default: 30 minutes after reservation)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- Input validation
- CORS configuration
- Security headers with Helmet
- Request body size limits

## Environment Variables

```
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/raffle_db
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## Testing

```bash
npm test
```

## License

ISC

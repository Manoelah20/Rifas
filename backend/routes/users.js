const express = require('express');
const { auth } = require('../middleware/auth');
const { getUserTickets } = require('../controllers/raffleController');

const router = express.Router();

// User-specific routes
router.get('/:userId/tickets', auth, getUserTickets);

module.exports = router;

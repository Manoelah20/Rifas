const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../middleware/auth');
const { 
  createRaffle, 
  getRaffles, 
  getRaffleById, 
  buyTicket, 
  getUserTickets 
} = require('../controllers/raffleController');

const router = express.Router();

// Validation rules
const createRaffleValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  
  body('prize')
    .trim()
    .notEmpty()
    .withMessage('Prize is required'),
  
  body('totalNumbers')
    .isInt({ min: 10, max: 10000 })
    .withMessage('Total numbers must be between 10 and 10000'),
  
  body('pricePerNumber')
    .isFloat({ min: 0.01 })
    .withMessage('Price per number must be at least R$ 0,01'),
  
  body('drawDate')
    .isISO8601()
    .withMessage('Draw date must be a valid date')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Draw date must be in the future');
      }
      return true;
    })
];

const buyTicketValidation = [
  body('numbers')
    .isArray({ min: 1, max: 50 })
    .withMessage('You must select between 1 and 50 numbers'),
  
  body('numbers.*')
    .isInt({ min: 1 })
    .withMessage('All numbers must be positive integers')
];

// Routes
router.post('/', auth, createRaffleValidation, createRaffle);
router.get('/', getRaffles);
router.get('/:id', getRaffleById);
router.post('/:id/tickets', auth, buyTicketValidation, buyTicket);
router.get('/my/tickets', auth, getUserTickets);

module.exports = router;

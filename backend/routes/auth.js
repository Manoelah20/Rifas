const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../middleware/auth');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('phone')
    .optional()
    .isMobilePhone('pt-BR')
    .withMessage('Please enter a valid phone number')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  
  body('phone')
    .optional()
    .isMobilePhone('pt-BR')
    .withMessage('Please enter a valid phone number')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfileValidation, updateProfile);

module.exports = router;

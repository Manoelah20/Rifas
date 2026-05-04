const { body, validationResult } = require('express-validator');

/**
 * Comprehensive input validators for all endpoints
 */

const validators = {
  // Email validation
  email: () => 
    body('email')
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail()
      .toLowerCase(),

  // Password validation (strong password requirements)
  password: (fieldName = 'password') =>
    body(fieldName)
      .isLength({ min: 8, max: 128 })
      .withMessage('Senha deve ter entre 8 e 128 caracteres')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
      .withMessage('Senha deve conter: maiúscula, minúscula, número e caractere especial (@$!%*?&)'),

  // Name validation
  name: () =>
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Nome é obrigatório')
      .isLength({ min: 2, max: 50 })
      .withMessage('Nome deve ter entre 2 e 50 caracteres')
      .matches(/^[a-zA-Z\s'-]+$/)
      .withMessage('Nome contém caracteres inválidos'),

  // Phone validation (Brazilian format)
  phone: () =>
    body('phone')
      .optional()
      .isMobilePhone('pt-BR')
      .withMessage('Telefone inválido (formato: 11999999999 ou 1133339999)'),

  // PIX Key validation
  pixKey: () =>
    body('pixKey')
      .trim()
      .notEmpty()
      .withMessage('Chave PIX é obrigatória'),

  // PIX Key Type validation
  pixKeyType: () =>
    body('pixKeyType')
      .isIn(['cpf', 'cnpj', 'email', 'phone', 'random'])
      .withMessage('Tipo de chave PIX inválido'),

  // Payment Link validation
  paymentLink: () =>
    body('paymentLink')
      .optional()
      .isURL({ require_protocol: true, protocols: ['https'] })
      .withMessage('Link de pagamento deve ser uma URL HTTPS válida'),

  // Amount validation
  amount: () =>
    body('amount')
      .isFloat({ min: 0.01, max: 999999.99 })
      .withMessage('Valor deve estar entre R$ 0,01 e R$ 999.999,99'),

  // Raffle title validation
  title: () =>
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Título é obrigatório')
      .isLength({ min: 3, max: 100 })
      .withMessage('Título deve ter entre 3 e 100 caracteres')
      .matches(/^[a-zA-Z0-9\s\-'().,]+$/)
      .withMessage('Título contém caracteres inválidos'),

  // Description validation
  description: () =>
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Descrição é obrigatória')
      .isLength({ min: 10, max: 500 })
      .withMessage('Descrição deve ter entre 10 e 500 caracteres'),

  // Number range validation
  numberRange: (fieldName = 'totalNumbers') =>
    body(fieldName)
      .isInt({ min: 10, max: 10000 })
      .withMessage('Quantidade de números deve estar entre 10 e 10.000'),

  // Date validation (must be future date)
  futureDate: (fieldName = 'drawDate') =>
    body(fieldName)
      .isISO8601()
      .withMessage('Data inválida')
      .custom((value) => {
        if (new Date(value) <= new Date()) {
          throw new Error('Data do sorteio deve estar no futuro');
        }
        return true;
      }),

  // ID validation (MongoDB ObjectId)
  mongoId: () =>
    body('id')
      .isMongoId()
      .withMessage('ID inválido'),

  // Custom error handler
  handleValidationErrors: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validação falhou',
        details: errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }))
      });
    }
    next();
  }
};

module.exports = validators;

/**
 * Middleware para verificar aceitar de termos
 */

const User = require('../models/User');
const auditService = require('../services/auditService');

/**
 * Verificar se usuário aceitou os termos
 */
const checkTermsAcceptance = async (req, res, next) => {
  try {
    // Se é registro, não precisa verificar (ainda)
    if (req.path === '/api/auth/register' && req.method === 'POST') {
      return next();
    }

    // Se é login, não precisa verificar
    if (req.path === '/api/auth/login' && req.method === 'POST') {
      return next();
    }

    // Se é visualizar termos, não precisa verificar
    if (req.path.includes('/terms') || req.path.includes('/privacy')) {
      return next();
    }

    // Para usuários autenticados, verificar aceitar
    if (req.user) {
      const user = await User.findById(req.user.id);

      if (!user.termsAccepted) {
        return res.status(403).json({
          success: false,
          error: 'Você deve aceitar os Termos de Uso',
          code: 'TERMS_NOT_ACCEPTED',
          action: 'Acesse /api/auth/accept-terms para aceitar'
        });
      }
    }

    next();
  } catch (error) {
    console.error('Error in termsAcceptance middleware:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao verificar termos'
    });
  }
};

/**
 * Middleware para exigir age verification (18+)
 */
const checkAgeVerification = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user.id);

      if (!user.ageVerified) {
        return res.status(403).json({
          success: false,
          error: 'Você deve confirmar que tem 18 anos ou mais',
          code: 'AGE_NOT_VERIFIED'
        });
      }
    }

    next();
  } catch (error) {
    console.error('Error in ageVerification middleware:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao verificar age'
    });
  }
};

/**
 * Middleware para rastrear consentimento
 */
const trackConsent = (consentType) => {
  return async (req, res, next) => {
    try {
      if (req.user) {
        auditService.logAudit(
          `CONSENT_${consentType}`,
          req.user.id,
          {
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
          }
        );
      }

      next();
    } catch (error) {
      console.error('Error in trackConsent middleware:', error);
      next(); // Continue mesmo se falhar
    }
  };
};

module.exports = {
  checkTermsAcceptance,
  checkAgeVerification,
  trackConsent
};

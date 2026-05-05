/**
 * Schema update para User model
 * Adicione estes campos:
 */

/*
  termsAccepted: {
    type: Boolean,
    default: false
  },
  termsAcceptedAt: {
    type: Date,
    default: null
  },
  privacyPolicyAccepted: {
    type: Boolean,
    default: false
  },
  privacyPolicyAcceptedAt: {
    type: Date,
    default: null
  },
  platformRulesAccepted: {
    type: Boolean,
    default: false
  },
  platformRulesAcceptedAt: {
    type: Date,
    default: null
  },
  ageVerified: {
    type: Boolean,
    default: false
  },
  ageVerifiedAt: {
    type: Date,
    default: null
  },
  marketingConsent: {
    type: Boolean,
    default: false
  },
  marketingConsentAt: {
    type: Date,
    default: null
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationCode: {
    type: String,
    default: null
  }
*/

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { trackConsent } = require('../middleware/termsMiddleware');
const User = require('../models/User');
const auditService = require('../services/auditService');

/**
 * GET /api/auth/terms
 * Obter texto dos termos (sem autenticação)
 */
router.get('/terms', (req, res) => {
  // Retorna link para os termos (versão frontend)
  res.json({
    success: true,
    data: {
      version: '1.0',
      lastUpdated: '2024-05-04',
      links: {
        termsOfUse: '/TERMS_OF_USE.md',
        privacyPolicy: '/PRIVACY_POLICY.md',
        platformRules: '/PLATFORM_RULES.md'
      }
    }
  });
});

/**
 * POST /api/auth/accept-terms
 * Aceitar Termos de Uso
 */
router.post('/accept-terms', auth, trackConsent('TERMS_OF_USE'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        termsAccepted: true,
        termsAcceptedAt: new Date()
      },
      { new: true }
    );

    auditService.logAudit('TERMS_ACCEPTED', req.user.id, {
      ipAddress: req.ip,
      version: '1.0'
    });

    res.json({
      success: true,
      message: 'Termos de Uso aceitos com sucesso',
      data: {
        acceptedAt: user.termsAcceptedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/auth/accept-privacy-policy
 * Aceitar Política de Privacidade
 */
router.post('/accept-privacy-policy', auth, trackConsent('PRIVACY_POLICY'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        privacyPolicyAccepted: true,
        privacyPolicyAcceptedAt: new Date()
      },
      { new: true }
    );

    auditService.logAudit('PRIVACY_POLICY_ACCEPTED', req.user.id, {
      ipAddress: req.ip,
      version: '1.0'
    });

    res.json({
      success: true,
      message: 'Política de Privacidade aceita com sucesso',
      data: {
        acceptedAt: user.privacyPolicyAcceptedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/auth/accept-platform-rules
 * Aceitar Regras da Plataforma
 */
router.post('/accept-platform-rules', auth, trackConsent('PLATFORM_RULES'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        platformRulesAccepted: true,
        platformRulesAcceptedAt: new Date()
      },
      { new: true }
    );

    auditService.logAudit('PLATFORM_RULES_ACCEPTED', req.user.id, {
      ipAddress: req.ip,
      version: '1.0'
    });

    res.json({
      success: true,
      message: 'Regras da Plataforma aceitas com sucesso',
      data: {
        acceptedAt: user.platformRulesAcceptedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/auth/verify-age
 * Verificar que tem 18+ anos
 */
router.post('/verify-age', auth, async (req, res) => {
  try {
    const { confirmed } = req.body;

    if (!confirmed) {
      return res.status(400).json({
        success: false,
        error: 'Você deve confirmar que tem 18 anos ou mais'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        ageVerified: true,
        ageVerifiedAt: new Date()
      },
      { new: true }
    );

    auditService.logAudit('AGE_VERIFIED', req.user.id, {
      ipAddress: req.ip
    });

    res.json({
      success: true,
      message: 'Verificação de idade confirmada',
      data: {
        ageVerified: true,
        verifiedAt: user.ageVerifiedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/auth/marketing-consent
 * Consentimento para marketing (opcional)
 */
router.post('/marketing-consent', auth, trackConsent('MARKETING'), async (req, res) => {
  try {
    const { agreed } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        marketingConsent: agreed === true,
        marketingConsentAt: new Date()
      },
      { new: true }
    );

    auditService.logAudit('MARKETING_CONSENT_' + (agreed ? 'GIVEN' : 'REFUSED'), req.user.id, {
      ipAddress: req.ip
    });

    res.json({
      success: true,
      message: agreed ? 'Consentimento concedido' : 'Consentimento recusado',
      data: {
        marketingConsent: user.marketingConsent,
        changedAt: user.marketingConsentAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/auth/acceptance-status
 * Ver status de aceitação do usuário
 */
router.get('/acceptance-status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: {
        termsAccepted: user.termsAccepted,
        termsAcceptedAt: user.termsAcceptedAt,
        privacyPolicyAccepted: user.privacyPolicyAccepted,
        privacyPolicyAcceptedAt: user.privacyPolicyAcceptedAt,
        platformRulesAccepted: user.platformRulesAccepted,
        platformRulesAcceptedAt: user.platformRulesAcceptedAt,
        ageVerified: user.ageVerified,
        ageVerifiedAt: user.ageVerifiedAt,
        marketingConsent: user.marketingConsent,
        marketingConsentAt: user.marketingConsentAt,
        allRequired: {
          completed: user.termsAccepted && user.privacyPolicyAccepted && user.ageVerified,
          required: ['termsAccepted', 'privacyPolicyAccepted', 'ageVerified']
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/auth/accept-all-terms
 * Aceitar todos os termos de uma vez
 */
router.post('/accept-all-terms', auth, trackConsent('ALL_TERMS'), async (req, res) => {
  try {
    const { marketingConsent = false } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        termsAccepted: true,
        termsAcceptedAt: new Date(),
        privacyPolicyAccepted: true,
        privacyPolicyAcceptedAt: new Date(),
        platformRulesAccepted: true,
        platformRulesAcceptedAt: new Date(),
        ageVerified: true,
        ageVerifiedAt: new Date(),
        marketingConsent: marketingConsent,
        marketingConsentAt: new Date()
      },
      { new: true }
    );

    auditService.logAudit('ALL_TERMS_ACCEPTED', req.user.id, {
      ipAddress: req.ip,
      marketingConsent
    });

    res.json({
      success: true,
      message: 'Todos os termos e políticas foram aceitos',
      data: {
        allAccepted: true,
        acceptedAt: new Date(),
        marketingConsent: user.marketingConsent
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

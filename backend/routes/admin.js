/**
 * Admin Routes - Gerenciamento e monitoramento
 */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const auditService = require('../services/auditService');

/**
 * Middleware: Verificar se é admin
 */
const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Acesso negado: apenas admins'
      });
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Não autenticado' });
  }
};

/**
 * GET /api/admin/users
 * Listar todos os usuários (admin only)
 */
router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .limit(limit)
      .skip(skip)
      .sort('-createdAt');

    const total = await User.countDocuments();

    auditService.logAudit('ADMIN_VIEW_USERS', req.user.id, {
      ipAddress: req.ip
    });

    res.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
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
 * GET /api/admin/user/:id
 * Ver detalhes de um usuário
 */
router.get('/user/:id', auth, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    auditService.logAudit('ADMIN_VIEW_USER', req.user.id, {
      ipAddress: req.ip,
      targetUserId: req.params.id
    });

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/admin/user/:id/role
 * Alterar role de um usuário
 */
router.put('/user/:id/role', auth, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Role inválido'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    auditService.logAudit('ADMIN_CHANGE_USER_ROLE', req.user.id, {
      ipAddress: req.ip,
      targetUserId: req.params.id,
      newRole: role
    });

    res.json({
      success: true,
      message: 'Role alterado com sucesso',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/admin/user/:id/status
 * Ativar/desativar um usuário
 */
router.put('/user/:id/status', auth, adminOnly, async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');

    auditService.logAudit('ADMIN_CHANGE_USER_STATUS', req.user.id, {
      ipAddress: req.ip,
      targetUserId: req.params.id,
      newStatus: isActive ? 'active' : 'inactive'
    });

    res.json({
      success: true,
      message: `Usuário ${isActive ? 'ativado' : 'desativado'}`,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/admin/security-report
 * Gerar relatório de segurança
 */
router.get('/security-report', auth, adminOnly, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const report = auditService.generateSecurityReport(days);

    auditService.logAudit('ADMIN_SECURITY_REPORT', req.user.id, {
      ipAddress: req.ip,
      days
    });

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/admin/audit-logs
 * Ver logs de auditoria
 */
router.get('/audit-logs', auth, adminOnly, async (req, res) => {
  try {
    const type = req.query.type || 'audit';
    const days = parseInt(req.query.days) || 7;

    const logs = auditService.readLogs(type, days);

    res.json({
      success: true,
      data: logs,
      summary: {
        totalEntries: logs.length,
        type,
        period: `${days} days`
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
 * POST /api/admin/export-audit-logs
 * Exportar logs para análise
 */
router.post('/export-audit-logs', auth, adminOnly, async (req, res) => {
  try {
    const { type = 'audit', days = 30 } = req.body;

    const result = auditService.exportLogs(type, days);

    auditService.logAudit('ADMIN_EXPORT_LOGS', req.user.id, {
      ipAddress: req.ip,
      type,
      days
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/admin/stats
 * Estatísticas gerais do sistema
 */
router.get('/stats', auth, adminOnly, async (req, res) => {
  try {
    const Raffle = require('../models/Raffle');
    const Ticket = require('../models/Ticket');

    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalRaffles = await Raffle.countDocuments();
    const activeRaffles = await Raffle.countDocuments({ status: 'active' });
    const totalTickets = await Ticket.countDocuments();
    const soldTickets = await Ticket.countDocuments({ status: 'sold' });

    const stats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers
      },
      raffles: {
        total: totalRaffles,
        active: activeRaffles,
        completed: await Raffle.countDocuments({ status: 'completed' }),
        cancelled: await Raffle.countDocuments({ status: 'cancelled' })
      },
      tickets: {
        total: totalTickets,
        sold: soldTickets,
        available: totalTickets - soldTickets,
        conversionRate: totalTickets > 0
          ? ((soldTickets / totalTickets) * 100).toFixed(2) + '%'
          : '0%'
      }
    };

    auditService.logAudit('ADMIN_VIEW_STATS', req.user.id, {
      ipAddress: req.ip
    });

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

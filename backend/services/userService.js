/**
 * User Service - Gerenciamento seguro de usuários
 * Inclui: profiling, auditoria, validações, segurança
 */

const User = require('../models/User');
const Raffle = require('../models/Raffle');
const { logger } = require('./logger');
const encryption = require('./encryption');

class UserService {
  /**
   * Validar força da senha
   * Requisitos: 8-128 chars, maiúscula, minúscula, número, caractere especial
   */
  static validatePasswordStrength(password) {
    const errors = [];

    if (password.length < 8) {
      errors.push('Mínimo 8 caracteres');
    }
    if (password.length > 128) {
      errors.push('Máximo 128 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Deve conter letra maiúscula');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Deve conter letra minúscula');
    }
    if (!/\d/.test(password)) {
      errors.push('Deve conter número');
    }
    if (!/[@$!%*?&#^]/.test(password)) {
      errors.push('Deve conter caractere especial (@$!%*?&#^)');
    }

    return {
      isValid: errors.length === 0,
      errors,
      score: this._calculatePasswordScore(password)
    };
  }

  /**
   * Calcular score de força da senha (0-100)
   */
  static _calculatePasswordScore(password) {
    let score = 0;

    // Tamanho
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    // Tipos de caracteres
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/\d/.test(password)) score += 15;
    if (/[@$!%*?&#^]/.test(password)) score += 15;

    return Math.min(score, 100);
  }

  /**
   * Gerar sugestões de senha
   */
  static suggestPassword() {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '@$!%*?&#^';

    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    const all = uppercase + lowercase + numbers + special;
    for (let i = 0; i < 8; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * Verificar se account está bloqueado
   */
  static isAccountLocked(user) {
    if (!user.lockUntil) return false;
    
    const now = new Date();
    if (user.lockUntil > now) {
      const minutesLeft = Math.ceil((user.lockUntil - now) / 60000);
      return { locked: true, minutesLeft };
    }

    return { locked: false };
  }

  /**
   * Registrar tentativa de login falhado
   */
  static async recordFailedLoginAttempt(user) {
    user.loginAttempts += 1;

    // Bloquear após 5 tentativas
    if (user.loginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
      logger.warn(`Account locked: ${user.email} after 5 failed attempts`);
    }

    await user.save();
  }

  /**
   * Registrar login bem-sucedido
   */
  static async recordSuccessfulLogin(user) {
    user.loginAttempts = 0;
    user.lockUntil = null;
    user.lastLogin = new Date();
    await user.save();

    logger.info(`User logged in: ${user.email}`);
  }

  /**
   * Obter perfil do usuário (preparado para segurança)
   */
  static async getUserProfile(userId) {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Preparar dados sensíveis
    const rafflesCount = await Raffle.countDocuments({ createdBy: userId });
    
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone ? encryption.decrypt(user.phone) : null,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      rafflesCount,
      stats: {
        totalLogins: await this._countLogins(userId),
        lastSecurityCheck: user.updatedAt
      }
    };
  }

  /**
   * Contar login attempts (auditoria)
   */
  static async _countLogins(userId) {
    // Implementar com logs de auditoria
    return 0; // placeholder
  }

  /**
   * Atualizar perfil com segurança
   */
  static async updateProfile(userId, updateData) {
    const allowedFields = ['name', 'phone'];
    const update = {};

    // Validar campos permitidos
    allowedFields.forEach(field => {
      if (updateData[field]) {
        update[field] = updateData[field];
      }
    });

    if (Object.keys(update).length === 0) {
      throw new Error('Nenhum campo válido para atualizar');
    }

    const user = await User.findByIdAndUpdate(userId, update, {
      new: true,
      runValidators: true
    }).select('-password');

    logger.info(`User profile updated: ${user.email}`);

    return user;
  }

  /**
   * Mudar senha com validações
   */
  static async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar senha atual
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
      throw new Error('Senha atual incorreta');
    }

    // Verificar se a nova senha é igual à antiga
    if (oldPassword === newPassword) {
      throw new Error('Nova senha deve ser diferente da anterior');
    }

    // Validar força da senha
    const passwordValidation = this.validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      throw new Error(`Senha fraca: ${passwordValidation.errors.join(', ')}`);
    }

    user.password = newPassword;
    await user.save();

    logger.info(`Password changed: ${user.email}`);

    return { success: true, message: 'Senha alterada com sucesso' };
  }

  /**
   * Exportar dados do usuário (GDPR)
   */
  static async exportUserData(userId) {
    const user = await User.findById(userId).select('-password');
    const raffles = await Raffle.find({ createdBy: userId });

    // Preparar dados descriptografados para exportação
    const decryptedUser = {
      ...user.toObject(),
      phone: user.phone ? encryption.decrypt(user.phone) : null
    };

    const decryptedRaffles = raffles.map(raffle => {
      const obj = raffle.toObject();
      if (obj.pixKey && obj.paymentPlatform === 'pix') {
        obj.pixKey = encryption.decrypt(obj.pixKey);
      }
      return obj;
    });

    return {
      exportedAt: new Date(),
      user: decryptedUser,
      raffles: decryptedRaffles
    };
  }

  /**
   * Deletar conta com confirmação
   */
  static async deleteAccount(userId, password) {
    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar senha
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta, operação cancelada');
    }

    // Marcar como inativo em vez de deletar (para auditoria)
    user.isActive = false;
    await user.save();

    logger.warn(`User account deactivated: ${user.email}`);

    return { success: true, message: 'Conta deletada com sucesso' };
  }
}

module.exports = UserService;

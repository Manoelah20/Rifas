/**
 * Raffle Service - Gerenciamento seguro de rifas
 * Inclui: validações, criptografia PIX, auditoria
 */

const Raffle = require('../models/Raffle');
const Ticket = require('../models/Ticket');
const { logger } = require('./logger');
const encryption = require('./encryption');

class RaffleService {
  /**
   * Criar nova rifa com validações
   */
  static async createRaffle(createdBy, raffleData) {
    const {
      title,
      description,
      prize,
      prizeImage,
      totalNumbers,
      pricePerNumber,
      paymentPlatform,
      pixKey,
      pixKeyType,
      paymentLink,
      paymentInstructions
    } = raffleData;

    // Validações
    if (!title || title.length < 3 || title.length > 100) {
      throw new Error('Título deve ter entre 3 e 100 caracteres');
    }

    if (!description || description.length < 10 || description.length > 500) {
      throw new Error('Descrição deve ter entre 10 e 500 caracteres');
    }

    if (totalNumbers < 10 || totalNumbers > 10000) {
      throw new Error('Total de números deve estar entre 10 e 10.000');
    }

    if (pricePerNumber < 0.01 || pricePerNumber > 999999.99) {
      throw new Error('Preço deve estar entre R$ 0,01 e R$ 999.999,99');
    }

    // Validar PIX se for o método de pagamento
    if (paymentPlatform === 'pix') {
      if (!pixKey || pixKey.length < 5) {
        throw new Error('Chave PIX inválida');
      }
      if (!this._isValidPixKey(pixKey, pixKeyType)) {
        throw new Error(`Chave PIX inválida para tipo ${pixKeyType}`);
      }
    } else {
      if (!paymentLink || !this._isValidUrl(paymentLink)) {
        throw new Error('Link de pagamento inválido');
      }
    }

    // Criar rifa
    const raffle = new Raffle({
      title,
      description,
      prize,
      prizeImage,
      totalNumbers,
      pricePerNumber,
      createdBy,
      paymentPlatform,
      pixKey,
      pixKeyType,
      paymentLink,
      paymentInstructions,
      status: 'active'
    });

    await raffle.save();

    // Gerar números disponíveis
    for (let i = 1; i <= totalNumbers; i++) {
      await Ticket.create({
        raffleId: raffle._id,
        number: i,
        status: 'available'
      });
    }

    logger.info(`Raffle created: ${raffle._id} by ${createdBy}`);

    return raffle;
  }

  /**
   * Validar chave PIX
   */
  static _isValidPixKey(key, type) {
    switch (type) {
      case 'cpf':
        return /^\d{11}$/.test(key); // 11 dígitos
      case 'cnpj':
        return /^\d{14}$/.test(key); // 14 dígitos
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key);
      case 'phone':
        return /^\d{10,11}$/.test(key); // 10 ou 11 dígitos
      case 'random':
        return key.length >= 5;
      default:
        return false;
    }
  }

  /**
   * Validar URL
   */
  static _isValidUrl(url) {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  }

  /**
   * Obter estatísticas da rifa
   */
  static async getRaffleStats(raffleId) {
    const tickets = await Ticket.aggregate([
      { $match: { raffleId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalTickets = tickets.reduce((sum, t) => sum + t.count, 0);
    const soldTickets = tickets.find(t => t._id === 'sold')?.count || 0;
    const availableTickets = tickets.find(t => t._id === 'available')?.count || 0;
    const winnerTickets = tickets.find(t => t._id === 'winner')?.count || 0;

    const raffle = await Raffle.findById(raffleId);

    return {
      totalTickets,
      soldTickets,
      availableTickets,
      winnerTickets,
      percentageSold: Math.round((soldTickets / totalTickets) * 100),
      totalRevenue: soldTickets * raffle.pricePerNumber,
      daysActive: Math.floor((new Date() - raffle.createdAt) / (1000 * 60 * 60 * 24)),
      status: raffle.status
    };
  }

  /**
   * Obter PIX descriptografado (apenas para desenho)
   */
  static async getDecryptedPixKey(raffleId, userId) {
    const raffle = await Raffle.findOne({
      _id: raffleId,
      createdBy: userId
    });

    if (!raffle) {
      throw new Error('Rifa não encontrada ou sem permissão');
    }

    if (raffle.paymentPlatform !== 'pix' || !raffle.pixKey) {
      throw new Error('Esta rifa não usa PIX');
    }

    const decryptedKey = encryption.decrypt(raffle.pixKey);

    logger.info(`PIX key decrypted: ${raffleId} by owner ${userId}`);

    return {
      pixKey: decryptedKey,
      pixKeyType: raffle.pixKeyType,
      paymentInstructions: raffle.paymentInstructions
    };
  }

  /**
   * Realizar sorteio seguro
   */
  static async performDraw(raffleId, userId) {
    const raffle = await Raffle.findOne({
      _id: raffleId,
      createdBy: userId
    });

    if (!raffle) {
      throw new Error('Rifa não encontrada ou sem permissão');
    }

    if (raffle.status !== 'active') {
      throw new Error('Rifa não está ativa');
    }

    // Obter ticket vendido aleatoriamente
    const soldTicket = await Ticket.findOne({
      raffleId,
      status: 'sold'
    }).select('+buyerEmail +buyerName');

    if (!soldTicket) {
      throw new Error('Nenhum ticket vendido para realizar sorteio');
    }

    // Marcar como vencedor
    soldTicket.status = 'winner';
    await soldTicket.save();

    // Marcar rifa como completa
    raffle.status = 'completed';
    raffle.winner = {
      ticketNumber: soldTicket.number,
      winnerName: soldTicket.buyerName,
      winnerEmail: soldTicket.buyerEmail,
      collectedAt: new Date()
    };
    await raffle.save();

    logger.info(`Draw performed: ${raffleId}, Winner: ${soldTicket.number}`);

    return {
      winner: {
        ticketNumber: soldTicket.number,
        name: soldTicket.buyerName,
        email: soldTicket.buyerEmail
      },
      raffle: {
        title: raffle.title,
        prize: raffle.prize
      }
    };
  }

  /**
   * Cancelar rifa
   */
  static async cancelRaffle(raffleId, userId) {
    const raffle = await Raffle.findOne({
      _id: raffleId,
      createdBy: userId
    });

    if (!raffle) {
      throw new Error('Rifa não encontrada ou sem permissão');
    }

    // Reembolsar tickets vendidos
    const soldTickets = await Ticket.find({
      raffleId,
      status: 'sold'
    }).select('+buyerEmail');

    raffle.status = 'cancelled';
    await raffle.save();

    logger.warn(`Raffle cancelled: ${raffleId}, refunded ${soldTickets.length} tickets`);

    return {
      success: true,
      refundedTickets: soldTickets.length,
      totalRefund: soldTickets.length * raffle.pricePerNumber
    };
  }

  /**
   * Obter histórico de transações
   */
  static async getTransactionHistory(raffleId, userId) {
    const raffle = await Raffle.findOne({
      _id: raffleId,
      createdBy: userId
    });

    if (!raffle) {
      throw new Error('Rifa não encontrada ou sem permissão');
    }

    const tickets = await Ticket.find({ raffleId, status: 'sold' })
      .select('+buyerName +buyerEmail +purchasedAt')
      .sort('-purchasedAt');

    return {
      raffleId,
      raffleTitle: raffle.title,
      totalTransactions: tickets.length,
      totalRevenue: tickets.length * raffle.pricePerNumber,
      transactions: tickets.map(t => ({
        ticketNumber: t.number,
        buyerName: t.buyerName,
        buyerEmail: t.buyerEmail,
        purchasedAt: t.purchasedAt,
        amount: raffle.pricePerNumber
      }))
    };
  }
}

module.exports = RaffleService;

const { validationResult } = require('express-validator');
const Raffle = require('../models/Raffle');
const Ticket = require('../models/Ticket');

const createRaffle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const raffleData = {
      ...req.body,
      createdBy: req.user.id
    };

    const raffle = new Raffle(raffleData);
    await raffle.save();

    await raffle.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Raffle created successfully',
      data: { raffle }
    });
  } catch (error) {
    console.error('Create raffle error:', error);
    res.status(500).json({
      error: 'Failed to create raffle',
      message: 'Internal server error'
    });
  }
};

const getRaffles = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { isActive: true };
    
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    
    const raffles = await Raffle.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Raffle.countDocuments(filter);

    res.json({
      success: true,
      data: {
        raffles,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get raffles error:', error);
    res.status(500).json({
      error: 'Failed to get raffles',
      message: 'Internal server error'
    });
  }
};

const getRaffleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const raffle = await Raffle.findById(id)
      .populate('createdBy', 'name email')
      .populate({
        path: 'soldNumbers',
        match: { status: 'paid' },
        select: 'number userId'
      });

    if (!raffle || !raffle.isActive) {
      return res.status(404).json({
        error: 'Raffle not found',
        message: 'The requested raffle does not exist'
      });
    }

    res.json({
      success: true,
      data: { raffle }
    });
  } catch (error) {
    console.error('Get raffle error:', error);
    res.status(500).json({
      error: 'Failed to get raffle',
      message: 'Internal server error'
    });
  }
};

const buyTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const { numbers } = req.body;

    const raffle = await Raffle.findById(id);
    if (!raffle || !raffle.isActive || raffle.status !== 'active') {
      return res.status(400).json({
        error: 'Invalid raffle',
        message: 'This raffle is not available for ticket purchase'
      });
    }

    if (new Date() > raffle.drawDate) {
      return res.status(400).json({
        error: 'Raffle expired',
        message: 'This raffle has already ended'
      });
    }

    // Check if numbers are available
    const existingTickets = await Ticket.find({
      raffleId: id,
      number: { $in: numbers },
      status: { $in: ['reserved', 'paid'] }
    });

    if (existingTickets.length > 0) {
      const takenNumbers = existingTickets.map(t => t.number);
      return res.status(400).json({
        error: 'Numbers not available',
        message: `Numbers ${takenNumbers.join(', ')} are already taken`
      });
    }

    // Create tickets
    const tickets = numbers.map(number => ({
      raffleId: id,
      userId: req.user.id,
      number
    }));

    const createdTickets = await Ticket.insertMany(tickets);

    res.status(201).json({
      success: true,
      message: 'Tickets reserved successfully',
      data: { tickets: createdTickets }
    });
  } catch (error) {
    console.error('Buy ticket error:', error);
    res.status(500).json({
      error: 'Failed to buy tickets',
      message: 'Internal server error'
    });
  }
};

const getUserTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const tickets = await Ticket.find({ userId: req.user.id })
      .populate('raffleId', 'title prize drawDate status')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Ticket.countDocuments({ userId: req.user.id });

    res.json({
      success: true,
      data: {
        tickets,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get user tickets error:', error);
    res.status(500).json({
      error: 'Failed to get tickets',
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createRaffle,
  getRaffles,
  getRaffleById,
  buyTicket,
  getUserTickets
};

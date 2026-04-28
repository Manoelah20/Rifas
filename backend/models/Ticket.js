const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  raffleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Raffle',
    required: [true, 'Raffle ID is required']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  number: {
    type: Number,
    required: [true, 'Ticket number is required']
  },
  status: {
    type: String,
    enum: ['reserved', 'paid', 'cancelled'],
    default: 'reserved'
  },
  paymentMethod: {
    type: String,
    enum: ['pix', 'credit_card', 'bank_transfer'],
    required: false
  },
  paymentId: {
    type: String,
    required: false
  },
  paidAt: {
    type: Date,
    default: null
  },
  reservedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: function() {
      // Ticket expires 30 minutes after reservation
      return new Date(Date.now() + 30 * 60 * 1000);
    }
  }
}, {
  timestamps: true
});

// Compound index to ensure unique numbers per raffle
ticketSchema.index({ raffleId: 1, number: 1 }, { unique: true });
ticketSchema.index({ userId: 1, status: 1 });
ticketSchema.index({ raffleId: 1, status: 1 });
ticketSchema.index({ expiresAt: 1 });

// Method to check if ticket is expired
ticketSchema.methods.isExpired = function() {
  return this.status === 'reserved' && new Date() > this.expiresAt;
};

// Method to mark ticket as paid
ticketSchema.methods.markAsPaid = function(paymentMethod, paymentId) {
  this.status = 'paid';
  this.paymentMethod = paymentMethod;
  this.paymentId = paymentId;
  this.paidAt = new Date();
  return this.save();
};

// Pre-find middleware to exclude expired tickets
ticketSchema.pre(/^find/, function(next) {
  this.find({
    $or: [
      { status: { $ne: 'reserved' } },
      { expiresAt: { $gt: new Date() } }
    ]
  });
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);

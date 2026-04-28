const mongoose = require('mongoose');

const raffleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  prize: {
    type: String,
    required: [true, 'Prize is required'],
    trim: true
  },
  prizeImage: {
    type: String,
    default: ''
  },
  totalNumbers: {
    type: Number,
    required: [true, 'Total numbers is required'],
    min: [10, 'Minimum 10 numbers'],
    max: [10000, 'Maximum 10000 numbers']
  },
  pricePerNumber: {
    type: Number,
    required: [true, 'Price per number is required'],
    min: [0.01, 'Minimum price is R$ 0,01']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  drawDate: {
    type: Date,
    required: [true, 'Draw date is required']
  },
  winnerNumber: {
    type: Number,
    default: null
  },
  winnerUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better performance
raffleSchema.index({ createdBy: 1, status: 1 });
raffleSchema.index({ drawDate: 1 });
raffleSchema.index({ status: 1 });

// Method to check if raffle is still active
raffleSchema.methods.isStillActive = function() {
  return this.status === 'active' && new Date() < this.drawDate;
};

// Method to get available numbers count
raffleSchema.methods.getAvailableNumbersCount = function() {
  return this.totalNumbers - this.soldNumbers.length;
};

// Virtual for sold numbers
raffleSchema.virtual('soldNumbers', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'raffleId',
  justOne: false
});

// Ensure virtuals are included in JSON
raffleSchema.set('toJSON', { virtuals: true });
raffleSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Raffle', raffleSchema);

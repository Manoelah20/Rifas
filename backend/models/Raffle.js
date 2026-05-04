const mongoose = require('mongoose');
const encryption = require('../utils/encryption');

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
    min: [0.01, 'Minimum price is R$ 0,01'],
    max: [999999.99, 'Maximum price is R$ 999.999,99']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentPlatform: {
    type: String,
    enum: ['hotmart', 'mercadopago', 'pagseguro', 'paypal', 'stripe', 'pix'],
    required: true
  },
  paymentLink: {
    type: String,
    required: function () {
      return this.paymentPlatform !== 'pix';
    },
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Link de pagamento inválido'
    }
  },
  pixKey: {
    type: String,
    required: function () {
      return this.paymentPlatform === 'pix';
    },
    // Encrypt PIX key before saving
    set: function(value) {
      if (value && this.isModified('pixKey') && this.paymentPlatform === 'pix') {
        return encryption.encrypt(value);
      }
      return value;
    },
    validate: {
      validator: function (v) {
        if (this.paymentPlatform === 'pix') {
          return v && v.length >= 5;
        }
        return true;
      },
      message: 'Chave PIX inválida'
    }
  },
  pixKeyType: {
    type: String,
    enum: ['cpf', 'cnpj', 'email', 'phone', 'random'],
    required: function () {
      return this.paymentPlatform === 'pix';
    }
  },
  paymentInstructions: {
    type: String,
    maxlength: 500,
    required: function () {
      return this.paymentPlatform === 'pix';
    }
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  drawDate: {
    type: Date,
    required: [true, 'Draw date is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Draw date must be in the future'
    }
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
raffleSchema.methods.isStillActive = function () {
  return this.status === 'active' && new Date() < this.drawDate;
};

// Method to get available numbers count
raffleSchema.methods.getAvailableNumbersCount = function () {
  return this.totalNumbers - (this.soldNumbers?.length || 0);
};

// Get decrypted PIX key (only for authorized users)
raffleSchema.methods.getDecryptedPixKey = function() {
  if (!this.pixKey || this.paymentPlatform !== 'pix') return null;
  try {
    return encryption.decrypt(this.pixKey);
  } catch (error) {
    console.error('Error decrypting PIX key:', error);
    return null;
  }
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

// Override toJSON to decrypt PIX key only for authenticated owner
raffleSchema.methods.toJSON = function() {
  const raffleObject = this.toObject();
  
  // PIX key is not included in JSON responses by default
  // Only decrypted and returned with explicit authorization
  if (raffleObject.pixKey) {
    delete raffleObject.pixKey;
  }
  
  delete raffleObject.__v;
  return raffleObject;
};

module.exports = mongoose.model('Raffle', raffleSchema);

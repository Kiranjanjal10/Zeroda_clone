const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
  stockSymbol: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  }
});

module.exports = mongoose.model('PriceHistory', priceHistorySchema);

const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  exchange: {
    type: String,
    default: 'NSE',
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  previousClose: Number,
  open: Number,
  high: Number,
  low: Number,
  volume: Number,
  marketCap: Number,
  peRatio: Number,
  sector: String,
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);

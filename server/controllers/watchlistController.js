const { validationResult } = require('express-validator');
const watchlistService = require('../services/watchlistService');

const getWatchlist = async (req, res) => {
  try {
    const watchlist = await watchlistService.getWatchlist(req.user.id);
    res.status(200).json({ success: true, data: watchlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addStock = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { symbol } = req.body;

  try {
    const watchlist = await watchlistService.addStockToWatchlist(req.user.id, symbol);
    res.status(200).json({ success: true, data: watchlist, message: `${symbol} added to watchlist` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const removeStock = async (req, res) => {
  const { symbol } = req.params;

  try {
    const watchlist = await watchlistService.removeStockFromWatchlist(req.user.id, symbol);
    res.status(200).json({ success: true, data: watchlist, message: `${symbol} removed from watchlist` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getWatchlist,
  addStock,
  removeStock
};

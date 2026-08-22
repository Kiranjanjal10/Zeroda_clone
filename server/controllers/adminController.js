const User = require('../models/User');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const Stock = require('../models/Stock');
const portfolioService = require('../services/portfolioService');

// @desc    Get platform stats
// @route   GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTrades = await Order.countDocuments();
    const activeStocks = await Stock.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalTrades,
        activeStocks,
        systemStatus: 'Operational'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders/trades
// @route   GET /api/admin/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user portfolio
// @route   GET /api/admin/users/:id/portfolio
exports.getUserPortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioService.getPortfolioSummary(req.params.id);
    res.json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

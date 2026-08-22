const { validationResult } = require('express-validator');
const fundsService = require('../services/fundsService');

const deposit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { amount } = req.body;
    const result = await fundsService.depositFunds(req.user.id, amount);
    res.status(200).json({ success: true, message: 'Deposit successful', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const withdraw = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { amount } = req.body;
    const result = await fundsService.withdrawFunds(req.user.id, amount);
    res.status(200).json({ success: true, message: 'Withdrawal successful', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const transactions = await fundsService.getTransactions(req.user.id);
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  deposit,
  withdraw,
  getHistory
};

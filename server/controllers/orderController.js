const { validationResult } = require('express-validator');
const orderService = require('../services/orderService');

const placeOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { symbol, type, quantity } = req.body;

  try {
    let result;
    if (type.toUpperCase() === 'BUY') {
      result = await orderService.executeBuy(req.user.id, symbol, quantity);
    } else if (type.toUpperCase() === 'SELL') {
      result = await orderService.executeSell(req.user.id, symbol, quantity);
    } else {
      return res.status(400).json({ success: false, message: 'Invalid order type' });
    }

    res.status(201).json({ 
      success: true, 
      message: 'Order executed successfully', 
      data: result 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrders
};

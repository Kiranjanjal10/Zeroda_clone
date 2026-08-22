const User = require('../models/User');
const Stock = require('../models/Stock');
const Holding = require('../models/Holding');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');

const executeBuy = async (userId, symbol, quantity) => {
  const stockSymbol = symbol.toUpperCase();
  const qty = Number(quantity);

  if (qty <= 0) throw new Error('Quantity must be greater than zero');

  // Get user and stock
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const stock = await Stock.findOne({ symbol: stockSymbol });
  if (!stock) throw new Error('Stock not found');

  const totalCost = stock.currentPrice * qty;

  // Check balance
  if (user.balance < totalCost) {
    throw new Error('Insufficient balance');
  }

  // Deduct balance
  user.balance -= totalCost;
  await user.save();

  // Create or Update Holding
  let holding = await Holding.findOne({ userId, stockSymbol });
  if (holding) {
    const oldQty = holding.quantity;
    const oldAvg = holding.averageBuyPrice;
    const newQty = oldQty + qty;
    const newAvg = ((oldQty * oldAvg) + (qty * stock.currentPrice)) / newQty;

    holding.quantity = newQty;
    holding.averageBuyPrice = newAvg;
    await holding.save();
  } else {
    holding = await Holding.create({
      userId,
      stockSymbol,
      quantity: qty,
      averageBuyPrice: stock.currentPrice,
    });
  }

  // Create Order
  const order = await Order.create({
    userId,
    stockSymbol,
    type: 'BUY',
    quantity: qty,
    price: stock.currentPrice,
    totalAmount: totalCost,
    status: 'EXECUTED',
  });

  // Create Transaction
  await Transaction.create({
    userId,
    type: 'BUY',
    amount: totalCost,
    description: `Bought ${qty} shares of ${stockSymbol} at ₹${stock.currentPrice}`,
  });

  return { balance: user.balance, holding, order };
};

const executeSell = async (userId, symbol, quantity) => {
  const stockSymbol = symbol.toUpperCase();
  const qty = Number(quantity);

  if (qty <= 0) throw new Error('Quantity must be greater than zero');

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const stock = await Stock.findOne({ symbol: stockSymbol });
  if (!stock) throw new Error('Stock not found');

  // Check holding
  let holding = await Holding.findOne({ userId, stockSymbol });
  if (!holding || holding.quantity < qty) {
    throw new Error('Insufficient holdings');
  }

  const totalValue = stock.currentPrice * qty;

  // Add to balance
  user.balance += totalValue;
  await user.save();

  // Update Holding
  holding.quantity -= qty;
  if (holding.quantity === 0) {
    await Holding.findByIdAndDelete(holding._id);
    holding = null;
  } else {
    // Average buy price does not change on SELL
    await holding.save();
  }

  // Create Order
  const order = await Order.create({
    userId,
    stockSymbol,
    type: 'SELL',
    quantity: qty,
    price: stock.currentPrice,
    totalAmount: totalValue,
    status: 'EXECUTED',
  });

  // Create Transaction
  await Transaction.create({
    userId,
    type: 'SELL',
    amount: totalValue,
    description: `Sold ${qty} shares of ${stockSymbol} at ₹${stock.currentPrice}`,
  });

  return { balance: user.balance, holding, order };
};

const getUserOrders = async (userId) => {
  return await Order.find({ userId }).sort({ createdAt: -1 });
};

module.exports = {
  executeBuy,
  executeSell,
  getUserOrders
};

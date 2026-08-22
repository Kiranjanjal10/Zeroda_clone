const User = require('../models/User');
const Holding = require('../models/Holding');
const Stock = require('../models/Stock');

const getPortfolioSummary = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const holdings = await Holding.find({ userId });
  
  let totalInvested = 0;
  let totalCurrentValue = 0;

  // Enhance holdings with live market data
  const enhancedHoldings = await Promise.all(holdings.map(async (holding) => {
    const stock = await Stock.findOne({ symbol: holding.stockSymbol });
    const currentPrice = stock ? stock.currentPrice : holding.averageBuyPrice;
    
    const invested = holding.quantity * holding.averageBuyPrice;
    const currentValue = holding.quantity * currentPrice;
    const profitLoss = currentValue - invested;
    const profitLossPercentage = invested > 0 ? (profitLoss / invested) * 100 : 0;

    totalInvested += invested;
    totalCurrentValue += currentValue;

    return {
      _id: holding._id,
      stockSymbol: holding.stockSymbol,
      stockName: stock ? stock.name : holding.stockSymbol,
      quantity: holding.quantity,
      averageBuyPrice: parseFloat(holding.averageBuyPrice.toFixed(2)),
      currentPrice: parseFloat(currentPrice.toFixed(2)),
      investedValue: parseFloat(invested.toFixed(2)),
      currentValue: parseFloat(currentValue.toFixed(2)),
      profitLoss: parseFloat(profitLoss.toFixed(2)),
      profitLossPercentage: parseFloat(profitLossPercentage.toFixed(2))
    };
  }));

  const totalProfitLoss = totalCurrentValue - totalInvested;
  const totalProfitLossPercentage = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

  return {
    balance: parseFloat(user.balance.toFixed(2)),
    investedAmount: parseFloat(totalInvested.toFixed(2)),
    currentValue: parseFloat(totalCurrentValue.toFixed(2)),
    profitLoss: parseFloat(totalProfitLoss.toFixed(2)),
    profitLossPercentage: parseFloat(totalProfitLossPercentage.toFixed(2)),
    holdings: enhancedHoldings
  };
};

module.exports = {
  getPortfolioSummary
};

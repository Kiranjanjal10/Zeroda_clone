const Stock = require('../models/Stock');
const PriceHistory = require('../models/PriceHistory');

const getStocks = async (searchQuery) => {
  let query = {};
  if (searchQuery) {
    query = {
      $or: [
        { symbol: { $regex: searchQuery, $options: 'i' } },
        { name: { $regex: searchQuery, $options: 'i' } }
      ]
    };
  }
  return await Stock.find(query).sort({ marketCap: -1 });
};

const getStockBySymbol = async (symbol) => {
  const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
  if (!stock) {
    throw new Error('Stock not found');
  }
  return stock;
};

const getStockHistory = async (symbol, timeframe) => {
  const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
  if (!stock) {
    throw new Error('Stock not found');
  }

  let dateLimit = new Date();
  switch (timeframe) {
    case '1D':
      dateLimit.setDate(dateLimit.getDate() - 1);
      break;
    case '1W':
      dateLimit.setDate(dateLimit.getDate() - 7);
      break;
    case '1M':
      dateLimit.setMonth(dateLimit.getMonth() - 1);
      break;
    case '1Y':
      dateLimit.setFullYear(dateLimit.getFullYear() - 1);
      break;
    default:
      dateLimit.setDate(dateLimit.getDate() - 7); // Default to 1W
  }

  const history = await PriceHistory.find({
    stockSymbol: symbol.toUpperCase(),
    timestamp: { $gte: dateLimit }
  }).sort({ timestamp: 1 });

  return history;
};

module.exports = {
  getStocks,
  getStockBySymbol,
  getStockHistory
};

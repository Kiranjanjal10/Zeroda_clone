const Watchlist = require('../models/Watchlist');
const Stock = require('../models/Stock');

const getWatchlist = async (userId) => {
  let watchlist = await Watchlist.findOne({ userId });
  
  if (!watchlist) {
    watchlist = await Watchlist.create({ userId, stocks: [] });
  }

  // Populate actual stock data
  const populatedStocks = await Stock.find({ symbol: { $in: watchlist.stocks } });
  
  return populatedStocks;
};

const addStockToWatchlist = async (userId, symbol) => {
  const stockSymbol = symbol.toUpperCase();
  
  // Verify stock exists
  const stock = await Stock.findOne({ symbol: stockSymbol });
  if (!stock) {
    throw new Error('Stock not found');
  }

  let watchlist = await Watchlist.findOne({ userId });
  if (!watchlist) {
    watchlist = await Watchlist.create({ userId, stocks: [stockSymbol] });
  } else {
    if (watchlist.stocks.includes(stockSymbol)) {
      throw new Error('Stock already in watchlist');
    }
    watchlist.stocks.push(stockSymbol);
    await watchlist.save();
  }

  return await getWatchlist(userId);
};

const removeStockFromWatchlist = async (userId, symbol) => {
  const stockSymbol = symbol.toUpperCase();
  
  const watchlist = await Watchlist.findOne({ userId });
  if (!watchlist) {
    throw new Error('Watchlist not found');
  }

  watchlist.stocks = watchlist.stocks.filter(s => s !== stockSymbol);
  await watchlist.save();

  return await getWatchlist(userId);
};

module.exports = {
  getWatchlist,
  addStockToWatchlist,
  removeStockFromWatchlist
};

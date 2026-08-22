const stockService = require('../services/stockService');

const getAllStocks = async (req, res) => {
  try {
    const { search } = req.query;
    const stocks = await stockService.getStocks(search);
    res.status(200).json({ success: true, data: stocks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleStock = async (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = await stockService.getStockBySymbol(symbol);
    res.status(200).json({ success: true, data: stock });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getStockHistory = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { timeframe } = req.query;
    const history = await stockService.getStockHistory(symbol, timeframe);
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllStocks,
  getSingleStock,
  getStockHistory
};

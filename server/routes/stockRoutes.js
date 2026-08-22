const express = require('express');
const { getAllStocks, getSingleStock, getStockHistory } = require('../controllers/stockController');

const router = express.Router();

// Public routes
router.get('/', getAllStocks);
router.get('/:symbol', getSingleStock);
router.get('/:symbol/history', getStockHistory);

module.exports = router;

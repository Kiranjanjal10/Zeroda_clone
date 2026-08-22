const express = require('express');
const { check } = require('express-validator');
const { placeOrder, getOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post(
  '/',
  [
    check('symbol', 'Stock symbol is required').not().isEmpty(),
    check('type', 'Order type is required (BUY or SELL)').isIn(['BUY', 'SELL']),
    check('quantity', 'Quantity must be a positive integer').isInt({ gt: 0 }),
  ],
  placeOrder
);

router.get('/', getOrders);

module.exports = router;

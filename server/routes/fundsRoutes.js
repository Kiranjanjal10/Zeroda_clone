const express = require('express');
const { check } = require('express-validator');
const { deposit, withdraw, getHistory } = require('../controllers/fundsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post(
  '/deposit',
  [
    check('amount', 'Amount must be a positive number').isNumeric().custom(value => value > 0),
  ],
  deposit
);

router.post(
  '/withdraw',
  [
    check('amount', 'Amount must be a positive number').isNumeric().custom(value => value > 0),
  ],
  withdraw
);

router.get('/transactions', getHistory);

module.exports = router;

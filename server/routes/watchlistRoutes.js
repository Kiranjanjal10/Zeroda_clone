const express = require('express');
const { check } = require('express-validator');
const { getWatchlist, addStock, removeStock } = require('../controllers/watchlistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getWatchlist)
  .post(
    [
      check('symbol', 'Stock symbol is required').not().isEmpty()
    ],
    addStock
  );

router.delete('/:symbol', removeStock);

module.exports = router;

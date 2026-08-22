const express = require('express');
const router = express.Router();
const { getStats, getUsers, getOrders, getUserPortfolio } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin); // Apply to all routes in this file

router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/orders', getOrders);
router.get('/users/:id/portfolio', getUserPortfolio);

module.exports = router;

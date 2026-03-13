const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/payment');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.post('/simulate', protect, require('../controllers/payment').simulatePayment);

module.exports = router;

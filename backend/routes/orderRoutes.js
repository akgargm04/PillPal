// routes/orderRoutes.js

const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Fetch Orders for a specific buyer (by buyerId)
router.get('/:buyerId', async (req, res) => {
  try {
    // Find all orders for the given buyerId
    const orders = await Order.find({ buyerId: req.params.buyerId })
      .populate('items.medicineId', 'name price') // Populate medicine details
      .exec();

    // Respond with the order data
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order history' });
  }
});

module.exports = router;

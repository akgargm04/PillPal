const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Medicine = require("../models/Medicine");
const Incentive = require("../models/Incentive");
const User = require("../models/User");


// 🔹 Convert cart to medicine requests
exports.createOrderFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orders = [];

    for (let item of cart.items) {

      const medicine = await Medicine.findById(item.medicine);

      if (!medicine || medicine.status !== "approved") continue;
      if (item.quantity > medicine.quantity) continue;

      const order = await Order.create({
        buyer: req.user._id,
        medicine: medicine._id,
        quantity: item.quantity,
      });

      orders.push(order);
    }

    // clear cart after request
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order requests created",
      orders,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Buyer — View My Orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate({
        path: "medicine",
        populate: { path: "uploadedBy", select: "name email role" }
      })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Seller / Pharmacy — View requests for their medicines
exports.getRequestsForOwner = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "medicine",
        match: { uploadedBy: req.user._id },
      })
      .populate("buyer", "name email")
      .sort({ createdAt: -1 });

    // return only orders belonging to logged-in seller/pharmacy
    const filtered = orders.filter(o => o.medicine !== null);

    res.json(filtered);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Accept / Reject / Complete Order + Incentives
exports.updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const { orderId } = req.params;
  
      if (!["accepted", "rejected", "completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      // populate buyer + medicine
      const order = await Order.findById(orderId)
        .populate("medicine")
        .populate("buyer");
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      if (!order.medicine) {
        return res.status(400).json({ message: "Medicine record missing" });
      }
  
      // Only seller/pharmacy who owns the medicine can update
      if (order.medicine.uploadedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not allowed" });
      }
  
      // ⭐ When marking as completed
      if (status === "completed") {
  
        // prevent duplicate reward processing
        if (order.status === "completed") {
          return res.status(400).json({ message: "Order already completed" });
        }
  
        // ensure stock exists
        if (order.medicine.quantity < order.quantity) {
          return res.status(400).json({
            message: "Not enough stock to complete order"
          });
        }
  
        // reduce stock
        order.medicine.quantity -= order.quantity;
        await order.medicine.save();
  
        // reward points (2 per unit)
        const rewardPoints = Math.ceil(order.quantity * 2);
  
        await Incentive.create({
          user: order.buyer,
          order: order._id,
          points: rewardPoints,
          reason: "order_completed",
        });
  
        await User.findByIdAndUpdate(order.buyer, {
          $inc: { incentivesBalance: rewardPoints },
        });
  
        order.incentiveEarned = rewardPoints;
      }
  
      // finally update status
      order.status = status;
      await order.save();
  
      res.json({
        message: "Order updated successfully",
        order,
      });
  
    } catch (error) {
      console.error("ORDER STATUS ERROR:", error);
      res.status(500).json({ message: "Server error updating order" });
    }
  };
  
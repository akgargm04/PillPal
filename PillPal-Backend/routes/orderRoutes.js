const express = require("express");
const {
  createOrderFromCart,
  getRequestsForOwner,
  updateOrderStatus,
  getMyOrders
} = require("../controllers/orderController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Buyer — convert cart items into order requests
router.post(
  "/create",
  protect,
  authorizeRoles("buyer"),
  createOrderFromCart
);

// 🔹 Buyer — view my orders
router.get(
  "/my",
  protect,
  authorizeRoles("buyer"),
  getMyOrders
);

// 🔹 Seller / Pharmacy — view requests for their medicines
router.get(
  "/requests",
  protect,
  authorizeRoles("seller", "pharmacy"),
  getRequestsForOwner
);

// 🔹 Seller / Pharmacy — update order status
router.put(
  "/status/:orderId",
  protect,
  authorizeRoles("seller", "pharmacy"),
  updateOrderStatus
);

module.exports = router;

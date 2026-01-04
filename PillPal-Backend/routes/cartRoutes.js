const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Add / update cart item
router.post(
  "/add",
  protect,
  authorizeRoles("buyer"),
  addToCart
);

// 🔹 Get cart
router.get(
  "/",
  protect,
  authorizeRoles("buyer"),
  getCart
);

// 🔹 Remove item
router.delete(
  "/remove/:medicineId",
  protect,
  authorizeRoles("buyer"),
  removeFromCart
);

module.exports = router;

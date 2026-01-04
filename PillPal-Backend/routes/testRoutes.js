const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

// 🔹 Any logged-in user
router.get("/user", protect, (req, res) => {
  res.json({ message: "Protected User Route", user: req.user });
});

// 🔹 Only Seller
router.get("/seller", protect, authorizeRoles("seller"), (req, res) => {
  res.json({ message: "Seller Access Granted" });
});

// 🔹 Only Pharmacy
router.get("/pharmacy", protect, authorizeRoles("pharmacy"), (req, res) => {
  res.json({ message: "Pharmacy Access Granted" });
});

// 🔹 Only Buyer
router.get("/buyer", protect, authorizeRoles("buyer"), (req, res) => {
  res.json({ message: "Buyer Access Granted" });
});

module.exports = router;

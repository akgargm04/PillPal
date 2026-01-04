const express = require("express");
const { getMyIncentives } = require("../controllers/incentiveController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 User — view incentive history
router.get(
  "/history",
  protect,
  getMyIncentives
);

module.exports = router;

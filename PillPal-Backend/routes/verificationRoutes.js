const express = require("express");
const {
  getPendingMedicines,
  verifyMedicine,
} = require("../controllers/medicineController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Pharmacy — view medicines pending verification
router.get(
  "/pending",
  protect,
  authorizeRoles("pharmacy"),
  getPendingMedicines
);

// 🔹 Pharmacy — approve / reject medicine
router.put(
  "/verify/:medicineId",
  protect,
  authorizeRoles("pharmacy"),
  verifyMedicine
);

module.exports = router;

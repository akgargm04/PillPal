const express = require("express");
const {
    addMedicine,
    getMyMedicines,
    getAvailableMedicines,
    searchMedicines,
  } = require("../controllers/medicineController");
  

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Only Seller & Pharmacy can upload medicine
router.post(
  "/add",
  protect,
  authorizeRoles("seller", "pharmacy"),
  addMedicine
);

// 🔹 Get medicines uploaded by logged-in user
router.get(
  "/mine",
  protect,
  authorizeRoles("seller", "pharmacy"),
  getMyMedicines
);

// 🔹 Buyer — View approved & available medicines
router.get(
    "/available",
    protect,
    authorizeRoles("buyer"),
    getAvailableMedicines
  );
  
  // 🔹 Buyer — Search / Filter medicines
  router.get(
    "/search",
    protect,
    authorizeRoles("buyer"),
    searchMedicines
  );
  

module.exports = router;

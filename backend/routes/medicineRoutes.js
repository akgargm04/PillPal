const express = require("express");
const router = express.Router();
const Medicine = require("../models/medicine");
const protect = require("../middleware/authMiddleware");


// Add a new medicine (POST /api/medicines)
router.post("/", protect, async (req, res) => {
  const { name, description, price, category, stock, expiryDate, quantity } = req.body;

  if (!name || !description || !price || !category || !stock || !expiryDate || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const medicine = new Medicine({
      name,
      description,
      price,
      category,
      stock,
      expiryDate,
      quantity,
      owner: req.user.id,
    });

    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    console.error("Error saving medicine:", err);
    res.status(500).json({ message: "Error adding medicine", error: err.message });
  }
});

// Get verified available medicines (GET /api/medicines)
router.get("/", protect, async (req, res) => {
  try {
    const medicines = await Medicine.find({
      status: "available",
      isVerified: true,
    });

    res.json(medicines);
  } catch (err) {
    console.error("Error fetching medicines:", err);
    res.status(500).json({ message: "Error fetching medicines" });
  }
});

// Request a medicine (POST /api/medicines/request/:id)
router.post("/request/:id", protect, async (req, res) => {
  const medicineId = req.params.id;

  try {
    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    // Handle request logic (update stock, create order/request, etc.)
    res.json({ message: "Medicine requested successfully", medicine });
  } catch (err) {
    console.error("Error requesting medicine:", err);
    res.status(500).json({ message: "Error processing request" });
  }
});

module.exports = router;

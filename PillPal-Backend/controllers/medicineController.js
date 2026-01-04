const Verification = require("../models/Verification");
const Medicine = require("../models/Medicine");

// 🔹 Seller / Pharmacy Add Medicine
exports.addMedicine = async (req, res) => {
  try {
    const { name, description, price, quantity, expiryDate } = req.body;

    const medicine = await Medicine.create({
      name,
      description,
      price,
      quantity,
      expiryDate,
      uploadedBy: req.user._id,
      ownerRole: req.user.role,
    });

    res.status(201).json({
      message: "Medicine submitted for verification",
      medicine,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Medicines Uploaded by Logged-in User
exports.getMyMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      uploadedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get medicines waiting for verification (Pharmacy only)
exports.getPendingMedicines = async (req, res) => {
    try {
      const medicines = await Medicine.find({
        status: "pending_verification"
      })
        .populate("uploadedBy", "name email role")
        .sort({ createdAt: -1 });
  
      res.json(medicines);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // 🔹 Pharmacy verifies medicine
exports.verifyMedicine = async (req, res) => {
    try {
      const { medicineId } = req.params;
      const { status, remarks } = req.body;
  
      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      const medicine = await Medicine.findById(medicineId);
  
      if (!medicine) {
        return res.status(404).json({ message: "Medicine not found" });
      }
  
      // Update medicine status + notes
      medicine.status = status;
      medicine.verificationNotes = remarks;
      await medicine.save();
  
      // Create verification log
      await Verification.create({
        medicine: medicine._id,
        verifiedBy: req.user._id,
        status,
        remarks,
      });
  
      res.json({
        message: `Medicine ${status} successfully`,
        medicine,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // 🔹 Buyer — Get Approved & Available Medicines
exports.getAvailableMedicines = async (req, res) => {
    try {
      const today = new Date();
  
      const medicines = await Medicine.find({
        status: "approved",
        expiryDate: { $gte: today },
        quantity: { $gt: 0 }
      })
        .populate("uploadedBy", "name role email")
        .sort({ createdAt: -1 });
  
      res.json(medicines);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // 🔹 Buyer — Search / Filter Medicines
exports.searchMedicines = async (req, res) => {
    try {
      const { name, minPrice, maxPrice, ownerRole } = req.query;
  
      const today = new Date();
  
      let filter = {
        status: "approved",
        expiryDate: { $gte: today },
        quantity: { $gt: 0 }
      };
  
      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }
  
      if (minPrice) {
        filter.price = { ...filter.price, $gte: Number(minPrice) };
      }
  
      if (maxPrice) {
        filter.price = { ...filter.price, $lte: Number(maxPrice) };
      }
  
      if (ownerRole) {
        filter.ownerRole = ownerRole;
      }
  
      const medicines = await Medicine.find(filter)
        .populate("uploadedBy", "name role email")
        .sort({ createdAt: -1 });
  
      res.json(medicines);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
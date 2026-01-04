const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending_verification",
        "approved",
        "rejected",
        "expired",
        "out_of_stock",
      ],
      default: "pending_verification",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ownerRole: {
      type: String,
      enum: ["seller", "pharmacy"],
      required: true,
    },

    verificationNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
// 🔹 Auto-update status based on expiry & quantity
medicineSchema.pre("save", function () {
    const today = new Date();
  
    if (this.expiryDate < today) {
      this.status = "expired";
    } else if (this.quantity === 0) {
      this.status = "out_of_stock";
    }
  });
  
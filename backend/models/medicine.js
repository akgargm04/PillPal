const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  expiryDate: { type: Date, required: true },
  quantity: { type: Number, default: 1 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  verified: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  status: { type: String, enum: ["available", "requested", "sold"], default: "available" },
}, { timestamps: true });

module.exports = mongoose.model("Medicine", medicineSchema);

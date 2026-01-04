const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // pharmacy user
      required: true,
    },

    status: {
      type: String,
      enum: ["approved", "rejected"],
      required: true,
    },

    remarks: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verification", verificationSchema);

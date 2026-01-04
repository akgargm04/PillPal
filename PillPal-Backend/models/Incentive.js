const mongoose = require("mongoose");

const incentiveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    points: {
      type: Number,
      required: true,
    },

    reason: {
      type: String,
      enum: [
        "order_completed",
        "community_share_reward",
        "pharmacy_verified_bonus"
      ],
      default: "order_completed",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incentive", incentiveSchema);

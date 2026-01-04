const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["buyer", "seller", "pharmacy"],
      default: "buyer",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationLevel: {
      type: String,
      enum: ["none", "basic", "trusted"],
      default: "none",
    },

    incentivesBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// 🔹 Hash password before save
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  

// 🔹 Compare password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

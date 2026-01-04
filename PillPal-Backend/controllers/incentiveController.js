const Incentive = require("../models/Incentive");

// 🔹 Get user's incentive history
exports.getMyIncentives = async (req, res) => {
  try {
    const history = await Incentive.find({ user: req.user._id })
      .populate("order", "status createdAt")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

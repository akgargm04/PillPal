const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔹 Verify Token & Attach User
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};
// 🔹 Allow Specific Roles Only
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied: insufficient permissions" });
      }
      next();
    };
  };
  
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      return next(); // Success
    } catch (error) {
      console.error('Invalid token:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token provided
  return res.status(401).json({ message: 'No token, not authorized' });
};

module.exports = protect;

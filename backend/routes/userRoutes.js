const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const router = express.Router();
const User = require("../models/user");
const protect = require("../middleware/authMiddleware"); // Import the protect middleware

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the hashed password with the entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token (expires in 1 hour)
    const token = jwt.sign(
      { id: user._id, role: user.role },  // Payload containing user ID and role
      process.env.JWT_SECRET,             // Secret key to sign the token
      { expiresIn: "1h" }                // Token expiration time
    );

    // Send response with token
    res.status(200).json({ message: "Login successful", token });

  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// Protected Route (Example)
router.get("/profile", protect, async (req, res) => {
  try {
    // Fetch user details using req.user (this comes from the decoded JWT)
    const user = await User.findById(req.user.id); // Assuming JWT contains 'id'
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile", error: err.message });
  }
});

module.exports = router;

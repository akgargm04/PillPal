const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Route imports
const userRoutes = require("./routes/userRoutes");
const medicineRoutes = require("./routes/medicineRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Health check route
app.get("/", (req, res) => {
  res.send("PillPal API is running 🚀");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/medicines", medicineRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

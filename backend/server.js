require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();

console.log("MY ADMIN SERVER IS RUNNING");

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Admin Routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("CampusConnect Backend Running");
});

// Temporary Database Test Route
app.get("/test-db", (req, res) => {
  res.json({
    readyState: mongoose.connection.readyState,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
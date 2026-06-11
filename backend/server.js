require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chatRoutes");
const app = express();
app.use(cors());
const notificationRoutes = require("./routes/notificationRoutes");
const savedSeniorRoutes = require("./routes/savedSeniorRoutes");

const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/saved-seniors", savedSeniorRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("CampusConnect Backend Running");
});

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
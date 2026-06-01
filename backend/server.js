require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");

const chatRoutes = require("./routes/chatRoutes");

const app = express();
const notificationRoutes = require("./routes/notificationRoutes");
const savedSeniorRoutes = require("./routes/savedSeniorRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/saved-seniors", savedSeniorRoutes);

app.get("/", (req, res) => {
  res.send("CampusConnect Backend Running");
});

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
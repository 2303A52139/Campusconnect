
require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const chatRoutes = require("./routes/chatRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const savedSeniorRoutes = require("./routes/savedSeniorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const seniorRoutes = require("./routes/seniorRoutes");
const startExpireRequestsJob =
  require("./jobs/expireRequests");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(express.json());

// Existing Routes
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/saved-seniors", savedSeniorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// Request Module Routes
app.use("/api/seniors", seniorRoutes);
app.use("/api/requests", requestRoutes);

// Start request expiration job
startExpireRequestsJob();

app.get("/", (req, res) => {
  res.send("CampusConnect Backend Running");
});

// Socket Rooms
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);

    console.log(
      `Socket ${socket.id} joined conversation ${conversationId}`
    );
  });

  socket.on("sendMessage", (data) => {
    const { conversationId } = data;

    io.to(conversationId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

connectDB();
startExpireRequestsJob();
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
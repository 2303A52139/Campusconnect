require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const chatRoutes = require("./routes/chatRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const savedSeniorRoutes = require("./routes/savedSeniorRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/saved-seniors", savedSeniorRoutes);

app.get("/", (req, res) => {
  res.send("CampusConnect Backend Running");
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log("Message Received:", data);

    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

connectDB();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
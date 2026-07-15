require("dotenv").config();

const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const http = require("http");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Server } = require("socket.io");

const chatRoutes = require("./routes/chatRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const savedSeniorRoutes = require("./routes/savedSeniorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const seniorRoutes = require("./routes/seniorRoutes");

const startExpireRequestsJob = require("./jobs/expireRequests");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

connectDB();

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/saved-seniors", savedSeniorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/seniors", seniorRoutes);
app.use("/api/requests", requestRoutes);

startExpireRequestsJob();

app.get("/", (req, res) => res.send("CampusConnect Backend Running"));

io.on("connection", (socket) => {
  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.conversationId).emit("receiveMessage", data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const requestLogger = require("./middleware/requestLogger");
app.use(requestLogger);
const express = require("express");
const router = express.Router();

const {
  createConversation,
  sendMessage,
  getMessages,
} = require("../controllers/chatController");

// Create Conversation
router.post("/conversation", createConversation);

// Send Message
router.post("/message", sendMessage);

// Get Messages
router.get("/messages/:conversationId", getMessages);

module.exports = router;
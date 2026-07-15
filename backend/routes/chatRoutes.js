const express = require("express");
const router = express.Router();

const {
  createConversation,
  sendMessage,
  getMessages,
  getConversationByRequest,
} = require("../controllers/chatController");

router.post("/conversation", createConversation);
router.post("/message", sendMessage);
router.get("/messages/:conversationId", getMessages);
router.get("/conversation/:requestId", getConversationByRequest);

module.exports = router;
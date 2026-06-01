const mongoose = require("mongoose");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

// Create Conversation
const createConversation = async (req, res) => {
  try {
    const { participants, requestId } = req.body;

    const conversation = await Conversation.create({
      participants,
      requestId,
    });

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send Message
const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;

    const message = await Message.create({
      conversationId,
      senderId,
      text,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Messages
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({
        message: "Invalid conversation ID",
      });
    }

    const messages = await Message.find({
      conversationId,
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createConversation,
  sendMessage,
  getMessages,
};
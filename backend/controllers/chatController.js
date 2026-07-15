const mongoose = require("mongoose");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const Notification = require("../models/notification");
const User = require("../models/user");
const Request = require("../models/Request");

const createConversation = async (req, res) => {
  try {
    const { participants, requestId } = req.body;

    if (!participants || !Array.isArray(participants) || participants.length < 2) {
      return res.status(400).json({
        message: "participants must be an array with at least 2 users",
      });
    }

    for (const participant of participants) {
      if (!mongoose.Types.ObjectId.isValid(participant)) {
        return res.status(400).json({
          message: "Invalid participant ID",
        });
      }
    }

    if (requestId && !mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({
        message: "Invalid request ID",
      });
    }

    const conversation = await Conversation.create({
      participants,
      requestId,
    });

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;

    if (!conversationId || !senderId || !text) {
      return res.status(400).json({
        message: "conversationId, senderId, and text are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(conversationId) ||
      !mongoose.Types.ObjectId.isValid(senderId)
    ) {
      return res.status(400).json({
        message: "Invalid conversationId or senderId",
      });
    }

    const trimmedText = text.trim();
    if (!trimmedText) {
      return res.status(400).json({
        message: "Message text cannot be empty",
      });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    const isParticipant = conversation.participants.some(
      (id) => id.toString() === senderId
    );

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not a participant in this conversation",
      });
    }

    if (conversation.requestId) {
      const request = await Request.findById(conversation.requestId);

      if (!request || request.status !== "Accepted") {
        return res.status(403).json({
          message: "Chat unavailable until the request is accepted",
        });
      }
    }

    const message = await Message.create({
      conversationId,
      senderId,
      text: trimmedText,
    });

    const sender = await User.findById(senderId);

    for (const participantId of conversation.participants) {
      if (participantId.toString() !== senderId) {
        await Notification.create({
          userId: participantId,
          title: `New message from ${sender?.name || "Someone"}`,
          type: "NEW_MESSAGE",
          senderName: sender?.name || "Unknown",
          message: trimmedText,
          isRead: false,
        });
      }
    }

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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

const getConversationByRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({
        message: "Invalid request ID",
      });
    }

    const conversation = await Conversation.findOne({
      requestId,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    res.status(200).json(conversation);
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
  getConversationByRequest,
};
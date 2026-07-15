const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    juniorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    seniorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    requestType: {
      type: String,
      required: true,
      index: true,
    },

    message: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Expired"],
      default: "Pending",
      index: true,
    },

    respondedAt: Date,

    expiresAt: {
      type: Date,
      index: true,
    },

    // Link accepted request to conversation
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
requestSchema.index({
  juniorId: 1,
  status: 1,
  createdAt: -1,
});

requestSchema.index({
  seniorId: 1,
  status: 1,
  createdAt: -1,
});

// Export Model
module.exports = mongoose.model("Request", requestSchema);
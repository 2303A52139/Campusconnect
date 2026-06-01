const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
    isActive: {
        type: Boolean,
        default: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
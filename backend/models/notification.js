const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "REQUEST_ACCEPTED",
        "REQUEST_REJECTED",
        "NEW_MESSAGE",
        "REQUEST_EXPIRING",
      ],
      required: true,
    },

    senderName: {
      type: String,
    },

    message: {
      type: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);
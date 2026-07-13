const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "REQUEST_CREATED",
        "REQUEST_ACCEPTED",
        "REQUEST_REJECTED",
        "NEW_MESSAGE",
        "REQUEST_EXPIRING",
      ],
      required: true,
      index: true,
    },

    senderName: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  juniorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  seniorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  requestType: {
    type: String,
    required: true
  },

  message: {
    type: String
  },

  status: {
    type: String,
    enum: [
      "Pending",
      "Accepted",
      "Rejected",
      "Expired"
    ],
    default: "Pending"
  },

  respondedAt: Date,

  expiresAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Request",
  requestSchema
);
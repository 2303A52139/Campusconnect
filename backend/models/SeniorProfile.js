const mongoose = require("mongoose");

const seniorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  city: String,
  workMode: String,
  guidanceTags: [String],
  availability: {
    type: String,
    enum: [
      "Available",
      "Limited Availability",
      "Not Accepting Requests"
    ],
    default: "Available"
  },
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model(
  "SeniorProfile",
  seniorProfileSchema
);
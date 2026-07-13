const mongoose = require("mongoose");

const seniorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  company: { type: String, required: true, index: true },
  role: { type: String, required: true, index: true },
  experience: { type: Number, required: true },
  city: { type: String, index: true },
  workMode: String,
  guidanceTags: [String],
  availability: { type: String, enum: ["Available", "Limited Availability", "Not Accepting Requests"], default: "Available", index: true },
  verified: { type: Boolean, default: false, index: true }
}, { timestamps: true });

seniorProfileSchema.index({ company: 1, role: 1, verified: 1, availability: 1 });

module.exports = mongoose.model("SeniorProfile", seniorProfileSchema);
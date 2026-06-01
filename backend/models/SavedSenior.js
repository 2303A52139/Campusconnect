const mongoose = require("mongoose");

const savedSeniorSchema = new mongoose.Schema(
  {
    juniorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seniorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SavedSenior", savedSeniorSchema);
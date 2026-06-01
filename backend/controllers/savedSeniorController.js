const SavedSenior = require("../models/SavedSenior");

// Save senior
const saveSenior = async (req, res) => {
  try {
    const saved = await SavedSenior.create(req.body);

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove saved senior
const removeSavedSenior = async (req, res) => {
  try {
    await SavedSenior.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Removed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get saved seniors
const getSavedSeniors = async (req, res) => {
  try {
    const seniors = await SavedSenior.find({
      juniorId: req.params.juniorId,
    });

    res.status(200).json(seniors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveSenior,
  removeSavedSenior,
  getSavedSeniors,
};
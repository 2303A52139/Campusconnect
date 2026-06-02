const SeniorProfile = require("../models/SeniorProfile");

// GET /api/seniors
const getAllSeniors = async (req, res) => {
  try {
    const seniors = await SeniorProfile.find();

    res.status(200).json(seniors);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET /api/seniors/:id
const getSeniorById = async (req, res) => {
  try {
    const senior = await SeniorProfile.findById(req.params.id);

    if (!senior) {
      return res.status(404).json({
        message: "Senior not found"
      });
    }

    res.status(200).json(senior);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const createSenior = async (req, res) => {
  try {
    const senior = await SeniorProfile.create({
      userId: "685000000000000000000001",
      company: "Google",
      role: "Software Engineer",
      experience: 2,
      city: "Hyderabad",
      workMode: "Hybrid",
      guidanceTags: ["Interview Preparation"],
      availability: "Available",
      verified: true
    });

    res.status(201).json(senior);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllSeniors,
  getSeniorById,
  createSenior
};
const express = require("express");

const router = express.Router();


const {
  getAllSeniors,
  getSeniorById,
  getRecommendedSeniors,
  createSenior,
  updateSenior,
  deleteSenior
} = require("../Controllers/seniorController");

// GET /api/seniors
router.get("/", getAllSeniors);
router.get("/recommended", getRecommendedSeniors);

// GET /api/seniors/:id
router.get("/:id", getSeniorById);
router.put("/:id", updateSenior);
router.delete("/:id", deleteSenior);

// GET /api/seniors/recommended


// POST /api/seniors
router.post("/", createSenior);

module.exports = router;
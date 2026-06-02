const express = require("express");

const router = express.Router();


const {
  getAllSeniors,
  getSeniorById,
  createSenior
} = require("../Controllers/seniorController");

// GET /api/seniors
router.get("/", getAllSeniors);

// GET /api/seniors/:id
router.get("/:id", getSeniorById);

// POST /api/seniors
router.post("/", createSenior);

module.exports = router;
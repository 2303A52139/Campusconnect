const express = require("express");
const router = express.Router();

const {
  saveSenior,
  removeSavedSenior,
  getSavedSeniors,
} = require("../controllers/savedSeniorController");

router.post("/", saveSenior);

router.delete("/:id", removeSavedSenior);

router.get("/:juniorId", getSavedSeniors);

module.exports = router;
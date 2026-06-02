const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
  getPendingRequests,
  getRequestById,
  acceptRequest,
  rejectRequest
} = require("../Controllers/requestController");
router.get("/", getRequests);
router.get("/pending", getPendingRequests);
router.get("/:id", getRequestById);
router.post("/", createRequest);
router.put("/:id/accept", acceptRequest);
router.put("/:id/reject", rejectRequest);

module.exports = router;
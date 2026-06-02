const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
  getPendingRequests,
  getExpiredRequests,
  getRequestsByStatus,
  getRequestById,
  acceptRequest,
  rejectRequest,
  expireRequest
} = require("../Controllers/requestController");
router.get("/", getRequests);
router.get("/pending", getPendingRequests);
router.get("/expired", getExpiredRequests);
router.get("/status/:status", getRequestsByStatus);
router.get("/:id", getRequestById);
router.post("/", createRequest);
router.put("/:id/accept", acceptRequest);
router.put("/:id/reject", rejectRequest);
router.put("/:id/expire", expireRequest);
module.exports = router;
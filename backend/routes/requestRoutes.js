const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
  getPendingRequests,
  getExpiredRequests,
  getRequestsByStatus,
  getRequestsByJunior,
  getRequestById,
  acceptRequest,
  rejectRequest,
  expireRequest,
  getRequestsBySenior,
  getPendingRequestsBySenior,
  getPendingRequestsByJunior,
  deleteRequest
} = require("../Controllers/requestController");
router.get("/", getRequests);
router.get("/pending", getPendingRequests);
router.get("/expired", getExpiredRequests);
router.get("/status/:status", getRequestsByStatus);
router.get(
  "/senior/:seniorId/pending",
  getPendingRequestsBySenior
);
router.get("/senior/:seniorId", getRequestsBySenior);
router.get(
  "/junior/:juniorId/pending",
  getPendingRequestsByJunior
);
router.get("/junior/:juniorId", getRequestsByJunior);
router.get("/:id", getRequestById);
router.post("/", createRequest);
router.put("/:id/accept", acceptRequest);
router.put("/:id/reject", rejectRequest);
router.put("/:id/expire", expireRequest);
router.delete("/:id", deleteRequest);
module.exports = router;
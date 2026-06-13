const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAsRead,
  createNotification,
} = require("../controllers/notificationController");

router.get("/:userId", getNotifications);

router.put("/:id/read", markAsRead);
router.post("/",createNotifications);

module.exports = router;
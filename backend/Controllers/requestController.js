const mongoose = require("mongoose");
const Request = require("../models/Request");
const Notification = require("../models/notification");
const User = require("../models/user");

const createNotificationHelper = async (userId, title, type, senderName, message) => {
  try {
    await Notification.create({
      userId,
      title,
      type,
      senderName,
      message,
      isRead: false,
    });
  } catch (error) {
    console.error("Error creating notification:", error.message);
  }
};

const createRequest = async (req, res) => {
  try {
    const { juniorId, seniorId, requestType, message } = req.body;

    if (!juniorId || !seniorId || !requestType || !message) {
      return res.status(400).json({
        message: "juniorId, seniorId, requestType, and message are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(juniorId) || !mongoose.Types.ObjectId.isValid(seniorId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const validTypes = [
      "Interview Preparation",
      "Career Guidance",
      "Onboarding Guidance",
      "Referral Opportunities",
    ];

    if (!validTypes.includes(requestType)) {
      return res.status(400).json({
        message: "Invalid request type",
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10) {
      return res.status(400).json({
        message: "Message must be at least 10 characters",
      });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const request = await Request.create({
      juniorId,
      seniorId,
      requestType,
      message: trimmedMessage,
      expiresAt,
    });

    const junior = await User.findById(juniorId);
    if (junior) {
      await createNotificationHelper(
        seniorId,
        `New guidance request from ${junior.name}`,
        "REQUEST_CREATED",
        junior.name,
        `${junior.name} sent a ${requestType} request`
      );
    }

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: "Pending" });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpiredRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: "Expired" });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestsByStatus = async (req, res) => {
  try {
    const requests = await Request.find({ status: req.params.status });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "Accepted", respondedAt: new Date() },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const senior = await User.findById(request.seniorId);
    if (senior) {
      await createNotificationHelper(
        request.juniorId,
        `Request accepted by ${senior.name}`,
        "REQUEST_ACCEPTED",
        senior.name,
        `${senior.name} accepted your ${request.requestType} request`
      );
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected", respondedAt: new Date() },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const senior = await User.findById(request.seniorId);
    if (senior) {
      await createNotificationHelper(
        request.juniorId,
        `Request rejected by ${senior.name}`,
        "REQUEST_REJECTED",
        senior.name,
        `${senior.name} rejected your ${request.requestType} request`
      );
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const expireRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "Expired" },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await createNotificationHelper(
      request.juniorId,
      "Your request expired",
      "REQUEST_EXPIRING",
      "System",
      `Your ${request.requestType} request has expired (7 days)`
    );

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestsBySenior = async (req, res) => {
  try {
    const requests = await Request.find({ seniorId: req.params.seniorId });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestsByJunior = async (req, res) => {
  try {
    const requests = await Request.find({ juniorId: req.params.juniorId });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingRequestsBySenior = async (req, res) => {
  try {
    const requests = await Request.find({ seniorId: req.params.seniorId, status: "Pending" });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingRequestsByJunior = async (req, res) => {
  try {
    const requests = await Request.find({ juniorId: req.params.juniorId, status: "Pending" });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestStats = async (req, res) => {
  try {
    const total = await Request.countDocuments();
    const pending = await Request.countDocuments({ status: "Pending" });
    const accepted = await Request.countDocuments({ status: "Accepted" });
    const rejected = await Request.countDocuments({ status: "Rejected" });
    const expired = await Request.countDocuments({ status: "Expired" });

    res.status(200).json({ total, pending, accepted, rejected, expired });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSeniorDashboard = async (req, res) => {
  try {
    const { seniorId } = req.params;

    const total = await Request.countDocuments({ seniorId });
    const pending = await Request.countDocuments({ seniorId, status: "Pending" });
    const accepted = await Request.countDocuments({ seniorId, status: "Accepted" });
    const rejected = await Request.countDocuments({ seniorId, status: "Rejected" });

    res.status(200).json({ total, pending, accepted, rejected });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getPendingRequests,
  getExpiredRequests,
  getRequestsByStatus,
  getRequestById,
  acceptRequest,
  rejectRequest,
  expireRequest,
  getRequestsBySenior,
  getRequestsByJunior,
  getPendingRequestsBySenior,
  getPendingRequestsByJunior,
  deleteRequest,
  getRequestStats,
  getSeniorDashboard,
};

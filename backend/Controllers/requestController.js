const Request = require("../models/Request");

// POST /api/requests
const createRequest = async (req, res) => {
  try {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const request = await Request.create({
      juniorId: req.body.juniorId,
      seniorId: req.body.seniorId,
      requestType: req.body.requestType,
      message: req.body.message,
      expiresAt
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      status: "Pending"
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getExpiredRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      status: "Expired"
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getRequestsByStatus = async (req, res) => {
  try {
    const requests = await Request.find({
      status: req.params.status
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      {
        status: "Accepted",
        respondedAt: new Date()
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
        respondedAt: new Date()
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const expireRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      {
        status: "Expired"
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
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
  expireRequest
};
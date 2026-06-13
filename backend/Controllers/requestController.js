
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
const getRequestsBySenior = async (req, res) => {
  try {
    const requests = await Request.find({
      seniorId: req.params.seniorId
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getRequestsByJunior = async (req, res) => {
  try {
    const requests = await Request.find({
      juniorId: req.params.juniorId
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getPendingRequestsBySenior = async (req, res) => {
  try {
    const requests = await Request.find({
      seniorId: req.params.seniorId,
      status: "Pending"
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getPendingRequestsByJunior = async (req, res) => {
  try {
    const requests = await Request.find({
      juniorId: req.params.juniorId,
      status: "Pending"
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.status(200).json({
      message: "Request deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getRequestStats = async (req, res) => {
  try {
    const totalRequests = await Request.countDocuments();

    const pending = await Request.countDocuments({
      status: "Pending"
    });

    const accepted = await Request.countDocuments({
      status: "Accepted"
    });

    const rejected = await Request.countDocuments({
      status: "Rejected"
    });

    const expired = await Request.countDocuments({
      status: "Expired"
    });

    res.status(200).json({
      totalRequests,
      pending,
      accepted,
      rejected,
      expired
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getSeniorDashboard = async (req, res) => {
  try {
    const seniorId = req.params.seniorId;

    const totalRequests = await Request.countDocuments({
      seniorId
    });

    const pending = await Request.countDocuments({
      seniorId,
      status: "Pending"
    });

    const accepted = await Request.countDocuments({
      seniorId,
      status: "Accepted"
    });

    const rejected = await Request.countDocuments({
      seniorId,
      status: "Rejected"
    });

    const expired = await Request.countDocuments({
      seniorId,
      status: "Expired"
    });

    res.status(200).json({
      totalRequests,
      pending,
      accepted,
      rejected,
      expired
    });
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
  expireRequest,
  getRequestsBySenior,
  getRequestsByJunior,
  getPendingRequestsBySenior,
  getPendingRequestsByJunior,
  deleteRequest,
  getRequestStats,
  getSeniorDashboard
};
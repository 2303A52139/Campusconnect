const Company = require("../models/company");
const Report = require("../models/report");

exports.getDashboard = async (req, res) => {
  try {
    res.status(200).json({
      message: "Admin Dashboard Working",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find();

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addCompany = async (req, res) => {
  try {
    const { name } = req.body;

    const company = await Company.create({
      name,
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.resolveReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        status: "Resolved",
      },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getStats = async (req, res) => {
  try {
    res.status(200).json({
      totalUsers: 0,
      totalSeniors: 0,
      totalRequests: 0,
      acceptedRequests: 0,
      expiredRequests: 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
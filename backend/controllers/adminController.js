const Company = require("../models/company");
const Report = require("../models/report");

// Dashboard
exports.getDashboard = async (req, res) => {
  try {
    res.status(200).json({
      message: "Admin Dashboard Working",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Reports
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find();

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Company
exports.addCompany = async (req, res) => {
  try {
    const { name } = req.body;

    const company = await Company.create({ name });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Companies
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

// Delete Company
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
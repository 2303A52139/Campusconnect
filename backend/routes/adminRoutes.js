const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getReports,
  addCompany,
  getCompanies,
  deleteCompany,
  resolveReport,
  getStats,
  deleteReport,
} = require("../controllers/adminController");

router.get("/dashboard", getDashboard);

router.get("/reports", getReports);

router.post("/company", addCompany);

router.get("/companies", getCompanies);

router.delete("/company/:id", deleteCompany);

router.put("/report/:id/resolve", resolveReport);

router.get("/stats", getStats);

router.delete("/report/:id", deleteReport);
module.exports = router;
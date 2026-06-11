const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getReports,
  addCompany,
  getCompanies,
  deleteCompany,
  updateCompany,
  getCompanyById,
  resolveReport,
  reviewReport,
  getPendingReports,
  getReviewedReports,
  getResolvedReports,
  getStats,
  deleteReport,
} = require("../controllers/adminController");

router.get("/dashboard", getDashboard);

router.get("/reports", getReports);
router.get("/reports/pending", getPendingReports);

router.get("/reports/reviewed", getReviewedReports);

router.get("/reports/resolved", getResolvedReports);

router.post("/company", addCompany);

router.get("/companies", getCompanies);
router.get("/company/:id", getCompanyById);
router.put("/company/:id", updateCompany);
router.delete("/company/:id", deleteCompany);

router.put("/report/:id/resolve", resolveReport);
router.put("/report/:id/review", reviewReport);

router.get("/stats", getStats);

router.delete("/report/:id", deleteReport);

module.exports = router;
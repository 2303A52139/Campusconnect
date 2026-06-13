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
  getUsers,
  getUnverifiedSeniors,
  getVerifiedSeniors,
  verifySenior,
  unverifySenior,
  deleteUser,
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

router.get("/users", getUsers);

router.get("/unverified-seniors", getUnverifiedSeniors);

router.put("/verify-senior/:id", verifySenior);
router.get("/verified-seniors", getVerifiedSeniors);

router.put("/unverify-senior/:id", unverifySenior);

router.delete("/user/:id", deleteUser);
module.exports = router;
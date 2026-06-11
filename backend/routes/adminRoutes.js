const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getReports,
  addCompany,
  getCompanies,
  deleteCompany,
} = require("../controllers/adminController");

router.get("/dashboard", getDashboard);

router.get("/reports", getReports);

router.post("/company", addCompany);

router.get("/companies", getCompanies);

router.delete("/company/:id", deleteCompany);

module.exports = router;
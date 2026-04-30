const express = require("express");
const router = express.Router();

const { adminLogin } = require("../controllers/admin.controller");

const {
  adminLoginValidation,
  validate,
} = require("../validators/admin.validator");

router.post("/login", adminLoginValidation, validate, adminLogin);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createSeller,
  sellerLogin,
} = require("../controllers/seller.controller");

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");
const {
  sellerCreateValidation,
  sellerLoginValidation,
} = require("../validators/seller.validator");

const { validate } = require("../validators/admin.validator");

// Admin creates seller
router.post(
  "/create",
  protect,
  authorizeRoles("admin"),
  sellerCreateValidation,
  validate,
  createSeller,
);
// Seller login
router.post("/login", sellerLoginValidation, validate, sellerLogin);

module.exports = router;

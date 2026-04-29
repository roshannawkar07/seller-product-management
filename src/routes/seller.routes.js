const express = require("express");
const router = express.Router();

const {
  createSeller,
  sellerLogin,
} = require("../controllers/seller.controller");

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// Admin creates seller
router.post("/create", protect, authorizeRoles("admin"), createSeller);

// Seller login
router.post("/login", sellerLogin);

module.exports = router;

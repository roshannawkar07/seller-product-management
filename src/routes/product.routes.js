const express = require("express");
const router = express.Router();

const { addProduct } = require("../controllers/product.controller");

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// Only seller can add product
router.post("/add", protect, authorizeRoles("seller"), addProduct);

module.exports = router;

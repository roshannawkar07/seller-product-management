const express = require("express");
const router = express.Router();

const {
  addProduct,
  getMyProducts,
  deleteProduct,
  viewProductPDF,
} = require("../controllers/product.controller");

//vlidation and auth
const { productValidation } = require("../validators/product.validator");

const { validate } = require("../validators/admin.validator");

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// Add Product
router.post(
  "/add",
  protect,
  authorizeRoles("seller"),
  productValidation,
  validate,
  addProduct,
);
// Get My Products
router.get("/my-products", protect, authorizeRoles("seller"), getMyProducts);

// Delete Product
router.delete("/delete/:id", protect, authorizeRoles("seller"), deleteProduct);

// View Product PDF
router.get("/pdf/:id", protect, authorizeRoles("seller"), viewProductPDF);

module.exports = router;

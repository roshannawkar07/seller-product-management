const { body } = require("express-validator");

const productValidation = [
  body("productName").notEmpty().withMessage("Product name is required"),

  body("productDescription")
    .notEmpty()
    .withMessage("Product description is required"),

  body("brands")
    .isArray({ min: 1 })
    .withMessage("At least one brand is required"),
];

module.exports = {
  productValidation,
};

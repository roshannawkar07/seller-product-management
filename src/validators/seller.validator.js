const { body } = require("express-validator");

const sellerCreateValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("mobile").notEmpty().withMessage("Mobile is required"),

  body("country").notEmpty().withMessage("Country is required"),

  body("state").notEmpty().withMessage("State is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const sellerLoginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),

  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  sellerCreateValidation,
  sellerLoginValidation,
};

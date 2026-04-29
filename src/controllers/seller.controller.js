const Seller = require("../models/seller.model");
const generateToken = require("../utils/generateToken");

// Create Seller // Admin only
const createSeller = async (req, res) => {
  try {
    const { name, email, mobile, country, state, skills, password } = req.body;

    // check existing seller
    const existingSeller = await Seller.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingSeller) {
      return res.status(400).json({
        message: "Seller already exists with email or mobile",
      });
    }

    const seller = await Seller.create({
      name,
      email,
      mobile,
      country,
      state,
      skills,
      password,
    });

    res.status(201).json({
      message: "Seller created successfully",
      seller,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//seller login
const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    const isMatch = await seller.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(seller._id, seller.role);

    res.status(200).json({
      message: "Seller login successful",
      token,
      role: seller.role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSeller,
  sellerLogin,
};

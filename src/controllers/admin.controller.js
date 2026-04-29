const Admin = require("../models/admin.model");
const generateToken = require("../utils/generateToken");

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check admin exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // password compare
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // generate token
    const token = generateToken(admin._id, admin.role);

    res.status(200).json({
      message: "Admin login successful",
      token,
      role: admin.role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  adminLogin,
};

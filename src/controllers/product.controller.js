const Product = require("../models/product.model");

// Add Product
const addProduct = async (req, res) => {
  try {
    const { productName, productDescription, brands } = req.body;

    if (!brands || !brands.length) {
      return res.status(400).json({
        message: "At least one brand is required",
      });
    }

    const product = await Product.create({
      seller: req.user.id,
      productName,
      productDescription,
      brands,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
};

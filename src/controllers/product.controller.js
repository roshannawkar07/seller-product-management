const Product = require("../models/product.model");
const generateProductPDF = require("../utils/generatePDF");

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

// Get My Products
const getMyProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments({
      seller: req.user.id,
    });

    const products = await Product.find({
      seller: req.user.id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Products fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      _id: id,
      seller: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or unauthorized",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// View Product PDF
const viewProductPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      _id: id,
      seller: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or unauthorized",
      });
    }

    generateProductPDF(product, res);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getMyProducts,
  deleteProduct,
  viewProductPDF,
};

// product.js
const router = require("express").Router();
const mongoose = require("mongoose");

// Define the Product schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
});

// Create the Product model
const Product = mongoose.model("Product", ProductSchema);

// POST /products: Add a new product
router.post("/", async (req, res) => {
    console.log(req.body)
    console.log(Product)
    const data={
      "name" : "Samsung Galaxy S21",
      "description": "The is my phone",
        "price": 799.99,
        "category": "Electronics",
        "image": "https://m.media-amazon.com/images/I/41QPv5h1veL._SX300_SY300_QL70_FMwebp_.jpg"
      }
  // Create a new product from the request body
  const newProduct = new Product(req.body);
  try {
    // Save the product to the database
    const savedProduct = await newProduct.save();
    // Send back a success response with the saved product
    res.status(200).json(savedProduct);
  } catch (err) {
    // Send back an error response with the error message
    res.status(500).json(err);
  }
});

// GET /products: Retrieve all products
router.get("/", async (req, res) => {
  try {
    // Find all products from the database
    const products = await Product.find();
    // Send back a success response with the products
    res.status(200).json(products);
  } catch (err) {
    // Send back an error response with the error message
    res.status(500).json(err);
  }
});

module.exports = router;

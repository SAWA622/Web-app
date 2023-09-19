// combo.js
const router = require("express").Router();
const mongoose = require("mongoose");

// Define the Combo schema
const ComboSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

// Create the Combo model
const Combo = mongoose.model("Combo", ComboSchema);

// POST /combos: Create a new combo
router.post("/", async (req, res) => {
  // Create a new combo from the request body
  const newCombo = new Combo(req.body);
  try {
    // Save the combo to the database
    const savedCombo = await newCombo.save();
    // Send back a success response with the saved combo
    res.status(200).json(savedCombo);
  } catch (err) {
    // Send back an error response with the error message
    res.status(500).json(err);
  }
});

// GET /combos: Retrieve all combos
router.get("/", async (req, res) => {
  try {
    // Find all combos from the database and populate their products
    const combos = await Combo.find().populate("products");
    // Send back a success response with the combos
    res.status(200).json(combos);
  } catch (err) {
    // Send back an error response with the error message
    res.status(500).json(err);
  }
});

// GET /combos/suggest: Suggest the best combo(s) for the given products
router.get("/suggest", async (req, res) => {
  // Get the product ids from the query string
  const productIds = req.query.products;
  try {
    // Find all combos that contain at least one of the given products
    const combos = await Combo.find({
      products: { $in: productIds },
    }).populate("products");
    // Initialize an array to store the suggested combos
    const suggestions = [];
    // Loop through each combo
    for (let combo of combos) {
      // Check if the combo contains all of the given products
      const containsAll = productIds.every((id) =>
        combo.products.some((product) => product._id.equals(id))
      );
      // If yes, add it to the suggestions array
      if (containsAll) {
        suggestions.push(combo);
      }
    }
    // Sort the suggestions by price in ascending order
    suggestions.sort((a, b) => a.price - b.price);
    // Send back a success response with the suggestions
    res.status(200).json(suggestions);
  } catch (err) {
    // Send back an error response with the error message
    res.status(500).json(err);
  }
});

module.exports = router;

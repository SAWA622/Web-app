// deal.js
const router = require("express").Router();
const mongoose = require("mongoose");

// Define the Deal schema
const DealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

// Create the Deal model
const Deal = mongoose.model("Deal", DealSchema);

// POST /deals: Create a new deal
router.post("/", async (req, res) => {
  // Create a new deal from the request body
  const newDeal = new Deal(req.body);
  try {
    // Save the deal to the database
    const savedDeal = await newDeal.save();
    // Send back a success response with the saved deal
    res.status(200).json(savedDeal);
  } catch (err) {
    // Send back an error response with the error message
    res.status(500).json(err);
  }
});

// GET /deals: Retrieve all deals
router.get("/", async (req, res) => {
  try {
    // Find all deals from the database and populate their products
    const deals = await Deal.find().populate("products");
    // Send back a success response with the deals
    res.status(200).json(deals);
  } catch (err) {
    // Send back an error response with the error message
    res.status(500).json(err);
  }
});

module.exports = router;

// index.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
// Import the cors module
const cors = require('cors');

// Use express.json middleware to parse JSON requests
app.use(express.json());

// Import routes
const productRoute = require("./product");
const dealRoute = require("./deal");
const comboRoute = require("./combo");

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://Sawant_anand:Mongo1234@cluster0.vgsic6p.mongodb.net/your-database-name", // Replace with your actual database name
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

connectToMongoDB();

// Add this line to enable CORS on your backend with a specific origin
app.use(cors({ origin: 'http://localhost:4200' }));

// Use routes
app.use("/products", productRoute);
app.use("/deals", dealRoute);
app.use("/combos", comboRoute);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

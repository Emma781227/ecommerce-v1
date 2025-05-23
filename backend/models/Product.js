const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  imageUrl: { type: String }, // Optionnel pour affichage
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);

const Product = require("../models/Product");

// GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    const product = new Product({ name, description, price, stock, imageUrl });
    await product.save();

    res.status(201).json({ message: "Produit créé", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: "Produit non trouvé" });

    res.json({ message: "Produit mis à jour", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Produit non trouvé" });

    res.json({ message: "Produit supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

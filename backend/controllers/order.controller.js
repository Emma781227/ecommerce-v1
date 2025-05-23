const Order = require("../models/Order");

// GET /api/orders (admin) ou /api/orders/user (user) pour voir ses commandes
exports.getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find()
        .populate("user", "email")                      // user au lieu de userId
       .populate("products.product", "name price")

    } else {
      orders = await Order.find({ user: req.user.id }) // user au lieu de userId
        .populate("products.productId", "name price");
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders/:id pour récupérer une commande spécifique
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.product", "name price")

    if (!order) return res.status(404).json({ message: "Commande non trouvée" });

    // Vérification que le user peut accéder à la commande (admin ou owner)
    if (req.user.role !== "admin" && order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès interdit" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/orders pour créer une commande
const Product = require('../models/Product');  // Pense à importer Product en haut

exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "La commande doit contenir au moins un produit" });
    }

    // Calculer le total à partir des prix dans la base
    let total = 0;
    for (const item of products) {
      const productFromDb = await Product.findById(item.productId);
      if (!productFromDb) {
        return res.status(400).json({ message: `Produit non trouvé: ${item.productId}` });
      }
      total += productFromDb.price * item.quantity;
    }

    const order = new Order({
      user: req.user.userId,
      products,
      status: "pending",
      total
    });

    await order.save();
    res.status(201).json({ message: "Commande créée", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// PUT /api/orders/:id pour mettre à jour le statut (admin uniquement)
exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Accès interdit" });
    }

    const { status } = req.body;
    const validStatus = ["pending", "processing", "shipped", "delivered"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: "Commande non trouvée" });

    res.json({ message: "Statut mis à jour", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/orders/:id (admin uniquement)
exports.deleteOrder = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Accès interdit" });
    }

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Commande non trouvée" });

    res.json({ message: "Commande supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
 
const app = express();
app.use(cors());
app.use(express.json());
 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
 
app.get("/", (req, res) => {
  res.send("API is running");
});

// Utilisation des routes externes
const authRoutes = require("./routes/auth.routes");
console.log("authRoutes:", authRoutes);
app.use("/api/auth", authRoutes);
// Routes pour les produits;
const productRoutes = require("./routes/products.routes");
console.log("productRoutes:", productRoutes);
app.use("/api/products", productRoutes);
 
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
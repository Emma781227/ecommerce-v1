const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/roles");

// Public
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Admin only
router.post("/", auth, checkRole("admin"), productController.createProduct);
router.put("/:id", auth, checkRole("admin"), productController.updateProduct);
router.delete("/:id", auth, checkRole("admin"), productController.deleteProduct);

module.exports = router;

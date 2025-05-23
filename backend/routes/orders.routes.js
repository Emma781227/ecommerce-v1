const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');

// Liste commandes (admin: toutes, user: les siennes)
router.get('/', authMiddleware, orderController.getOrders);

// Création commande
router.post('/', authMiddleware, orderController.createOrder);

// Mise à jour statut (admin)
router.put('/:id/status', authMiddleware, roleMiddleware('admin'), orderController.updateOrderStatus);

// Suppression commande (admin)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), orderController.deleteOrder);

module.exports = router;

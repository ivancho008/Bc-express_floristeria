
// orders.routes.js
// Router for Order entity endpoints
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders.controller');

// Get all orders
router.get('/', orderController.getAllOrders); 
// Get order by ID
router.get('/:id', orderController.getOrderById);
// Create a new order
router.post('/', orderController.createOrder);
// Update order by ID
router.put('/:id', orderController.updateOrder);
// Delete order by ID
router.delete('/:id', orderController.deleteOrder);

module.exports = router;

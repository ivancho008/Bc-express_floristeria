
// bouquets.routes.js
// Router for Bouquet entity endpoints
const express = require('express');
const router = express.Router();
const bouquetController = require('../controllers/bouquets.controller');

// Get all bouquets
router.get('/', bouquetController.getAllBouquets); 
// Get bouquet by ID
router.get('/:id', bouquetController.getBouquetById);
// Create a new bouquet
router.post('/', bouquetController.createBouquet);
// Update bouquet by ID
router.put('/:id', bouquetController.updateBouquet);
// Delete bouquet by ID
router.delete('/:id', bouquetController.deleteBouquet);

module.exports = router;

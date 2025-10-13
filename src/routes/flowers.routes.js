// Router for Flower entity endpoints
const express = require('express');
const router = express.Router();
const flowerController = require('../controllers/flowers.controller');

// Get all flowers
router.get('/', flowerController.getAllFlowers); 
// Get flower by ID
router.get('/:id', flowerController.getFlowerById);
// Create a new flower
router.post('/', flowerController.createFlower);
// Update flower by ID
router.put('/:id', flowerController.updateFlower);
// Delete flower by ID
router.delete('/:id', flowerController.deleteFlower);

module.exports = router;

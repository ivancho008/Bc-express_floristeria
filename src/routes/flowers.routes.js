// src/routes/flowers.routes.js
const express = require('express');
const router = express.Router(); // Requisito 1: Usar express.Router()
const flowerController = require('../controllers/flowers.controller');

router.get('/', flowerController.getAllFlowers); 
router.get('/:id', flowerController.getFlowerById); // Requisito 2: Route Parameter :id
router.post('/', flowerController.createFlower);
router.put('/:id', flowerController.updateFlower);  // Requisito 2: Route Parameter :id
router.delete('/:id', flowerController.deleteFlower); // Requisito 2: Route Parameter :id

module.exports = router;

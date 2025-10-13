// src/routes/bouquets.routes.js
const express = require('express');
const router = express.Router();
const bouquetController = require('../controllers/bouquets.controller');

router.get('/', bouquetController.getAllBouquets); 
router.get('/:id', bouquetController.getBouquetById);
router.post('/', bouquetController.createBouquet);
router.put('/:id', bouquetController.updateBouquet);
router.delete('/:id', bouquetController.deleteBouquet);

module.exports = router;

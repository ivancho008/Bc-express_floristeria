// src/controllers/bouquets.controller.js
const { bouquets, getNextBouquetId } = require('../data/flowersData');

// Helper for validation (Requirement: Validate fields in POST/PUT - 400)
const validateBouquetData = (data) => {
    return data.name && data.description && data.price !== undefined && Array.isArray(data.flowerIds) && data.occasion && data.wrapping && data.designer;
};

// GET /api/bouquets
const getAllBouquets = (req, res) => {
    res.status(200).json(bouquets);
};

// GET /api/bouquets/:id
const getBouquetById = (req, res) => {
    const id = parseInt(req.params.id);
    const bouquet = bouquets.find(b => b.id === id);

    if (!bouquet) {
        // Requirement: ID validation (404 Not Found)
        return res.status(404).json({ message: 'Bouquet not found' });
    }
    res.status(200).json(bouquet);
};

// POST /api/bouquets
const createBouquet = (req, res) => {
    const newBouquet = req.body;

    if (!validateBouquetData(newBouquet)) {
        return res.status(400).json({ message: 'Missing required fields for Bouquet: name, description, price, flowerIds (must be an array), occasion, wrapping, designer.' });
    }

    newBouquet.id = getNextBouquetId();
    bouquets.push(newBouquet);
    res.status(201).json(newBouquet);
};

// PUT /api/bouquets/:id
const updateBouquet = (req, res) => {
    const id = parseInt(req.params.id);
    const bouquetIndex = bouquets.findIndex(b => b.id === id);

    if (bouquetIndex === -1) {
        return res.status(404).json({ message: 'Bouquet not found' });
    }

    const updatedData = req.body;
    if (!validateBouquetData(updatedData)) {
         return res.status(400).json({ message: 'Missing required fields for update.' });
    }

    bouquets[bouquetIndex] = { ...bouquets[bouquetIndex], ...updatedData, id };
    res.status(200).json(bouquets[bouquetIndex]);
};

// DELETE /api/bouquets/:id
const deleteBouquet = (req, res) => {
    const id = parseInt(req.params.id);
    const bouquetIndex = bouquets.findIndex(b => b.id === id);

    if (bouquetIndex === -1) {
        return res.status(404).json({ message: 'Bouquet not found' });
    }

    bouquets.splice(bouquetIndex, 1);
    res.status(200).json({ message: 'Bouquet successfully deleted', id });
};

module.exports = {
    getAllBouquets,
    getBouquetById,
    createBouquet,
    updateBouquet,
    deleteBouquet
};

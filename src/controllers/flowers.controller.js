const { flowers, getNextFlowerId } = require('../data/flowersData');

// Helper for validation (Requirement 4: Validate fields in POST/PUT - 400)
const validateFlowerData = (data) => {
    return data.name && data.color && data.price !== undefined && data.seasonality && data.stock !== undefined && data.origin && data.fragrance && data.supplier;
};

// GET /api/flowers
const getAllFlowers = (req, res) => {
    // Optional implementation for Query Strings could go here (e.g., filter by seasonality)
    res.status(200).json(flowers);
};

// GET /api/flowers/:id
const getFlowerById = (req, res) => {
    const id = parseInt(req.params.id);
    const flower = flowers.find(f => f.id === id);

    if (!flower) {
        // Requirement 2: ID validation (404 Not Found)
        return res.status(404).json({ message: 'Flower not found' });
    }
    res.status(200).json(flower);
};

// POST /api/flowers
const createFlower = (req, res) => {
    const newFlower = req.body;

    if (!validateFlowerData(newFlower)) {
        return res.status(400).json({ message: 'Missing required fields for Flower: name, color, price, seasonality, stock, origin, fragrance, supplier.' });
    }

    newFlower.id = getNextFlowerId();
    flowers.push(newFlower);
    res.status(201).json(newFlower); // Use 201 Created
};

// PUT /api/flowers/:id
const updateFlower = (req, res) => {
    const id = parseInt(req.params.id);
    const flowerIndex = flowers.findIndex(f => f.id === id);

    if (flowerIndex === -1) {
        return res.status(404).json({ message: 'Flower not found' });
    }

    const updatedData = req.body;
    if (!validateFlowerData(updatedData)) {
         return res.status(400).json({ message: 'Missing required fields for update.' });
    }

    flowers[flowerIndex] = { ...flowers[flowerIndex], ...updatedData, id };
    res.status(200).json(flowers[flowerIndex]);
};

// DELETE /api/flowers/:id
const deleteFlower = (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = flowers.length;
    
    // Simulate deletion
    const flowerIndex = flowers.findIndex(f => f.id === id);
    if (flowerIndex === -1) {
        return res.status(404).json({ message: 'Flower not found' });
    }
    flowers.splice(flowerIndex, 1);
    
    res.status(200).json({ message: 'Flower successfully deleted', id });
};

module.exports = {
    getAllFlowers,
    getFlowerById,
    createFlower,
    updateFlower,
    deleteFlower
};
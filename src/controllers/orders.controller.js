const { orders, getNextOrderId } = require('../data/flowersData');

const validateOrderData = (data) => {
    // customerName, bouquetId, deliveryDate, status
        return data.customerName && data.bouquetId !== undefined && data.deliveryDate && data.status && data.address && data.phone && data.paymentMethod && data.note;
        // Helper for validation (Requirement: Validate fields in POST/PUT - 400)
};

// GET /api/orders
const getAllOrders = (req, res) => {
    // GET /api/orders
    res.status(200).json(orders);
};

// GET /api/orders/:id
const getOrderById = (req, res) => {
    const id = parseInt(req.params.id);
    const order = orders.find(o => o.id === id);

    if (!order) {
    // Requirement: ID validation (404 Not Found)
    return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
};

// POST /api/orders
const createOrder = (req, res) => {
    const newOrder = req.body;

    if (!validateOrderData(newOrder)) {
    return res.status(400).json({ message: 'Missing required fields for Order: customerName, bouquetId, deliveryDate, status, address, phone, paymentMethod, note.' });
    }

    newOrder.id = getNextOrderId();
    orders.push(newOrder);
    res.status(201).json(newOrder);
};

// PUT /api/orders/:id
const updateOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const orderIndex = orders.findIndex(o => o.id === id);

    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }

    const updatedData = req.body;
    if (!validateOrderData(updatedData)) {
         return res.status(400).json({ message: 'Missing required fields for update.' });
    }

    orders[orderIndex] = { ...orders[orderIndex], ...updatedData, id };
    res.status(200).json(orders[orderIndex]);
};

// DELETE /api/orders/:id
const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const orderIndex = orders.findIndex(o => o.id === id);

    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }

    orders.splice(orderIndex, 1);
    res.status(200).json({ message: 'Order successfully deleted', id });
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};

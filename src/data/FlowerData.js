// Sequential ID definition to simulate a database
let nextFlowerId = 4;
let nextBouquetId = 5;
let nextOrderId = 4;

// Entity 1: Flower (Attributes: name, color, price, seasonality, stock)
const flowers = [
    { id: 1, name: 'Rose', color: 'Red', price: 5.00, seasonality: 'Year-round', stock: 150 },
    { id: 2, name: 'Lily', color: 'White', price: 4.50, seasonality: 'Spring', stock: 80 },
    { id: 3, name: 'Tulip', color: 'Yellow', price: 3.20, seasonality: 'Spring', stock: 200 },
];

// Entity 2: Bouquet (Attributes: name, description, price, flowerIds, occasion, wrapping, designer)
const bouquets = [
    { id: 1, name: 'Romantic Mix', description: 'A dozen red roses.', price: 60.00, flowerIds: [11] },
    { id: 2, name: 'Spring Basket', description: 'Mix of lilies and tulips.', price: 45.00, flowerIds: [12, 13] },
    { id: 3, name: 'Executive', description: 'White lilies only.', price: 55.00, flowerIds: [12] },
    { id: 4, name: 'Colombian love', description: 'twelve pink roses and red carnations.', price: 65.00, flowerIds: [2, 5], occasion: 'Anniversary', wrapping: 'Red paper', designer: 'María Fernanda' }
];

// Entity 3: Order (Attributes: customerName, bouquetId, deliveryDate, status)
const orders = [
    { id: 1, customerName: 'Ivan Yate', bouquetId: 1, deliveryDate: '2025-11-01', status: 'Pending' },
    { id: 2, customerName: 'Ana Smith', bouquetId: 3, deliveryDate: '2025-10-30', status: 'Delivered' },
    { id: 3, customerName: 'Peter Jones', bouquetId: 2, deliveryDate: '2025-11-05', status: 'Processing' },
    { id: 4, customerName: 'Jorge Ramírez', bouquetId: 1, deliveryDate: '2025-11-01', status: 'Pending', }
];

// Export data and ID counters
module.exports = { 
    flowers, 
    bouquets, 
    orders,
    getNextFlowerId: () => nextFlowerId++,
    getNextBouquetId: () => nextBouquetId++,
    getNextOrderId: () => nextOrderId++,
};
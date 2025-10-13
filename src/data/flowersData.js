// src/data/flowersData.js

// Counters to simulate ID assignment
let nextFlowerId = 11;
let nextBouquetId = 9;
let nextOrderId = 9;

// Entity 1: Flower (Attributes: name, color, price, seasonality, stock, origin, fragrance, supplier)
const flowers = [
    { id: 1, name: 'Orchid', color: 'Purple', price: 8.00, seasonality: 'All year', stock: 50, origin: 'Antioquia', fragrance: 'Soft', supplier: 'Flores Medellín' },
    { id: 2, name: 'Carnation', color: 'Red', price: 3.00, seasonality: 'Spring', stock: 120, origin: 'Cundinamarca', fragrance: 'Intense', supplier: 'Floricultores Bogotá' },
    { id: 3, name: 'Heliconia', color: 'Orange', price: 6.50, seasonality: 'Summer', stock: 80, origin: 'Valle del Cauca', fragrance: 'None', supplier: 'Tropical Flowers Cali' },
    { id: 4, name: 'Sunflower', color: 'Yellow', price: 4.00, seasonality: 'Summer', stock: 200, origin: 'Boyacá', fragrance: 'Fresh', supplier: 'Sol y Tierra' },
    { id: 5, name: 'Rose', color: 'Pink', price: 5.50, seasonality: 'All year', stock: 180, origin: 'Santander', fragrance: 'Sweet', supplier: 'Rosas Bucaramanga' },
    { id: 6, name: 'Daisy', color: 'White', price: 2.50, seasonality: 'Spring', stock: 90, origin: 'Tolima', fragrance: 'Mild', supplier: 'Campo Florido' },
    { id: 7, name: 'Alstroemeria', color: 'Yellow', price: 3.80, seasonality: 'All year', stock: 110, origin: 'Caldas', fragrance: 'None', supplier: 'Alstroemeras Manizales' },
    { id: 8, name: 'Gladiolus', color: 'Red', price: 4.20, seasonality: 'Summer', stock: 70, origin: 'Nariño', fragrance: 'Fresh', supplier: 'Gladiolos Pasto' },
    { id: 9, name: 'Lily', color: 'White', price: 6.00, seasonality: 'Spring', stock: 60, origin: 'Huila', fragrance: 'Intense', supplier: 'Lirios Neiva' },
    { id: 10, name: 'Tulip', color: 'Pink', price: 7.00, seasonality: 'Winter', stock: 40, origin: 'Cundinamarca', fragrance: 'Soft', supplier: 'Tulipanes Chía' }
];

// Entity 2: Bouquet (Attributes: name, description, price, flowerIds, occasion, wrapping, designer)
const bouquets = [
    { id: 1, name: 'Colombian Love', description: 'Twelve pink roses and red carnations.', price: 65.00, flowerIds: [2,5], occasion: 'Anniversary', wrapping: 'Red paper', designer: 'Maria Fernanda' },
    { id: 2, name: 'Tropical Party', description: 'Heliconias and orchids with foliage.', price: 55.00, flowerIds: [1,3], occasion: 'Birthday', wrapping: 'Green mesh', designer: 'Juan Camilo' },
    { id: 3, name: 'Boyaca Sun', description: 'Sunflowers and fresh carnations.', price: 40.00, flowerIds: [2,4], occasion: 'Graduation', wrapping: 'Yellow ribbon', designer: 'Paola Andrea' },
    { id: 4, name: 'Andean Elegance', description: 'Orchids and roses with soft aroma.', price: 80.00, flowerIds: [1,5], occasion: 'Wedding', wrapping: 'White silk', designer: 'Catalina Lopez' },
    { id: 5, name: 'Tolima Field', description: 'Daisies and gladiolus with greens.', price: 38.00, flowerIds: [6,8], occasion: 'Mother’s Day', wrapping: 'Pink paper', designer: 'Sandra Milena' },
    { id: 6, name: 'Caldas Yellow', description: 'Alstroemerias and sunflowers.', price: 42.00, flowerIds: [4,7], occasion: 'Birthday', wrapping: 'Yellow mesh', designer: 'Andres Felipe' },
    { id: 7, name: 'Huila White', description: 'Lilies and daisies.', price: 50.00, flowerIds: [6,9], occasion: 'Sympathy', wrapping: 'White paper', designer: 'Diana Carolina' },
    { id: 8, name: 'Cundinamarca Tulip', description: 'Tulips and roses.', price: 60.00, flowerIds: [5,10], occasion: 'Valentine', wrapping: 'Red silk', designer: 'Camila Vargas' }
];

// Entity 3: Order (Attributes: customerName, bouquetId, deliveryDate, status, address, phone, paymentMethod, note)
const orders = [
    { id: 1, customerName: 'Jorge Ramirez', bouquetId: 1, deliveryDate: '2025-11-01', status: 'Pending', address: 'Cra 15 #45-23, Bogotá', phone: '3104567890', paymentMethod: 'Nequi', note: 'Deliver before 10am' },
    { id: 2, customerName: 'Luisa Fernanda', bouquetId: 3, deliveryDate: '2025-10-30', status: 'Delivered', address: 'Cll 8 #12-34, Medellín', phone: '3012345678', paymentMethod: 'Cash', note: 'Call on arrival' },
    { id: 3, customerName: 'Camilo Torres', bouquetId: 2, deliveryDate: '2025-11-05', status: 'Processing', address: 'Av 9 #67-89, Cali', phone: '3209876543', paymentMethod: 'Card', note: 'Leave at reception' },
    { id: 4, customerName: 'Paola Rios', bouquetId: 4, deliveryDate: '2025-11-12', status: 'Pending', address: 'Cll 23 #56-78, Bucaramanga', phone: '3123456789', paymentMethod: 'Daviplata', note: 'Do not ring, call' },
    { id: 5, customerName: 'Sandra Milena', bouquetId: 5, deliveryDate: '2025-11-15', status: 'Pending', address: 'Cll 45 #23-56, Ibagué', phone: '3134567890', paymentMethod: 'Nequi', note: 'Deliver to neighbor if not home' },
    { id: 6, customerName: 'Andres Felipe', bouquetId: 6, deliveryDate: '2025-11-18', status: 'Delivered', address: 'Av 10 #34-56, Manizales', phone: '3145678901', paymentMethod: 'Card', note: 'Leave at main door' },
    { id: 7, customerName: 'Diana Carolina', bouquetId: 7, deliveryDate: '2025-11-20', status: 'Processing', address: 'Cra 7 #89-12, Neiva', phone: '3156789012', paymentMethod: 'Cash', note: 'Call before delivery' },
    { id: 8, customerName: 'Camila Vargas', bouquetId: 8, deliveryDate: '2025-11-22', status: 'Pending', address: 'Cll 12 #34-56, Chía', phone: '3167890123', paymentMethod: 'Daviplata', note: 'Deliver after 5pm' }
];

// Export data and functions to get next IDs
module.exports = { 
    flowers, 
    bouquets, 
    orders,
    getNextFlowerId: () => nextFlowerId++,
    getNextBouquetId: () => nextBouquetId++,
    getNextOrderId: () => nextOrderId++,
};
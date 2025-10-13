// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Importar los routers modulares (Requisito 1: express.Router())
const flowersRouter = require('./src/routes/flowers.routes');
const bouquetsRouter = require('./src/routes/bouquets.routes');
const ordersRouter = require('./src/routes/orders.routes');

// Middleware para parsear el body como JSON
app.use(express.json());

// Montar las rutas en los endpoints base requeridos
app.use('/api/flowers', flowersRouter);
app.use('/api/bouquets', bouquetsRouter);
app.use('/api/orders', ordersRouter);

// Ruta base de prueba
app.get('/', (req, res) => {
	res.send('Welcome to the Floristería API (Práctica 4)!');
});

// Manejo básico de error 404 (Ruta no encontrada)
app.use((req, res, next) => {
	res.status(404).json({ message: 'Resource Not Found' });
});

// Inicio del servidor
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

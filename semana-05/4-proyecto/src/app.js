import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());
app.use(express.json());

// Hacer Prisma disponible en req
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: '📚 Blog API - Semana 5',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts',
    },
  });
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Middleware de error handling
app.use(errorHandler);

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Ruta ${req.originalUrl} no encontrada`,
    },
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📖 Documentación: http://localhost:${PORT}`);
  console.log(`👥 Usuarios: http://localhost:${PORT}/api/users`);
  console.log(`📝 Posts: http://localhost:${PORT}/api/posts`);
});

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\n👋 Cerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

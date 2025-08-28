const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Importar rutas
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

// Importar middleware
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use(logger);

// Middleware para hacer Prisma disponible (opcional - los controladores usan su propia instancia)
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Ruta raíz con información de la API
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '📚 Blog API - Semana 5',
    version: '1.0.0',
    description: 'API REST para gestión de usuarios y posts de blog',
    endpoints: {
      users: {
        base: '/api/users',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        description: 'Gestión de usuarios',
      },
      posts: {
        base: '/api/posts',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        description: 'Gestión de posts',
      },
    },
    documentation: 'Ver README.md para documentación completa',
  });
});

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Middleware de manejo de errores (debe ir después de las rutas)
app.use(errorHandler);

// Ruta 404 para endpoints no encontrados
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Endpoint ${req.method} ${req.originalUrl} no encontrado`,
      suggestion: 'Verifica la documentación de la API en /',
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

# 🛠️ PRÁCTICA SEMANA 6: CRUD Completo con Express

## 🎯 Objetivo

Construir una API E-commerce completa con múltiples entidades relacionadas, implementando CRUD avanzado, relaciones complejas y validaciones de negocio robustas.

---

## 📋 Actividades Prácticas

### ⏰ BLOQUE 1 (90 min): Setup y Estructura Base

#### 🔧 Actividad 1.1: Inicialización del Proyecto (20 min)

```bash
# Crear proyecto E-commerce API
mkdir ecommerce-api-semana6
cd ecommerce-api-semana6

# Inicializar con estructura avanzada
npm init -y

# Instalar dependencias principales
npm install express prisma @prisma/client cors joi bcryptjs jsonwebtoken

# Instalar dependencias de desarrollo
npm install -D nodemon

# Inicializar Prisma
npx prisma init --datasource-provider sqlite
```

**📁 Estructura de Proyecto Avanzada:**
```
ecommerce-api/
├── src/
│   ├── controllers/        # Lógica de endpoints
│   ├── services/          # Lógica de negocio
│   ├── repositories/      # Acceso a datos
│   ├── routes/           # Definición de rutas
│   ├── middleware/       # Middleware personalizado
│   ├── validators/       # Validaciones Joi
│   ├── errors/          # Clases de error personalizadas
│   └── utils/           # Utilidades
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
└── tests/              # Testing (próxima semana)
```

#### 🗄️ Actividad 1.2: Modelos de Base de Datos Complejos (30 min)

```javascript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(CUSTOMER)
  status    String   @default("active")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  profile   UserProfile?
  orders    Order[]
  reviews   Review[]
  
  @@index([email])
  @@index([status])
}

model UserProfile {
  id        Int     @id @default(autoincrement())
  phone     String?
  address   String?
  city      String?
  zipCode   String?
  userId    Int     @unique
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Category {
  id          Int        @id @default(autoincrement())
  name        String     @unique
  description String?
  parentId    Int?
  parent      Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  products    ProductCategory[]
  createdAt   DateTime   @default(now())
  
  @@index([parentId])
}

model Product {
  id          Int       @id @default(autoincrement())
  name        String
  description String?
  price       Decimal   @db.Decimal(10, 2)
  stock       Int       @default(0)
  sku         String    @unique
  status      String    @default("active")
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  categories  ProductCategory[]
  orderItems  OrderItem[]
  reviews     Review[]
  
  @@index([status])
  @@index([price])
  @@index([sku])
}

model ProductCategory {
  id         Int      @id @default(autoincrement())
  productId  Int
  categoryId Int
  featured   Boolean  @default(false)
  order      Int?
  createdAt  DateTime @default(now())
  
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  
  @@unique([productId, categoryId])
}

model Order {
  id            Int         @id @default(autoincrement())
  orderNumber   String      @unique
  userId        Int
  status        OrderStatus @default(PENDING)
  subtotal      Decimal     @db.Decimal(10, 2)
  tax           Decimal     @db.Decimal(10, 2) @default(0)
  total         Decimal     @db.Decimal(10, 2)
  shippingAddress String
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  user          User        @relation(fields: [userId], references: [id])
  items         OrderItem[]
  payment       Payment?
  
  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  price     Decimal @db.Decimal(10, 2)
  
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])
  
  @@unique([orderId, productId])
}

model Payment {
  id            Int           @id @default(autoincrement())
  orderId       Int           @unique
  method        PaymentMethod
  status        PaymentStatus @default(PENDING)
  amount        Decimal       @db.Decimal(10, 2)
  transactionId String?
  createdAt     DateTime      @default(now())
  
  order         Order         @relation(fields: [orderId], references: [id])
}

model Review {
  id        Int      @id @default(autoincrement())
  userId    Int
  productId Int
  rating    Int      // 1-5
  comment   String?
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
  product   Product  @relation(fields: [productId], references: [id])
  
  @@unique([userId, productId])
  @@check([rating >= 1 AND rating <= 5])
}

enum Role {
  ADMIN
  CUSTOMER
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentMethod {
  CREDIT_CARD
  DEBIT_CARD
  PAYPAL
  CASH_ON_DELIVERY
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}
```

#### ⚙️ Actividad 1.3: Configuración Avanzada (20 min)

```javascript
// src/config/database.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty'
});

module.exports = prisma;
```

```javascript
// src/errors/CustomErrors.js
class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

class BusinessLogicError extends AppError {
  constructor(message) {
    super(message, 400, 'BUSINESS_LOGIC_ERROR');
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  BusinessLogicError
};
```

#### 🚀 Actividad 1.4: Servidor Base con Middleware (20 min)

```javascript
// src/app.js
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/logger');

// Importar rutas
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Rutas de la API
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🛒 E-commerce API - Semana 6',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      categories: '/api/categories',
      orders: '/api/orders'
    },
    documentation: 'Ver README.md para guía completa'
  });
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// Middleware de error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Endpoint ${req.method} ${req.originalUrl} not found`
    }
  });
});

// Iniciar servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 E-commerce API running on http://localhost:${PORT}`);
    console.log(`📖 Documentation: http://localhost:${PORT}`);
  });
}

module.exports = app;
```

**📝 Verificación Bloque 1:**
- [ ] Proyecto inicializado con estructura avanzada
- [ ] Modelos de BD complejos definidos
- [ ] Primera migración aplicada
- [ ] Servidor base funcionando

---

### ⏰ BLOQUE 2 (90 min): Implementación CRUD Avanzado

#### 👥 Actividad 2.1: Repository Pattern - Usuarios (25 min)

```javascript
// src/repositories/userRepository.js
const prisma = require('../config/database');

class UserRepository {
  async findAll(filters = {}) {
    const { role, status, page = 1, limit = 10 } = filters;
    
    const where = {
      ...(role && { role }),
      ...(status && { status })
    };

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          createdAt: true,
          profile: {
            select: {
              phone: true,
              city: true
            }
          },
          _count: {
            select: {
              orders: true,
              reviews: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.user.count({ where })
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        orders: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            total: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        _count: {
          select: {
            orders: true,
            reviews: true
          }
        }
      }
    });
  }

  async create(userData) {
    const { profile, ...userInfo } = userData;
    
    return await prisma.user.create({
      data: {
        ...userInfo,
        ...(profile && {
          profile: {
            create: profile
          }
        })
      },
      include: {
        profile: true
      }
    });
  }

  async update(id, userData) {
    const { profile, ...userInfo } = userData;
    
    return await prisma.user.update({
      where: { id },
      data: {
        ...userInfo,
        ...(profile && {
          profile: {
            upsert: {
              create: profile,
              update: profile
            }
          }
        })
      },
      include: {
        profile: true
      }
    });
  }

  async delete(id) {
    return await prisma.user.delete({
      where: { id }
    });
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    });
  }
}

module.exports = new UserRepository();
```

#### 📦 Actividad 2.2: Service Layer - Productos (25 min)

```javascript
// src/services/productService.js
const productRepository = require('../repositories/productRepository');
const { ValidationError, NotFoundError, BusinessLogicError } = require('../errors/CustomErrors');

class ProductService {
  async getAllProducts(filters) {
    try {
      return await productRepository.findAll(filters);
    } catch (error) {
      throw new AppError('Error retrieving products', 500);
    }
  }

  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Product');
    }
    return product;
  }

  async createProduct(productData) {
    // Validar que el SKU no exista
    const existingSku = await productRepository.findBySku(productData.sku);
    if (existingSku) {
      throw new BusinessLogicError('SKU already exists');
    }

    // Validar categorías
    if (productData.categoryIds && productData.categoryIds.length > 0) {
      const validCategories = await this.validateCategories(productData.categoryIds);
      if (validCategories.length !== productData.categoryIds.length) {
        throw new ValidationError('Some categories do not exist');
      }
    }

    return await productRepository.create(productData);
  }

  async updateProduct(id, productData) {
    // Verificar que el producto existe
    await this.getProductById(id);

    // Si se actualiza el SKU, verificar que no exista
    if (productData.sku) {
      const existingSku = await productRepository.findBySku(productData.sku);
      if (existingSku && existingSku.id !== id) {
        throw new BusinessLogicError('SKU already exists');
      }
    }

    return await productRepository.update(id, productData);
  }

  async deleteProduct(id) {
    const product = await this.getProductById(id);
    
    // Verificar que no tenga órdenes pendientes
    const pendingOrders = await productRepository.findPendingOrders(id);
    if (pendingOrders.length > 0) {
      throw new BusinessLogicError('Cannot delete product with pending orders');
    }

    return await productRepository.delete(id);
  }

  async searchProducts(searchParams) {
    const {
      q,
      categoryId,
      minPrice,
      maxPrice,
      inStock,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = searchParams;

    const filters = {
      ...(q && { name: { contains: q, mode: 'insensitive' } }),
      ...(categoryId && {
        categories: {
          some: { categoryId: parseInt(categoryId) }
        }
      }),
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
      ...(inStock && { stock: { gt: 0 } }),
      status: 'active'
    };

    return await productRepository.findAll({
      where: filters,
      orderBy: { [sortBy]: sortOrder },
      page,
      limit
    });
  }

  async updateStock(id, quantity, operation = 'increment') {
    const product = await this.getProductById(id);
    
    if (operation === 'decrement' && product.stock < quantity) {
      throw new BusinessLogicError('Insufficient stock');
    }

    return await productRepository.updateStock(id, quantity, operation);
  }

  async addCategoriesToProduct(productId, categoryIds) {
    await this.getProductById(productId);
    const validCategories = await this.validateCategories(categoryIds);
    
    if (validCategories.length !== categoryIds.length) {
      throw new ValidationError('Some categories do not exist');
    }

    return await productRepository.addCategories(productId, categoryIds);
  }

  async removeProductFromCategory(productId, categoryId) {
    await this.getProductById(productId);
    return await productRepository.removeFromCategory(productId, categoryId);
  }

  // Métodos privados
  async validateCategories(categoryIds) {
    return await prisma.category.findMany({
      where: {
        id: { in: categoryIds.map(id => parseInt(id)) }
      }
    });
  }
}

module.exports = new ProductService();
```

#### 📋 Actividad 2.3: Controllers Avanzados (25 min)

```javascript
// src/controllers/productController.js
const productService = require('../services/productService');
const { validateCreateProduct, validateUpdateProduct } = require('../validators/productValidator');

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const filters = {
        status: req.query.status,
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 20
      };

      const result = await productService.getAllProducts(filters);
      
      res.json({
        success: true,
        data: result.products,
        pagination: result.pagination
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(parseInt(id));
      
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      // Validar datos de entrada
      const { error, value } = validateCreateProduct(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const product = await productService.createProduct(value);
      
      res.status(201).json({
        success: true,
        data: product,
        message: 'Product created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      
      const { error, value } = validateUpdateProduct(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const product = await productService.updateProduct(parseInt(id), value);
      
      res.json({
        success: true,
        data: product,
        message: 'Product updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(parseInt(id));
      
      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async searchProducts(req, res, next) {
    try {
      const result = await productService.searchProducts(req.query);
      
      res.json({
        success: true,
        data: result.products,
        pagination: result.pagination,
        filters: req.query
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity, operation } = req.body;

      if (!quantity || !operation) {
        throw new ValidationError('Quantity and operation are required');
      }

      const product = await productService.updateStock(
        parseInt(id), 
        parseInt(quantity), 
        operation
      );
      
      res.json({
        success: true,
        data: product,
        message: 'Stock updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
```

#### 🧪 Actividad 2.4: Testing Manual Avanzado (15 min)

```bash
# 1. Crear categorías jerárquicas
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Electronics","description":"Electronic products"}'

curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Smartphones","description":"Mobile phones","parentId":1}'

# 2. Crear producto con categorías
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name":"iPhone 15 Pro",
    "description":"Latest iPhone model",
    "price":999.99,
    "stock":50,
    "sku":"IP15P001",
    "categoryIds":[1,2]
  }'

# 3. Búsqueda avanzada
curl "http://localhost:3000/api/products/search?q=iPhone&minPrice=500&maxPrice=1500&inStock=true"

# 4. Actualizar stock
curl -X PATCH http://localhost:3000/api/products/1/stock \
  -H "Content-Type: application/json" \
  -d '{"quantity":5,"operation":"decrement"}'
```

**📝 Verificación Bloque 2:**
- [ ] Repository pattern implementado
- [ ] Service layer con lógica de negocio
- [ ] Controllers organizados y funcionales
- [ ] Testing manual exitoso

---

## ✅ Entregables de la Práctica

### 1. **API Funcional Completa**
- [ ] 4+ entidades con CRUD completo
- [ ] Relaciones complejas funcionando
- [ ] Búsqueda avanzada implementada
- [ ] Validaciones de negocio robustas

### 2. **Arquitectura Profesional**
- [ ] Repository pattern implementado
- [ ] Service layer para lógica de negocio
- [ ] Error handling centralizado
- [ ] Estructura de carpetas organizada

### 3. **Base de Datos Optimizada**
- [ ] Modelos con relaciones complejas
- [ ] Índices para optimización
- [ ] Transacciones para consistencia
- [ ] Migraciones aplicadas

### 4. **Documentación y Testing**
- [ ] README con instrucciones completas
- [ ] Ejemplos de uso para todos los endpoints
- [ ] Testing manual exhaustivo
- [ ] Casos edge documentados

---

## 🚨 Troubleshooting Común

### Error: "Unique constraint failed"
```javascript
// Verificar duplicados antes de crear
const existing = await repository.findBySku(sku);
if (existing) {
  throw new BusinessLogicError('SKU already exists');
}
```

### Error: "Foreign key constraint failed"
```javascript
// Validar relaciones antes de crear
const category = await categoryRepository.findById(categoryId);
if (!category) {
  throw new ValidationError('Category does not exist');
}
```

### Performance lento en búsquedas
```javascript
// Agregar índices apropiados en schema.prisma
@@index([status])
@@index([price])
@@index([categoryId, status])
```

---

## 🎯 Objetivos Alcanzados

Al completar esta práctica habrás:

1. ✅ **Implementado arquitectura CRUD avanzada** con patrones profesionales
2. ✅ **Manejado relaciones complejas** entre múltiples entidades
3. ✅ **Aplicado validaciones de negocio** robustas y error handling
4. ✅ **Optimizado consultas** con índices y paginación eficiente
5. ✅ **Construido API escalable** lista para producción

**¡Excelente trabajo construyendo una API de nivel profesional!** 🎉

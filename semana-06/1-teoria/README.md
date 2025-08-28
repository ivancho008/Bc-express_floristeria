# 📚 TEORÍA SEMANA 6: CRUD Completo con Express

## 🎯 Objetivos de la Sesión Teórica

- Dominar patrones avanzados de CRUD con múltiples entidades
- Entender relaciones complejas en bases de datos relacionales
- Aprender optimización de consultas y performance
- Implementar validaciones de negocio robustas

---

## 1. 🏗️ Arquitectura CRUD Avanzada

### Evolución del CRUD Básico

**CRUD Básico (Semana 5):**

```
User -> CRUD simple
Post -> CRUD simple + relación básica
```

**CRUD Completo (Semana 6):**

```
User -> Roles + Perfiles + Preferencias
Product -> Categorías + Inventario + Reviews
Order -> Items + Shipping + Payments
Category -> Jerarquías + Metadatos
```

### Patrones de Diseño CRUD

#### 1. **Repository Pattern**

Separa la lógica de acceso a datos de la lógica de negocio.

```javascript
// repository/userRepository.js
class UserRepository {
  async findWithRoles(userId) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: true,
        profile: true,
        orders: { include: { items: true } },
      },
    });
  }

  async findByRoleAndStatus(role, status) {
    return await prisma.user.findMany({
      where: {
        roles: { some: { name: role } },
        status: status,
      },
    });
  }
}
```

#### 2. **Service Layer Pattern**

Encapsula lógica de negocio compleja.

```javascript
// services/orderService.js
class OrderService {
  async createOrder(userId, items) {
    // Validaciones de negocio
    await this.validateUserCanOrder(userId);
    await this.validateItemsAvailability(items);

    // Transacción compleja
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: { userId, status: 'pending' },
      });

      for (const item of items) {
        await tx.orderItem.create({
          data: { orderId: order.id, ...item },
        });
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return order;
    });
  }
}
```

---

## 2. 🔗 Relaciones Complejas en Base de Datos

### Tipos de Relaciones Avanzadas

#### **Relación Uno a Uno (1:1) - Extendida**

Un usuario tiene un perfil único con configuraciones.

```prisma
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  profile Profile?
  settings UserSettings?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  avatar String?
  userId Int    @unique
  user   User   @relation(fields: [userId], references: [id])
}

model UserSettings {
  id           Int     @id @default(autoincrement())
  notifications Boolean @default(true)
  theme        String  @default("light")
  language     String  @default("es")
  userId       Int     @unique
  user         User    @relation(fields: [userId], references: [id])
}
```

#### **Relación Uno a Muchos (1:N) - Jerarquías**

Categorías con subcategorías (auto-referencia).

```prisma
model Category {
  id          Int        @id @default(autoincrement())
  name        String
  parentId    Int?
  parent      Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  products    Product[]
}
```

#### **Relación Muchos a Muchos (N:M) - Tabla Intermedia**

Productos con múltiples categorías y metadatos adicionales.

```prisma
model Product {
  id         Int                 @id @default(autoincrement())
  name       String
  categories ProductCategory[]
}

model Category {
  id       Int                 @id @default(autoincrement())
  name     String
  products ProductCategory[]
}

model ProductCategory {
  id         Int      @id @default(autoincrement())
  productId  Int
  categoryId Int
  featured   Boolean  @default(false)  // Metadato adicional
  order      Int?                       // Orden en la categoría
  createdAt  DateTime @default(now())

  product    Product  @relation(fields: [productId], references: [id])
  category   Category @relation(fields: [categoryId], references: [id])

  @@unique([productId, categoryId])
}
```

### Estrategias de Consulta

#### **Eager Loading vs Lazy Loading**

```javascript
// Eager Loading - Carga todo de una vez
const productWithEverything = await prisma.product.findUnique({
  where: { id: 1 },
  include: {
    categories: {
      include: { category: true },
    },
    reviews: {
      include: { user: { select: { name: true } } },
    },
    images: true,
    variants: true,
  },
});

// Lazy Loading - Carga bajo demanda
const product = await prisma.product.findUnique({
  where: { id: 1 },
});

// Solo si necesitamos las categorías
if (needCategories) {
  product.categories = await prisma.productCategory.findMany({
    where: { productId: 1 },
    include: { category: true },
  });
}
```

---

## 3. 🔍 Consultas Avanzadas y Optimización

### Filtros Complejos

```javascript
// Búsqueda avanzada de productos
const searchProducts = async (filters) => {
  const {
    name,
    categoryIds,
    minPrice,
    maxPrice,
    inStock,
    featured,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 10,
  } = filters;

  const where = {
    ...(name && {
      name: { contains: name, mode: 'insensitive' },
    }),
    ...(categoryIds?.length && {
      categories: {
        some: {
          categoryId: { in: categoryIds },
        },
      },
    }),
    ...(minPrice && { price: { gte: minPrice } }),
    ...(maxPrice && { price: { lte: maxPrice } }),
    ...(inStock && { stock: { gt: 0 } }),
    ...(featured && {
      categories: {
        some: { featured: true },
      },
    }),
  };

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      include: {
        categories: {
          include: { category: true },
        },
        _count: { select: { reviews: true } },
      },
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};
```

### Agregaciones y Estadísticas

```javascript
// Dashboard con estadísticas
const getDashboardStats = async () => {
  const stats = await prisma.$transaction([
    // Total de usuarios activos
    prisma.user.count({
      where: { status: 'active' },
    }),

    // Productos por categoría
    prisma.category.findMany({
      select: {
        name: true,
        _count: {
          select: { products: true },
        },
      },
    }),

    // Ventas del último mes
    prisma.order.aggregate({
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
      _sum: { total: true },
      _count: true,
      _avg: { total: true },
    }),

    // Top productos más vendidos
    prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: {
        _sum: { quantity: 'desc' },
      },
      take: 5,
    }),
  ]);

  return {
    activeUsers: stats[0],
    productsByCategory: stats[1],
    salesLastMonth: stats[2],
    topProducts: stats[3],
  };
};
```

---

## 4. ✅ Validaciones de Negocio Avanzadas

### Validaciones Multi-Nivel

#### **Nivel 1: Esquema de Base de Datos**

```prisma
model Order {
  id        Int      @id @default(autoincrement())
  total     Decimal  @db.Decimal(10, 2) // Precisión exacta para dinero
  status    String   @default("pending") // pending, confirmed, shipped, delivered
  userId    Int
  createdAt DateTime @default(now())

  user      User       @relation(fields: [userId], references: [id])
  items     OrderItem[]

  @@check([total >= 0]) // No puede ser negativo
}
```

#### **Nivel 2: Validación de Entrada (DTO)**

```javascript
const Joi = require('joi');

const createOrderSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().min(1).max(100).required(),
        price: Joi.number().positive().precision(2).required(),
      })
    )
    .min(1)
    .max(20)
    .required(),
  shippingAddress: Joi.object({
    street: Joi.string().min(5).max(100).required(),
    city: Joi.string().min(2).max(50).required(),
    zipCode: Joi.string()
      .pattern(/^\d{5}$/)
      .required(),
  }).required(),
});
```

#### **Nivel 3: Lógica de Negocio**

```javascript
class OrderValidationService {
  async validateOrderCreation(orderData) {
    const { userId, items } = orderData;

    // 1. Verificar que el usuario existe y está activo
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.status !== 'active') {
      throw new BusinessLogicError('Usuario no válido o inactivo');
    }

    // 2. Verificar disponibilidad de productos
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new BusinessLogicError(`Producto ${item.productId} no existe`);
      }

      if (product.stock < item.quantity) {
        throw new BusinessLogicError(
          `Stock insuficiente para ${product.name}. Disponible: ${product.stock}`
        );
      }

      // 3. Verificar que el precio no ha cambiado
      if (Math.abs(product.price - item.price) > 0.01) {
        throw new BusinessLogicError(
          `Precio de ${product.name} ha cambiado. Actualizar carrito.`
        );
      }
    }

    // 4. Verificar límites del usuario
    const userOrdersThisMonth = await prisma.order.count({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().setDate(1)), // Primer día del mes
        },
      },
    });

    if (userOrdersThisMonth >= 10) {
      throw new BusinessLogicError('Límite de órdenes mensuales alcanzado');
    }

    return true;
  }
}
```

### Manejo de Errores de Negocio

```javascript
// errors/BusinessLogicError.js
class BusinessLogicError extends Error {
  constructor(message, code = 'BUSINESS_LOGIC_ERROR', statusCode = 400) {
    super(message);
    this.name = 'BusinessLogicError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

// middleware/errorHandler.js
const handleBusinessLogicError = (error, req, res, next) => {
  if (error instanceof BusinessLogicError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        type: 'BUSINESS_LOGIC_ERROR',
        code: error.code,
        message: error.message,
        timestamp: new Date().toISOString(),
      },
    });
  }

  next(error);
};
```

---

## 5. ⚡ Optimización y Performance

### Índices de Base de Datos

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Decimal
  categoryId  Int
  status      String
  createdAt   DateTime @default(now())

  category    Category @relation(fields: [categoryId], references: [id])

  // Índices para optimizar consultas frecuentes
  @@index([categoryId])           // Para filtrar por categoría
  @@index([status])               // Para filtrar por estado
  @@index([price])                // Para ordenar por precio
  @@index([createdAt])            // Para ordenar por fecha
  @@index([categoryId, status])   // Índice compuesto para filtros combinados
}
```

### Técnicas de Optimización

#### **1. Select Específico**

```javascript
// ❌ Malo - Carga todos los campos
const products = await prisma.product.findMany();

// ✅ Bueno - Solo campos necesarios
const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    category: {
      select: { name: true },
    },
  },
});
```

#### **2. Paginación Eficiente**

```javascript
// ❌ Malo - OFFSET alto es lento
const products = await prisma.product.findMany({
  skip: 10000,
  take: 20,
});

// ✅ Bueno - Cursor-based pagination
const products = await prisma.product.findMany({
  cursor: { id: lastProductId },
  take: 20,
  orderBy: { id: 'asc' },
});
```

#### **3. Batch Operations**

```javascript
// ❌ Malo - Múltiples queries
for (const item of items) {
  await prisma.orderItem.create({ data: item });
}

// ✅ Bueno - Una sola query
await prisma.orderItem.createMany({
  data: items,
});
```

---

## 6. 🔒 Transacciones y Consistencia

### Transacciones Simples

```javascript
const transferProductStock = async (fromProductId, toProductId, quantity) => {
  await prisma.$transaction(async (tx) => {
    // Restar del producto origen
    const fromProduct = await tx.product.update({
      where: { id: fromProductId },
      data: { stock: { decrement: quantity } },
    });

    if (fromProduct.stock < 0) {
      throw new Error('Stock insuficiente');
    }

    // Sumar al producto destino
    await tx.product.update({
      where: { id: toProductId },
      data: { stock: { increment: quantity } },
    });
  });
};
```

### Transacciones Complejas

```javascript
const processOrder = async (orderData) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Crear la orden
    const order = await tx.order.create({
      data: {
        userId: orderData.userId,
        status: 'pending',
        total: 0,
      },
    });

    let orderTotal = 0;

    // 2. Procesar cada item
    for (const item of orderData.items) {
      // Verificar stock
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      });

      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para ${product.name}`);
      }

      // Crear item de orden
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        },
      });

      // Reducir stock
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });

      orderTotal += product.price * item.quantity;
    }

    // 3. Actualizar total de la orden
    const finalOrder = await tx.order.update({
      where: { id: order.id },
      data: { total: orderTotal },
    });

    return finalOrder;
  });
};
```

---

## 📝 Resumen de Conceptos Clave

### **Arquitectura CRUD Avanzada**

1. **Repository Pattern** - Separación de acceso a datos
2. **Service Layer** - Lógica de negocio encapsulada
3. **DTO Pattern** - Validación de entrada estructurada

### **Relaciones Complejas**

1. **Auto-referencia** - Jerarquías (categorías padre/hijo)
2. **Tablas intermedias** - Metadatos en relaciones N:M
3. **Consultas optimizadas** - Includes, selects específicos

### **Validaciones Multi-Nivel**

1. **Esquema BD** - Constraints y checks
2. **DTO Validation** - Joi/Zod para entrada
3. **Business Logic** - Reglas de negocio complejas

### **Performance y Optimización**

1. **Índices estratégicos** - Para consultas frecuentes
2. **Paginación eficiente** - Cursor-based vs offset
3. **Transacciones** - Consistencia de datos

---

## 🎯 Para la Práctica

En la sesión práctica aplicaremos estos conceptos construyendo:

1. ✅ **API E-commerce completa** con 4 entidades relacionadas
2. ✅ **Sistema de categorías jerárquicas** con auto-referencia
3. ✅ **Órdenes con items y pagos** usando transacciones
4. ✅ **Búsqueda avanzada** con filtros múltiples y paginación
5. ✅ **Validaciones de negocio** robustas y error handling

**¡Vamos a implementar un sistema real y robusto!** 🚀

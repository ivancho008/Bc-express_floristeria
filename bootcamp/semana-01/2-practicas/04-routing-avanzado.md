# Práctica 4: Routing Avanzado y Organización

## 🎯 Objetivo

Aplicar patrones de routing profesional separando rutas en módulos, usando Route Parameters, Query Strings y organizando el código según mejores prácticas.

## ⏱️ Tiempo Estimado: 90 minutos (Bloque 4)

## 📋 Pre-requisitos

- ✅ Prácticas 1, 2 y 3 completadas
- ✅ Comprensión de middleware
- ✅ API Express.js funcionando

## 🎓 Conceptos Clave

### Tipos de Parámetros en APIs

1. **Route Parameters** (`/users/:id`): Parte de la URL path
2. **Query Strings** (`/users?page=1&limit=10`): Parámetros opcionales
3. **Body** (POST/PUT): Datos en el cuerpo del request

### Organización Profesional

```
src/
├── routes/        # Definición de rutas
├── controllers/   # Lógica de negocio
├── middlewares/   # Middlewares personalizados
└── utils/         # Utilidades
```

## 🚀 Desarrollo Práctico

### Paso 1: Crear Router Modular (30 min)

Vamos a separar las rutas por recursos (users, products, etc.).

```bash
# En tu proyecto
cd mi-primera-api-express

# Crear estructura de carpetas
mkdir -p src/routes src/controllers

# Crear router de users
cat > src/routes/users.routes.js << 'EOF'
import express from 'express';

const router = express.Router();

// GET /api/users - Obtener todos los usuarios
router.get('/', (req, res) => {
    // Simulamos datos (en la realidad vendrían de una DB)
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
    ];

    res.json({
        success: true,
        count: users.length,
        data: users
    });
});

// GET /api/users/:id - Obtener usuario por ID
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    // Simulamos búsqueda
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
    ];

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            error: `User with id ${userId} not found`
        });
    }

    res.json({
        success: true,
        data: user
    });
});

// POST /api/users - Crear nuevo usuario
router.post('/', (req, res) => {
    const { name, email } = req.body;

    // Validación básica
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Name and email are required'
        });
    }

    // Simular creación
    const newUser = {
        id: Date.now(), // ID simulado
        name,
        email,
        createdAt: new Date().toISOString()
    };

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
    });
});

// PUT /api/users/:id - Actualizar usuario
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    res.json({
        success: true,
        message: `User ${userId} updated successfully`,
        data: { id: userId, name, email }
    });
});

// DELETE /api/users/:id - Eliminar usuario
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    res.json({
        success: true,
        message: `User ${userId} deleted successfully`
    });
});

export default router;
EOF

# Crear router de products
cat > src/routes/products.routes.js << 'EOF'
import express from 'express';

const router = express.Router();

// Datos simulados (en memoria)
let products = [
    { id: 1, name: 'Laptop', price: 999.99, stock: 5 },
    { id: 2, name: 'Mouse', price: 29.99, stock: 50 },
    { id: 3, name: 'Keyboard', price: 79.99, stock: 30 }
];

// GET /api/products - Listar con query strings
router.get('/', (req, res) => {
    // Query parameters: ?minPrice=10&maxPrice=100&inStock=true
    const { minPrice, maxPrice, inStock } = req.query;

    let filteredProducts = [...products];

    // Filtrar por precio mínimo
    if (minPrice) {
        filteredProducts = filteredProducts.filter(
            p => p.price >= parseFloat(minPrice)
        );
    }

    // Filtrar por precio máximo
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(
            p => p.price <= parseFloat(maxPrice)
        );
    }

    // Filtrar por stock
    if (inStock === 'true') {
        filteredProducts = filteredProducts.filter(p => p.stock > 0);
    }

    res.json({
        success: true,
        count: filteredProducts.length,
        filters: { minPrice, maxPrice, inStock },
        data: filteredProducts
    });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            error: `Product with id ${productId} not found`
        });
    }

    res.json({
        success: true,
        data: product
    });
});

// POST /api/products
router.post('/', (req, res) => {
    const { name, price, stock } = req.body;

    if (!name || !price) {
        return res.status(400).json({
            success: false,
            error: 'Name and price are required'
        });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
        stock: parseInt(stock) || 0
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: newProduct
    });
});

// PATCH /api/products/:id/stock - Actualizar solo stock
router.patch('/:id/stock', (req, res) => {
    const productId = parseInt(req.params.id);
    const { quantity } = req.body;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }

    product.stock = parseInt(quantity);

    res.json({
        success: true,
        message: 'Stock updated successfully',
        data: product
    });
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }

    products.splice(index, 1);

    res.json({
        success: true,
        message: 'Product deleted successfully'
    });
});

export default router;
EOF
```

### Paso 2: Integrar Routers en el Server (20 min)

Ahora vamos a usar estos routers en nuestro server principal.

```javascript
// server.js - Versión con routers modulares
import express from 'express';
import {
  requestLogger,
  responseTime,
  requestInfo,
} from './src/middlewares/logger.js';
import { notFound, errorHandler } from './src/middlewares/errorHandler.js';

// Importar routers
import usersRouter from './src/routes/users.routes.js';
import productsRouter from './src/routes/products.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ===================================
// MIDDLEWARES GLOBALES
// ===================================
app.use(express.json());
app.use(requestInfo);
app.use(requestLogger);
app.use(responseTime);

// ===================================
// RUTA RAÍZ
// ===================================
app.get('/', (req, res) => {
  res.json({
    message: 'API with Modular Routing',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
    },
  });
});

// ===================================
// API ROUTES (Modulares)
// ===================================
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// ===================================
// HEALTH CHECK
// ===================================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ===================================
// MANEJO DE ERRORES
// ===================================
app.use(notFound);
app.use(errorHandler);

// ===================================
// INICIAR SERVIDOR
// ===================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('\n📋 Available Routes:');
  console.log('  GET    /');
  console.log('  GET    /health');
  console.log('\n👤 Users Routes:');
  console.log('  GET    /api/users');
  console.log('  GET    /api/users/:id');
  console.log('  POST   /api/users');
  console.log('  PUT    /api/users/:id');
  console.log('  DELETE /api/users/:id');
  console.log('\n📦 Products Routes:');
  console.log('  GET    /api/products');
  console.log('  GET    /api/products?minPrice=10&maxPrice=100');
  console.log('  GET    /api/products/:id');
  console.log('  POST   /api/products');
  console.log('  PATCH  /api/products/:id/stock');
  console.log('  DELETE /api/products/:id');
});
```

### Paso 3: Probar Route Parameters y Query Strings (40 min)

**🔍 Probar USERS (Route Parameters):**

```bash
# 1. Obtener todos los usuarios
curl http://localhost:3000/api/users

# 2. Obtener usuario específico
curl http://localhost:3000/api/users/1
curl http://localhost:3000/api/users/2

# 3. Usuario no existe
curl http://localhost:3000/api/users/999

# 4. Crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "David", "email": "david@example.com"}'

# 5. Actualizar usuario
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Updated", "email": "alice.new@example.com"}'

# 6. Eliminar usuario
curl -X DELETE http://localhost:3000/api/users/1
```

**🔍 Probar PRODUCTS (Query Strings):**

```bash
# 1. Todos los productos
curl http://localhost:3000/api/products

# 2. Filtrar por precio mínimo
curl "http://localhost:3000/api/products?minPrice=50"

# 3. Filtrar por rango de precio
curl "http://localhost:3000/api/products?minPrice=20&maxPrice=100"

# 4. Solo productos en stock
curl "http://localhost:3000/api/products?inStock=true"

# 5. Combinación de filtros
curl "http://localhost:3000/api/products?minPrice=50&inStock=true"

# 6. Producto específico
curl http://localhost:3000/api/products/1

# 7. Crear producto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Monitor", "price": 299.99, "stock": 10}'

# 8. Actualizar solo stock (PATCH)
curl -X PATCH http://localhost:3000/api/products/1/stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": 15}'

# 9. Eliminar producto
curl -X DELETE http://localhost:3000/api/products/2
```

## 📊 Estructura Final del Proyecto

```
mi-primera-api-express/
├── src/
│   ├── routes/
│   │   ├── users.routes.js      # Rutas de usuarios
│   │   └── products.routes.js   # Rutas de productos
│   ├── middlewares/
│   │   ├── logger.js
│   │   ├── validation.js
│   │   └── errorHandler.js
├── server.js                     # Servidor principal
├── package.json
└── node_modules/
```

## ✅ Verificación Final

Al terminar esta práctica debes entender:

- [x] Cómo crear routers modulares con `express.Router()`
- [x] Diferencia entre Route Parameters (`:id`) y Query Strings (`?key=value`)
- [x] Cuándo usar cada método HTTP (GET, POST, PUT, PATCH, DELETE)
- [x] Cómo organizar rutas por recursos
- [x] Cómo leer parámetros: `req.params`, `req.query`, `req.body`
- [x] Estructura de respuestas consistente
- [x] Manejo de errores 404 para recursos no encontrados

## 🎯 Conceptos Aprendidos

### 1. **Route Parameters** (`:param`)

```javascript
app.get('/users/:id', ...)  // req.params.id
app.get('/posts/:postId/comments/:commentId', ...)  // req.params.postId, req.params.commentId
```

### 2. **Query Strings** (`?key=value&key2=value2`)

```javascript
app.get('/products', ...)
// /products?page=1&limit=10
// req.query.page, req.query.limit
```

### 3. **Body** (POST/PUT/PATCH)

```javascript
app.post('/users', ...)
// req.body.name, req.body.email
```

### 4. **Router Modular**

```javascript
const router = express.Router();
// ... definir rutas
export default router;

// En server.js
app.use('/api/users', usersRouter);
```

### 5. **Métodos HTTP**

- `GET`: Obtener (idempotente, sin body)
- `POST`: Crear (no idempotente, con body)
- `PUT`: Actualizar completo (idempotente, con body)
- `PATCH`: Actualizar parcial (con body)
- `DELETE`: Eliminar (idempotente, sin body)

## 💡 Mejores Prácticas

1. **Organización por recursos**: Un router por entidad (users, products, etc.)
2. **Nombres de rutas en plural**: `/users`, `/products` (no `/user`, `/product`)
3. **Respuestas consistentes**: Siempre usar el mismo formato
4. **Status codes apropiados**: 200 (OK), 201 (Created), 404 (Not Found), etc.
5. **Validación temprana**: Validar parámetros antes de procesarlos
6. **Mensajes descriptivos**: Errores claros y útiles

## 🔄 Comparativa de Parámetros

| Tipo              | Ejemplo URL     | Cómo leer        | Uso típico                      |
| ----------------- | --------------- | ---------------- | ------------------------------- |
| **Route Params**  | `/users/123`    | `req.params.id`  | Identificadores obligatorios    |
| **Query Strings** | `/users?page=1` | `req.query.page` | Filtros opcionales              |
| **Body**          | POST con JSON   | `req.body.name`  | Datos de creación/actualización |

## 📚 Recursos Adicionales

- [Express Router](https://expressjs.com/en/guide/routing.html)
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [REST API Design](https://restfulapi.net/)
- [Query Strings](https://en.wikipedia.org/wiki/Query_string)

---

**🎉 ¡Felicitaciones!** Has completado las 4 prácticas de la Semana 1.

**Siguiente semana:** Node.js moderno, async/await, y promesas avanzadas.

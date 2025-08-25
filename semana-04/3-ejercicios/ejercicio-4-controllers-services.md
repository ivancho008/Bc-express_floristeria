# 🔶 Ejercicio 4: Controllers y Services

## 🎯 Objetivo
Separar responsabilidades creando controllers y services independientes.

## 📋 Instrucciones

### 1. **Estructura de Proyecto** (10 min)
```
src/
├── controllers/
│   └── productController.js
├── services/
│   └── productService.js
├── validators/
│   └── productValidator.js
├── models/
│   └── product.js
└── app.js
```

### 2. **Validator (Reutilizable)** (5 min)
```javascript
// src/validators/productValidator.js
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().valid('electronics', 'clothing', 'books').required(),
  inStock: Joi.boolean().required()
});

const filterSchema = Joi.object({
  category: Joi.string().valid('electronics', 'clothing', 'books'),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  inStock: Joi.boolean()
});

module.exports = {
  productSchema,
  filterSchema
};
```

### 3. **Model (Simulación BD)** (5 min)
```javascript
// src/models/product.js
let products = [];
let nextId = 1;

class Product {
  static create(productData) {
    const product = {
      id: nextId++,
      ...productData,
      createdAt: new Date().toISOString()
    };
    products.push(product);
    return product;
  }

  static getAll(filters = {}) {
    let filteredProducts = products;

    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
    }

    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
    }

    return filteredProducts;
  }

  static getById(id) {
    return products.find(p => p.id === parseInt(id));
  }
}

module.exports = Product;
```

### 4. **Service (Lógica de Negocio)** (10 min)
```javascript
// src/services/productService.js
const Product = require('../models/product');

class ProductService {
  static async createProduct(productData) {
    // Validaciones de negocio adicionales
    if (productData.category === 'electronics' && productData.price < 50) {
      throw new Error('Los productos electrónicos deben costar al menos $50');
    }

    return Product.create(productData);
  }

  static async getProducts(filters) {
    return Product.getAll(filters);
  }

  static async getProductById(id) {
    const product = Product.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  static async getProductStats() {
    const products = Product.getAll();
    return {
      total: products.length,
      inStock: products.filter(p => p.inStock).length,
      categories: [...new Set(products.map(p => p.category))],
      averagePrice: products.reduce((sum, p) => sum + p.price, 0) / products.length || 0
    };
  }
}

module.exports = ProductService;
```

### 5. **Controller (Manejo HTTP)** (15 min)
```javascript
// src/controllers/productController.js
const ProductService = require('../services/productService');
const { productSchema, filterSchema } = require('../validators/productValidator');

class ProductController {
  static async create(req, res) {
    try {
      // Validar datos de entrada
      const { error, value } = productSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Error de validación',
          details: error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
          }))
        });
      }

      // Crear producto usando service
      const product = await ProductService.createProduct(value);
      
      res.status(201).json({
        message: 'Producto creado exitosamente',
        product
      });
    } catch (error) {
      res.status(400).json({
        error: 'Error al crear producto',
        message: error.message
      });
    }
  }

  static async getAll(req, res) {
    try {
      // Validar query parameters
      const { error, value } = filterSchema.validate(req.query);
      if (error) {
        return res.status(400).json({
          error: 'Filtros inválidos',
          details: error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
          }))
        });
      }

      const products = await ProductService.getProducts(value);
      
      res.json({
        products,
        count: products.length
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener productos',
        message: error.message
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      
      res.json({ product });
    } catch (error) {
      res.status(404).json({
        error: 'Producto no encontrado',
        message: error.message
      });
    }
  }

  static async getStats(req, res) {
    try {
      const stats = await ProductService.getProductStats();
      res.json({ stats });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener estadísticas',
        message: error.message
      });
    }
  }
}

module.exports = ProductController;
```

### 6. **App Principal** (10 min)
```javascript
// src/app.js
const express = require('express');
const ProductController = require('./controllers/productController');

const app = express();
app.use(express.json());

// Rutas de productos
app.post('/api/products', ProductController.create);
app.get('/api/products', ProductController.getAll);
app.get('/api/products/stats', ProductController.getStats);
app.get('/api/products/:id', ProductController.getById);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

module.exports = app;

// server.js (opcional)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
```

## ✅ **Testing**

### Crear producto
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"iPhone 15","price":999,"category":"electronics","inStock":true}'
```

### Obtener productos con filtros
```bash
curl "http://localhost:3000/api/products?category=electronics&minPrice=500"
```

### Obtener estadísticas
```bash
curl http://localhost:3000/api/products/stats
```

## 🎯 **Puntos Clave**
- **Controller:** Solo maneja HTTP (req/res, validación, códigos de estado)
- **Service:** Contiene lógica de negocio y reglas específicas
- **Model:** Maneja persistencia de datos (simulada)
- **Validator:** Esquemas reutilizables de validación

## ⏰ **Tiempo:** 45 minutos

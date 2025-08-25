# 🔰 Ejercicio 1: Validación Básica con Joi

## 🎯 Objetivo
Crear validación básica para datos de productos usando Joi.

## 📋 Instrucciones

### 1. **Setup Inicial** (5 min)
```bash
npm init -y
npm install express joi
```

### 2. **Código Base** (10 min)
```javascript
// app.js
const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

// TODO: Implementar schema de validación aquí
const productSchema = Joi.object({
  // Completar las reglas de validación
});

// TODO: Implementar endpoint POST /api/products
app.post('/api/products', (req, res) => {
  // 1. Validar req.body con el schema
  // 2. Si hay errores, responder con 400 y detalles
  // 3. Si todo está bien, responder con 201 y el producto
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### 3. **Reglas de Validación** (5 min)
```javascript
// Completar el schema:
{
  name: // requerido, string, mínimo 3 caracteres
  price: // requerido, número, mínimo 0
  category: // requerido, uno de ['electronics', 'clothing', 'books']
  inStock: // requerido, boolean
}
```

## ✅ **Resultado Esperado**

### Request válido:
```bash
POST /api/products
{
  "name": "Laptop Gaming",
  "price": 1500,
  "category": "electronics",
  "inStock": true
}
```

### Response exitoso:
```json
{
  "message": "Producto creado exitosamente",
  "product": {
    "id": 1,
    "name": "Laptop Gaming",
    "price": 1500,
    "category": "electronics",
    "inStock": true
  }
}
```

### Request inválido:
```bash
POST /api/products
{
  "name": "AB",
  "price": -100,
  "category": "invalid",
  "inStock": "yes"
}
```

### Response de error:
```json
{
  "error": "Error de validación",
  "details": [
    {
      "field": "name",
      "message": "name length must be at least 3 characters long"
    },
    {
      "field": "price", 
      "message": "price must be greater than or equal to 0"
    }
  ]
}
```

## 💡 **Pistas**

1. **Schema Joi básico:**
```javascript
const schema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().min(0).required()
});
```

2. **Validación en endpoint:**
```javascript
const { error, value } = schema.validate(req.body);
if (error) {
  return res.status(400).json({
    error: 'Error de validación',
    details: error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }))
  });
}
```

3. **Testing manual:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":100,"category":"electronics","inStock":true}'
```

## ⏰ **Tiempo:** 20 minutos máximo

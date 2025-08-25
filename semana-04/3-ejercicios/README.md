# 💪 Ejercicios Semana 4 - Validación y Estructura

## 🎯 Objetivo

Practicar validación con Joi, estructura de proyecto con controllers/services, y manejo de errores en APIs Express.js.

---

## 📝 Ejercicios Básicos (1-1.5 horas)

### 🔰 **Ejercicio 1: Validación Básica**

**Tiempo estimado:** 20 minutos

Crear un endpoint que valide datos de un producto:

```javascript
// Datos a validar:
{
  "name": "Laptop Gaming",
  "price": 1500,
  "category": "electronics",
  "inStock": true
}

// Reglas de validación:
// - name: requerido, string, min 3 caracteres
// - price: requerido, número, mínimo 0
// - category: requerido, uno de ['electronics', 'clothing', 'books']
// - inStock: requerido, boolean
```

**Entregable:** Endpoint POST `/api/products` con validación Joi.

### 🔰 **Ejercicio 2: Mensajes de Error Personalizados**

**Tiempo estimado:** 15 minutos

Mejorar el ejercicio anterior con mensajes de error en español:

```javascript
// Ejemplo de mensaje esperado:
{
  "error": "Error de validación",
  "details": [
    {
      "field": "name",
      "message": "El nombre es requerido y debe tener al menos 3 caracteres"
    }
  ]
}
```

### 🔰 **Ejercicio 3: Validación de Query Parameters**

**Tiempo estimado:** 25 minutos

Crear endpoint GET con filtros validados:

```javascript
// GET /api/products?page=1&limit=10&category=electronics&minPrice=100

// Validaciones:
// - page: opcional, número entero, mínimo 1
// - limit: opcional, número entero, entre 1 y 100
// - category: opcional, string válido
// - minPrice: opcional, número, mínimo 0
```

---

## 📝 Ejercicios Intermedios (1.5-2 horas)

### 🔶 **Ejercicio 4: Controller y Service Separados**

**Tiempo estimado:** 45 minutos

Refactorizar el ejercicio anterior separando lógica:

```
src/
├── controllers/
│   └── productController.js
├── services/
│   └── productService.js
├── validators/
│   └── productValidator.js
└── app.js
```

**Responsabilidades:**
- **Controller:** Manejo de req/res, validación, códigos HTTP
- **Service:** Lógica de negocio, manipulación de datos
- **Validator:** Esquemas Joi reutilizables

### 🔶 **Ejercicio 5: Middleware de Validación Reutilizable**

**Tiempo estimado:** 30 minutos

Crear middleware genérico para validación:

```javascript
// Uso esperado:
app.post('/api/products', 
  validateBody(productSchema),
  productController.create
);

app.get('/api/products',
  validateQuery(filterSchema),
  productController.getAll
);
```

### 🔶 **Ejercicio 6: Manejo de Errores Centralizado**

**Tiempo estimado:** 15 minutos

Implementar middleware de manejo de errores que categorice:
- Errores de validación (400)
- Errores de negocio (400)
- Errores internos (500)

---

## 📝 Ejercicios Avanzados (Solo si hay tiempo extra)

### 🔥 **Ejercicio 7: Validación Condicional**

**Tiempo estimado:** 30 minutos

Implementar validación que dependa de otros campos:

```javascript
// Si category es 'electronics', requiere warranty (boolean)
// Si category es 'clothing', requiere size (string)
// Si category es 'books', requiere isbn (string, formato específico)
```

### 🔥 **Ejercicio 8: API Completa con Estructura**

**Tiempo estimado:** 45 minutos

Crear API completa para gestión de usuarios:

```
POST   /api/users        # Crear usuario
GET    /api/users        # Listar usuarios (con filtros)
GET    /api/users/:id    # Obtener usuario específico
PUT    /api/users/:id    # Actualizar usuario
DELETE /api/users/:id    # Eliminar usuario
```

**Validaciones:**
- Email único y formato válido
- Contraseña: mínimo 8 caracteres, al menos 1 mayúscula, 1 número
- Edad: entre 18 y 120 años
- Role: 'user' o 'admin'

---

## ✅ Criterios de Evaluación

### 🎯 **Ejercicios Básicos (70 puntos)**
- [ ] **Validación funcional** (25 pts): Esquemas Joi correctos
- [ ] **Mensajes claros** (15 pts): Errores comprensibles
- [ ] **Códigos HTTP** (15 pts): Status codes apropiados
- [ ] **Query params** (15 pts): Validación de filtros

### 🎯 **Ejercicios Intermedios (25 puntos)**
- [ ] **Separación de responsabilidades** (10 pts): Controllers/Services
- [ ] **Middleware reutilizable** (10 pts): Código DRY
- [ ] **Manejo de errores** (5 pts): Centralizado y consistente

### 🎯 **Ejercicios Avanzados (5 puntos bonus)**
- [ ] **Validación condicional** (3 pts): Lógica compleja
- [ ] **API completa** (2 pts): Implementación integral

---

## 🚀 Entrega

### 📁 **Estructura Esperada**
```
ejercicios-semana4-apellido-nombre/
├── README.md
├── package.json
├── src/
│   ├── controllers/
│   ├── services/
│   ├── validators/
│   ├── middleware/
│   └── app.js
└── tests/ (opcional)
```

### 📋 **Instrucciones**
1. **Fork** del repositorio base
2. **Completar** al menos ejercicios básicos
3. **Documentar** en README qué ejercicios se completaron
4. **Subir** a GitHub con naming: `ejercicios-s4-apellido-nombre`
5. **Entregar** link del repositorio

### ⏰ **Tiempo Total Recomendado**
- **Básicos:** 1-1.5 horas
- **Intermedios:** 1.5-2 horas  
- **Avanzados:** 1+ hora (solo si sobra tiempo)

**Total:** 2.5-4.5 horas (ajustable según ritmo del grupo)

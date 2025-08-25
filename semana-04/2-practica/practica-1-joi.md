# 📍 Práctica 1: Implementación de Validación con Joi (60 min)

## 🎯 Objetivo

Implementar validación robusta usando Joi en una API básica de usuarios.

## ⏰ Tiempo Asignado: 60 minutos

---

## 🚀 Paso 1: Setup Inicial (10 min)

### 1.1 Crear proyecto y estructura

```bash
mkdir practica-joi
cd practica-joi
npm init -y
npm install express joi
mkdir src src/schemas src/middleware
touch src/app.js src/schemas/userSchema.js src/middleware/validation.js
```

### 1.2 Configuración básica de Express

```javascript
// src/app.js
const express = require('express');
const app = express();

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de práctica Joi funcionando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
```

---

## 🛠️ Paso 2: Crear Esquemas de Validación (15 min)

### 2.1 Esquema de Usuario

```javascript
// src/schemas/userSchema.js
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no puede exceder 50 caracteres',
    'any.required': 'El nombre es obligatorio',
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Debe ser un email válido',
    'any.required': 'El email es obligatorio',
  }),

  age: Joi.number().integer().min(13).max(120).messages({
    'number.min': 'La edad mínima es 13 años',
    'number.max': 'La edad máxima es 120 años',
  }),

  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'string.pattern.base':
        'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
      'any.required': 'La contraseña es obligatoria',
    }),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  age: Joi.number().integer().min(13).max(120),
  // password no se puede actualizar por seguridad
});

module.exports = {
  userSchema,
  userUpdateSchema,
};
```

---

## 🔧 Paso 3: Middleware de Validación (15 min)

### 3.1 Middleware genérico de validación

```javascript
// src/middleware/validation.js
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Mostrar todos los errores
      stripUnknown: true, // Remover campos no definidos en schema
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context.value,
      }));

      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors,
      });
    }

    // Asignar los datos validados y limpios al request
    req.validatedBody = value;
    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Parámetros inválidos',
        error: error.details[0].message,
      });
    }

    req.validatedParams = value;
    next();
  };
};

module.exports = {
  validateBody,
  validateParams,
};
```

---

## 🎯 Paso 4: Implementar Rutas con Validación (15 min)

### 4.1 Actualizar app.js con rutas validadas

```javascript
// src/app.js (actualizar)
const express = require('express');
const { userSchema, userUpdateSchema } = require('./schemas/userSchema');
const { validateBody } = require('./middleware/validation');

const app = express();
app.use(express.json());

// Base de datos simulada
let users = [
  { id: 1, name: 'Juan Pérez', email: 'juan@email.com', age: 25 },
  { id: 2, name: 'María García', email: 'maria@email.com', age: 30 },
];
let nextId = 3;

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de práctica Joi funcionando' });
});

// GET /users - Listar usuarios
app.get('/users', (req, res) => {
  res.json({
    success: true,
    data: users,
  });
});

// POST /users - Crear usuario (CON VALIDACIÓN)
app.post('/users', validateBody(userSchema), (req, res) => {
  // Usar req.validatedBody en lugar de req.body
  const newUser = {
    id: nextId++,
    ...req.validatedBody,
  };

  // Remover password antes de guardar (simulación)
  const { password, ...userToSave } = newUser;
  users.push(userToSave);

  res.status(201).json({
    success: true,
    message: 'Usuario creado exitosamente',
    data: userToSave,
  });
});

// PUT /users/:id - Actualizar usuario (CON VALIDACIÓN)
app.put('/users/:id', validateBody(userUpdateSchema), (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }

  // Actualizar solo campos enviados
  users[userIndex] = { ...users[userIndex], ...req.validatedBody };

  res.json({
    success: true,
    message: 'Usuario actualizado exitosamente',
    data: users[userIndex],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
```

---

## 🧪 Paso 5: Testing Manual (5 min)

### 5.1 Probar validaciones

**Ejecutar servidor:**

```bash
node src/app.js
```

**Casos de prueba:**

1. **Usuario válido:**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos López",
    "email": "carlos@email.com",
    "age": 28,
    "password": "MiPass123"
  }'
```

2. **Usuario inválido (múltiples errores):**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A",
    "email": "email-invalido",
    "age": 200,
    "password": "123"
  }'
```

3. **Actualización válida:**

```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos Pérez",
    "age": 26
  }'
```

---

## ✅ Checkpoint (60 min completados)

### 🎯 Has logrado:

- ✅ Instalar y configurar Joi
- ✅ Crear esquemas de validación robustos
- ✅ Implementar middleware de validación reutilizable
- ✅ Validar datos en endpoints POST y PUT
- ✅ Manejar errores de validación de forma clara
- ✅ Probar manualmente las validaciones

### 🚀 Preparado para:

- **Práctica 2**: Estructura Controllers/Services
- **Práctica 3**: Error Handling Centralizado

---

_Práctica 1 completada - Continuamos con la siguiente práctica_

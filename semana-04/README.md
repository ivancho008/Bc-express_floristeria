# � Semana 4: Validación y Estructura + REST Design

## 🎯 Objetivos de la Semana

### Objetivo General

Implementar validación robusta de datos y estructura profesional de proyecto, introduciendo conceptos fundamentales de diseño REST API.

### Objetivos Específicos

- [ ] Implementar validación de datos con Joi o express-validator
- [ ] Organizar proyecto con estructura profesional (Controllers/Services)
- [ ] Aplicar conceptos del Richardson Maturity Model
- [ ] Manejar errores de validación de forma consistente

## 📅 Cronograma de la Jornada de 6 Horas

| Tiempo      | Actividad                         | Duración | Acumulado |
| ----------- | --------------------------------- | -------- | --------- |
| 12:00-13:00 | Validación básica con Joi         | 60 min   | 60 min    |
| 13:00-14:00 | Estructura Controllers/Services   | 60 min   | 120 min   |
| 14:00-14:30 | **☕ BREAK OBLIGATORIO**          | 30 min   | 150 min   |
| 14:30-15:30 | Error handling y middleware       | 60 min   | 210 min   |
| 15:30-16:30 | Richardson Maturity Model teórico | 60 min   | 270 min   |
| 16:30-17:30 | Implementación práctica REST      | 60 min   | 330 min   |
| 17:30-18:00 | Testing y consolidación           | 30 min   | 360 min   |

**Total**: Exactamente 6 horas (360 minutos) • **Efectivo**: 5.5 horas

## 📋 Contenidos Detallados

### 🧠 **1. Teoría (90 min distribuidos)**

#### **Conceptos de Validación (30 min)**

- ¿Por qué validar datos en APIs?
- Tipos de validación: cliente vs servidor
- Bibliotecas populares: Joi vs express-validator vs Zod

#### **Arquitectura de Proyecto (30 min)**

- Separación de responsabilidades
- Patrón Controller-Service-Model
- Ventajas de la organización modular

#### **Richardson Maturity Model (30 min)**

- Nivel 0: HTTP como transporte
- Nivel 1: Recursos individuales
- Nivel 2: Verbos HTTP + códigos estado
- Nivel 3: HATEOAS (controles hipermedia)

### 💻 **2. Práctica (180 min)**

#### **Hora 1: Implementación Joi (60 min)**

```javascript
// Ejemplo práctico: Validación de usuario
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(13).max(120),
});

// Middleware de validación
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details[0].message,
    });
  }
  next();
};
```

#### **Hora 2: Estructura Controllers/Services (60 min)**

```javascript
// controllers/userController.js
const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// services/userService.js
class UserService {
  async createUser(userData) {
    // Lógica de negocio aquí
    return userData;
  }
}
```

#### **Hora 3: Error Handling Centralizado (60 min)**

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Joi validation error
  if (err.isJoi) {
    error.message = err.details[0].message;
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
  });
};
```

### 🏋️ **3. Ejercicios Prácticos (60 min distribuidos)**

#### **Ejercicio 1: Validación de Productos (20 min)**

Crear esquema de validación para:

- Nombre producto (obligatorio, 3-100 caracteres)
- Precio (número positivo, máximo 2 decimales)
- Categoría (enum: electronics, clothing, books)

#### **Ejercicio 2: Restructuración (20 min)**

Refactorizar API existente con:

- Controller para productos
- Service para lógica de negocio
- Middleware de validación

#### **Ejercicio 3: Error Responses (20 min)**

Implementar responses consistentes:

- 400: Bad Request con detalles
- 404: Not Found
- 500: Internal Server Error

### 🎯 **4. Proyecto Integrador**

#### **API de Gestión de Tareas - Nivel 2 REST**

**Objetivos del proyecto:**

- Aplicar validación completa
- Estructura profesional
- Error handling robusto
- Cumplir Richardson Nivel 2

**Funcionalidades:**

1. **POST /api/tasks** - Crear tarea (con validación)
2. **GET /api/tasks** - Listar tareas
3. **GET /api/tasks/:id** - Obtener tarea específica
4. **PUT /api/tasks/:id** - Actualizar tarea
5. **DELETE /api/tasks/:id** - Eliminar tarea

**Validaciones requeridas:**

```javascript
const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  dueDate: Joi.date().min('now'),
  completed: Joi.boolean().default(false),
});
```

**Estructura del proyecto:**

```
semana4-tasks-api/
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── services/
│   │   └── taskService.js
│   ├── middleware/
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── schemas/
│   │   └── taskSchema.js
│   └── app.js
├── package.json
└── README.md
```

## 🏆 Entregables y Evaluación

### ✅ **Entregables Obligatorios**

1. **API funcional** con endpoints CRUD
2. **Validación implementada** en todos los endpoints
3. **Estructura modular** (Controllers/Services)
4. **Error handling** centralizado
5. **README** con instrucciones de uso

### 📊 **Criterios de Evaluación**

| Criterio           | Peso | Descripción                       |
| ------------------ | ---- | --------------------------------- |
| **Funcionalidad**  | 30%  | API funciona correctamente        |
| **Validación**     | 25%  | Joi implementado y funcionando    |
| **Estructura**     | 20%  | Organización Controllers/Services |
| **Error Handling** | 15%  | Manejo consistente de errores     |
| **Documentación**  | 10%  | README claro y completo           |

### 🎁 **Bonus Points (Opcionales)**

- [ ] **Middleware personalizado** (+5 pts)
- [ ] **Logging básico** (+3 pts)
- [ ] **Tests básicos** (+5 pts)
- [ ] **Swagger/OpenAPI docs** (+10 pts)

## 🚀 Recursos de Apoyo

### 📚 **Documentación Oficial**

- [Joi Validation](https://joi.dev/api/)
- [Express.js Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)

### 🛠️ **Herramientas Recomendadas**

- **VS Code Extensions**: REST Client, Thunder Client
- **Testing**: Postman, Insomnia
- **Validación**: Joi (principal), express-validator (alternativa)

### 💡 **Tips para el Éxito**

1. **Empezar simple**: Validación básica primero
2. **Refactorizar gradualmente**: Mover lógica a services paso a paso
3. **Probar cada cambio**: Verificar que funciona antes de continuar
4. **Documentar decisiones**: ¿Por qué elegiste Joi vs otras opciones?

## 🎯 Preparación para Semana 5

La próxima semana trabajaremos con **Base de Datos** (SQLite + Prisma), donde aplicaremos:

- Los controllers y services creados esta semana
- La validación para datos que van a BD
- La estructura de proyecto establecida

**¡Asegúrate de tener tu proyecto bien estructurado!**

---

**Tiempo total**: 6 horas exactas | **Complejidad**: Intermedia | **Pre-requisitos**: Semanas 1-3 completadas

---

_Semana 4 - Express.js Bootcamp_

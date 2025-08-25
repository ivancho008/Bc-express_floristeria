# 📍 Práctica 3: Error Handling Centralizado (60 min)

## 🎯 Objetivo

Implementar un sistema robusto de manejo de errores centralizado que proporcione respuestas consistentes y logging básico.

## ⏰ Tiempo Asignado: 60 minutos

## 📋 Prerequisito

Haber completado Práctica 1 (Joi) y Práctica 2 (Controllers/Services)

---

## 🚀 Paso 1: Crear Estructura de Error Handling (10 min)

### 1.1 Crear archivos necesarios

```bash
# Desde la carpeta practica-joi
touch src/middleware/errorHandler.js
touch src/utils/ApiError.js
touch src/utils/logger.js
mkdir src/utils
```

### 1.2 Estructura actualizada

```
practica-joi/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   │   ├── validation.js
│   │   └── errorHandler.js        # ← NUEVO
│   ├── utils/
│   │   ├── ApiError.js            # ← NUEVO
│   │   └── logger.js              # ← NUEVO
│   ├── schemas/
│   └── app.js
```

---

## 🛡️ Paso 2: Crear Clase de Error Personalizada (15 min)

### 2.1 Implementar ApiError

```javascript
// src/utils/ApiError.js
class ApiError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();

    // Mantener stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  // Métodos estáticos para errores comunes
  static badRequest(message = 'Bad Request') {
    return new ApiError(message, 400);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(message, 401);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(message, 403);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(message, 404);
  }

  static conflict(message = 'Conflict') {
    return new ApiError(message, 409);
  }

  static validationError(message = 'Validation Error') {
    return new ApiError(message, 422);
  }

  static internal(message = 'Internal Server Error') {
    return new ApiError(message, 500);
  }

  // Convertir a objeto JSON para respuesta
  toJSON() {
    return {
      success: false,
      error: {
        message: this.message,
        statusCode: this.statusCode,
        timestamp: this.timestamp,
      },
    };
  }
}

module.exports = ApiError;
```

### 2.2 Sistema de logging básico

```javascript
// src/utils/logger.js
const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    // Crear directorio de logs si no existe
    this.logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  // Formatear mensaje de log
  formatMessage(level, message, meta = {}) {
    return (
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: level.toUpperCase(),
        message,
        ...meta,
      }) + '\n'
    );
  }

  // Log de información
  info(message, meta = {}) {
    const logMessage = this.formatMessage('info', message, meta);
    console.log(`ℹ️ [INFO] ${message}`, meta);
    this.writeToFile('info.log', logMessage);
  }

  // Log de errores
  error(message, error = null, meta = {}) {
    const errorMeta = {
      ...meta,
      ...(error && {
        stack: error.stack,
        statusCode: error.statusCode,
      }),
    };

    const logMessage = this.formatMessage('error', message, errorMeta);
    console.error(`❌ [ERROR] ${message}`, errorMeta);
    this.writeToFile('error.log', logMessage);
  }

  // Log de advertencias
  warn(message, meta = {}) {
    const logMessage = this.formatMessage('warn', message, meta);
    console.warn(`⚠️ [WARN] ${message}`, meta);
    this.writeToFile('warn.log', logMessage);
  }

  // Log de debug (solo en desarrollo)
  debug(message, meta = {}) {
    if (process.env.NODE_ENV !== 'production') {
      const logMessage = this.formatMessage('debug', message, meta);
      console.log(`🐛 [DEBUG] ${message}`, meta);
      this.writeToFile('debug.log', logMessage);
    }
  }

  // Escribir a archivo
  writeToFile(filename, message) {
    try {
      const filePath = path.join(this.logDir, filename);
      fs.appendFileSync(filePath, message);
    } catch (error) {
      console.error('Error escribiendo log:', error);
    }
  }
}

// Singleton
const logger = new Logger();

module.exports = logger;
```

---

## 🔧 Paso 3: Middleware de Error Handling (20 min)

### 3.1 Implementar error handler centralizado

```javascript
// src/middleware/errorHandler.js
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

// Middleware para manejar errores de Joi
const handleJoiError = (error) => {
  const errors = error.details.map((detail) => ({
    field: detail.path.join('.'),
    message: detail.message,
    value: detail.context.value,
  }));

  return {
    statusCode: 400,
    message: 'Errores de validación',
    errors,
  };
};

// Middleware principal de manejo de errores
const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Error interno del servidor';
  let errors = null;

  // Log del error
  logger.error('Error en API', error, {
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Manejar diferentes tipos de errores
  if (error instanceof ApiError) {
    // Error personalizado de la aplicación
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.isJoi) {
    // Error de validación Joi
    const joiError = handleJoiError(error);
    statusCode = joiError.statusCode;
    message = joiError.message;
    errors = joiError.errors;
  } else if (error.name === 'ValidationError') {
    // Error de validación genérico
    statusCode = 400;
    message = 'Error de validación';
  } else if (error.name === 'CastError') {
    // Error de conversión de tipo (ej: ID inválido)
    statusCode = 400;
    message = 'ID inválido';
  } else if (error.code === 11000) {
    // Error de duplicado (MongoDB)
    statusCode = 409;
    message = 'Recurso duplicado';
  } else if (error.name === 'JsonWebTokenError') {
    // Error de JWT
    statusCode = 401;
    message = 'Token inválido';
  } else if (error.name === 'TokenExpiredError') {
    // Token expirado
    statusCode = 401;
    message = 'Token expirado';
  }

  // Preparar respuesta
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };

  // Agregar errores detallados si existen
  if (errors) {
    response.errors = errors;
  }

  // En desarrollo, incluir stack trace
  if (process.env.NODE_ENV === 'development') {
    response.stack = error.stack;
  }

  // Enviar respuesta
  res.status(statusCode).json(response);
};

// Middleware para manejar rutas no encontradas
const notFoundHandler = (req, res, next) => {
  const error = ApiError.notFound(`Ruta ${req.originalUrl} no encontrada`);
  next(error);
};

// Middleware para capturar errores asíncronos
const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncErrorHandler,
};
```

---

## 🔄 Paso 4: Actualizar Services con Manejo de Errores (10 min)

### 4.1 Refactorizar userService

```javascript
// src/services/userService.js (ACTUALIZADO)
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

class UserService {
  constructor() {
    this.users = [
      { id: 1, name: 'Juan Pérez', email: 'juan@email.com', age: 25 },
      { id: 2, name: 'María García', email: 'maria@email.com', age: 30 },
    ];
    this.nextId = 3;
  }

  async getAllUsers() {
    try {
      logger.info('Obteniendo todos los usuarios');
      return [...this.users];
    } catch (error) {
      logger.error('Error obteniendo usuarios', error);
      throw ApiError.internal('Error al obtener usuarios');
    }
  }

  async getUserById(id) {
    try {
      const userId = parseInt(id);

      if (isNaN(userId) || userId <= 0) {
        throw ApiError.badRequest('ID de usuario inválido');
      }

      const user = this.users.find((user) => user.id === userId);

      if (!user) {
        throw ApiError.notFound(`Usuario con ID ${id} no encontrado`);
      }

      logger.info(`Usuario obtenido: ${user.email}`);
      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Error obteniendo usuario por ID', error);
      throw ApiError.internal('Error al obtener usuario');
    }
  }

  async createUser(userData) {
    try {
      // Verificar email único
      const existingUser = this.users.find(
        (user) => user.email === userData.email
      );
      if (existingUser) {
        throw ApiError.conflict('El email ya está registrado');
      }

      // Crear usuario
      const { password, ...userToSave } = userData;
      const newUser = {
        id: this.nextId++,
        ...userToSave,
        createdAt: new Date().toISOString(),
      };

      this.users.push(newUser);

      logger.info(`Usuario creado: ${newUser.email}`, { userId: newUser.id });
      return newUser;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Error creando usuario', error);
      throw ApiError.internal('Error al crear usuario');
    }
  }

  async updateUser(id, updateData) {
    try {
      const userId = parseInt(id);

      if (isNaN(userId) || userId <= 0) {
        throw ApiError.badRequest('ID de usuario inválido');
      }

      const userIndex = this.users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        throw ApiError.notFound(`Usuario con ID ${id} no encontrado`);
      }

      // Verificar email único si se está actualizando
      if (updateData.email) {
        const existingUser = this.users.find(
          (user) => user.email === updateData.email && user.id !== userId
        );
        if (existingUser) {
          throw ApiError.conflict('El email ya está en uso por otro usuario');
        }
      }

      // Actualizar
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      logger.info(`Usuario actualizado: ${this.users[userIndex].email}`);
      return this.users[userIndex];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Error actualizando usuario', error);
      throw ApiError.internal('Error al actualizar usuario');
    }
  }

  async deleteUser(id) {
    try {
      const userId = parseInt(id);

      if (isNaN(userId) || userId <= 0) {
        throw ApiError.badRequest('ID de usuario inválido');
      }

      const userIndex = this.users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        throw ApiError.notFound(`Usuario con ID ${id} no encontrado`);
      }

      const deletedUser = this.users.splice(userIndex, 1)[0];

      logger.info(`Usuario eliminado: ${deletedUser.email}`);
      return deletedUser;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Error eliminando usuario', error);
      throw ApiError.internal('Error al eliminar usuario');
    }
  }

  async searchUsers(criteria) {
    try {
      const results = this.users.filter((user) => {
        if (criteria.name) {
          return user.name.toLowerCase().includes(criteria.name.toLowerCase());
        }
        if (criteria.minAge || criteria.maxAge) {
          const ageInRange =
            (!criteria.minAge || user.age >= criteria.minAge) &&
            (!criteria.maxAge || user.age <= criteria.maxAge);
          return ageInRange;
        }
        return true;
      });

      logger.info(`Búsqueda realizada: ${results.length} resultados`, criteria);
      return results;
    } catch (error) {
      logger.error('Error en búsqueda de usuarios', error);
      throw ApiError.internal('Error al buscar usuarios');
    }
  }
}

const userServiceInstance = new UserService();
module.exports = userServiceInstance;
```

---

## 🎮 Paso 5: Actualizar app.js con Error Handling (5 min)

### 5.1 Implementar middleware de errores

```javascript
// src/app.js (ACTUALIZADO)
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Middleware global
app.use(express.json());

// Middleware de logging de requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  next();
});

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: 'API de práctica Error Handling funcionando',
    version: '3.0.0',
    endpoints: {
      users: '/api/users',
    },
    status: 'OK',
  });
});

// Montar rutas
app.use('/api/users', userRoutes);

// Middleware para rutas no encontradas (DEBE IR ANTES del error handler)
app.use(notFoundHandler);

// Middleware de manejo de errores (SIEMPRE AL FINAL)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor iniciado en puerto ${PORT}`);
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📚 Documentación: http://localhost:${PORT}/`);
});

module.exports = app;
```

---

## 🧪 Paso 6: Testing del Error Handling (5 min)

### 6.1 Probar diferentes tipos de errores

**Reiniciar servidor:**

```bash
node src/app.js
```

**Casos de prueba de errores:**

1. **Usuario no encontrado:**

```bash
curl http://localhost:3000/api/users/999
```

2. **ID inválido:**

```bash
curl http://localhost:3000/api/users/abc
```

3. **Validación fallida:**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A",
    "email": "email-invalido",
    "password": "123"
  }'
```

4. **Email duplicado:**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Duplicate",
    "email": "juan@email.com",
    "password": "ValidPass123"
  }'
```

5. **Ruta no encontrada:**

```bash
curl http://localhost:3000/api/nonexistent
```

6. **JSON malformado:**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": '
```

### 6.2 Verificar logs generados

```bash
# Ver logs creados
ls -la logs/
cat logs/error.log
cat logs/info.log
```

---

## ✅ Checkpoint Final (60 min completados)

### 🎯 Has logrado

- ✅ Crear sistema de errores personalizado con ApiError
- ✅ Implementar logging básico con archivos
- ✅ Configurar error handler centralizado
- ✅ Manejar diferentes tipos de errores (validación, not found, etc.)
- ✅ Actualizar services con manejo robusto de errores
- ✅ Implementar logging de requests y errores
- ✅ Probar todos los escenarios de error

### 🏆 Sistema completo logrado

Tu API ahora tiene:

- **Validación robusta** con Joi
- **Arquitectura profesional** Controllers/Services
- **Error handling centralizado** y consistente
- **Logging básico** para debugging y monitoreo
- **Respuestas estandarizadas** en todos los casos

### 🚀 Lista para el proyecto final

Con estas 3 prácticas completadas, tienes todas las herramientas para desarrollar el **Proyecto Integrador de la Semana 4**.

---

_Práctica 3 completada - Sistema robusto de error handling implementado_

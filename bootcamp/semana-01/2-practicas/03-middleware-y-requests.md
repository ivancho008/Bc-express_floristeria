# Práctica 3: Middleware y Manejo de Requests

## 🎯 Objetivo

Comprender y aplicar el sistema de middleware de Express.js creando middlewares personalizados para logging, validación y manejo de errores.

## ⏱️ Tiempo Estimado: 90 minutos (Bloque 3)

## 📋 Pre-requisitos

- ✅ Práctica 1 y 2 completadas
- ✅ API Express.js funcionando
- ✅ Comprensión básica de funciones JavaScript

## 🎓 Conceptos Clave

### ¿Qué es Middleware?

El middleware son **funciones que se ejecutan entre la petición (request) y la respuesta (response)**. Tienen acceso a:

- `req` (request): Objeto con información de la petición
- `res` (response): Objeto para enviar la respuesta
- `next()`: Función para pasar al siguiente middleware

### Flujo de Middleware

```
Cliente → Request → Middleware 1 → Middleware 2 → Ruta → Response → Cliente
                         ↓              ↓          ↓
                      next()        next()     res.json()
```

## 🚀 Desarrollo Práctico

### Paso 1: Crear Middleware de Logging (30 min)

Vamos a crear un middleware que registre todas las peticiones.

```bash
# En tu proyecto mi-primera-api-express
cd mi-primera-api-express

# Crear carpeta para middlewares
mkdir -p src/middlewares

# Crear archivo de logging
cat > src/middlewares/logger.js << 'EOF'
/**
 * Middleware de logging
 * Registra información de cada request
 */
export const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip || req.connection.remoteAddress;

    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

    // Pasar al siguiente middleware
    next();
};

/**
 * Middleware de tiempo de respuesta
 * Mide cuánto tarda en responder cada request
 */
export const responseTime = (req, res, next) => {
    const startTime = Date.now();

    // Hook para cuando la respuesta termine
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`⏱️  Response time: ${duration}ms`);
    });

    next();
};

/**
 * Middleware de información del request
 * Agrega información útil al objeto req
 */
export const requestInfo = (req, res, next) => {
    req.timestamp = new Date().toISOString();
    req.requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    next();
};
EOF
```

**Actualizar server.js:**

```javascript
// server.js
import express from 'express';
import {
  requestLogger,
  responseTime,
  requestInfo,
} from './src/middlewares/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ===================================
// MIDDLEWARES GLOBALES (se ejecutan en TODAS las rutas)
// ===================================

// 1. Middleware de Express para parsear JSON
app.use(express.json());

// 2. Nuestros middlewares personalizados
app.use(requestInfo); // Agrega info al request
app.use(requestLogger); // Log de cada request
app.use(responseTime); // Mide tiempo de respuesta

// ===================================
// RUTAS
// ===================================

// Endpoint de prueba
app.get('/', (req, res) => {
  res.json({
    message: '¡API con middleware funcionando!',
    requestId: req.requestId,
    timestamp: req.timestamp,
  });
});

app.get('/info', (req, res) => {
  res.json({
    api: 'Express.js con Middleware',
    week: 1,
    practice: 3,
    requestId: req.requestId,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor con middleware en http://localhost:${PORT}`);
});
```

**🔍 Probar:**

```bash
# Iniciar servidor
pnpm start

# En otra terminal:
curl http://localhost:3000
curl http://localhost:3000/info

# Observar en la consola del servidor:
# - Logs de cada request
# - Tiempo de respuesta
# - Request ID único
```

### Paso 2: Middleware de Validación (30 min)

Ahora crearemos middleware para validar datos de entrada.

```bash
# Crear middleware de validación
cat > src/middlewares/validation.js << 'EOF'
/**
 * Middleware para validar que el body no esté vacío
 */
export const validateBody = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Body is required',
                requestId: req.requestId
            });
        }
    }
    next();
};

/**
 * Middleware para validar campos requeridos
 * @param {string[]} fields - Array de nombres de campos requeridos
 */
export const validateFields = (fields) => {
    return (req, res, next) => {
        const missingFields = [];

        for (const field of fields) {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        }

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Missing required fields',
                missingFields,
                requestId: req.requestId
            });
        }

        next();
    };
};

/**
 * Middleware para validar tipos de datos
 */
export const validateTypes = (schema) => {
    return (req, res, next) => {
        const errors = [];

        for (const [field, expectedType] of Object.entries(schema)) {
            const value = req.body[field];
            const actualType = typeof value;

            if (value !== undefined && actualType !== expectedType) {
                errors.push({
                    field,
                    expectedType,
                    actualType,
                    value
                });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                error: 'Type validation failed',
                errors,
                requestId: req.requestId
            });
        }

        next();
    };
};
EOF
```

**Actualizar server.js con validación:**

```javascript
// server.js (agregar después de los imports anteriores)
import {
  validateBody,
  validateFields,
  validateTypes,
} from './src/middlewares/validation.js';

// ... (código anterior)

// ===================================
// NUEVAS RUTAS CON VALIDACIÓN
// ===================================

// Ruta POST con validación de campos
app.post(
  '/items',
  validateBody,
  validateFields(['name', 'price']),
  validateTypes({ price: 'number' }),
  (req, res) => {
    const { name, price } = req.body;

    res.status(201).json({
      message: 'Item created successfully',
      item: { name, price },
      requestId: req.requestId,
    });
  }
);

// Ruta POST sin validación específica (solo body)
app.post('/echo', validateBody, (req, res) => {
  res.json({
    message: 'Echo received',
    data: req.body,
    requestId: req.requestId,
  });
});
```

**🔍 Probar validaciones:**

```bash
# 1. POST sin body (debe fallar)
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json"

# 2. POST con body pero sin campos requeridos (debe fallar)
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"description": "test"}'

# 3. POST con campos pero tipo incorrecto (debe fallar)
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Item 1", "price": "invalid"}'

# 4. POST correcto (debe funcionar)
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Item 1", "price": 100}'
```

### Paso 3: Middleware de Manejo de Errores (30 min)

Finalmente, crearemos middleware para manejar errores de forma centralizada.

```bash
# Crear middleware de errores
cat > src/middlewares/errorHandler.js << 'EOF'
/**
 * Middleware para rutas no encontradas (404)
 * Este debe ir DESPUÉS de todas las rutas
 */
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Middleware de manejo de errores global
 * Este debe ir AL FINAL de todos los middlewares
 */
export const errorHandler = (err, req, res, next) => {
    // Status code (usa el que ya tenga res, o 500 por defecto)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Estructura de respuesta de error
    const errorResponse = {
        error: {
            message: err.message,
            status: statusCode,
            requestId: req.requestId,
            timestamp: new Date().toISOString()
        }
    };

    // En desarrollo, agregar stack trace
    if (process.env.NODE_ENV === 'development') {
        errorResponse.error.stack = err.stack;
    }

    // Log del error en consola
    console.error(`❌ Error [${statusCode}]:`, err.message);
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    res.status(statusCode).json(errorResponse);
};

/**
 * Middleware para manejar errores async/await
 * Wrapper para funciones async en rutas
 */
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
EOF
```

**Actualizar server.js completo:**

```javascript
// server.js - Versión final con manejo de errores
import express from 'express';
import {
  requestLogger,
  responseTime,
  requestInfo,
} from './src/middlewares/logger.js';
import {
  validateBody,
  validateFields,
  validateTypes,
} from './src/middlewares/validation.js';
import {
  notFound,
  errorHandler,
  asyncHandler,
} from './src/middlewares/errorHandler.js';

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
// RUTAS
// ===================================

app.get('/', (req, res) => {
  res.json({
    message: 'API completa con middleware',
    requestId: req.requestId,
  });
});

app.get('/info', (req, res) => {
  res.json({
    api: 'Express.js Complete Middleware',
    features: ['logging', 'validation', 'error handling'],
    requestId: req.requestId,
  });
});

// Ruta con validación
app.post(
  '/items',
  validateBody,
  validateFields(['name', 'price']),
  validateTypes({ price: 'number' }),
  (req, res) => {
    res.status(201).json({
      message: 'Item created',
      item: req.body,
      requestId: req.requestId,
    });
  }
);

// Ruta que simula un error
app.get('/error', (req, res, next) => {
  const error = new Error('This is a simulated error');
  error.statusCode = 500;
  next(error);
});

// Ruta async con manejo de errores
app.get(
  '/async-error',
  asyncHandler(async (req, res) => {
    // Simular operación async que falla
    await Promise.reject(new Error('Async operation failed'));
  })
);

// ===================================
// MANEJO DE ERRORES (SIEMPRE AL FINAL)
// ===================================
app.use(notFound); // Maneja rutas no encontradas
app.use(errorHandler); // Maneja todos los errores

// ===================================
// INICIAR SERVIDOR
// ===================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor completo en http://localhost:${PORT}`);
  console.log('📋 Rutas disponibles:');
  console.log('  GET  /');
  console.log('  GET  /info');
  console.log('  POST /items');
  console.log('  GET  /error (prueba errores)');
  console.log('  GET  /async-error (prueba async errors)');
});
```

**🔍 Probar manejo de errores:**

```bash
# 1. Ruta no existente (404)
curl http://localhost:3000/no-existe

# 2. Error simulado (500)
curl http://localhost:3000/error

# 3. Error async
curl http://localhost:3000/async-error

# 4. POST inválido (400)
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "test"}'
```

## ✅ Verificación Final

Al terminar esta práctica debes tener:

- [x] Middleware de logging funcionando
- [x] Middleware de tiempo de respuesta
- [x] Middleware de información del request
- [x] Middleware de validación de body
- [x] Middleware de validación de campos
- [x] Middleware de validación de tipos
- [x] Middleware de manejo de 404
- [x] Middleware de manejo de errores global
- [x] Wrapper para funciones async

## 📊 Estructura Final del Proyecto

```
mi-primera-api-express/
├── src/
│   └── middlewares/
│       ├── logger.js           # Logging y timing
│       ├── validation.js       # Validaciones
│       └── errorHandler.js     # Manejo de errores
├── server.js                   # Servidor principal
├── package.json
└── node_modules/
```

## 🎯 Conceptos Aprendidos

1. **Middleware Chain**: Los middlewares se ejecutan en orden
2. **next()**: Función para pasar al siguiente middleware
3. **Middleware Global**: Se aplica a todas las rutas
4. **Middleware Específico**: Se aplica solo a rutas específicas
5. **Error Handling**: Middleware con 4 parámetros (err, req, res, next)
6. **Validación**: Middleware para validar datos de entrada
7. **Logging**: Middleware para registrar actividad
8. **Async Handling**: Wrapper para funciones asíncronas

## 💡 Tips Importantes

1. **Orden importa**: Los middlewares se ejecutan en el orden que los declaras
2. **next() es clave**: Siempre llama `next()` o envía una respuesta
3. **Error handling al final**: Los middleware de error van al final
4. **404 antes de error handler**: El middleware de 404 va antes del error handler
5. **Reutilización**: Crea middlewares reutilizables

## 📚 Recursos Adicionales

- [Express Middleware Documentation](https://expressjs.com/en/guide/using-middleware.html)
- [Writing Middleware](https://expressjs.com/en/guide/writing-middleware.html)
- [Error Handling](https://expressjs.com/en/guide/error-handling.html)

---

**Siguiente paso:** Práctica 4 - Routing Avanzado y Organización del Código

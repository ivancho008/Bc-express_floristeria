# Fundamentos Teóricos - Express.js y Node.js Moderno

## 🎯 Conceptos Fundamentales

### 1. Qué es Express.js

Express.js es un framework web minimalista, rápido y flexible para Node.js que proporciona un conjunto robusto de características para aplicaciones web y móviles.

#### Características Principales

- **Minimalista**: Framework ligero y no opinionado
- **Rápido**: Alto rendimiento para aplicaciones web
- **Flexible**: Permite diferentes arquitecturas y patrones
- **Middleware**: Sistema robusto de middleware para extender funcionalidad
- **Routing**: Sistema de rutas potente y expresivo
- **Template engines**: Soporte para múltiples motores de plantillas
- **Robusto**: Maduro y estable, usado en producción por grandes empresas
- **Comunidad**: Ecosistema amplio de middleware y plugins

### 2. Arquitectura de Express.js

```
┌─────────────────────────────────────────────┐
│                Express App                  │
├─────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────┐   │
│  │   Router    │  │    Middleware       │   │
│  │   Sistema   │  │    Pipeline         │   │
│  └─────────────┘  └─────────────────────┘   │
├─────────────────────────────────────────────┤
# Fundamentos Teóricos - Express.js y Node.js Moderno

## 🎯 Conceptos Fundamentales

### 1. Qué es Express.js

Express.js es un framework web minimalista, rápido y flexible para Node.js que proporciona un conjunto robusto de características para aplicaciones web y móviles.

#### Características Principales

- **Minimalista**: Framework ligero y no opinionado
- **Rápido**: Alto rendimiento para aplicaciones web
- **Flexible**: Permite diferentes arquitecturas y patrones
- **Middleware**: Sistema robusto de middleware para extender funcionalidad
- **Routing**: Sistema de rutas potente y expresivo
- **Template engines**: Soporte para múltiples motores de plantillas
- **Robusto**: Maduro y estable, usado en producción por grandes empresas
- **Comunidad**: Ecosistema amplio de middleware y plugins

### 2. Arquitectura de Express.js

```

┌─────────────────────────────────────────────┐
│ Express App                                 │
├─────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────────────┐     │
│ │ Router      │ │ Middleware          │     │
│ │ Sistema     │ │ Pipeline            │     │
│ └─────────────┘ └─────────────────────┘     │
├─────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────────────┐     │
│ │ Request     │ │ Response            │     │
│ │ Handling    │ │ Processing          │     │
│ └─────────────┘ └─────────────────────┘     │
├─────────────────────────────────────────────┤
│ Node.js Runtime                             │
├─────────────────────────────────────────────┤
│ HTTP Server                                 │
└─────────────────────────────────────────────┘

````

### 3. Sistema de Middleware

El middleware es el corazón de Express.js. Son funciones que se ejecutan durante el ciclo de vida de una petición HTTP.

#### Qué es Middleware

1. **Funciones intermedias**: Se ejecutan entre la petición y la respuesta
2. **Pipeline**: Se ejecutan en orden secuencial
3. **Control de flujo**: Pueden pasar al siguiente middleware o terminar la cadena
4. **Acceso completo**: Tienen acceso a req, res y next

#### Ejemplo de evolución

```javascript
// Middleware básico
app.use((req, res, next) => {
  console.log('Request received');
  next(); // Pasa al siguiente middleware
});

// Middleware con funcionalidad
app.use((req, res, next) => {
  req.timestamp = new Date().toISOString();
  next();
});

// Middleware personalizado
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.timestamp}`);
  next();
};

app.use(logger);

// Middleware condicional
app.use('/api', (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
````

### 4. Routing en Express

El sistema de routing permite definir cómo responde la aplicación a peticiones de clientes.

#### Beneficios

1. **Organización**: Separa lógica por rutas
2. **Modularidad**: Rutas en archivos separados
3. **Flexibilidad**: Patrones de URL dinámicos
4. **Middleware específico**: Middleware por ruta
5. **Parámetros**: Captura de parámetros de URL

#### Ciclo de vida de una petición

```
Request → Middleware Global → Router Middleware → Route Handler →
Response Middleware → Response
```

### 5. JavaScript Moderno para Backend

Node.js permite usar JavaScript moderno en el servidor, incluyendo características ES6+.

#### Conceptos Clave

- **ES6+ Features**: Arrow functions, destructuring, template literals
- **Async/Await**: Manejo de operaciones asíncronas
- **Modules**: import/export para organizar código
- **Promises**: Manejo de operaciones asíncronas

#### Cuándo usar async en Express

```javascript
// Usar async cuando:
app.get('/external-api', async (req, res) => {
  // Llamadas a APIs externas
  // Operaciones de base de datos
  // Operaciones de archivos I/O
  // Cualquier operación que "espera"
  try {
    const data = await fetch('https://api.external.com/data');
    res.json(await data.json());
  } catch (error) {
    res.status(500).json({ error: 'External API failed' });
  }
});

// Funciones síncronas cuando:
app.get('/calculation', (req, res) => {
  // Cálculos simples
  // Operaciones que no "esperan"
  // Procesamientos síncronos
  const result = req.query.a * req.query.b;
  res.json({ result });
});
```

### 6. REST API Design Principles

#### Principios fundamentales

1. **Stateless**: Cada request contiene toda la información necesaria
2. **Client-Server**: Separación clara entre cliente y servidor
3. **Cacheable**: Responses deben ser cacheables cuando sea apropiado
4. **Layered System**: Arquitectura en capas
5. **Uniform Interface**: Interfaz consistente

#### HTTP Methods y su propósito

- **GET**: Obtener datos (idempotente, safe)
- **POST**: Crear recursos (no idempotente)
- **PUT**: Actualizar completo (idempotente)
- **PATCH**: Actualización parcial (no idempotente)
- **DELETE**: Eliminar recursos (idempotente)

#### Status Codes importantes

- **2xx Success**: 200 (OK), 201 (Created), 204 (No Content)
- **4xx Client Error**: 400 (Bad Request), 401 (Unauthorized), 404 (Not Found)
- **5xx Server Error**: 500 (Internal Server Error), 503 (Service Unavailable)

### 7. Package Management con pnpm

pnpm es un gestor de paquetes rápido y eficiente para Node.js que optimiza el almacenamiento de dependencias.

#### Beneficios

1. **Eficiencia**: Menor uso de espacio en disco
2. **Velocidad**: Instalaciones más rápidas
3. **Seguridad**: Estricto control de dependencias
4. **Compatibilidad**: Compatible con npm

#### Comandos esenciales

```bash
# Inicializar proyecto
pnpm init

# Instalar dependencias
pnpm install express

# Instalar dependencias de desarrollo
pnpm install -D nodemon

# Ejecutar scripts
pnpm start
pnpm dev

# Información del proyecto
pnpm list
```

## 🔧 Patrones de Diseño en Express.js

### 1. Router Pattern

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
```

### 2. Middleware Pattern

```javascript
// middleware/logger.js
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

// middleware/auth.js
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Validar token...
  next();
};

// Uso
app.use(logger);
app.use('/api', authenticate);
```

### 3. Controller Pattern

```javascript
// controllers/userController.js
class UserController {
  static async getAllUsers(req, res) {
    try {
      // Lógica para obtener usuarios
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
```

## 📊 Mejores Prácticas

### 1. Estructura del Proyecto

```
project/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   │   ├── index.js
│   │   └── users.js
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── logger.js
│   │   └── auth.js
│   ├── services/
│   │   └── userService.js
│   └── config/
│       └── database.js
├── tests/
├── package.json
└── README.md
```

### 2. Manejo de Errores

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
  });
};

module.exports = errorHandler;
```

### 3. Validación de Datos

```javascript
// Con express-validator
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('age')
    .isInt({ min: 18, max: 120 })
    .withMessage('Age must be between 18 and 120'),
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

app.post('/users', validateUser, userController.createUser);
```

## 🎯 Conceptos para la Semana 2

- **JavaScript ES6+ Features** (Destructuring, Modules, Async/Await)
- **Error Handling** (Try/catch, Error middleware)
- **Request/Response Objects** (Query params, Body parsing)
- **Route Parameters** (Dynamic routes, wildcards)
- **Static Files** (Serving assets, public folder)
- **Environment Variables** (dotenv, configuration)

## 📚 Recursos Adicionales

- [Express.js Official Docs](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [pnpm Documentation](https://pnpm.io/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [REST API Design](https://restfulapi.net/)

## 🧠 Preguntas de Reflexión

1. ¿Cuáles son las ventajas de usar middleware en Express.js?
2. ¿Cómo se diferencia Express.js de otros frameworks web?
3. ¿Cuándo deberías usar async/await en Express?
4. ¿Qué beneficios proporciona pnpm sobre npm?
5. ¿Cómo se relacionan los principios REST con Express.js?

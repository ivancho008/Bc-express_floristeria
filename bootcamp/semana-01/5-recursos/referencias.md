# Recursos y Referencias - Semana 1

## 📚 Documentación Oficial

### Express.js

- [Express.js Official Documentation](https://expressjs.com/)
- [Express.js GitHub Repository](https://github.com/expressjs/express)
- [Express.js API Reference](https://expressjs.com/en/4x/api.html)
- [Express.js Guide](https://expressjs.com/en/guide/)

### Node.js

- [Node.js Official Documentation](https://nodejs.org/docs/)
- [Node.js API Documentation](https://nodejs.org/api/)
- [Node.js GitHub Repository](https://github.com/nodejs/node)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### JavaScript Moderno

- [MDN JavaScript Guide](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide)
- [ES Modules Documentation](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules)
- [JavaScript.info](https://javascript.info/)
- [You Don't Know JS Book Series](https://github.com/getify/You-Dont-Know-JS)

## 🛠️ Herramientas de Desarrollo

### Editores y IDEs

- [VS Code with Node.js Extension Pack](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial)
- [WebStorm](https://www.jetbrains.com/webstorm/)
- [Vim/Neovim with Node.js plugins](https://github.com/neoclide/coc-tsserver)

### Testing Tools

- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)

### API Development

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [HTTPie](https://httpie.io/)
- [curl](https://curl.se/)

## 📖 Libros Recomendados

### JavaScript/Node.js

- "Eloquent JavaScript" by Marijn Haverbeke
- "You Don't Know JS" series by Kyle Simpson
- "Node.js Design Patterns" by Mario Casciaro
- "Clean Code in JavaScript" by Miguel A. Gómez

### API Design

- "RESTful API Design" by Matthias Biehl
- "Building APIs with Node.js" by Caio Ribeiro Pereira
- "API Design Patterns" by JJ Geewax

### Web Development

- "Node.js in Action" by Mike Cantelon
- "Building Microservices" by Sam Newman

## 🎥 Videos y Cursos

### YouTube Channels

- [Traversy Media](https://www.youtube.com/c/TraversyMedia) - Full stack development
- [The Net Ninja](https://www.youtube.com/c/TheNetNinja) - Node.js tutorials
- [Academind](https://www.youtube.com/c/Academind) - Modern web development

### Cursos Online

- [Node.js Course by The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs)
- [Complete Node.js Developer Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/)
- [FreeCodeCamp Node.js](https://www.freecodecamp.org/learn/back-end-development-and-apis/)

## 🌐 Blogs y Artículos

### Node.js/Express.js Specific

- [Node.js Blog](https://nodejs.org/en/blog/)
- [Express.js Blog](https://expressjs.com/en/guide/)
- [Dev.to Node.js Articles](https://dev.to/t/nodejs)

### General JavaScript/API

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Weekly](https://javascriptweekly.com/)
- [API Evangelist](https://apievangelist.com/)

## 🛠️ Herramientas de Línea de Comandos

### Instalación y Gestión

```bash
# Gestión de paquetes con pnpm (recomendado)
pnpm install express
pnpm add express cors helmet morgan
pnpm add -D nodemon jest supertest

# Inicializar proyecto
npm init -y
pnpm init

# Ejecutar aplicación
node app.js
node --watch app.js  # Node.js 18+ con watch mode
pnpm dev            # script personalizado
pnpm start          # producción

# Testing
pnpm test
pnpm test -- --watch
pnpm test -- --coverage

# Linting y formateo
pnpm add -D eslint prettier
npx eslint . --fix
npx prettier . --write
```

### Comandos útiles de HTTP

```bash
# GET request
curl http://localhost:3000/api/users

# POST request
curl -X POST "http://localhost:3000/api/users" \
     -H "Content-Type: application/json" \
     -d '{"name":"Juan","email":"juan@email.com"}'

# PUT request
curl -X PUT "http://localhost:3000/api/users/1" \
     -H "Content-Type: application/json" \
     -d '{"name":"Juan Carlos"}'

# DELETE request
curl -X DELETE "http://localhost:3000/api/users/1"

# With query parameters
curl "http://localhost:3000/api/users?page=1&limit=10"
```

## 📊 Cheat Sheets

### Express.js Quick Reference

```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Path parameters
app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({ userId: parseInt(userId) });
});

// Query parameters
app.get('/items', (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  res.json({ skip: parseInt(skip), limit: parseInt(limit) });
});

// Request body
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const user = { id: Date.now(), name, email };
  res.status(201).json(user);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Data Validation with Joi

```javascript
import Joi from 'joi';

// User schema
const userSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120),
  status: Joi.string().valid('active', 'inactive').default('active'),
  tags: Joi.array().items(Joi.string()),
  createdAt: Joi.date().default(Date.now),
});

// Validation middleware
const validateUser = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;
  next();
};

// Usage
app.post('/users', validateUser, (req, res) => {
  // req.body is now validated and sanitized
  res.status(201).json(req.body);
});
```

### HTTP Status Codes

```javascript
// Success responses
res.status(200).json(data); // OK
res.status(201).json(data); // Created
res.status(204).send(); // No Content

// Client error responses
res.status(400).json({ error: 'Bad Request' }); // 400
res.status(401).json({ error: 'Unauthorized' }); // 401
res.status(403).json({ error: 'Forbidden' }); // 403
res.status(404).json({ error: 'Not Found' }); // 404
res.status(422).json({ error: 'Unprocessable Entity' }); // 422

// Server error responses
res.status(500).json({ error: 'Internal Server Error' }); // 500
```

## 🔧 Configuración de Desarrollo

### package.json básico

```json
{
  "name": "express-api",
  "version": "1.0.0",
  "type": "module",
  "description": "Express.js API",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier . --write"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "joi": "^17.11.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1"
  }
}
```

### .env ejemplo

```env
# Application
APP_NAME="Mi Express API"
APP_VERSION="1.0.0"
NODE_ENV=development

# Server
HOST=localhost
PORT=3000

# Database
DATABASE_URL="mongodb://localhost:27017/mi-app"

# Security
JWT_SECRET="your-jwt-secret-here"
JWT_EXPIRES_IN="7d"

# External APIs
API_KEY="your-api-key-here"
```

### VS Code settings.json

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "eslint.validate": ["javascript", "javascriptreact"],
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "javascript.preferences.includePackageJsonAutoImports": "auto"
}
```

## 🐛 Debugging y Troubleshooting

### Errores Comunes

1. **Error: Cannot find module**: Módulo no encontrado

   ```bash
   pnpm install nombre-del-paquete
   # o verificar que el módulo esté en node_modules
   ```

2. **SyntaxError**: Error de sintaxis

   ```javascript
   // Verificar uso correcto de ES Modules
   import express from 'express'; // ✅ Correcto
   const express = require('express'); // ❌ CommonJS

   // Asegurar que package.json tenga "type": "module"
   ```

3. **404 Not Found**: Endpoint no existe

   ```javascript
   // Verificar método HTTP correcto
   app.get('/users', handler); // Para GET requests
   app.post('/users', handler); // Para POST requests

   // Verificar orden de rutas (más específicas primero)
   app.get('/users/:id', handler);
   app.get('/users', handler);
   ```

### Logging para debugging

```javascript
import morgan from 'morgan';

// Morgan middleware para logging automático
app.use(morgan('combined'));

// Logging manual
const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
  debug: (msg) => console.debug(`[DEBUG] ${new Date().toISOString()} - ${msg}`),
};

app.get('/debug', (req, res) => {
  logger.debug('Debug endpoint called');
  logger.info('Info message');
  logger.error('Error message');
  res.json({ message: 'Check console logs' });
});
```

## 🌟 Mejores Prácticas

### Estructura de Proyecto

```
api/
├── package.json
├── .env
├── .gitignore
├── app.js
├── src/
│   ├── controllers/
│   │   ├── index.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── index.js
│   │   └── User.js
│   ├── routes/
│   │   ├── index.js
│   │   └── users.js
│   ├── services/
│   │   ├── index.js
│   │   └── userService.js
│   └── utils/
│       ├── logger.js
│       └── database.js
└── tests/
    ├── integration/
    └── unit/
        └── userController.test.js
```

### Naming Conventions

- **Variables**: camelCase
- **Functions**: camelCase
- **Classes**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Files**: camelCase.js o kebab-case.js
- **Endpoints**: kebab-case

### Error Handling

```javascript
// Error handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(err.stack);

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage
const getUserById = (req, res, next) => {
  const user = database.getUser(req.params.id);
  if (!user) {
    return next(new AppError(`User with id ${req.params.id} not found`, 404));
  }
  res.json(user);
};
```

## 📱 Extensiones y Plugins

### VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**: Snippets útiles para JavaScript
- **ESLint**: Linting para JavaScript
- **Prettier**: Formateo de código
- **REST Client**: Cliente REST integrado
- **Thunder Client**: Cliente HTTP como Postman
- **GitLens**: Mejoras para Git
- **Auto Rename Tag**: Renombrado automático de etiquetas
- **Bracket Pair Colorizer**: Colores para brackets

### Herramientas Adicionales

- **Husky**: Git hooks para calidad de código
- **lint-staged**: Ejecutar linters en archivos staged
- **ESLint**: Linting estático
- **Prettier**: Formateo automático
- **Nodemon**: Auto-restart en desarrollo
- **PM2**: Process manager para producción

## 🔗 APIs Públicas para Practicar

### APIs Gratuitas

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [HTTPBin](https://httpbin.org/)
- [ReqRes](https://reqres.in/)
- [JSON Server](https://github.com/typicode/json-server)

### Para Integración

- [OpenWeatherMap API](https://openweathermap.org/api)
- [GitHub API](https://docs.github.com/en/rest)
- [REST Countries](https://restcountries.com/)
- [Cat Facts API](https://catfact.ninja/)

## 🎯 Próximos Pasos (Semana 2)

### Temas a Estudiar

- Mongoose ODM para MongoDB
- Autenticación y Autorización con JWT
- Middleware avanzado
- Validación de datos con Joi/Yup
- Testing avanzado con Jest
- Manejo de archivos y uploads
- WebSockets con Socket.io
- Deployment con Docker

### Preparación Recomendada

- Repasar conceptos de bases de datos NoSQL
- Familiarizarse con MongoDB básico
- Leer sobre JWT y OAuth2
- Practicar con testing unitario
- Explorar Docker básico

¡Utiliza estos recursos para profundizar en Express.js y convertirte en un desarrollador backend más competente! 🚀

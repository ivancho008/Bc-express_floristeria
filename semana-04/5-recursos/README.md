# 📚 Recursos Semana 4 - Validación y Estructura

## 🎯 Objetivo
Recursos de apoyo para validación con Joi, arquitectura MVC en Express, y manejo de errores.

---

## 📖 Documentación Oficial

### 🔗 **Joi - Validación**
- **[Joi Documentation](https://joi.dev/api/)** - Documentación oficial completa
- **[Joi GitHub](https://github.com/sideway/joi)** - Código fuente y ejemplos
- **[Joi Tester](https://joi.dev/tester/)** - Herramienta online para probar schemas

### 🔗 **Express.js Avanzado**
- **[Express Error Handling](https://expressjs.com/en/guide/error-handling.html)** - Manejo de errores oficial
- **[Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)** - Mejores prácticas
- **[Express Middleware](https://expressjs.com/en/guide/using-middleware.html)** - Guía de middleware

---

## 🛠️ Herramientas Recomendadas

### 📦 **Extensiones VS Code**
```json
{
  "recommendations": [
    "ms-vscode.vscode-json",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "humao.rest-client"
  ]
}
```

### 🧪 **Testing de APIs**
- **[Postman](https://www.postman.com/)** - Cliente REST completo
- **[Insomnia](https://insomnia.rest/)** - Cliente REST minimalista
- **[REST Client (VS Code)](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)** - Extension para VS Code
- **[curl](https://curl.se/)** - Herramienta de línea de comandos

### 📝 **Archivo .http para VS Code**
```http
### Crear producto válido
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "Laptop Gaming",
  "price": 1500,
  "category": "electronics",
  "inStock": true
}

### Crear producto inválido
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "AB",
  "price": -100,
  "category": "invalid"
}

### Obtener productos con filtros
GET http://localhost:3000/api/products?category=electronics&minPrice=500

### Obtener estadísticas
GET http://localhost:3000/api/products/stats
```

---

## 📚 Enlaces de Estudio

### 🎓 **Tutoriales Complementarios**
- **[Joi Validation Tutorial](https://www.digitalocean.com/community/tutorials/node-api-schema-validation-with-joi)** - Tutorial paso a paso
- **[Express MVC Pattern](https://www.bezkoder.com/node-js-express-sequelize-mysql/)** - Patrón MVC en Express
- **[Error Handling Best Practices](https://www.toptal.com/nodejs/node-js-error-handling)** - Manejo de errores en Node.js

### 📺 **Videos Recomendados**
- **[Joi Validation in 15 minutes](https://www.youtube.com/watch?v=Fs0Rpgmj2SY)** - Tutorial rápido
- **[Express.js Architecture](https://www.youtube.com/watch?v=zW_tZR0Ir3Q)** - Arquitectura escalable
- **[Error Handling Patterns](https://www.youtube.com/watch?v=DyqVqaf1KnA)** - Patrones de manejo de errores

---

## 📝 Cheat Sheets

### 🔰 **Joi Schema Patterns**

#### Tipos Básicos
```javascript
// String
Joi.string()
  .min(3)
  .max(50)
  .required()
  .regex(/^[a-zA-Z\s]+$/)
  .messages({
    'string.min': 'Mínimo 3 caracteres',
    'string.required': 'Campo requerido'
  });

// Number
Joi.number()
  .integer()
  .min(0)
  .max(1000)
  .required();

// Boolean
Joi.boolean().required();

// Array
Joi.array()
  .items(Joi.string())
  .min(1)
  .max(5)
  .required();

// Object
Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required()
});

// Date
Joi.date()
  .iso()
  .min('now')
  .required();
```

#### Validaciones Avanzadas
```javascript
// Validación condicional
Joi.object({
  type: Joi.string().valid('email', 'phone').required(),
  contact: Joi.when('type', {
    is: 'email',
    then: Joi.string().email().required(),
    otherwise: Joi.string().pattern(/^\d{10}$/).required()
  })
});

// Alternativas
Joi.alternatives().try(
  Joi.string(),
  Joi.number()
);

// Custom validation
Joi.string().custom((value, helpers) => {
  if (value.includes('bad')) {
    return helpers.error('custom.bad');
  }
  return value;
}, 'Custom validation');
```

### 🏗️ **Estructura MVC Pattern**

#### Controller Template
```javascript
class Controller {
  static async create(req, res) {
    try {
      // 1. Validar entrada
      const { error, value } = schema.validate(req.body);
      if (error) return res.status(400).json({ error });

      // 2. Llamar service
      const result = await Service.create(value);

      // 3. Responder
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

#### Service Template
```javascript
class Service {
  static async create(data) {
    // 1. Validaciones de negocio
    if (businessRule) {
      throw new Error('Business rule violation');
    }

    // 2. Procesar datos
    const processedData = processData(data);

    // 3. Persistir
    return await Model.create(processedData);
  }
}
```

### ⚠️ **Error Handling Patterns**

#### Error Middleware
```javascript
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.log(err);

  // Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};
```

---

## 🔧 Snippets Útiles

### 📋 **Package.json Scripts**
```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  }
}
```

### 🚀 **Dependencias Recomendadas**
```bash
# Producción
npm install express joi cors helmet morgan

# Desarrollo
npm install --save-dev nodemon jest supertest eslint prettier
```

---

## 📊 Ejemplos de Respuestas API

### ✅ **Éxito**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Product Name",
    "price": 100
  },
  "message": "Producto creado exitosamente"
}
```

### ❌ **Error de Validación**
```json
{
  "success": false,
  "error": "Error de validación",
  "details": [
    {
      "field": "name",
      "message": "El nombre es requerido"
    }
  ]
}
```

### ❌ **Error de Negocio**
```json
{
  "success": false,
  "error": "Error de negocio",
  "message": "No se puede crear el producto con precio negativo"
}
```

### ❌ **Error del Servidor**
```json
{
  "success": false,
  "error": "Error interno del servidor",
  "message": "Algo salió mal"
}
```

---

## 🏆 Best Practices

### ✅ **Do's**
- ✅ Validar TODAS las entradas (body, params, query)
- ✅ Usar mensajes de error descriptivos
- ✅ Separar responsabilidades (Controller/Service/Model)
- ✅ Manejar errores de forma consistente
- ✅ Usar códigos HTTP apropiados
- ✅ Loggear errores para debugging

### ❌ **Don'ts**
- ❌ Exponer detalles internos en errores
- ❌ Validar solo en frontend
- ❌ Mezclar lógica de negocio con HTTP
- ❌ Ignorar validación de query parameters
- ❌ Usar status 200 para errores
- ❌ Hardcodear mensajes de error

---

## 📞 Ayuda y Soporte

### 🆘 **Durante la Clase**
- 🙋‍♀️ Levantar la mano para dudas
- 👥 Trabajo en parejas permitido
- 📺 Pantalla compartida para debugging

### 🔍 **Recursos de Debug**
- **Console.log**: Para tracking de flujo
- **Postman/Insomnia**: Para testing de endpoints
- **VS Code Debugger**: Para breakpoints
- **Node.js Inspector**: Para debugging avanzado

### 🌐 **Comunidades**
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/joi)** - Preguntas sobre Joi
- **[Express.js Community](https://github.com/expressjs/express/discussions)** - Discusiones oficiales
- **[Node.js Discord](https://discord.gg/nodejs)** - Chat en tiempo real

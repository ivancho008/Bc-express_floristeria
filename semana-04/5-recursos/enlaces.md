# 🔗 Enlaces y Referencias - Semana 4

## 📚 Documentación Oficial

### Joi (Validación)
- **[Joi API Reference](https://joi.dev/api/)** - Documentación completa
- **[Joi GitHub Examples](https://github.com/sideway/joi/tree/master/examples)** - Ejemplos oficiales
- **[Joi Tester Online](https://joi.dev/tester/)** - Probador de schemas online

### Express.js (Framework)
- **[Express Error Handling](https://expressjs.com/en/guide/error-handling.html)** - Manejo de errores
- **[Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)** - Guía de middleware
- **[Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)** - Mejores prácticas

---

## 🎓 Tutoriales y Guías

### Joi Validation
- **[Input Validation with Joi](https://www.digitalocean.com/community/tutorials/node-api-schema-validation-with-joi)** - Tutorial completo
- **[Advanced Joi Patterns](https://dev.to/rahmanfadhil/how-to-use-joi-for-node-js-input-validation-1ahn)** - Patrones avanzados
- **[Joi Custom Messages](https://stackoverflow.com/questions/48720942/joi-custom-error-messages)** - Mensajes personalizados

### Express Architecture
- **[Express MVC Pattern](https://www.bezkoder.com/node-js-express-sequelize-mysql/)** - Patrón MVC
- **[Express Project Structure](https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/)** - Estructura de proyecto
- **[Express Error Handling Best Practices](https://www.toptal.com/nodejs/node-js-error-handling)** - Manejo de errores

---

## 📺 Videos Recomendados

### Joi & Validation
- **[Joi Validation Tutorial](https://www.youtube.com/watch?v=Fs0Rpgmj2SY)** - 15 min tutorial
- **[Advanced Joi Validation](https://www.youtube.com/watch?v=2VyW0ux5Dxw)** - Patrones avanzados
- **[Form Validation with Joi](https://www.youtube.com/watch?v=48RVjhG9cLs)** - Validación de formularios

### Express.js Architecture  
- **[Express.js Folder Structure](https://www.youtube.com/watch?v=zW_tZR0Ir3Q)** - Estructura escalable
- **[MVC in Express.js](https://www.youtube.com/watch?v=Cgvopu9zg8Y)** - Patrón MVC explicado
- **[Express Middleware Deep Dive](https://www.youtube.com/watch?v=lY6icfhap2o)** - Middleware avanzado

---

## 🛠️ Herramientas de Desarrollo

### Testing de APIs
- **[Postman](https://www.postman.com/downloads/)** - Cliente REST completo
- **[Insomnia](https://insomnia.rest/download)** - Cliente REST minimalista  
- **[Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)** - Extension VS Code
- **[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)** - VS Code extension

### Validación y Desarrollo
- **[JSON Schema Validator](https://www.jsonschemavalidator.net/)** - Validador JSON online
- **[JSON Formatter](https://jsonformatter.curiousconcept.com/)** - Formateador JSON
- **[Regex101](https://regex101.com/)** - Probador de expresiones regulares
- **[Node.js Inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/)** - Debugger oficial

---

## 📖 Artículos Técnicos

### Validation Patterns
- **[API Validation Strategies](https://blog.logrocket.com/joi-vs-yup-validation-libraries/)** - Joi vs Yup
- **[Input Sanitization](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)** - OWASP Guidelines
- **[Schema Validation Best Practices](https://medium.com/javascript-in-plain-english/joi-validation-best-practices-94e5b4e6a9b1)** - Mejores prácticas

### Architecture & Design
- **[Clean Architecture in Node.js](https://mannhowie.com/clean-architecture-node)** - Arquitectura limpia
- **[Express.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)** - Mejores prácticas Node.js
- **[API Design Guidelines](https://github.com/microsoft/api-guidelines)** - Guidelines Microsoft

---

## 🔧 Snippets y Templates

### VS Code Snippets
```json
{
  "Joi Schema": {
    "prefix": "joi-schema",
    "body": [
      "const ${1:schemaName} = Joi.object({",
      "  ${2:field}: Joi.${3:string}().${4:required}(),$0",
      "});"
    ]
  },
  "Express Controller": {
    "prefix": "express-controller",
    "body": [
      "static async ${1:methodName}(req, res) {",
      "  try {",
      "    const { error, value } = ${2:schema}.validate(req.${3:body});",
      "    if (error) {",
      "      return res.status(400).json({ error: error.details });",
      "    }",
      "    $0",
      "    res.status(200).json({ data: result });",
      "  } catch (error) {",
      "    res.status(500).json({ error: error.message });",
      "  }",
      "}"
    ]
  }
}
```

### Package.json Template
```json
{
  "name": "express-validation-app",
  "version": "1.0.0",
  "description": "",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "express": "^4.18.2",
    "joi": "^17.9.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "supertest": "^6.3.3",
    "eslint": "^8.45.0",
    "prettier": "^3.0.0"
  }
}
```

---

## 🌐 Comunidades y Soporte

### Foros y Discusiones
- **[Stack Overflow - Joi](https://stackoverflow.com/questions/tagged/joi)** - Preguntas sobre Joi
- **[Stack Overflow - Express](https://stackoverflow.com/questions/tagged/express)** - Preguntas sobre Express
- **[Reddit r/node](https://www.reddit.com/r/node/)** - Comunidad Node.js
- **[Dev.to Node.js](https://dev.to/t/nodejs)** - Artículos y tutoriales

### Chat y Discord
- **[Node.js Discord](https://discord.gg/nodejs)** - Chat oficial Node.js
- **[JavaScript Discord](https://discord.gg/javascript)** - Comunidad JavaScript
- **[The Programmer's Hangout](https://discord.gg/programming)** - Discord de programación

### GitHub Repositories
- **[Joi Examples](https://github.com/sideway/joi/tree/master/examples)** - Ejemplos oficiales
- **[Express Examples](https://github.com/expressjs/express/tree/master/examples)** - Ejemplos Express
- **[Awesome Node.js](https://github.com/sindresorhus/awesome-nodejs)** - Lista curada de recursos

---

## 📝 Checklists

### ✅ Pre-clase Setup
- [ ] Node.js 18+ instalado
- [ ] VS Code con extensiones recomendadas
- [ ] Postman o cliente REST instalado
- [ ] Git configurado correctamente

### ✅ Durante la Práctica
- [ ] Crear estructura de carpetas correcta
- [ ] Implementar schemas de validación
- [ ] Separar controllers y services
- [ ] Probar endpoints con cliente REST
- [ ] Manejar errores apropiadamente

### ✅ Post-clase Review
- [ ] Revisar código implementado
- [ ] Completar ejercicios pendientes  
- [ ] Leer recursos adicionales
- [ ] Preparar dudas para próxima clase

---

## 🚨 Troubleshooting Común

### Error: "Cannot read property 'validate' of undefined"
```javascript
// ❌ Incorrecto
const schema = require('./validators/schema');

// ✅ Correcto  
const { schema } = require('./validators/schema');
// o
const schemas = require('./validators/schema');
const { error } = schemas.productSchema.validate(data);
```

### Error: "Module not found"
```bash
# Verificar estructura de archivos
npm list joi
npm install joi

# Verificar rutas relativas
// ❌ Incorrecto
require('validators/schema')

// ✅ Correcto
require('./validators/schema')
require('../validators/schema')
```

### Error: "Cannot set headers after they are sent"
```javascript
// ❌ Incorrecto - múltiples responses
if (error) {
  res.status(400).json({ error });
  res.status(500).json({ error: 'Another error' }); // Error!
}

// ✅ Correcto - usar return
if (error) {
  return res.status(400).json({ error });
}
```

---

**📞 Contacto:** Para dudas específicas durante la clase, usar el chat o levantar la mano.

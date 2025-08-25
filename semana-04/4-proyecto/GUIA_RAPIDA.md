# ⚡ Guía Rápida - Semana 4: Validación y Estructura

## 🎯 Objetivo de la Semana

**Implementar validación robusta con Joi y estructura profesional Controllers/Services en 6 horas.**

---

## ⏰ Cronograma Express (5.5h efectivas)

| Tiempo          | Actividad                       | Minutos |
| --------------- | ------------------------------- | ------- |
| **12:00-13:00** | Validación básica con Joi       | 60 min  |
| **13:00-14:00** | Estructura Controllers/Services | 60 min  |
| **14:00-14:30** | ☕ **BREAK OBLIGATORIO**        | 30 min  |
| **14:30-15:30** | Error handling centralizado     | 60 min  |
| **15:30-16:30** | Richardson Maturity Model       | 60 min  |
| **16:30-17:30** | Implementación práctica         | 60 min  |
| **17:30-18:00** | Testing y consolidación         | 30 min  |

---

## 🚀 Setup en 5 Minutos

### 1. Crear Proyecto

```bash
mkdir semana4-validacion-[apellido]
cd semana4-validacion-[apellido]
pnpm init
```

### 2. Instalar Dependencias

```bash
pnpm add express joi
pnpm add -D nodemon
```

### 3. Configurar package.json

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js"
  }
}
```

### 4. Crear Estructura

```bash
mkdir -p src/{controllers,services,middleware,schemas,routes}
touch src/{app.js,controllers/taskController.js,services/taskService.js}
```

---

## 📋 Checklist de Implementación

### ✅ **Hora 1: Validación Joi (60 min)**

- [ ] Instalar y configurar Joi
- [ ] Crear `taskSchema.js` con validaciones
- [ ] Implementar middleware de validación
- [ ] **Test**: Validar request inválido devuelve 400

### ✅ **Hora 2: Estructura MVC (60 min)**

- [ ] Crear `TaskService` con lógica de negocio
- [ ] Crear `TaskController` solo para HTTP
- [ ] Separar responsabilidades claramente
- [ ] **Test**: Endpoint básico funcionando

### ✅ **Hora 3: Error Handling (60 min)**

- [ ] Middleware de error centralizado
- [ ] Manejo de errores de validación
- [ ] Respuestas consistentes HTTP
- [ ] **Test**: Error 404 para ID inexistente

### ✅ **Hora 4: Teoría REST (60 min)**

- [ ] Estudiar Richardson Maturity Model
- [ ] Identificar niveles en API actual
- [ ] Aplicar códigos HTTP correctos
- [ ] **Test**: Verificar responses HTTP

### ✅ **Hora 5: Práctica Final (60 min)**

- [ ] Implementar todos los endpoints CRUD
- [ ] Validar todos los casos de uso
- [ ] Documentar API en README
- [ ] **Test**: Demo completa funcionando

### ✅ **Hora 6: Consolidación (30 min)**

- [ ] Testing manual completo
- [ ] Revisar código y comentarios
- [ ] Preparar demo para presentar
- [ ] **Entrega**: Subir a GitHub

---

## 🔧 Código Base Rápido

### **app.js (Configuración Express)**

```javascript
import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use('/api', taskRoutes);
app.use(errorHandler);

app.listen(3000, () => console.log('Server on port 3000'));
```

### **Joi Schema Básico**

```javascript
import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional().allow(''),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
});
```

### **Middleware de Validación**

```javascript
export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((d) => d.message),
      });
    }
    req.body = value;
    next();
  };
};
```

### **Controller Básico**

```javascript
import taskService from '../services/taskService.js';

export const createTask = async (req, res, next) => {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};
```

---

## 🧪 Testing Rápido

### **Comandos curl para probar**

```bash
# Crear tarea
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task","priority":"high"}'

# Listar tareas
curl http://localhost:3000/api/tasks

# Error de validación (título muy corto)
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Hi"}'
```

---

## 🚨 Troubleshooting Común

### **Error: Cannot use import statement**

```json
// Agregar a package.json
{ "type": "module" }
```

### **Error: Joi validation not working**

```javascript
// Verificar que el middleware esté antes de las rutas
app.use('/api', taskRoutes); // ✅ Correcto orden
```

### **Error: Cannot POST /api/tasks**

```javascript
// Verificar middleware JSON
app.use(express.json()); // ✅ Antes de las rutas
```

### **Error: Headers already sent**

```javascript
// No usar res.send() después de next()
if (error) {
  return res.status(400).json({...}); // ✅ return importante
}
next();
```

---

## 🎯 Criterios de Éxito (6 horas)

### **Mínimo Viable (3-4 horas)**

- ✅ API básica con validación Joi
- ✅ Estructura Controllers/Services
- ✅ Error handling básico

### **Completo (5-6 horas)**

- ✅ Todos los endpoints CRUD
- ✅ Validación completa y robusta
- ✅ Error handling centralizado
- ✅ Documentación clara

### **Bonus (si sobra tiempo)**

- ✅ Middleware adicional
- ✅ Logging básico
- ✅ Tests manuales documentados

---

## 📝 Entrega Final

### **Requisitos Obligatorios**

1. **GitHub repo**: `semana4-validacion-[apellido]`
2. **README.md** con instrucciones
3. **Código funcional** y comentado
4. **Demo en vivo** (5 min máximo)

### **Estructura Final Esperada**

```
src/
├── app.js                    ✅ Express setup
├── controllers/              ✅ HTTP handling
├── services/                 ✅ Business logic
├── middleware/               ✅ Validation + errors
├── schemas/                  ✅ Joi schemas
└── routes/                   ✅ Route definitions
```

---

## 💡 Tips para el Éxito

1. **Empezar simple**: Un endpoint funcionando primero
2. **Probar constantemente**: Curl después de cada cambio
3. **Leer errores**: Los mensajes de Joi son muy claros
4. **Separar responsabilidades**: Controller ≠ Service
5. **Documentar mientras desarrollas**: README actualizado

---

**⏰ Tiempo límite: 6 horas exactas | 🎯 Enfoque: Validación + Estructura | 🚀 Meta: API profesional funcionando**

_Guía Rápida Semana 4 - Bootcamp Express.js_

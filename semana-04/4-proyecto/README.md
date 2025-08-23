# 🎯 Proyecto Semana 4: API de Gestión de Tareas con Validación

## 📋 Descripción del Proyecto

Desarrollar una **API REST de gestión de tareas** que implemente validación robusta con Joi, estructura profesional Controllers/Services, y manejo centralizado de errores, cumpliendo con el Richardson Maturity Model Nivel 2.

---

## 🎯 Objetivos de Aprendizaje

Al completar este proyecto, serás capaz de:

- ✅ Implementar validación completa de datos con Joi
- ✅ Estructurar un proyecto Express.js de forma profesional
- ✅ Separar responsabilidades con Controllers y Services
- ✅ Manejar errores de forma centralizada y consistente
- ✅ Aplicar principios REST del Richardson Maturity Model

---

## 🛠️ Stack Tecnológico

- **Runtime**: Node.js 18+ LTS
- **Framework**: Express.js 4.18+
- **Validación**: Joi 17+
- **Package Manager**: pnpm (obligatorio)
- **Herramientas**: VS Code, Postman/Thunder Client

---

## 📊 Funcionalidades Requeridas

### ✅ **Endpoints Obligatorios**

| Método | Endpoint | Descripción | Validación |
|--------|----------|-------------|------------|
| `POST` | `/api/tasks` | Crear nueva tarea | Título, descripción, prioridad |
| `GET` | `/api/tasks` | Listar todas las tareas | Query params opcionales |
| `GET` | `/api/tasks/:id` | Obtener tarea específica | ID válido |
| `PUT` | `/api/tasks/:id` | Actualizar tarea completa | Todos los campos |
| `DELETE` | `/api/tasks/:id` | Eliminar tarea | ID válido |

### 🔧 **Características Técnicas**

1. **Validación con Joi**:
   - Esquemas de validación para todos los endpoints
   - Middleware de validación reutilizable
   - Mensajes de error claros y específicos

2. **Estructura Controllers/Services**:
   - Controllers solo manejan HTTP
   - Services contienen lógica de negocio
   - Separación clara de responsabilidades

3. **Error Handling Centralizado**:
   - Middleware de manejo de errores
   - Respuestas consistentes
   - Códigos HTTP apropiados

---

## 📁 Estructura del Proyecto

```
semana4-tasks-api/
├── src/
│   ├── controllers/
│   │   └── taskController.js      # Manejo HTTP y respuestas
│   ├── services/
│   │   └── taskService.js         # Lógica de negocio
│   ├── middleware/
│   │   ├── validation.js          # Middleware de validación
│   │   └── errorHandler.js        # Manejo centralizado errores
│   ├── schemas/
│   │   └── taskSchema.js          # Esquemas Joi
│   ├── routes/
│   │   └── taskRoutes.js          # Definición de rutas
│   └── app.js                     # Configuración Express
├── package.json
├── .gitignore
└── README.md
```

---

## 💾 Modelo de Datos

### 📝 **Task (Tarea)**

```javascript
{
  id: number,           // Auto-generado
  title: string,        // 3-100 caracteres, obligatorio
  description: string,  // 0-500 caracteres, opcional
  priority: string,     // 'low' | 'medium' | 'high', default: 'medium'
  dueDate: date,        // Fecha futura, opcional
  completed: boolean,   // Default: false
  createdAt: date,      // Auto-generado
  updatedAt: date       // Auto-actualizado
}
```

### ✅ **Esquema de Validación Joi**

```javascript
const taskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'El título debe tener al menos 3 caracteres',
      'string.max': 'El título no puede exceder 100 caracteres',
      'any.required': 'El título es obligatorio'
    }),
  
  description: Joi.string()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'La descripción no puede exceder 500 caracteres'
    }),
  
  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .default('medium')
    .messages({
      'any.only': 'La prioridad debe ser: low, medium o high'
    }),
  
  dueDate: Joi.date()
    .min('now')
    .optional()
    .messages({
      'date.min': 'La fecha límite debe ser futura'
    }),
  
  completed: Joi.boolean()
    .default(false)
});
```

---

## 🎯 Implementación Paso a Paso

### **Paso 1: Setup Inicial (20 min)**

```bash
# Crear proyecto
mkdir semana4-tasks-api
cd semana4-tasks-api

# Inicializar con pnpm
pnpm init

# Instalar dependencias
pnpm add express joi
pnpm add -D nodemon

# Crear estructura de carpetas
mkdir -p src/{controllers,services,middleware,schemas,routes}
```

### **Paso 2: Configuración Base (20 min)**

```javascript
// package.json - Scripts
{
  "type": "module",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
}

// src/app.js - Configuración Express
import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### **Paso 3: Schemas de Validación (25 min)**

```javascript
// src/schemas/taskSchema.js
import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional().allow(''),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  dueDate: Joi.date().min('now').optional(),
  completed: Joi.boolean().default(false)
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional().allow(''),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  dueDate: Joi.date().min('now').optional(),
  completed: Joi.boolean().optional()
});

export const taskIdSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});
```

### **Paso 4: Middleware de Validación (25 min)**

```javascript
// src/middleware/validation.js
export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    req.body = value;
    next();
  };
};

export const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid parameters',
        errors: error.details.map(detail => detail.message)
      });
    }

    req.params = value;
    next();
  };
};
```

### **Paso 5: Services (30 min)**

```javascript
// src/services/taskService.js
class TaskService {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id) {
    const task = this.tasks.find(task => task.id === parseInt(id));
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }
    return task;
  }

  createTask(taskData) {
    const newTask = {
      id: this.nextId++,
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id, updates) {
    const taskIndex = this.tasks.findIndex(task => task.id === parseInt(id));
    
    if (taskIndex === -1) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date()
    };

    return this.tasks[taskIndex];
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex(task => task.id === parseInt(id));
    
    if (taskIndex === -1) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    const deletedTask = this.tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }
}

export default new TaskService();
```

### **Paso 6: Controllers (35 min)**

```javascript
// src/controllers/taskController.js
import taskService from '../services/taskService.js';

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = taskService.getAllTasks();
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = taskService.getTaskById(req.params.id);
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const newTask = taskService.createTask(req.body);
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = taskService.updateTask(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    taskService.deleteTask(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
```

### **Paso 7: Error Handling (20 min)**

```javascript
// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Joi validation errors (ya manejados en middleware)
  if (err.isJoi) {
    error.message = 'Validation Error';
    error.statusCode = 400;
  }

  // Custom errors from services
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: error.message
    });
  }

  // Default server error
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
};

export default errorHandler;
```

### **Paso 8: Routes (15 min)**

```javascript
// src/routes/taskRoutes.js
import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { createTaskSchema, updateTaskSchema, taskIdSchema } from '../schemas/taskSchema.js';

const router = Router();

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', validateParams(taskIdSchema), taskController.getTaskById);
router.post('/tasks', validateBody(createTaskSchema), taskController.createTask);
router.put('/tasks/:id', validateParams(taskIdSchema), validateBody(updateTaskSchema), taskController.updateTask);
router.delete('/tasks/:id', validateParams(taskIdSchema), taskController.deleteTask);

export default router;
```

---

## 🧪 Testing Manual

### 📝 **Casos de Prueba**

#### **1. Crear Tarea (POST /api/tasks)**
```bash
# Caso válido
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Completar proyecto semana 4",
    "description": "Implementar validación con Joi",
    "priority": "high",
    "dueDate": "2025-08-25"
  }'

# Caso inválido - título muy corto
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hi",
    "priority": "invalid"
  }'
```

#### **2. Listar Tareas (GET /api/tasks)**
```bash
curl http://localhost:3000/api/tasks
```

#### **3. Obtener Tarea (GET /api/tasks/:id)**
```bash
# Caso válido
curl http://localhost:3000/api/tasks/1

# Caso inválido - ID inexistente
curl http://localhost:3000/api/tasks/999
```

#### **4. Actualizar Tarea (PUT /api/tasks/:id)**
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true,
    "priority": "low"
  }'
```

#### **5. Eliminar Tarea (DELETE /api/tasks/:id)**
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

---

## 📊 Criterios de Evaluación

| Aspecto | Peso | Descripción |
|---------|------|-------------|
| **Funcionalidad** | 30% | Todos los endpoints funcionando |
| **Validación Joi** | 25% | Schemas completos y middleware |
| **Estructura** | 20% | Controllers/Services separados |
| **Error Handling** | 15% | Manejo centralizado de errores |
| **Documentación** | 10% | README y comentarios |

### 🎁 **Bonus Points (+15 max)**
- Middleware adicional (+5)
- Logging básico (+3)
- Tests Jest (+5)
- Swagger docs (+10)

---

## 🚀 Entrega

### ✅ **Requisitos de Entrega**

1. **Repositorio GitHub**: `semana4-validacion-[apellido]`
2. **Código funcional** con estructura completa
3. **README.md** con instrucciones claras
4. **Demo en vivo** (5 min máximo)

### 📅 **Fecha Límite**
**Al final de la clase de 6 horas** - Sin extensiones

---

## 💡 Tips para el Éxito

1. **Empezar por la estructura**: Crear carpetas y archivos base primero
2. **Implementar por capas**: Schemas → Middleware → Services → Controllers
3. **Probar constantemente**: Verificar cada endpoint después de implementarlo
4. **Documentar decisiones**: Comentar por qué elegiste ciertas implementaciones
5. **Manejar errores**: No olvidar casos edge como IDs inexistentes

---

*Proyecto Semana 4 - Bootcamp Express.js - Validación y Estructura Profesional*

# 📋 Especificación Técnica - API Gestión de Tareas

## 🎯 Objetivo
Desarrollar una API REST con validación Joi, estructura Controllers/Services y error handling centralizado.

---

## 🛠️ Stack Técnico
- **Node.js 18+** + **Express.js 4.18+**
- **Joi 17+** para validación
- **pnpm** como package manager
- **ES Modules** (`"type": "module"`)

---

## 📊 Endpoints Requeridos

| Método | Endpoint | Validación | Respuesta |
|--------|----------|------------|-----------|
| `POST` | `/api/tasks` | Body con Joi | 201 + tarea creada |
| `GET` | `/api/tasks` | - | 200 + array tareas |
| `GET` | `/api/tasks/:id` | Params ID | 200 + tarea \| 404 |
| `PUT` | `/api/tasks/:id` | Params + Body | 200 + tarea actualizada |
| `DELETE` | `/api/tasks/:id` | Params ID | 200 + confirmación |

---

## 💾 Modelo de Datos

```javascript
// Task Object
{
  id: number,           // Auto-generado
  title: string,        // 3-100 chars, requerido
  description: string,  // 0-500 chars, opcional
  priority: enum,       // 'low'|'medium'|'high', default: 'medium'
  dueDate: date,        // Fecha futura, opcional
  completed: boolean,   // Default: false
  createdAt: date,      // Auto-generado
  updatedAt: date       // Auto-actualizado
}
```

---

## 🔧 Estructura Obligatoria

```
src/
├── controllers/taskController.js  # HTTP handling only
├── services/taskService.js       # Business logic
├── middleware/
│   ├── validation.js             # Joi middleware
│   └── errorHandler.js           # Centralized errors
├── schemas/taskSchema.js         # Joi schemas
├── routes/taskRoutes.js          # Route definitions
└── app.js                        # Express setup
```

---

## ✅ Validación Joi Requerida

### **Create Task Schema**
```javascript
{
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional().allow(''),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  dueDate: Joi.date().min('now').optional(),
  completed: Joi.boolean().default(false)
}
```

### **Update Task Schema**
```javascript
{
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional().allow(''),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  dueDate: Joi.date().min('now').optional(),
  completed: Joi.boolean().optional()
}
```

### **ID Params Schema**
```javascript
{
  id: Joi.number().integer().positive().required()
}
```

---

## 🚨 Error Handling

### **Respuestas de Error Estándar**
```javascript
// 400 - Validation Error
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "title",
      "message": "El título debe tener al menos 3 caracteres"
    }
  ]
}

// 404 - Not Found
{
  "success": false,
  "message": "Task not found"
}

// 500 - Server Error
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 📝 Respuestas Exitosas

### **POST /api/tasks** (201)
```javascript
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Nueva tarea",
    "description": "Descripción",
    "priority": "medium",
    "completed": false,
    "createdAt": "2025-08-23T10:00:00Z",
    "updatedAt": "2025-08-23T10:00:00Z"
  }
}
```

### **GET /api/tasks** (200)
```javascript
{
  "success": true,
  "count": 2,
  "data": [
    { /* task 1 */ },
    { /* task 2 */ }
  ]
}
```

### **GET /api/tasks/:id** (200)
```javascript
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Tarea específica",
    // ... otros campos
  }
}
```

---

## 🎯 Criterios de Evaluación

- **Funcionalidad** (30%): Todos los endpoints funcionando
- **Validación Joi** (25%): Schemas implementados correctamente
- **Estructura** (20%): Separación Controllers/Services
- **Error Handling** (15%): Manejo centralizado de errores
- **Documentación** (10%): README completo

---

## ⚡ Implementación Mínima Viable

### **Tiempo aproximado por componente:**
- Setup inicial + estructura: **30 min**
- Schemas Joi + middleware: **45 min**
- Service con lógica: **60 min**
- Controllers HTTP: **45 min**
- Routes + error handling: **30 min**
- Testing manual: **30 min**

**Total: 4.5 horas (queda 1 hora de buffer)**

---

## 🚀 Entrega

1. **Repo GitHub**: `semana4-validacion-[apellido]`
2. **README** con instrucciones de instalación
3. **Demo funcional** en clase
4. **Fecha límite**: Final de la clase (6 horas)

---

*Especificación Técnica - Semana 4 - Bootcamp Express.js*

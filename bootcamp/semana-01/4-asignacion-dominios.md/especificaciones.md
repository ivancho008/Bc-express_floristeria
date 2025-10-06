# Proyecto de la Semana 1: Sistema de Gestión de Tareas

## 🎯 Descripción del Proyecto

Desarrollar una API completa para gestión de tareas personales, aplicando todos los conceptos aprendidos en la Semana 1.

## 🏗️ Funcionalidades Requeridas

### Core Features

1. **Gestión de Usuarios**

   - Registro de usuarios
   - Perfil de usuario
   - Preferencias personales

2. **Gestión de Tareas**

   - Crear, leer, actualizar, eliminar tareas
   - Categorización de tareas
   - Prioridades y estados
   - Fechas de vencimiento

3. **Organización**
   - Etiquetas (tags)
   - Categorías
   - Filtros y búsqueda
   - Ordenamiento

### Features Adicionales

4. **Estadísticas Básicas**

   - Conteo de tareas por estado
   - Tareas vencidas
   - Productividad semanal

5. **API Features**
   - Documentación automática
   - Validación robusta
   - Manejo de errores
   - Responses consistentes

## 📋 Especificaciones Técnicas

### Modelos de Datos

#### User

```javascript
{
    id: number,
    username: string,
    email: string,
    fullName: string,
    createdAt: Date,
    preferences: {
        theme: string,
        language: string,
        timezone: string
    }
}
```

#### Task

```javascript
{
    id: number,
    title: string,
    description: string,
    priority: "low" | "medium" | "high" | "urgent",
    status: "pending" | "in_progress" | "completed" | "cancelled",
    categoryId: number,
    userId: number,
    dueDate: Date,
    createdAt: Date,
    updatedAt: Date,
    tags: string[]
}
```

#### Category

```javascript
{
    id: number,
    name: string,
    description: string,
    color: string,
    userId: number
}
```

### Endpoints Requeridos

#### Users

- `POST /users` - Registrar usuario
- `GET /users/me` - Obtener perfil actual
- `PUT /users/me` - Actualizar perfil
- `DELETE /users/me` - Eliminar cuenta

#### Tasks

- `POST /tasks` - Crear tarea
- `GET /tasks` - Listar tareas (con filtros)
- `GET /tasks/{task_id}` - Obtener tarea específica
- `PUT /tasks/{task_id}` - Actualizar tarea
- `DELETE /tasks/{task_id}` - Eliminar tarea
- `PATCH /tasks/{task_id}/status` - Cambiar estado

#### Categories

- `POST /categories` - Crear categoría
- `GET /categories` - Listar categorías
- `PUT /categories/{category_id}` - Actualizar categoría
- `DELETE /categories/{category_id}` - Eliminar categoría

#### Statistics

- `GET /stats/summary` - Resumen general
- `GET /stats/productivity` - Estadísticas de productividad

### Parámetros de Filtrado

Para `GET /tasks`:

- `status`: Filtrar por estado
- `priority`: Filtrar por prioridad
- `category_id`: Filtrar por categoría
- `due_date_from` / `due_date_to`: Rango de fechas
- `search`: Búsqueda en título/descripción
- `tags`: Filtrar por etiquetas
- `page` / `page_size`: Paginación
- `sort_by` / `sort_order`: Ordenamiento

## 🎨 Estructura del Proyecto

```
semana-01-proyecto/
├── src/
│   ├── app.js                  # Aplicación principal Express
│   ├── server.js               # Punto de entrada
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── users.js
│   │   ├── tasks.js
│   │   ├── categories.js
│   │   └── stats.js
│   ├── services/
│   │   ├── index.js
│   │   └── taskService.js
│   ├── middleware/
│   │   ├── index.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── config/
│   │   ├── index.js
│   │   └── database.js
│   └── data/
│       ├── index.js
│       └── mockData.js
├── tests/
│   ├── users.test.js
│   ├── tasks.test.js
│   └── categories.test.js
├── docs/
│   ├── api-examples.md
│   └── postman-collection.json
├── package.json
├── pnpm-lock.yaml
├── README.md
├── .env.example
└── .gitignore
```

## 🚀 Implementación por Fases

### Fase 1: Setup Básico (Día 1-2)

- Configuración del proyecto Express.js
- Modelos de datos con validación
- Endpoints de usuarios
- Middleware básico
- Estructura de carpetas

### Fase 2: Core Features (Día 3-4)

- CRUD completo de tareas
- Sistema de categorías
- Validaciones con middleware personalizado
- Manejo de errores centralizado

### Fase 3: Features Avanzadas (Día 5)

- Filtros y búsqueda avanzada
- Estadísticas con agregaciones
- Tests básicos con Jest
- Documentación de API

### Fase 4: Polish (Día 6-7)

- Refinamiento de código
- Optimizaciones de rendimiento
- Documentación completa
- Preparación para entrega

## 📝 Criterios de Evaluación

### Funcionalidad (40%)

- ✅ Todos los endpoints funcionando
- ✅ Validaciones implementadas
- ✅ Filtros y búsqueda operativos
- ✅ Manejo correcto de errores

### Código (25%)

- ✅ Estructura clara del proyecto Express.js
- ✅ Modelos bien definidos con validación
- ✅ Separación de responsabilidades (MVC)
- ✅ Código limpio y legible con ES Modules

### API Design (20%)

- ✅ Endpoints RESTful apropiados
- ✅ Responses JSON consistentes
- ✅ Status codes HTTP correctos
- ✅ Middleware bien implementado

### Documentación (15%)

- ✅ README completo
- ✅ Ejemplos de uso
- ✅ Instrucciones de instalación
- ✅ Documentación de endpoints

## 🧪 Testing Manual

### Escenarios de Prueba

1. **Flujo básico de usuario**:

   - Registrar usuario
   - Crear categorías
   - Crear tareas
   - Filtrar y buscar
   - Actualizar estados
   - Ver estadísticas

2. **Validaciones**:

   - Datos inválidos
   - Campos requeridos
   - Formatos incorrectos
   - Rangos de valores

3. **Edge cases**:
   - Listas vacías
   - Recursos no encontrados
   - Duplicados
   - Límites de paginación

## 📦 Entregables

1. **Código fuente completo** (repositorio GitHub)
2. **README con instrucciones** de instalación y uso
3. **Collection de Postman** (opcional pero recomendado)
4. **Screenshots de endpoints funcionando**
5. **Video demo** (3-5 minutos mostrando la API)

## 🎁 Bonus Features

- **Operaciones en lote** (+5 puntos)
- **Export/Import** de tareas en JSON (+5 puntos)
- **Variables de entorno** con dotenv (+3 puntos)
- **Middleware de logging** personalizado (+3 puntos)
- **Tests automatizados** con Jest (+10 puntos)
- **Configuración con Docker** (+5 puntos)

## 📅 Cronograma Sugerido

| Día | Actividades           | Entregables        |
| --- | --------------------- | ------------------ |
| 1   | Setup + Modelos       | Estructura básica  |
| 2   | Usuarios + Categorías | CRUD básico        |
| 3   | Tareas principales    | Core functionality |
| 4   | Filtros + Búsqueda    | Features avanzadas |
| 5   | Estadísticas + Polish | API completa       |
| 6   | Testing + Docs        | Documentación      |
| 7   | Entrega final         | Proyecto completo  |

## 🤝 Colaboración

- **Revisión por pares**: Intercambio de feedback
- **Daily standups**: 15min de check-in diario
- **Code reviews**: Comentarios constructivos
- **Discord channels**: #proyecto-semana1

## 📚 Recursos de Apoyo

- Todos los tutoriales de práctica de Express.js
- Documentación oficial de Express.js y Node.js
- Ejemplos en el repositorio del bootcamp
- Office hours con instructores
- Guías de middleware y validación
- Patrones de diseño para APIs REST

¡Mucho éxito en tu proyecto Express.js! 🚀✨

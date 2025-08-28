# 🗄️ PROYECTO SEMANA 5: Blog API con Base de Datos

## 📋 Descripción

API REST para un sistema de blog básico utilizando Express.js + Prisma + SQLite. Implementa operaciones CRUD completas para usuarios y posts con relaciones entre modelos.

## 🎯 Objetivos de Aprendizaje

Al completar este proyecto, serás capaz de:

- ✅ **Configurar Prisma ORM** con SQLite en una aplicación Express.js
- ✅ **Diseñar modelos relacionales** simples pero efectivos
- ✅ **Implementar CRUD completo** para múltiples entidades
- ✅ **Manejar relaciones entre modelos** de forma eficiente
- ✅ **Gestionar errores de base de datos** adecuadamente

## 🛠️ Stack Tecnológico

```json
{
  "runtime": "Node.js 22 LTS",
  "framework": "Express.js 4.18+",
  "database": "SQLite 3.x",
  "orm": "Prisma 5.x",
  "packageManager": "pnpm",
  "testing": "Manual (Postman/curl)"
}
```

## 📁 Estructura del Proyecto

```
semana5-blog-api/
├── package.json
├── .env
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── dev.db (generado automáticamente)
├── src/
│   ├── app.js                 # Aplicación principal
│   ├── routes/
│   │   ├── users.js          # Rutas de usuarios
│   │   └── posts.js          # Rutas de posts
│   ├── middleware/
│   │   └── errorHandler.js   # Manejo de errores
│   └── controllers/
│       ├── userController.js # Lógica de usuarios
│       └── postController.js # Lógica de posts
└── README.md
```

## 🎯 Funcionalidades Mínimas (MVP)

### 👥 **Gestión de Usuarios**

- **GET /api/users** - Listar todos los usuarios
- **POST /api/users** - Crear nuevo usuario
- **GET /api/users/:id** - Obtener usuario por ID
- **PUT /api/users/:id** - Actualizar usuario
- **DELETE /api/users/:id** - Eliminar usuario

### 📝 **Gestión de Posts**

- **GET /api/posts** - Listar todos los posts
- **POST /api/posts** - Crear nuevo post
- **GET /api/posts/:id** - Obtener post por ID
- **PUT /api/posts/:id** - Actualizar post
- **DELETE /api/posts/:id** - Eliminar post
- **GET /api/users/:id/posts** - Obtener posts de un usuario

## 📊 Modelos de Datos

### 👤 **Usuario (User)**

```javascript
{
  id: number,           // Auto-incremento, PK
  email: string,        // Único, requerido
  name: string,         // Requerido
  createdAt: datetime,  // Auto-generado
  updatedAt: datetime,  // Auto-actualizado
  posts: Post[]         // Relación 1:N
}
```

### 📄 **Post**

```javascript
{
  id: number,           // Auto-incremento, PK
  title: string,        // Requerido
  content: string,      // Requerido
  published: boolean,   // Default false
  authorId: number,     // FK a User
  createdAt: datetime,  // Auto-generado
  updatedAt: datetime,  // Auto-actualizado
  author: User          // Relación N:1
}
```

## 🚀 Setup Rápido

### 1. **Inicialización del Proyecto**

```bash
# Crear proyecto
mkdir semana5-blog-api
cd semana5-blog-api

# Inicializar pnpm
pnpm init

# Instalar dependencias
pnpm add express prisma @prisma/client
pnpm add -D nodemon

# Inicializar Prisma
npx prisma init --datasource-provider sqlite
```

### 2. **Configuración Prisma**

```javascript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  published Boolean  @default(false)
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  author    User     @relation(fields: [authorId], references: [id])
}
```

### 3. **Variables de Entorno**

```bash
# .env
DATABASE_URL="file:./dev.db"
PORT=3000
```

### 4. **Scripts package.json**

```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "db:migrate": "npx prisma migrate dev",
    "db:generate": "npx prisma generate",
    "db:studio": "npx prisma studio"
  }
}
```

## 📋 Cronograma Sugerido (6 horas)

| Tiempo           | Actividad                    | Duración |
| ---------------- | ---------------------------- | -------- |
| **Hora 1**       | Setup Prisma + SQLite        | 60 min   |
| _Break_          | ☕ Descanso                  | 15 min   |
| **Hora 2-2.5**   | Modelos y Migraciones        | 75 min   |
| **Hora 2.5-3.5** | CRUD Users (Create & Read)   | 60 min   |
| _Break_          | ☕ Descanso                  | 15 min   |
| **Hora 3.5-4.5** | CRUD Users (Update & Delete) | 60 min   |
| **Hora 4.5-6**   | CRUD Posts + Testing         | 75 min   |

## ✅ Criterios de Aceptación

### **Funcionales:**

- [ ] **Prisma configurado** y conectado a SQLite
- [ ] **Modelos User y Post** correctamente definidos
- [ ] **Todos los endpoints CRUD** funcionando
- [ ] **Relación User-Posts** implementada
- [ ] **Validación básica** de datos
- [ ] **Error handling** para casos comunes

### **Técnicos:**

- [ ] **Código limpio** y bien estructurado
- [ ] **Respuestas JSON** consistentes
- [ ] **Códigos HTTP** apropiados
- [ ] **Base de datos persistente** (archivo SQLite)

### **Documentación:**

- [ ] **README** con instrucciones de setup
- [ ] **Ejemplos de uso** de la API
- [ ] **Estructura del proyecto** documentada

## 🧪 Testing Manual

### **Ejemplos de Requests**

```bash
# Crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Pérez", "email": "juan@example.com"}'

# Crear post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Mi primer post", "content": "Contenido del post", "authorId": 1}'

# Listar usuarios
curl http://localhost:3000/api/users

# Obtener posts de un usuario
curl http://localhost:3000/api/users/1/posts
```

## 🎯 Entregables

### **Código:**

- [ ] Repositorio GitHub: `ficha-apellido-nombre-semana5-db`
- [ ] Código fuente completo y funcional
- [ ] Base de datos SQLite con datos de prueba
- [ ] Scripts de package.json configurados

### **Documentación:**

- [ ] README con instrucciones completas
- [ ] Ejemplos de uso de todos los endpoints
- [ ] Explicación de la estructura del proyecto

### **Demo:**

- [ ] API funcionando en vivo
- [ ] Demostración de operaciones CRUD
- [ ] Datos persistentes en base de datos

## 🚀 Bonus (Si hay tiempo extra)

- [ ] **Filtros de búsqueda** en listados
- [ ] **Paginación básica** en endpoints
- [ ] **Validación avanzada** con bibliotecas
- [ ] **Seeding de datos** inicial
- [ ] **Soft deletes** en lugar de eliminación física

## 📚 Recursos de Apoyo

- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [SQLite Tutorial](https://www.sqlitetutorial.net/)
- [HTTP Status Codes](https://httpstatuses.com/)

---

**🎯 Objetivo:** Al final de esta semana tendrás una API REST completa con base de datos que sirve como base sólida para proyectos más complejos.

_Semana 5 - Express.js Bootcamp | Base de Datos Básica_

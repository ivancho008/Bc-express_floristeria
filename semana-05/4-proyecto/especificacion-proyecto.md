# 📝 ESPECIFICACIÓN TÉCNICA - Blog API Semana 5

## 🎯 Descripción General

Desarrollar una API REST para un sistema de blog básico que permita gestionar usuarios y posts utilizando Express.js como framework backend, Prisma como ORM y SQLite como base de datos.

## 📋 Requisitos Funcionales

### RF-01: Gestión de Usuarios

- **RF-01.1**: El sistema debe permitir crear nuevos usuarios
- **RF-01.2**: El sistema debe permitir listar todos los usuarios
- **RF-01.3**: El sistema debe permitir obtener un usuario por ID
- **RF-01.4**: El sistema debe permitir actualizar datos de un usuario
- **RF-01.5**: El sistema debe permitir eliminar un usuario

### RF-02: Gestión de Posts

- **RF-02.1**: El sistema debe permitir crear nuevos posts
- **RF-02.2**: El sistema debe permitir listar todos los posts
- **RF-02.3**: El sistema debe permitir obtener un post por ID
- **RF-02.4**: El sistema debe permitir actualizar un post
- **RF-02.5**: El sistema debe permitir eliminar un post
- **RF-02.6**: El sistema debe permitir obtener posts de un usuario específico

### RF-03: Relaciones y Validaciones

- **RF-03.1**: Cada post debe estar asociado a un usuario (autor)
- **RF-03.2**: Un usuario puede tener múltiples posts
- **RF-03.3**: Los emails de usuarios deben ser únicos
- **RF-03.4**: Los campos obligatorios deben ser validados

## 📊 Especificación de la API

### 🔗 Base URL

```
http://localhost:3000/api
```

### 👥 Endpoints de Usuarios

#### GET /users

**Descripción**: Obtener lista de todos los usuarios

```json
// Response 200
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "createdAt": "2025-08-27T10:30:00.000Z",
      "updatedAt": "2025-08-27T10:30:00.000Z"
    }
  ]
}
```

#### POST /users

**Descripción**: Crear nuevo usuario

```json
// Request Body
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}

// Response 201
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "createdAt": "2025-08-27T10:30:00.000Z",
    "updatedAt": "2025-08-27T10:30:00.000Z"
  }
}
```

#### GET /users/:id

**Descripción**: Obtener usuario por ID

```json
// Response 200
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "createdAt": "2025-08-27T10:30:00.000Z",
    "updatedAt": "2025-08-27T10:30:00.000Z",
    "posts": [
      {
        "id": 1,
        "title": "Mi primer post",
        "published": true
      }
    ]
  }
}
```

#### PUT /users/:id

**Descripción**: Actualizar usuario

```json
// Request Body
{
  "name": "Juan Carlos Pérez",
  "email": "juancarlos@example.com"
}

// Response 200
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Juan Carlos Pérez",
    "email": "juancarlos@example.com",
    "createdAt": "2025-08-27T10:30:00.000Z",
    "updatedAt": "2025-08-27T12:45:00.000Z"
  }
}
```

#### DELETE /users/:id

**Descripción**: Eliminar usuario

```json
// Response 200
{
  "success": true,
  "message": "Usuario eliminado correctamente"
}
```

### 📝 Endpoints de Posts

#### GET /posts

**Descripción**: Obtener lista de todos los posts

```json
// Response 200
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Mi primer post",
      "content": "Este es el contenido del post...",
      "published": true,
      "authorId": 1,
      "createdAt": "2025-08-27T11:00:00.000Z",
      "updatedAt": "2025-08-27T11:00:00.000Z",
      "author": {
        "id": 1,
        "name": "Juan Pérez",
        "email": "juan@example.com"
      }
    }
  ]
}
```

#### POST /posts

**Descripción**: Crear nuevo post

```json
// Request Body
{
  "title": "Mi primer post",
  "content": "Este es el contenido de mi primer post",
  "published": true,
  "authorId": 1
}

// Response 201
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Mi primer post",
    "content": "Este es el contenido de mi primer post",
    "published": true,
    "authorId": 1,
    "createdAt": "2025-08-27T11:00:00.000Z",
    "updatedAt": "2025-08-27T11:00:00.000Z"
  }
}
```

#### GET /posts/:id

**Descripción**: Obtener post por ID

```json
// Response 200
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Mi primer post",
    "content": "Este es el contenido del post...",
    "published": true,
    "authorId": 1,
    "createdAt": "2025-08-27T11:00:00.000Z",
    "updatedAt": "2025-08-27T11:00:00.000Z",
    "author": {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    }
  }
}
```

#### PUT /posts/:id

**Descripción**: Actualizar post

```json
// Request Body
{
  "title": "Mi post actualizado",
  "content": "Contenido actualizado",
  "published": true
}

// Response 200
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Mi post actualizado",
    "content": "Contenido actualizado",
    "published": true,
    "authorId": 1,
    "createdAt": "2025-08-27T11:00:00.000Z",
    "updatedAt": "2025-08-27T13:30:00.000Z"
  }
}
```

#### DELETE /posts/:id

**Descripción**: Eliminar post

```json
// Response 200
{
  "success": true,
  "message": "Post eliminado correctamente"
}
```

#### GET /users/:id/posts

**Descripción**: Obtener posts de un usuario específico

```json
// Response 200
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Mi primer post",
      "content": "Contenido del post...",
      "published": true,
      "createdAt": "2025-08-27T11:00:00.000Z",
      "updatedAt": "2025-08-27T11:00:00.000Z"
    }
  ]
}
```

## ⚠️ Manejo de Errores

### Códigos de Estado HTTP

- **200**: OK - Operación exitosa
- **201**: Created - Recurso creado correctamente
- **400**: Bad Request - Datos inválidos
- **404**: Not Found - Recurso no encontrado
- **500**: Internal Server Error - Error del servidor

### Formato de Errores

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El email ya está en uso",
    "details": {
      "field": "email",
      "value": "juan@example.com"
    }
  }
}
```

### Casos de Error Comunes

- **Email duplicado**: Al crear usuario con email existente
- **Usuario no encontrado**: Al buscar ID inexistente
- **Post sin autor**: Al crear post con authorId inválido
- **Campos requeridos**: Al omitir campos obligatorios

## 🗄️ Esquema de Base de Datos

### Tabla: users

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: posts

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT 0,
  authorId INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (authorId) REFERENCES users(id)
);
```

## ✅ Validaciones Requeridas

### Usuario (User)

- **name**: Requerido, mínimo 2 caracteres
- **email**: Requerido, formato email válido, único

### Post

- **title**: Requerido, mínimo 3 caracteres
- **content**: Requerido, mínimo 10 caracteres
- **authorId**: Requerido, debe existir en tabla users
- **published**: Opcional, boolean (default: false)

## 🎯 Criterios de Aceptación Técnicos

### Configuración

- [ ] Prisma instalado y configurado con SQLite
- [ ] Variables de entorno configuradas
- [ ] Scripts npm/pnpm configurados

### Funcionalidad

- [ ] Todos los endpoints responden correctamente
- [ ] Validaciones funcionando
- [ ] Relaciones entre modelos implementadas
- [ ] Error handling apropiado

### Código

- [ ] Estructura de carpetas organizada
- [ ] Separación de responsabilidades (routes, controllers)
- [ ] Código limpio y comentado
- [ ] Convenciones de naming consistentes

### Base de Datos

- [ ] Modelos Prisma correctamente definidos
- [ ] Migraciones aplicadas
- [ ] Datos de prueba insertados
- [ ] Archivo SQLite persistente

---

**Tiempo estimado**: 6 horas  
**Nivel de dificultad**: Intermedio  
**Prerrequisitos**: Express.js básico, conceptos de APIs REST

_Especificación Técnica - Semana 5_

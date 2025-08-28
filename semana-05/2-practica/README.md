# 🛠️ PRÁCTICA SEMANA 5: Implementación de Blog API

## 🎯 Objetivo

Implementar paso a paso una API REST con base de datos usando Express.js + Prisma + SQLite, aplicando los conceptos teóricos en un proyecto real.

---

## 📋 Actividades Prácticas

### ⏰ BLOQUE 1 (60 min): Setup y Configuración

#### 🔧 Actividad 1.1: Inicialización del Proyecto (15 min)

```bash
# Crear directorio del proyecto
mkdir blog-api-semana5
cd blog-api-semana5

# Inicializar proyecto Node.js
npm init -y

# Instalar dependencias principales
npm install express prisma @prisma/client cors

# Instalar dependencias de desarrollo
npm install -D nodemon

# Inicializar Prisma con SQLite
npx prisma init --datasource-provider sqlite
```

**📝 Verificación:**
- [ ] `package.json` creado
- [ ] Dependencias instaladas
- [ ] Prisma inicializado

#### 🗄️ Actividad 1.2: Configuración de Base de Datos (15 min)

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

```bash
# .env
DATABASE_URL="file:./dev.db"
PORT=3000
```

**📝 Verificación:**
- [ ] Schema definido correctamente
- [ ] Variables de entorno configuradas

#### ⚙️ Actividad 1.3: Primera Migración (15 min)

```bash
# Generar cliente Prisma
npx prisma generate

# Crear y aplicar migración inicial
npx prisma migrate dev --name init

# Verificar con Prisma Studio
npx prisma studio
```

**📝 Verificación:**
- [ ] Archivo `dev.db` creado
- [ ] Migración aplicada
- [ ] Prisma Studio funcionando

#### 🚀 Actividad 1.4: Servidor Básico (15 min)

```javascript
// src/app.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Blog API - Semana 5',
    status: 'OK'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

```bash
# Probar servidor
npm run dev
```

**📝 Verificación:**
- [ ] Servidor inicia sin errores
- [ ] Ruta raíz responde correctamente

---

### ⏰ BLOQUE 2 (75 min): CRUD de Usuarios

#### 👥 Actividad 2.1: Rutas de Usuarios (15 min)

```javascript
// src/routes/users.js
const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/', (req, res) => {
  res.json({ message: 'Listar usuarios' });
});

// POST /api/users
router.post('/', (req, res) => {
  res.json({ message: 'Crear usuario' });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Usuario ${req.params.id}` });
});

module.exports = router;
```

```javascript
// Agregar a src/app.js
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
```

**📝 Verificación:**
- [ ] Rutas definidas
- [ ] Rutas montadas en app principal

#### 📝 Actividad 2.2: Crear Usuario (20 min)

```javascript
// src/controllers/userController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validaciones básicas
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Nombre y email son requeridos'
      });
    }

    const user = await prisma.user.create({
      data: { name, email }
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'Email ya registrado'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

module.exports = { createUser };
```

**🧪 Testing:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@example.com"}'
```

#### 📖 Actividad 2.3: Listar Usuarios (20 min)

```javascript
// Agregar a userController.js
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: {
          select: { id: true, title: true, published: true }
        }
      }
    });

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuarios'
    });
  }
};
```

**🧪 Testing:**
```bash
curl http://localhost:3000/api/users
```

#### 🔍 Actividad 2.4: Obtener Usuario por ID (20 min)

```javascript
// Agregar a userController.js
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: 'ID inválido'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { posts: true }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuario'
    });
  }
};
```

**🧪 Testing:**
```bash
curl http://localhost:3000/api/users/1
curl http://localhost:3000/api/users/999  # No existe
```

---

### ⏰ BLOQUE 3 (60 min): Actualizar y Eliminar Usuarios

#### ✏️ Actividad 3.1: Actualizar Usuario (30 min)

```javascript
// Agregar a userController.js
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: 'ID inválido'
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'Email ya en uso'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error al actualizar usuario'
    });
  }
};
```

**🧪 Testing:**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Carlos Pérez"}'
```

#### 🗑️ Actividad 3.2: Eliminar Usuario (30 min)

```javascript
// Agregar a userController.js
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: 'ID inválido'
      });
    }

    await prisma.user.delete({
      where: { id: userId }
    });

    res.json({
      success: true,
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error al eliminar usuario'
    });
  }
};
```

**🧪 Testing:**
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

---

### ⏰ BLOQUE 4 (75 min): CRUD de Posts y Testing

#### 📝 Actividad 4.1: Configurar Rutas de Posts (15 min)

```javascript
// src/routes/posts.js
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
```

#### 📄 Actividad 4.2: Implementar CRUD de Posts (45 min)

```javascript
// src/controllers/postController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  try {
    const { title, content, published = false, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({
        success: false,
        error: 'Título, contenido y authorId requeridos'
      });
    }

    // Verificar que el autor existe
    const author = await prisma.user.findUnique({
      where: { id: parseInt(authorId) }
    });

    if (!author) {
      return res.status(400).json({
        success: false,
        error: 'Autor no existe'
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: Boolean(published),
        authorId: parseInt(authorId)
      },
      include: { author: true }
    });

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear post'
    });
  }
};

// Implementar getAllPosts, getPostById, updatePost, deletePost...
```

#### 🧪 Actividad 4.3: Testing Completo (15 min)

**Crear datos de prueba:**
```bash
# Crear usuarios
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana García","email":"ana@example.com"}'

# Crear post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi primer post","content":"Contenido del post","authorId":1,"published":true}'

# Listar posts
curl http://localhost:3000/api/posts

# Obtener posts de un usuario
curl http://localhost:3000/api/users/1/posts
```

---

## ✅ Entregables de la Práctica

### 1. **Código Funcional**
- [ ] API con todos los endpoints CRUD
- [ ] Validaciones implementadas
- [ ] Error handling apropiado
- [ ] Relaciones funcionando

### 2. **Base de Datos**
- [ ] Modelos correctamente definidos
- [ ] Migraciones aplicadas
- [ ] Datos de prueba insertados

### 3. **Testing**
- [ ] Todos los endpoints probados
- [ ] Casos de error verificados
- [ ] Relaciones validadas

### 4. **Documentación**
- [ ] README con instrucciones
- [ ] Ejemplos de uso
- [ ] Estructura explicada

---

## 🚨 Troubleshooting Común

### Error: "Client not generated"
```bash
npx prisma generate
```

### Error: "Database not found"
```bash
npx prisma migrate dev
```

### Error: "Port already in use"
```bash
# Cambiar puerto en .env
PORT=3001
```

### Error de relación
```javascript
// Verificar que authorId existe antes de crear post
const author = await prisma.user.findUnique({
  where: { id: authorId }
});
```

---

## 🎯 Objetivos Alcanzados

Al completar esta práctica habrás:

1. ✅ **Configurado** un proyecto con Prisma + SQLite
2. ✅ **Implementado** CRUD completo para dos entidades
3. ✅ **Manejado** relaciones entre modelos
4. ✅ **Aplicado** validaciones y error handling
5. ✅ **Probado** la API exhaustivamente

**¡Excelente trabajo!** 🎉 Ahora tienes una base sólida para proyectos más complejos.

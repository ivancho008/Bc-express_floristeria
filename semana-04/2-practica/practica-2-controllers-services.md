# 📍 Práctica 2: Estructura Controllers/Services (60 min)

## 🎯 Objetivo

Refactorizar la API de usuarios para implementar una arquitectura profesional con separación de responsabilidades.

## ⏰ Tiempo Asignado: 60 minutos

## 📋 Prerequisito

Haber completado la Práctica 1 (Validación con Joi)

---

## 🚀 Paso 1: Crear Estructura de Carpetas (5 min)

### 1.1 Expandir estructura del proyecto

```bash
# Desde la carpeta practica-joi
mkdir src/controllers src/services src/routes
touch src/controllers/userController.js
touch src/services/userService.js
touch src/routes/userRoutes.js
```

### 1.2 Estructura final esperada

```
practica-joi/
├── src/
│   ├── controllers/
│   │   └── userController.js    # Manejo HTTP
│   ├── services/
│   │   └── userService.js       # Lógica de negocio
│   ├── routes/
│   │   └── userRoutes.js        # Definición de rutas
│   ├── middleware/
│   │   └── validation.js
│   ├── schemas/
│   │   └── userSchema.js
│   └── app.js                   # Configuración principal
├── package.json
└── README.md
```

---

## 🎯 Paso 2: Crear User Service (20 min)

### 2.1 Implementar lógica de negocio

```javascript
// src/services/userService.js
class UserService {
  constructor() {
    // Simulación de base de datos
    this.users = [
      { id: 1, name: 'Juan Pérez', email: 'juan@email.com', age: 25 },
      { id: 2, name: 'María García', email: 'maria@email.com', age: 30 },
    ];
    this.nextId = 3;
  }

  // Obtener todos los usuarios
  async getAllUsers() {
    // Simular operación asíncrona
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.users]), 50);
    });
  }

  // Obtener usuario por ID
  async getUserById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find((user) => user.id === parseInt(id));
        if (!user) {
          reject(new Error('Usuario no encontrado'));
        } else {
          resolve(user);
        }
      }, 50);
    });
  }

  // Crear nuevo usuario
  async createUser(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verificar si el email ya existe
        const existingUser = this.users.find(
          (user) => user.email === userData.email
        );
        if (existingUser) {
          reject(new Error('El email ya está registrado'));
          return;
        }

        // Crear nuevo usuario (sin password por seguridad)
        const { password, ...userToSave } = userData;
        const newUser = {
          id: this.nextId++,
          ...userToSave,
          createdAt: new Date().toISOString(),
        };

        this.users.push(newUser);
        resolve(newUser);
      }, 100);
    });
  }

  // Actualizar usuario
  async updateUser(id, updateData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex(
          (user) => user.id === parseInt(id)
        );

        if (userIndex === -1) {
          reject(new Error('Usuario no encontrado'));
          return;
        }

        // Verificar email único si se está actualizando
        if (updateData.email) {
          const existingUser = this.users.find(
            (user) =>
              user.email === updateData.email && user.id !== parseInt(id)
          );
          if (existingUser) {
            reject(new Error('El email ya está en uso por otro usuario'));
            return;
          }
        }

        // Actualizar usuario
        this.users[userIndex] = {
          ...this.users[userIndex],
          ...updateData,
          updatedAt: new Date().toISOString(),
        };

        resolve(this.users[userIndex]);
      }, 100);
    });
  }

  // Eliminar usuario
  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex(
          (user) => user.id === parseInt(id)
        );

        if (userIndex === -1) {
          reject(new Error('Usuario no encontrado'));
          return;
        }

        const deletedUser = this.users.splice(userIndex, 1)[0];
        resolve(deletedUser);
      }, 50);
    });
  }

  // Buscar usuarios por criterio
  async searchUsers(criteria) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = this.users.filter((user) => {
          if (criteria.name) {
            return user.name
              .toLowerCase()
              .includes(criteria.name.toLowerCase());
          }
          if (criteria.minAge || criteria.maxAge) {
            const ageInRange =
              (!criteria.minAge || user.age >= criteria.minAge) &&
              (!criteria.maxAge || user.age <= criteria.maxAge);
            return ageInRange;
          }
          return true;
        });
        resolve(results);
      }, 75);
    });
  }
}

// Singleton pattern - una sola instancia del servicio
const userServiceInstance = new UserService();

module.exports = userServiceInstance;
```

---

## 🎮 Paso 3: Crear User Controller (20 min)

### 3.1 Implementar controladores HTTP

```javascript
// src/controllers/userController.js
const userService = require('../services/userService');

class UserController {
  // GET /users
  async getUsers(req, res, next) {
    try {
      const { name, minAge, maxAge } = req.query;

      let users;

      // Si hay criterios de búsqueda, usar searchUsers
      if (name || minAge || maxAge) {
        const criteria = {};
        if (name) criteria.name = name;
        if (minAge) criteria.minAge = parseInt(minAge);
        if (maxAge) criteria.maxAge = parseInt(maxAge);

        users = await userService.searchUsers(criteria);
      } else {
        users = await userService.getAllUsers();
      }

      res.json({
        success: true,
        message: `${users.length} usuarios encontrados`,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /users/:id
  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /users
  async createUser(req, res, next) {
    try {
      const newUser = await userService.createUser(req.validatedBody);

      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /users/:id
  async updateUser(req, res, next) {
    try {
      const updatedUser = await userService.updateUser(
        req.params.id,
        req.validatedBody
      );

      res.json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /users/:id
  async deleteUser(req, res, next) {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);

      res.json({
        success: true,
        message: 'Usuario eliminado exitosamente',
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}

// Exportar instancia del controlador
const userControllerInstance = new UserController();

module.exports = userControllerInstance;
```

---

## 🛣️ Paso 4: Crear Rutas (10 min)

### 4.1 Definir rutas de usuarios

```javascript
// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { userSchema, userUpdateSchema } = require('../schemas/userSchema');
const { validateBody } = require('../middleware/validation');

const router = express.Router();

// GET /api/users - Listar usuarios (con búsqueda opcional)
router.get('/', userController.getUsers);

// GET /api/users/:id - Obtener usuario específico
router.get('/:id', userController.getUserById);

// POST /api/users - Crear usuario
router.post('/', validateBody(userSchema), userController.createUser);

// PUT /api/users/:id - Actualizar usuario
router.put('/:id', validateBody(userUpdateSchema), userController.updateUser);

// DELETE /api/users/:id - Eliminar usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;
```

---

## 🔧 Paso 5: Refactorizar app.js (5 min)

### 5.1 Simplificar archivo principal

```javascript
// src/app.js (REFACTORIZADO)
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware global
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: 'API de práctica Controllers/Services funcionando',
    version: '2.0.0',
    endpoints: {
      users: '/api/users',
    },
  });
});

// Montar rutas de usuarios
app.use('/api/users', userRoutes);

// Middleware de errores básico (temporal)
app.use((error, req, res, next) => {
  console.error('Error:', error.message);

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Error interno del servidor',
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📚 Documentación: http://localhost:${PORT}/`);
});

module.exports = app;
```

---

## 🧪 Paso 6: Testing de la Nueva Estructura (5 min)

### 6.1 Probar endpoints restructurados

**Reiniciar servidor:**

```bash
node src/app.js
```

**Casos de prueba:**

1. **Listar usuarios:**

```bash
curl http://localhost:3000/api/users
```

2. **Buscar usuarios por nombre:**

```bash
curl "http://localhost:3000/api/users?name=juan"
```

3. **Buscar usuarios por rango de edad:**

```bash
curl "http://localhost:3000/api/users?minAge=25&maxAge=35"
```

4. **Crear usuario (debería funcionar igual):**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Martínez",
    "email": "ana@email.com",
    "age": 27,
    "password": "SecurePass123"
  }'
```

5. **Obtener usuario específico:**

```bash
curl http://localhost:3000/api/users/1
```

6. **Eliminar usuario:**

```bash
curl -X DELETE http://localhost:3000/api/users/2
```

---

## ✅ Checkpoint (60 min completados)

### 🎯 Has logrado

- ✅ Separar lógica de negocio en Services
- ✅ Crear Controllers que solo manejan HTTP
- ✅ Organizar rutas en módulos separados
- ✅ Implementar arquitectura escalable y mantenible
- ✅ Mantener validación funcionando con nueva estructura
- ✅ Agregar funcionalidades adicionales (búsqueda, eliminación)

### 🏗️ Beneficios de la nueva arquitectura

- **Mantenibilidad**: Código organizado y fácil de modificar
- **Testabilidad**: Services y Controllers se pueden probar por separado
- **Reutilización**: Services pueden ser usados por otros Controllers
- **Escalabilidad**: Fácil agregar nuevas funcionalidades

### 🚀 Preparado para

- **Práctica 3**: Error Handling Centralizado y profesional

---

_Práctica 2 completada - Arquitectura profesional implementada_

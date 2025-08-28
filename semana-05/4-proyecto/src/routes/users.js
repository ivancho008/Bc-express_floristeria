const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// GET /api/users - Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// POST /api/users - Crear nuevo usuario
router.post('/', userController.createUser);

// GET /api/users/:id - Obtener usuario por ID
router.get('/:id', userController.getUserById);

// PUT /api/users/:id - Actualizar usuario
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id - Eliminar usuario
router.delete('/:id', userController.deleteUser);

// GET /api/users/:id/posts - Obtener posts de un usuario
router.get('/:id/posts', userController.getUserPosts);

module.exports = router;

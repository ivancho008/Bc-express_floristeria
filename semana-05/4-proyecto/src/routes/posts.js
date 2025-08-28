const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// GET /api/posts - Obtener todos los posts
router.get('/', postController.getAllPosts);

// POST /api/posts - Crear nuevo post
router.post('/', postController.createPost);

// GET /api/posts/:id - Obtener post por ID
router.get('/:id', postController.getPostById);

// PUT /api/posts/:id - Actualizar post
router.put('/:id', postController.updatePost);

// DELETE /api/posts/:id - Eliminar post
router.delete('/:id', postController.deletePost);

module.exports = router;

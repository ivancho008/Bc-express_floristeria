const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET /api/posts - Obtener todos los posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error al obtener posts',
        details: error.message,
      },
    });
  }
};

// POST /api/posts - Crear nuevo post
const createPost = async (req, res) => {
  try {
    const { title, content, published = false, authorId } = req.body;

    // Validaciones básicas
    if (!title || !content || !authorId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Título, contenido y authorId son requeridos',
        },
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'El título debe tener al menos 3 caracteres',
          details: { field: 'title', value: title },
        },
      });
    }

    if (content.length < 10) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'El contenido debe tener al menos 10 caracteres',
          details: { field: 'content', value: content },
        },
      });
    }

    // Verificar que el autor existe
    const author = await prisma.user.findUnique({
      where: { id: parseInt(authorId) },
    });

    if (!author) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'El autor especificado no existe',
          details: { field: 'authorId', value: authorId },
        },
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: Boolean(published),
        authorId: parseInt(authorId),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error al crear post',
        details: error.message,
      },
    });
  }
};

// GET /api/posts/:id - Obtener post por ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'ID de post inválido',
        },
      });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Post no encontrado',
        },
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error al obtener post',
        details: error.message,
      },
    });
  }
};

// PUT /api/posts/:id - Actualizar post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'ID de post inválido',
        },
      });
    }

    // Validaciones
    if (title && title.length < 3) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'El título debe tener al menos 3 caracteres',
        },
      });
    }

    if (content && content.length < 10) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'El contenido debe tener al menos 10 caracteres',
        },
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (published !== undefined) updateData.published = Boolean(published);

    const post = await prisma.post.update({
      where: { id: postId },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Post no encontrado',
        },
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error al actualizar post',
        details: error.message,
      },
    });
  }
};

// DELETE /api/posts/:id - Eliminar post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'ID de post inválido',
        },
      });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    res.json({
      success: true,
      message: 'Post eliminado correctamente',
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Post no encontrado',
        },
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error al eliminar post',
        details: error.message,
      },
    });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
};

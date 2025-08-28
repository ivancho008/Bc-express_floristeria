const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET /api/users - Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            published: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error al obtener usuarios',
        details: error.message,
      },
    });
  }
};

// POST /api/users - Crear nuevo usuario
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validaciones básicas
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Nombre y email son requeridos',
        },
      });
    }

    if (name.length < 2) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'El nombre debe tener al menos 2 caracteres',
          details: { field: 'name', value: name },
        },
      });
    }

    // Validar formato de email (básico)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'El formato del email no es válido',
          details: { field: 'email', value: email },
        },
      });
    }

    const user = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // Error de email duplicado
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'El email ya está en uso',
          details: { field: 'email', value: req.body.email },
        },
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error al crear usuario',
        details: error.message,
      },
    });
  }
};

// GET /api/users/:id - Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'ID de usuario inválido',
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            published: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Usuario no encontrado',
        },
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error al obtener usuario',
        details: error.message,
      },
    });
  }
};

// PUT /api/users/:id - Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'ID de usuario inválido',
        },
      });
    }

    // Validaciones
    if (name && name.length < 2) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'El nombre debe tener al menos 2 caracteres',
        },
      });
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'El formato del email no es válido',
          },
        });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Usuario no encontrado',
        },
      });
    }

    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'El email ya está en uso',
        },
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error al actualizar usuario',
        details: error.message,
      },
    });
  }
};

// DELETE /api/users/:id - Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'ID de usuario inválido',
        },
      });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({
      success: true,
      message: 'Usuario eliminado correctamente',
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Usuario no encontrado',
        },
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error al eliminar usuario',
        details: error.message,
      },
    });
  }
};

// GET /api/users/:id/posts - Obtener posts de un usuario
const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'ID de usuario inválido',
        },
      });
    }

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Usuario no encontrado',
        },
      });
    }

    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
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
        message: 'Error al obtener posts del usuario',
        details: error.message,
      },
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserPosts,
};

// Middleware para manejo global de errores
const errorHandler = (error, req, res, next) => {
  console.error('Error:', error);

  // Error de Prisma - Registro no encontrado
  if (error.code === 'P2025') {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Recurso no encontrado'
      }
    });
  }

  // Error de Prisma - Violación de constraint único
  if (error.code === 'P2002') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Valor duplicado no permitido',
        details: error.meta
      }
    });
  }

  // Error de validación de JSON
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'Formato JSON inválido'
      }
    });
  }

  // Error interno del servidor
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }
  });
};

module.exports = errorHandler;

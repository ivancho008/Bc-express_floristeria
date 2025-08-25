/**
 * Middleware para manejo centralizado de errores
 */
export const errorHandler = (err, req, res, next) => {
  // Log del error para debugging
  console.error('🚨 Error capturado:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Error de validación de Joi
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Error de validación',
      details: err.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  // Error de sintaxis JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'JSON inválido',
      message: 'El formato del JSON enviado es incorrecto'
    });
  }

  // Error personalizado con código de estado
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.name || 'Error',
      message: err.message
    });
  }

  // Errores específicos del dominio
  switch (err.code) {
    case 'PRODUCT_NOT_FOUND':
      return res.status(404).json({
        error: 'Producto no encontrado',
        message: err.message
      });
    
    case 'INSUFFICIENT_STOCK':
      return res.status(409).json({
        error: 'Stock insuficiente',
        message: err.message,
        availableStock: err.availableStock
      });
    
    case 'DUPLICATE_PRODUCT':
      return res.status(409).json({
        error: 'Producto duplicado',
        message: err.message
      });
    
    default:
      break;
  }

  // Error interno del servidor (500)
  res.status(500).json({
    error: 'Error interno del servidor',
    message: 'Ha ocurrido un error inesperado',
    ...(process.env.NODE_ENV === 'development' && {
      details: err.message,
      stack: err.stack
    })
  });
};

/**
 * Middleware para capturar errores asíncronos
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Clase para errores personalizados de la aplicación
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, code = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Errores específicos del dominio
 */
export class ProductNotFoundError extends AppError {
  constructor(productId) {
    super(`Producto con ID ${productId} no encontrado`, 404, 'PRODUCT_NOT_FOUND');
    this.name = 'ProductNotFoundError';
  }
}

export class InsufficientStockError extends AppError {
  constructor(productId, requested, available) {
    super(
      `Stock insuficiente para el producto ${productId}. Solicitado: ${requested}, Disponible: ${available}`,
      409,
      'INSUFFICIENT_STOCK'
    );
    this.name = 'InsufficientStockError';
    this.availableStock = available;
  }
}

export class DuplicateProductError extends AppError {
  constructor(productName) {
    super(`Ya existe un producto con el nombre: ${productName}`, 409, 'DUPLICATE_PRODUCT');
    this.name = 'DuplicateProductError';
  }
}

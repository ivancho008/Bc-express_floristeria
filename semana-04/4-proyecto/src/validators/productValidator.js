import Joi from 'joi';

/**
 * Esquemas de validación para productos
 */
const schemas = {
  // Esquema para crear un producto
  create: Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre no puede exceder 100 caracteres',
        'any.required': 'El nombre es obligatorio'
      }),
    
    description: Joi.string()
      .min(10)
      .max(500)
      .required()
      .messages({
        'string.min': 'La descripción debe tener al menos 10 caracteres',
        'string.max': 'La descripción no puede exceder 500 caracteres',
        'any.required': 'La descripción es obligatoria'
      }),
    
    price: Joi.number()
      .positive()
      .precision(2)
      .required()
      .messages({
        'number.positive': 'El precio debe ser un número positivo',
        'any.required': 'El precio es obligatorio'
      }),
    
    category: Joi.string()
      .valid('electronics', 'clothing', 'books', 'home', 'sports', 'other')
      .required()
      .messages({
        'any.only': 'La categoría debe ser una de: electronics, clothing, books, home, sports, other',
        'any.required': 'La categoría es obligatoria'
      }),
    
    stock: Joi.number()
      .integer()
      .min(0)
      .required()
      .messages({
        'number.integer': 'El stock debe ser un número entero',
        'number.min': 'El stock no puede ser negativo',
        'any.required': 'El stock es obligatorio'
      })
  }),

  // Esquema para parámetros de consulta
  query: Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
      .default(1)
      .messages({
        'number.integer': 'La página debe ser un número entero',
        'number.min': 'La página debe ser mayor a 0'
      }),
    
    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(10)
      .messages({
        'number.integer': 'El límite debe ser un número entero',
        'number.min': 'El límite debe ser mayor a 0',
        'number.max': 'El límite no puede ser mayor a 100'
      }),
    
    category: Joi.string()
      .valid('electronics', 'clothing', 'books', 'home', 'sports', 'other')
      .optional()
      .messages({
        'any.only': 'La categoría debe ser una de: electronics, clothing, books, home, sports, other'
      })
  }),

  // Esquema para validar ID
  id: Joi.string()
    .required()
    .messages({
      'any.required': 'El ID es obligatorio',
      'string.empty': 'El ID no puede estar vacío'
    })
};

/**
 * Función helper para validar datos
 */
function validateData(schema, data) {
  const { error, value } = schema.validate(data, { 
    abortEarly: false,
    stripUnknown: true 
  });
  
  if (error) {
    return {
      isValid: false,
      errors: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }))
    };
  }
  
  return {
    isValid: true,
    data: value
  };
}

export const productValidator = {
  /**
   * Validar datos para crear un producto
   */
  validateCreate(data) {
    return validateData(schemas.create, data);
  },

  /**
   * Validar parámetros de consulta
   */
  validateQuery(data) {
    return validateData(schemas.query, data);
  },

  /**
   * Validar ID de producto
   */
  validateId(id) {
    return validateData(schemas.id, id);
  },

  /**
   * Validar datos para actualizar un producto
   */
  validateUpdate(data) {
    // Para actualización, todos los campos son opcionales
    const updateSchema = schemas.create.fork(
      ['name', 'description', 'price', 'category', 'stock'],
      (schema) => schema.optional()
    );
    
    return validateData(updateSchema, data);
  }
};

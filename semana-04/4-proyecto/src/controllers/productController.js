import { productService } from '../services/productService.js';
import { productValidator } from '../validators/productValidator.js';

export const productController = {
  /**
   * Crear un nuevo producto
   */
  async create(req, res, next) {
    try {
      // Validar datos de entrada
      const validationResult = productValidator.validateCreate(req.body);
      if (!validationResult.isValid) {
        return res.status(400).json({
          error: 'Datos inválidos',
          details: validationResult.errors
        });
      }

      // Crear producto usando el servicio
      const product = await productService.create(validationResult.data);
      
      res.status(201).json({
        success: true,
        data: product,
        message: 'Producto creado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Obtener todos los productos
   */
  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10, category } = req.query;
      
      // Validar parámetros de consulta
      const validationResult = productValidator.validateQuery({
        page: parseInt(page),
        limit: parseInt(limit),
        category
      });
      
      if (!validationResult.isValid) {
        return res.status(400).json({
          error: 'Parámetros de consulta inválidos',
          details: validationResult.errors
        });
      }

      const result = await productService.getAll(validationResult.data);
      
      res.json({
        success: true,
        data: result.products,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          pages: result.pages
        }
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Obtener un producto por ID
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      
      // Validar ID
      const validationResult = productValidator.validateId(id);
      if (!validationResult.isValid) {
        return res.status(400).json({
          error: 'ID inválido',
          details: validationResult.errors
        });
      }

      const product = await productService.getById(id);
      
      if (!product) {
        return res.status(404).json({
          error: 'Producto no encontrado',
          message: `No se encontró un producto con ID: ${id}`
        });
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }
};

import { v4 as uuidv4 } from 'uuid';

// Simulación de base de datos en memoria
let products = [
  {
    id: 'product-1',
    name: 'Laptop Dell XPS 13',
    description: 'Laptop ultradelgada con procesador Intel Core i7',
    price: 1299.99,
    category: 'electronics',
    stock: 15,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'product-2',
    name: 'Camiseta Nike Dri-FIT',
    description: 'Camiseta deportiva de alto rendimiento',
    price: 29.99,
    category: 'clothing',
    stock: 50,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  }
];

export const productService = {
  /**
   * Crear un nuevo producto
   */
  async create(productData) {
    const newProduct = {
      id: uuidv4(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    products.push(newProduct);
    return newProduct;
  },

  /**
   * Obtener todos los productos con paginación y filtros
   */
  async getAll(options = {}) {
    const { page = 1, limit = 10, category } = options;
    
    // Filtrar por categoría si se proporciona
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Calcular paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      page,
      limit,
      total: filteredProducts.length,
      pages: Math.ceil(filteredProducts.length / limit)
    };
  },

  /**
   * Obtener un producto por ID
   */
  async getById(id) {
    return products.find(product => product.id === id);
  },

  /**
   * Actualizar un producto
   */
  async update(id, updateData) {
    const productIndex = products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      return null;
    }
    
    products[productIndex] = {
      ...products[productIndex],
      ...updateData,
      updatedAt: new Date()
    };
    
    return products[productIndex];
  },

  /**
   * Eliminar un producto
   */
  async delete(id) {
    const productIndex = products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      return false;
    }
    
    products.splice(productIndex, 1);
    return true;
  },

  /**
   * Buscar productos por nombre
   */
  async search(query) {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  /**
   * Verificar disponibilidad de stock
   */
  async checkStock(id, quantity) {
    const product = await this.getById(id);
    if (!product) {
      return { available: false, reason: 'Producto no encontrado' };
    }
    
    if (product.stock < quantity) {
      return { 
        available: false, 
        reason: 'Stock insuficiente',
        availableStock: product.stock
      };
    }
    
    return { available: true };
  }
};

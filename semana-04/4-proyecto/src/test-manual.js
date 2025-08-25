/**
 * Script de pruebas manuales para la API de productos
 * Ejecutar con: npm run test
 */

const API_BASE = 'http://localhost:3000/api';

// Función helper para hacer peticiones
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    
    console.log(`\n🌐 ${options.method || 'GET'} ${url}`);
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    console.log('📋 Respuesta:', JSON.stringify(data, null, 2));
    
    return { response, data };
  } catch (error) {
    console.error(`❌ Error en ${url}:`, error.message);
    return { error };
  }
}

async function runTests() {
  console.log('🧪 INICIANDO PRUEBAS DE LA API DE PRODUCTOS');
  console.log('=' .repeat(50));
  
  // 1. Health Check
  console.log('\n1️⃣ HEALTH CHECK');
  await makeRequest(`${API_BASE}/health`);
  
  // 2. Obtener todos los productos (iniciales)
  console.log('\n2️⃣ OBTENER PRODUCTOS INICIALES');
  await makeRequest(`${API_BASE}/products`);
  
  // 3. Crear un producto válido
  console.log('\n3️⃣ CREAR PRODUCTO VÁLIDO');
  const newProduct = {
    name: 'iPhone 15 Pro',
    description: 'El smartphone más avanzado de Apple con chip A17 Pro',
    price: 999.99,
    category: 'electronics',
    stock: 25
  };
  
  await makeRequest(`${API_BASE}/products`, {
    method: 'POST',
    body: JSON.stringify(newProduct)
  });
  
  // 4. Intentar crear un producto con datos inválidos
  console.log('\n4️⃣ CREAR PRODUCTO INVÁLIDO (validación)');
  const invalidProduct = {
    name: 'AB', // Muy corto
    description: 'Corta', // Muy corta
    price: -10, // Precio negativo
    category: 'invalid_category', // Categoría inválida
    stock: -5 // Stock negativo
  };
  
  await makeRequest(`${API_BASE}/products`, {
    method: 'POST',
    body: JSON.stringify(invalidProduct)
  });
  
  // 5. Obtener productos con paginación
  console.log('\n5️⃣ OBTENER PRODUCTOS CON PAGINACIÓN');
  await makeRequest(`${API_BASE}/products?page=1&limit=2`);
  
  // 6. Filtrar productos por categoría
  console.log('\n6️⃣ FILTRAR POR CATEGORÍA');
  await makeRequest(`${API_BASE}/products?category=electronics`);
  
  // 7. Obtener producto por ID válido
  console.log('\n7️⃣ OBTENER PRODUCTO POR ID VÁLIDO');
  await makeRequest(`${API_BASE}/products/product-1`);
  
  // 8. Obtener producto por ID inválido
  console.log('\n8️⃣ OBTENER PRODUCTO POR ID INEXISTENTE');
  await makeRequest(`${API_BASE}/products/producto-inexistente`);
  
  // 9. Ruta no encontrada
  console.log('\n9️⃣ RUTA NO ENCONTRADA');
  await makeRequest(`${API_BASE}/ruta-inexistente`);
  
  // 10. JSON malformado
  console.log('\n🔟 JSON MALFORMADO');
  try {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{"name": "Test", "invalid": json}'
    });
    
    const data = await response.json();
    console.log(`\n🌐 POST ${API_BASE}/products (JSON malformado)`);
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    console.log('📋 Respuesta:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error con JSON malformado:', error.message);
  }
  
  console.log('\n✅ PRUEBAS COMPLETADAS');
  console.log('=' .repeat(50));
  console.log('\n💡 NOTAS:');
  console.log('- Asegúrate de que el servidor esté corriendo (npm run dev)');
  console.log('- Revisa que todas las validaciones funcionen correctamente');
  console.log('- Verifica que los errores se manejen apropiadamente');
}

// Verificar si fetch está disponible (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ Este script requiere Node.js 18+ o instalar node-fetch');
  console.log('💡 Alternativa: Usa Postman, Thunder Client o curl para las pruebas');
  process.exit(1);
}

// Ejecutar pruebas
runTests().catch(console.error);

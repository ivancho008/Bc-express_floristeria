# 💪 EJERCICIOS SEMANA 5: Base de Datos Básica

## 🎯 Objetivo

Reforzar el aprendizaje mediante ejercicios prácticos que profundizan en conceptos de bases de datos, Prisma ORM y APIs REST.

---

## 📋 EJERCICIO 1: Configuración y Modelos (30 min)

### 🔧 Parte A: Setup Inicial (15 min)

**Instrucciones:**

1. Crea un nuevo proyecto llamado `biblioteca-api`
2. Configura Prisma con SQLite
3. Define los siguientes modelos:

```prisma
model Author {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  birthDate DateTime?
  country   String?
  createdAt DateTime @default(now())
  books     Book[]
}

model Book {
  id          Int      @id @default(autoincrement())
  title       String
  isbn        String   @unique
  publishYear Int
  pages       Int?
  available   Boolean  @default(true)
  authorId    Int
  createdAt   DateTime @default(now())
  author      Author   @relation(fields: [authorId], references: [id])
}
```

### 📝 Parte B: Migraciones (15 min)

**Tareas:**

1. Aplica la migración inicial
2. Agrega un campo `biography` a `Author`
3. Crea una nueva migración para este cambio
4. Verifica con Prisma Studio

**📝 Entregable:**

- [ ] Proyecto configurado
- [ ] Modelos definidos
- [ ] Migraciones aplicadas
- [ ] Screenshot de Prisma Studio

---

## 📋 EJERCICIO 2: Queries Básicas (45 min)

### 🔍 Parte A: Script de Queries (25 min)

Crea un archivo `scripts/queries.js` con las siguientes funciones:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. Crear un autor
async function createAuthor(data) {
  // Tu código aquí
}

// 2. Crear un libro
async function createBook(data) {
  // Tu código aquí
}

// 3. Obtener todos los autores con sus libros
async function getAllAuthorsWithBooks() {
  // Tu código aquí
}

// 4. Buscar libros por año de publicación
async function getBooksByYear(year) {
  // Tu código aquí
}

// 5. Obtener autores que tienen más de X libros
async function getAuthorsWithMinBooks(minBooks) {
  // Tu código aquí
}
```

### 🧪 Parte B: Testing de Queries (20 min)

Crea datos de prueba y ejecuta las funciones:

```javascript
async function testQueries() {
  // Crear autores
  const author1 = await createAuthor({
    name: 'Gabriel García Márquez',
    email: 'gabriel@example.com',
    country: 'Colombia',
  });

  // Crear libros
  const book1 = await createBook({
    title: 'Cien años de soledad',
    isbn: '978-0307389732',
    publishYear: 1967,
    pages: 448,
    authorId: author1.id,
  });

  // Probar queries
  console.log(await getAllAuthorsWithBooks());
  console.log(await getBooksByYear(1967));
}
```

**📝 Entregable:**

- [ ] Script de queries funcional
- [ ] Datos de prueba insertados
- [ ] Resultados de testing documentados

---

## 📋 EJERCICIO 3: API REST Avanzada (60 min)

### 🚀 Parte A: Endpoints Especiales (30 min)

Implementa estos endpoints además del CRUD básico:

```javascript
// 1. GET /api/authors/:id/books
// Obtener libros de un autor específico

// 2. GET /api/books/available
// Obtener solo libros disponibles

// 3. GET /api/books/search?title=...&author=...
// Buscar libros por título y/o autor

// 4. PATCH /api/books/:id/availability
// Cambiar disponibilidad de un libro

// 5. GET /api/stats
// Estadísticas: total autores, libros, libros disponibles
```

### 🔧 Parte B: Validaciones Avanzadas (30 min)

Implementa validaciones para:

1. **Autor:**

   - Nombre mínimo 2 caracteres
   - Email válido y único
   - País de lista predefinida (opcional)

2. **Libro:**
   - Título mínimo 3 caracteres
   - ISBN formato válido (13 dígitos)
   - Año entre 1000 y año actual
   - Páginas mayor a 0 (si se proporciona)

**Ejemplo de validación ISBN:**

```javascript
function validateISBN(isbn) {
  // Eliminar guiones y espacios
  const cleanISBN = isbn.replace(/[-\s]/g, '');

  // Verificar que son 13 dígitos
  if (!/^\d{13}$/.test(cleanISBN)) {
    return false;
  }

  // Tu algoritmo de validación aquí
  return true;
}
```

**📝 Entregable:**

- [ ] Endpoints especiales funcionando
- [ ] Validaciones implementadas
- [ ] Casos de error manejados
- [ ] Testing con Postman/curl

---

## 📋 EJERCICIO 4: Relaciones Complejas (45 min)

### 🔗 Parte A: Modelo Extendido (20 min)

Agrega un nuevo modelo `Category`:

```prisma
model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  books Book[]
}

// Modifica Book para incluir categorías
model Book {
  // ... campos existentes
  categories Category[]
}
```

### 📚 Parte B: Queries con Múltiples Relaciones (25 min)

Implementa funciones para:

```javascript
// 1. Asignar categorías a un libro
async function addCategoriesToBook(bookId, categoryIds) {
  // Tu código aquí
}

// 2. Obtener libros por categoría
async function getBooksByCategory(categoryName) {
  // Tu código aquí
}

// 3. Obtener estadísticas por categoría
async function getCategoryStats() {
  // Retorna: nombre categoría, cantidad de libros, cantidad de autores únicos
}

// 4. Buscar libros con filtros complejos
async function searchBooks(filters) {
  // Filtros: título, autor, categoría, año min/max, disponibilidad
}
```

**📝 Entregable:**

- [ ] Modelo Category agregado
- [ ] Relación many-to-many configurada
- [ ] Queries complejas funcionando
- [ ] Datos de prueba con categorías

---

## 📋 EJERCICIO 5: Optimización y Mejores Prácticas (30 min)

### ⚡ Parte A: Optimización de Queries (15 min)

Optimiza estas queries problemáticas:

```javascript
// PROBLEMA: N+1 Query Problem
async function getAllBooksWithAuthors() {
  const books = await prisma.book.findMany();

  for (const book of books) {
    book.author = await prisma.author.findUnique({
      where: { id: book.authorId },
    });
  }

  return books;
}

// TU SOLUCIÓN OPTIMIZADA:
async function getAllBooksWithAuthorsOptimized() {
  // Tu código aquí
}
```

### 🛡️ Parte B: Middleware y Error Handling (15 min)

Implementa:

1. **Middleware de logging** que registre todas las queries
2. **Error handler global** para errores de Prisma
3. **Validación middleware** para IDs numéricos

```javascript
// Ejemplo de error handler
const prismaErrorHandler = (error, req, res, next) => {
  switch (error.code) {
    case 'P2002':
      // Tu manejo aquí
      break;
    case 'P2025':
      // Tu manejo aquí
      break;
    default:
    // Tu manejo aquí
  }
};
```

**📝 Entregable:**

- [ ] Queries optimizadas
- [ ] Middleware implementado
- [ ] Error handling mejorado
- [ ] Performance medido (opcional)

---

## 📋 EJERCICIO BONUS: Seeding y Testing (20 min)

### 🌱 Parte A: Script de Seeding Avanzado (10 min)

Crea `prisma/seed.js` que inserte:

- 10 autores con datos realistas
- 25 libros distribuidos entre autores
- 5 categorías con libros asignados

### 🧪 Parte B: Suite de Testing (10 min)

Crea tests manuales para verificar:

- Todos los endpoints funcionan
- Validaciones atrapan errores
- Relaciones son consistentes

**📝 Entregable:**

- [ ] Script de seeding completo
- [ ] Base de datos poblada
- [ ] Suite de testing documentada

---

## ✅ Criterios de Evaluación

### **Funcionalidad (40%)**

- [ ] Todos los modelos funcionan correctamente
- [ ] CRUD completo implementado
- [ ] Relaciones funcionando

### **Código (30%)**

- [ ] Código limpio y organizado
- [ ] Validaciones apropiadas
- [ ] Error handling robusto

### **Base de Datos (20%)**

- [ ] Esquema bien diseñado
- [ ] Migraciones aplicadas
- [ ] Datos consistentes

### **Documentación (10%)**

- [ ] README con instrucciones
- [ ] Código comentado
- [ ] Ejemplos de uso

---

## 🎯 Objetivos de Aprendizaje Verificados

Al completar estos ejercicios demuestras dominio en:

1. ✅ **Diseño de modelos** relacionales
2. ✅ **Implementación de CRUD** completo
3. ✅ **Manejo de relaciones** complejas
4. ✅ **Optimización de queries** de base de datos
5. ✅ **Validación y error handling** robusto
6. ✅ **Mejores prácticas** de desarrollo

**¡Excelente trabajo dominando bases de datos con Prisma!** 🏆

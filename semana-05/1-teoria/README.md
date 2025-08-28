# 📚 TEORÍA SEMANA 5: Base de Datos Básica

## 🎯 Objetivos de la Sesión

- Comprender conceptos de bases de datos relacionales
- Conocer Prisma ORM y sus ventajas
- Entender las relaciones entre modelos
- Aprender validación de datos y manejo de errores

---

## 1. 🗄️ Introducción a Bases de Datos Relacionales

### ¿Qué es una Base de Datos Relacional?

Una base de datos relacional organiza la información en **tablas** relacionadas entre sí mediante **claves**.

#### Conceptos Clave:

- **Tabla**: Estructura que almacena datos en filas y columnas
- **Fila/Registro**: Una entrada individual de datos
- **Columna/Campo**: Un atributo específico del registro
- **Clave Primaria (PK)**: Identificador único de cada registro
- **Clave Foránea (FK)**: Referencia a la PK de otra tabla

### Ejemplo Visual:

```
Tabla: users
+----+----------------+------------------+
| id | name           | email            |
+----+----------------+------------------+
| 1  | Juan Pérez     | juan@example.com |
| 2  | Ana García     | ana@example.com  |
+----+----------------+------------------+

Tabla: posts
+----+---------------+----------+---------+
| id | title         | authorId | content |
+----+---------------+----------+---------+
| 1  | Mi primer post| 1        | ...     |
| 2  | Segundo post  | 1        | ...     |
| 3  | Post de Ana   | 2        | ...     |
+----+---------------+----------+---------+
```

---

## 2. 🔧 Prisma ORM

### ¿Qué es un ORM?

**Object-Relational Mapping** es una técnica que permite trabajar con bases de datos usando objetos en lugar de SQL directo.

### Ventajas de Prisma:

- ✅ **Type Safety**: Tipado automático en TypeScript/JavaScript
- ✅ **Auto-completado**: Intellisense en el editor
- ✅ **Migraciones**: Control de versiones de esquema
- ✅ **Prisma Studio**: GUI para ver/editar datos
- ✅ **Queries optimizadas**: SQL eficiente generado automáticamente

### Arquitectura de Prisma:

```
[Tu App] ←→ [Prisma Client] ←→ [Prisma Engine] ←→ [Base de Datos]
```

---

## 3. 📊 Definición de Modelos

### Esquema Prisma Básico:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]   // Relación 1:N
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  published Boolean  @default(false)
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  author    User     @relation(fields: [authorId], references: [id])
}
```

### Directivas Importantes:

- `@id`: Marca el campo como clave primaria
- `@unique`: Garantiza valores únicos
- `@default()`: Valor por defecto
- `@relation()`: Define relaciones entre modelos

---

## 4. 🔗 Tipos de Relaciones

### 1. Uno a Muchos (1:N)

**Un usuario puede tener muchos posts**

```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[] // Array indica "muchos"
}

model Post {
  id       Int  @id @default(autoincrement())
  authorId Int
  author   User @relation(fields: [authorId], references: [id])
}
```

### 2. Uno a Uno (1:1)

**Un usuario tiene un perfil**

```prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  userId Int  @unique
  user   User @relation(fields: [userId], references: [id])
}
```

### 3. Muchos a Muchos (N:M)

**Posts pueden tener muchas categorías, categorías muchos posts**

```prisma
model Post {
  id         Int        @id @default(autoincrement())
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

---

## 5. ⚡ Prisma Client

### Generación del Cliente:

```bash
npx prisma generate
```

Esto crea el cliente tipado basado en tu esquema.

### Uso Básico:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear
const user = await prisma.user.create({
  data: { name: 'Juan', email: 'juan@example.com' }
});

// Leer
const users = await prisma.user.findMany();
const user = await prisma.user.findUnique({ where: { id: 1 } });

// Actualizar
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Juan Carlos' }
});

// Eliminar
await prisma.user.delete({ where: { id: 1 } });
```

---

## 6. 🔍 Queries con Relaciones

### Incluir Datos Relacionados:

```javascript
// Usuario con sus posts
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
});

// Post con su autor
const postWithAuthor = await prisma.post.findMany({
  include: { author: true }
});

// Seleccionar campos específicos
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    posts: {
      select: { title: true, published: true }
    }
  }
});
```

### Filtros Avanzados:

```javascript
// Posts publicados de un usuario
const publishedPosts = await prisma.post.findMany({
  where: {
    published: true,
    author: { email: 'juan@example.com' }
  }
});

// Usuarios con al menos un post
const activeUsers = await prisma.user.findMany({
  where: {
    posts: { some: {} }
  }
});
```

---

## 7. 🛠️ Migraciones

### ¿Qué son las Migraciones?

Las migraciones son **scripts** que modifican la estructura de la base de datos de manera controlada.

### Crear una Migración:

```bash
npx prisma migrate dev --name init
```

Esto:
1. Compara el esquema actual con la BD
2. Genera SQL para los cambios
3. Aplica los cambios
4. Actualiza el cliente Prisma

### Flujo de Desarrollo:

```
1. Modificar schema.prisma
2. Ejecutar prisma migrate dev
3. Revisar archivo de migración generado
4. Confirmar cambios
```

---

## 8. ✅ Validación y Errores

### Validación a Nivel de Esquema:

```prisma
model User {
  email String @unique // Email único automáticamente
  name  String // Requerido por defecto
}
```

### Validación en Controlador:

```javascript
const createUser = async (req, res) => {
  const { name, email } = req.body;
  
  // Validaciones básicas
  if (!name || name.length < 2) {
    return res.status(400).json({
      error: 'Nombre requerido (mínimo 2 caracteres)'
    });
  }
  
  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.status(201).json(user);
  } catch (error) {
    // Error de email duplicado
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'Email ya registrado'
      });
    }
    res.status(500).json({ error: 'Error interno' });
  }
};
```

### Códigos de Error Prisma Comunes:

- `P2002`: Violación de constraint único
- `P2025`: Registro no encontrado
- `P2003`: Violación de foreign key

---

## 9. 🔧 Herramientas de Desarrollo

### Prisma Studio:

```bash
npx prisma studio
```

Abre una interfaz web para:
- Ver datos de todas las tablas
- Editar registros
- Explorar relaciones

### Introspección:

```bash
npx prisma db pull
```

Genera el esquema Prisma desde una BD existente.

### Reset de Base de Datos:

```bash
npx prisma migrate reset
```

⚠️ **¡Cuidado!** Elimina todos los datos.

---

## 📝 Resumen de Conceptos Clave

1. **Prisma ORM** facilita el trabajo con bases de datos
2. **Modelos** definen la estructura de datos
3. **Relaciones** conectan entidades entre sí
4. **Migraciones** versionan cambios de esquema
5. **Prisma Client** proporciona API tipada
6. **Validación** es crucial para integridad de datos
7. **Error handling** mejora la experiencia del usuario

---

## 🎯 Para la Práctica

Ahora aplicaremos estos conceptos creando:

1. ✅ Modelos User y Post relacionados
2. ✅ Operaciones CRUD completas
3. ✅ Validación de datos
4. ✅ Manejo de errores
5. ✅ Queries con relaciones

**¡Vamos a la práctica!** 🚀

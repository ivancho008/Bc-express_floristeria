# 🚀 Guía de Instalación Rápida

## ⚡ Pasos para ejecutar el proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

### 3. Configurar base de datos (automático)

```bash
npm run setup
```

Este comando ejecuta:

- `prisma generate` - Genera el cliente de Prisma
- `prisma migrate dev` - Aplica migraciones a la BD
- `prisma seed` - Inserta datos de prueba

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

¡Listo! El servidor estará corriendo en `http://localhost:3000`

## 🧪 Probar la API

### Endpoints disponibles:

- **GET** `http://localhost:3000` - Documentación de la API
- **GET** `http://localhost:3000/api/users` - Listar usuarios
- **GET** `http://localhost:3000/api/posts` - Listar posts

### Ejemplo con curl:

```bash
# Crear un usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Pedro", "email":"pedro@example.com"}'

# Crear un post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi post", "content":"Contenido del post", "authorId":1, "published":true}'
```

## 🛠️ Comandos útiles

```bash
npm run dev          # Desarrollo con recarga automática
npm start            # Producción
npm run db:studio    # Abrir Prisma Studio (GUI para BD)
npm run db:reset     # Resetear BD (¡cuidado!)
npm run db:seed      # Solo insertar datos de prueba
```

## 📁 Estructura del proyecto

```
src/
├── app.js              # Servidor principal
├── controllers/        # Lógica de negocio
│   ├── userController.js
│   └── postController.js
├── routes/            # Definición de rutas
│   ├── users.js
│   └── posts.js
└── middleware/        # Middleware personalizado
    ├── errorHandler.js
    └── logger.js
prisma/
├── schema.prisma      # Esquema de BD
└── seed.js           # Datos de prueba
```

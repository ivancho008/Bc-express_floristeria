

# Floristería API - Proyecto Express.js

Este trabajo corresponde a la práctica avanzada de routing para el dominio de Floristería, siguiendo los lineamientos del bootcamp Express.js. Aquí se implementan rutas modulares, validación estricta y operaciones CRUD completas para tres entidades principales.

## Tecnologías utilizadas
- Node.js
- Express.js
- pnpm gestor de paquetes

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

```
Bc-express_floristeria/
├── package.json
├── pnpm-lock.yaml
├── server.js
├── tsconfig.json
├── src/
│   ├── controllers/
│   │   ├── bouquets.controller.js
│   │   ├── flowers.controller.js
│   │   ├── orders.controller.js
│   ├── data/
│   │   └── flowersData.js
│   ├── routes/
│   │   ├── bouquets.routes.js
│   │   ├── flowers.routes.js
│   │   ├── orders.routes.js
```

## ¿Cómo inicializar y probar el proyecto?

1. Instalar pnpm (si no lo tienes):

```powershell
npm install -g pnpm
```

2. Instalar dependencias:

```powershell
pnpm install
```

3. Iniciar servidor:

```powershell
node server.js
```

4. Abrir en el navegador:

```
http://localhost:3000
```

5. Endpoints básicos (usar Postman o Bruno):
- GET /api/flowers
- GET /api/bouquets
- GET /api/orders
- POST/PUT/DELETE en cada recurso

## Ejemplos rápidos (JSON)

Crear una flor (POST) → body:

```json
{
  "name": "Orchid",
  "color": "Purple",
  "price": 8.00,
  "seasonality": "All year",
  "stock": 50,
  "origin": "Antioquia",
  "fragrance": "Soft",
  "supplier": "Flores Medellín"
}
```

## Lo nuevo que hice (solo lo esencial)
- Implementé las 15 rutas CRUD para Flowers, Bouquets y Orders.
- Añadí validación en POST/PUT (400) y manejo de 404.
- Dejé datos de ejemplo en `src/data/flowersData.js`.
- Monté OpenAPI en `_docs/api/openapi.yml` (ver en `/api-docs`).
- Escribí tests con Jest + Supertest (9 tests que pasan localmente).
- Añadí CI (GitHub Actions) y subí la rama `feature/practice-4-complete`.
- Generé `delivery_package.zip` y `delivery/smoke_output.txt` como evidencia.

Si quieres que pegue el texto para el PR, te lo dejo listo. Nada más.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

```
Bc-express_floristeria/
├── package.json
├── pnpm-lock.yaml
├── server.js
├── tsconfig.json
├── src/
│   ├── controllers/
│   │   ├── bouquets.controller.js
│   │   ├── flowers.controller.js
│   │   ├── orders.controller.js
│   ├── data/
│   │   └── flowersData.js
│   ├── routes/
│   │   ├── bouquets.routes.js
│   │   ├── flowers.routes.js
│   │   ├── orders.routes.js
```

## ¿Cómo inicializar y probar el proyecto?

Para ejecutar este proyecto, siga estos pasos que recomiendo:

1. Instale pnpm si aún no lo tiene:
  # Floristería API - Proyecto Express.js

  Este repositorio contiene la solución de la Práctica 4 (Routing Avanzado) del bootcamp Express.js. Implementa rutas modulares, controladores, validaciones y pruebas para las tres entidades del dominio: Flowers, Bouquets y Orders.

  ## Tecnologías
  - Node.js
  - Express.js (v5)
  - pnpm (gestor de paquetes)
  - Jest + Supertest (tests)
  - Swagger / OpenAPI (documentación)

  ## Resumen de lo nuevo (entregable)
  - 15 endpoints CRUD implementados (5 por entidad: Flowers, Bouquets, Orders).
  - Validación de entrada en POST/PUT que devuelve 400 en caso de campos faltantes.
  - Manejo de 404 para recursos no encontrados.
  - Datos de ejemplo en `src/data/flowersData.js`.
  - OpenAPI en `_docs/api/openapi.yml` y montado en `/api-docs` usando `swagger-ui-express`.
  - Tests con Jest + Supertest (tests en `tests/`, todos pasan localmente en mi entorno).
  - Workflow de CI (`.github/workflows/ci.yml`) que ejecuta tests en PR/push.
  - Artefactos de entrega: `delivery_package.zip` y `delivery/smoke_output.txt`.

  ## Estructura del proyecto

  ```
  Bc-express_floristeria/
  ├── package.json
  ├── pnpm-lock.yaml
  ├── server.js            # exporta app para permitir tests
  ├── tsconfig.json
  ├── _docs/
  │   └── api/openapi.yml
  ├── src/
  │   ├── controllers/
  │   │   ├── bouquets.controller.js
  │   │   ├── flowers.controller.js
  +│   │   └── orders.controller.js
  │   ├── data/
  │   │   └── flowersData.js
  │   └── routes/
  │       ├── bouquets.routes.js
  │       ├── flowers.routes.js
  │       └── orders.routes.js
  ├── tests/                # Jest + Supertest
  ├── delivery/             # evidencias (smoke, etc.)
  └── bruno_flowers/        # colecciones Bruno para probar
  ```

  ## Cómo correr el proyecto (local)

  1. Instalar pnpm (si no lo tienes):

  ```powershell
  npm install -g pnpm
  ```

  2. Instalar dependencias:

  ```powershell
  pnpm install
  ```

  3. Levantar servidor en modo producción:

  ```powershell
  pnpm start
  ```

  4. Modo desarrollo (con recarga):

  ```powershell
  pnpm run dev
  ```

  5. Abrir navegador / documentación:

  - API base: http://localhost:3000
  - Swagger / OpenAPI: http://localhost:3000/api-docs

  ## Scripts útiles

  - `pnpm start` — inicia el servidor.
  - `pnpm run dev` — inicia con nodemon.
  - `pnpm test` — ejecuta Jest (tests en `tests/`).

  > Nota: el proyecto exporta la instancia `app` desde `server.js` para permitir testing con Supertest.

  ## Endpoints principales

  Puedes probarlos con Postman, Bruno o cualquier cliente HTTP. Las colecciones Bruno están en `bruno_flowers/`.

  - GET `/api/flowers` — lista todas las flowers.
  - GET `/api/flowers/:id` — obtener flower por id.
  - POST `/api/flowers` — crear flower (valida campos).
  - PUT `/api/flowers/:id` — actualizar flower (valida campos).
  - DELETE `/api/flowers/:id` — eliminar flower.

  - GET `/api/bouquets` — lista bouquets.
  - GET `/api/bouquets/:id` — obtener bouquet por id.
  - POST `/api/bouquets` — crear bouquet.
  - PUT `/api/bouquets/:id` — actualizar bouquet.
  - DELETE `/api/bouquets/:id` — eliminar bouquet.

  - GET `/api/orders` — lista orders.
  - GET `/api/orders/:id` — obtener order por id.
  - POST `/api/orders` — crear order.
  - PUT `/api/orders/:id` — actualizar order.
  - DELETE `/api/orders/:id` — eliminar order.

  Ejemplos de bodies para POST/PUT (usar JSON):

  Crear una flor:

  ```json
  {
    "name": "Orchid",
    "color": "Purple",
    "price": 8.00,
    "seasonality": "All year",
    "stock": 50,
    "origin": "Antioquia",
    "fragrance": "Soft",
    "supplier": "Flores Medellín"
  }
  ```

  Crear un bouquet:

  ```json
  {
    "name": "Colombian Love",
    "description": "Twelve pink roses and red carnations.",
    "price": 65.00,
    "flowerIds": [2,5],
    "occasion": "Anniversary",
    "wrapping": "Red paper",
    "designer": "Maria Fernanda"
  }
  ```

  Crear un pedido (order):

  ```json
  {
    "customerName": "Jorge Ramirez",
    "bouquetId": 1,
    "deliveryDate": "2025-11-01",
    "status": "Pending",
    "address": "Cra 15 #45-23, Bogotá",
    "phone": "3104567890",
    "paymentMethod": "Nequi",
    "note": "Deliver before 10am"
  }
  ```

  ## Evidencia y pruebas

  - `delivery/smoke_output.txt` — respuestas sample de endpoints (GETs).
  - `delivery_package.zip` — paquete de entrega con fuentes y artefactos.
  - Tests: los archivos de prueba están en `tests/` y se ejecutan con `pnpm test`.


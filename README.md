
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

Para ejecutar este proyecto, siga estos pasos que recomiendo:

1. Instale pnpm si aún no lo tiene:
  ```powershell
  npm install -g pnpm
  ```
2. Instale las dependencias del proyecto:
  ```powershell
  pnpm install
  ```
3. Inicie el servidor:
  ```powershell
  node server.js
  ```
4. Abra su navegador y visite:
  [http://localhost:3000](http://localhost:3000)

5. Puede probar los endpoints usando Bruno, Postman o cualquier cliente REST. Ejemplos de rutas:
  - GET `/api/flowers`
  - GET `/api/bouquets`
  - GET `/api/orders`
  - POST, PUT, DELETE para cada entidad exortando bruno desde la carpeta bruno_flowers

## Ejemplos de peticiones (JSON)

### Crear una flor (POST)
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

### Crear un bouquet (POST)
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

### Crear un pedido (POST)
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

## Notas y recomendaciones
- Todos los comentarios en el código están en inglés, siguiendo las mejores prácticas del bootcamp.
- La nomenclatura de rutas, archivos y atributos es completamente en inglés.

- Puede modificar los datos en `src/data/flowersData.js` si desea agregar más ejemplos.

## Contacto y soporte
Si tiene alguna duda sobre la ejecución o el código, puede consultar con el aprendiz ivan yate de la ficha:3147235.


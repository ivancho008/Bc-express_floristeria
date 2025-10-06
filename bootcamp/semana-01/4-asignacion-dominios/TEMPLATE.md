# Asignación Personal - Aprendiz [ID]

**Dominio Asignado:** [NOMBRE DEL DOMINIO]  
**Fecha de Asignación:** [FECHA]  
**Semanas Aplicables:** Todas (1-9)  
**Confidencialidad:** PRIVADO - Solo para ti y el instructor

---

## 🎯 Tu Dominio: [NOMBRE DEL DOMINIO]

### Descripción del Dominio

[Descripción detallada del contexto de negocio. Explicar qué hace la empresa/organización, cuál es su propósito, qué servicios ofrece, quiénes son sus clientes, etc.]

**Ejemplo de contexto:**

> Este es un negocio dedicado a [actividad principal]. Sus clientes principales son [tipo de clientes]. Los procesos core del negocio incluyen [procesos principales]. El sistema que desarrollarás debe permitir gestionar [funcionalidades clave].

---

## 📊 Entidades Principales

### 1. **[Entidad Principal 1]** (Ejemplo: Productos, Clientes, etc.)

- **Descripción:** [Para qué sirve esta entidad]
- **Atributos clave:**
  - `id` (identificador único)
  - `name` / `title` (nombre descriptivo)
  - `[atributo específico 1]`
  - `[atributo específico 2]`
  - `createdAt` (fecha de creación)
  - `updatedAt` (fecha de actualización)

### 2. **[Entidad Principal 2]**

- **Descripción:** [Para qué sirve esta entidad]
- **Atributos clave:**
  - `id`
  - `[atributos específicos del dominio]`
  - Relación con [Entidad 1]

### 3. **[Entidad Principal 3]**

- **Descripción:** [Para qué sirve esta entidad]
- **Atributos clave:**
  - `id`
  - `[atributos específicos del dominio]`
  - Relaciones múltiples

### 4. **[Entidad Principal 4]**

- **Descripción:** [Para qué sirve esta entidad]
- **Atributos clave:**
  - `id`
  - `[atributos específicos del dominio]`

---

## 🔗 Relaciones entre Entidades

### Diagrama Conceptual

```
[Entidad 1] ──── 1:N ───> [Entidad 2]
    │
    └───── 1:N ───> [Entidad 3]

[Entidad 2] ──── N:M ───> [Entidad 4]
```

### Explicación de Relaciones

1. **[Entidad 1] → [Entidad 2]** (1:N)

   - Un [entidad 1] puede tener múltiples [entidad 2]
   - Ejemplo: Un cliente puede tener múltiples pedidos

2. **[Entidad 1] → [Entidad 3]** (1:N)

   - Un [entidad 1] puede tener múltiples [entidad 3]
   - Ejemplo: Un autor puede tener múltiples libros

3. **[Entidad 2] ↔ [Entidad 4]** (N:M)
   - Múltiples [entidad 2] pueden relacionarse con múltiples [entidad 4]
   - Requiere tabla intermedia
   - Ejemplo: Muchos pedidos pueden tener muchos productos

---

## 📋 Adaptación por Semana

### Semana 1: Introducción a Express.js

**Objetivo General:** Crear tu primera API REST básica

**Tu Tarea Específica:**

1. Crear endpoint `GET /api/[entidad-plural]` que devuelva lista de [entidad]
2. Crear endpoint `POST /api/[entidad-plural]` que cree un nuevo [entidad]
3. Usar datos en memoria (array) por ahora
4. Documentar endpoints con comentarios explicativos

**Ejemplo de Nomenclatura:**

```javascript
// ✅ CORRECTO (adaptado a tu dominio)
app.get('/api/[tu-entidad-plural]', (req, res) => {
  // Tu implementación usando nombres de tu dominio
});

// ❌ INCORRECTO (copiado de otro dominio)
app.get('/api/books', (req, res) => {
  // Si tu dominio no es Biblioteca
  // ...
});
```

**Entregable:**

- [ ] Archivo `server.js` con 2 endpoints funcionales
- [ ] Variables y funciones nombradas según tu dominio
- [ ] README con instrucciones de ejecución
- [ ] Datos de ejemplo coherentes con tu contexto

---

### Semana 2: Node.js Moderno para APIs

**Objetivo General:** Refactorizar usando ES6+ y async/await

**Tu Tarea Específica:**

1. Convertir callbacks a async/await
2. Usar destructuring en parámetros de tu dominio
3. Implementar arrow functions en controladores
4. Crear módulos separados para rutas de cada entidad

**Ejemplo de Estructura:**

```
src/
├── routes/
│   ├── [entidad1].routes.js
│   ├── [entidad2].routes.js
├── controllers/
│   ├── [entidad1].controller.js
│   ├── [entidad2].controller.js
└── server.js
```

**Entregable:**

- [ ] Código modularizado por entidad
- [ ] Uso de ES6+ features apropiadamente
- [ ] Nomenclatura consistente con tu dominio
- [ ] Documentación de módulos

---

### Semana 3: Express.js Intermedio

**Objetivo General:** Middleware, validación y manejo de errores

**Tu Tarea Específica:**

1. Crear middleware de validación para campos de tus entidades
2. Implementar manejo de errores personalizado
3. Agregar middleware de logging con contexto de tu dominio
4. Validar tipos de datos específicos de tu negocio

**Validaciones Específicas de tu Dominio:**

```javascript
// Ejemplo: Validar que [campo específico] tenga formato correcto
const validate[Entidad] = (req, res, next) => {
  const { [campos de tu entidad] } = req.body;

  // Validaciones específicas de tu dominio
  if (![validación específica]) {
    return res.status(400).json({
      error: '[Mensaje de error contextualizado]'
    });
  }

  next();
};
```

**Entregable:**

- [ ] Middleware de validación por entidad
- [ ] Manejo de errores contextualizado
- [ ] Logger con información relevante del dominio
- [ ] Tests manuales con Postman/Thunder Client

---

### Semana 4: Modelos y Validación

**Objetivo General:** Esquemas de validación con Joi/Zod

**Tu Tarea Específica:**

1. Crear esquemas de validación para cada entidad
2. Definir reglas de negocio específicas de tu dominio
3. Implementar validaciones en cadena
4. Mensajes de error personalizados

**Esquema de Ejemplo:**

```javascript
const [entidad]Schema = Joi.object({
  [campo1]: Joi.string().required().min(3).max(100),
  [campo2]: Joi.number().positive(),
  [campo3]: Joi.date().iso(),
  // Campos específicos de tu dominio
  [campoEspecifico]: Joi.string().valid('[opción1]', '[opción2]')
});
```

**Entregable:**

- [ ] Esquemas Joi/Zod para todas las entidades
- [ ] Validaciones de reglas de negocio implementadas
- [ ] Mensajes de error descriptivos
- [ ] Documentación de restricciones del dominio

---

### Semana 5: Base de Datos Básica

**Objetivo General:** Integrar Prisma ORM + SQLite

**Tu Tarea Específica:**

1. Diseñar schema de Prisma para tus entidades
2. Crear migraciones específicas de tu dominio
3. Implementar CRUD básico con base de datos
4. Seeds con datos realistas de tu contexto

**Schema Prisma (Ejemplo):**

```prisma
model [Entidad1] {
  id        Int      @id @default(autoincrement())
  [campo1]  String
  [campo2]  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relación con otra entidad de tu dominio
  [entidad2] [Entidad2][]
}

model [Entidad2] {
  id          Int      @id @default(autoincrement())
  [campos]    String

  // Foreign key a tu primera entidad
  [entidad1Id] Int
  [entidad1]   [Entidad1] @relation(fields: [[entidad1Id]], references: [id])
}
```

**Entregable:**

- [ ] schema.prisma con todas las entidades
- [ ] Migraciones ejecutadas exitosamente
- [ ] Seeds con datos contextualizados (mínimo 10 registros por entidad)
- [ ] CRUD completo funcionando con BD

---

### Semana 6: CRUD Completo

**Objetivo General:** CRUD avanzado con relaciones

**Tu Tarea Específica:**

1. Implementar queries con `include` para traer relaciones
2. Crear endpoints de búsqueda específicos del dominio
3. Filtros y ordenamiento relevantes a tu negocio
4. Paginación para listados grandes

**Endpoints Avanzados:**

```javascript
// Ejemplo: Búsqueda específica de tu dominio
GET /api/[entidades]?[filtro-específico]=[valor]
GET /api/[entidades]?sortBy=[campo-relevante]&order=desc
GET /api/[entidades]/search?q=[término-búsqueda]
GET /api/[entidades]?page=1&limit=10

// Relaciones
GET /api/[entidad1]/:id/[entidades2-relacionadas]
```

**Entregable:**

- [ ] CRUD completo con todas las operaciones
- [ ] Queries con relaciones funcionando
- [ ] Sistema de búsqueda implementado
- [ ] Paginación en listados
- [ ] Documentación de endpoints en README

---

### Semana 7: Autenticación Básica

**Objetivo General:** JWT, login y protección de rutas

**Tu Tarea Específica:**

1. Agregar entidad `User` a tu dominio (si no existe)
2. Implementar registro y login
3. Proteger rutas específicas según roles en tu dominio
4. Asociar acciones con usuarios autenticados

**Roles Específicos de tu Dominio:**

```javascript
// Ejemplo: Roles relevantes a tu contexto
const roles = {
  [ROL_1]: '[nombre rol 1]', // ej: ADMIN, MANAGER
  [ROL_2]: '[nombre rol 2]', // ej: EMPLOYEE, STAFF
  [ROL_3]: '[nombre rol 3]', // ej: CLIENT, CUSTOMER
};
```

**Entregable:**

- [ ] Sistema de autenticación funcional
- [ ] Endpoints de registro y login
- [ ] Middleware de autorización por rol
- [ ] Rutas protegidas apropiadamente
- [ ] JWT con información relevante del usuario

---

### Semana 8: Testing y Calidad

**Objetivo General:** Tests unitarios y de integración

**Tu Tarea Específica:**

1. Tests para controladores de cada entidad
2. Tests de validaciones específicas del dominio
3. Tests de relaciones entre entidades
4. Mocks de datos contextualizados

**Casos de Test Específicos:**

```javascript
describe('[Entidad] Controller', () => {
  describe('POST /api/[entidades]', () => {
    it('debe crear [entidad] con datos válidos del dominio', async () => {
      const [entidadData] = {
        [campos específicos de tu dominio]
      };

      // Tu implementación
    });

    it('debe rechazar [entidad] con [campo inválido específico]', async () => {
      // Test específico de tu dominio
    });
  });
});
```

**Entregable:**

- [ ] Tests unitarios para todas las entidades (min. 70% coverage)
- [ ] Tests de integración para flujos principales
- [ ] Tests de validaciones del dominio
- [ ] Reporte de coverage

---

### Semana 9: Proyecto Final + Docker Básico

**Objetivo General:** API completa + Containerización

**Tu Tarea Específica:**

1. Integrar todas las funcionalidades anteriores
2. Crear Dockerfile para tu aplicación
3. docker-compose.yml con tu API + PostgreSQL
4. README profesional con documentación completa
5. Demostración funcional del sistema completo

**Estructura Final:**

```
tu-dominio-api/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   ├── services/
│   └── utils/
├── tests/
├── prisma/
│   ├── schema.prisma
│   └── seeds/
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── README.md
└── package.json
```

**README debe incluir:**

- [ ] Descripción del dominio de negocio
- [ ] Diagrama de entidades (ERD)
- [ ] Instrucciones de instalación
- [ ] Documentación completa de API (endpoints)
- [ ] Ejemplos de uso con curl/Postman
- [ ] Variables de entorno necesarias
- [ ] Comandos Docker para ejecutar

**Entregable Final:**

- [ ] API completa funcional
- [ ] Contenedorizada con Docker
- [ ] Tests pasando exitosamente
- [ ] Documentación profesional
- [ ] Video/Demo de 5-10 min mostrando funcionalidades
- [ ] Código en GitHub con README completo

---

## ✅ Criterios de Evaluación Generales

### 1. **Adaptación al Dominio (30%)**

- ✅ Nombres de variables/funciones coherentes con tu dominio
- ✅ Estructura de datos apropiada al contexto
- ✅ Lógica de negocio consistente
- ✅ Datos de prueba realistas
- ❌ Uso de nombres genéricos o de otros dominios

### 2. **Comprensión Técnica (40%)**

- ✅ Implementación correcta de patrones
- ✅ Manejo apropiado de errores
- ✅ Código limpio y mantenible
- ✅ Best practices aplicadas
- ✅ Capacidad de explicar decisiones

### 3. **Completitud (20%)**

- ✅ Todas las funcionalidades solicitadas
- ✅ Tests con cobertura adecuada
- ✅ Documentación completa
- ✅ Configuraciones correctas

### 4. **Profesionalismo (10%)**

- ✅ Commits descriptivos y organizados
- ✅ README claro y completo
- ✅ Estructura de proyecto ordenada
- ✅ Código formateado consistentemente

---

## 🚫 Recordatorios Importantes

### ❌ NO hacer:

1. **NO copiar código de compañeros**

   - Cada dominio es diferente
   - Las implementaciones deben ser únicas
   - Detectaremos fácilmente nombres incoherentes

2. **NO compartir tu dominio públicamente**

   - Es tu asignación personal
   - Mantén la privacidad

3. **NO cambiar de dominio sin autorización**

   - El aprendizaje está en la adaptación
   - Cambios solo por razón técnica válida

4. **NO usar ejemplos genéricos en entregas**
   - Todo debe estar contextualizado
   - Nombres deben reflejar tu dominio

### ✅ SÍ hacer:

1. **SÍ consultar dudas técnicas**

   - Pregunta sobre conceptos
   - Pide aclaraciones sobre patrones
   - (Sin revelar código específico de tu dominio a compañeros)

2. **SÍ adaptar TODOS los ejemplos**

   - Cada línea de código debe usar tu contexto
   - Variables, funciones, endpoints, todo coherente

3. **SÍ demostrar comprensión**

   - Explica por qué tu código funciona
   - Justifica decisiones de diseño
   - Relaciona con tu dominio de negocio

4. **SÍ documentar apropiadamente**
   - Comentarios en tu idioma técnico
   - README con contexto de tu dominio
   - Ejemplos usando tus entidades

---

## 📞 Contacto y Soporte

### Para Dudas Técnicas:

- Usa canales oficiales del bootcamp
- Pregunta sobre **conceptos**, no código específico
- Consulta documentación general primero

### Para Problemas con tu Dominio:

- Contacta al instructor en privado
- Explica el problema específico
- Solo se permiten cambios por razones técnicas válidas

### Para Aclaraciones de Asignaciones:

- Revisa esta guía completa primero
- Consulta la semana específica
- Contacta instructor si persiste la duda

---

## 🎯 Objetivo Final

Al completar las 9 semanas, habrás desarrollado:

✅ **Una API REST completa y funcional** de tu dominio  
✅ **Comprensión profunda** de Express.js y Node.js  
✅ **Portfolio único** que demuestra tus habilidades  
✅ **Experiencia práctica** aplicando conceptos a contextos reales  
✅ **Proyecto profesional** para mostrar a empleadores

**¡Tu dominio es tu lienzo para demostrar lo que has aprendido!**

---

_Asignación Personal - Confidencial_  
_Bootcamp bc-express - 9 Semanas_  
_Generado: [FECHA]_

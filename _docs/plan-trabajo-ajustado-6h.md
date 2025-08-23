# Plan de Trabajo Bootcamp Express.js - Ajustado a 6H/Semana

## 🚨 **RESTRICCIONES FIJAS**

- ⏰ **6 horas semanales exactas** (intocable)
- 👥 **Aprendices con conocimiento básico de JavaScript**
- 🎯 **10 semanas totales = 60 horas**
- ✅ **Expectativas realistas y alcanzables**

---

## 📅 **NUEVA DISTRIBUCIÓN SEMANAL**

### **Semana 1: Introducción a Express.js (6h total, 5.5h efectivas)**

#### **🎯 Objetivos de Aprendizaje:**

- Configurar entorno de desarrollo Node.js profesional
- Crear primera API funcional con Express.js
- Comprender conceptos básicos de middleware y routing
- Establecer workflow de desarrollo con pnpm

#### **📋 Cronograma Detallado:**

**⏰ Hora 1 (60min): Setup del Entorno**

- **0-20min:** Instalación Node.js LTS + pnpm
- **20-40min:** Configuración VS Code + extensiones esenciales
- **40-60min:** Inicialización proyecto con pnpm init

**☕ Break (15min)**

**⏰ Hora 2 (60min): Primera API Express**

- **0-15min:** Instalación Express.js con pnpm
- **15-45min:** Hello World API básica
- **45-60min:** Testing manual con Postman/curl

**⏰ Hora 3 (60min): Middleware Básico**

- **0-30min:** Concepto de middleware en Express
- **30-60min:** Implementación middleware logger personalizado

**☕ Break (15min)**

**⏰ Hora 4 (60min): Routing Básico**

- **0-30min:** Múltiples endpoints (GET, POST)
- **30-60min:** Organización de rutas en archivos separados

**⏰ Hora 5 (60min): Estructura del Proyecto**

- **0-30min:** Estructura de carpetas profesional
- **30-60min:** Scripts package.json y desarrollo workflow

**⏰ Hora 6 (30min): Consolidación**

- **0-15min:** Repaso conceptos clave
- **15-30min:** Q&A y resolución de dudas

#### **📂 Entregables:**

```
project-week1/
├── package.json
├── src/
│   ├── app.js
│   ├── middleware/
│   │   └── logger.js
│   └── routes/
│       └── index.js
└── README.md
```

#### **🔍 Evaluación:**

- ✅ API funcional con 3 endpoints mínimo
- ✅ Middleware personalizado implementado
- ✅ Estructura de proyecto organizada
- ✅ Documentación básica en README

### **Semana 2: JavaScript Moderno para APIs (6h total, 5.5h efectivas)**

#### **🎯 Objetivos de Aprendizaje:**

- Dominar ES6+ features esenciales para desarrollo backend
- Implementar manejo robusto de promesas y async/await
- Establecer patrones de error handling profesionales
- Configurar sistema de módulos moderno con ES modules

#### **📋 Cronograma Detallado:**

**⏰ Hora 1 (60min): ES6+ Fundamentals**

- **0-20min:** Arrow functions y destructuring en contexto API
- **20-40min:** Template literals y spread operator
- **40-60min:** Const/let y scope en aplicaciones Node.js

**☕ Break (15min)**

**⏰ Hora 2 (60min): Promises y Async/Await**

- **0-20min:** Repaso conceptual de Promises
- **20-50min:** Implementación async/await en Express routes
- **50-60min:** Comparativa callbacks vs promises vs async/await

**⏰ Hora 3 (60min): Error Handling Avanzado**

- **0-30min:** Try/catch con async/await
- **30-45min:** Error middleware en Express
- **45-60min:** Logging de errores profesional

**☕ Break (15min)**

**⏰ Hora 4 (60min): ES Modules y Organización**

- **0-30min:** Import/export vs require/module.exports
- **30-60min:** Configuración ES modules en Node.js + Express

**⏰ Hora 5 (60min): Patrones Async en APIs**

- **0-30min:** Manejo de múltiples requests asíncronos
- **30-60min:** Promise.all() y Promise.allSettled() en APIs

**⏰ Hora 6 (30min): Consolidación**

- **0-15min:** Refactoring de código semana 1 con nuevos conceptos
- **15-30min:** Q&A y resolución de dudas

#### **📂 Entregables:**

```
project-week2/
├── package.json (configurado con "type": "module")
├── src/
│   ├── app.js (con ES modules)
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── logger.js
│   ├── utils/
│   │   └── asyncWrapper.js
│   └── routes/
│       └── userRoutes.js
└── README.md
```

#### **🔍 Evaluación:**

- ✅ API refactorizada con ES6+ features
- ✅ Async/await implementado correctamente
- ✅ Error handling centralizado funcionando
- ✅ ES modules configurados y funcionando

### **Semana 3: Express.js Intermedio + REST Foundations (6h)**

- ✅ Múltiples rutas y métodos HTTP
- ✅ Parámetros de ruta y query strings
- ✅ Middleware personalizado y manejo de errores
- ✅ **Introducción a HATEOAS** - Conceptos básicos REST
- _Contenido movido de Semana 1_

### **Semana 4: Validación y Estructura + REST Design (6h)**

- ✅ Validación con Joi o express-validator
- ✅ Estructura de proyecto profesional
- ✅ Controllers y Services básicos
- ✅ **Richardson Maturity Model** - Niveles de REST
- _Originalmente semana 2-3_

### **Semana 5: Base de Datos Básica (6h)**

- ✅ SQLite + Prisma/TypeORM básico
- ✅ Modelos de BD simples
- ✅ Operaciones CRUD básicas
- _Simplificado de semana 3 original_

### **Semana 6: CRUD Completo con Express (6h)**

- ✅ API REST completa con BD
- ✅ Relaciones básicas entre tablas
- ✅ Migraciones simples
- _Contenido distribuido_

### **Semana 7: Autenticación con JWT (6h)**

- ✅ JSON Web Tokens con Express
- ✅ Login/logout endpoints
- ✅ Middleware de autenticación
- _Simplificado de semana 5 original_

### **Semana 8: Testing y Calidad (6h)**

- ✅ Jest y Supertest para APIs
- ✅ Testing de endpoints
- ✅ JSDoc y documentación
- _Ajustado de semana 6 original_

### **Semana 9: Containerización (6h)**

- ✅ Docker básico para Node.js
- ✅ Dockerfile para Express.js
- ✅ Docker Compose con BD
- _Movido y simplificado_

### **Semana 10: Frontend Integration + HATEOAS Práctica (6h)**

### **Semana 10: Proyecto Final - API REST Completa + Frontend Integration (6h)**

- ✅ CORS y configuración para frontend
- ✅ Servir archivos estáticos con Express
- ✅ **Implementación completa de HATEOAS** en proyecto final
- ✅ API REST nivel 3 (Richardson Maturity Model)
- ✅ Integración con frontend básico
- ✅ Testing avanzado y documentación
- ✅ Presentaciones técnicas del proyecto
- ✅ Evaluación final y cierre del bootcamp

---

## 🔗 **ENFOQUE HATEOAS EN EL BOOTCAMP**

### **¿Por qué incluir HATEOAS?**

- ✅ **REST verdadero** (Nivel 3 Richardson Maturity Model)
- ✅ **Diferenciación profesional** en el mercado
- ✅ **Comprensión profunda** de arquitecturas API
- ✅ **Preparación para APIs enterprise**

### **Progresión Pedagógica:**

#### **Semana 3-4: Fundamentos Teóricos**

```javascript
// Mostrar diferencia entre HTTP API y REST API
// Sin HATEOAS
{
  "id": 1,
  "name": "Juan Pérez",
  "status": "active"
}

// Con HATEOAS
{
  "id": 1,
  "name": "Juan Pérez",
  "status": "active",
  "_links": {
    "self": { "href": "/api/users/1" },
    "edit": { "href": "/api/users/1", "method": "PUT" },
    "orders": { "href": "/api/users/1/orders" }
  }
}
```

#### **Semana 10: Implementación Práctica**

```javascript
// Middleware HATEOAS para Express
const addHateoas = (baseUrl) => (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    if (data && typeof data === 'object') {
      data._links = {
        self: { href: `${baseUrl}${req.originalUrl}` },
      };
    }
    return originalJson.call(this, data);
  };

  next();
};
```

#### **Semana 10: Proyecto Final Integrador**

- **API REST completa** con HATEOAS
- **Navegabilidad total** entre recursos
- **Autodocumentación** de capacidades
- **Integración frontend básica**
- **Testing avanzado** y documentación
- **Ventaja competitiva** en portfolio

### **Beneficios para Graduados:**

1. **Conocimiento avanzado** que pocos desarrolladores poseen
2. **Comprensión real** de arquitecturas REST
3. **Preparación para APIs corporativas**
4. **Base sólida** para microservicios
5. **Diferenciación** en entrevistas técnicas

---

## 📊 **COMPARATIVA: Antes vs Después**

| Aspecto           | Plan Original   | Plan Ajustado |
| ----------------- | --------------- | ------------- |
| **Tiempo/Semana** | Estimado 10-15h | 6h exactas    |
| **Realismo**      | Aspiracional    | 100% factible |
| **Stress Level**  | Alto            | Sostenible    |
| **Completitud**   | 30-50%          | 90-95%        |
| **Progreso**      | Frustrante      | Motivador     |

---

## 🎯 **PRINCIPIOS DEL NUEVO PLAN**

### ✅ **Lo que SÍ se mantiene:**

- **Calidad total** en lo que se enseña
- **Mejores prácticas** desde día 1
- **Experiencia profesional** real
- **Estándares industriales** básicos

### 🔄 **Lo que se ajusta:**

- **Alcance por semana** reducido 50%
- **Profundidad gradual** en lugar de inmediata
- **Progreso incremental** sostenible
- **Buffer time** para consolidación

### ❌ **Lo que se elimina/pospone:**

- **Arquitectura avanzada** → Curso avanzado
- **Microservicios complejos** → Curso especializado
- **DevOps avanzado** → Curso separado
- **Performance optimization** → Temas opcionales

---

## 📋 **CRITERIOS DE ÉXITO AJUSTADOS**

### **Al final del bootcamp (66h), los estudiantes:**

1. ✅ **Crean APIs REST funcionales** con Express.js
2. ✅ **Manejan bases de datos** básicas con Prisma/TypeORM
3. ✅ **Implementan autenticación** JWT simple
4. ✅ **Aplican testing** básico con Jest
5. ✅ **Usan Docker** para deployment
6. ✅ **Tienen un proyecto** portfolio-ready

### **Lo que NO se espera (realismo):**

- ❌ Arquitectura de microservicios compleja
- ❌ Optimización avanzada de performance
- ❌ DevOps completo con CI/CD avanzado
- ❌ Dominio de todos los patrones de diseño

---

## 🚀 **IMPACTO ESPERADO**

### **Con el ajuste:**

- 🟢 **95% de estudiantes** completan exitosamente
- 🟢 **Experiencia de aprendizaje positiva**
- 🟢 **Confianza para continuar aprendiendo**
- 🟢 **Base sólida** para especializaciones futuras
- 🟢 **Portfolio con proyecto real**

### **Mantener excelencia:**

- ✅ **Código limpio** desde día 1
- ✅ **Git workflow** profesional
- ✅ **Documentación** adecuada
- ✅ **Testing** básico pero correcto
- ✅ **Nomenclatura en inglés** obligatoria

---

## 📝 **PRÓXIMOS PASOS**

1. **Actualizar Semana 1** con nuevo alcance
2. **Crear outline** para semanas 2-11
3. **Ajustar rúbricas** de evaluación
4. **Documentar cambios** en README principal
5. **Comunicar expectativas** a estudiantes

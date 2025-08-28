# 📚 Semana 5: Base de Datos Básica con Express.js

## 🎯 Objetivos de la Semana

### Objetivo General
Integrar una base de datos SQLite con Express.js utilizando Prisma para operaciones CRUD básicas

### Objetivos Específicos
- [ ] **Configurar Prisma ORM** con SQLite en proyecto Express.js
- [ ] **Diseñar modelos de datos** simples y efectivos
- [ ] **Implementar operaciones CRUD básicas** (Create, Read, Update, Delete)
- [ ] **Manejar conexiones a BD** de forma segura y eficiente

## ⏰ Cronograma de 6 Horas (5.5h efectivas)

| Tiempo | Actividad | Duración | Acumulado |
|--------|-----------|----------|-----------|
| 12:00-13:00 | Setup Prisma + SQLite | 60 min | 60 min |
| 13:00-13:15 | **☕ BREAK** | 15 min | 75 min |
| 13:15-14:30 | Modelos y Migraciones | 75 min | 150 min |
| 14:30-15:30 | CRUD - Create & Read | 60 min | 210 min |
| 15:30-15:45 | **☕ BREAK** | 15 min | 225 min |
| 15:45-16:45 | CRUD - Update & Delete | 60 min | 285 min |
| 16:45-18:00 | Integración y Testing | 75 min | 360 min |

**Total**: 6 horas exactas (330 min efectivos + 30 min breaks)

## 📋 Contenidos Detallados

### 🧠 **1. Teoría (Integrada en práctica)**
- **¿Qué es un ORM?** Conceptos básicos de Prisma
- **Modelos relacionales** vs modelos de datos
- **Migrations** y evolución de esquemas
- **Conexiones a BD** y pools de conexiones

### 💻 **2. Práctica Paso a Paso**
- **Setup inicial**: Instalación y configuración Prisma
- **Primer modelo**: Usuario básico
- **Migraciones**: Creación y aplicación
- **Endpoints CRUD**: Implementación gradual

### 🏋️ **3. Ejercicios Progresivos**
- **Ejercicio 1**: Modelo adicional (Posts)
- **Ejercicio 2**: Relación User-Posts
- **Ejercicio 3**: Validación de datos
- **Ejercicio 4**: Error handling con BD

### 🎯 **4. Proyecto Integrador**
- **API de Blog Básico**: Sistema completo con usuarios y posts
- **Base de datos SQLite**: Configurada y funcional
- **Endpoints RESTful**: CRUD completo
- **Testing básico**: Verificación de funcionalidad

## 🎯 Expectativas Realistas (6 horas)

### ✅ **Lo que SÍ vamos a lograr:**
- ✅ **Prisma configurado** y funcionando con SQLite
- ✅ **2 modelos básicos** (User, Post) con relación
- ✅ **API CRUD funcional** para ambos modelos
- ✅ **Error handling básico** para operaciones de BD
- ✅ **Testing manual** con Postman/curl
- ✅ **Proyecto funcional** con base de datos persistente

### ⚠️ **Lo que NO incluimos (por tiempo):**
- ❌ Optimización avanzada de queries
- ❌ Migraciones complejas
- ❌ Relaciones many-to-many
- ❌ Transacciones avanzadas
- ❌ Testing automatizado completo
- ❌ Seeding de datos masivos

## 🛠️ Stack Tecnológico

```json
{
  "runtime": "Node.js 22 LTS",
  "framework": "Express.js 4.18+",
  "database": "SQLite 3.x",
  "orm": "Prisma 5.x",
  "tools": ["pnpm", "Postman", "VS Code"],
  "testing": "Manual (curl/Postman)"
}
```

## 🏆 Entregables

### 📁 **Estructura del Proyecto**
```
semana5-blog-api/
├── package.json
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── dev.db (SQLite file)
├── src/
│   ├── app.js
│   ├── routes/
│   │   ├── users.js
│   │   └── posts.js
│   └── middleware/
│       └── errorHandler.js
└── README.md
```

### ✅ **Criterios de Evaluación**
- **Configuración Prisma (25%)**: Schema, conexión, migraciones
- **Modelos de datos (25%)**: User, Post, relación correcta
- **API funcional (35%)**: Todos los endpoints CRUD trabajando
- **Documentación (15%)**: README con instrucciones claras

### 🎯 **Entrega**
- **Repositorio GitHub**: `ficha-apellido-nombre-semana5-db`
- **Demo en vivo**: API funcionando con datos persistentes
- **Plazo**: Final de la clase (18:00h)

## 🚀 Preparación Previa

### ✅ **Requisitos (verificar antes de iniciar)**
- Node.js 22 LTS instalado
- pnpm configurado
- VS Code con extensiones Prisma
- Conocimientos previos: Express.js básico (semanas 1-4)

### 📚 **Recursos de Apoyo**
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)
- [SQLite Documentation](https://sqlite.org/docs.html)
- [Express.js Database Integration](https://expressjs.com/en/guide/database-integration.html)

---

## 📝 Notas Importantes

> ⚠️ **Enfoque práctico**: 80% hands-on, 20% teoría
> 
> 🎯 **Expectativa realista**: Blog API básico pero funcional
> 
> ⏰ **Gestión de tiempo**: Cronograma estricto, breaks obligatorios
> 
> 🤝 **Colaboración**: Trabajo en parejas permitido para debugging

---

*Semana 5 - Express.js Bootcamp | Base de Datos Básica*

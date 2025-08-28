# Rúbrica de Evaluación - Semana 5: Base de Datos Básica

## 🎯 Base de Datos Básica con Express.js + Prisma

### Criterios de Evaluación (100 puntos totales)

#### 1. CONFIGURACIÓN PRISMA Y SETUP (25 puntos)

**Excelente (23-25 pts)**

- ✅ Prisma correctamente instalado y configurado
- ✅ SQLite conexión funcionando perfectamente
- ✅ Schema.prisma bien estructurado
- ✅ Migraciones aplicadas sin errores
- ✅ Variables de entorno configuradas

**Bueno (18-22 pts)**

- ✅ Prisma instalado con configuración básica
- ✅ SQLite funcionando con problemas menores
- ✅ Schema básico implementado
- ⚠️ Algunas migraciones con warnings
- ✅ Configuración parcialmente correcta

**Suficiente (13-17 pts)**

- ⚠️ Prisma instalado pero configuración incompleta
- ⚠️ SQLite con errores ocasionales
- ⚠️ Schema mínimo pero funcional
- ❌ Problemas con migraciones
- ⚠️ Configuración básica

**Insuficiente (0-12 pts)**

- ❌ Prisma no instalado o mal configurado
- ❌ SQLite no funciona
- ❌ Schema incorrecto o ausente
- ❌ No hay migraciones
- ❌ Sin configuración adecuada

#### 2. MODELOS DE DATOS (25 puntos)

**Excelente (23-25 pts)**

- ✅ Modelo User completo y bien estructurado
- ✅ Modelo Post con todos los campos requeridos
- ✅ Relación User-Post correctamente implementada
- ✅ Tipos de datos apropiados
- ✅ Validaciones a nivel de schema

**Bueno (18-22 pts)**

- ✅ Modelos básicos implementados
- ✅ Relación funcionando
- ⚠️ Algunos campos podrían mejorarse
- ✅ Tipos de datos correctos
- ⚠️ Validaciones básicas

**Suficiente (13-17 pts)**

- ⚠️ Modelos mínimos funcionando
- ⚠️ Relación básica implementada
- ⚠️ Faltan algunos campos importantes
- ⚠️ Tipos de datos básicos
- ❌ Sin validaciones

**Insuficiente (0-12 pts)**

- ❌ Modelos mal implementados
- ❌ Relaciones incorrectas o ausentes
- ❌ Campos esenciales faltantes
- ❌ Tipos de datos incorrectos
- ❌ No hay estructura clara

#### 3. API CRUD FUNCIONAL (35 puntos)

**Excelente (32-35 pts)**

- ✅ Todos los endpoints CRUD funcionando (Users + Posts)
- ✅ Códigos de estado HTTP correctos
- ✅ Validación de datos en endpoints
- ✅ Error handling apropiado
- ✅ Respuestas JSON bien estructuradas
- ✅ Filtros y consultas básicas

**Bueno (25-31 pts)**

- ✅ CRUD básico funcionando
- ✅ Códigos de estado correctos
- ⚠️ Validación parcial
- ✅ Error handling básico
- ✅ JSON responses funcionales
- ⚠️ Consultas básicas

**Suficiente (18-24 pts)**

- ⚠️ CRUD mínimo funcionando
- ⚠️ Algunos códigos de estado incorrectos
- ❌ Sin validación adecuada
- ⚠️ Error handling mínimo
- ⚠️ Responses básicas
- ❌ Sin consultas adicionales

**Insuficiente (0-17 pts)**

- ❌ CRUD no funciona o incompleto
- ❌ Códigos de estado incorrectos
- ❌ Sin validación
- ❌ Sin manejo de errores
- ❌ Responses mal estructuradas
- ❌ API no funcional

#### 4. DOCUMENTACIÓN Y ENTREGA (15 puntos)

**Excelente (14-15 pts)**

- ✅ README completo con instrucciones claras
- ✅ Documentación de endpoints
- ✅ Instrucciones de setup detalladas
- ✅ Ejemplos de uso incluidos
- ✅ Entrega puntual y organizada

**Bueno (11-13 pts)**

- ✅ README básico pero funcional
- ⚠️ Documentación parcial de endpoints
- ✅ Instrucciones de setup
- ⚠️ Algunos ejemplos incluidos
- ✅ Entrega a tiempo

**Suficiente (8-10 pts)**

- ⚠️ README mínimo
- ⚠️ Documentación básica
- ⚠️ Instrucciones incompletas
- ❌ Sin ejemplos claros
- ⚠️ Entrega con retraso menor

**Insuficiente (0-7 pts)**

- ❌ Sin README o muy deficiente
- ❌ Sin documentación
- ❌ Sin instrucciones
- ❌ Sin ejemplos
- ❌ Entrega tardía o incompleta

### 🎯 Entregables Específicos

#### ✅ **Requisitos Obligatorios**

1. **Repositorio GitHub**: `ficha-apellido-nombre-semana5-db`
2. **Estructura de proyecto**: Según especificación
3. **Base de datos**: SQLite con datos de prueba
4. **API funcionando**: Demo en vivo durante evaluación
5. **README**: Con instrucciones completas de setup

#### 📋 **Lista de Verificación para Estudiantes**

- [ ] Prisma instalado y configurado
- [ ] Modelos User y Post creados
- [ ] Migraciones aplicadas
- [ ] Endpoints CRUD funcionando:
  - [ ] GET /users (listar usuarios)
  - [ ] POST /users (crear usuario)
  - [ ] GET /users/:id (obtener usuario)
  - [ ] PUT /users/:id (actualizar usuario)
  - [ ] DELETE /users/:id (eliminar usuario)
  - [ ] GET /posts (listar posts)
  - [ ] POST /posts (crear post)
  - [ ] GET /posts/:id (obtener post)
  - [ ] PUT /posts/:id (actualizar post)
  - [ ] DELETE /posts/:id (eliminar post)
- [ ] Error handling implementado
- [ ] README con instrucciones
- [ ] Repositorio subido a GitHub

### 📊 Escala de Calificación Final

- **90-100 pts**: **Excelente** - Dominio completo de BD básica
- **80-89 pts**: **Bueno** - Comprende conceptos, implementación sólida
- **70-79 pts**: **Suficiente** - Conceptos básicos, necesita mejoras
- **0-69 pts**: **Insuficiente** - Requiere refuerzo en BD

### ⏰ Cronograma de Evaluación

| Tiempo      | Actividad                       | Tipo       |
| ----------- | ------------------------------- | ---------- |
| 17:30-17:45 | Revisión de repositorios        | Individual |
| 17:45-18:00 | Demos en vivo (3-4 estudiantes) | Grupal     |
| 18:00+      | Feedback y notas                | Individual |

---

_Semana 5 - Base de Datos Básica | Rúbrica de Evaluación_

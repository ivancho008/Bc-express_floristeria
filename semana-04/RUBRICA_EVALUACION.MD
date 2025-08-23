# Rúbrica de Evaluación - Semana 4

## 🎯 Validación y Estructura + REST Design

### Información General

- **Tema**: Implementación de validación robusta y estructura profesional
- **Duración**: 6 horas (5.5h efectivas)
- **Tipo**: Evaluación práctica con proyecto integrador
- **Peso**: 100 puntos totales

### Proyecto Evaluado

**API de Gestión de Tareas** con validación completa, estructura Controllers/Services y manejo de errores centralizado.

---

## 📊 Criterios de Evaluación

### 1. FUNCIONALIDAD API (30 puntos)

#### Excelente (26-30 pts)
- ✅ Todos los endpoints CRUD funcionando perfectamente
- ✅ Respuestas HTTP correctas (200, 201, 404, 400, 500)
- ✅ API totalmente funcional sin errores

#### Bueno (21-25 pts)
- ✅ 4-5 endpoints funcionando
- ✅ Mayoría de respuestas HTTP correctas
- ⚠️ Errores menores que no afectan funcionalidad principal

#### Suficiente (15-20 pts)
- ⚠️ 3-4 endpoints básicos funcionando
- ⚠️ Algunas respuestas HTTP incorrectas
- ⚠️ Funcionalidad limitada pero operativa

#### Insuficiente (0-14 pts)
- ❌ Menos de 3 endpoints funcionando
- ❌ Respuestas HTTP inconsistentes
- ❌ API no funcional o con errores críticos

### 2. VALIDACIÓN CON JOI (25 puntos)

#### Excelente (23-25 pts)
- ✅ Joi correctamente instalado y configurado
- ✅ Schemas de validación completos y bien definidos
- ✅ Middleware de validación implementado en todos los endpoints
- ✅ Mensajes de error informativos y claros

#### Bueno (18-22 pts)
- ✅ Joi configurado correctamente
- ✅ Schemas básicos implementados
- ⚠️ Validación en la mayoría de endpoints
- ⚠️ Mensajes de error genéricos

#### Suficiente (13-17 pts)
- ⚠️ Joi parcialmente configurado
- ⚠️ Schemas básicos con validaciones mínimas
- ⚠️ Validación solo en algunos endpoints
- ⚠️ Mensajes de error poco informativos

#### Insuficiente (0-12 pts)
- ❌ Joi no instalado o mal configurado
- ❌ Schemas incompletos o incorrectos
- ❌ Validación ausente o no funcionando
- ❌ Sin manejo de errores de validación

### 3. ESTRUCTURA CONTROLLERS/SERVICES (20 puntos)

#### Excelente (18-20 pts)
- ✅ Separación clara entre Controllers y Services
- ✅ Controllers enfocados solo en HTTP
- ✅ Services contienen lógica de negocio
- ✅ Estructura de carpetas profesional y organizada

#### Bueno (14-17 pts)
- ✅ Separación básica Controllers/Services
- ✅ Mayoría de lógica correctamente ubicada
- ⚠️ Organización de carpetas aceptable
- ⚠️ Algunas responsabilidades mezcladas

#### Suficiente (10-13 pts)
- ⚠️ Intento de separación Controllers/Services
- ⚠️ Lógica parcialmente organizada
- ⚠️ Estructura de carpetas básica
- ⚠️ Responsabilidades poco claras

#### Insuficiente (0-9 pts)
- ❌ Sin separación Controllers/Services
- ❌ Lógica mezclada sin organización
- ❌ Estructura de proyecto desorganizada
- ❌ Responsabilidades no definidas

### 4. ERROR HANDLING CENTRALIZADO (15 puntos)

#### Excelente (14-15 pts)
- ✅ Middleware de error handling centralizado
- ✅ Manejo consistente de todos los tipos de errores
- ✅ Respuestas de error estructuradas y útiles
- ✅ Logging básico de errores

#### Bueno (11-13 pts)
- ✅ Error handling básico centralizado
- ✅ Manejo de la mayoría de errores
- ⚠️ Respuestas de error genéricas pero consistentes
- ⚠️ Logging mínimo

#### Suficiente (8-10 pts)
- ⚠️ Error handling parcialmente centralizado
- ⚠️ Manejo inconsistente de errores
- ⚠️ Respuestas de error básicas
- ⚠️ Sin logging

#### Insuficiente (0-7 pts)
- ❌ Sin error handling centralizado
- ❌ Errores no manejados o inconsistentes
- ❌ Respuestas de error inexistentes o confusas
- ❌ API falla ante errores

### 5. DOCUMENTACIÓN Y ENTREGA (10 puntos)

#### Excelente (9-10 pts)
- ✅ README completo con instrucciones claras
- ✅ Documentación de endpoints
- ✅ Código bien comentado y limpio
- ✅ Ejemplos de uso incluidos

#### Bueno (7-8 pts)
- ✅ README básico con instrucciones
- ✅ Documentación mínima de endpoints
- ⚠️ Código parcialmente comentado
- ⚠️ Ejemplos limitados

#### Suficiente (5-6 pts)
- ⚠️ README muy básico
- ⚠️ Documentación mínima o ausente
- ⚠️ Código sin comentarios
- ⚠️ Sin ejemplos de uso

#### Insuficiente (0-4 pts)
- ❌ Sin README o documentación
- ❌ Código sin comentarios
- ❌ No se puede ejecutar el proyecto
- ❌ Entrega incompleta

---

## 🎁 Puntos Bonus (Máximo +15 pts)

- **Middleware personalizado adicional**: +5 pts
- **Logging básico implementado**: +3 pts
- **Tests básicos con Jest**: +5 pts
- **Documentación Swagger/OpenAPI**: +10 pts
- **Implementación Richardson Nivel 2 completo**: +5 pts

*Nota: Los puntos bonus no pueden elevar la calificación por encima de 100 pts*

---

## 📋 Escala de Calificación Final

| Rango | Calificación | Descripción |
|-------|--------------|-------------|
| **90-100 pts** | **Excelente** | Dominio completo de validación y estructura |
| **80-89 pts** | **Bueno** | Conocimiento sólido con implementación correcta |
| **70-79 pts** | **Suficiente** | Conceptos básicos aplicados adecuadamente |
| **60-69 pts** | **Deficiente** | Conocimientos incompletos, requiere refuerzo |
| **0-59 pts** | **Insuficiente** | No cumple objetivos mínimos |

---

## 🚀 Entrega y Formato

### Requisitos de Entrega

1. **Repositorio GitHub** público con nombre: `semana4-validacion-[apellido]`
2. **Código fuente** completo y funcional
3. **README.md** con instrucciones de instalación y uso
4. **Demo en vivo** durante la clase (5 min máximo)

### Fecha Límite

**Al final de la clase de 6 horas** - No hay extensiones

### Proceso de Evaluación

1. **Revisión de código** (automática y manual)
2. **Testing funcional** de la API
3. **Evaluación de estructura** y organización
4. **Demo en vivo** del proyecto funcionando

---

*Semana 4 - Rúbrica de Evaluación - Bootcamp Express.js*

# RÚBRICA DE EVALUACIÓN - SEMANA 1

## Express.js Fundamentals

### INFORMACIÓN GENERAL

- **Semana**: 1
- **Tema**: Express.js Fundamentals - Environment Setup & First API
- **Duración**: 6 horas (incluye break de 30 min)
- **Modalidad**: Evaluación automática por IA + revisión manual

### CRITERIOS DE EVALUACIÓN

#### 1. SETUP DEL ENTORNO (25 puntos)

**Evidencia requerida**: Archivo `package.json` y entorno funcional

| Criterio                 | Excelente (5pts)                                  | Bueno (4pts)                        | Suficiente (3pts)                | Insuficiente (0pts)                 |
| ------------------------ | ------------------------------------------------- | ----------------------------------- | -------------------------------- | ----------------------------------- |
| **Node.js Environment**  | Node.js LTS instalado y funcionando correctamente | Node.js instalado con documentación | Node.js funcional básico         | No hay Node.js instalado            |
| **Package Management**   | package.json completo con pnpm configurado        | package.json básico con pnpm        | Dependencias instaladas sin pnpm | No hay gestión de paquetes con pnpm |
| **Express Installation** | Express.js instalado y funcionando                | Express instalado correctamente     | Instalación básica funcional     | Express no instalado                |
| **Testing Tools**        | Postman/Thunder Client configurado                | Herramienta de testing disponible   | Browser testing únicamente       | No hay herramientas de testing      |
| **Documentation**        | README con setup detallado                        | README básico con instrucciones     | Documentación mínima             | Sin documentación                   |

#### 2. HELLO EXPRESS.JS API (25 puntos)

**Evidencia requerida**: Archivo `app.js` con API básica funcionando

| Criterio                      | Excelente (5pts)                            | Bueno (4pts)                      | Suficiente (3pts)                | Insuficiente (0pts)       |
| ----------------------------- | ------------------------------------------- | --------------------------------- | -------------------------------- | ------------------------- |
| **Express App Creation**      | App inicializada con configuraciones        | App inicializada correctamente    | App básica funcional             | App no inicializada       |
| **Hello Express.js Endpoint** | GET / con respuesta personalizada           | GET / funcional                   | Endpoint básico funcional        | Endpoint no funciona      |
| **Additional Endpoints**      | GET /hello/:name + POST /data implementados | Endpoints adicionales funcionales | Intento de endpoints adicionales | Sin endpoints adicionales |
| **Server Startup**            | Servidor corriendo sin errores              | Servidor funcional                | Servidor inicia con warnings     | Servidor no inicia        |
| **Response Format**           | JSON bien formateado y consistente          | Respuestas JSON válidas           | Respuestas básicas               | Respuestas malformadas    |

#### 3. MIDDLEWARE Y TESTING (25 puntos)

**Evidencia requerida**: Middleware implementado y capturas de testing

| Criterio                | Excelente (5pts)                               | Bueno (4pts)                    | Suficiente (3pts)        | Insuficiente (0pts)             |
| ----------------------- | ---------------------------------------------- | ------------------------------- | ------------------------ | ------------------------------- |
| **Custom Middleware**   | Middleware logger personalizado implementado   | Middleware básico funcional     | Intento de middleware    | No hay middleware personalizado |
| **Manual Testing**      | Múltiples endpoints testeados con Postman/curl | Endpoints principales testeados | Testing básico realizado | Documentación no accesible      |
| **Error Handling**      | Manejo básico de errores 404                   | Algunos errores manejados       | Errores reconocidos      | Sin manejo de errores           |
| **Response Validation** | Respuestas validadas y documentadas            | Respuestas verificadas          | Verificación básica      | Sin validación                  |
| **Project Structure**   | Estructura organizada en carpetas              | Archivos organizados            | Estructura básica        | Sin organización                |

#### 4. ENTREGABLES (15 puntos)

**Evidencia requerida**: Repositorio GitHub con código y documentación

| Criterio                 | Excelente (3pts)                              | Bueno (2pts)                  | Suficiente (1pt)            | Insuficiente (0pts)         |
| ------------------------ | --------------------------------------------- | ----------------------------- | --------------------------- | --------------------------- |
| **GitHub Repository**    | Repo bien organizado con commits descriptivos | Repo funcional con código     | Código subido básicamente   | Sin repositorio             |
| **README Documentation** | README completo con instrucciones de uso      | README con información básica | README mínimo               | Sin README                  |
| **Code Organization**    | Código limpio y bien comentado                | Código organizado             | Código funcional básico     | Código desorganizado        |
| **Package Management**   | package.json completo y actualizado           | package.json básico           | Lista de dependencias       | Sin gestión de dependencias |
| **Delivery Timeliness**  | Entregado a tiempo con calidad                | Entregado a tiempo            | Entregado con retraso menor | Entregado fuera de plazo    |

#### 5. COMPRENSIÓN CONCEPTUAL (10 puntos)

**Evidencia requerida**: Reflexión escrita en README o comentarios en código

| Criterio                     | Excelente (2pts)                         | Bueno (1.5pts)                   | Suficiente (1pt)         | Insuficiente (0pts)        |
| ---------------------------- | ---------------------------------------- | -------------------------------- | ------------------------ | -------------------------- |
| **Express.js Understanding** | Comprende ventajas y conceptos básicos   | Entiende propósito de Express.js | Conocimiento básico      | No demuestra comprensión   |
| **API Concepts**             | Explica qué es una API y REST básico     | Comprende concepto de API        | Conocimiento superficial | Sin comprensión conceptual |
| **HTTP Methods**             | Entiende GET y diferencias básicas       | Conoce método GET                | Uso básico de HTTP       | Sin comprensión HTTP       |
| **Development Process**      | Reflexiona sobre proceso de desarrollo   | Documenta pasos seguidos         | Menciona experiencia     | Sin reflexión              |
| **Next Steps**               | Identifica próximos pasos de aprendizaje | Muestra interés en continuar     | Comprende progresión     | Sin visión de continuidad  |

### ESCALA DE CALIFICACIÓN

- **Excelente (90-100 pts)**: Dominio completo de conceptos fundamentales
- **Bueno (80-89 pts)**: Comprensión sólida con implementación correcta
- **Suficiente (70-79 pts)**: Conceptos básicos logrados, necesita refuerzo
- **Insuficiente (0-69 pts)**: Requiere repetir contenidos fundamentales

### CRITERIOS DE APROBACIÓN

- **Mínimo para aprobar**: 70 puntos (70%)
- **Entregables obligatorios**:
  - API funcionando con al menos 1 endpoint
  - Código en GitHub
  - README con instrucciones básicas

### RETROALIMENTACIÓN AUTOMÁTICA

**Para el agente evaluador de IA:**

#### Puntos de verificación automática:

1. **Estructura de archivos**: Verificar existencia de app.js, package.json, README.md
2. **Sintaxis de código**: Validar que el código de JavaScript es sintácticamente correcto
3. **Importaciones**: Verificar que Express está importado correctamente
4. **Endpoints**: Confirmar que existe al menos un endpoint GET funcional
5. **Documentación**: Verificar que README contiene información básica del proyecto

#### Indicadores de calidad:

- Uso de nombres descriptivos en funciones y variables
- Comentarios explicativos en código complejo
- Estructura consistente en respuestas JSON
- Manejo de casos básicos (rutas, parámetros)

#### Señales de alarma para revisión manual:

- Código excesivamente complejo para el nivel
- Uso de librerías no enseñadas en la semana
- Falta de documentación mínima
- Errores de sintaxis o imports faltantes
- Entrega incompleta o fuera de especificaciones

### RECURSOS PARA ESTUDIANTES

- Documentación oficial Express.js: https://expressjs.com/
- Guía de setup de entorno de la semana
- Ejemplos de código proporcionados en prácticas
- Canal de ayuda para dudas técnicas

**Fecha de creación**: 25 de julio de 2025  
**Versión**: 1.0  
**Próxima revisión**: Al finalizar implementación del bootcamp

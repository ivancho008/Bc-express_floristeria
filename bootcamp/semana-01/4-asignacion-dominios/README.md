# 📋 Asignaciones de Dominios - Semana 01

**⚠️ CARPETA PRIVADA - SOLO INSTRUCTOR**

Esta carpeta contiene las asignaciones personalizadas de dominios para cada aprendiz.

---

## 🚫 IMPORTANTE

### **NUNCA subir a GitHub:**

- ❌ Archivos `aprendiz-*.md` (asignaciones personalizadas)
- ❌ Listados de asignaciones
- ❌ Cualquier archivo que relacione nombre de aprendiz con dominio

### **SÍ mantener en git:**

- ✅ Este archivo `README.md` (guía del instructor)
- ✅ `TEMPLATE.md` (plantilla para generar asignaciones)
- ✅ `.gitkeep` (para mantener la estructura de carpetas)

---

## 📁 Contenido de esta Carpeta

```
4-asignacion-dominios/
├── README.md           # Este archivo (guía del instructor)
├── TEMPLATE.md         # Plantilla para generar asignaciones
├── .gitkeep           # Mantiene la carpeta en git
├── aprendiz-001.md    # ⚠️ PRIVADO - No subir a git
├── aprendiz-002.md    # ⚠️ PRIVADO - No subir a git
├── aprendiz-003.md    # ⚠️ PRIVADO - No subir a git
└── ...                # Más asignaciones privadas
```

---

## 🎯 Propósito

Cada archivo `aprendiz-XXX.md` contiene:

1. **Dominio asignado** único y personalizado
2. **Descripción del dominio** de negocio
3. **Entidades principales** del dominio
4. **Relaciones típicas** entre entidades
5. **Adaptaciones por semana** de cada práctica
6. **Criterios de evaluación** específicos

---

## 🔧 Cómo Usar

### 1. Generar Asignaciones (Pre-Bootcamp)

```bash
# Desde la raíz del proyecto
cd _scripts/utilities
node assign-domains.js

# Esto creará archivos individuales automáticamente
```

### 2. Entregar Asignación (Inicio Bootcamp)

```markdown
Opción A: Email privado

- Enviar archivo `aprendiz-XXX.md` por correo
- Asunto: "Asignación Personal - Bootcamp bc-express"

Opción B: Mensaje directo

- Compartir contenido vía plataforma LMS
- Marcar como "Confidencial"

Opción C: Reunión 1:1

- Entregar físicamente o por pantalla compartida
- NO dejar registro público
```

### 3. Recordatorios Durante el Bootcamp

```markdown
Semanalmente recordar:

- "Adapten todos los ejemplos a SU dominio asignado"
- "No compartan su dominio con compañeros"
- "Todas las entregas deben usar su contexto personal"
```

---

## ✅ Checklist del Instructor

### Antes del Bootcamp:

- [ ] Contar número exacto de aprendices
- [ ] Ejecutar script de asignación aleatoria
- [ ] Verificar que no hay dominios repetidos
- [ ] Crear carpeta `4-asignacion-dominios/` en cada semana
- [ ] Verificar que `.gitignore` protege archivos privados
- [ ] Preparar correos/mensajes de entrega

### Inicio del Bootcamp:

- [ ] Enviar asignaciones privadas a cada aprendiz
- [ ] Explicar la política anticopia en clase
- [ ] Aclarar dudas sobre adaptación al dominio
- [ ] Verificar que aprendices entendieron su dominio

### Durante el Bootcamp:

- [ ] Usar lenguaje genérico en clases
- [ ] NUNCA mencionar dominios específicos
- [ ] NUNCA mencionar nombres con dominios
- [ ] Revisar entregas verificando adaptación correcta
- [ ] Detectar posibles copias entre aprendices

### Al Evaluar:

- [ ] Verificar coherencia con dominio asignado
- [ ] Revisar que nombres sean apropiados al contexto
- [ ] Validar comprensión mediante explicación
- [ ] Aplicar criterios de originalidad

---

## 🔍 Detección de Problemas

### Señales de que un Aprendiz Copió:

1. **Nombres incoherentes con su dominio**

   ```javascript
   // Aprendiz con dominio "Gimnasio"
   app.get('/books', ...);  // ❌ Dominio equivocado
   ```

2. **Mezcla de múltiples dominios**

   ```javascript
   const dishes = [...];      // Restaurante
   const books = [...];       // Biblioteca
   const pets = [...];        // Veterinaria
   // ❌ Claramente copió de varios compañeros
   ```

3. **Código idéntico a otro aprendiz**
   - Mismos nombres de variables
   - Mismo orden de implementación
   - Mismos comentarios

### Acción Correctiva:

```markdown
Primera vez:

- Conversación privada
- Explicar importancia de trabajo original
- Solicitar rehacer la entrega

Segunda vez:

- Penalización en la nota (según rúbrica)
- Explicación oral obligatoria del código
- Advertencia formal documentada

Tercera vez:

- Reprobación de la actividad
- Reunión con coordinación académica
- Posible reprobación del bootcamp
```

---

## 📊 Seguimiento de Asignaciones

### Tabla de Control (Archivo aparte, no en git)

| ID  | Nombre Aprendiz | Dominio Asignado | Fecha Entrega | Email Enviado | Confirmado |
| --- | --------------- | ---------------- | ------------- | ------------- | ---------- |
| 001 | [Confidencial]  | Restaurante      | 2025-10-06    | ✅            | ✅         |
| 002 | [Confidencial]  | Biblioteca       | 2025-10-06    | ✅            | ✅         |
| 003 | [Confidencial]  | Veterinaria      | 2025-10-06    | ✅            | ⏳         |
| ... | ...             | ...              | ...           | ...           | ...        |

**⚠️ Este archivo NUNCA debe subirse a git**

---

## 🎓 Beneficios Educativos

### Para los Aprendices:

- ✅ Fuerza comprensión real del código
- ✅ Desarrolla pensamiento crítico
- ✅ Crea portfolio único y personal
- ✅ Aprende a adaptar conceptos a contextos
- ✅ Demuestra habilidades profesionales

### Para el Instructor:

- ✅ Fácil detección de copias
- ✅ Evaluación justa y objetiva
- ✅ Promueve originalidad
- ✅ Reduce plagio efectivamente
- ✅ Mejora calidad del aprendizaje

### Para el Bootcamp:

- ✅ Mayor tasa de éxito real
- ✅ Estudiantes mejor preparados
- ✅ Portfolio diverso de proyectos
- ✅ Reputación de calidad educativa
- ✅ Egresados con comprensión genuina

---

## 📚 Referencias

- **Política completa:** `_docs/POLITICA_ANTICOPIA_DOMINIOS.md`
- **Script de asignación:** `_scripts/utilities/assign-domains.js`
- **Template de asignación:** `TEMPLATE.md` (en esta carpeta)
- **Configuración git:** `.gitignore` (protección de archivos privados)

---

## ❓ FAQ del Instructor

### ¿Qué hacer si un aprendiz pide cambiar su dominio?

```markdown
Evaluar razón:
✅ Razón técnica válida: Cambiar sin problema
Ejemplo: "El dominio requiere conocimientos médicos avanzados"

❌ Razón superficial: Mantener asignación original
Ejemplo: "No me gusta", "Prefiero otro"

✅ Razón personal sensible: Cambiar con empatía
Ejemplo: "Tengo trauma con ese contexto"
```

### ¿Cómo explicar la política sin dar ejemplos específicos?

```markdown
✅ BIEN: "Cada uno trabajará con un contexto de negocio diferente"
✅ BIEN: "Tu dominio es como tu proyecto personal único"
✅ BIEN: "Adapta los conceptos a tu realidad asignada"

❌ MAL: "Juan tiene restaurante, Pedro tiene biblioteca"
❌ MAL: "Los que tienen X dominio hagan esto..."
```

### ¿Qué hacer si dos aprendices quieren el mismo dominio?

```markdown
Respuesta:
"La asignación es aleatoria y única. No hay dominios repetidos.
Cada dominio tiene el mismo nivel de complejidad y oportunidades
de aprendizaje. El objetivo es que desarrolles TU proyecto único."
```

### ¿Debo compartir la lista completa de asignaciones?

```markdown
❌ NUNCA compartir públicamente
❌ NUNCA publicar en GitHub
❌ NUNCA mencionar en clases grupales

✅ Solo compartir asignación individual con cada aprendiz
✅ Mantener tabla de control en archivo local privado
✅ Backup seguro fuera del repositorio git
```

---

**📌 Recuerda:** El éxito de esta política depende de mantener la **privacidad** de las asignaciones y usar **lenguaje genérico** en todas las clases públicas.

---

_Guía para el Instructor - Bootcamp bc-express_  
_Actualizado: 6 de octubre de 2025_

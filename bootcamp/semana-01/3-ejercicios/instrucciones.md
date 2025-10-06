# Ejercicios Prácticos - Semana 1 (Simplificados)

## 🎯 Objetivo Ultra-Básico

Reforzar conceptos de tu primera API Express.js mediante **1-2 ejercicios súper simples** en el Bloque 3 (90 minutos).

## ⏱️ Tiempo: 90 minutos (Bloque 3)

## 📋 Pre-requisitos

- ✅ API de la Práctica 2 funcionando
- ✅ server.js creado y ejecutándose
- ✅ Endpoints básicos accesibles

---

## 🏋️ Ejercicio 1: Añadir Endpoint Personal (45 min)

**Objetivo**: Crear UN endpoint personalizado para tu API Express.js

### 📝 Instrucciones

1. **Abrir tu server.js** (del Bloque 2)

2. **Agregar este endpoint**:

```javascript
// Agregar al final de tu server.js, ANTES de app.listen()

// Endpoint personal - ¡personalízalo!
app.get('/my-profile', (req, res) => {
  res.json({
    name: 'Tu Nombre Aquí', // Cambiar por tu nombre
    bootcamp: 'Express.js',
    week: 1,
    date: '2025',
    likes_express: true, // ¿Te gustó Express.js?
    favorite_feature: 'Simplicidad', // ¿Qué te gustó más?
  });
});
```

3. **Probar el endpoint**:
   - Reiniciar tu servidor: Ctrl+C y luego `pnpm start`
   - http://localhost:3000/my-profile
   - Verificar que responde con tus datos personales

### ✅ Criterio de Éxito

- Endpoint responde con tus datos personales
- JSON bien formateado y personalizado

---

## 🏋️ Ejercicio 2: GitHub y README (45 min)

**Objetivo**: Subir tu API Express.js a GitHub con README básico

### 📝 Instrucciones

1. **Verificar package.json**:

```bash
# En tu terminal (donde está server.js)
# Verificar que tienes package.json con dependencias
cat package.json
pnpm list --depth=0
```

2. **Crear README.md básico**:

````markdown
# Mi Primera API Express.js

## ¿Qué hace?

Una API básica creada en el Bootcamp Express.js Semana 1.

## ¿Cómo ejecutar?

```bash
pnpm install
pnpm start
```

## Endpoints

- `/`: Mensaje de bienvenida
- `/info`: Información de la API
- `/my-profile`: Mi perfil personal
- `/health`: Estado de salud del servidor

## Tecnologías

- Node.js
- Express.js
- pnpm

## Reflexión

[Escribe 2-3 oraciones sobre qué aprendiste]
````

3. **Subir a GitHub** (paso a paso con instructor):
   - Crear repositorio: `tu-apellido-primera-api-express`
   - `git init`
   - `git add .`
   - `git commit -m "Mi primera API Express.js"`
   - `git push`

### ✅ Criterio de Éxito

- Repositorio en GitHub con 3 archivos mínimos
- README se ve bien en GitHub

---

## 🚨 Si tienes problemas

**NO te compliques**. Este bloque es para consolidar, no para frustrarse.

### Problemas comunes

- **Git no funciona**: El instructor te ayudará
- **Endpoint no responde**: Revisar sintaxis del código
- **Servidor no inicia**: Verificar que el puerto 3000 esté libre

### Solución rápida

- Levanta la mano
- Pide ayuda a un compañero
- Enfócate en lo que SÍ funciona

---

## 🎯 Resultado Final (Lo que deberías tener)

Al final del Bloque 3:

1. **✅ API Express.js con 3-4 endpoints funcionando**
2. **✅ Código en GitHub**
3. **✅ README básico**
4. **✅ Sensación de logro**

### 📁 Estructura Final Mínima

```
tu-repositorio/
├── server.js           # Tu API Express.js
├── package.json        # Dependencias y scripts
├── pnpm-lock.yaml      # Lock file de pnpm
└── README.md          # Documentación básica
```

---

## 📊 Auto-evaluación (1 minuto)

**¿Lograste crear tu primera API Express.js?** ✅ Sí / ❌ No

**¿Están funcionando todos los endpoints?** ✅ Sí / ❌ No

**¿Está en GitHub?** ✅ Sí / ❌ No

**Si respondiste 2/3 "Sí": ¡EXCELENTE!**
**Si respondiste 1/3 "Sí": ¡MUY BIEN!**
**Si respondiste 0/3 "Sí": ¡El instructor te ayudará!**

---

## 🚀 Preparación para Semana 2

Con estos ejercicios básicos completados, en la Semana 2 estarás listo para:

- **Middleware personalizado** (conceptos que ya usaste sin saberlo)
- **Validación de datos** (para datos más estructurados)
- **Más tipos de endpoints** (POST, PUT, DELETE básicos)
- **Manejo de errores** (para APIs más robustas)

**¡Felicidades por completar tu primera semana con Express.js! 🎉**

```

```

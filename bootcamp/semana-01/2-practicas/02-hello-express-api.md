# Práctica 2: Primera API Express.js

## 🎯 Objetivo Básico

Crear tu primera API Express.js funcional en **120 minutos** (después del break de 30 min), enfocándonos únicamente en que **funcione**.

## ⏱️ Tiempo: 120 minutos (Bloque 2 post-break)

## 📋 Pre-requisitos

- ✅ Entorno configurado (Práctica 1 - Bloque 1)
- ✅ Break de 30 min completado
- ✅ Mente descansada y lista para crear tu primera API

## 🚀 Desarrollo Ultra-Rápido (Solo 3 pasos)

### Paso 1: API Mínima Viable (40 min)

```bash
# En tu proyecto (debería estar del Bloque 1)
cd mi-primera-api-express

# Verificar que tienes las dependencias instaladas
pnpm list express || pnpm install express

# Crear UN SOLO archivo: server.js
cat > server.js << 'EOF'
import express from 'express';

// Crear la aplicación (lo más simple posible)
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico
app.use(express.json());

// Endpoint 1: Hello Express.js (OBLIGATORIO)
app.get('/', (req, res) => {
    res.json({ message: '¡Mi primera API Express.js!' });
});

// Endpoint 2: Info básica (OBLIGATORIO)
app.get('/info', (req, res) => {
    res.json({
        api: 'Express.js',
        week: 1,
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log('📖 Presiona Ctrl+C para detener');
});
EOF

# Ejecutar la API (comando simple)
pnpm start
# O alternativamente: node server.js
```

**🔍 Verificación Básica (10 min):**

1. Abre http://localhost:3000 → Deberías ver el JSON con "Mi primera API Express.js"
2. Abre http://localhost:3000/info → Deberías ver info de tu API

**✅ Si ves JSON en ambas URLs: ¡ÉXITO!**

### Paso 2: Testing Manual y Verificación (30 min)

```bash
# Tu API ya está corriendo
# Vamos a verificar que todo funcione correctamente:

# 1. Probar endpoints con curl (desde otra terminal)
curl http://localhost:3000
curl http://localhost:3000/info

# 2. O abrir en browser (más fácil)
# http://localhost:3000
# http://localhost:3000/info

# 3. Verificar que el servidor muestre logs
# En tu terminal donde corre el servidor deberías ver:
# GET / 200
# GET /info 200
```

**🎯 Objetivo**: Entender cómo Express.js maneja las requests y responses

**🖥️ USUARIOS WINDOWS**: Usar **Git Bash** para los comandos curl

### Paso 3: Personalización Mínima (40 min)

Solo si todo está funcionando, vamos a personalizar UN POCO:

```javascript
// Actualizar server.js (agregar solo al final, antes de app.listen)
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: '¡Mi primera API Express.js!' });
});

app.get('/info', (req, res) => {
  res.json({
    api: 'Express.js',
    week: 1,
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// NUEVO: Endpoint personalizado (solo si hay tiempo)
app.get('/greeting/:name', (req, res) => {
  const { name } = req.params;
  res.json({
    greeting: `¡Hola ${name}!`,
    message: `Bienvenido/a a Express.js, ${name}`,
  });
});

// NUEVO: Endpoint de status de salud
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    node_version: process.version,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log('📖 Presiona Ctrl+C para detener');
});
```

**🔍 Verificación**:

- http://localhost:3000/greeting/TuNombre
- http://localhost:3000/health

## ✅ Criterios de Éxito (Solo estos 3)

1. **✅ API ejecutándose**: http://localhost:3000 responde JSON
2. **✅ Endpoints funcionando**: Al menos 2 endpoints responden correctamente
3. **✅ Logs visibles**: El servidor muestra requests en la consola

## 🚨 Si algo no funciona

**NO te compliques**. Llama al instructor inmediatamente. El objetivo es que TODOS tengan una API funcionando al final del Bloque 2.

## 📝 Reflexión (Solo 1 pregunta)

**¿Qué fue lo más sorprendente de crear tu primera API?**

Anota una respuesta de 2-3 oraciones para incluir en tu README.

---

## 🎯 Resultado Final Esperado

Al final de estos 120 minutos tendrás:

- ✅ API Express.js funcionando
- ✅ 2-4 endpoints básicos
- ✅ Logs de servidor visibles
- ✅ Código listo para subir a GitHub
- ✅ Confianza para continuar en Semana 2

**¡Felicidades por tu primera API Express.js! 🎉**

---

## 📋 Para el Bloque 3 (Práctica)

Con esta API funcionando, en el Bloque 3 (90 min) harás:

1. **Ejercicios básicos** con tu API Express.js
2. **Subir a GitHub** (paso a paso)
3. **Crear README** ultra-básico
4. **Verificar que todo funciona**

**Guarda este archivo server.js - lo necesitaremos en el Bloque 3**

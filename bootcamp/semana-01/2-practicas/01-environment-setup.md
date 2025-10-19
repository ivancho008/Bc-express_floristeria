# Práctica 1: Configuración Rápida del Entorno

## 🎯 Objetivo

Configurar el entorno mínimo necesario para desarrollar con Express.js en solo 90 minutos, enfocándonos en lo esencial y la gestión adecuada en equipos compartidos.

## ⏱️ Tiempo Estimado: 90 minutos (incluye buffer para problemas)

**🔍 Verificación Final de Aislamiento:**

**🖥️ USUARIOS WINDOWS**: Estos comandos deben ejecutarse en **Git Bash**

````bash
echo "=== VERIFICACIÓN DE AISLAMIENTO COMPLETA ==="
echo "🖥️ Terminal activa: $0 (debe mostrar 'bash' para usuarios Windows)"
echo "📁 Directorio de trabajo: $(pwd)"
echo "👤 Git usuario (local): $(git config user.name)"
echo "📧 Git email (local): $(git config user.email)"
echo "💻 Node.js activo: $(which node)"
echo "📦 pnpm activo: $(which pnpm)"
echo "🌍 Proyecto Node.js: $(pwd)"
echo "� Git global limpio: $(git config --global user.name 2>/dev/null && echo '⚠️ ADVERTENCIA: Aún hay configuración global' || echo '✅ Perfecto: Sin configuración global')"IMPORTANTE: Configuración para Equipos Compartidos

**ANTES DE EMPEZAR:** Este bootcamp reconoce que muchos estudiantes trabajan en equipos compartidos donde múltiples aprendices de diferentes jornadas utilizan las mismas máquinas. Esta práctica está diseñada para evitar conflictos y garantizar que cada estudiante pueda trabajar de forma independiente.

### Principios Clave:

1. **Carpetas personales separadas** - Cada estudiante en su propio espacio
2. **Git configuración local** - Sin afectar configuración global
3. **Node.js y pnpm global** - Gestión moderna de paquetes
4. **Documentación personal** - Identificar tu trabajo claramente

## 📋 Pre-requisitos

- Node.js LTS ya instalado (verificar con `node --version`)
- pnpm instalado globalmente (verificar con `pnpm --version`)
- Conexión a internet estable
- Cuenta de GitHub activa
- Editor de código (VS Code recomendado)
- **🚨 USUARIOS WINDOWS**: Usar ÚNICAMENTE **Git Bash** como terminal (NO PowerShell, NO CMD)
- **CLAVE**: Respetar el trabajo de otros estudiantes en equipos compartidos

## ⚠️ IMPORTANTE PARA USUARIOS WINDOWS

**🖥️ Terminal OBLIGATORIA: Git Bash**

- ✅ **Usar**: Git Bash (viene con Git for Windows)
- ❌ **NO usar**: PowerShell
- ❌ **NO usar**: Command Prompt (CMD)
- ❌ **NO usar**: Windows Terminal con PowerShell

### ¿Por qué Git Bash?

1. **Compatibilidad**: Todos los comandos `bash` funcionan igual que en Linux/Mac
2. **Consistencia**: Las rutas y comandos son idénticos para todos los estudiantes
3. **Git integrado**: Comandos Git funcionan nativamente
4. **Sin conflictos**: Evita problemas de permisos y rutas de Windows

### Cómo abrir Git Bash:

1. **Opción 1**: Click derecho en cualquier carpeta → "Git Bash Here"
2. **Opción 2**: Buscar "Git Bash" en el menú inicio
3. **Opción 3**: En VS Code: Terminal → New Terminal → Cambiar a "Git Bash"

## 🚀 Setup Rápido (4 pasos esenciales)

### Paso 0: VERIFICACIÓN PREVIA en Equipos Compartidos (10 min)

**🚨 CRÍTICO**: Antes de configurar cualquier cosa, verificar el estado actual del equipo para no interferir con otros estudiantes.

```bash
# PASO 1: Verificar directorios de desarrollo existentes
echo "=== Directorios de desarrollo existentes ==="
ls -la ~/desarrollo-personal/ 2>/dev/null || echo "No existe carpeta desarrollo-personal (perfecto)"
ls -la ~/Desktop/proyecto* 2>/dev/null || echo "No hay proyectos en Desktop (bien)"

# PASO 2: Verificar Node.js y pnpm
echo "=== Verificación de herramientas ==="
node --version || echo "❌ Node.js no instalado"
pnpm --version || echo "❌ pnpm no instalado"

# PASO 4: Verificar procesos Node.js/servidor activos
echo "=== Procesos activos que podrían causar conflictos ==="
ps aux | grep -E "(node|express|npm|pnpm)" | grep -v grep | head -5

# PASO 5: Solo proceder si:
# ✅ Entiendes qué configuración Git existe
# ✅ Has elegido tu carpeta personal única
# ✅ No hay conflictos de puertos/procesos evidentes
````

### Paso 1: Verificar Node.js y pnpm (5 min)

**🖥️ RECORDATORIO WINDOWS**: Asegúrate de estar usando **Git Bash** (no PowerShell/CMD)

```bash
# Verificar versión de Node.js LTS
node --version
# Debe mostrar Node.js v22.x o superior

# Verificar pnpm
pnpm --version
# Debe mostrar pnpm 8.x o superior

# Si no tienes Node.js LTS, instalar desde https://nodejs.org/
# Si no tienes pnpm: npm install -g pnpm
```

### Paso 2: Crear Tu Carpeta Personal de Desarrollo (15 min)

**🚨 REGLA DE ORO**: En equipos compartidos, cada estudiante DEBE trabajar en su propia carpeta personal identificada con su nombre real. Esto previene conflictos y facilita la identificación de proyectos.

```bash
# PASO 1: Crear tu carpeta personal con nomenclatura clara
# Usar formato: nombre-apellido-bootcamp (sin espacios, sin acentos)
mkdir -p ~/desarrollo-personal/tu-nombre-apellido-bootcamp
cd ~/desarrollo-personal/tu-nombre-apellido-bootcamp

# Ejemplos específicos de nomenclatura correcta:
# mkdir -p ~/desarrollo-personal/juan-perez-bootcamp
# mkdir -p ~/desarrollo-personal/maria-garcia-bootcamp
# mkdir -p ~/desarrollo-personal/carlos-rodriguez-bootcamp

# PASO 2: Verificar que estás en TU carpeta personal
pwd
# Debe mostrar algo como: /home/usuario/desarrollo-personal/tu-nombre-apellido-bootcamp

# PASO 3: Crear proyecto Express.js dentro de tu carpeta personal
mkdir mi-primera-api-express
cd mi-primera-api-express

# PASO 4: Inicializar proyecto Node.js con pnpm
pnpm init

# PASO 4.1: Configurar package.json para ES Modules modernos
# Agregar "type": "module" para sintaxis import/export moderna
sed -i 's/"main": "index.js"/"main": "server.js",\n  "type": "module"/' package.json

# O manualmente agregar al package.json:
# {
#   "name": "mi-primera-api-express",
#   "type": "module",
#   "main": "server.js",
#   "scripts": {
#     "start": "node server.js",
#     "dev": "nodemon server.js"
#   }
# }

# PASO 4.2: Agregar scripts npm/pnpm modernos
pnpm pkg set scripts.start="node server.js"
pnpm pkg set scripts.dev="nodemon server.js"

# PASO 5: Instalar dependencias EN TU PROYECTO LOCAL
pnpm install express
pnpm install -D nodemon

# PASO 6: Verificar instalación local
echo "=== Verificación de instalación local ==="
which node  # Debe mostrar Node.js system
which pnpm   # Debe mostrar pnpm global
pnpm list    # Debe mostrar express y nodemon
```

**🔍 Checkpoint de Proyecto:**

```bash
# Estos comandos deben mostrar tu configuración correcta:
echo "Node.js ejecutable: $(which node)"
echo "pnpm ejecutable: $(which pnpm)"
echo "Directorio actual: $(pwd)"
echo "package.json: $(ls package.json 2>/dev/null || echo 'No existe')"
```

### Paso 3: Configuración Git LOCAL (20 min)

**🚨 PRINCIPIO FUNDAMENTAL**: En equipos compartidos, NUNCA modificar la configuración global de Git. Usar ÚNICAMENTE configuración local por proyecto para evitar interferir con el trabajo de otros estudiantes.

**🖥️ USUARIOS WINDOWS**: Ejecutar estos comandos en **Git Bash** únicamente

```bash
# PASO 0: LIMPIAR cualquier configuración global existente (CRÍTICO en equipos compartidos)
# ⚠️  IMPORTANTE: Esto NO afecta otros proyectos, solo limpia configuración global
git config --global --unset user.name 2>/dev/null || echo "No había configuración global de user.name"
git config --global --unset user.email 2>/dev/null || echo "No había configuración global de user.email"

echo "✅ Configuración global limpiada - Cada proyecto tendrá su propia configuración"

# PASO 1: Inicializar repositorio Git en TU proyecto
git init

# PASO 2: Configurar Git EXCLUSIVAMENTE para este proyecto (NO global)
# ⚠️  NOTA: Sin el flag --global, la configuración solo aplica a este proyecto
git config user.name "Tu Nombre Completo Real"

# CONFIGURACIÓN DE EMAIL - RECOMENDACIÓN DE SEGURIDAD:
# 🔒 OPCIÓN 1 (RECOMENDADA): Usar email privado de GitHub para proteger tu email real
# Ir a GitHub.com → Settings → Emails → "Keep my email addresses private"
# GitHub genera un email como: 123456789+tunombre@users.noreply.github.com
git config user.email "123456789+tunombre@users.noreply.github.com"

# 🔓 OPCIÓN 2 (MENOS SEGURA): Usar tu email real
# git config user.email "tu-email-personal@gmail.com"

# 💡 CÓMO OBTENER TU EMAIL PRIVADO DE GITHUB:
# 1. Ir a https://github.com/settings/emails
# 2. Marcar "Keep my email addresses private"
# 3. Copiar el email que aparece como "ID+username@users.noreply.github.com"
# 4. Usar ese email en la configuración Git

# PASO 3: Verificar que la configuración local está correcta Y que NO hay configuración global
echo "=== Configuración Git LOCAL de este proyecto ==="
git config user.name
git config user.email
echo "=== Verificando que NO hay configuración Git GLOBAL (debe estar vacío) ==="
git config --global user.name 2>/dev/null || echo "✅ Sin configuración global de user.name (perfecto)"
git config --global user.email 2>/dev/null || echo "✅ Sin configuración global de user.email (perfecto)"

# PASO 4: Crear .gitignore específico para Node.js
cat > .gitignore << 'EOF'
# Node.js dependencies
node_modules/
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables (pueden contener información sensible)
.env
.env.local
.env.production

# IDE y editores (configuraciones personales)
.vscode/
.idea/
*.swp
*.swo

# Archivos del sistema operativo
.DS_Store
Thumbs.db

# Logs y archivos temporales
*.log
logs/
temp/
tmp/

# Build outputs
dist/
build/
EOF

# PASO 5: Crear README personal con información de identificación
cat > README.md << EOF
# Mi Primera API Express.js - Bootcamp

**👤 Desarrollador**: $(git config user.name)
**📧 Email**: $(git config user.email)
**� Privacidad**: Email configurado según mejores prácticas de GitHub
**�📅 Fecha de creación**: $(date '+%Y-%m-%d %H:%M:%S')
**📂 Ruta del proyecto**: $(pwd)
**💻 Equipo de trabajo**: $(hostname)

## 🔧 Configuración Local

Este proyecto está configurado para trabajo en equipo compartido:

- **Node.js y pnpm**: Gestión moderna de paquetes JavaScript
- **Configuración Git local**: Solo para este proyecto
- **Dependencias independientes**: No afecta otras instalaciones

## 🚀 Instalación y Ejecución

\`\`\`bash
# 1. Instalar dependencias del proyecto
pnpm install

# 2. Ejecutar servidor de desarrollo
pnpm start
# O alternativamente:
pnpm dev
\`\`\`

## 📝 Notas del Desarrollador

- **Configuración Git**: Local únicamente, no afecta configuración global
- **Email de GitHub**: Configurado con email privado para proteger información personal
- **Dependencias aisladas**: Todas las dependencias en node_modules/ local
- **Puerto por defecto**: 3000 (cambiar si hay conflictos)
- **Estado del bootcamp**: Semana 1 - Configuración inicial

## 🛠️ Troubleshooting Personal

- Si las dependencias no se instalan: \`rm -rf node_modules package-lock.json && pnpm install\`
- Si hay conflictos de puerto: cambiar PORT en .env o usar \`pnpm start --port 3001\`
- Si Git no funciona: verificar \`git config user.name\` y \`git config user.email\`
- Si necesitas cambiar el email: usar el email privado de GitHub desde Settings → Emails

EOF

# PASO 6: Crear archivo de dependencias con versiones específicas
pnpm list --depth=0 > dependencies-installed.txt

# PASO 7: Crear server.js con sintaxis moderna (ES Modules)

**🆕 IMPORTANTE - Sintaxis Moderna JavaScript:**
- ✅ **Usamos**: `import/export` (ES Modules - estándar moderno)
- ❌ **No usamos**: `require()` (CommonJS - sintaxis antigua)
- 🔧 **Requisito**: `"type": "module"` en package.json

cat > server.js << 'EOF'
#!/usr/bin/env node
/**
 * Mi Primera API Express.js - Verificación de Setup
 * Desarrollador: [Tu nombre se llenará automáticamente]
 */

import express from 'express';
import os from 'os';

// Crear instancia de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico
app.use(express.json());

// Endpoint principal de verificación
app.get('/', (req, res) => {
    res.json({
        message: '¡Setup completado correctamente!',
        project: 'Express.js Bootcamp - Semana 1',
        timestamp: new Date().toISOString(),
        status: '✅ Working perfectly'
    });
});

// Endpoint de información del entorno
app.get('/info/setup', (req, res) => {
    res.json({
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        workingDirectory: process.cwd(),
        user: process.env.USER || process.env.USERNAME || 'No detectado',
        hostname: os.hostname(),
        timestamp: new Date().toISOString(),
        packageManager: 'pnpm',
        environment: 'development'
    });
});

// Endpoint de verificación de salud
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        message: 'API running correctly',
        environment: 'development'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('🚀 Iniciando servidor de verificación...');
    console.log(`📍 Acceder a: http://localhost:${PORT}`);
    console.log('✅ Servidor corriendo correctamente');
});
EOF

# PASO 2: Crear script de verificación rápida
cat > verificar_setup.js << 'EOF'
#!/usr/bin/env node
/**
 * Script de verificación rápida del setup Express.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import os from 'os';

function verificarSetup() {
    console.log("🔍 VERIFICACIÓN DEL SETUP EXPRESS.JS");
    console.log("=".repeat(50));

    // Verificar Node.js
    console.log(`✅ Node.js version: ${process.version}`);
    console.log(`✅ Node.js path: ${process.execPath}`);

    // Verificar pnpm
    try {
        const pnpmVersion = execSync('pnpm --version', { encoding: 'utf8' }).trim();
        console.log(`✅ pnpm instalado: v${pnpmVersion}`);
    } catch (error) {
        console.log("❌ pnpm NO instalado");
        return false;
    }

    // Verificar directorio de trabajo
    console.log(`✅ Directorio actual: ${process.cwd()}`);

    // Verificar instalaciones (package.json y node_modules)
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        console.log(`✅ package.json presente`);

        // Verificar ES Modules
        if (packageJson.type === 'module') {
            console.log(`✅ ES Modules habilitado (sintaxis moderna)`);
        } else {
            console.log(`⚠️  ES Modules no configurado - agregar "type": "module" al package.json`);
        }

        if (packageJson.dependencies && packageJson.dependencies.express) {
            console.log(`✅ Express.js instalado: v${packageJson.dependencies.express}`);
        } else {
            console.log("❌ Express.js NO está en package.json");
            return false;
        }

        if (fs.existsSync('node_modules')) {
            console.log(`✅ node_modules presente`);
        } else {
            console.log("⚠️  node_modules faltante - ejecutar 'pnpm install'");
        }
    } catch (error) {
        console.log("❌ package.json NO encontrado");
        return false;
    }

    // Verificar archivos del proyecto
    const archivosRequeridos = ["server.js", "package.json", "README.md", ".gitignore"];
    for (const archivo of archivosRequeridos) {
        if (fs.existsSync(archivo)) {
            console.log(`✅ Archivo presente: ${archivo}`);
        } else {
            console.log(`⚠️  Archivo faltante: ${archivo}`);
        }
    }

    // Verificar configuración Git
    try {
        const gitUser = execSync('git config user.name', { encoding: 'utf8', stdio: 'pipe' }).trim();
        const gitEmail = execSync('git config user.email', { encoding: 'utf8', stdio: 'pipe' }).trim();
        console.log(`✅ Git configurado - Usuario: ${gitUser}`);
        console.log(`✅ Git configurado - Email: ${gitEmail}`);
    } catch {
        console.log("⚠️  Git no configurado localmente");
    }

    console.log("\n🎯 RESUMEN DEL SETUP:");
    console.log("✅ Setup básico completado");
    console.log("🚀 Listo para ejecutar: pnpm start");
    console.log("📖 API disponible en: http://localhost:3000");
    console.log("🔧 Verificación disponible en: http://localhost:3000/info/setup");

    return true;
}

// Ejecutar si es el módulo principal (ES Modules)
if (import.meta.url === `file://${process.argv[1]}`) {
    verificarSetup();
}
EOF

# PASO 3: Ejecutar verificación
node verificar_setup.js

# PASO 4: Actualizar lock file con dependencias actuales
pnpm install  # Asegurar que pnpm-lock.yaml esté actualizado

# PASO 5: Hacer commit con la API de verificación
git add .
git commit -m "feat: agregar API de verificación y script de diagnóstico

- server.js: API básica con endpoints de verificación
- verificar_setup.js: script de diagnóstico del entorno
- pnpm-lock.yaml actualizado con dependencias actuales
- Setup listo para testing y desarrollo

Cambios listos para ejecutar y verificar funcionamiento"

echo ""
echo "🎉 ¡SETUP COMPLETADO!"
echo "�️ USUARIOS WINDOWS: Ejecutar en Git Bash únicamente"
echo "�🚀 Para probar tu API ejecuta:"
echo "   pnpm start"
echo ""
echo "📍 Luego visita:"
echo "   http://localhost:3000 (página principal)"
echo "   http://localhost:3000/api/info (información del entorno)"
```

## 🔒 PROTOCOLO OBLIGATORIO para Equipos Compartidos

### Reglas de Convivencia para el Bootcamp

1. **🏠 Espacios Personales**: Cada estudiante trabaja ÚNICAMENTE en `~/desarrollo-personal/su-nombre-apellido-bootcamp/`
2. **⚠️ Git Local ÚNICAMENTE**:
   - NUNCA usar `git config --global`
   - SIEMPRE hacer `git config --global --unset user.name` y `git config --global --unset user.email` antes de empezar
   - Solo configuración local por proyecto (`git config user.name` sin --global)
3. **🔒 Dependencias Aisladas**: Cada proyecto con su propio `node_modules/` y `package.json`
4. **📝 Identificación**: Cada proyecto debe tener README con datos del desarrollador
5. **🤝 Respeto**: No modificar ni acceder a carpetas de otros estudiantes
6. **🆘 Comunicación**: Reportar problemas sin intentar "arreglar" configuración global

### ⚠️ Situaciones Problemáticas y Soluciones

#### "Git ya está configurado con otro usuario"

```bash
# ❌ NO HACER: git config --global user.name "Mi Nombre"
# ✅ SÍ HACER: Configuración local únicamente
cd mi-proyecto
git config user.name "Mi Nombre Real"
git config user.email "mi-email@ejemplo.com"
git config user.name  # Verificar que muestra MI nombre
```

#### "No puedo crear carpetas / Permisos denegados"

```bash
# ✅ Usar directorio home personal
cd ~
mkdir -p desarrollo-personal/mi-nombre-apellido-bootcamp
cd desarrollo-personal/mi-nombre-apellido-bootcamp
ls -la  # Verificar permisos correctos
```

#### "Las dependencias no se instalan correctamente / Conflictos de pnpm"

```bash
# ✅ Limpiar e instalar dependencias en tu proyecto
cd tu-proyecto
rm -rf node_modules pnpm-lock.yaml
pnpm install
# O recrear completamente en tu carpeta
pnpm cache clean
pnpm install
```

#### "Puerto 3000 ya está en uso"

```bash
# ✅ Usar puerto diferente
PORT=3001 pnpm start
# O en tu archivo .env
echo "PORT=3001" > .env
# O verificar qué proceso lo usa
lsof -i :3000
```

#### "Error al hacer push a GitHub"

```bash
# Verificar configuración local
git config user.name
git config user.email
# Si aparece otro usuario, reconfigurar localmente
git config user.name "Mi Nombre Real"
git config user.email "mi-email-personal@gmail.com"
```

## ✅ Objetivos Cumplidos

Al finalizar este setup rápido, deberías tener:

- ✅ **Verificación previa realizada** (sin interferir con otros usuarios)
- ✅ **Carpeta personal identificada creada** (`~/desarrollo-personal/tu-nombre-apellido-bootcamp/`)
- ✅ **Node.js LTS funcionando en tu espacio aislado**
- ✅ **pnpm configurado y funcionando**
- ✅ **Express.js y dependencias instaladas localmente** (sin afectar instalaciones globales)
- ✅ **Git configurado EXCLUSIVAMENTE para tu proyecto** (configuración local)
- ✅ **API de verificación funcionando** (server.js con endpoints de prueba)
- ✅ **Documentación personal completa** (README con información personal y troubleshooting)
- ✅ **Script de diagnóstico disponible** (verificar_setup.js)

## 🎯 Verificación Final del Setup

```bash
# Ejecutar desde tu proyecto para verificar todo:
cd ~/desarrollo-personal/tu-nombre-apellido-bootcamp/mi-primera-api-express
node verificar_setup.js
pnpm start
```

## 🔄 Próximos Pasos

1. **Inmediato**: Ejecutar tu API y probar los endpoints de verificación
2. **Semana 2**: Desarrollo de endpoints más complejos manteniendo el aislamiento
3. **Futuro**: Setup de testing y CI/CD en tu entorno personal

## 🆘 Problemas Comunes ESPECÍFICOS para Equipos Compartidos

### "Git dice que ya está configurado con otro usuario"

**Síntoma**: Al hacer `git config --global user.name` aparece el nombre de otro estudiante

```bash
# ❌ NO HACER: git config --global user.name "Mi Nombre"
# ❌ NO HACER: git config --global user.email "mi@email.com"

# ✅ SOLUCIÓN CORRECTA: Usar configuración local únicamente
cd tu-proyecto
git init  # Si no es un repo aún
git config user.name "Tu Nombre Real"
git config user.email "tu-email@ejemplo.com"

# Verificar que funciona localmente (sin --global)
git config user.name  # Debe mostrar TU nombre
git config user.email # Debe mostrar TU email

# Verificar que NO modificaste la configuración global
git config --global user.name  # Debe mostrar el nombre original (de otro usuario)
```

### "No puedo crear carpetas en el directorio actual"

**Síntoma**: `mkdir` dice "Permission denied" o no puedes escribir archivos

```bash
# ✅ SOLUCIÓN: Usar tu directorio home personal
cd ~  # Ir a tu directorio personal
pwd   # Verificar que estás en /home/tu-usuario

# Crear estructura en tu espacio personal
mkdir -p desarrollo-personal/tu-nombre-apellido-bootcamp
cd desarrollo-personal/tu-nombre-apellido-bootcamp
ls -la  # Verificar permisos correctos (debe mostrar tu usuario como propietario)
```

### "Las dependencias npm/pnpm fallan o hay conflictos"

**Síntoma**: Error al instalar paquetes o `node_modules` de otro usuario

```bash
# ESTO ES NORMAL y ESPERADO en equipos compartidos
# ✅ SOLUCIÓN: Usar tu proyecto aislado

cd tu-proyecto-personal
pnpm list  # Verificar que estás en tu proyecto (debe mostrar tus dependencias)
pnpm install  # Instalar en TU proyecto

# Verificar aislamiento
which node  # Debe mostrar la instalación global (compartida)
which pnpm  # Debe mostrar la instalación global (compartida)
ls -la node_modules/  # Debe mostrar TU usuario como propietario
pnpm list express  # Verificar versión en tu proyecto
```

### "Express.js/Node.js ya están configurados / Conflictos de versiones"

**Síntoma**: `pnpm list` muestra paquetes de otros proyectos o no funciona

```bash
# ESTO ES NORMAL y ESPERADO en equipos compartidos
# ✅ SOLUCIÓN: Usar tu proyecto aislado

cd tu-proyecto-personal
pnpm list  # Verificar que estás en tu proyecto (debe mostrar tus dependencias)
pnpm install  # Instalar en TU proyecto

# Verificar aislamiento
which node  # Debe mostrar la instalación global (compartida)
which pnpm  # Debe mostrar la instalación global (compartida)
ls -la node_modules/  # Debe mostrar TU usuario como propietario
pnpm list express  # Verificar versión en tu proyecto
```

### "Conflictos al hacer push a GitHub"

**Síntoma**: Git rechaza el push o aparece el nombre de otro usuario en commits

```bash
# ✅ VERIFICAR configuración local primero
git config user.name
git config user.email

# Si aparece otro usuario, configurar localmente
git config user.name "Tu Nombre Real"

# 🔒 RECOMENDACIÓN DE SEGURIDAD: Usar email privado de GitHub
# Obtener tu email privado en: https://github.com/settings/emails
git config user.email "123456789+tunombre@users.noreply.github.com"
# O usar tu email real (menos recomendado):
# git config user.email "tu-email-personal@gmail.com"

# Verificar último commit
git log --oneline -1  # Debe mostrar TU nombre

# Si el commit anterior tiene otro nombre, crear nuevo commit
git commit --amend --author="Tu Nombre <123456789+tunombre@users.noreply.github.com>"
```

### "Puerto 3000 ya está en uso / No puedo acceder a la API"

**Síntoma**: Error "Address already in use" al ejecutar `pnpm start`

```bash
# ✅ SOLUCIÓN: Verificar qué está usando el puerto
lsof -i :3000  # Ver qué proceso usa el puerto 3000
ps aux | grep node  # Ver si hay otros servidores Node.js corriendo

# Opción 1: Usar puerto diferente
PORT=3001 pnpm start
# O crear archivo .env
echo "PORT=3001" > .env
pnpm start

# Opción 2: Si el proceso es tuyo, detenerlo
# Encontrar PID en lsof y usar: kill PID

# Opción 3: Usar servidor con puerto automático
# Modificar tu server.js para usar process.env.PORT || 3000
```

### "No puedo instalar paquetes / pnpm no funciona"

**Síntoma**: "pnpm: command not found" o errores de permisos

```bash
# ✅ VERIFICAR que pnpm está instalado globalmente
which pnpm  # Debe mostrar ruta a pnpm
pnpm --version  # Debe mostrar versión

# Si pnpm no existe
npm install -g pnpm  # Instalar pnpm globalmente

# Si hay problemas de permisos con instalación global
sudo npm install -g pnpm  # Solo si tienes permisos sudo

# Verificar funcionamiento en tu proyecto
cd tu-proyecto
pnpm --version  # Verificar que funciona
pnpm install    # Instalar dependencias del proyecto
```

#### "Comandos no funcionan en Windows"

```bash
# ❌ PROBLEMA: Usar PowerShell o CMD
# PowerShell> node --version  # Sintaxis diferente
# CMD> dir                    # Comandos diferentes

# ✅ SOLUCIÓN: Usar Git Bash SIEMPRE
# Git Bash$ node --version    # Sintaxis Unix estándar
# Git Bash$ ls                # Comandos Unix estándar
# Git Bash$ pwd               # Rutas Unix-style
```

**🔧 Cómo cambiar a Git Bash si estás en terminal incorrecta:**

1. **En VS Code**: Terminal → Nuevo Terminal → Click en "+" → Git Bash
2. **En Windows**: Click derecho en carpeta → "Git Bash Here"
3. **Verificar**: El prompt debe mostrar `$` (no `>` de PowerShell)

```

```

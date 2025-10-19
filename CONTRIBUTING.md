# Guía de Contribución - Bootcamp bc-express

¡Gracias por tu interés en contribuir al Bootcamp bc-express! Esta guía te ayudará a entender cómo puedes participar en este proyecto educativo opensource.

## 🎯 Código de Conducta

Este proyecto adhiere a nuestro [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, esperamos que mantengas estos estándares.

## 🚀 Formas de Contribuir

### 📚 Contenido Educativo

- Mejorar tutoriales y ejercicios existentes
- Crear nuevos ejercicios prácticos
- Traducir contenido
- Mejorar explicaciones técnicas

### 🐛 Reportar Issues

- Errores en el código de ejemplo
- Problemas en la documentación
- Sugerencias de mejora
- Solicitudes de nuevas características

### 💻 Código y Ejemplos

- Corregir bugs en proyectos de ejemplo
- Optimizar código existente
- Agregar nuevos ejemplos
- Mejorar scripts de automatización

## 📋 Antes de Empezar

### Prerequisitos

- Node.js 22 (LTS) o superior
- pnpm instalado globalmente
- Git configurado correctamente
- Familiaridad con Express.js y TypeScript

### Configuración del Entorno

```bash
# Fork y clone del repositorio
git clone https://github.com/tu-usuario/bc-express.git
cd bc-express

# Instalar dependencias
pnpm install

# Configurar upstream
git remote add upstream https://github.com/original-owner/bc-express.git
```

## 🔄 Flujo de Trabajo

### 1. Issues Primero

- **Siempre crea o comenta en un issue** antes de hacer cambios
- Discute tu propuesta con los maintainers
- Asegúrate de que el issue no esté ya siendo trabajado

### 2. Branching Strategy

```bash
# Crear rama para nueva característica
git checkout -b feature/descripcion-corta

# Crear rama para corrección de bug
git checkout -b fix/descripcion-del-problema

# Crear rama para documentación
git checkout -b docs/mejora-documentacion
```

### 3. Conventional Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para mantener un historial limpio:

```bash
# Nuevas características
git commit -m "feat(semana-01): add new Express.js middleware example"

# Correcciones
git commit -m "fix(semana-03): resolve TypeScript compilation error"

# Documentación
git commit -m "docs(readme): update installation instructions"

# Tests
git commit -m "test(semana-05): add unit tests for user service"

# Refactoring
git commit -m "refactor(utils): improve error handling logic"

# Chores (mantenimiento)
git commit -m "chore(deps): update Express.js to latest version"
```

### 4. Pull Request Process

#### Antes de Enviar el PR

```bash
# Actualizar con upstream
git fetch upstream
git rebase upstream/main

# Ejecutar tests locales
pnpm test

# Verificar linting
pnpm lint

# Verificar build
pnpm build
```

#### Template de Pull Request

- Usa nuestro [template de PR](.github/PULL_REQUEST_TEMPLATE.md)
- Incluye descripción clara del cambio
- Referencia el issue relacionado
- Agrega screenshots si es UI/UX
- Lista los cambios breaking si los hay

## 📝 Estándares de Código

### Nomenclatura (OBLIGATORIO)

- **Código técnico**: Siempre en inglés (functions, variables, endpoints, JSON keys)
- **Documentación**: Español para explicaciones, inglés para código
- **TypeScript**: camelCase para variables/funciones, PascalCase para clases/interfaces
- **Archivos**: kebab-case para nombres de archivos

### Calidad de Código

- **Type Safety**: Usar TypeScript estrictamente tipado
- **Documentation**: JSDoc para funciones públicas
- **Testing**: Cobertura mínima del 80%
- **Linting**: Seguir las reglas de ESLint configuradas

### Ejemplo de Código Aceptable

```typescript
/**
 * Creates a new user in the database
 * @param userData - User information to create
 * @returns Promise<User> - Created user object
 */
export async function createUser(userData: CreateUserDto): Promise<User> {
  try {
    const newUser = await userRepository.create(userData);
    logger.info(`User created successfully: ${newUser.id}`);
    return newUser;
  } catch (error) {
    logger.error('Failed to create user:', error);
    throw new DatabaseError('User creation failed');
  }
}
```

## 🧪 Testing

### Estructura de Tests

```bash
src/
├── __tests__/          # Tests unitarios
├── controllers/
│   └── __tests__/      # Tests de controladores
└── services/
    └── __tests__/      # Tests de servicios
```

### Ejecutar Tests

```bash
# Todos los tests
pnpm test

# Tests con watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# Tests específicos
pnpm test user.service.test.ts
```

## 📚 Contribuciones de Contenido

### Estructura de Semanas

Cada semana debe seguir esta estructura:

```
semana-XX/
├── README.md                 # Objetivos y actividades
├── RUBRICA_SEMANA_X.md      # Rúbrica de evaluación
├── teoria/                  # Conceptos teóricos
├── practica/                # Tutoriales paso a paso
├── ejercicios/              # Ejercicios propuestos
├── proyecto/                # Especificaciones proyecto
└── recursos/                # Referencias adicionales
```

### Criterios de Calidad para Contenido

- **Progresión lógica**: Cada concepto debe construir sobre el anterior
- **Ejemplos prácticos**: Código funcional y bien comentado
- **Claridad**: Explicaciones paso a paso
- **Tiempo**: Contenido ajustado a 6 horas semanales
- **Nomenclatura**: Código técnico en inglés, explicaciones en español

## 🔍 Review Process

### Para Maintainers

- **Response time**: Máximo 48 horas para primera respuesta
- **Code review**: Al menos 1 approval requerido
- **Testing**: CI debe pasar antes de merge
- **Documentation**: Verificar que esté actualizada

### Para Contributors

- **Paciencia**: Los reviews pueden tomar tiempo
- **Feedback**: Responde constructivamente a comentarios
- **Updates**: Mantén tu PR actualizado con main
- **Communication**: Comunica si necesitas ayuda

## 🎖️ Reconocimiento

### Contributors

Todos los contributors serán reconocidos en:

- README.md (sección Contributors)
- Release notes
- Certificados de contribución (para estudiantes SENA)

### Tipos de Contribución

- 💻 Código
- 📖 Documentación
- 🎨 Diseño
- 🤔 Ideas y planning
- 🐛 Bug reports
- 💬 Answering questions
- ⚠️ Tests
- 🌍 Traducción

## 📞 Obtener Ayuda

### Canales de Comunicación

1. **GitHub Issues** (Principal): Para bugs, features, questions
2. **GitHub Discussions**: Para discusiones abiertas
3. **Discord**: Para chat en tiempo real (enlace en README)

### Preguntas Frecuentes

**Q: ¿Puedo contribuir si soy principiante?**
A: ¡Absolutamente! Tenemos issues marcados como `good-first-issue` perfectos para empezar.

**Q: ¿Cómo puedo proponer un nuevo tema para el bootcamp?**
A: Crea un issue con el template "Feature Request" y describe detalladamente tu propuesta.

**Q: ¿Puedo usar este contenido en mi propia enseñanza?**
A: Sí, bajo los términos de la licencia MIT. Por favor, da crédito al proyecto original.

**Q: ¿Hay alguna recompensa por contribuir?**
A: Para estudiantes SENA, las contribuciones pueden contar como horas de proyecto. Para todos, ofrecemos reconocimiento público y certificados de contribución.

## 🚀 Empezar a Contribuir

1. **Explora** los issues abiertos, especialmente los marcados como `good-first-issue`
2. **Comenta** en el issue que te interese para que sepamos que estás trabajando en él
3. **Fork** el repositorio y crea tu rama
4. **Desarrolla** tu contribución siguiendo nuestros estándares
5. **Envía** tu Pull Request usando nuestro template

¡Gracias por ayudar a hacer del bootcamp bc-express un mejor recurso educativo para todos! 🎉

---

## 📋 Checklist para Contributors

- [ ] Leí el Código de Conducta
- [ ] Configuré mi entorno de desarrollo
- [ ] Entiendo el flujo de Conventional Commits
- [ ] Sé cómo ejecutar tests localmente
- [ ] Entiendo los estándares de nomenclatura
- [ ] Exploré los issues existentes
- [ ] Estoy listo para contribuir

**¿Tienes dudas?** No dudes en crear un issue con la etiqueta `question` o contactar a los maintainers.

# PLANTILLA DE ESTRUCTURA PARA PROYECTOS DE BOOTCAMP

## Documentación de Referencia para Desarrollo de Bootcamps

**Versión:** 1.0  
**Fecha:** 21 de agosto de 2025  
**Tipo:** Plantilla de Estructura Estándar  
**Aplicable a:** Todos los bootcamps de 10 semanas

---

**SIEMPRE** tener en cuenta que para el trabajo semanal hay una(1) jornada de 6 horas semanales (menos 30min de break).

## ESTRUCTURA GENERAL DEL BOOTCAMP

```
bootcamp-[tecnologia]/
├── README.md                     # Descripción general del bootcamp
├── CHANGELOG.md                  # Registro de cambios y versiones
├── LICENSE                       # Licencia del contenido
├── CODE_OF_CONDUCT.md           # Código de conducta
├── CONTRIBUTING.md              # Guía de contribución
├── .devcontainer/               # Configuración de contenedores
│   ├── devcontainer.json
│   └── Dockerfile
├── _docs/                       # Documentación técnica
├── _scripts/                    # Scripts de automatización
├── assets/                      # Recursos gráficos
├── recursos-compartidos/        # Recursos reutilizables
├── proyecto-final/              # Proyecto integrador final
├── semana-01/ ... semana-10/    # Contenido semanal
└── student-repo/                # Repositorio ejemplo estudiante
```

---

## ESTRUCTURA SEMANAL ESTÁNDAR

### Cada carpeta `semana-XX/` debe contener:

```
semana-XX/
├── README.md                    # Objetivos y resumen semanal
├── RUBRICA_EVALUACION.md       # Criterios de evaluación
├── 0-epti/                     # Información institucional
│   └── [archivos epti]
├── 1-teoria/                   # Contenido teórico
│   ├── README.md
│   ├── conceptos.md
│   ├── ejemplos/
│   └── slides/
├── 2-practica/                 # Ejercicios prácticos
│   ├── README.md
│   ├── ejercicio-01/
│   ├── ejercicio-02/
│   └── soluciones/
├── 3-ejercicios/              # Ejercicios adicionales
│   ├── README.md
│   ├── basicos/
│   ├── intermedios/
│   └── avanzados/
├── 4-proyecto/                # Proyecto semanal
│   ├── README.md
│   ├── especificacion-proyecto.md
│   ├── ejemplo_main.[ext]
│   ├── requirements.txt (o equivalente)
│   ├── GUIA_RAPIDA.md
│   ├── test_api.[ext]
│   └── .devcontainer/
└── 5-recursos/               # Recursos adicionales
    ├── README.md
    ├── enlaces.md
    ├── herramientas.md
    └── bibliografia.md
```

---

## PLANTILLA DE PROYECTO SEMANAL

### 1. Archivo `especificacion-proyecto.md`

```markdown
# PROYECTO SEMANA [X]: [NOMBRE DEL PROYECTO]

## Descripción General

[Descripción concisa del proyecto y su propósito]

## Objetivos de Aprendizaje

- [ ] Objetivo 1
- [ ] Objetivo 2
- [ ] Objetivo 3

## Requisitos Técnicos

### Funcionalidades Mínimas (MVP)

1. **[Funcionalidad 1]**

   - Descripción detallada
   - Criterios de aceptación

2. **[Funcionalidad 2]**
   - Descripción detallada
   - Criterios de aceptación

### Tecnologías Utilizadas

- **Framework:** [Nombre del framework]
- **Base de Datos:** [Tipo de BD]
- **Herramientas:** [Lista de herramientas]

## Entregables

### Código

- [ ] Archivo principal: `main.[ext]`
- [ ] Archivo de dependencias: `requirements.txt`
- [ ] Tests básicos: `test_*.[ext]`
- [ ] Documentación en README.md

### Documentación

- [ ] README con instrucciones de instalación
- [ ] Comentarios en código
- [ ] Guía de uso básico

## Cronograma Sugerido (6 horas semanales)

| Tiempo | Actividad               | Duración |
| ------ | ----------------------- | -------- |
| 0-1h   | Setup y configuración   | 1h       |
| 1-3h   | Implementación core     | 2h       |
| 3-5h   | Features adicionales    | 2h       |
| 5-6h   | Testing y documentación | 1h       |

## Criterios de Evaluación

### Técnicos (70%)

- **Funcionalidad (25%):** ¿Cumple con los requisitos mínimos?
- **Código Limpio (25%):** ¿Es legible y está bien estructurado?
- **Testing (20%):** ¿Incluye tests y funcionan correctamente?

### Documentación (20%)

- **README (10%):** ¿Explica claramente cómo usar el proyecto?
- **Comentarios (10%):** ¿El código está adecuadamente comentado?

### Entrega (10%)

- **Puntualidad (5%):** ¿Se entregó a tiempo?
- **Completitud (5%):** ¿Incluye todos los archivos requeridos?

## Recursos de Apoyo

- [Link a documentación oficial]
- [Tutorial relevante]
- [Ejemplo de referencia]

## Extensiones Opcionales (Bonus)

- [ ] Feature avanzada 1
- [ ] Feature avanzada 2
- [ ] Deployment en la nube
```

### 2. Archivo `README.md` del proyecto

````markdown
# [NOMBRE DEL PROYECTO]

## Descripción

[Breve descripción del proyecto]

## Instalación

### Prerrequisitos

- [Lenguaje/Runtime] versión X.X+
- [Herramienta] versión Y.Y+

### Setup Rápido

```bash
# Clonar el repositorio
git clone [url]

# Instalar dependencias
[comando de instalación]

# Ejecutar el proyecto
[comando de ejecución]
```
````

## Uso

[Instrucciones básicas de uso]

## Estructura del Proyecto

```
proyecto/
├── main.[ext]          # Archivo principal
├── requirements.txt    # Dependencias
├── test_*.[ext]       # Tests
└── README.md          # Este archivo
```

## Testing

```bash
[comando para ejecutar tests]
```

## API Endpoints (si aplica)

- `GET /` - Descripción
- `POST /resource` - Descripción

## Contribuir

[Instrucciones para contribuir]

## Licencia

[Información de licencia]

````

### 3. Archivo `GUIA_RAPIDA.md`

```markdown
# GUÍA RÁPIDA - SEMANA [X]

## ⚡ Setup en 5 Minutos

### 1. Prerrequisitos
- ✅ [Herramienta 1] instalada
- ✅ [Herramienta 2] configurada
- ✅ VS Code con extensiones recomendadas

### 2. Instalación Express
```bash
# Comando 1
comando_instalacion

# Comando 2
comando_configuracion

# Verificar instalación
comando_verificacion
````

### 3. Primer Test

```bash
# Ejecutar test básico
comando_test

# Resultado esperado:
# ✅ Test passed
```

## 🚀 Funcionalidades por Implementar

### Mínimo Viable (2-3 horas)

- [ ] **Setup básico** (30 min)
- [ ] **Feature principal** (90 min)
- [ ] **Test básico** (30 min)

### Mejoras Opcionales (2-3 horas)

- [ ] **Validaciones** (60 min)
- [ ] **Manejo de errores** (60 min)
- [ ] **Documentación** (60 min)

## 🐛 Troubleshooting Común

### Error: [Error típico 1]

**Solución:**

```bash
comando_solucion
```

### Error: [Error típico 2]

**Solución:**

- Verificar [aspecto 1]
- Comprobar [aspecto 2]

## 📚 Referencias Rápidas

- [Documentación oficial]
- [Tutorial específico]
- [Stack Overflow tag]

## 🎯 Objetivos de la Semana

- ✅ Dominar [concepto 1]
- ✅ Implementar [concepto 2]
- ✅ Entender [concepto 3]

````

### 4. Archivo de tests `test_*.[ext]`

```python
# Ejemplo para Python/FastAPI
import requests
import pytest
from main import app

BASE_URL = "http://localhost:8000"

def test_server_running():
    """Test básico para verificar que el servidor está corriendo"""
    try:
        response = requests.get(f"{BASE_URL}/")
        assert response.status_code == 200
        print("✅ Servidor funcionando correctamente")
    except Exception as e:
        print(f"❌ Error: {e}")
        print("💡 Asegúrate de que el servidor esté corriendo")

def test_endpoint_principal():
    """Test del endpoint principal"""
    response = requests.get(f"{BASE_URL}/endpoint")
    assert response.status_code == 200
    data = response.json()
    assert "campo_esperado" in data

if __name__ == "__main__":
    test_server_running()
    test_endpoint_principal()
    print("🎉 Todos los tests pasaron!")
```

---

## ESTRUCTURA DE DOCUMENTACIÓN TÉCNICA

### Carpeta `_docs/`

```
_docs/
├── README.md                    # Índice de documentación
├── GUIA_INSTRUCTOR.md          # Guía para instructores
├── TROUBLESHOOTING.md          # Solución de problemas comunes
├── API_REFERENCE.md            # Referencia de API (si aplica)
├── DEPLOYMENT.md               # Guía de despliegue
├── CHANGELOG.md                # Registro de cambios
├── architecture/               # Diagramas de arquitectura
├── examples/                   # Ejemplos adicionales
└── templates/                  # Plantillas reutilizables
```

---

## ESTRUCTURA DE SCRIPTS

### Carpeta `_scripts/`

```
_scripts/
├── setup/                      # Scripts de configuración inicial
│   ├── install_dependencies.sh
│   ├── setup_environment.sh
│   └── validate_setup.sh
├── testing/                    # Scripts de testing
│   ├── run_all_tests.sh
│   ├── test_week.sh
│   └── validate_projects.sh
├── deployment/                 # Scripts de despliegue
│   ├── deploy_dev.sh
│   ├── deploy_prod.sh
│   └── backup.sh
└── utilities/                  # Utilidades varias
    ├── clean_workspace.sh
    ├── generate_report.sh
    └── update_repos.sh
```

---

## RECURSOS COMPARTIDOS

### Carpeta `recursos-compartidos/`

```
recursos-compartidos/
├── configs/                    # Configuraciones reutilizables
│   ├── .gitignore
│   ├── .editorconfig
│   ├── docker-compose.yml
│   └── devcontainer.json
├── databases/                  # Scripts de BD
│   ├── schema.sql
│   ├── seed_data.sql
│   └── migrations/
├── templates/                  # Plantillas de código
│   ├── api_template.py
│   ├── test_template.py
│   └── readme_template.md
└── tools/                     # Herramientas auxiliares
    ├── validators/
    ├── generators/
    └── analyzers/
```

---

## DEVCONTAINER ESTÁNDAR

### `.devcontainer/devcontainer.json`

```json
{
  "name": "Bootcamp [Tecnologia]",
  "image": "mcr.microsoft.com/devcontainers/[base-image]",
  "features": {
    "[feature1]": "latest",
    "[feature2]": "latest"
  },
  "customizations": {
    "vscode": {
      "extensions": ["[extension1]", "[extension2]", "[extension3]"],
      "settings": {
        "terminal.integrated.defaultProfile.linux": "bash",
        "editor.formatOnSave": true
      }
    }
  },
  "forwardPorts": [8000, 3000],
  "postCreateCommand": "pip install -r requirements.txt",
  "remoteUser": "vscode"
}
```

---

## CRITERIOS DE CALIDAD

### Checklist para Cada Proyecto Semanal

#### ✅ Estructura

- [ ] Carpeta organizada según estándar
- [ ] Archivos nombrados correctamente
- [ ] README.md presente y completo
- [ ] Especificación clara y detallada

#### ✅ Código

- [ ] Ejemplo funcional incluido
- [ ] Dependencias documentadas
- [ ] Tests básicos implementados
- [ ] Código limpio y comentado

#### ✅ Documentación

- [ ] GUIA_RAPIDA.md presente
- [ ] Instrucciones claras de instalación
- [ ] Troubleshooting básico incluido
- [ ] Cronograma realista (6 horas semanales × 10 semanas = 60 horas totales)

#### ✅ Testing

- [ ] Tests automatizados funcionando
- [ ] Validación de funcionalidades core
- [ ] Scripts de verificación incluidos
- [ ] Manejo robusto de errores

#### ✅ Experiencia de Usuario

- [ ] Setup en menos de 10 minutos
- [ ] Documentación clara para principiantes
- [ ] Ejemplos ejecutables inmediatamente
- [ ] Feedback claro en cada paso

---

## BUENAS PRÁCTICAS

### Para Instructores

1. **Diseño Incremental**

   - Cada semana construye sobre la anterior
   - Complejidad gradual y controlada
   - Revisión constante de prerequisitos

2. **Enfoque Práctico**

   - 70% práctica, 30% teoría
   - Proyectos del mundo real
   - Feedback inmediato y continuo

3. **Flexibilidad**
   - Múltiples rutas de aprendizaje
   - Extensiones opcionales para avanzados
   - Recuperación para rezagados

### Para Estudiantes

1. **Preparación**

   - Revisar prerrequisitos técnicos
   - Configurar entorno con anticipación
   - Practicar con herramientas básicas

2. **Desarrollo**

   - Seguir cronograma sugerido
   - Hacer commits frecuentes
   - Documentar problemas encontrados

3. **Finalización**
   - Validar con tests automatizados
   - Revisar checklist de calidad
   - Preparar demo funcional

---

## MÉTRICAS DE ÉXITO

### Por Proyecto

- **Tiempo de Setup:** < 10 minutos
- **Tasa de Completitud:** > 85%
- **Satisfacción:** > 4.5/5
- **Tests Pasando:** > 95%

### Por Semana

- **Entrega a Tiempo:** > 80%
- **Calidad del Código:** > 4.0/5
- **Participación en Foros:** > 70%
- **Uso de Recursos:** > 60%

### Por Bootcamp

- **Finalización:** > 75%
- **Inserción Laboral (6m):** > 70%
- **Satisfacción General:** > 4.7/5
- **Recomendación:** > 85%

---

## ADAPTACIÓN POR TECNOLOGÍA

### Backend (Express.js, FastAPI, etc.)

- Enfoque en APIs y microservicios
- Testing de endpoints
- Documentación de API
- Deployment en la nube

### Frontend (React, Vue, etc.)

- Componentes reutilizables
- Estados y eventos
- Integración con APIs
- UI/UX responsivo

### Fullstack

- Integración frontend-backend
- Autenticación completa
- Base de datos
- Deployment completo

### Especializado (IoT, Data Science, etc.)

- Hardware/sensores (IoT)
- Datasets reales (Data Science)
- Herramientas específicas
- Casos de uso industriales

---

**Versión:** 1.0
**Última actualización:** 21 de agosto de 2025
**Próxima revisión:** Diciembre 2025
````

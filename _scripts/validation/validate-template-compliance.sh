#!/bin/bash
# Script de validación automática del cumplimiento del template
# Bootcamp: bc-express
# Template: PLANTILLA_ESTRUCTURA_BOOTCAMP.md

WORKSPACE="/home/epti/Documentos/epti-dev/bc-channel/bc-express"
TEMPLATE_DIR="$WORKSPACE/_docs/template-bootcamp"
REPORT_FILE="$WORKSPACE/VALIDACION_TEMPLATE_AUTOMATICA.md"

echo "🔍 VALIDACIÓN AUTOMÁTICA - CUMPLIMIENTO TEMPLATE BOOTCAMP" > "$REPORT_FILE"
echo "==========================================================" >> "$REPORT_FILE"
echo "Fecha: $(date)" >> "$REPORT_FILE"
echo "Bootcamp: bc-express" >> "$REPORT_FILE"
echo "Template: PLANTILLA_ESTRUCTURA_BOOTCAMP.md" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Función para verificar archivo
check_file() {
    local file="$1"
    local description="$2"
    
    if [ -f "$WORKSPACE/$file" ]; then
        echo "✅ $description: PRESENTE"
        return 0
    else
        echo "❌ $description: FALTANTE"
        return 1
    fi
}

# Función para verificar directorio
check_dir() {
    local dir="$1"
    local description="$2"
    
    if [ -d "$WORKSPACE/$dir" ]; then
        echo "✅ $description: PRESENTE"
        return 0
    else
        echo "❌ $description: FALTANTE"
        return 1
    fi
}

# Contadores
total_checks=0
passed_checks=0

echo "## 1. ARCHIVOS RAÍZ OBLIGATORIOS" >> "$REPORT_FILE"
echo "=================================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Verificar archivos raíz
files_root=(
    "README.md:Descripción general del bootcamp"
    "CHANGELOG.md:Registro de cambios"
    "LICENSE:Licencia del contenido"
    "CODE_OF_CONDUCT.md:Código de conducta"
    "CONTRIBUTING.md:Guía de contribución"
)

for item in "${files_root[@]}"; do
    IFS=':' read -r file description <<< "$item"
    total_checks=$((total_checks + 1))
    if check_file "$file" "$description" >> "$REPORT_FILE"; then
        passed_checks=$((passed_checks + 1))
    fi
done

echo "" >> "$REPORT_FILE"
echo "## 2. DIRECTORIOS PRINCIPALES" >> "$REPORT_FILE"
echo "=============================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Verificar directorios principales
dirs_main=(
    "_docs:Documentación técnica"
    "_scripts:Scripts de automatización"
    "assets:Recursos gráficos"
)

for item in "${dirs_main[@]}"; do
    IFS=':' read -r dir description <<< "$item"
    total_checks=$((total_checks + 1))
    if check_dir "$dir" "$description" >> "$REPORT_FILE"; then
        passed_checks=$((passed_checks + 1))
    fi
done

echo "" >> "$REPORT_FILE"
echo "## 3. ESTRUCTURA SEMANAL" >> "$REPORT_FILE"
echo "========================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Verificar estructura de semanas
week_structure=(
    "README.md:Objetivos y resumen semanal"
    "RUBRICA_EVALUACION.MD:Criterios de evaluación"
    "0-epti:Información institucional"
    "1-teoria:Contenido teórico"
    "2-practica:Ejercicios prácticos"
    "3-ejercicios:Ejercicios adicionales"
    "4-proyecto:Proyecto semanal"
    "5-recursos:Recursos adicionales"
)

for week in {01..10}; do
    echo "### Semana $week:" >> "$REPORT_FILE"
    week_passed=0
    week_total=0
    
    for item in "${week_structure[@]}"; do
        IFS=':' read -r file description <<< "$item"
        total_checks=$((total_checks + 1))
        week_total=$((week_total + 1))
        
        if [ -f "$WORKSPACE/semana-$week/$file" ] || [ -d "$WORKSPACE/semana-$week/$file" ]; then
            echo "✅ $description: PRESENTE" >> "$REPORT_FILE"
            passed_checks=$((passed_checks + 1))
            week_passed=$((week_passed + 1))
        else
            echo "❌ $description: FALTANTE" >> "$REPORT_FILE"
        fi
    done
    
    week_percentage=$((week_passed * 100 / week_total))
    echo "**Cumplimiento Semana $week: $week_percentage% ($week_passed/$week_total)**" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
done

echo "## 4. CONTENIDO DE PROYECTOS SEMANALES" >> "$REPORT_FILE"
echo "======================================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Verificar contenido específico de proyectos (solo semana 1 completa)
project_files=(
    "README.md:Documentación del proyecto"
    "especificacion-proyecto.md:Especificación técnica"
    "server.js:Archivo principal (ejemplo_main)"
    "package.json:Dependencias (requirements equiv.)"
    "GUIA_RAPIDA.md:Guía rápida de uso"
)

echo "### Proyecto Semana 01 (Completamente implementado):" >> "$REPORT_FILE"
project_passed=0
project_total=0

for item in "${project_files[@]}"; do
    IFS=':' read -r file description <<< "$item"
    total_checks=$((total_checks + 1))
    project_total=$((project_total + 1))
    
    if [ -f "$WORKSPACE/semana-01/4-proyecto/$file" ]; then
        echo "✅ $description: PRESENTE" >> "$REPORT_FILE"
        passed_checks=$((passed_checks + 1))
        project_passed=$((project_passed + 1))
    else
        echo "❌ $description: FALTANTE" >> "$REPORT_FILE"
    fi
done

project_percentage=$((project_passed * 100 / project_total))
echo "**Cumplimiento Proyecto S01: $project_percentage% ($project_passed/$project_total)**" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "## 5. ELEMENTOS ADICIONALES (MEJORAS)" >> "$REPORT_FILE"
echo "====================================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Verificar mejoras implementadas
improvements=(
    "assets/logos:Logo profesional"
    "assets/banners:Banner promocional"
    "assets/icons:Iconos de tecnologías"
    "_scripts/automation:Scripts automatización"
    "ESTRUCTURA_BOOTCAMP.md:Documentación estructura"
    "OPTIMIZACION_TEMA_DARK.md:Reporte tema dark"
)

improvement_count=0
for item in "${improvements[@]}"; do
    IFS=':' read -r path description <<< "$item"
    if [ -f "$WORKSPACE/$path" ] || [ -d "$WORKSPACE/$path" ]; then
        echo "🎯 $description: IMPLEMENTADO" >> "$REPORT_FILE"
        improvement_count=$((improvement_count + 1))
    fi
done

echo "" >> "$REPORT_FILE"
echo "**Mejoras implementadas: $improvement_count/6**" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Calcular estadísticas finales
overall_percentage=$((passed_checks * 100 / total_checks))

echo "## 📊 RESUMEN ESTADÍSTICO" >> "$REPORT_FILE"
echo "========================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "- **Total elementos verificados:** $total_checks" >> "$REPORT_FILE"
echo "- **Elementos conformes:** $passed_checks" >> "$REPORT_FILE"
echo "- **Porcentaje de cumplimiento:** $overall_percentage%" >> "$REPORT_FILE"
echo "- **Mejoras adicionales:** $improvement_count elementos extra" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Generar veredicto
if [ $overall_percentage -ge 95 ]; then
    verdict="✅ EXCELENTE - COMPLETAMENTE CONFORME"
    status="APROBADO PARA PRODUCCIÓN"
elif [ $overall_percentage -ge 90 ]; then
    verdict="✅ BUENO - SUSTANCIALMENTE CONFORME"
    status="APROBADO CON OBSERVACIONES MENORES"
elif [ $overall_percentage -ge 80 ]; then
    verdict="⚠️ ACEPTABLE - REQUIERE MEJORAS"
    status="PENDIENTE DE CORRECCIONES"
else
    verdict="❌ INSUFICIENTE - NO CONFORME"
    status="REQUIERE TRABAJO ADICIONAL"
fi

echo "## 🏆 VEREDICTO FINAL" >> "$REPORT_FILE"
echo "====================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "**$verdict**" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "**Estado:** $status" >> "$REPORT_FILE"
echo "**Fecha de evaluación:** $(date)" >> "$REPORT_FILE"
echo "**Próxima revisión:** Al completar contenido semanas 2-11" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "*Reporte generado automáticamente por el sistema de validación de templates*" >> "$REPORT_FILE"

echo "📋 Reporte de validación generado en: $REPORT_FILE"
echo "📊 Cumplimiento general: $overall_percentage% ($passed_checks/$total_checks)"
echo "🎯 Veredicto: $verdict"

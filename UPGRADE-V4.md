# Guía de Actualización a Tailwind CSS v4

Este documento detalla los cambios realizados para actualizar el proyecto de Tailwind CSS v1.9.6 a v4.1.17.

## Resumen de Cambios

### 1. Dependencias Actualizadas

**package.json:**
- `tailwindcss`: `^1.9.6` → `^4.1.17`
- Añadido: `@tailwindcss/cli`: `^4.1.17`

### 2. Archivos de Configuración

#### tailwind.config.js
- Migrado de `module.exports` a `export default` (ES Modules)
- Añadidos comentarios explicando que v4 usa configuración basada en CSS
- Actualizado `purge` → `content`
- Cambiado `borderWidth.default` → `borderWidth.DEFAULT`

#### tailwind.css (NUEVO)
Archivo de configuración CSS para v4 con directiva `@theme`:
```css
@import "tailwindcss";

@theme {
  /* Configuración de tema aquí */
}
```

### 3. GitHub Actions Workflows

**Cambios en ambos archivos:**
- Node.js: `14` → `20`
- `actions/setup-node@v2-beta` → `actions/setup-node@v4`

**Comandos de build actualizados:**
- Antiguo: `npx tailwindcss build style.css -o $OUTPUT_FILE -c $CONFIG_FILE`
- Nuevo: `npx @tailwindcss/cli@next -i tailwind.css -o $OUTPUT_FILE -c $CONFIG_FILE --minify`

### 4. Validación de Configs

**validate.js:**
- Actualizado para soportar ES Modules
- Mejorado manejo de errores
- Compatible con configs legacy y nuevos formatos v4

### 5. Archivos de Ejemplo

**configs/example.js y configs/namespace/example.js:**
- Migrados a `export default` en lugar de `module.exports`
- Cambiado `borderWidth.default` → `borderWidth.DEFAULT`
- Añadidos comentarios sobre compatibilidad

**configs/example-v4.css (NUEVO):**
- Ejemplo del nuevo formato de configuración CSS de v4
- Muestra el uso de variables CSS custom con `@theme`

### 6. Documentación

**README.md:**
- Añadida sección "What's New in v4"
- Actualizada FAQ sobre plugins
- Añadida pregunta sobre migración de v1/v2/v3

## Características Principales de Tailwind CSS v4

### 1. Nueva Configuración basada en CSS
En lugar de archivos JavaScript, v4 prefiere configuración en CSS usando la directiva `@theme`:

```css
@theme {
  --color-primary: #0066cc;
  --spacing-custom: 2.5rem;
}
```

### 2. Motor Oxide
- Basado en Rust para mayor rendimiento
- Builds mucho más rápidos
- Mejor manejo de memoria

### 3. Sintaxis Simplificada
- Menos archivos de configuración necesarios
- Configuración más intuitiva con variables CSS

### 4. CLI Actualizado
Nueva sintaxis de comandos:
```bash
npx @tailwindcss/cli -i input.css -o output.css --minify
```

## Compatibilidad hacia Atrás

El proyecto mantiene compatibilidad con configs JavaScript legacy (v1-v3):
- Los archivos `.js` en `configs/` siguen funcionando
- La validación soporta ambos formatos
- Los workflows procesan ambos tipos de configuración

## Migración de Configs Existentes

### Opción 1: Mantener formato legacy
Simplemente actualiza `module.exports` → `export default` y `default` → `DEFAULT` en borderWidth.

### Opción 2: Migrar a v4 CSS
Crea un archivo `.css` con la nueva sintaxis:

**Antes (JS):**
```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#0066cc'
      }
    }
  }
}
```

**Después (CSS):**
```css
@import "tailwindcss";

@theme {
  --color-primary: #0066cc;
}
```

## Testing

Para probar el build localmente:

```bash
npm install
npx @tailwindcss/cli -i tailwind.css -o output.css --minify
```

## Problemas Conocidos

1. El CLI de Tailwind v4 se encuentra en `@tailwindcss/cli` en lugar del paquete principal
2. Algunos plugins de v3 pueden necesitar actualización
3. La documentación oficial de v4 aún está en beta

## Recursos

- [Documentación oficial de Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [Guía de migración](https://tailwindcss.com/docs/upgrade-guide)
- [Changelog](https://github.com/tailwindlabs/tailwindcss/releases)

## Siguiente Pasos Recomendados

1. Probar los builds con tus configs existentes
2. Migrar gradualmente a la nueva sintaxis CSS
3. Actualizar la documentación de tu proyecto
4. Probar en CI/CD antes de hacer merge a producción

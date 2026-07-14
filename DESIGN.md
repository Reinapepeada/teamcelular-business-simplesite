---
name: "Team Celular"
description: "Banco de trabajo urbano para un servicio técnico claro y confiable."
colors:
  brand-indigo: "#2D2E83"
  brand-indigo-deep: "#20216B"
  workbench-ink: "#171820"
  clean-canvas: "#F7F8FC"
  white: "#FFFFFF"
  signal-green: "#34D399"
  quiet-slate: "#475569"
typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(2.65rem, 6vw, 5.2rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  control: "8px"
  surface: "16px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "48px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.brand-indigo}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.brand-indigo-deep}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
---

# Design System: Team Celular

## 1. Overview

**Creative North Star: "Banco de trabajo urbano"**

El sistema combina la precisión de un laboratorio con el ritmo directo de un servicio de barrio en CABA. La interfaz se siente moderna porque ordena, contrasta y responde bien; no porque acumula efectos. La fotografía del trabajo real, las superficies oscuras y el índigo original del logotipo construyen la identidad.

Rechaza el aspecto de landing SaaS, el e-commerce promocional, el futurismo azul neón y la estética editorial que oculta la acción principal.

**Key Characteristics:**

- Índigo de marca usado como superficie comprometida y acento funcional.
- Fotografía técnica con composiciones asimétricas heredadas de las cards de la home.
- Jerarquía tipográfica fuerte, texto concreto y espacios amplios.
- Divisores y cambios tonales antes que sombras decorativas.

## 2. Colors

La paleta parte del índigo real del imagotipo y lo contrasta con grafito, blanco frío y verde de estado.

### Primary

- **Índigo Team** (#2D2E83): identidad, botones primarios y superficies narrativas.
- **Índigo profundo** (#20216B): hover y texto sobre fondos claros.

### Secondary

- **Verde señal** (#34D399): disponibilidad y estados positivos; nunca como color decorativo dominante.

### Neutral

- **Grafito de banco** (#171820): héroes, cierres y fondos técnicos.
- **Lienzo limpio** (#F7F8FC): fondo de página.
- **Pizarra tranquila** (#475569): texto secundario sobre superficies claras.

**The Signal Rule.** El verde comunica estado; no compite con el índigo por protagonismo.

## 3. Typography

**Display Font:** Inter (con Arial y sans-serif como fallback)
**Body Font:** Inter (con Arial y sans-serif como fallback)

**Character:** Una sola familia elegida por continuidad de marca y rendimiento. El contraste aparece mediante escala, peso y espacio, no con una pareja tipográfica ornamental.

### Hierarchy

- **Display** (800, clamp(2.65rem, 6vw, 5.2rem), 0.98): una idea dominante en el hero.
- **Headline** (800, clamp(1.875rem, 4vw, 2.25rem), 1.1): títulos de sección concretos.
- **Body** (400, 1rem, 1.75): explicación y orientación, con máximo aproximado de 70ch.
- **Label** (700, 0.875rem, normal): acciones y datos operativos; evitar mayúsculas espaciadas repetidas.

**The Plain Speech Rule.** Si el texto necesita decoración tipográfica para parecer importante, hay que reescribirlo.

## 4. Elevation

El sistema es plano por defecto. La profundidad nace de fotografía, superposición tonal y divisores. Las cards fotográficas pueden elevarse hasta 4px en hover porque ya pertenecen al lenguaje existente; botones y bloques informativos no combinan borde con sombra amplia.

**The Flat Workbench Rule.** Las superficies descansan sobre el banco; solo los elementos interactivos responden al usuario.

## 5. Components

### Buttons

- **Shape:** rectangular amable, radio de 8px; la píldora queda reservada para controles circulares o chips reales.
- **Primary:** índigo Team con texto blanco, 12px por 24px.
- **Hover / Focus:** cambio tonal y outline visible de 2px con offset.
- **Light:** blanco sobre superficies oscuras, texto índigo profundo.

### Chips

- **Style:** usar solo para categorías o estado real; borde simple y texto breve.
- **State:** el verde señala disponibilidad, nunca una lista decorativa de servicios.

### Cards / Containers

- **Corner Style:** 16px como máximo para cards; los paneles editoriales pueden ser rectos.
- **Background:** fotografía oscurecida para servicios; blanco o grafito para contenido.
- **Shadow Strategy:** sin sombra en reposo, salvo las cards fotográficas ya establecidas.
- **Border:** divisor completo de 1px; nunca franja lateral decorativa.
- **Internal Padding:** 24px móvil, 32–48px escritorio.

### Inputs / Fields

- **Style:** fondo blanco, radio de 8px, borde gris legible y etiqueta visible.
- **Focus:** outline índigo de 2px con offset; no depender solo de cambio de color.
- **Error / Disabled:** explicar el siguiente paso cerca del campo.

### Navigation

Navegación clara y compacta. La acción de presupuesto es primaria; WhatsApp conserva su significado y selector de sucursal. En móvil, objetivos táctiles de al menos 44px.

### Service Image Card

Fotografía completa, overlay oscuro y título en la imagen. La grilla 4/4/4 seguida de 5/7 es una firma de la home; conservar su asimetría y evitar convertirla en cards idénticas.

## 6. Do's and Don'ts

### Do:

- **Do** usar #2D2E83 como color de marca y #171820 como superficie técnica.
- **Do** mostrar procesos, sucursales, garantía y trabajo real antes que adjetivos.
- **Do** conservar las proporciones asimétricas y fotografías de las cards existentes.
- **Do** verificar contraste WCAG 2.2 AA, teclado, responsive y movimiento reducido.

### Don't:

- **Don't** construir una landing SaaS intercambiable con gradientes, métricas flotantes y tarjetas idénticas.
- **Don't** parecer un e-commerce genérico que prioriza promociones sobre confianza técnica.
- **Don't** usar estética futurista azul neón, glassmorphism o fondos de cuadrícula decorativa.
- **Don't** comunicar como un taller improvisado ni hacer promesas absolutas sin condiciones.
- **Don't** usar un diseño editorial de moda que dificulte encontrar servicios, sucursales o contacto.
- **Don't** combinar borde de 1px y sombra suave amplia, usar gradient text ni radios de 32px en cards.

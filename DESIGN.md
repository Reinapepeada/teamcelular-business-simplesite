---
name: "Team Celular"
description: "Teatro negro: canvas negro, tipografía grande y el azul Team como única nota de acción."
colors:
  canvas: "#000000"
  charcoal: "#1D1D1F"
  smoke: "#333336"
  graphite: "#424245"
  ash: "#86868B"
  silk: "#F5F5F7"
  action: "#1a6dff"
  action-hover: "#3d84ff"
  link: "#6aa6ff"
  link-on-light: "#0066CC"
  brand-indigo: "#2D2E83"
typography:
  family: "Inter (local), sans-serif"
  display: { size: "clamp(2.5rem, 7vw, 5rem)", weight: 600, lineHeight: 1.05, tracking: "-0.015em" }
  heading: { size: "clamp(2rem, 4.5vw, 3.5rem)", weight: 600, lineHeight: 1.07, tracking: "-0.005em" }
  subheading: { size: "clamp(1.3rem, 2.4vw, 1.75rem)", weight: 600, lineHeight: 1.14, tracking: "0.007em" }
  body: { size: "17px", weight: 400, lineHeight: 1.47, tracking: "-0.022em" }
  nav: { size: "12px", weight: 400 }
rounded:
  card: "28px"
  glass: "36px"
  button: "9999px"
spacing:
  section: "80px"
  card-padding: "28px"
  container: "1200px"
---

# Design System: Team Celular — "Teatro negro"

Estándar visual para **todas las páginas**. Referencia: página de producto de Apple, adaptada a la marca Team Celular (índigo del imagotipo, iconos Bootstrap Icons de `react-icons/bs`).

## Principios

- **Canvas negro puro** (#000). La fotografía del trabajo real aporta el color.
- **Un solo color de acción**: azul Team `#1a6dff` en botones primarios (Presupuesto, Pedir presupuesto, Elegir sucursal). Nunca otro color de botón relleno.
- **Un solo color de link**: `#6aa6ff` sobre negro, `#0066CC` sobre bandas claras.
- **WhatsApp** conserva su verde solo en la barra CTA mobile; en el resto va como link o botón ghost.
- **Sin sombras.** La profundidad sale del contraste tonal (#000 → #1D1D1F) y del radio 28px.
- **Peso máximo 600.** Tracking negativo en titulares grandes.

## Implementación

- Tema oscuro forzado en `src/app/layout.tsx` (`forcedTheme="dark"`). Las páginas existentes con `dark:` heredan el sistema.
- `tailwind.config.ts` remapea `slate-700…950` a la escala Apple y expone `tc-*` y `rounded-card`.
- Clases listas en `src/app/globals.css`:

| Clase | Uso |
|---|---|
| `tc-section` | Contenedor de sección (1200px, 80px vertical) |
| `tc-eyebrow` | Línea previa al H1 |
| `tc-display` | H1 de hero |
| `tc-heading` | H2 de sección |
| `tc-subheading` | Título de card |
| `tc-body` | Párrafo gris (#86868B) |
| `tc-card` | Card #1D1D1F, radio 28px, padding 28px |
| `tc-btn tc-btn-primary` | CTA índigo en píldora |
| `tc-btn tc-btn-ghost` | Acción secundaria (fondo smoke) |
| `tc-link` | Link índigo claro, se acompaña de `›` o `BsArrowRight` |
| `tc-glass` | Barra flotante sobre fotografía |

## Ritmo de página

1. Hero centrado: eyebrow → H1 `tc-display` → bajada 19–21px → CTA primario + link WhatsApp → foto en card 28px con barra `tc-glass`.
2. Secciones negras con `tc-heading` a la izquierda y link a la derecha; grilla de 3 `tc-card`.
3. Una banda clara (#F5F5F7, texto #1D1D1F) por página para datos duros (precios, tablas).
4. Cierre centrado con un único CTA primario.

## Do / Don't

- **Do** conservar H1, H2, textos y enlaces existentes al migrar una página: el diseño cambia, el contenido SEO no.
- **Do** usar iconos de `react-icons/bs` monocromos (#F5F5F7 o #6aa6ff).
- **Don't** gradientes en fondos de texto, sombras, bordes + sombra, ni pesos 700/800.
- **Don't** un segundo color de botón relleno.
- **Don't** radios menores a 10px en elementos interactivos.

## Tienda y carrito

- **Tarjeta de producto:** `#1D1D1F`, radio 28px, foto sobre recuadro `#F5F5F7` (los productos vienen con fondo blanco), marca y categoría a 12px en gris, precio 21px semibold y botón `tc-btn-primary` a lo ancho.
- **Estados de stock:** amber-400 / emerald-400 / rose-400, texto de 12px, nunca como fondo.
- **Botón flotante del carrito:** `tc-glass` con `BsBag`, por encima de la barra CTA mobile (`bottom-24`).
- **Panel del carrito y checkout:** `#1D1D1F`, radio 28px, fondo de modal negro al 60% con blur.

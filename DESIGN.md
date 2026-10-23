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

1. Hero compacto: H1 → bajada breve → CTA primario + WhatsApp → imagen de apoyo. En escritorio puede dividirse en dos columnas. Evitar secuencias de scroll que demoren llegar a precios o servicios.
2. Secciones negras con `tc-heading` a la izquierda y link a la derecha; grilla de 3 `tc-card`.
3. Una banda clara (#F5F5F7, texto #1D1D1F) por página para datos duros (precios, tablas).
4. Cierre centrado con un único CTA primario.

## Do / Don't

- **Do** conservar intención, entidades, enlaces y hechos al simplificar una página. Reescribir repeticiones y usar desplegables nativos para detalles, manteniendo su contenido en el HTML y su correspondencia con el schema.
- **Do** usar iconos de `react-icons/bs` monocromos (#F5F5F7 o #6aa6ff).
- **Don't** gradientes en fondos de texto, sombras, bordes + sombra, ni pesos 700/800.
- **Don't** un segundo color de botón relleno.
- **Don't** radios menores a 10px en elementos interactivos.

## Lectura rápida y voz humana

El cliente necesita identificar el servicio, entender las condiciones y elegir cómo consultar. Mostrar primero modelo o falla, precio orientativo cuando exista, ubicación real y siguiente paso. El detalle técnico se puede abrir después.

- Una acción primaria por bloque. Los accesos a precios, llamada y Maps son secundarios; no competir con varios botones rellenos.
- Una idea por párrafo, con frases directas en español rioplatense. Usar palabras del cliente, como «no carga» o «pantalla con líneas», y explicar los términos técnicos cuando sean necesarios.
- Los iconos acompañan etiquetas. Reutilizar Bootstrap Icons y, para las marcas, Simple Icons ya instalado. No usar logos como avales ni como sustituto del nombre accesible.
- Usar `details` y `summary` para FAQ, proceso y comparaciones extensas. Deben funcionar sin JavaScript, por teclado, con foco visible y objetivos de al menos 44 px.
- Costos de revisión, garantía, disponibilidad, restricciones y fecha de precios quedan cerca de la oferta. No esconder una condición necesaria para decidir en un desplegable.
- Mantener párrafos legibles, con contraste AA y ancho aproximado de 65 caracteres. Revisar 320, 390 y 1280 px; tablas y precios no deben ensanchar toda la página.
- Las imágenes generadas son ilustraciones de componentes, con pie y texto alternativo claros. No presentarlas como fotos del local, personal, repuestos disponibles o reparaciones realizadas. Las fotos reales siguen siendo la evidencia de trabajo.
- Optimizar assets para web, reservar su proporción y priorizar solo la imagen inicial. No añadir carruseles, video o animación para reemplazar información útil.
- Conservar precios, plazos, direcciones y garantías desde sus fuentes del proyecto. Humanizar no autoriza inventar testimonios, resultados, certificaciones ni nuevas condiciones comerciales.

Las ilustraciones de pantalla y USB-C del 23/10/2026 son originales generadas para estas páginas, exportadas a WebP y reutilizadas. Sus fuentes PNG se conservan fuera del repositorio; no se retiraron marcas de agua de terceros.

## Tienda y carrito

- **Tarjeta de producto:** `#1D1D1F`, radio 28px, foto sobre recuadro `#F5F5F7` (los productos vienen con fondo blanco), marca y categoría a 12px en gris, precio 21px semibold y botón `tc-btn-primary` a lo ancho.
- **Estados de stock:** amber-400 / emerald-400 / rose-400, texto de 12px, nunca como fondo.
- **Botón flotante del carrito:** `tc-glass` con `BsBag`, por encima de la barra CTA mobile (`bottom-24`).
- **Panel del carrito y checkout:** `#1D1D1F`, radio 28px, fondo de modal negro al 60% con blur.

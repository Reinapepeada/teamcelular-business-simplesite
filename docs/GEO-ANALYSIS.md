# GEO Analysis — teamcelular.com (pasada profunda)

Repo: `teamcelular-business-simplesite` · 75 páginas · App Router · 2026-08-20.

> **Corrige la pasada anterior.** Tres hallazgos del primer informe eran falsos positivos
> de grep: el canonical, el `ArticleSchema` y el breadcrumb **sí están** en todas las
> páginas — vienen de componentes compartidos (`buildWebsiteMetadata`, `HighIntentGuidePage`,
> `BrandGuidePage`), no de cada archivo. La instrumentación técnica está mejor de lo
> que parecía; el problema real es de contenido y de frescura.

## GEO Readiness Score: 81/100

| Criterio | Peso | Score | Nota |
|---|---|---|---|
| Citability | 25% | 20/25 | Hero auto-contenido con precio + plazo + dirección. Faltan tablas comparativas (solo 4 en todo el sitio). |
| Estructura | 20% | 17/20 | H2 tipo pregunta, 17 FAQPage, breadcrumb universal. |
| Multi-modal | 15% | 9/15 | 3 guías con `<video>` y **cero `VideoObject`**. |
| Autoridad | 20% | 12/20 | Person schema con `sameAs` en las 26 guías, pero **cero fecha y cero autor visibles en HTML**. Contenido stale. |
| Accesibilidad técnica | 20% | 19/20 | SSR total, todos los crawlers de IA permitidos, sitemap limpio. |

## Verificado y correcto (no tocar)

- `src/app/robots.ts`: GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended → todos `allow: /`.
- `src/lib/seoMetadata.ts:72` — `buildWebsiteMetadata` siempre emite `alternates.canonical`. Todas las páginas lo usan salvo `/productos`, que es un `permanentRedirect` a `/tienda` (correcto).
- Las 26 guías emiten `ArticleSchema` (Person con `sameAs` + `reviewedBy`) y `BreadcrumbJsonLd`, vía `HighIntentGuidePage` (17) o import directo (9).
- `src/app/sitemap.ts:155` — los productos de `/tienda/[slug]` ya están excluidos del sitemap por thin programmatic tail. El bloat de 92 URLs de GSC es histórico, no activo.
- `reparaciones/iphone/[model]` aplica `index: false` solo a modelos sin página propia; los 8 con página están en sitemap. Coherente.

## Hallazgos reales

**1. Cero fecha y cero autor visibles en HTML (24 de 26 guías)**
`HighIntentGuidePage.tsx:136` renderiza `Lectura {readingTime}` y nada más. La fecha existe solo dentro del JSON-LD. Los extractores de IA leen el texto renderizado: sin fecha visible, el contenido no se puede fechar y pierde elegibilidad por frescura.

**2. Frescura vencida en 20 de 26 guías**
- `guias/soporte-empresas-servicio-tecnico` → `2025-12-11` (**8 meses**)
- `guias/mantenimiento-preventivo-celulares` → `2026-05-08`
- 8 guías → `2026-06-09` (72 días)
- 11 de las 12 guías de marca heredan el default `2026-06-09` de `brandGuideConfigs.ts:735`
- Solo `presupuesto-service-oficial-segunda-opinion` (`2026-08-12`) está fresca.

Umbral relevante: bajo 90 días la probabilidad de cita es ~3x mayor. Ocho guías cruzan ese umbral en menos de tres semanas.

**3. Video sin `VideoObject`**
`<video>` en `mantenimiento-preventivo-celulares`, `microelectronica-reballing-caba` y `soporte-empresas-servicio-tecnico`, sin schema. El contenido multi-modal es el criterio con mayor lift de selección y acá está a medias.

**4. Canibalización por pares de intención duplicada**
Dos pares apuntan a la misma query con títulos casi idénticos:

| Guía | Reparación | Query en disputa |
|---|---|---|
| `/guias/reparacion-pantalla-celular`<br>"Cambio de Pantalla de Celular en CABA \| Display Original" | `/reparaciones/cambio-pantalla-caba`<br>"Cambio de Pantalla Celular Buenos Aires \| Display Original" | cambio de pantalla celular |
| `/guias/cambio-bateria-celular`<br>"Cambio de Batería de Celular en CABA" | `/reparaciones/cambio-bateria-caba`<br>"Cambio de Batería Celular Buenos Aires" | cambio de batería celular |

Y cuatro páginas compiten por el head term "reparación/arreglo de celulares CABA": `/`, `/arreglo-de-celulares`, `/reparacion-de-celulares-cerca-de-mi`, `/tecnico-de-celulares`. Los H1 sí están diferenciados — el solapamiento está en los `title` y en el enlazado interno, no en el cuerpo.

**5. Solo 4 tablas en todo el sitio**
Las tablas comparativas son de las estructuras más extraídas por motores de IA. Las guías de marca ya tienen los datos de precio en `repairPrices` pero los renderizan como prosa.

**6. `authorName` muerto en `HighIntentGuidePage.tsx:101`**
Pasa `authorName="Team Celular"` a `ArticleSchema`, que lo ignora y usa `TECHNICAL_AUTHOR`. Sin efecto en el output, pero engaña al leer el código.

---

# Plan de fix — estado 2026-08-20

Fases 1, 3, 4 y 5 implementadas y verificadas en SSR. Fase 2 parcial: quedan 8 guías sin refresh editorial (ver abajo).


Ordenado por (impacto ÷ esfuerzo). Las fases 1 y 2 se hacen casi enteras en componentes compartidos.

### Fase 1 — Fecha y autor visibles · 2 archivos

- `src/components/seo/HighIntentGuidePage.tsx`: junto a `Lectura {readingTime}` (línea 136), agregar
  `<time dateTime={modifiedTime}>Actualizado el {…}</time> · Alejandro Biarrieta, técnico`.
  Cubre 17 guías de una.
- Mismo bloque en las 9 guías con `ArticleSchema` directo (`reparacion-iphone`, `samsung`, `xiaomi`, `motorola`, `cambio-bateria-celular`, `reparacion-pantalla-celular`, `microelectronica-reballing-caba`, `mantenimiento-preventivo-celulares`, `soporte-empresas-servicio-tecnico`).
- De paso, borrar la prop `authorName` muerta.

Cierra los hallazgos 1 y 6.

### Fase 2 — Frescura, con contenido real detrás

No mover fechas sin editar nada: eso es señal falsa y no se sostiene. Por guía, actualizar un dato verificable y recién ahí la fecha.

Orden por urgencia:
1. `soporte-empresas-servicio-tecnico` (8 meses) — revisar el pitch B2B.
2. Las 12 guías de marca — actualizar `repairPrices` en `brandGuideConfigs.ts` a valores de agosto y sumar modelos nuevos por marca. Un solo archivo, 12 páginas frescas.
3. Las 8 guías en `2026-06-09` — revisar plazos y rango de modelos cubiertos.

Cierra el hallazgo 2. Es el de mayor impacto en AI Mode.

### Fase 3 — Tabla de precios en las guías de marca · 1 componente

`repairPrices` ya existe estructurado en `brandGuideConfigs.ts`. Renderizarlo como `<table>` (reparación / desde / hasta / plazo) dentro de `HighIntentGuidePage`, con `AggregateOffer` ya presente en `serviceJsonLd`. 12 guías ganan un bloque citable con números y ninguna de la competencia publica precios.

Cierra el hallazgo 5.

### Fase 4 — `VideoObject` en las 3 guías con video

Componente chico tipo `ArticleSchema`: `name`, `description`, `thumbnailUrl`, `uploadDate`, `contentUrl`. Tres call sites.

Cierra el hallazgo 3.

### Fase 5 — Consolidar canibalización (decisión de negocio, no de código)

Requiere que definas quién es el dueño de cada query antes de tocar nada:

- **pantalla / batería**: la guía y la página de reparación no pueden repetir el `title`. Opción lazy: dejar la transaccional (`/reparaciones/*`) como dueña del término comercial y reescribir el `title` de la guía hacia la intención informacional ("Cómo saber si tu pantalla necesita cambio de módulo"). Alternativa: 301 de la guía a la reparación y perder el contenido.
- **head term CABA**: elegir una dueña entre `/` y `/arreglo-de-celulares`, y reorientar las otras dos a su modificador propio (proximidad, complejidad técnica).

Es lo que más rinde en AI Overviews — que cita mayoritariamente el top 10 — pero no lo ejecuto sin que decidas los dueños.

## Fuera de alcance del repo

ChatGPT y Perplexity se alimentan de menciones externas (Reddit, YouTube, Wikipedia), no de on-page. Nada en este código las mueve.

## Descartado

- Más páginas: el problema medido es exceso de URLs por query.
- Invertir en `llms.txt` / `ai.txt`: Google Search los ignora explícitamente. Ya están, alcanza.
- RSL, chunking manual, AI-rephrasing: sin evidencia de efecto.


---

# Estado de implementación (2026-08-20)

| Fase | Estado | Archivos |
|---|---|---|
| 1 · Fecha y autor visibles | ✅ 26/26 guías | `GuideByline.tsx` nuevo, `HighIntentGuidePage.tsx`, 9 guías directas |
| 2 · Frescura | 🟡 parcial | 6 guías al 2026-08-20 con cambio real de contenido. **8 siguen en 2026-06-09 sin refresh.** |
| 3 · Tablas de precio | ✅ | `repairPrices.ts` + `RepairPriceTable.tsx` nuevos; Samsung, Xiaomi, Motorola, Pixel |
| 4 · VideoObject | ✅ solo video propio | `VideoSchema.tsx` nuevo; microscopio + interposerReballing |
| 5 · Canibalización | ✅ los dos pares | `guias/reparacion-pantalla-celular`, `guias/cambio-bateria-celular` |

## Pendiente de fase 2

Sin refresh editorial, siguen en `2026-06-09` y ahora la fecha se ve en pantalla:
`celular-mojado-que-hacer`, `face-id-touch-id-no-funciona`, `pantalla-con-lineas-causas-reparacion`,
`pin-de-carga-suelto-solucion`, `reparacion-pantalla-celular`, `cambio-bateria-celular`,
`mantenimiento-preventivo-celulares` (2026-05-08), y las 11 guías de marca sin precios cargados.

Las 11 guías de marca se destraban solas en cuanto haya precios: cargar `repairPrices` en
`brandGuideConfigs.ts` les da tabla, `AggregateOffer` y fecha nueva de una.

# SEO + CTR + Next.js Implementation Plan

## Objetivo
Aumentar impresiones organicas, mejorar CTR en SERP y subir conversion a lead (WhatsApp/formulario) sin degradar Core Web Vitals.

## KPI objetivo (60-90 dias)
- Impresiones organicas: +25%.
- CTR organico promedio: +20% relativo.
- Leads desde SEO (WhatsApp + formulario): +30%.
- LCP mobile: bajar de ~4.7-5.3s a < 3.0s en paginas clave.

## Alcance prioritario
- Home: src/app/(site)/page.tsx
- Presupuesto: src/app/(site)/presupuesto-reparacion/page.tsx
- Reparaciones (hub + plantilla): src/app/(site)/reparaciones/page.tsx, src/app/(site)/reparaciones/serviceLanding.tsx
- Zonas (hub + plantilla): src/app/(site)/zonas/page.tsx, src/app/(site)/zonas/zoneLanding.tsx
- Tienda (hub/categoria/producto): src/app/(site)/tienda/page.tsx, src/app/(site)/tienda/categoria/[slug]/page.tsx, src/app/(site)/tienda/[slug]/page.tsx
- Guias (hub + articulos top): src/app/(site)/guias/page.tsx y articulos de mayor trafico

## Fase 1 (semana 1) - Quick wins de mayor impacto

### 1) Reordenar secciones para intencion alta (CTR interno)
- Home: subir bloque de reparaciones mas pedidas por encima de bloques visuales secundarios.
- Presupuesto: colocar formulario corto por encima del pliegue en mobile.
- Plantillas de servicios/zonas: CTA primario + prueba social antes del primer bloque largo.

### 2) Mejorar copy de valor en primer scroll
- H1 + subtitulo orientado a resultado (tiempo, garantia, cobertura local, siguiente paso).
- CTA principal con verbo de accion y resultado claro.
- Reducir CTA competidores en hero (maximo 1 principal + 1 secundario).

### 3) Instrumentacion minima de conversion
- Registrar eventos en:
  - CTA hero (presupuesto, WhatsApp)
  - Sticky CTA
  - Envio formulario
- Usar @vercel/analytics con eventos custom para medir por bloque.

## Fase 2 (semana 2) - SEO on-page y arquitectura de contenidos

### 1) Diferenciacion de paginas con riesgo de canibalizacion
- Separar mejor intencion entre:
  - /arreglo-de-celulares (intencion servicio general + local)
  - /tecnico-de-celulares (intencion experto/autoridad tecnica)
- Ajustar H1, primer parrafo, FAQ y enlazado interno en cada una.

### 2) Interlinking estrategico
- En guias: agregar bloque fijo de enlaces contextuales a:
  - pagina de servicio equivalente
  - presupuesto
  - guia hermana por marca/falla
- En servicios/zonas: agregar enlaces a guias relevantes por falla y marca.

### 3) Schema y metadata por intencion
- Mantener FAQPage solo donde hay preguntas reales y visibles.
- Mantener Product en PDP y CollectionPage en hubs.
- Revisar titulos/meta para mejorar CTR sin sobreoptimizar.

## Fase 3 (semana 3) - Next.js SEO y performance nativo

### 1) Metadata API estandarizada
- Centralizar helper de metadata por tipo de pagina para evitar drift.
- Usar generateMetadata en paginas dinamicas con canonical robusto.
- Asegurar alternates.languages en rutas clave.

### 2) Sitemaps y robots con estrategia de indexacion
- Mantener noindex en listados filtrados no canonicos.
- Segmentar sitemap si el catalogo crece (productos/categorias/guias por archivo).
- Validar frecuencia/prioridad segun negocio real, no solo por default.

### 3) Optimizacion de LCP/CLS usando capacidades Next.js
- next/image:
  - prioridad solo en imagen LCP real
  - definir sizes precisos por breakpoint
  - revisar calidad por tipo de bloque
- Evitar carga innecesaria de componentes pesados above-the-fold.
- Mantener layout estable (dimensiones reservadas, skeletons utiles).

### 4) Rendering y cache
- Revisar revalidate por tipo de pagina:
  - contenido estable: revalidate mas largo
  - catalogo: revalidate corto + cache server
- Mantener SSR/ISR donde aporta indexabilidad y frescura.

## Fase 4 (semana 4) - QA pre-release y despliegue

### 1) Checklist SEO/A11y/Vitals
- 1 H1 por pagina.
- title/meta unicos.
- canonical correcto.
- enlaces internos descriptivos.
- foco teclado visible.
- contraste y labels.

### 2) Validacion de rich results
- Probar JSON-LD en validator.schema.org y Rich Results Test.

### 3) Monitoreo post-lanzamiento
- Medir 14 dias:
  - impresiones/CTR por URL
  - clics en CTA por bloque
  - tasa de conversion a lead

## Backlog tecnico recomendado
- Crear helper comun de metadata para evitar duplicacion.
- Definir convencion para copy de hero/CTA por tipo de pagina.
- Definir plantilla de interlinking para guias y landings locales.

## Entregables
- Reorden de secciones en paginas clave.
- Metadata + schema revisados por intencion.
- Tracking de CTA implementado.
- Reportes Lighthouse consistentes y comparables.
- Documento de resultados con baseline y delta de KPI.

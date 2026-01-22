# Reporte SEO — Implementación (enero 2026)

## Resumen ejecutivo
- Se mejoró la indexabilidad de la tienda con SSR/ISR para que Google/Bing vean listados reales (no “Cargando…”).
- Se reforzó el marcado Schema en páginas clave (Service/FAQ/Breadcrumbs) y se evitó schema con reseñas no visibles.
- Se actualizó llms.txt para mejorar discoverability en crawlers de IA.

## A) URLs nuevas/actualizadas + intención de keyword
**Core**
- / — intención: “servicio técnico celulares Buenos Aires/Recoleta”
- /arreglo-de-celulares — intención: “arreglo de celulares Recoleta/CABA”
- /tecnico-de-celulares — intención: “técnico de celulares Recoleta/CABA”
- /presupuesto-reparacion — intención: “presupuesto reparación celular CABA”
- /contacto — intención: “taller reparación celulares Recoleta”

**Zonas (servicio + barrio)**
- /zonas — intención: “arreglo de celulares CABA por zonas”
- /zonas/recoleta — intención: “arreglo de celulares Recoleta”
- /zonas/palermo — intención: “arreglo de celulares Palermo”
- /zonas/belgrano — intención: “arreglo de celulares Belgrano”
- /zonas/caballito — intención: “arreglo de celulares Caballito”
- /zonas/almagro — intención: “arreglo de celulares Almagro”
- /zonas/balvanera — intención: “arreglo de celulares Balvanera/Once”
- /zonas/microcentro — intención: “arreglo de celulares Microcentro”

**Guías**
- /guias — intención: “guías reparación celulares”
- /guias/reparacion-iphone-buenos-aires — intención: “reparación iPhone Buenos Aires”
- /guias/reparacion-pantalla-celular — intención: “reparación pantalla celular”
- /guias/cambio-bateria-celular — intención: “cambio batería celular”
- /guias/microelectronica-reballing-caba — intención: “microelectrónica/reballing CABA”
- /guias/soporte-empresas-servicio-tecnico — intención: “servicio técnico empresas CABA”
- /guias/mantenimiento-preventivo-celulares — intención: “mantenimiento preventivo celulares”

**Tienda**
- /tienda — intención: “tienda accesorios y repuestos celulares CABA”
- /tienda/categoria/[slug] — intención: “comprar repuestos por categoría”
- /tienda/[slug] — intención: “producto repuesto/accesorio + marca/modelo”

## B) Checklist de indexación (GSC)
- [ ] Sitemap incluye zonas, guías y productos.
- [ ] /tienda renderiza productos en HTML (SSR/ISR).
- [ ] Canonical correcto en páginas core, tienda y producto.
- [ ] Robots.txt permite rastreo de contenido público y bloquea admin/api.
- [ ] BreadcrumbList y Service/FAQ visibles y válidos.
- [ ] Schema Product sin reseñas inventadas.

## Métricas Lighthouse (local)
Valores extraídos de los reportes JSON locales.

| Página | LCP (ms) | CLS | INP (ms) |
|---|---:|---:|---:|
| Home | 32677 | 0.0089 | 0 |
| Zonas | 2625 | 0.0005 | 0 |
| Tienda | 21608 | 0.0986 | 0 |
| Guías | 12140 | 0.0065 | 0 |
| Presupuesto | 1596 | 0.0001 | 0 |

## C) Riesgos / edge cases
- **Parámetros de filtros**: URLs con query podrían duplicar contenido si no se controlan (mitigar con canonicals y paginación clara).
- **Catálogo grande**: si el total crece, separar sitemaps por categoría/productos.
- **Productos sin imágenes**: fallback a placeholder puede reducir CTR en imágenes.

## D) Quick wins (2 semanas)
### 10 ideas de nuevas guías
1. “Guía: Pin de carga suelto — señales y solución”
2. “Guía: Celular mojado — qué hacer en las primeras 2 horas”
3. “Guía: Face ID/Touch ID fallas frecuentes”
4. “Guía: Pantalla con líneas — causas y reparación”
5. “Guía: Batería inflada — riesgos y pasos”
6. “Guía: Cámara borrosa — limpieza vs reemplazo”
7. “Guía: Problemas de audio/micrófono”
8. “Guía: Problemas de señal y antena”
9. “Guía: Actualizaciones que ralentizan el equipo”
10. “Guía: Mantenimiento preventivo para empresas (flotas móviles)”

### 10 landings / variantes (alta intención)
1. “Arreglo de celulares en Barrio Norte”
2. “Arreglo de celulares en Once”
3. “Arreglo de celulares en Almagro Norte”
4. “Arreglo de celulares en Villa Crespo”
5. “Arreglo de celulares en Colegiales”
6. “Arreglo de celulares en Núñez”
7. “Arreglo de celulares en San Telmo”
8. “Arreglo de celulares en Retiro”
9. “Arreglo de celulares en Constitución”
10. “Arreglo de celulares en Boedo”

## Cambios clave implementados
- SSR/ISR para /tienda con productos en HTML.
- BreadcrumbList JSON-LD en páginas de guías y tienda.
- Schema Service + FAQ en presupuesto.
- llms.txt ampliado.
- Product schema sin AggregateRating artificial.
- Robots.txt ajustado (admin/api/cart/checkout).


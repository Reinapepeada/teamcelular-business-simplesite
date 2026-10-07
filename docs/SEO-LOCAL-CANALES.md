# SEO local y canales de producto — teamcelular.com

Fecha: 2026-10-07. Método: checklists de claude-seo (local, maps, schema, ecommerce/merchant) aplicados a mano sobre el código; la skill no está instalada en este entorno y no hubo acceso a GBP, Search Console ni DataForSEO. Parte de MAPS-ANALYSIS (2026-08-20) y GEO-ANALYSIS, que siguen vigentes; acá solo se agrega lo nuevo y lo que cambió de prioridad.

## Resumen

El sitio está técnicamente bien resuelto para local: NAP centralizado en `businessProfile.ts`, una página por sucursal con su `LocalBusiness`, `@id` coherentes, FAQ, precios publicados, robots abierto a buscadores de IA, IndexNow y feed de Merchant. El techo ya no está en el código del sitio sino en tres lugares: las fichas de mapas (nombre, horario, Belgrano ausente en Bing/OSM), las reseñas, y que los productos solo salen por un canal (la web, más un feed que hoy solo alimenta Google).

## Cambios aplicados en este PR

1. **Retiro de la tienda en el Product schema.** El `Offer` declaraba un `Place` suelto llamado "Team Celular Recoleta" (un nombre que no coincide con ninguna entidad) y la propiedad "Retiro: Recoleta o Belgrano". El backend resuelve el retiro en una sola sucursal (`GET /store/pickup-point` → `resolve_storefront_branch`). Ahora `availableAtOrFrom` referencia el `@id` de `Team Celular - Recoleta`, que el layout ya declara en todas las páginas, y la propiedad dice la dirección real de retiro.
2. **Geo de la ficha de producto.** El default de `geo.position` era el Obelisco (-34.6037, -58.3816). Pasa a las coordenadas de Recoleta de `BUSINESS_PROFILE`. Impacto bajo (Google ignora esas meta), pero era un dato falso.
3. **`llms.txt`** enlaza el feed de productos para que los asistentes de IA encuentren el catálogo con precio y stock.

## Visibilidad local: qué falta, por prioridad

| # | Acción | Dónde | Impacto | Esfuerzo |
|---|---|---|---|---|
| 1 | Sacar la lista de servicios del nombre de la ficha de Recoleta y unificar `Team Celular - Recoleta` / `Team Celular - Belgrano` (el schema ya usa esos nombres) | GBP | Crítico: riesgo de suspensión y NAP inconsistente | 20 min |
| 2 | Corregir horario de Bing (11:00 → 10:30), apuntar el sitio a HTTPS y crear la ficha de Belgrano | Bing Places | Alto: media hora diaria "cerrado" y Belgrano invisible en Bing/Copilot | 30 min |
| 3 | Cargar Belgrano en OpenStreetMap y verificar ambas en Apple Business Connect | OSM, Apple | Medio: Apple Maps, Siri y agregadores | 30 min |
| 4 | Pedir reseña con link directo de cada ficha al entregar el equipo (WhatsApp de "listo para retirar") y responder todas | GBP + flujo de WhatsApp | El mayor factor movible del pack local | continuo |
| 5 | Categorías de GBP: primaria "Servicio de reparación de teléfonos móviles", secundarias "Tienda de accesorios para móviles", "Servicio de reparación de computadoras" | GBP | Alto para consultas de tienda | 10 min |
| 6 | Publicar en GBP fotos del local, del laboratorio y de trabajos, y una publicación semanal (precio de pantalla/batería del mes) | GBP | Medio | continuo |
| 7 | Citas locales consistentes con el mismo NAP: Páginas Amarillas, Cylex, Foursquare, Waze, Yelp | Directorios | Medio-bajo | 2 h |
| 8 | Horarios especiales en feriados (GBP y `specialOpeningHoursSpecification`) | GBP + schema | Bajo-medio | por feriado |
| 9 | Medir geo-grid (DataForSEO o Local Falcon) para saber en qué cuadras se cae el top 3 | Medición | Habilita priorizar | — |

Detalles de código menores, sin urgencia:

- El `LocalBusiness` global (`StructuredData.tsx`) se llama "Team Celular" y usa la dirección de Recoleta, y además lista a Recoleta como `department`: son dos entidades en la misma dirección. Lo limpio es que el nodo global sea solo `Organization` con las dos sucursales como `subOrganization`/`department`. Conviene hacerlo junto con la unificación de nombres en GBP, no antes.
- `addressLocality` varía entre "Ciudad Autónoma de Buenos Aires" (global) y el barrio (páginas de sucursal). Elegir uno; Google normaliza CABA, pero la consistencia ayuda a las citas.
- Belgrano y Recoleta no tienen fotos propias en el schema (`image` es la OG genérica). Una foto real de cada frente ayuda a la entidad y a la ficha.

## Productos por más canales

Hoy existe un único feed (`/feed/google.xml`, RSS con namespace `g:`) que se usa para Google Merchant. Ese mismo formato lo aceptan casi todos los canales, así que la mayoría de lo que sigue es configuración, no desarrollo.

| Canal | Qué hace falta | Costo de desarrollo |
|---|---|---|
| Google Shopping, listados gratuitos | Ya hay feed. Confirmar en Merchant Center que esté como fuente programada y sin rechazos | ninguno |
| Google: "en stock cerca" y pestaña Productos de la ficha | Vincular Merchant con GBP y sumar un feed de inventario local (`store_code`, `availability`, `price`) con la tienda de retiro. Es lo que hace aparecer los productos en Maps y en búsquedas "cerca de mí" | bajo: un segundo endpoint con el mismo catálogo |
| Microsoft Merchant Center (Bing Shopping, Copilot) | Importar el proyecto de Google o cargar la misma URL de feed | ninguno |
| Meta (catálogo de Facebook/Instagram, etiquetas de producto en posts, catálogo de WhatsApp Business) | Fuente de datos programada con la misma URL; el catálogo de WhatsApp Business se sincroniza desde Meta Commerce Manager | ninguno |
| Pinterest y TikTok catálogos | Misma URL de feed | ninguno |
| Mercado Libre | Integración por API o carga manual; es el marketplace donde más se buscan repuestos en Argentina | medio-alto; decisión comercial |
| Buscadores de IA (ChatGPT, Perplexity, Claude) | `llms.txt` ahora enlaza el feed (este PR); sumar las categorías principales cuando estén estables | mínimo |

Mejoras al feed y al schema de producto que suben aprobación y visibilidad en todos esos canales:

- **Envío:** ni el feed (`g:shipping`) ni el `Offer` (`shippingDetails`) declaran envío. El envío se cotiza en vivo, así que hay que acordar una tarifa de referencia (por ejemplo, CABA) o configurar el envío a nivel cuenta en Merchant Center. Sin eso Google limita el resultado enriquecido de producto.
- **Retiro:** `g:pickup_method` y `g:pickup_sla` habilitan la etiqueta "retiro hoy". La tienda ya publica "retiro en el día" en las categorías; confirmar que es cierto para todo el stock antes de declararlo.
- **`g:google_product_category`:** hecho en este PR para las 7 categorías publicadas (adaptador, auricular, auricular BT, cable, cargador, cargador portátil, power bank). Una categoría nueva sin mapeo sale sin el campo y Google la infiere; sumarla en `merchantFeed.ts` cuando se cree.
- **`g:item_group_id`** para variantes (color/capacidad), si el catálogo las expone.
- **Identificadores:** cargar GTIN donde exista. Los productos con `identifier_exists=no` compiten peor.
- **Fichas de producto:** son las que se indexan y comparten. Una descripción propia de 2-3 oraciones por producto (compatibilidad, qué incluye, garantía) rinde más que la genérica.

## Próximo paso

Las acciones 1 a 3 de mapas son gratis y se hacen en una hora; son las que más riesgo sacan. En canales, conectar la URL de feed existente a Microsoft y Meta no requiere código. El siguiente desarrollo con retorno claro es el feed de inventario local para que los productos aparezcan en la ficha de Google y en Maps; necesita decidir el `store_code` de Recoleta en GBP y confirmar la promesa de retiro.

# Auditoría SEO de la tienda

Fecha: 15 de octubre de 2026. Sitio: https://teamcelular.com/tienda. Base de código: `8bf28624`. Se aplicaron las cinco skills solicitadas: schema, clusters, ecommerce, contenido e imágenes. El alcance es el catálogo público y su código, sin escrituras en Fixbee ni configuración de cuentas comerciales.

## Evidencia y diagnóstico

Se consultaron las 22 URLs comerciales del sitemap: la tienda, siete categorías y 14 productos. Todas respondieron HTTP 200, con canónica propia y marcado legible en el HTML de respuesta. `before.json` conserva la observación anterior al cambio; `local-after.json`, la versión local compilada. Precios y disponibilidad son una instantánea, no datos para reutilizar como catálogo estático.

| Hallazgo | Evidencia anterior | Prioridad y resolución |
|---|---|---|
| Los datos del fabricante y la garantía están en JSON-LD, pero no en una ficha comparativa visible | Ninguna de las 14 fichas presenta tabla; nueve productos tienen GTIN con dígito de control válido | Alta. Tabla accesible con marca, modelo, condición, GTIN, garantía y entrega; omite los datos ausentes |
| Los scripts JSON-LD insertan texto del catálogo sin escapar el cierre de etiqueta | `Product`, `BreadcrumbList` e `ItemList` usaban `JSON.stringify` directamente en `dangerouslySetInnerHTML` | Alta. Serialización compartida que escapa `<`; prueba con cierre de script hostil. Es una defensa de la frontera de datos, sin indicio de explotación observada |
| El modelo se publica también como MPN sin un campo MPN en el contrato | Nueve fichas publican el modelo como `mpn` | Media. Se conserva `model` y se omite MPN; no se fabrica SKU ni GTIN |
| La descripción puede cortar garantía y entrega | Hub: «Garantía 1…»; otros productos terminan a mitad de una palabra | Media. Reservar espacio para entrega y garantía; recortar solamente la introducción por palabra |
| Las categorías prometen retiro en el día y mencionan ambas sucursales como punto de compra | Metadata y tarjeta de Twitter; el retiro online está en Recoleta | Media. Retiro en Recoleta o envío según producto, sin compromiso de plazo |
| Las fotos de producto heredan tamaño de la imagen institucional | Hub y PUXIDA C-81: originales JPEG 1400×1400, 123.090 y 138.385 bytes, frente a `og:image:width=1200` y `height=630` | Media. Omitir dimensiones desconocidas de las fotos; conservar las de la imagen institucional |
| Las categorías carecen de enlaces contextuales a complementos | Existen enlaces de navegación y breadcrumbs, pero no una orientación de compra con complementos | Media. Siete orientaciones concretas y once enlaces contextuales a categorías disponibles |

## Datos estructurados

| Tipo | Situación | Resultado |
|---|---|---|
| Organization, WebSite y LocalBusiness | Presentes en todas las páginas | Se conservan entidades y referencias del negocio |
| Product y Offer | 14/14 productos con nombre, imágenes, precio ARS y disponibilidad | Se conservan importes, GTIN y condición conocida; se omite condición desconocida en vez de asumir usado |
| Garantía | El fallback del schema usaba la garantía del servicio técnico | Se alinea con la ficha: consultar antes de comprar cuando falta el dato |
| MerchantReturnPolicy | Ventana y método ya publicados; faltaba enlace a política | Se añade `merchantReturnLink` a `/devoluciones`, sin modificar términos comerciales |
| BreadcrumbList | Presente y alineado con la jerarquía del catálogo | Se conserva y se protege su serialización |
| ItemList | Presente en listados | Se conserva y se protege su serialización |
| FAQPage | Existente en la tienda | Informativo; no se promete mejora de resultados enriquecidos ni se reemplaza por QAPage |
| ProductGroup | El contrato adapta cada producto a una variante sintética | No se añade: no acredita variantes comerciales reales |
| Review/AggregateRating | No hay opiniones verificadas de estos productos | No se generan reseñas ni puntuaciones |

`generated-schema.json` contiene los 14 bloques Product obtenidos del HTML local ya corregido. Es evidencia de validación; la aplicación sigue generándolos con el catálogo vigente. La elegibilidad no garantiza aparición en Google. Referencia: [documentación oficial de merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing).

## Contenido y confianza

El responsable comercial es Team Celular. Las fichas describen productos concretos, muestran condición, precio, garantía y contacto, y enlazan la política de devolución. La nueva tabla hace visibles datos que ya existían en el catálogo; no atribuye pruebas de laboratorio, certificaciones ni experiencia de uso que no se hayan documentado.

Las categorías añaden ayuda para elegir conectores, potencia, funciones de audio y opciones de entrega. Se distingue reducción de ruido del micrófono de cancelación activa de la reproducción. No se aumenta texto por una cuota de palabras ni se crean artículos para cada variante de consulta. Las descripciones comerciales existentes siguen necesitando contrastarse con cajas/manuales para confirmar potencias, compatibilidad y autonomía: esta revisión no acredita ensayos del fabricante.

La evaluación E-E-A-T es cualitativa: hay identidad y contacto verificables en el sitio, información de producto específica y políticas públicas; falta evidencia de pruebas propias y opiniones verificadas por producto. No se auditó autoridad externa, backlinks ni satisfacción posterior a la compra. No se asigna un número de ranking a estos indicadores. [Google explica su criterio de contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## Clusters e intención

`cluster-plan.json` y `cluster-plan.md` ordenan 35 consultas candidatas en carga/energía, audio y conectividad. El centro es la tienda, con siete categorías ya existentes. `cluster-map.html` muestra 25 enlaces entre tienda, categorías y complementos; la navegación existente agrega más enlaces.

Se hicieron doce búsquedas exploratorias, conservando títulos y URLs en `search-evidence.json`. La herramienta devuelve resultados combinados, sin asegurar diez resultados orgánicos de Google en Argentina por consulta. Por eso no se publican volúmenes, dificultad ni una matriz de solapamiento ficticia. La agrupación es editorial y provisional. Antes de consolidar `cargador-portatil` y `power-bank`, verificar consultas y canónicas elegidas en Search Console y obtener SERPs localizadas; no redirigir productos ni categorías basándose solo en semejanza de nombres.

## Imágenes

Las 14 fichas tienen entre dos y cuatro imágenes, con alt descriptivo. El componente existente mantiene AVIF/WebP responsivo, prioridad para la foto principal y carga diferida de miniaturas. Las dos originales examinadas superan 800 px y pesan menos de 200 KB; esto no acredita todas las fotos ni una mejora de Core Web Vitals de campo.

Se aplicó la revisión de necesidades de `seo-image-gen`. No hay ausencia de imagen principal que justifique generar reemplazos: las fotos publicadas identifican productos reales. Nanobanana no está conectado y no se instaló ni se consumió una API de pago. Una nueva vista de puertos, conectores o etiqueta debe partir de fotos reales de cada producto; una imagen sintética no debe inventar esos detalles. No se afirma que las fotos actuales sean fotografías originales o imágenes generadas: su procedencia no fue auditada.

## Validación

362 pruebas aprobadas, incluidas nueve nuevas sobre metadata, paridad ficha/schema, condición, stock, entrega y serialización. Lint con cero advertencias, TypeScript, build de producción y `npm audit --audit-level=high --omit=dev` aprobados, sin dependencias añadidas. Las 22 URLs locales conservan canónica y robots; 14/14 fichas muestran tabla y no declaran MPN derivado del modelo ni dimensiones Open Graph inventadas.

Se revisó el diff completo, los llamadores de JSON-LD y el contrato público del catálogo. No cambian llamadas, checkout, reservas, importes ni stock. La revisión React conserva SSR, no agrega fetches ni efectos, y usa tablas semánticas y enlaces del servidor. Playwright verificó ficha a 390×844 y categoría a 390 y 1440 px, sin desbordamiento horizontal, con fotos cargadas y sin errores de consola. CI del último head y publicación del SHA integrado se registran por separado al cerrar la entrega.

## Pendientes

1. Confirmar en Merchant Center la fuente `/feed/google.xml`, devoluciones y avisos de productos. La existencia de un feed público no acredita que la cuenta lo haya incorporado.
2. Revisar Search Console después del nuevo rastreo: productos, indexación y consultas de categorías. No se garantiza posición ni tráfico y no se atribuye un efecto GEO a estas correcciones.
3. Reunir fotos de detalle, manuales y opiniones auténticas por producto antes de ampliar afirmaciones o marcar reseñas.
4. Completar solapamiento Google localizado y datos de demanda antes de decidir nuevas páginas o consolidaciones.

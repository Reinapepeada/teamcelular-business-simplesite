# Revisión integral de experiencia y SEO de Team Celular

Objetivo: resolver los problemas técnicos y de presentación detectados, revisar las imágenes genéricas o poco creíbles, reducir la información que abruma y mantener SEO como directriz. El alcance comprende el sitio público completo y los recorridos de consulta y compra; la entrega no se considera terminada al mejorar sólo una plantilla.

Base inspeccionada: `9dfb1519a5abfc515793e5181b29aa5ffab60539`, con PR74 y PR75. Rama independiente `fix/seo-experience-polish-20261023`. Rastreo del 23/10: 84 URL del sitemap, todas HTTP200. Revisión visual de 65 assets raster locales y captura de seis páginas representativas a 390 y 1280 px antes de editar. Evidencia del workspace en `outputs/teamcelular-polish-2026-10-23/`; no se publica en este repositorio.

## Requisitos y cobertura

| Área | Trabajo y criterio de cierre | Estado |
| --- | --- | --- |
| Rastreo e indexabilidad | Comparar las 84 URL antes/después: estado, canonical, robots, title/H1, enlaces y JSON-LD. Comprobar redirecciones y recuperación de URL inexistente. Mantener las solicitudes de indexación y ventanas de observación existentes. | Línea de base guardada; comparación de las 84 URL preparada para preview y producción. |
| Imágenes | Revisar los assets utilizados, retirar escenas sin procedencia comprobada que se presentan como trabajo propio, textos deformados y falsos avales. Conservar fotos familiares, imágenes de producto y las ilustraciones útiles identificadas como tales. Revisar también vistas sociales y datos estructurados. | Revisión y correcciones terminadas; conservar fotos reales de familia/producto y material ilustrativo rotulado. Verificación de release pendiente. |
| Servicios | Aplicar lectura breve a todas las páginas de la plantilla: precio y condiciones accesibles antes de imágenes en móvil, detalle técnico desplegable, FAQ nativas y CTA coherente. | Implementado; controles de precios, lectura, detalle, móvil y ausencia de imágenes editoriales defectuosas aprobados localmente. |
| Guías por marca y síntoma | Conservar texto técnico, preguntas, enlaces y entidades en HTML. Resumen breve, condiciones visibles y desarrollo opcional. Revisar tanto la plantilla común como las guías con maquetación propia. | Plantilla común, índice y guías propias revisados; contenido técnico en HTML y pruebas sin JavaScript aprobadas. |
| Portada, zonas y sucursales | Preservar el rediseño publicado y revisar carga, contenido repetido, mapas, contactos de cada sede y acceso desde móvil. | Revisión por familias aprobada. Rediseño de portada y sedes conservado; imágenes genéricas retiradas de zonas. |
| Laboratorio, empresa, contacto e inglés | Revisar imágenes, afirmaciones, densidad, semántica, idioma y siguiente paso. Contrastar las condiciones con las fuentes del proyecto; no inventar pruebas de trabajo ni compromisos comerciales. | Revisado; ver detalle y límites abajo. |
| Navegación y accesibilidad | Menú, foco, teclado, zoom, contraste normal/hover, objetivos táctiles, tablas, formularios y modales en móvil, tablet y escritorio. Contenido utilizable sin JavaScript cuando corresponde. | Tokens, enlaces, foco, menú y tablas corregidos; teclado y anchos 320/390/1280 verificados localmente. |
| Conversión y medición | Comprobar el contexto de CTA, presupuesto, sucursal y estados de error/éxito. Revisar las bases técnicas de atribución de leads sin confundir clics con mensajes o ventas. | Revisado; ver detalle y límites abajo. |
| Tienda | Revisar catálogo, filtros, imágenes, stock, precios, ficha, carrito, validación y recuperación de checkout con servicios simulados. Conservar exactitud del producto y contratos de comercio. | Revisado; ver detalle y límites abajo. |
| Rendimiento | Revisar cargas y tamaños de imágenes, prioridad de recursos, movimiento reducido, estabilidad visual y respuesta de interacciones. Separar laboratorio de CrUX; no acreditar recuperación de campo inmediata. | Cargas editoriales y movimiento revisados; medición pública posterior a la publicación pendiente. |
| Entrega | Diff completo revisado, pruebas pertinentes, lint, TypeScript, build, detector visual y QA por familias. PR, CI del último head y preview Vercel aprobados antes de integrar; producción y dominios del SHA integrado verificados. | 456 unitarios y 84 escenarios de navegador aprobados; build aprobado; PR/CI/preview/producción en verificación. |

## Preservación

Conservar title/H1 y consultas en seguimiento, canonical, robots, URLs útiles, enlaces, entidades y paridad entre FAQ y schema. Los precios, teléfonos, direcciones, garantías, plazos y condiciones provienen de sus fuentes existentes. La presentación puede cambiar; los compromisos nuevos y los datos que falten requieren corroboración. No fabricar casos, reseñas, técnicos, autorizaciones de fabricantes ni imágenes que se presenten como reparaciones reales.

Las imágenes retiradas de una página no se borran del directorio público durante este ajuste: se conservan URLs históricas y referencias externas. Las vistas sociales con material editorial defectuoso pasan a la imagen de marca del sitio. Las fotos de productos reales conservan su contenido.

## Primer bloque de implementación

- Índice de guías ordenado por marca y por falla, en una lista de enlaces sin la galería de portadas con texto deformado ni las descripciones repetidas. Enlaces explícitos y accesibles también en móvil; CTA y servicios existentes conservados.
- Plantilla de guías con resumen breve, condiciones comerciales visibles y contenido técnico desplegable en HTML. Precios por marca después de la introducción, antes del desarrollo.
- Plantilla de servicios unificada: imágenes de componentes rotuladas cuando aportan información; retirada de escenas de técnicos sin prueba de procedencia. Precios antes de la imagen en móvil y detalles opcionales en todas las variantes.
- Tokens Tailwind alineados con el azul accesible ya publicado; foco visible compartido para controles y enlaces dentro del contenido principal.

Las casillas pendientes describen trabajo restante del objetivo completo. Las validaciones parciales no acreditan el cierre integral.

## Revisión y correcciones adicionales

Las guías propias de iPhone, Motorola y Xiaomi adelantan contacto y precios. Se retiraron badges y estadísticas duplicadas del encabezado; autoría y fecha se conservan. El proceso y los modelos quedan en desplegables nativos cuando el detalle no es necesario para decidir. Las preguntas, tablas, enlaces por modelo y condiciones siguen en HTML. El índice conserva las 27 guías, con navegación por marca y falla.

Las páginas de zonas prescinden de la imagen genérica; conservan sedes reales, garantía y acceso por transporte como información textual. En TC Lab se retiró la escena que decía representar el laboratorio sin procedencia comprobada. La ilustración restante de electrónica está identificada como tal. No se fabricaron fotos, casos, técnicos ni reseñas. La foto familiar, las fotos del catálogo y las ilustraciones de componentes útiles se conservan.

Los videos de stock de mantenimiento y reportes corporativos se retiraron. El video del microscopio usa controles, poster y `preload="none"`; no se reproduce ni descarga automáticamente. No se agregaron recursos de terceros ni dependencias.

En la página corporativa se retiraron el ahorro de hasta 40%, el stock permanente, las certificaciones de repuestos y los plazos generales de 4/24 horas como garantías sin respaldo verificable. Los tiempos y la disponibilidad se acuerdan por escrito en la propuesta. La revisión de placa se distingue del arreglo: informe de hasta 72 horas hábiles, reparación que lleva semanas y precio/plazo confirmados antes de avanzar. Se preservan servicios, facturación y garantías existentes; no se crean compromisos operativos nuevos.

La página en inglés tenía una referencia explícita a diagnóstico gratuito, en conflicto con las condiciones publicadas en español. Se corrigió: revisión técnica ARS 15.000–25.000, placa ARS 45.000; se cobra aunque no se repare y se descuenta al aceptar el arreglo. Contacto en inglés visible antes del desarrollo, condiciones comerciales siempre visibles y detalle de repuestos/plazos/garantía desplegable. Se retiró la afirmación universal de que cualquier reparación independiente anula cualquier garantía de fabricante: el cliente debe comprobar las condiciones de su fabricante.

La navegación incorpora salto al contenido y gestión de teclado del menú: Escape, recuperación de foco, tabulación dentro del menú móvil y liberación del scroll al cerrar o cambiar de viewport. Las tablas anchas admiten foco y tienen indicación de desplazamiento en móvil. El azul de relleno accesible se distingue del azul claro de enlaces y texto sobre el fondo oscuro, también en tienda, formularios, selector de sede y footer.

## Medición: alcance confirmado

La revisión del formulario actual confirma que deriva directamente a WhatsApp; el POST a `/api/repair-lead` está desactivado en ese recorrido. La existencia de una ruta de API con campos `leadId`, referrer y origen no acredita que el formulario cree un lead persistido. Se conservan los eventos actuales de intención y la sucursal elegida. Las pruebas usan servicios ficticios y capturan el destino de WhatsApp sin enviar mensajes ni crear órdenes reales.

No se presenta un clic, un formulario o una sesión como una conversación recibida, una reparación aceptada, un cobro o margen. Vincular la consulta con la orden efectivamente pagada sigue siendo un pendiente comercial y de integración; requiere definir ese circuito con Fixbee y verificar su disponibilidad antes de activarlo. No se habilitó una escritura comercial ni se modificó el contrato de backend en esta entrega.

## Validación mecánica y límites

El detector de Impeccable se ejecutó una vez sobre los archivos de UI modificados. Encontró tres advertencias por Inter y doce avisos sobre colores/radio de CSS existente. Se conserva Inter por decisión explícita de `DESIGN.md` y no se cambia el rediseño aprobado. Ningún hallazgo tuvo severidad de error. El detector no sustituye la revisión de contraste, teclado, navegación ni capturas.

La revisión visual cubre 31 rutas representativas a 390 y 1280 px, además de casos a 320 px, contenido desplegable y recorridos sin JavaScript. Esta cobertura representa familias de componentes; no equivale a certificar conformidad completa con WCAG ni a verificar operaciones físicas del negocio. El rastreo final compara las 84 URL del sitemap y comprueba metadata, robots, respuestas HTTP, imágenes editoriales y JSON-LD.

Las ventanas de observación de Search Console y CrUX continúan vigentes. Los cambios de presentación no acreditan recuperación inmediata de INP, posiciones, indexación ni ventas. Se conservan las solicitudes de indexación previas y no se repiten envíos automáticos.

## Decisión después de la revisión visual

El primer borrador del índice había eliminado las portadas pero seguía mostrando demasiadas descripciones en móvil. La versión final conserva títulos y destinos de las 27 guías como lista, adelanta las marcas y traslada los enlaces de servicios después de las guías. Captura a 390 px: primera guía a y=625 px, antes de la barra inferior en una pantalla de 900 px; sin desbordamiento. El contenido del artículo permanece en su URL. El índice conserva schema, enlaces y accesos históricos de sección.

La confirmación visual final se limita a los ajustes necesarios detectados en la primera pasada; no se rehace la portada ni se cambian los precios, las URLs o los title/H1 de las páginas en observación. Las cifras de palabras/altura del entorno local no se presentan como mejora productiva: las reseñas y el catálogo son ficticios y pueden modificar la comparación. El contraste final de producción usa las mismas condiciones que la captura pública inicial.

## Validaciones locales de entrega

- 456 pruebas unitarias aprobadas, 59 suites, sin fallos.
- 84 escenarios de navegador aprobados con Chromium aislado y servicios ficticios. Incluyen 62 capturas de 31 rutas a 390/1280 px, escenarios a 320/375 px, guías sin JavaScript, contenido de FAQ, precios, teclado y consulta por sucursal. El destino de WhatsApp Belgrano conserva modelo y fallas; la navegación externa se responde localmente y no envía mensajes.
- La suite de comercio conserva pruebas de validación, concurrencia de pestañas, estados de pago, recuperación, errores de catálogo, cotización y retiro. No se generan cobros ni pedidos reales.
- Auditoría de dependencias de producción: cero vulnerabilidades. Sin cambios de dependencias, contratos de API, catálogo, precios, inventario ni migraciones.
- Diff auditado: retiro de presentaciones repetidas e imágenes sin respaldo; no se elimina el contenido técnico de las páginas de reparación. Price/stock/garantía se conservan y el detalle queda disponible mediante HTML nativo.

El último ajuste del índice, posterior a las capturas por familia, se comprobó en una captura adicional móvil/escritorio con medición de su primer enlace. No afecta los recorridos de compra; CI repetirá la suite completa en el head del PR. La comparación final de las 84 URL se registra junto al PR y al estado de comercio.

Build de producción aprobado, 87 rutas generadas; lint estricto sin advertencias. La comprobación TypeScript independiente se ejecuta con los tipos generados de Next.js antes de versionar la entrega.

## Preview del commit de implementación

Vercel `dpl_UsN2wWkSXF4nsRoqLZSY9ZZ6w8H5` READY para `a647cdaedf6f0b3156469cef2649da036d81f359`. Comparación de las 84 URL: todas HTTP200; title, H1, descripción, canonical y robots conservados; JSON-LD válido y 271 respuestas FAQ presentes en HTML, incluidos los desplegables. El índice contiene 27 guías, con todos sus destinos accesibles. Ninguna imagen editorial retirada reaparece en las páginas rastreadas. El commit de cierre documental no cambia el código de estas comprobaciones; requiere sus propios checks y preview del head antes de integrar.

La auditoría ampliada de desarrollo informa cuatro dependencias moderadas por un solo aviso transitivo de `postcss-selector-parser` 6.1.4 en Tailwind 3.4.19. La auditoría productiva permanece en cero. El [aviso original](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) distingue el parseo de selectores no confiables dentro de peticiones del build normal con fuentes confiables, que no está afectado. Aquí se compila CSS propio y no se ofrece ese parser como servicio público. npm no propone una corrección automática compatible de toda la cadena actual; queda registrado para actualizar la herramienta cuando corresponda, sin forzar una migración mayor en este cambio.

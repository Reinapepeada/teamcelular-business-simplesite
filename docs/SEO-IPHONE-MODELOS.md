# Páginas de reparación de iPhone: revisión del 15 de octubre de 2026

La inspección de Search Console del 15/10 identifica cinco páginas pendientes: iPhone 11 (Google no reconoce la URL), 12, 13, 14 Pro y 14 Pro Max (descubiertas, actualmente sin indexar). Las ocho páginas por modelo responden 200, tienen canonical propio, permiten indexación y están en el sitemap. No se encontró un bloqueo técnico que pueda eliminarse para garantizar su incorporación a Google.

## Corrección

Las fichas compartían la mayor parte del recorrido y contenían afirmaciones sin sustento: imanes MagSafe dentro del módulo de pantalla, frecuencias de fallas del taller no documentadas y conservación universal de Face ID/True Tone transfiriendo un chip. Se reemplazan por una introducción específica y orientación por síntoma, con enlaces a las especificaciones oficiales de cada modelo. Se distinguen características de fábrica, funciones del repuesto y diagnóstico. No se inventan reparaciones realizadas ni estadísticas del negocio.

La corrección de la plantilla también se aplica a los tres modelos indexados para evitar contradicciones. Los enlaces a los ocho modelos aparecen en el HTML visible de `/reparaciones` y de la guía, fuera del selector y del desplegable de precios. Las fichas enlazan a los servicios de pantalla/batería y conservan los enlaces entre modelos. No se crean URL adicionales.

Las ofertas mantienen los precios de `IPHONE_MODELS` y dejan de declarar `InStock`: el stock se confirma antes de reparar. La fecha comercial sigue siendo agosto de 2026; la revisión editorial se identifica por separado como 15/10/2026. Se corrige el contraste del texto de las tarjetas oscuras también en modo claro.

## Elementos conservados

Se mantienen el bloque completo de metadata de la guía, incluido el título «Reparación de iPhone en CABA | Precios por Modelo», los títulos y H1 por modelo, canonical, robots, ocho slugs admitidos, importes publicados, garantía, sucursales, condiciones de diagnóstico, CTA y sitemap. No se cambian dependencias, APIs ni datos comerciales.

## Fuentes

- Apple: [iPhone 11](https://support.apple.com/es-la/111865), [iPhone 12](https://support.apple.com/es-la/111876), [iPhone 13](https://support.apple.com/es-la/111872), [iPhone 13 mini](https://support.apple.com/es-la/111873), [iPhone 13 Pro](https://support.apple.com/es-la/111871), [iPhone 14](https://support.apple.com/es-la/111850), [iPhone 14 Pro](https://support.apple.com/es-la/111849), [iPhone 14 Pro Max](https://support.apple.com/es-la/111846).
- Apple: [pantallas originales y diferencias al reemplazarlas](https://support.apple.com/es-la/103256).
- Google: [enlaces rastreables y anclas descriptivas](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

## Validación y seguimiento

346 pruebas existentes aprobadas; lint sin errores y con 22 advertencias previas; TypeScript y build Webpack aprobados; auditoría productiva sin vulnerabilidades. Renderizado de las ocho fichas y Reparaciones mediante React SSR sin servidor ni peticiones externas: un H1, canonical/robots correctos, fuentes, fechas diferenciadas y dos ofertas ARS por ficha sin stock declarado. Comprobación del bloque de metadata de la guía contra Git: idéntico. El build genera estáticamente los ocho modelos y conserva `dynamicParams = false`.

Falta registrar CI del último commit y publicación efectiva. Una vez desplegado, verificar las cinco URL públicas y sus enlaces. Después, volver a consultar URL Inspection para comprobar un rastreo posterior al deploy, canonical elegido y estado de indexación. La API de inspección no solicita indexación. No se usa la Indexing API, reservada por Google para otros tipos de contenido. La decisión y los tiempos de indexación dependen de Google.

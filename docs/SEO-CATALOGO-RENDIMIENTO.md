# Catálogo, imágenes y rendimiento móvil — 15/10/2026

La auditoría detectó categorías pendientes de indexación, fotos JPEG de 1400 px sin variantes y trabajo de interfaz que se montaba antes de necesitarse. Se revalidó contra `origin/main` porque los PR 27–35 ya habían corregido sitemap, canónicos, filtros y respuestas 404.

## Cambios

La tienda y las categorías ofrecen enlaces HTML a las categorías publicadas, sin depender de los radios del filtro. Cada categoría tiene un título legible y orientación concreta para elegir. El conteo de metadatos usa el total de productos publicados y deja de afirmar que todos tienen stock. Se conservan los canónicos, la paginación y el noindex de búsquedas/filtros.

Las fotos versionadas de Fixbee pasan por `next/image`: la URL pública completa de Team Celular permite resolver la tienda, mientras que el rewrite relativo fallaba dentro del optimizador de Vercel. La lista de orígenes admite únicamente HTTPS, el dominio exacto y `/store/products/**`, sin query. No se almacenan firmas temporales de S3 en las URLs del HTML. La autorización de publicaciones y la resolución de imágenes siguen en Fixbee.

Las tarjetas declaran tamaños acordes al espacio disponible y priorizan una sola foto. Las imágenes dejan de arrancar transparentes esperando hidratación; la galería elimina su animación de aparición y su importación de Framer Motion. El checkout se descarga al continuar la compra y permanece montado después de abrirse para conservar datos e intentos pendientes. Los selectores de sucursal montan sus contenidos al primer uso. En móvil las categorías se desplazan horizontalmente para no empujar las tarjetas varias filas hacia abajo.

## Validación

Pruebas locales: 352 casos aprobados; ESLint con cero warnings, TypeScript y build de producción. Auditoría de dependencias productivas: cero vulnerabilidades. No se agregaron dependencias.

En navegador se verificaron imágenes cargadas con opacidad 1, selección inicial de sucursal, agregado al carrito, carga del checkout, conservación de un nombre ficticio al volver al carrito y reabrir, y cierre con Escape. Las interacciones locales se ejecutaron detrás de un proxy que bloquea escrituras: no se crearon pedidos, reservas, cobros ni envíos. La respuesta local del optimizador para una foto publicada fue HTTP 200 `image/avif`; la verificación en Vercel y dominio público se registra en el PR y el historial de comercio.

## Alcance de la evidencia

Estos cambios mejoran descubrimiento, transferencia y trabajo inicial del navegador. No acreditan por sí solos indexación efectiva ni una mejora de INP de campo. Google debe volver a rastrear; CrUX necesita renovar su ventana. Analytics mantiene su comportamiento existente para conservar la comparación. La caché de imágenes puede conservar una foto hasta su vencimiento aunque se retire una publicación; las claves versionadas cambian cuando cambia la imagen. Rollback: revertir el PR y verificar nuevamente el deployment y las fotos del catálogo.

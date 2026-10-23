# Cruce de auditoría SEO y mejoras publicadas — 23 de octubre de 2026

La auditoría general se recogió antes del PR #74. Esta entrega parte de `95694aa10cf2b1e6fa9118e2de574e138d7abb71`, que ya contiene ese PR, y conserva su portada compacta, imágenes, precios visibles, FAQ nativas, contactos y `DESIGN.md`.

## Qué cambia la evidencia nueva

| Tema | Auditoría general | Cruce con la otra tarea y decisión |
| --- | --- | --- |
| Portada móvil | Lighthouse 74; LCP 5,7 s | Tras PR #74: 95; LCP 1,83 s, TBT 227 ms, CLS 0. Conservar la nueva portada. Son corridas individuales de laboratorio; no prueban una mejora de campo atribuible. |
| INP móvil | CrUX p75 240 ms | Ventana con datos anteriores al PR #73 y al #74. Mantener seguimiento de la validación iniciada el 21/10; no duplicar la intervención. |
| Cobertura local | Palermo y Balvanera sin camino desde el grafo HTML de inicio | Añadir dos enlaces SSR desde Sucursales, ya accesible desde la navegación del sitio. Identificarlos como origen del viaje, sin inventar locales en esos barrios. |
| Contraste del botón primario | Blanco/azul: 4,49:1; hover 3,53:1 | Ajustar los dos tokens compartidos: 4,98:1 y 6,01:1. Mantener el mismo azul como único color de acción y actualizar la guía visual. |
| Guía iPhone | Lista con «iPhone 17 Plus» | Retirar esa única entrada incorrecta; conservar title, H1, precios y el resto del texto observado. |
| Idioma inglés | Raíz heredada `lang=es` | El contenido inglés ya declara `lang=en` en su sección. No reestructurar layouts durante este ajuste. |

## Cómo se cruzan los análisis

Las pequeñas diferencias entre informes con cierres distintos no acreditan otra tendencia: la auditoría usa GSC final hasta el 21/10, del 24/9 al 21/10 frente al 27/8 al 23/9. GA4 se filtra por host productivo y Organic Search. Las tablas por página de GSC pierden cobertura: sus filas de Argentina no deben sumarse como totalidad ni usarse para atribuir la diferencia a otros países. Los volúmenes de analítica y el informe completo se conservan fuera de este repositorio público.

Los clics de intención de GA4 no equivalen a mensajes recibidos ni ventas. Los dead clicks de Clarity son una pista con muestras pequeñas, especialmente en escritorio; no prueban la causa. La mejora visual de PR #74 requiere nueva observación o reproducción antes de otra intervención sobre batería, presupuesto o carga.

Se mantienen las ventanas de seguimiento de la otra tarea: 21 días finales desde el primer rastreo posterior al cambio de título/H1 de la guía iPhone, y Palermo del 23 al 29/10 cuando el período esté finalizado. Las 19 solicitudes manuales de indexación ya aceptadas no se vuelven a enviar. Las siete URL comerciales sin indexación quedan como seguimiento; estas correcciones no garantizan su indexación ni recuperación de posiciones.

## Alcance y verificación

Tres ajustes de producto, sin dependencias nuevas, cambios de contratos, precios, condiciones, feeds, eventos, solicitudes de indexación ni datos comerciales. Los enlaces se comprueban sin JavaScript a 320, 390 y 1280 px, con destinos HTTP 200 y sin desbordamiento. El contraste se comprueba en reposo y hover sobre CSS renderizado. La suite existente cubre los recorridos de PR #74 y del comercio con servicios simulados.

Evidencia local de la auditoría y nueva medición: `outputs/teamcelular-audit-2026-10-23/`, en el workspace, y `followup/psi-home-after-pr74.json`. Estos archivos no se incorporan al repositorio porque incluyen exportaciones de analítica del negocio.

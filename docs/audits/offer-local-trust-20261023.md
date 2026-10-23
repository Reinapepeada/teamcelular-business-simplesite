# Oferta y confianza local sin carga operativa — 23/10/2026

El titular descarta la atribución manual de consultas a Fixbee por la complejidad de operación. Esta entrega continúa sobre el main `bc604d0d`, conservando PR74–77, precios, fechas de actualización, títulos/H1, URLs, formularios, eventos y contratos. No añade dependencias, capturas de leads, campos, mensajes automáticos ni tareas al mostrador.

## Cambios

- Comparación de presupuestos: la tabla compartida pide confirmar repuesto, colocación y pruebas, manteniendo la garantía de 90 días. Las consultas de precios de iPhone y pantalla/carga llevan esa pregunta en el mismo mensaje de WhatsApp; conservan modelo, falla y sucursal. No se afirma una calidad de repuesto, certificación, disponibilidad ni un precio nuevo.
- Sucursales: teléfonos propios y acceso directo a los Maps existentes de Recoleta y Belgrano desde el directorio. Se reemplazan promesas generales de diagnóstico en el día por confirmación previa según falla. Las FAQ visibles y su JSON-LD comparten la misma fuente.
- Evidencia de clientes: se conserva el orden de relevancia de Google en lugar de ordenar por estrellas, hasta tres opiniones con texto original. Cada opinión enlaza a su fuente y al autor cuando está disponible; las largas usan un desplegable nativo. Los valores incompletos no se convierten en reputación cero ni fechas inventadas. Si el proveedor no responde, queda el enlace a la ficha canónica de Recoleta. Las opiniones de Recoleta no se atribuyen a Belgrano.

Se reutiliza la consulta existente a Places y su caché, sin extenderla a otra sede ni añadir peticiones o servicios. El campo `reviews.googleMapsUri` pertenece a la misma respuesta de reseñas ya utilizada. Referencias de Google: [atribución, fuente y orden](https://developers.google.com/maps/documentation/places/web-service/policies), [datos de Review](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#Review). Esta revisión no certifica todos los términos del servicio ni modifica su contratación.

## Evidencia propia y límites

El repositorio contiene fotos familiares, productos e ilustraciones ya clasificadas. No se encontró una colección verificada de casos que vincule modelo, falla, diagnóstico y resultado, con autorización para publicarlos. No se convierten reseñas en historias clínicas ni se publican órdenes, teléfonos o fotografías de clientes. Quedan pendientes casos documentados y fotos reales de cada sede; no se genera contenido ficticio para llenar esa falta.

La mejora del sitio facilita comprobar la oferta y acceder a cada ficha. No equivale a editar Google Business Profile, medir posiciones de Maps ni demostrar aumento de ventas. Se conservan las ventanas de observación de títulos/indexación de la otra tarea y las solicitudes de indexación ya realizadas.

## Validación

La normalización se prueba con fuentes, autores, orden de tres/cinco estrellas, enlaces inseguros, respuestas incompletas y fechas ausentes. Navegador con servicios ficticios y red externa bloqueada: modelo y condiciones en el mensaje, teléfono/Maps de ambas sedes sin JavaScript a 320 px y reseña larga por teclado. Las opiniones sintéticas existen únicamente en la fixture de navegador y nunca llegan a producción.

Antes de integrar se exige lint, TypeScript, build, pruebas, auditoría de dependencias productivas, CI y preview del último head. Después se verifica el SHA exacto y los HTML públicos afectados; merge y despliegue se registran en el PR y en el estado de comercio.

Dos runners quedaron detenidos al descargar paquetes del mirror Azure durante la preparación de Chromium. CI retira sólo ese mirror de la lista efímera del runner y conserva los mirrors oficiales de Ubuntu ya configurados; limita a 30 segundos la espera HTTP/HTTPS y a dos los reintentos. No modifica firmas de APT, paquetes, permisos del workflow ni checks. Fuente de la lista: [actions/runner-images](https://github.com/actions/runner-images/blob/main/images/ubuntu/scripts/build/configure-apt-sources.sh). Zod existente se actualizó por separado en PR79, publicado en `8ee0957`, con 456 unitarios, 84 recorridos y auditoría productiva cero; PR78 incorpora ese mismo commit.

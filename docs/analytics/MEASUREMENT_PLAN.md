# Medición de consultas y tienda

Versión 2, 28 de octubre de 2026. Alcance acordado: consultas de la web y compras
de la tienda. Sin integración nueva con Fixbee, presupuestos vendidos o CRM.
Sin dependencias adicionales ni activación de productos pagos. La configuración
existente de Product analytics tiene límite de facturación USD 0; al agotarse el
cupo puede interrumpirse la recepción. No se promete cobertura ilimitada.

Panel guardado: [Team Celular: consultas y tienda](https://us.posthog.com/project/694149/dashboard/2272354).
Las consultas se validaron antes de guardarlas. Los eventos nuevos pueden estar
vacíos hasta publicar y recibir actividad real. El catálogo de métricas estaba
vacío: estas definiciones son de trabajo, sin aprobación formal de catálogo.

## Qué significa cada resultado

| Resultado | Evento | Interpretación |
| --- | --- | --- |
| Contacto por WhatsApp | `branch_whatsapp_redirect`, `whatsapp_click` o `cta_click` con `conversion_kind=whatsapp_handoff` | Apertura hacia WhatsApp; no prueba que se envió un mensaje. |
| Presupuesto completado | `lead_form_submit` | Formulario válido que abre WhatsApp; no prueba atención ni venta. |
| Compra iniciada | `begin_checkout` | Desde carrito al formulario de compra. |
| Entrega revisada | `add_shipping_info` | Datos validados y revisión de importes obtenida; sin datos del cliente. |
| Paso a Mercado Pago | `add_payment_info` | Redirección al proveedor; no implica que se ingresó una tarjeta. |
| Compra observada | `purchase` | La API informa pago confirmado y el comprador vuelve a la web. |

Una misma persona puede abrir WhatsApp y completar el presupuesto. No sumar
estos eventos como personas distintas ni sumar `cta_click` y su posterior
`branch_whatsapp_redirect` como dos consultas. Para consultas usar visitantes
únicos con al menos un handoff; para el formulario usar visitantes únicos con
`lead_form_submit`. Comparar tasas por visitante o sesión, siempre con el mismo
denominador y ventana temporal.

## Recorridos y decisiones

| Pregunta | Señales y desglose | Decisión que permite |
| --- | --- | --- |
| ¿Qué atrae consultas? | Canal, primera fuente, campaña y landing → handoff/formulario | Priorizar páginas y campañas que generan intención de contacto. |
| ¿Dónde se abandona el presupuesto? | `budget_wizard_view` → `budget_wizard_step_view/complete` → `lead_form_submit`; errores y abandonos por paso | Revisar la dificultad y claridad del paso con mayor pérdida. |
| ¿Se ve el botón? | `cta_view` y `cta_click` por nombre, ubicación, dispositivo | Distinguir falta de exposición de baja respuesta. |
| ¿Qué local se elige? | `branch_selector_open/close`, `branch_preference_selected`, `branch_whatsapp_redirect` | Evaluar cierres sin contacto y selección manual o sugerida. |
| ¿Qué impide comprar? | `view_item_list` → `view_item` → `add_to_cart` → `begin_checkout` → `add_shipping_info` → `add_payment_info` → `purchase` | Localizar fricción entre producto, carrito, entrega y pago. |
| ¿Falla el catálogo o checkout? | `catalog_error/no_results`, `checkout_validation_error/error`, `payment_result`, `client_error` | Corregir errores antes de aumentar tráfico. |
| ¿Se consulta el contenido? | `page_engagement`, `faq_open`, navegación | Mejorar contenido y enlaces en páginas que reciben tráfico útil. |
| ¿La velocidad limita el uso? | `$web_vitals`: LCP, INP y CLS, por página/dispositivo | Priorizar regresiones de rendimiento con suficiente muestra. |

Configurar embudos por visitante, ventana de 7 días como punto de partida, y
comparar también la misma sesión para diagnosticar fricción inmediata. Los
embudos por visitante describen ese navegador; no unen teléfonos, dispositivos
o usuarios autenticados. Los eventos de vista pueden repetirse al volver a una
página. Usar únicos para conversión y totales para volumen de interacciones.

CTA visible exige al menos 50% del botón durante un segundo con la pestaña
visible. Tiempo activo suma segmentos visibles y scroll usa tramos de 25%.
`page_engagement.content_path` identifica el contenido aunque el reporte se
dispare al cambiar de ruta. FAQ usa índice, sin copiar preguntas o respuestas.
Un `client_error` identifica una categoría fija, sin mensajes ni stack.

## Atribución

Se guardan etiquetas UTM filtradas, dominio referente y ruta de entrada, sin
consultas completas ni fragmentos. Primera entrada: ventana de 90 días; entrada
de sesión: 30 minutos de inactividad. Son modelos de entrada, no atribución
multicanal causal. Mercado Pago y el propio sitio no inician un referente nuevo.
El canal distingue búsqueda, campañas pagas, redes, referencias de IA, directo
y referencias generales. Bloqueadores, navegación privada y almacenamiento
borrado generan pérdidas o nuevas identidades. Tráfico de IA sin referente
identificable puede quedar como directo.

## Importes y fiabilidad

`purchase.order_total` es el total confirmado por API, en ARS.
`value` excluye envío cuando se conserva el snapshot del pedido devuelto por
el servidor; `shipping` identifica ese importe. Sin snapshot sólo se publica
`order_total`, sin inventar ingreso neto ni productos. Los importes del carrito
son estimaciones hasta confirmar el pedido. No se envían costos ni márgenes.

`transaction_id` es SHA-256 de una referencia con prefijo propio; no es un token
de acceso. Se conservan hasta 200 referencias transformadas para evitar repetición
en ese navegador, con exclusión entre pestañas mediante Web Locks cuando está
disponible. Para contar ventas usar transacciones distintas; no sumar eventos
sin deduplicar. El servidor sigue siendo la fuente contable.

La compra depende de la vuelta del comprador: pagos sin regreso, bloqueadores
y almacenamiento no disponible pueden faltar. No se calcula ingreso neto de
reembolsos: una reversión observada se informa como resultado del pago, no como
evento financiero de devolución. Completar cobertura de pagos y devoluciones
requeriría instrumentación de servidor fuera de este alcance.

## Privacidad y operación

Un contrato compartido permite categorías, identificadores de productos públicos
y números. Excluye respuestas, búsquedas libres, correos, teléfonos, direcciones,
texto de WhatsApp y tokens. PostHog elimina query, fragmento y propiedades SDK
ajenas al contrato antes del envío. No crea perfiles personales ni activa
autocaptura, replays, heatmaps, logs o flags. Se respeta Do Not Track. Las
integraciones anteriores de Clarity y analítica de Vercel siguen configuradas
como estaban; este cambio no certifica sus políticas de captura automática.

Sólo se instrumentan los hosts públicos de producción. Admin y API quedan
fuera. En las páginas de retorno del checkout sólo pasan `purchase`,
`payment_result` y errores controlados. Los formularios de compra que se abren
en el catálogo envían pasos y categorías, nunca su contenido.

La prueba de navegador usa servicios ficticios y aborta destinos externos:
no crea pedidos, cobra ni manda eventos ficticios a PostHog. Las pruebas
unitarias cubren redacción, importes confirmados y deduplicación.
La prueba del SDK usa un token ficticio y bloquea destinos externos. Comprueba
que la dependencia de rendimiento real (`web-vitals-with-attribution.js` en el
SDK actual) está permitida. Sólo se permiten scripts de Web Vitals del proveedor
por HTTPS; los objetos de atribución de métricas quedan fuera del contrato de envío.

## Punto de partida observado

Search Console, Argentina, 30/9–25/10/2026: 626 clics, 37.624 impresiones,
CTR 1,66% y posición media 5,8. Totales consultados sin dimensiones.
GA4 por dispositivo, todos los canales, 30/9–27/10/2026: 540 sesiones móviles,
471 de escritorio y 5 de tablet (1.016 en total). Son universos y fechas
diferentes: no dividir clics de GSC por sesiones de GA4 como una conversión.
PostHog comenzó hoy y todavía no permite una comparación histórica.

Revisar primero páginas con impresiones altas y CTR bajo en GSC, después su
tasa de contacto/compra y fricción móvil. GSC aporta consultas e indexación;
PostHog no recupera las palabras clave orgánicas ocultas ni prueba causalidad.
Antes de probar variantes, definir una hipótesis, métrica principal y período;
evitar cambios simultáneos y conclusiones con muestras pequeñas. Este alcance
no crea experimentos ni tareas programadas automáticamente.

## Referencias

- [PostHog para Next.js](https://posthog.com/docs/libraries/next-js).
- [Configuración de PostHog JS](https://posthog.com/docs/libraries/js/config).
- [Eventos de ecommerce de Google](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce).
- [Evitar datos personales en Analytics](https://support.google.com/analytics/answer/6366371).
- [Umbrales Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds): evaluar percentil 75; objetivos LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1.

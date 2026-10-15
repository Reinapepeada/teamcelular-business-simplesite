# Checkout y recuperación de pedidos

Esta corrección cubre los hallazgos F8, F10, F11 y F12 de la revisión de comercio. El backend sigue siendo la autoridad de precios, stock, importes y estado del pago. No se agregan endpoints ni operaciones reales de cobro, devolución o despacho.

## Contrato de validación

Cotización y checkout usan el mismo contrato del backend:

- Código postal de cuatro dígitos o CPA completo, con espacios externos recortados y letras en mayúsculas. El CPA completo se conserva en el pedido. Solo el adaptador del transportista del backend extrae los cuatro dígitos que necesita su API.
- Cantidades enteras entre 1 y 50 por producto, sumando todas las líneas con el mismo slug. No se recortan silenciosamente los datos inválidos antes de validar la compra.
- Envío: nombre y apellido, hasta 50 caracteres en total y hasta 30 en cada parte. La partición usa el primer token como nombre y todo el resto como apellido, igual que el backend. Retiro mantiene el límite general de 200 caracteres.
- La dirección estructurada, incluido piso y departamento, permanece completa. No se intenta adivinar un CPA.

`commerceValidation.ts` concentra estas reglas para el panel de envío y el formulario. Los errores se muestran antes de cotizar o crear una reserva.

## Pago confirmado y carrito

La huella de productos y cantidades no basta para distinguir dos selecciones iguales hechas en momentos diferentes. Cada edición del contenido del carrito genera `cartRevision`. El intento de checkout conserva esa revisión antes de enviar su POST; la respuesta del servidor y la recuperación usan esa revisión original.

Todas las escrituras persistidas del carrito usan `tc.cart` y releen el almacenamiento dentro del bloqueo. Abrir o cerrar el panel no vuelve a persistir una copia vieja. Los botones de cantidad aplican incrementos sobre el estado dentro del bloqueo y el destino se actualiza por campo, sin sobrescribir cambios de otra pestaña. La limpieza posterior al pago requiere que coincidan el pedido, el checkout activo, la revisión y la huella. Una selección nueva, incluso quitar y volver a agregar exactamente lo mismo, se conserva. Sin Web Locks o sin una revisión verificable se conserva el carrito. La pantalla pagada avisa cuando quedan productos y pide revisarlos antes de iniciar otra compra, también después de recargar.

El orden de bloqueos es siempre `tc.checkout` y después `tc.cart`, nunca a la inversa. Una respuesta tardía de un checkout anterior tampoco puede sobrescribir el acceso del checkout nuevo. Antes de abrir el pago se espera y verifica la persistencia protegida del pedido; si el almacenamiento falla o descarta la escritura, el intento original queda guardado y no se abre el pago. Los timeouts y conflictos inciertos siguen conservando el intento original.

## Consulta del estado

La pantalla consulta como máximo 12 veces por ventana, con espera creciente hasta 15 segundos. `pending` continúa dentro de esa ventana. El botón «Actualizar estado» y volver a enfocar la pestaña permiten una nueva consulta de solo lectura, sin crear un pedido ni un pago. Las consultas no se solapan y se descartan al navegar. Un 404 detiene la ventana y ningún parámetro de la URL acredita un pago.

Antes de limpiar datos locales se conserva un enlace canónico con `external_reference`. Los dos caminos de recuperación del diálogo usan ese mismo enlace. No contiene access tokens ni secretos de recuperación, por lo que recargar después de la limpieza sigue identificando el pedido.

El botón de agregar diferencia «Sin stock» de «En tu carrito».

## Verificación reproducible

La base `54fd5809dd71ca6622ed54af0cccf29bcc284468` pasó 341 pruebas y lint antes de las modificaciones. La corrección agrega pruebas de contrato, respuestas tardías, cambios y restauración de cantidades, quitar/reagregar, persistencia entre pestañas, limpieza repetida, recuperación, límite de polling y navegación durante consultas.

Ejecutar `npm ci`, `npm test`, `npm run lint`, `npx tsc --noEmit` y `npm run build` con la configuración aislada habitual. Para impedir consultas externas durante el build local, se puede precargar `tests/fixtures/local-network-only.mjs` mediante `NODE_OPTIONS=--import=<ruta absoluta>` y apuntar las variables públicas de API y sitio a loopback, con `COMMERCE_PREFLIGHT_ALLOW_LOOPBACK=1`.

Para navegador: `npx playwright install --with-deps chromium` y `npm run test:browser`. Opcionalmente, `PLAYWRIGHT_CHROMIUM_EXECUTABLE` permite usar un Chromium instalado. El runner levanta su propio API ficticio en 3101 y Next en 3100; no reutiliza servidores existentes. El servidor de pruebas solo admite fetch a loopback y el navegador bloquea cualquier otro origen. Todos los pedidos, tokens, direcciones y datos de contacto son ficticios.

La suite de navegador verifica 320, 375 y 1280 píxeles, conserva capturas y usa el servidor de desarrollo. La compilación de producción es un gate independiente. El contenedor local no permitió iniciar Chromium por restricciones de sockets, incluso tras la elevación admitida; esa ejecución no llegó a validar la interfaz. CI ejecuta el navegador y conserva la evidencia durante 14 días. El resultado definitivo debe verificarse en el SHA de la PR, sin inferirlo de estas instrucciones.

## Revisión, publicación y reversión

La PR debe permanecer en borrador hasta revisar el resultado de todos los gates y la evidencia de navegador. Publicar primero el contrato compatible del backend para que el CPA completo sea aceptado de punta a punta. Esta rama no autoriza integración, despliegue ni operaciones comerciales.

La reversión es revertir el commit de esta PR mediante otra revisión. No hay migraciones de base de datos ni cambios de contratos de pago. Los campos locales nuevos son aditivos; no borrar almacenamiento de los compradores como parte de una reversión. Una versión anterior volvería a tener la limpieza menos conservadora, por lo que conviene revisar el incidente antes de desplegar ese rollback.

## Primera compra: datos confirmados y recuperación

- El encabezado de checkout queda fuera del área desplazable. Al validar, el foco permanece en el primer campo con error y se desplaza su bloque completo (etiqueta, control y mensaje), sin quedar tapado. Las pruebas de navegador verifican geometría a 320 × 568, 375 × 667 y 1280 × 900, además de teclado, Escape y reapertura.
- `GET /store/pickup-point` sigue usando el contrato existente `name`, `address`, `hours`. La compra distingue el 404 con `PICKUP_UNAVAILABLE`, la configuración incompleta y una falla transitoria. Para iniciar un retiro se necesitan dirección y horario confirmados; se puede reconsultar o elegir envío válido sin borrar datos. No se inventan horarios ni se modifican contratos backend. Los consumidores antiguos que sólo necesitan un dato opcional conservan su wrapper tolerante.
- `SHIPPING_UNAVAILABLE` no demuestra falta de cobertura: también incluye fallas de proveedor/configuración. El carrito muestra que no pudo cotizar y permite reintentar con el mismo destino. Un costo desconocido nunca es envío gratis.
- El retorno del pago distingue modalidad y avance confirmado. Una reversa no informa por sí sola una devolución voluntaria, total ni su monto. La asistencia usa sólo la referencia pública del pedido. Para pedidos existentes, una consulta de retiro fallida ofrece reintento/contacto, sin prometer cambiar su modalidad.
- Los importes deben ser números finitos no negativos entregados por el servidor. Ausencias, `null`, strings y valores inválidos quedan «Por confirmar» y no habilitan el enlace de pago. El cero explícito permanece cero. Se puede actualizar la misma reserva con su payload/clave conservados; un guardado antiguo sin payload abre la consulta pública del mismo pedido, sin inventar importes ni crear otro pedido.
- El vencimiento se muestra sólo con un timestamp explícito válido que incluya zona/offset, en hora de Argentina y con fecha. `created_at` no produce un plazo estimado; `reservation_expires_at: null` no se reemplaza por otro vencimiento.

Las nuevas pruebas siguen bloqueando todos los orígenes externos y usan datos ficticios. Los casos de pago verifican ausencia de llamadas al proveedor; las recuperaciones repiten exactamente la misma clave y payload. No se modifica footer, política de garantía, backend ni datos comerciales. La validación de navegador y sus capturas se conservan en el artefacto del workflow de esta PR.

## Envío completo desde un local

Las nuevas compras con envío necesitan una cotización lista (`checkout_ready: true`) con `quote_id` y vencimiento ISO con zona. La referencia identifica un snapshot propio; no significa que el transportista reserve una tarifa. Se conserva en la revisión y en el payload idempotente. El backend valida carrito, destino, origen, paquete, servicio y configuración antes de reservar. El comprador no elige origen ni medidas internas.

Si hace falta reunir productos, revisar el paquete o terminar la configuración, la tienda conserva el carrito y ofrece consulta. No pide quitar productos por stock repartido ni promete retiro como alternativa. Una cotización vencida o cambiada vuelve a cálculo y revisión. El retiro existente sigue sin quote y en el local informado. Seguro y valor declarado pendientes no habilitan envío pagable.

La recuperación del mismo pedido gana antes de validar una cotización vencida o ausente en un payload antiguo. Reintentos inciertos mantienen cuerpo y clave. Todo cambio de importes en centavos requiere confirmar el pedido existente, incluso cuando el total coincide pero cambia su desglose. El plazo del transportista se muestra sólo como tránsito desde despacho, sin preparación ni fecha de llegada prometida.

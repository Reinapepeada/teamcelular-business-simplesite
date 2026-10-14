# Guías de pin de carga y pantalla

El diagnóstico de GA4 del 14 de octubre de 2026 compara el 16 de septiembre al 13 de octubre con los 28 días anteriores. Filtrando Argentina y el hostname teamcelular.com, la guía de pin recibió 26 sesiones, 0 eventos clave y 15 segundos de interacción promedio; la guía de pantalla recibió 12 sesiones, 0 eventos clave y 28 segundos. La muestra es chica: permite priorizar una mejora del recorrido, pero no demuestra que el contenido sea la causa de la falta de consultas.

Las guías ahora responden el precio en la apertura y muestran los rangos antes de las explicaciones largas. Los importes salen de las mismas fuentes que las páginas de servicio. La fecha de edición del artículo se actualiza; la fecha de los precios sigue siendo la de la lista publicada.

Una consulta opcional permite escribir marca y modelo y elegir el síntoma. El botón funciona también con los campos vacíos. El mensaje se prepara para WhatsApp y reutiliza el selector de Recoleta o Belgrano. No se crea otro formulario ni se envían los campos como parámetros nuevos a GA4.

Los botones identifican la guía y la ubicación mediante cta_name y cta_location. La redirección conserva preferred_branch y el evento branch_whatsapp_redirect de la medición existente. Los CTA principales son pin_guide_price_whatsapp y screen_guide_price_whatsapp; los CTA de precio y cierre tienen nombres distintos. Abrir el selector no acredita una consulta enviada: el evento clave registra la redirección hacia WhatsApp.

Para evaluar el cambio, usar Argentina, el hostname público y las páginas de entrada de cada guía. Comparar sesiones, sesiones con eventos clave y redirecciones por sucursal cuando haya suficiente tráfico. Revisar cta_location para distinguir apertura, tabla y cierre. No interpretar eventos repetidos como clientes distintos o ventas. Las pruebas locales siguen fuera de GA4 gracias a la restricción de hostname implementada previamente.

La guía de pantalla explica que precio, stock, plazo y funciones dependen del equipo y del repuesto. La revisión de True Tone y piezas originales se contrastó con la [documentación de Apple](https://support.apple.com/es-la/103256). Se conservan las URL, sus canonical y los enlaces a los servicios correspondientes.

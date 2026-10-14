# Medición de GA4 y guía de iPhone

Cambios del 14 de octubre de 2026. En GA4, del 16 de septiembre al 13 de octubre, Argentina y host teamcelular.com: la guía de iPhone recibió 75 sesiones, 13 eventos clave y una tasa de sesión con evento clave de 17,33%; Samsung recibió 90, 30 y 33,33%. Esto señala una oportunidad de conversión, sin demostrar que el diseño sea la única causa ni que los eventos sean ventas.

El informe global incluía 126 vistas desde localhost o 127.0.0.1 y 232 salidas del selector a WhatsApp sin `preferred_branch`. La dimensión «Sucursal elegida» ya estaba registrada con ese parámetro.

## Medición

GA4 carga únicamente en teamcelular.com y www.teamcelular.com, comprobando el hostname del navegador. Esto también excluye `next start` local, IPs y previews; `NODE_ENV=production` no basta para distinguirlos. Los emisores compartidos de eventos aplican la misma condición. El identificador de medición se conserva.

`branch_whatsapp_redirect` y `lead_form_submit` incluyen `preferred_branch` con recoleta o belgrano. Se pasa la elección explícita desde ambos componentes. El listener de enlaces directos a wa.me identifica la sucursal por el teléfono de destino usando `BRANCHES`; el selector sigue emitiendo un único evento de salida. El envío histórico al endpoint de interacciones mantiene su contrato.

El envío del formulario a GA4 también incluye `form_version`, ya presente en su payload interno, para poder distinguir v3 de versiones anteriores. La dimensión de sucursal se reutiliza. Para consultar la versión en informes generales, hace falta registrar una dimensión de evento `form_version`; esta entrega no cambia ajustes de GA4.

La exclusión afecta a datos futuros. Los datos históricos se analizan con filtro de hostname. Los eventos clave siguen indicando una salida a WhatsApp, no una conversación recibida ni una reparación contratada.

## Guía de iPhone

El CTA de consulta aparece antes de la navegación por marcas. El selector nativo de modelo muestra pantalla y batería, y abre el selector de sucursal con el modelo incorporado al mensaje. Los precios y «Consultar» salen de `IPHONE_MODELS`, la misma fuente que la tabla completa y las páginas por modelo. Se conserva la fecha comercial de agosto; la fecha de revisión del contenido pasa al 14 de octubre.

La sección de precios se adelanta y mantiene su ancla. La tabla completa queda desplegable y renderizada en el HTML. Se eliminan rangos duplicados por familias para evitar diferencias con la fuente por modelo. Se muestran ambas direcciones, stock por confirmar, garantía y condiciones del repuesto. La información sobre True Tone y aviso de pieza se presenta por modelo y módulo, de acuerdo con las [explicaciones de Apple](https://support.apple.com/es-la/103256), sin una promesa universal de conservación.

Eventos de CTA: `iphone_guide_price_whatsapp` en `iphone_guide_hero`; `iphone_model_price_<slug>` en `iphone_guide_prices`; `iphone_guide_other_repair_budget` en `iphone_guide_prices`. La salida añade la sucursal al nombre del CTA y a su parámetro específico.

## Verificación y seguimiento

Pruebas del cargador en los dos dominios públicos, localhost, IP local, preview y dominio parecido; enlaces de WhatsApp de ambas sucursales; un envío por interacción y supresión de GA4 fuera de producción. La prueba no hace peticiones a Google ni al backend.

La comprobación visual debe cubrir selección de modelo, batería sin precio, tabla desplegable, selector de sucursal, móvil de 320/375 px y escritorio. Comprobar también un H1, canonical conservado y ausencia del script externo de Google en el servidor local.

Tras publicar, observar los nuevos eventos en GA4 y comprobar que la dimensión de sucursal se llene. Comparar 28 días completos con los mismos filtros y canal/dispositivo; evaluar usuarios con contacto y resultado comercial, sin sumar usuarios de distintos eventos como personas únicas.

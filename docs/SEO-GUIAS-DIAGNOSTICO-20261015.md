# Diagnóstico y plazos en las guías de reparación

Corrección del 15 de octubre de 2026 en pin de carga, Samsung, Motorola y Xiaomi. Los textos mezclaban diagnóstico general de 30–45 minutos o del mismo día con revisión de placa de 72 horas, sin separar el informe del arreglo. La referencia comercial vigente es `src/app/(site)/reparaciones/serviceConfigs.ts`, servicio `reparacion-placa-caba`, y los importes de `src/lib/repairPrices.ts`.

La revisión técnica sin placa va de $15.000 a $25.000 y su plazo se confirma según la falla. La revisión de placa cuesta $45.000; el informe se entrega en hasta 72 horas hábiles. El arreglo lleva semanas y requiere precio y plazo por escrito antes de comenzar. Se informa el costo de revisión antes de abrir el equipo y se descuenta si se acepta la reparación. Pantalla en 2–4 horas y batería en 1–2 horas requieren stock; el plazo de otros trabajos se confirma por separado.

Se alinean pasos, tablas, tarjetas, preguntas frecuentes y descripciones sociales que contradecían estas condiciones. Las fechas editoriales pasan al 15 de octubre; no se renuevan las fechas comerciales ni se modifican precios publicados. Samsung y Motorola separan la revisión de placa de la revisión general en sus tablas.

Pin de carga incorpora la respuesta a «¿Cómo cargar un celular con el pin de carga dañado?», consulta con 189 impresiones, un clic y posición media 8,6 en el análisis previo de Search Console. Se desaconseja forzar el cable; la alternativa inalámbrica se limita a modelos compatibles, sin humedad, batería hinchada ni calentamiento anormal. Si todavía funciona con seguridad, se recomienda respaldar por WiFi. La misma respuesta alimenta el FAQ visible y su JSON-LD.

Fuentes de la orientación: [Apple: si el iPhone no se carga](https://support.apple.com/es-es/108805) y [Samsung: problemas de carga inalámbrica](https://www.samsung.com/ar/support/mobile-devices/issues-with-wireless-charging/). Se enlazan desde la guía.

Se conservan títulos, H1, canónicas, indexabilidad, enlaces internos, garantías y datos de sucursales. Pantalla e iPhone no reciben cambios: siguen en el monitor SEO existente. La propuesta de título/H1 de iPhone permanece sin aprobar; se espera el nuevo rastreo y 21 días completos de datos finales antes de compararla y consultar al usuario.

La publicación requiere pruebas existentes, lint estricto, TypeScript, build, auditoría de dependencias productivas, comprobación del HTML generado y de producción, CI aprobada del último head y Vercel READY del SHA integrado. La corrección de contenido no acredita por sí sola una mejora de posiciones.

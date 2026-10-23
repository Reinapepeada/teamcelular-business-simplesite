# Lectura y consulta de reparaciones

Revisión del 23 de octubre de 2026 sobre `origin/main` en `2488fde8`. La mejora responde al análisis de competidores: presentar servicio, precio orientativo, condiciones y contacto antes de ampliar la explicación técnica. No acredita una mejora de posiciones, ventas o Core Web Vitals de campo; esos resultados necesitan medición posterior.

## Alcance

Se reutilizan la portada, cambio de pantalla, cambio de pin de carga, guía Samsung y las dos páginas de sucursal. No se crean URLs comerciales ni páginas por barrio. Se conservan canónicas, H1, fuentes de precios, garantía y enlaces de contratación. La guía Samsung actualiza la fecha de edición del artículo; las fechas de sus precios permanecen intactas.

La portada reemplaza una secuencia visual de cuatro alturas de pantalla por una presentación compacta con imagen, consulta y marcas. Los servicios ganan espacio al reducir la altura de sus tarjetas. Pantalla y carga muestran primero los precios en móvil, antes de la ilustración. La comparación del módulo completo explica repuesto, funciones y presupuesto previo sin prometer conservar funciones que dependan del daño o del modelo.

Las FAQ, los procesos largos y los detalles de servicio usan desplegables HTML nativos. El contenido sigue en el HTML, funciona sin JavaScript y conserva las respuestas del schema donde ya existía. El costo de revisión, las fechas de precios y las condiciones que necesita el cliente para decidir quedan visibles junto a la oferta.

Las sucursales adelantan Maps y conservan teléfono y WhatsApp propios. El CTA de WhatsApp usa el seguimiento existente con destino directo de sucursal, sin abrir otro selector. No cambian el catálogo, los pagos, el stock, los contratos de API ni las dependencias.

## Criterio visual y editorial

`DESIGN.md` conserva la identidad oscura y establece una guía duradera: jerarquía corta, una acción principal por bloque, iconos con etiquetas, foco visible, lectura de unos 65 caracteres y objetivos táctiles de al menos 44 px. Se revisan 320, 390 y 1280 px.

Las cuatro marcas reutilizan Simple Icons, ya instalado. Las dos imágenes de pantalla y USB-C son originales generadas para esta entrega y se identifican como ilustraciones. No representan empleados, locales ni trabajos realizados. Los PNG originales se conservan fuera del repositorio; las versiones WebP de 1200 × 675 pesan 32.700 y 24.676 bytes. No se eliminan marcas de agua de material ajeno.

El texto se revisa con los criterios de humanización en español: vocabulario concreto, una idea por párrafo, voz rioplatense y eliminación de repeticiones. Las afirmaciones comerciales se contrastan con las fuentes existentes del proyecto; no se añaden certificaciones, testimonios ni resultados atribuidos a clientes.

## Auditoría y validación

- Revisión del diff completo: SEO, enlaces, condiciones comerciales, seguimiento de CTA, renderizado en servidor, accesibilidad y alcance de las rutas compartidas.
- `npm test`: 456 pruebas aprobadas.
- `npm run test:browser -- --reporter=line`: 75 escenarios aprobados con API local simulada, incluidos los recorridos anteriores de tienda.
- Doce escenarios de claridad verifican los tres anchos, ausencia de desbordamiento, orden móvil de precio e imagen, FAQ por teclado, igualdad de respuesta y schema, teléfono de cada sucursal, Maps y funcionamiento sin JavaScript.
- Lint estricto, TypeScript, build de producción y auditoría de dependencias sin fallos. Sin dependencias nuevas.
- Revisión visual de escritorio y móvil: logo Samsung ampliado y contacto adelantado en la guía después de la primera pasada.

La entrega exige `validate` y deployment Preview Vercel aprobados en el último head, inspección del preview y ausencia de conversaciones de revisión pendientes. Tras integrar corresponde comprobar CI de main, deployment del SHA integrado, dominio y rutas públicas según `DEPLOYMENT.md`. Los resultados locales no sustituyen esos controles.

## Seguimiento

Comparar a 28 días consultas no asociadas a la marca, CTR de las páginas modificadas y eventos de presupuesto/WhatsApp por ubicación. Separar la lectura de GSC del volumen de consultas comerciales: una impresión o una visita no acredita una reparación. Revisar también INP y LCP con muestras de campo renovadas, sin atribuir una mejora a esta entrega por una sola medición de laboratorio.

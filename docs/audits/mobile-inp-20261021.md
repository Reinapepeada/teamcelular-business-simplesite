# INP móvil: diagnóstico y correcciones del 21 de octubre de 2026

Search Console, actualizado al 19/10, muestra un único problema: INP mayor a
200 ms, con 57 URL y 247 ms en el grupo. Primera detección: 26/08/2026.
La URL de ejemplo es `/guias/pin-de-carga-suelto-solucion`.

[PageSpeed del 21/10 a las 11:06 Argentina](https://pagespeed.web.dev/analysis/https-teamcelular-com-guias-pin-de-carga-suelto-solucion/3kdei8kal5?form_factor=mobile)
confirma datos de campo del **origen** móvil: INP 240 ms, LCP 2,2 s, CLS 0
y TTFB 0,6 s. No son métricas individuales de la guía. Lighthouse obtiene
99 de rendimiento, LCP 1,5 s y TBT 100 ms; esa carga simulada no mide el INP
de una sesión con interacciones. Detecta tareas largas de GA4 (96 y 72 ms),
Clarity (68 ms) y un chunk propio (95 ms). Estos tiempos no atribuyen por sí
solos el INP de campo a un script o control concreto.

## Cambios

El menú móvil se montaba dentro del flujo del encabezado: a 390 × 844 el
inicio de `main` pasaba de 52 a 844 px. Ahora se superpone bajo la barra,
sin desplazar ni recalcular la posición de todo el contenido inferior.

El selector de WhatsApp ejecutaba `showModal()` cuando el diálogo todavía
estaba vacío y montaba su contenido después. Ahora abre una vez montados los
controles; el foco inicial llega al botón de cerrar. La medición
`branch_selector_open` se ejecuta con `requestAnimationFrame` seguido de
`setTimeout`, después de la oportunidad de pintar el selector, siguiendo la
[recomendación de Chrome para INP](https://web.dev/articles/optimize-inp).
Se conserva un evento por apertura y el envío de WhatsApp sigue en su gesto
original, con la sucursal y el mensaje existentes.

## Verificación y límites

Compilaciones de producción antes y después, mismo Chromium y viewport
390 × 844, sin ralentización de CPU/red. Un proxy local agregó observadores
Event Timing/Long Animation Frames e interceptó los POST `/api/`; esa
instrumentación no forma parte del sitio publicado.

| Comprobación | Antes | Después |
| --- | --- | --- |
| Inicio de `main` con menú abierto, cinco muestras | 844 px | 52 px |
| Foco al abrir WhatsApp, cinco muestras | Diálogo vacío | Botón de cerrar |
| Mediana de duración del clic de apertura de WhatsApp | 24 ms | 24 ms |

No se reprodujo localmente un INP mayor a 200 ms ni se demostró una reducción
del INP de campo. Se corrigieron costos evitables y un defecto de foco; la
recuperación del grupo de 57 URL requiere nuevas muestras reales y la
validación de Google. Sus ventanas de 28 días incluyen visitas anteriores al
cambio. GA4 y Clarity continúan activos; no se eliminó medición para obtener
una puntuación artificialmente mejor.

QA a 320, 390 y 1280 px: selector, selección recordada, cierre, Escape y
devolución de foco. Portada, guía, servicio y presupuesto sin desbordamiento
horizontal, con un solo diálogo abierto y sin errores de consola.
El proxy recibió un evento por apertura, sin escrituras comerciales reales.

455 pruebas aprobadas, lint sin advertencias, TypeScript/build aprobados y
auditoría productiva sin vulnerabilidades. El lint local excluyó
`.claude/**`: un checkout histórico anidado contiene archivos generados
ajenos al proyecto actual; se conservó intacto. CI ejecuta el lint completo
en el checkout limpio del PR.

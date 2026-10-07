# SXO Analysis — teamcelular.com

Fecha: 2026-08-20 · Alcance: home, guías principales y presupuesto.
**El SXO Gap Score es independiente del GEO/SEO Health Score** (ver `GEO-ANALYSIS.md`, 81/100).
Una página puede estar técnicamente impecable y aun así ser el tipo de página equivocado para la query.

## Limitaciones (leer antes que los números)

- `WebSearch` resuelve desde locale US. Para queries locales de CABA **no veo local pack, PAA, AI Overview ni posiciones reales**. Lo que sí veo es el conjunto de competidores y su tipo de página, que es lo que alimenta el análisis de mismatch.
- Sin DataForSEO: no hay volumen, dificultad ni posición verificada.
- Los `scripts/render_page.py` y `parse_html.py` que la skill asume **no existen** en la instalación. Usé el código fuente local y el HTML servido por `next build`, más fiel que un render remoto.
- Word counts medidos sobre HTML renderizado, sin descontar el chrome de navegación.

---

## 1. `/presupuesto-reparacion` — SXO 59/100 · **MISMATCH ALTO**

**Query:** presupuesto / cotización reparación celular

### Paisaje SERP

Los competidores que rankean no tienen un formulario: tienen una **calculadora**.

| Competidor | Qué hace | Tipo |
|---|---|---|
| QuickFix | "cotización al instante en menos de 1 minuto", manda el precio por mail | Tool |
| Solvery | marca → tipo de arreglo → modelo, y **la plataforma arroja el costo** | Tool |
| OTS | presupuesto online de todas las marcas + 6 cuotas sin interés | Tool |

Tipo dominante: **Tool / Interactive** (3 de los 4 competidores directos identificados).

### Alineación

- Tu tipo de página: **Landing / Service** con formulario de captación de lead.
- El SERP espera: **Tool**.
- Veredicto: **MISMATCH — severidad ALTA**.

El usuario que busca "presupuesto" quiere **un número, ahora**. `RepairsForm` pide marca, modelo, tipo de reparación, urgencia y canal de contacto, y devuelve la promesa de una respuesta "en hasta 2 h por WhatsApp". El competidor devuelve un número en 60 segundos. Estás pidiendo datos a cambio de una espera; ellos dan valor a cambio de los datos.

### El dato clave

**Ya tenés los precios para resolverlo.** El formulario recoge exactamente `brand` + `model` + `repairType`, que es precisamente la clave de:

- `iphoneModels.ts` — 26 modelos con pantalla y batería
- `BRAND_REPAIR_PRICES` — Samsung, Xiaomi, Motorola, Pixel por gama

No hay que conseguir datos nuevos: hay que mostrar los que ya están en el repo. Un estimado en pantalla antes de enviar el lead ("Cambio de pantalla iPhone 13: ARS 249.900 · 2-4 h · garantía 90 días") convierte el formulario en la herramienta que el SERP premia, sin perder la captura del lead.

### Puntaje

| Dimensión | Puntos |
|---|---|
| Tipo de página | 5/15 |
| Profundidad (1.039 palabras) | 9/15 |
| UX | 10/15 |
| Schema (HowTo, FAQPage, Service, Offer) | 13/15 |
| Media (sin tabla, sin video, sin mapa) | 6/15 |
| Autoridad | 11/15 |
| Frescura (sin fecha visible) | 5/10 |
| **Total** | **59/100** |

---

## 2. `/` (home) — SXO 71/100 · **ALINEADA**

**Query:** reparación de celulares CABA

### Paisaje SERP

ST Mobile, QuickFix, FixNow, Solvery, GoFix, SuperServices: todas homepages de taller con dirección, más perfiles de Facebook/Instagram y un directorio del GCBA. Tipo dominante: **Local Page / Service homepage** (~70% de consenso). Team Celular aparece 4º en esta muestra.

### Alineación

Tu home es Local/Service híbrida con NAP visible, `LocalBusiness` schema global con `GeoCoordinates` y `OpeningHoursSpecification`, y reviews de Google en vivo. **Tipo correcto.** El gap no es de tipo sino de densidad de señal local.

### Lo que falta

- **Sin mapa embebido.** Todos los competidores locales lo tienen; la taxonomía lo marca como elemento requerido de Local Page.
- **Sin FAQPage en la home.** 17 páginas del sitio la tienen; la más importante no.
- **Sin fecha visible** en ninguna parte.
- 1.205 palabras: suficiente para el tipo, pero la mitad de tus propias guías.

### Puntaje

| Dimensión | Puntos |
|---|---|
| Tipo de página | 13/15 |
| Profundidad (1.205 palabras) | 11/15 |
| UX | 12/15 |
| Schema (LocalBusiness completo, sin FAQPage) | 13/15 |
| Media (sin mapa, sin video, sin tabla) | 8/15 |
| Autoridad (reviews en vivo, 10 años) | 12/15 |
| Frescura | 5/10 |
| **Total** | **71/100** |

---

## 3. `/guias/reparacion-iphone-buenos-aires` — SXO 78/100 · mismatch leve

### Paisaje SERP

Mezcla, sin consenso fuerte: un listado de MercadoLibre, service pages (ApplePoint, TecBox, CenterMac, iPoint), un **PDF con lista de precios** de iPoint, y tu guía. Tipo dominante débil: **Service Page** (~50%). SERP fragmentado es oportunidad de diferenciación, no problema de tipo.

### Alineación

Tu guía es un híbrido: contenido educativo + tabla de precios + `Service` schema con `OfferCatalog`. Contra un SERP fragmentado el híbrido es la apuesta correcta. La ventaja real es que **publicás precios por modelo y la mayoría no**: un competidor los esconde dentro de un PDF.

### Observación sin verificar

El resumen del buscador citó rangos de "ARS 80.000–180.000" para pantallas iPhone 11-13, mientras tu tabla actual dice 129.900–199.900. Puede ser índice desactualizado o mezcla de fuentes del propio buscador; **no pude atribuirlo**. Verificalo con inspección de URL en Search Console: si el índice tiene la versión vieja, conviene forzar re-rastreo.

### Puntaje: 78/100

Tipo 10 · Profundidad 14 (2.179 palabras) · UX 11 · Schema 13 · Media 9 · Autoridad 13 · Frescura 8

---

## 4. `/guias/reparacion-samsung-buenos-aires` — SXO 78/100 · mismatch leve

### Paisaje SERP

Dominado por **samsung.com/ar/support** (servicio oficial) y Grupo GB (service page con dirección en Av. Santa Fe). Bastante resultado de España y Colombia contaminando la muestra por el locale US.

### Alineación

Contra el sitio oficial de la marca no ganás por autoridad de entidad. Ganás por lo que el oficial no da: **precio publicado, plazo concreto y la opción de reparar placa en vez de cambiar el módulo completo**. La guía ya lo hace y ahora declara `AggregateOffer` con rango real (89.900–1.199.900).

El ángulo a explotar: el service oficial deriva a centros autorizados y cotiza a puertas cerradas. Ya tenés la guía hermana `/guias/presupuesto-service-oficial-segunda-opinion` y **no están enlazadas entre sí**. Ese es exactamente el puente que necesita el usuario de esta query.

### Puntaje: 78/100

Tipo 10 · Profundidad 14 (2.084 palabras) · UX 11 · Schema 13 · Media 9 · Autoridad 12 · Frescura 9

---

## User stories derivadas

**1. El que compara precio antes de moverse** *(señal: PDF de precios de iPoint rankeando; "precio" en la query)*

> Como dueño de un iPhone con la pantalla rota, quiero saber cuánto sale antes de cruzar la ciudad, porque ya me pasó que el presupuesto en el local fue el doble de lo que esperaba, pero me bloquea que casi ningún taller publica precios.

**2. El que quiere el número ya** *(señal: QuickFix "cotización al instante"; Solvery "arroja el costo")*

> Como usuario que busca "presupuesto reparación celular", quiero un estimado en el momento, porque necesito decidir entre reparar o comprar usado, pero me bloquea tener que dejar mis datos y esperar la respuesta.

**3. El que desconfía del service oficial** *(señal: samsung.com dominando el SERP; tu guía de segunda opinión)*

> Como dueño de un Samsung con un presupuesto oficial carísimo, quiero una segunda opinión técnica, porque sospecho que me quieren cambiar la placa entera, pero me bloquea no saber si un taller independiente tiene nivel para trabajar microelectrónica.

**4. El de proximidad** *(señal: local pack; competidores con 4 sucursales; "cerca de mí")*

> Como alguien sin tiempo, quiero un taller cerca al que llegar hoy, porque uso el celular para trabajar, pero me bloquea no saber si atienden sin turno ni cuánto tardan.

**5. El del daño complejo** *(señal: "placa", "mojado"; tu vertical de microelectrónica)*

> Como dueño de un equipo que no enciende, quiero saber si tiene arreglo antes de darlo por perdido, porque tengo fotos sin backup, pero me bloquea que en dos lugares ya me dijeron "no tiene solución".

---

## Scoring por persona (experiencia global del sitio)

| Persona | Relevancia | Claridad | Confianza | Acción | Total |
|---|---|---|---|---|---|
| Comparador de precio | 22/25 | 20/25 | 21/25 | 18/25 | **81** |
| **El que quiere el número ya** | 20/25 | **10/25** | 19/25 | **12/25** | **61** |
| Desconfía del oficial | 23/25 | 19/25 | 23/25 | 17/25 | **82** |
| Proximidad | 21/25 | 18/25 | 20/25 | 20/25 | **79** |
| Daño complejo | 24/25 | 20/25 | 24/25 | 19/25 | **87** |

La persona más débil es la misma que revela el mismatch del presupuesto: llega buscando un número y encuentra un formulario.

---

## Acciones prioritarias

**1. Estimado instantáneo en `/presupuesto-reparacion`.** Cierra el único mismatch de severidad alta y la persona más floja. Los datos ya están en `iphoneModels.ts` y `BRAND_REPAIR_PRICES`; el formulario ya recoge las claves. Mostrar el rango al elegir marca + modelo + reparación, con el envío del lead intacto debajo.

**2. Mapa embebido y FAQ en la home.** Los dos elementos que la taxonomía marca como requeridos para Local Page y que todos los competidores locales tienen.

**3. Enlazar la guía Samsung con `/guias/presupuesto-service-oficial-segunda-opinion`.** El puente que le falta a la persona que desconfía del oficial. Recíproco, costo cero.

**4. Verificar en Search Console** si el índice conserva precios viejos de la guía de iPhone.

**5. Extender los precios a las 11 marcas restantes.** El diferencial que sostiene todo este análisis es publicar el número. Hoy lo hacés en 5 marcas de 16.

## Handoffs

| Hallazgo | Skill |
|---|---|
| Señales locales (mapa, GBP, NAP) | `/seo local` |
| Falta FAQPage en la home | `/seo schema` |
| Índice posiblemente desactualizado | `/seo google` (URL inspection) |
| Frescura y fechas | `GEO-ANALYSIS.md`, fase 2 pendiente |

# Maps Analysis — teamcelular.com

Fecha: 2026-08-20 · Sucursales: Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), CABA.

## Tier detectado: 0 (gratuito)

- DataForSEO MCP **no disponible** → sin geo-grid, sin SoLV, sin auditoría de GBP en vivo, sin inteligencia de reseñas.
- La API key de Google del proyecto tiene **Places API bloqueada** (`API_KEY_SERVICE_BLOCKED`), así que tampoco hay datos de ficha vía Places.
- Lo que sigue sale de OpenStreetMap (Nominatim + Overpass), del HTML en vivo y de Search Console.

**Maps Health Score: no calculable en Tier 0.** Faltan los datos de ficha y reseñas que pesan la mayor parte del score. Lo que sí se puede afirmar está abajo.

---

## El contexto que explica los datos de Search Console

En los últimos 28 días el sitio tiene **misma posición en móvil y escritorio (6,6 vs 6,5) pero la mitad de CTR** (1,41% vs 2,40%), y los head terms rinden casi cero:

| Query | Impresiones | Clicks | Posición |
|---|---|---|---|
| reparacion de celulares | 623 | 1 | 6,6 |
| reparación de celulares | 241 | 0 | 7,1 |
| arreglo de celulares | 239 | 0 | 7,4 |

Un resultado en posición 6-7 debería rendir 2-4%. Rendir 0,16% significa que arriba hay algo que se lleva el click: en queries locales de este tipo, el pack de mapas.

La densidad competitiva lo confirma.

### Densidad de competencia (OpenStreetMap, radio corto)

| Sucursal | Locales de celulares | Radio | Con sitio web |
|---|---|---|---|
| **Recoleta** (Paraguay 2451) | **45** | 1,2 km | **1** |
| Belgrano (Amenábar 2032) | 28 | 1,5 km | 4 |

Cuarenta y cinco locales de celulares a doce cuadras. Esa es la pelea real por el pack de mapas, y se gana con señales de ficha (reseñas, categorías, fotos, proximidad), no con contenido del sitio.

El dato del otro lado es la oportunidad: **de 45 competidores en Recoleta, uno solo tiene sitio web.** La ventaja de contenido y precios publicados es enorme y es defendible. Lo que no está resuelto es la capa de mapas.

---

## Hallazgos verificables

### 1. El nombre de la ficha está saturado de palabras clave — riesgo alto

El embed de Maps en `/contacto` revela el nombre real de la ficha:

> `Team celular | Reparacion de celulares | Reparacion de computadoras`

Las guías de representación de Google piden el **nombre real del negocio**, sin descriptores ni palabras clave. Esta práctica es causa habitual de suspensión de ficha, y cualquier competidor puede reportarla con dos clicks. Además rompe la consistencia de NAP: el `LocalBusiness` del sitio declara `Team Celular`.

Corregir a `Team Celular` es la acción de mayor riesgo evitado de toda la lista. Se pierde un empujón artificial de corto plazo; se saca de encima la posibilidad de perder la ficha entera.

### 2. Belgrano no existe en OpenStreetMap

| Consulta | Resultado |
|---|---|
| Team Celular Paraguay 2451 | ✅ `shop/mobile_phone` en Recoleta, Barrio Norte |
| Team Celular Amenábar 2032 | ❌ sin resultados |

OSM alimenta Apple Maps, apps de terceros y varios agregadores. Cargar la sucursal de Belgrano es gratis, lleva diez minutos y es una cita más en el ecosistema. Recoleta ya está, así que hay precedente de que el negocio es mapeable.

### 3. Cuatro nombres distintos para dos locales

La ficha de Belgrano existe y se llama `TeamCelular Belgrano` (confirmado por el dueño). Con eso el cuadro completo queda así:

| Fuente | Nombre |
|---|---|
| Ficha Recoleta | `Team celular \| Reparacion de celulares \| Reparacion de computadoras` |
| Ficha Belgrano | `TeamCelular Belgrano` |
| Schema del sitio, Recoleta | `Team Celular - Sucursal Recoleta` |
| Schema del sitio, Belgrano | `Team Celular - Sucursal Belgrano` |
| Organización | `Team Celular` |

Ninguno coincide con ninguno. Y hay una diferencia más fina que importa: **`TeamCelular` en una palabra contra `Team Celular` en dos**. Para el motor son dos cadenas distintas, y la consistencia de nombre es de las señales más básicas del pack local.

Propuesta de nombre canónico, un solo criterio para todo:

| Dónde | Nombre |
|---|---|
| Ficha Recoleta | `Team Celular Recoleta` |
| Ficha Belgrano | `Team Celular Belgrano` |
| Schema del sitio | los mismos dos, exactos |
| Organización | `Team Celular` |

Las dos fichas llevan el barrio: con dos locales, que uno se quede el nombre de
la marca a secas lo hace competir con la entidad global y deja al otro como
sucursal de segunda. El descriptor de ubicación es de uso aceptado en fichas
multi-sucursal; lo que no se acepta es la lista de servicios que tiene hoy Recoleta.

**Nota:** Belgrano tampoco aparece en la data de Search Console — ni una query de marca entre 1.297, ni la página `/sucursales/caba/belgrano` entre las 127 con impresiones. Con la ficha existiendo, la explicación más probable es que la ficha todavía no acumuló señal, o que el nombre en una palabra no se asocia a la marca.

---

## Lo que no pude evaluar

Requiere DataForSEO o acceso a Business Profile:

- **Geo-grid / SoLV**: en qué puntos del mapa aparecés en el top 3 y en cuáles desaparecés. Es la medición que convertiría la hipótesis del pack de mapas en un número.
- **Auditoría de ficha**: categorías primaria y secundarias, atributos, fotos, productos, publicaciones, horarios especiales.
- **Inteligencia de reseñas**: velocidad, regla de los 18 días, distribución, tasa de respuesta del dueño.
- **NAP en Bing Places y Apple Maps**.

---

## Acciones priorizadas

| # | Acción | Severidad | Esfuerzo |
|---|---|---|---|
| 1 | Sacar la lista de servicios del nombre de la ficha de Recoleta | **Crítica** — riesgo de suspensión | 5 min |
| 2 | Unificar el nombre en ambas fichas: `Team Celular Recoleta` / `Team Celular Belgrano` (el schema del sitio ya está alineado) | **Alta** | 20 min |
| 3 | Cargar Belgrano en OpenStreetMap | Media | 10 min |
| 4 | Fotos y reseñas nuevas con cadencia sostenida en ambas fichas | **Alta** — es lo que mueve el pack | continuo |
| 5 | Contratar DataForSEO para medir geo-grid y cerrar el diagnóstico | Media | — |

Las tres primeras son gratis y se hacen en media hora.

---

## Nota de método

Los datos de competencia salen de OpenStreetMap, que **subrepresenta** los comercios reales: lo que OSM muestra como 45 locales en Recoleta es un piso, no un censo. La conclusión sobre densidad se refuerza, no se debilita, con ese sesgo.

Los datos de Search Console son del 21 de julio al 17 de agosto de 2026, propiedad `sc-domain:teamcelular.com`. El 74% de las impresiones corresponden a queries anonimizadas por Google, así que todo lo que se afirma a nivel query sale del 26% restante.

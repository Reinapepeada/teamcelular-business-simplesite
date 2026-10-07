# Plan de Google Ads — Team Celular

Presupuesto inicial: 50.000 ARS de crédito. Datos de Search Console, 1 jun – 30 ago 2026 (90 días).

---

## Antes de gastar un peso

**0. Estado al 2 de septiembre de 2026.** Ya quedó hecho por API:
eventos clave `lead_form_submit` y `branch_whatsapp_redirect` creados (la propiedad
solo tenía `purchase`, que el sitio nunca dispara: GA4 reportaba cero conversiones), y
seis dimensiones personalizadas dadas de alta. Falta lo que no se puede hacer sin la
cuenta de Ads: vincularla con GA4 e importar las conversiones.

**1. Conversiones en Ads, o no gastes.** Sin esto, los 50.000 se van a ciegas y no vas a
saber qué palabra trajo un cliente.

Los eventos ya existen y ya llegan a GA4:

| Evento GA4 | Qué es | Usuarios / 30 días |
|---|---|---|
| `lead_form_submit` | completó el presupuesto | 43 |
| `branch_whatsapp_redirect` | tocó WhatsApp de sucursal | 107 |

En GA4: **Administrar → Eventos → marcar como evento clave**. Después, en Ads:
**Objetivos → Conversiones → Importar → Google Analytics 4**. Importá los dos.

**2. Arreglá el nombre de la ficha primero.** La ficha de Recoleta se llama
`Team celular | Reparacion de celulares | Reparacion de computadoras`. Si vas a usar
recursos de ubicación en los anuncios (y deberías, sos un negocio local), estarías
amplificando una ficha que puede ser suspendida. Corregí el nombre, esperá la
aprobación y recién ahí conectá la cuenta de Business Profile a Ads.

**3. Verificá las condiciones del crédito.** Los créditos promocionales de Google Ads
suelen exigir gastar un monto equivalente dentro de una ventana de tiempo, y suelen
vencer. No puedo ver los términos de tu oferta: leelos antes de planificar, porque
cambian por completo el ritmo de gasto.

---

## Por qué Ads tiene sentido en tu caso

No es "probemos a ver". Hay un problema concreto que lo paid resuelve y lo orgánico no:

| Grupo de búsquedas | Impresiones | Clicks | CTR | Posición |
|---|---|---|---|---|
| **Genéricas** (reparación / arreglo de celulares) | 5.046 | 28 | **0,55%** | 7,4 |
| **Locales** (cerca de mí, CABA) | 4.025 | 29 | **0,72%** | 7,3 |
| iPhone | 4.791 | 56 | 1,17% | 7,2 |
| Placa / agua / microelectrónica | 515 | 11 | **2,14%** | 7,1 |
| Batería | 327 | 7 | 2,14% | 9,2 |
| Samsung | 1.057 | 7 | 0,66% | 8,6 |
| **Marca** (team celular) | 275 | 60 | **21,82%** | 1,5 |

Nueve mil impresiones en genéricas y locales rindiendo medio punto de CTR. Estás
apareciendo y no te ven, porque en esas búsquedas el pack de mapas y los anuncios
ocupan la pantalla antes que el primer resultado orgánico. **Ahí es exactamente donde
un anuncio te pone arriba.**

---

## Qué NO hacer

**No pagues por tu marca.** "team celular" rinde 21,82% de CTR en posición 1,5 sin
gastar nada. Pagar por eso es comprar clicks que ya tenés. (Excepción: si ves que un
competidor está pujando por tu nombre, ahí sí, defensivo.)

**No uses Máximo rendimiento (PMax) para arrancar.** Te esconde en qué búsqueda gastó.
Con 50.000 pesos necesitás aprender qué palabra convierte, y para eso querés Búsqueda
con orientación manual. PMax es para cuando ya sabés qué funciona.

**No mandes todo a la home.** Cada grupo de anuncios a su página.

---

## Estructura propuesta

Cinco grupos, cada uno a su landing:

### 1. Genéricas locales — el grueso del presupuesto
Destino: `/presupuesto-reparacion` (tiene el cotizador con precio)

```
reparacion de celulares caba
arreglo de celulares caba
servicio tecnico de celulares caba
reparacion de celulares buenos aires
arreglo de celulares cerca
reparacion de celulares cerca
casa de reparacion de celulares
```

### 2. iPhone — el mayor volumen propio
Destino: `/guias/reparacion-iphone-buenos-aires`

```
reparacion iphone caba
service iphone caba
arreglo de iphone buenos aires
cambio de pantalla iphone
cambio de bateria iphone
servicio tecnico iphone
```

### 3. Pantalla
Destino: `/reparaciones/cambio-pantalla-caba`

```
cambio de pantalla celular caba
reparacion de pantalla celular
cambio de modulo celular
pantalla rota celular arreglo
```

### 4. Batería y carga
Destino: `/reparaciones/cambio-bateria-caba`

```
cambio de bateria celular caba
cambio de pin de carga celular
reparacion pin de carga
```

### 5. Placa, agua y microelectrónica — el de mayor margen
Destino: `/reparaciones/reparacion-placa-caba`

```
reparacion de placa de celular
reballing celular
celular mojado reparacion
microelectronica celulares
celular no enciende reparacion
```

Este grupo tiene el mejor CTR orgánico (2,14%) y es el trabajo que menos talleres
pueden hacer: de 45 competidores a 1,2 km de Recoleta, uno solo tiene sitio web. Es
donde tu ventaja técnica es real y donde el ticket es más alto.

---

## Segmentación

**Geográfica, y esto es crítico.** El 22% de tus impresiones vienen de Venezuela,
Estados Unidos, Ecuador, México y Colombia, y no convierten nada. En Ads eso sería
plata quemada.

- Ubicación: CABA + hasta 5 km alrededor de cada sucursal.
- **Presencia**, no interés: elegí "Personas que se encuentran en tus ubicaciones",
  no la opción por defecto que incluye a quien "muestra interés". Sin esto pagás
  clicks de alguien buscando desde Caracas.
- Idioma: español.

**Dispositivo:** el 68% de tus impresiones son móviles. No lo excluyas, pero mirá el
rendimiento por dispositivo a las dos semanas y ajustá.

**Horario:** atendés lunes a viernes 10:30 a 18:00. Un lead que entra sábado a la
noche se enfría hasta el lunes. Considerá concentrar el presupuesto en días y horas
de atención, más un margen antes y después.

---

## Palabras negativas — cargalas desde el día uno

```
phone repair
near me
gratis
como reparar
como arreglar
tutorial
curso
cursos
aprender
empleo
trabajo
mayorista
al por mayor
repuestos
liberar
desbloquear
imei
usado
usados
comprar
venta
```

`phone repair` sola juntó **2.679 impresiones y 1 click** en 90 días. Es tráfico
extranjero puro. En orgánico es inofensivo; en paid te vacía la cuenta.

---

## Cómo decidir cuánto pagar por click

No te puedo dar un CPC: no tengo acceso al Planificador de Palabras Clave sin la API
de Ads. Pero sí tenés cómo calcular tu techo.

De 730 usuarios en 30 días, 150 hicieron una acción de contacto (43 formulario + 107
WhatsApp): **alrededor del 20%**.

Entonces:

```
CPC máximo = ticket promedio × tu tasa de cierre × 0,20
```

Si tu ticket promedio es 200.000 y cerrás 1 de cada 3 consultas:
`200.000 × 0,33 × 0,20 = 13.200` por click como techo teórico. Bajalo bastante para
tener margen: el número real que quieras pagar es una fracción de ese.

Ese 20% sale de tráfico orgánico, que llega más decidido que el de anuncios. Para
paid, asumí que va a ser menor hasta que los datos digan otra cosa.

---

## Ritmo sugerido

| Semana | Qué hacer |
|---|---|
| 0 | Conversiones importadas, nombre de la ficha corregido, negativas cargadas |
| 1-2 | Solo grupos 1 y 5 (genéricas locales + placa). Concordancia de frase, no amplia |
| 3 | Revisar el informe de términos de búsqueda. Sumar negativas. Recién ahí abrir iPhone |
| 4+ | Subir presupuesto solo en los grupos con conversiones registradas |

**El informe de términos de búsqueda es lo que tenés que mirar cada semana.** Te dice
por qué búsqueda real te cobraron, que casi nunca es la que cargaste.

---

## Sobre la API de Google Ads

Las skills `google-ads-api-*` del repositorio de Google sirven para operar la cuenta
por código, pero necesitan un **token de desarrollador**, que se pide y se aprueba
con demora. Para una primera campaña de 50.000 pesos no compensa: la interfaz hace
todo esto y más rápido.

Vuelve a tener sentido más adelante, cuando quieras subir conversiones offline — el
lead de WhatsApp que terminó en una reparación cobrada. Ahí `data-manager-api-event-ingestion`
es la pieza correcta, y es lo que hace que Ads optimice hacia clientes reales y no
hacia formularios completados.


---

# Textos de los anuncios

Todos verificados contra los límites de caracteres de Google Ads: títulos 30,
descripciones 90, textos destacados 25, vínculos a sitios 25 más 35 de descripción.

Cargá todos los títulos y descripciones de cada grupo: Google prueba combinaciones y
se queda con las que rinden. Fijá solo si algo no puede faltar.

## Grupo 1 — Genéricas locales → `/presupuesto-reparacion`

**Títulos:** Reparación de Celulares · Service en Recoleta y Belgrano · Diagnóstico el
Mismo Día · Garantía Escrita 90 Días · Presupuesto por WhatsApp · Precios Publicados
en la Web · Sin Turno, Lun a Vie · 10 Años en Microelectrónica · Pantalla en 2 a 4
Horas · 3 Cuotas Sin Interés

**Descripciones:**
- Paraguay 2451 Recoleta y Amenábar 2032 Belgrano. Diagnóstico el mismo día.
- Pantalla y batería en 2 a 4 horas, con garantía escrita de 90 días.
- Publicamos los precios: mirá cuánto sale tu modelo antes de venir.
- Presupuesto por WhatsApp en hasta 2 horas hábiles. Sin turno previo.

## Grupo 2 — iPhone → `/guias/reparacion-iphone-buenos-aires`

**Títulos:** Reparación de iPhone CABA · Service iPhone en Recoleta · Pantalla iPhone
2 a 4 hs · Precios por Modelo · iPhone 8 al 17 Pro Max · Batería y Pantalla iPhone ·
Garantía Escrita 90 Días · Diagnóstico el Mismo Día

**Descripciones:**
- Precio por modelo publicado, del iPhone 11 al 17 Pro Max. Mirá el tuyo.
- Pantalla y batería en 2 a 4 horas. Garantía escrita de 90 días.
- También reparamos placa: reballing y soldadura bajo microscopio.
- Paraguay 2451 Recoleta. Lunes a viernes de 10:30 a 18:00, sin turno.

## Grupo 3 — Pantalla → `/reparaciones/cambio-pantalla-caba`

**Títulos:** Cambio de Pantalla CABA · Pantalla Rota o con Líneas · Módulo en 2 a 4
Horas · Cambio de Display Celular · Garantía Escrita 90 Días

**Descripciones:**
- Revisamos si es módulo, flex o placa antes de cambiar. No cambiamos de más.
- Cambio de módulo en 2 a 4 horas, con garantía escrita de 90 días.
- Precios publicados por marca y modelo. Consultá el tuyo por WhatsApp.

## Grupo 4 — Batería y carga → `/reparaciones/cambio-bateria-caba`

**Títulos:** Cambio de Batería CABA · Batería en 1 a 2 Horas · Pin de Carga Flojo ·
Se Apaga o Dura Poco · Garantía Escrita 90 Días

**Descripciones:**
- Antes de cambiar la batería revisamos consumo y puerto de carga.
- Cambio de batería en 1 a 2 horas. Garantía escrita de 90 días.
- Carga intermitente o falso contacto: reparamos el pin bajo microscopio.

## Grupo 5 — Placa y agua → `/reparaciones/reparacion-placa-caba`

**Títulos:** Reparación de Placa CABA · Reballing BGA en Recoleta · Celular Mojado:
Urgente · No Enciende: Diagnóstico · Microelectrónica Celulares · Segunda Opinión
Técnica

**Descripciones:**
- Reparamos a nivel componente lo que otros presupuestan como cambio de placa.
- Reballing BGA y soldadura SMD bajo microscopio. 10 años de laboratorio.
- ¿Se mojó? Traelo apagado. Cuanto antes, menos corrosión.
- Segunda opinión si el service oficial te presupuestó de más.

## Recursos para toda la cuenta

**Textos destacados:** Garantía escrita · Precios publicados · Dos sucursales · Sin
turno previo · Mismo día · 3 cuotas sin interés · 10 años de oficio · Microelectrónica

**Vínculos a sitios:**

| Título | Descripción | Destino |
|---|---|---|
| Ver precios | Precio por modelo, publicado | `/guias/reparacion-iphone-buenos-aires` |
| Pedir presupuesto | Respuesta por WhatsApp en 2 h | `/presupuesto-reparacion` |
| Sucursal Recoleta | Paraguay 2451, sin turno | `/sucursales/caba/recoleta` |
| Sucursal Belgrano | Amenábar 2032, sin turno | `/sucursales/caba/belgrano` |

**Llamada:** +54 11 5103-4595, restringida al horario de atención.

**Ubicación:** conectada a Business Profile, después de corregir el nombre de la ficha.

### Una frase que evité a propósito

Nada de "presupuesto sin cargo" ni "diagnóstico gratis". La revisión técnica es
arancelada, entre 15.000 y 25.000 pesos según el caso. Prometer gratis en el anuncio y
cobrar en el mostrador genera reclamos, malas reseñas y riesgo de desaprobación por
política de Google. El presupuesto por WhatsApp sí es sin cargo, y así está redactado.


---

# Triangulacion con GA4 — que conviene pujar de verdad

Las landings de la primera version se eligieron por logica de intencion. Cruzadas
con las conversiones reales de GA4 (90 dias, tasa sobre sesiones que entraron por
esa pagina), una eleccion estaba mal y otras quedaron confirmadas.

| Pagina de entrada | Sesiones | Convierten | Tasa |
|---|---|---|---|
| `/` (home) | 223 | 54 | **24,2%** |
| `/reparaciones/reparacion-placa-caba` | 17 | 4 | 23,5% |
| `/guias/reparacion-samsung-buenos-aires` | 61 | 12 | 19,7% |
| `/guias/reparacion-iphone-buenos-aires` | 50 | 8 | 16,0% |
| `/zonas/palermo` | 38 | 4 | 10,5% |
| `/presupuesto-reparacion` | 52 | 3 | **5,8%** |
| `/guias/pin-de-carga-suelto-solucion` | 26 | 0 | **0%** |

**Correccion 1: el grupo principal ya no va al formulario.** `/presupuesto-reparacion`
convierte al 5,8% como pagina de entrada, la peor de las que tienen volumen. Quien cae
en frio sobre un formulario sin contexto se va, y el trafico de anuncios es frio por
definicion. El grupo "Genericas locales" apunta ahora a la home, que convierte al
24,2% con el mayor volumen medido.

**Correccion 2: no pujar por pin de carga.** `/guias/pin-de-carga-suelto-solucion`
tiene 2.623 impresiones en Search Console y **cero conversiones** en 26 sesiones. Es
trafico que lee y se va. El grupo "Bateria y carga" queda pausado.

**Confirmado: placa y agua.** 23,5% de conversion valida el grupo de mayor margen.

## Que correr con 50.000 pesos

Con ese presupuesto no alcanza para cinco grupos. Dos:

| Grupo | Destino | Por que |
|---|---|---|
| Genericas locales | `/` | El hueco que el organico no cubre (0,55% de CTR en posicion 7) + la pagina que mejor convierte |
| Pantalla | `/reparaciones/cambio-pantalla-caba` | El trabajo mas rutinario, 2 a 4 horas, y la pagina transaccional con mejor senal (41,7%, aunque sobre 12 sesiones) |

**Placa y agua queda afuera por decision del negocio**, no por los datos: convertia al
23,5% y es el de mayor margen, pero no se quiere ese tipo de trabajo. Se suman
negativas de campana para que las genericas tampoco lo traigan: `placa`, `reballing`,
`microelectronica` y `corrosion`, que son terminos de quien ya sabe que el dano es a
nivel componente. `mojado`, `sumergido` y `no enciende` quedan permitidas: son
sintomas de entrada que muchas veces terminan siendo bateria o pin de carga, y ese
trabajo si se quiere. El trabajo de placa sigue
llegando por organico, que no cuesta nada.

Los otros grupos pausados. Cuando haya datos propios de la campana, se abren.

## Advertencia sobre estos numeros

Son visitantes organicos, que llegan mas decididos que los de un anuncio. La tasa
pagada va a ser menor. Sirven para ordenar prioridades entre paginas, no para
proyectar cuantos leads vas a tener.


---

# Por que la campana de reparacion no puede correr (2026-09-02)

Los anuncios de reparacion quedaron rechazados o limitados bajo la politica
**"Asistencia tecnica de terceros para consumidores"**, por deteccion automatica.
Reescribir el texto no sirvio: una version sin "service", "tecnico", "soporte" ni
"diagnostico" cayo igual. El clasificador mira el rubro, no las palabras.

La politica tiene **dos excepciones**, y ahi esta la explicacion de por que los
competidores si anuncian:

1. Anuncios que **venden tecnologia de consumo**, incluso si la pagina de destino
   tiene secciones de asistencia tecnica.
2. Anunciantes que dan asistencia tecnica **exclusivamente a empresas**.

| Competidor | Como se presenta | Excepcion |
|---|---|---|
| GoFix | Tienda online: carrito, precios, categorias de producto. "Compra productos de Electronica/IT/Computacion por internet" | 1 |
| Koyology | Clasificada como "Tienda de accesorios para telefonos celulares" | 1 |
| Team Celular | Anuncios de reparacion hacia paginas de reparacion | ninguna |

**No existe certificacion para este caso.** La politica no menciona ningun programa
de verificacion que habilite anunciar asistencia tecnica de consumo, ni ninguna via
para un taller fisico. Las apelaciones en curso probablemente no prosperen.

## Las dos vias viables

**Vender productos.** 65 URLs en `/tienda` y Merchant Center ya vinculado. Anuncios de
modulos, baterias, fundas y cargadores, con destino a fichas de producto. Tiene que ser
venta real, no un anuncio de reparacion disfrazado.

**Solo empresas.** `/guias/soporte-empresas-servicio-tecnico`, planes desde 5
dispositivos con SLA y logistica. Una campana dirigida exclusivamente a empresas entra
en la excepcion 2 textualmente.

## Que sigue valiendo

Nada de esto afecta al organico. La reparacion sigue trayendo el grueso del trafico
por Search Console, la home convierte al 24,2% y el trabajo de contenido y precios
publicados no depende de Ads.


---

# Investigacion: por que los competidores si anuncian (2026-09-02)

Revisados tres que aparecen con anuncios en las mismas busquedas:

| Competidor | Como se presenta | Tiene carrito y precios |
|---|---|---|
| GoFix | "Compra productos de Electronica/IT/Computacion por internet" | si |
| Koyology | Clasificada como "Tienda de accesorios para telefonos celulares" | si |
| iseephone | "Tu tienda de confianza en accesorios para celulares y servicio tecnico" | si, envio gratis desde $80.000 |

Los tres venden productos online. Eso los pone dentro de la excepcion 1 de la
politica: *anuncios que venden tecnologia de consumo, incluso si la pagina de destino
tiene secciones de asistencia tecnica*. iseephone incluso dice "servicio tecnico" en
su titulo y publica igual, porque el negocio es tambien una tienda.

## Por que teamcelular.com no entra en esa excepcion

`/tienda` tiene 65 URLs con schema `Product` y `Offer`, pero:

| | Competidores | teamcelular.com |
|---|---|---|
| Precio visible en la ficha | si | **no** |
| Carrito | si | **no existe** (`/cart` devuelve 404) |
| Checkout | si | **no existe** |
| Boton principal | "Agregar al carrito" | **"Consultar por WhatsApp"** |
| Indexacion | indexadas | **noindex** |

Para el clasificador eso no es venta de producto: es una consulta de servicio, que es
exactamente lo que la politica restringe. La tienda existe como catalogo de captacion,
no como comercio.

## Las dos rutas reales

**A. Convertir la tienda en tienda.** Mostrar precio, habilitar carrito y checkout,
sacar el noindex. Es trabajo de producto y una decision de negocio: implica querer
vender repuestos y accesorios online de verdad. Recien ahi los anuncios de producto
entran en la excepcion 1.

**B. Campana solo para empresas.** Excepcion 2, textual, y no necesita ecommerce.
La landing ya existe: `/guias/soporte-empresas-servicio-tecnico`, planes desde 5
dispositivos con SLA y logistica.

Ninguna de las dos garantiza aprobacion: la deteccion es automatica. Pero son las
unicas dos que la politica describe como permitidas.

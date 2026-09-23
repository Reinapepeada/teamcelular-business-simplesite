import type { ServiceLandingConfig } from "./serviceLanding";
import { BRAND_REPAIR_PRICES, CHARGING_PORT_PRICE, formatArsPrice } from "@/lib/repairPrices";
import { IPHONE_MODELS } from "@/app/(site)/reparaciones/iphone/iphoneModels";

// Precios del primer parrafo de cambio de pantalla: misma fuente que las tablas.
const IPHONE_13_SCREEN = IPHONE_MODELS.find((m) => m.slug === "13")?.screen ?? 249900;
const IPHONE_13_BATTERY = IPHONE_MODELS.find((m) => m.slug === "13")?.battery ?? 159900;
const IPHONE_BATTERY_FROM = Math.min(
  ...IPHONE_MODELS.map((m) => m.battery).filter((v): v is number => v !== null),
);

export const SERVICE_CONFIGS: Record<string, ServiceLandingConfig> = {
  "cambio-bateria-caba": {
    slug: "cambio-bateria-caba",
    h1: "Cambio de batería en CABA",
    metaTitle:
      "Cambio de Batería de Celular en CABA desde $89.900",
    metaDescription:
      "Cambio de batería en CABA desde $89.900 (Samsung A y Moto G) y $99.900 en iPhone 11. En 1 a 2 horas en Paraguay 2451, Recoleta. Garantía escrita 90 días.",
    socialTitle: "Cambio de Batería en CABA | Team Celular",
    socialDescription:
      "Team Celular, Paraguay 2451 Recoleta. Cambio de batería en CABA con diagnóstico previo y garantía escrita 90 días.",
    keywords: [
      "cambio de bateria CABA",
      "reemplazo bateria Capital Federal",
      "cambio bateria iPhone CABA",
      "cambio bateria Samsung CABA",
      "bateria celular se descarga rapido",
    ],
    intro:
      "Cambiamos la batería de tu celular en 1 a 2 horas si el repuesto está en stock, con garantía escrita de 90 días. Antes medimos el consumo: a veces el que se come la carga es una app o la placa, no la batería.",
    prices: [
      { label: "iPhone 13", value: formatArsPrice(IPHONE_13_BATTERY) },
      { label: "Samsung Galaxy A", value: `desde ${formatArsPrice(BRAND_REPAIR_PRICES.samsung[2].from)}` },
      { label: "Motorola Moto G", value: `desde ${formatArsPrice(BRAND_REPAIR_PRICES.motorola[3].from)}` },
    ],
    whatsappText:
      "Hola! Quiero un presupuesto para cambio de bateria en CABA. Marca y modelo:",
    breadcrumbLabel: "Cambio de batería (CABA)",
    serviceName: "Cambio de batería en CABA",
    serviceType: "Cambio de batería / reemplazo de batería",
    serviceDescription:
      "Cambio de batería para celulares en CABA con repuestos certificados y garantía escrita de 90 días sobre trabajo y repuesto instalado.",
    highlights: [
      {
        title: "Diagnóstico primero",
        desc: "Si el celular se descarga rápido, primero medimos qué consume. No te vendemos una batería para probar a ver si era eso.",
      },
      {
        title: "Te decimos qué batería lleva",
        desc: "Según el modelo puede haber original o compatible. Te explicamos la diferencia de precio y de duración antes de elegir.",
      },
      {
        title: "Garantía escrita 90 días",
        desc: "Si la batería nueva falla dentro de los 90 días, la cambiamos. Está por escrito en la orden que te llevás.",
      },
    ],
    brandsText:
      "Trabajamos iPhone, Samsung, Motorola, Xiaomi, Huawei, OnePlus, Google Pixel y más.",
    faqs: [
      {
        q: "¿Cuánto tarda el cambio de batería?",
        a: "1 a 2 horas si reservás con una seña y el repuesto está en stock. Si no, unas 4 horas, siempre que lo traigas antes de las 13. Te confirmamos el plazo antes de abrir el equipo.",
      },
      {
        q: "¿Cuánto sale cambiar la batería del celular?",
        a: `En Samsung Galaxy A va de ${formatArsPrice(BRAND_REPAIR_PRICES.samsung[2].from)} a ${formatArsPrice(BRAND_REPAIR_PRICES.samsung[2].to)}, en Motorola Moto G de ${formatArsPrice(BRAND_REPAIR_PRICES.motorola[3].from)} a ${formatArsPrice(BRAND_REPAIR_PRICES.motorola[3].to)} y en iPhone desde ${formatArsPrice(IPHONE_BATTERY_FROM)}. El precio exacto por modelo de iPhone está en la guía de reparación de iPhone.`,
      },
      {
        q: "¿Trabajan con todas las marcas?",
        a: "Sí. Si el modelo es poco común, confirmamos disponibilidad de repuesto al cotizar.",
      },
      {
        q: "¿Qué garantía tiene el cambio de batería?",
        a: "Entregamos garantía escrita de 90 días sobre trabajo y repuesto instalado.",
      },
      {
        q: "¿Si se descarga rápido pero carga bien, igual conviene cambiarla?",
        a: "En muchos casos sí, pero primero validamos si la causa es batería degradada, software o un consumo anormal desde placa.",
      },
    ],
  },
  "cambio-pantalla-caba": {
    slug: "cambio-pantalla-caba",
    h1: "Cambio de pantalla y módulo en CABA",
    metaTitle:
      "Cambio de Pantalla y Módulo en CABA | Team Celular",
    metaDescription:
      "Cambio de pantalla en CABA en 2 a 4 horas, siempre módulo completo. iPhone 13 $249.900, Samsung Galaxy A desde $99.900. Garantía escrita de 90 días.",
    socialTitle: "Cambio de Pantalla en CABA | Team Celular",
    socialDescription:
      "Team Celular, Paraguay 2451 Recoleta. Cambio de pantalla en CABA con test completo y garantía escrita 90 días.",
    keywords: [
      "cambio de pantalla CABA",
      "cambio de modulo samsung",
      "cambio de modulo samsung a04",
      "modulo display CABA",
      "pantalla iPhone rota CABA",
      "pantalla Samsung rota CABA",
      "touch no responde celular",
    ],
    intro:
      "Cambiamos la pantalla de tu celular en 2 a 4 horas, siempre con módulo completo y garantía escrita de 90 días. Team Celular, Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano).",
    prices: [
      { label: "iPhone 13", value: formatArsPrice(IPHONE_13_SCREEN) },
      { label: "Samsung Galaxy A", value: `desde ${formatArsPrice(BRAND_REPAIR_PRICES.samsung[0].from)}` },
      { label: "Motorola Moto G", value: `desde ${formatArsPrice(BRAND_REPAIR_PRICES.motorola[0].from)}` },
    ],
    whatsappText:
      "Hola! Quiero un presupuesto para cambio de pantalla en CABA. Marca y modelo:",
    breadcrumbLabel: "Cambio de pantalla (CABA)",
    serviceName: "Cambio de pantalla en CABA",
    serviceType: "Cambio de pantalla / módulo display",
    serviceDescription:
      "Servicio de reemplazo de pantalla para celulares en CABA siempre con módulo completo y garantía escrita de 90 días.",
    highlights: [
      {
        title: "Test funcional completo",
        desc: "Antes de devolvértelo probamos brillo, touch en toda la pantalla, cámara frontal, sensor de proximidad y carga. Lo revisás vos también antes de irte.",
      },
      {
        title: "Siempre módulo completo",
        desc: "Cambiamos el módulo entero (vidrio, táctil y display). Separar solo el vidrio tiene riesgo y cuesta casi lo mismo. Te explicamos las calidades de módulo disponibles antes de elegir.",
      },
      {
        title: "Costo claro antes de abrir",
        desc: "Te pasamos precio y tiempo antes de abrirlo. Si al abrir aparece otro daño, te avisamos y decidís vos.",
      },
    ],
    brandsText:
      "Trabajamos iPhone (OLED y LCD), Samsung (AMOLED), Motorola, Xiaomi y otras marcas Android.",
    faqs: [
      {
        q: "¿Cambian solo el vidrio o el módulo completo?",
        a: "Siempre cambiamos el módulo completo. Separar solo el vidrio tiene riesgo de dañar el display o el táctil, y muchas veces cuesta casi lo mismo que el módulo entero, así que no lo hacemos.",
      },
      {
        q: "¿Se pierde Face ID o huella al cambiar pantalla?",
        a: "No debería perderse en una reparación correcta. Hacemos test completo al finalizar para confirmar que todas las funciones responden bien.",
      },
      {
        q: "¿Cuánto demora el cambio de pantalla?",
        a: "La mayoría de los casos se resuelven en el día, según modelo y disponibilidad de stock.",
      },
      {
        q: "¿La pantalla nueva tiene garantía?",
        a: "Sí, entregamos garantía escrita de 90 días sobre el módulo instalado y el trabajo realizado.",
      },
    ],
  },
  "cambio-pin-carga-caba": {
    slug: "cambio-pin-carga-caba",
    h1: "Cambio de pin de carga en CABA",
    metaTitle:
      "Cambio de Pin de Carga en CABA desde $35.000",
    metaDescription:
      "¿El celular no carga o hace falso contacto? Cambio de pin de carga de $35.000 a $150.000 según el equipo, en Paraguay 2451, Recoleta. Garantía 90 días.",
    socialTitle: "Cambio de Pin de Carga en CABA | Team Celular",
    socialDescription:
      "Team Celular, Paraguay 2451 Recoleta. Reparación de puerto de carga en CABA con diagnóstico y garantía escrita 90 días.",
    keywords: [
      "cambio pin de carga CABA",
      "celular no carga CABA",
      "puerto de carga iPhone",
      "falso contacto carga Samsung",
      "ficha de carga celular",
    ],
    intro:
      "Cambiamos el pin de carga con garantía escrita de 90 días. Antes lo revisamos con microscopio: a veces alcanza con una limpieza técnica.",
    prices: [
      { label: "Cambio de pin de carga", value: `${formatArsPrice(CHARGING_PORT_PRICE.from)} a ${formatArsPrice(CHARGING_PORT_PRICE.to)}` },
      { label: "Diagnóstico", value: "$ 15.000 a $ 25.000" },
    ],
    whatsappText:
      "Hola! Quiero un presupuesto para cambio de pin de carga en CABA. Marca y modelo:",
    breadcrumbLabel: "Cambio de pin de carga (CABA)",
    serviceName: "Cambio de pin de carga en CABA",
    serviceType: "Reparación de pin / ficha de carga",
    serviceDescription:
      "Diagnóstico y reparación de puerto de carga para celulares en CABA con garantía escrita de 90 días.",
    highlights: [
      {
        title: "Primero lo miramos con microscopio",
        desc: "Muchas veces es pelusa compactada al fondo del puerto y se resuelve con una limpieza. Si el pin está gastado o doblado, ahí sí se cambia.",
      },
      {
        title: "Pin o flex, según el modelo",
        desc: "En algunos equipos el pin va soldado a la placa y en otros viene en un flex. Te decimos cuál es el tuyo y cuánto cambia el precio.",
      },
      {
        title: "Garantía escrita 90 días",
        desc: "Cubre el pin y la soldadura por 90 días. No cubre un pin que se vuelva a romper por un golpe con el cable puesto.",
      },
    ],
    brandsText:
      "Servicio para iPhone (Lightning y USB-C), Samsung, Motorola, Xiaomi y otras marcas.",
    faqs: [
      {
        q: "¿Siempre hay que cambiar el pin cuando no carga?",
        a: "No. A veces el problema es suciedad en el puerto, un cable defectuoso o la batería. Primero hacemos diagnóstico para no hacer un gasto innecesario.",
      },
      {
        q: "¿Puedo limpiar el pin de carga en casa?",
        a: "No lo recomendamos. Con agujas, clips o cepillos es fácil doblar o romper los pines del conector, y una limpieza que se resolvía en minutos termina en un cambio de pin. Traelo y lo limpiamos con microscopio, sin forzar el puerto.",
      },
      {
        q: "¿Cuánto sale cambiar el pin de carga?",
        a: `Entre ${formatArsPrice(CHARGING_PORT_PRICE.from)} y ${formatArsPrice(CHARGING_PORT_PRICE.to)}, según el dispositivo. El diagnóstico cuesta entre ARS 15.000 y 25.000 y te confirmamos el número exacto antes de abrir el equipo.`,
      },
      {
        q: "¿Cuánto tarda reparar la carga?",
        a: "Si el repuesto está disponible, suele resolverse en el día. Te confirmamos el plazo al cotizar.",
      },
      {
        q: "¿Conviene seguir forzando el cable?",
        a: "No. Puede agravar el daño en el conector e incluso llegar a la placa. Lo ideal es revisarlo cuanto antes.",
      },
      {
        q: "¿Dan garantía por esta reparación?",
        a: "Sí, garantía escrita de 90 días sobre trabajo y repuesto instalado.",
      },
    ],
  },
  "reparacion-placa-caba": {
    slug: "reparacion-placa-caba",
    h1: "Reparación de placa en CABA",
    metaTitle:
      "Reparación de Placa en CABA | Microsoldadura | Team Celular",
    metaDescription:
      "¿No enciende, se mojó o está en corto? Reparamos la placa con microsoldadura bajo microscopio en Paraguay 2451, Recoleta. Garantía 90 días.",
    socialTitle: "Reparación de Placa en CABA | Team Celular",
    socialDescription:
      "Team Celular, Paraguay 2451 Recoleta. Microelectrónica y reparación de placa en CABA con diagnóstico de laboratorio.",
    keywords: [
      "reparacion de placa celular CABA",
      "microsoldadura CABA",
      "celular no enciende reparacion",
      "reparacion celular mojado",
      "service microelectronica",
    ],
    intro:
      "Si tu celular no prende, se reinicia solo o quedó en corto después de mojarse, el problema casi siempre está en la placa. En Team Celular la revisamos bajo microscopio y te decimos si tiene arreglo antes de cotizar; si ya te dijeron que no tenía, traelo igual para una segunda opinión.",
    whatsappText:
      "Hola! Quiero un presupuesto para reparacion de placa en CABA. Marca y modelo:",
    breadcrumbLabel: "Reparación de placa (CABA)",
    serviceName: "Reparación de placa en CABA",
    serviceType: "Microelectrónica / reparación de placa",
    serviceDescription:
      "Servicio de microelectrónica para reparación de placa de celulares en CABA con diagnóstico bajo microscopio y garantía escrita.",
    highlights: [
      {
        title: "Diagnóstico de laboratorio",
        desc: "Medimos consumo y líneas de alimentación y miramos la placa con microscopio para encontrar el componente que falla.",
      },
      {
        title: "Los casos que otros descartan",
        desc: "No enciende, mojado, reinicios en loop o corto. Son el trabajo diario del laboratorio, incluido el reballing de chips.",
      },
      {
        title: "Si no conviene, te lo decimos",
        desc: "Hay placas que se arreglan y otras que no valen la pena. Te pasamos costo y plazo antes de tocar nada, y si no conviene reparar, te lo decimos de frente.",
      },
    ],
    brandsText:
      "Trabajamos placas de iPhone y Android según estado del equipo y disponibilidad técnica.",
    faqs: [
      {
        q: "¿Todos los equipos con falla de placa tienen arreglo?",
        a: "No siempre. Primero validamos si la reparación es técnicamente viable y si el costo tiene sentido frente al valor del equipo.",
      },
      {
        q: "¿Cuánto tarda una reparación de placa?",
        a: "Suele requerir más tiempo que una reparación simple. Te pasamos el plazo estimado luego del diagnóstico inicial.",
      },
      {
        q: "¿Reparan equipos mojados?",
        a: "Sí, siempre que se intervenga rápido. Cuanto antes llegue el equipo al taller, mejor el pronóstico de recuperación.",
      },
      {
        q: "¿Dan garantía en microelectrónica?",
        a: "Sí, con alcance y plazo por escrito según el caso técnico específico realizado.",
      },
    ],
  },
  "cambio-flex-caba": {
    slug: "cambio-flex-caba",
    h1: "Cambio de flex en CABA",
    metaTitle:
      "Cambio de Flex en CABA | Carga y Botones | Team Celular",
    metaDescription:
      "Cambio de flex en CABA — Team Celular, Paraguay 2451 Recoleta. Carga, botón power, volumen y cámara con diagnóstico preciso y garantía escrita 90 días.",
    socialTitle: "Cambio de Flex en CABA | Team Celular",
    socialDescription:
      "Team Celular, Paraguay 2451 Recoleta. Reemplazo de flex en CABA con diagnóstico preciso y garantía escrita 90 días.",
    keywords: [
      "cambio flex celular CABA",
      "flex de carga iPhone",
      "boton power no funciona",
      "volumen celular no funciona",
      "reparacion flex CABA",
    ],
    intro:
      "Si el botón de encendido no responde, el volumen se traba o la carga anda a medias, lo más probable es un flex cortado. Lo cambiamos con garantía escrita de 90 días, pero antes probamos que no sea el conector, la placa o un tema de software.",
    whatsappText:
      "Hola! Quiero un presupuesto para cambio de flex en CABA. Marca y modelo:",
    breadcrumbLabel: "Cambio de flex (CABA)",
    serviceName: "Cambio de flex en CABA",
    serviceType: "Reemplazo de flex de carga, botones y módulos internos",
    serviceDescription:
      "Servicio de reemplazo de flex internos en celulares para clientes de CABA con diagnóstico previo y garantía escrita 90 días.",
    highlights: [
      {
        title: "Revisión por síntoma",
        desc: "Un botón que no anda puede ser el flex, el conector o la placa. Lo medimos antes de pasarte un precio.",
      },
      {
        title: "Repuesto correcto",
        desc: "Cada modelo tiene su flex de encendido, volumen o carga. Pedimos el que corresponde al código exacto de tu equipo.",
      },
      {
        title: "Entrega probada",
        desc: "Probamos todos los botones, la carga y la vibración con vos adelante antes de devolvértelo.",
      },
    ],
    brandsText:
      "Servicio disponible para iPhone, Samsung, Motorola, Xiaomi y otras líneas compatibles.",
    faqs: [
      {
        q: "¿Qué es un flex en un celular?",
        a: "Es un conector interno flexible que vincula componentes como botones, carga, cámaras o el módulo de pantalla con la placa principal.",
      },
      {
        q: "¿Siempre se cambia completo?",
        a: "Depende del daño. Se reemplaza la pieza necesaria según lo que muestre el diagnóstico técnico.",
      },
      {
        q: "¿Cuánto tarda el cambio de flex?",
        a: "Con repuesto en stock, suele resolverse en el día. Te confirmamos el plazo al cotizar.",
      },
      {
        q: "¿Tiene garantía?",
        a: "Sí, cada trabajo se entrega con garantía escrita de 90 días sobre trabajo y repuesto.",
      },
    ],
  },
  "cambio-tapa-caba": {
    slug: "cambio-tapa-caba",
    h1: "Cambio de tapa trasera en CABA",
    metaTitle:
      "Cambio de Tapa Trasera en CABA | Terminación Prolija",
    metaDescription:
      "Vidrio trasero roto o tapa dañada: cambio de tapa trasera en Paraguay 2451, Recoleta (CABA), con terminación prolija y garantía escrita 90 días.",
    socialTitle: "Cambio de Tapa Trasera en CABA | Team Celular",
    socialDescription:
      "Team Celular, Paraguay 2451 Recoleta. Reemplazo de tapa trasera en CABA con terminación prolija y garantía escrita 90 días.",
    keywords: [
      "cambio tapa trasera CABA",
      "vidrio trasero iPhone roto",
      "tapa trasera Samsung rota",
      "reparacion tapa celular",
      "cambio glass trasero",
    ],
    intro:
      "Cambiamos la tapa trasera rota o levantada con adhesivo nuevo y garantía escrita de 90 días. Si la tapa se levantó sola, primero revisamos la batería: suele ser una batería hinchada empujando desde adentro.",
    whatsappText:
      "Hola! Quiero un presupuesto para cambio de tapa trasera en CABA. Marca y modelo:",
    breadcrumbLabel: "Cambio de tapa trasera (CABA)",
    serviceName: "Cambio de tapa trasera en CABA",
    serviceType: "Reemplazo de tapa trasera / glass posterior",
    serviceDescription:
      "Servicio de reemplazo de tapa trasera para celulares en CABA con terminación prolija y garantía escrita 90 días.",
    highlights: [
      {
        title: "Adhesivo nuevo",
        desc: "Sacamos todo el pegamento viejo y ponemos adhesivo nuevo para que la tapa quede firme y sin luz en los bordes.",
      },
      {
        title: "Compatibilidad exacta",
        desc: "Pedimos la tapa por el código exacto del modelo, con el recorte de cámara y el color que corresponden.",
      },
      {
        title: "Presupuesto claro",
        desc: "Te pasamos precio y plazo antes de empezar, y lo que te dijimos es lo que pagás al retirarlo.",
      },
    ],
    brandsText:
      "Trabajamos iPhone, Samsung y otras marcas según disponibilidad de tapa compatible.",
    faqs: [
      {
        q: "¿Cambian solo la tapa o también el marco?",
        a: "Depende del daño y del modelo. Te indicamos la mejor opción según el estado real del equipo.",
      },
      {
        q: "¿Cuánto demora este arreglo?",
        a: "Normalmente en el día, sujeto a modelo y disponibilidad de stock.",
      },
      {
        q: "¿El teléfono queda como nuevo?",
        a: "La terminación queda prolija. Siempre explicamos el alcance real antes de reparar para no generar expectativas incorrectas.",
      },
      {
        q: "¿Dan garantía por el cambio de tapa?",
        a: "Sí, garantía escrita de 90 días sobre el trabajo y el repuesto instalado.",
      },
    ],
  },
  "cambio-camara-caba": {
    slug: "cambio-camara-caba",
    h1: "Cambio de cámara en CABA",
    metaTitle:
      "Cambio de Cámara en CABA | Frontal y Trasera | Team Celular",
    metaDescription:
      "Cambio de cámara en CABA — Team Celular, Paraguay 2451 Recoleta. Cámara borrosa, sin enfoque o sin imagen. Frontal y trasera con garantía escrita 90 días.",
    socialTitle: "Cambio de Cámara en CABA | Team Celular",
    socialDescription:
      "Team Celular, Paraguay 2451 Recoleta. Reparación y reemplazo de cámara frontal y trasera en CABA con garantía escrita 90 días.",
    keywords: [
      "cambio camara celular CABA",
      "camara celular borrosa",
      "camara frontal no funciona",
      "reparacion camara iPhone CABA",
      "reparacion camara Samsung CABA",
    ],
    intro:
      "Si la cámara saca fotos borrosas, no enfoca, vibra o queda en negro, la cambiamos con garantía escrita de 90 días. Antes revisamos si es el módulo, el flex o solo el vidrio del lente, para no cambiar piezas de más.",
    whatsappText:
      "Hola! Quiero un presupuesto para cambio de camara en CABA. Marca y modelo:",
    breadcrumbLabel: "Cambio de cámara (CABA)",
    serviceName: "Cambio de cámara en CABA",
    serviceType: "Reemplazo de cámara frontal y trasera",
    serviceDescription:
      "Servicio de reparación y reemplazo de cámara frontal o trasera para celulares en CABA con garantía escrita 90 días.",
    highlights: [
      {
        title: "Diagnóstico por síntoma",
        desc: "Una cámara en negro puede ser el módulo, el conector o la placa. Lo confirmamos antes de pasarte un precio.",
      },
      {
        title: "El módulo de tu modelo",
        desc: "Pedimos la cámara por el código exacto del equipo para que el enfoque y la estabilización funcionen como antes.",
      },
      {
        title: "Pruebas completas",
        desc: "Sacamos fotos y video con todas las cámaras, de cerca y de lejos, antes de devolvértelo.",
      },
    ],
    brandsText:
      "Trabajamos cámaras de iPhone, Samsung, Motorola, Xiaomi y otras marcas según disponibilidad.",
    faqs: [
      {
        q: "¿La cámara borrosa siempre se cambia?",
        a: "No siempre. A veces hay suciedad interna o un problema de software. Primero hacemos diagnóstico para no hacer un gasto innecesario.",
      },
      {
        q: "¿Si no funciona la cámara frontal, puede ser el flex?",
        a: "Sí. En varios modelos la cámara frontal comparte flex con otros sensores y se revisa todo el conjunto antes de definir la reparación.",
      },
      {
        q: "¿Cuánto tarda el cambio de cámara?",
        a: "Con repuesto en stock, la mayoría de los casos se resuelve en el día.",
      },
      {
        q: "¿Tiene garantía por escrito?",
        a: "Sí, cada trabajo se entrega con garantía escrita de 90 días sobre el módulo y el trabajo realizado.",
      },
    ],
  },
  "reparacion-audio-celular-caba": {
    slug: "reparacion-audio-celular-caba",
    h1: "Reparación de audio de celular en CABA",
    metaTitle:
      "Audio de Celular en CABA: Micrófono, Parlante y Auricular",
    metaDescription:
      "Micrófono, parlante o auricular sin sonido: reparación de audio de celulares en Paraguay 2451, Recoleta (CABA). Garantía escrita 90 días.",
    socialTitle: "Reparación de Audio de Celular en CABA | Team Celular",
    socialDescription:
      "Team Celular, Paraguay 2451 Recoleta. Micrófono, parlante y auricular de celular revisados bajo microscopio, con garantía escrita de 90 días.",
    keywords: [
      "reparacion audio celular CABA",
      "microfono celular no funciona",
      "parlante celular no se escucha",
      "auricular iPhone sin sonido",
      "service audio celular recoleta",
    ],
    intro:
      "Si no te escuchan en las llamadas, el parlante suena bajo o el audio sale con ruido, lo reparamos con garantía escrita de 90 días. Muchas veces es suciedad en la rejilla y se resuelve con una limpieza; otras, el flex o el módulo.",
    whatsappText:
      "Hola! Quiero un presupuesto para reparacion de audio de celular en CABA. Marca y modelo:",
    breadcrumbLabel: "Reparación de audio (CABA)",
    serviceName: "Reparación de audio de celular en CABA",
    serviceType: "Reparación de micrófono, parlante y auricular",
    serviceDescription:
      "Servicio técnico para resolver fallas de audio en celulares en CABA con diagnóstico preciso y garantía escrita 90 días.",
    highlights: [
      {
        title: "Primero descartamos lo simple",
        desc: "Revisamos la rejilla, el flex y el módulo antes de hablar de placa. Lo más barato se prueba primero.",
      },
      {
        title: "Lo probamos con una llamada",
        desc: "Hacemos una llamada real, grabamos un audio de WhatsApp y probamos el altavoz antes de devolvértelo.",
      },
      {
        title: "Solo lo que falla",
        desc: "Si es el micrófono, cambiamos el micrófono. No te cobramos el módulo entero si no hace falta.",
      },
    ],
    brandsText:
      "Atendemos iPhone y Android, incluyendo Samsung, Motorola y Xiaomi, según falla y repuesto disponible.",
    faqs: [
      {
        q: "¿Si no me escuchan en llamadas, siempre es el micrófono roto?",
        a: "No siempre. Puede ser una obstrucción por suciedad, humedad, un flex dañado o incluso un problema de software. Primero hacemos diagnóstico.",
      },
      {
        q: "¿El parlante distorsionado se puede reparar?",
        a: "Sí, en muchos casos se resuelve con limpieza técnica o reemplazo del módulo de audio.",
      },
      {
        q: "¿Cuánto tarda una reparación de audio?",
        a: "Con repuesto disponible, suele resolverse dentro del día hábil.",
      },
      {
        q: "¿Qué garantía tiene?",
        a: "Se entrega garantía escrita de 90 días sobre el componente reparado y el trabajo realizado.",
      },
    ],
  },
  "recuperacion-celular-mojado-caba": {
    slug: "recuperacion-celular-mojado-caba",
    h1: "Recuperación de celular mojado en CABA",
    metaTitle:
      "Recuperación de Celular Mojado en CABA | Daño por Líquidos",
    metaDescription:
      "¿Se mojó el celular? No lo cargues. En Paraguay 2451, Recoleta (CABA), hacemos limpieza técnica, secado controlado y diagnóstico de placa.",
    socialTitle: "Recuperación de Celular Mojado en CABA | Team Celular",
    socialDescription:
      "Team Celular, Paraguay 2451 Recoleta. Servicio urgente para daño por líquidos con limpieza técnica y diagnóstico de laboratorio.",
    keywords: [
      "celular mojado reparacion CABA",
      "reparacion dano por liquidos",
      "celular se mojo no enciende",
      "limpieza placa celular mojado",
      "microelectronica celular mojado",
    ],
    intro:
      "Si se te mojó el celular, apagalo, no lo cargues y traelo cuanto antes: la corrosión avanza aunque el equipo parezca andar. Lo abrimos, limpiamos la placa en laboratorio y te decimos si se puede recuperar el equipo o al menos los datos.",
    whatsappText:
      "Hola! Quiero un presupuesto para recuperacion de celular mojado en CABA. Marca y modelo:",
    breadcrumbLabel: "Celular mojado (CABA)",
    serviceName: "Recuperación de celular mojado en CABA",
    serviceType: "Recuperación por daño de líquidos y humedad",
    serviceDescription:
      "Servicio técnico urgente para recuperación de celulares con daño por líquidos en CABA con diagnóstico de laboratorio.",
    highlights: [
      {
        title: "Pasa adelante en la fila",
        desc: "Un celular mojado no espera turno. Cuanto antes se abre, menos corrosión hay que limpiar.",
      },
      {
        title: "Limpieza de la placa",
        desc: "Desarmamos el equipo y limpiamos la placa y los conectores. El arroz no saca el agua de adentro: solo hace perder tiempo.",
      },
      {
        title: "Te decimos qué se puede salvar",
        desc: "Después de la limpieza sabemos si vuelve a andar, si hay que reparar placa o si conviene rescatar fotos y contactos.",
      },
    ],
    brandsText:
      "Trabajamos iPhone y Android con protocolos de microelectrónica según nivel de daño por líquido.",
    faqs: [
      {
        q: "¿Sirve poner el celular en arroz?",
        a: "No es un método confiable. El arroz no elimina la corrosión interna y puede demorar la intervención técnica, que es lo que realmente importa.",
      },
      {
        q: "¿Si prende después de mojarse, igual hay que revisarlo?",
        a: "Sí. Muchos equipos vuelven a fallar por corrosión progresiva aunque enciendan al principio. Lo recomendable es revisarlo cuanto antes.",
      },
      {
        q: "¿Cuánto tarda el diagnóstico de un celular mojado?",
        a: "El diagnóstico inicial se realiza en el mismo día hábil para definir viabilidad técnica y pasarte un presupuesto concreto.",
      },
      {
        q: "¿Tiene garantía?",
        a: "Sí, se entrega garantía escrita cuyo alcance depende del estado inicial del equipo y el trabajo realizado; se detalla antes de avanzar.",
      },
    ],
  },
};

import type { Metadata } from "next";
import type {
  GuideFaqItem,
  GuideItem,
  GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { businessId } from "@/lib/businessProfile";
import { PLACA_REVISION_PRICE, formatArsPrice } from "@/lib/repairPrices";
import { INSTALLMENTS_MESSAGE, MULTIBRAND_WARRANTY_MESSAGE, SCREEN_BATTERY_TIMING_MESSAGE } from "@/lib/copyStandards";
import { BRAND_CHARGED_PRICES } from "@/lib/modelScreenPrices";
import type { BrandWorkshop } from "@/components/seo/BrandWorkshopNotes";
import { WORKSHOP_PERIOD } from "@/lib/workshopStats";

const SITE_URL = getSiteUrl();

const TCL_SCREENS = BRAND_CHARGED_PRICES.tcl.filter((row) => row.service === "pantalla").map((row) => row.from);
const TCL_SCREEN_FROM = formatArsPrice(Math.min(...TCL_SCREENS));
const TCL_SCREEN_TO = formatArsPrice(Math.max(...TCL_SCREENS));

// Bloque "Desde el taller": cifras de órdenes de celulares en Fixbee y datos que dio el negocio el 25/11/2026.
const WORKSHOP_TEAM = "Nuestro equipo de técnicos, liderado por Alejandro Biarrieta,";
// Reballing del procesador en POCO X3 Pro: precio informado por el negocio.
const POCO_X3_PRO_REBALLING_PRICE = 398000;

const REVISED_DIAGNOSIS = {
  modifiedTime: "2026-10-15T00:00:00Z",
  heroPointsOverride: [
    "Plazo de revisión según la falla; placa: informe hasta 72 horas hábiles.",
    "Cobertura informada en el presupuesto.",
    "Opiniones de clientes en Google de la sucursal Recoleta.",
  ],
  diagnosisAnswerOverride:
    `El plazo depende de la falla. La revisión técnica sin placa cuesta entre $15.000 y $25.000; confirmamos costo y plazo antes de abrir el equipo. La revisión de placa cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles. Se cobra aunque no se repare y se descuenta del total si aceptás el arreglo. La reparación de placa lleva semanas, con precio y plazo por escrito antes de empezar. Pantalla, batería y puerto dependen del modelo y del repuesto disponible.`,
};

export type BrandGuideSlug =
  | "reparacion-google-pixel-buenos-aires"
  | "reparacion-honor-buenos-aires"
  | "reparacion-poco-buenos-aires"
  | "reparacion-oppo-buenos-aires"
  | "reparacion-infinix-buenos-aires"
  | "reparacion-zte-buenos-aires"
  | "reparacion-tecno-buenos-aires"
  | "reparacion-alcatel-buenos-aires"
  | "reparacion-asus-buenos-aires"
  | "reparacion-oneplus-buenos-aires"
  | "reparacion-huawei-buenos-aires"
  | "reparacion-tcl-buenos-aires";

type BrandGuideSeed = {
  slug: BrandGuideSlug;
  brand: string;
  badge: string;
  imagePath: string;
  models: string[];
  modifiedTime?: string;
  specialtyFocus: string;
  knownWeakPoints: [string, string, string];
  /** <title> propio: el H1 sale de titleOverride. */
  seoTitleOverride?: string;
  serviceHref: string;
  siblingHref: string;
  siblingLabel: string;
  keywords: string[];
  /**
   * Overrides opcionales. Solo las marcas con oportunidad real segun GSC y
   * analisis de SERP llevan texto propio; el resto usa el template generado.
   */
  titleOverride?: string;
  heroDescriptionOverride?: string;
  metaDescriptionOverride?: string;
  /**
   * Rangos de precio por reparacion. Solo se cargan cuando el negocio los
   * confirmo: sin datos reales no se emite Service schema, porque un precio
   * inventado en structured data es peor que no tenerlo.
   */
  repairPrices?: { name: string; from: number; to: number }[];
  extraFaq?: GuideFaqItem[];
  diagnosisAnswerOverride?: string;
  heroPointsOverride?: string[];
  extraRelatedLinks?: GuideRelatedLink[];
  /** Solo las marcas con órdenes suficientes para contar algo propio. */
  workshop?: BrandWorkshop;
};

export type BrandGuideConfig = {
  slug: BrandGuideSlug;
  brand: string;
  /** JSON-LD de Service con rangos de precio. null cuando no hay precios cargados. */
  serviceJsonLd: Record<string, unknown> | null;
  pagePath: string;
  pageLabel: string;
  title: string;
  heroDescription: string;
  badge: string;
  readingTime: string;
  publishedTime: string;
  modifiedTime: string;
  imagePath: string;
  articleAbout: string[];
  heroPoints: string[];
  symptomsTitle: string;
  symptomsDescription: string;
  symptoms: GuideItem[];
  diagnosisTitle: string;
  diagnosisDescription: string;
  diagnostics: GuideItem[];
  planTitle: string;
  planDescription: string;
  planSteps: GuideItem[];
  faq: GuideFaqItem[];
  relatedLinks: GuideRelatedLink[];
  whatsappText: string;
  repairPrices: BrandGuideSeed["repairPrices"];
  workshop?: BrandWorkshop;
  metadata: Metadata;
};

const BRAND_GUIDE_SEEDS: BrandGuideSeed[] = [
  {
    slug: "reparacion-google-pixel-buenos-aires",
    ...REVISED_DIAGNOSIS,
    titleOverride: "Reparación de Google Pixel en Buenos Aires",
    workshop: {
      period: WORKSHOP_PERIOD,
      stats: [
        { value: "41", label: "Google Pixel recibidos" },
        { value: "17", label: "cambios de batería" },
        { value: "9", label: "cambios de pantalla" },
      ],
      intro: `${WORKSHOP_TEAM} es de los pocos de CABA que trabaja Google Pixel. Lo que más entra son Pixel 6, 7, 7a y 7 Pro, sobre todo por batería y pantalla.`,
      notes: [
        {
          title: "Te avisamos antes de abrirlo",
          description:
            "En la mayoría de los Pixel hay que levantar la pantalla para llegar a la batería, y en ese paso la pantalla puede dañarse. Te lo decimos antes de empezar. El Pixel 7a es la excepción.",
        },
        {
          title: "La pantalla llega en el día",
          description:
            "El repuesto de pantalla está en stock en nuestro depósito, no en el local. Lo traemos el mismo día en que confirmás el arreglo.",
        },
        {
          title: "La batería es lo que más cambiamos",
          description:
            "17 de los 41 Pixel que entraron fueron por batería. Medimos el consumo antes de cambiarla, para no cobrarte una batería si la falla está en otro lado.",
        },
      ],
      photo: {
        src: "/images/taller/pixel-6-pro-cambio-bateria.webp",
        alt: "Google Pixel 6 Pro abierto en la mesa del taller, con la pantalla levantada y la batería vieja retirada",
        caption: "Cambio de batería de un Pixel 6 Pro en nuestro taller: la pantalla va levantada y la batería vieja ya está afuera.",
        width: 1200,
        height: 1296,
      },
    },
    metaDescriptionOverride:
      "Pantalla de Google Pixel desde $360.000 y batería desde $125.000 en CABA. Plazo según modelo y stock.",
    repairPrices: [
      { name: "Cambio de pantalla", from: 360000, to: 590000 },
      // Piso: batería de Pixel 7a cobrada en noviembre de 2026 (modelScreenPrices.ts).
      { name: "Cambio de bateria", from: 125000, to: 200000 },
    ],
    heroDescriptionOverride:
      `Team Celular repara Google Pixel en CABA, en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. El cambio de pantalla va de ARS 360.000 a 590.000 y el de batería de ARS 125.000 a 200.000, según el modelo: cubrimos desde Pixel 6 y 6a hasta Pixel 10 Pro, incluidas las variantes Pro y Pro XL. ${SCREEN_BATTERY_TIMING_MESSAGE} Si la falla requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)} y el informe se entrega en hasta 72 horas hábiles. El arreglo de placa lleva semanas; confirmamos precio y plazo por escrito antes de empezar. Podés pagar en 3 cuotas sin interés.`,
    extraFaq: [
      {
        question: "¿Se puede dañar la pantalla al cambiar la batería de un Google Pixel?",
        answer:
          "Puede pasar. En la mayoría de los Pixel hay que levantar la pantalla para llegar a la batería, y en ese paso la pantalla puede dañarse; te lo avisamos antes de empezar. El Pixel 7a es la excepción. Si hay que cambiar la pantalla, el repuesto está en nuestro depósito y llega a la sede el mismo día.",
      },
      {
        question: "¿Google tiene servicio técnico de Pixel en Argentina?",
        answer:
          "Google no opera un centro de reparación propio en Argentina: su soporte deriva a socios autorizados. Como además la mayoría de los Pixel entran al país por importación, la garantía de fábrica suele no aplicar localmente.",
      },
      {
        question: "¿Reparan un Pixel comprado en el exterior?",
        answer:
          "Sí. El origen del equipo no cambia el trabajo técnico. Lo que sí cambia es la disponibilidad del repuesto según el modelo, y eso lo confirmamos antes de que lo dejes.",
      },
    ],
    brand: "Google Pixel",
    badge: "Android premium",
    imagePath: "/images/google-pixel-9-hero.webp",
    models: [
      "Pixel 10 Pro",
      "Pixel 10",
      "Pixel 9 Pro XL",
      "Pixel 9 Pro",
      "Pixel 9",
      "Pixel 8 Pro",
      "Pixel 8",
      "Pixel 8a",
      "Pixel 7 Pro",
      "Pixel 7",
      "Pixel 7a",
      "Pixel 6 Pro",
      "Pixel 6",
      "Pixel 6a",
    ],
    specialtyFocus:
      "enfoque de camara computacional, pantalla OLED y estabilidad de carga USB-C",
    knownWeakPoints: [
      "pantalla OLED con líneas o toque fantasma",
      "módulo de cámara con enfoque irregular",
      "desgaste en conector USB-C por uso diario",
    ],
    serviceHref: "/reparaciones/cambio-pantalla-caba",
    siblingHref: "/guias/reparacion-samsung-buenos-aires",
    siblingLabel: "Guia hermana: Samsung",
    keywords: [
      "reparacion google pixel",
      "donde reparar google pixel",
      "pixel servicio tecnico",
      "cambio de pantalla pixel precio",
      "reparacion pixel 8 pro",
      "reparacion pixel 9 pro",
      "service pixel caba",
      "tecnico pixel buenos aires",
    ],
  },
  {
    slug: "reparacion-honor-buenos-aires",
    ...REVISED_DIAGNOSIS,
    metaDescriptionOverride:
      "Reparación de Honor Magic y X en Recoleta y Belgrano, CABA. Diagnóstico y plazo según la falla, con presupuesto.",
    titleOverride:
      "Reparacion de Honor en Buenos Aires: alternativa presencial al canal oficial",
    heroDescriptionOverride:
      `Team Celular repara Honor en CABA con atención presencial: somos un taller independiente de microelectrónica en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. Revisamos pantalla, batería y módulo de carga de las líneas Magic y X; confirmamos disponibilidad del repuesto y plazo para tu modelo antes de que dejes el equipo. Si requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles. La reparación de placa lleva semanas, con precio y plazo por escrito antes de empezar. Podés pagar en 3 cuotas sin interés. Si buscás cobertura de fábrica, consultá primero el canal de soporte de Honor.`,
    extraFaq: [
      {
        question: "Que diferencia hay entre el canal de Honor y Team Celular?",
        answer:
          "Team Celular es un taller independiente con atención presencial en Recoleta y Belgrano. La revisión depende de la falla: si requiere placa, el informe se entrega en hasta 72 horas hábiles y el arreglo lleva semanas. Confirmamos precio y plazo por escrito. Para garantía de fábrica, consultá primero las condiciones y los canales de soporte de Honor.",
      },
      {
        question: "Conviene el canal oficial de Honor o un taller independiente?",
        answer:
          "Si el equipo tiene garantía de fábrica, consultá primero el canal oficial y sus condiciones antes de autorizar una intervención. Fuera de garantía, compará presupuesto, disponibilidad de repuesto y plazo para la falla concreta. En Team Celular te informamos esas condiciones antes de reparar; una falla de placa requiere revisión y un presupuesto separado.",
      },
    ],
    brand: "Honor",
    badge: "Android",
    imagePath: "/images/dispositivoshdpro.webp",
    models: ["Honor Magic6 Pro", "Honor 200", "Honor X8", "Honor X7"],
    specialtyFocus:
      "paneles AMOLED, baterias de alta densidad y modulos de carga rapida",
    knownWeakPoints: [
      "pantalla golpeada con pérdida de brillo",
      "autonomía irregular en uso intenso",
      "carga inestable por desgaste del puerto",
    ],
    serviceHref: "/reparaciones/cambio-bateria-caba",
    siblingHref: "/guias/reparacion-xiaomi-buenos-aires",
    siblingLabel: "Guia hermana: Xiaomi",
    keywords: ["reparacion honor", "service honor caba", "tecnico honor recoleta"],
  },
  {
    slug: "reparacion-poco-buenos-aires",
    modifiedTime: "2026-10-15T00:00:00Z",
    titleOverride: "Reparación de POCO en Buenos Aires: temperatura, batería y carga",
    workshop: {
      period: WORKSHOP_PERIOD,
      stats: [
        { value: "22", label: "POCO que entraron al taller" },
        { value: "4", label: "fueron POCO X3 Pro" },
      ],
      intro: `${WORKSHOP_TEAM} recibe POCO sobre todo por fallas de placa. El caso que más se repite es el POCO X3 Pro.`,
      notes: [
        {
          title: "POCO X3 Pro: reballing del procesador",
          description:
            `En el X3 Pro la falla casi siempre es la misma: hay que hacer reballing del procesador y la memoria en la placa. Lo hacemos nosotros, en nuestro taller, y cuesta ${formatArsPrice(POCO_X3_PRO_REBALLING_PRICE)}.`,
        },
        {
          title: "Primero, la revisión de placa",
          description:
            `La revisión de placa cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, se cobra aunque no se repare y se descuenta si se repara. El arreglo de placa lleva semanas: precio y plazo van por escrito antes de empezar.`,
        },
        {
          title: "Batería, carga y pantalla",
          description:
            "También cambiamos batería, pin de carga y pantalla de POCO. El precio depende del modelo y lo confirmás antes de que reparemos.",
        },
      ],
    },
    metaDescriptionOverride:
      "POCO F6 Pro, F6, X6 Pro y M6 Pro: sobrecalentamiento, batería exigida y pin de carga gastado. Reparación en CABA.",
    heroDescriptionOverride:
      `Team Celular repara POCO en CABA, en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. En F6 Pro, F6, X6 Pro y M6 Pro revisamos sobrecalentamiento, pérdida de autonomía y carga intermitente. Medimos temperatura y consumo y probamos cable, cargador y puerto antes de cotizar una batería o un conector. Si requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles; la reparación lleva semanas, con precio y plazo por escrito antes de empezar. Para pantalla, batería y carga confirmamos repuesto y plazo según el modelo. Podés pagar en 3 cuotas sin interés.`,
    extraFaq: [
      {
        question: "¿Hacen reballing del procesador en el POCO X3 Pro?",
        answer:
          `Sí. Es la reparación de placa que más hacemos en POCO X3 Pro: la hacemos en nuestro taller y cuesta ${formatArsPrice(POCO_X3_PRO_REBALLING_PRICE)}. Antes va la revisión de placa, que cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, se cobra aunque no se repare y se descuenta si se repara. El arreglo de placa lleva semanas, con precio y plazo por escrito antes de empezar.`,
      },
      {
        question: "¿Es normal que mi POCO caliente tanto?",
        answer:
          "Algo de calor en uso exigente es esperable por el tipo de procesador. Lo que no es normal es que caliente en uso liviano o que se apague: ahí hay algo que medir, y suele estar en la gestión de energía.",
      },
      {
        question: "¿El sobrecalentamiento arruina la batería?",
        answer:
          "El calor sostenido puede acelerar el desgaste de la batería, pero no identifica por sí solo la causa de la falla. Revisamos el estado de la batería y medimos consumo y temperatura antes de cotizar; el presupuesto depende de lo que encontremos.",
      },
    ],
    brand: "POCO",
    badge: "Gaming y rendimiento",
    imagePath: "/opengraph-image.png",
    models: ["POCO F6 Pro", "POCO F6", "POCO X6 Pro", "POCO M6 Pro", "POCO X3 Pro"],
    specialtyFocus:
      "equipos de alto rendimiento con foco en temperatura, bateria y carga",
    knownWeakPoints: [
      "sobrecalentamiento en sesiones largas",
      "degradación de batería por uso exigente",
      "falla de carga rápida por desgaste de pin",
    ],
    serviceHref: "/reparaciones/cambio-pin-carga-caba",
    siblingHref: "/guias/reparacion-xiaomi-buenos-aires",
    siblingLabel: "Guia hermana: Xiaomi/Redmi",
    keywords: ["reparacion poco", "service poco caba", "reparar poco f6"],
  },
  {
    slug: "reparacion-oppo-buenos-aires",
    seoTitleOverride: "Servicio técnico OPPO en CABA: Reno y A | Team Celular",
    modifiedTime: "2026-10-15T00:00:00Z",
    titleOverride: "Reparacion de OPPO en Buenos Aires: Reno y serie A",
    metaDescriptionOverride:
      "OPPO Reno12, Reno11, A79 y A58: touch inestable, poca autonomía y puerto de carga gastado. Reparación en CABA.",
    heroDescriptionOverride:
      `Team Celular repara OPPO en CABA, en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. En Reno y serie A, un touch que no responde puede requerir revisar el flex y su conector antes de cambiar la pantalla. También medimos batería y consumo cuando la autonomía cae, y probamos cable, cargador y puerto si la carga es inestable. ${SCREEN_BATTERY_TIMING_MESSAGE} Si la falla requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles. La reparación de placa lleva semanas, con precio y plazo por escrito antes de empezar. Podés pagar en 3 cuotas sin interés.`,
    extraFaq: [
      {
        question: "El touch de mi OPPO falla pero la pantalla no esta rota",
        answer:
          "Antes de cotizar un módulo revisamos el flex y su conector. Si la falla está en esa conexión, puede resolverse sin cambiar la pantalla. Si el panel está dañado o la falla viene del circuito de la placa, te explicamos qué trabajo corresponde y su presupuesto antes de reparar.",
      },
      {
        question: "Cuanto tarda un cambio de pantalla en un OPPO Reno?",
        answer:
          "Entre 2 y 4 horas cuando tenemos el modulo en stock. Si hay que pedirlo, te confirmamos el plazo antes de que dejes el equipo.",
      },
    ],
    brand: "OPPO",
    badge: "Android",
    imagePath: "/opengraph-image.png",
    models: ["OPPO Reno12", "OPPO Reno11", "OPPO A79", "OPPO A58"],
    specialtyFocus:
      "linea Reno y A con foco en pantalla, bateria y tecnologia de carga rapida",
    knownWeakPoints: [
      "módulo de pantalla con touch inestable",
      "batería con baja autonomía al final del día",
      "degradación del puerto de carga",
    ],
    serviceHref: "/reparaciones/cambio-pantalla-caba",
    siblingHref: "/guias/reparacion-pantalla-celular",
    siblingLabel: "Guia hermana: Pantallas",
    keywords: ["reparacion oppo", "service oppo caba", "tecnico oppo buenos aires"],
  },
  {
    slug: "reparacion-infinix-buenos-aires",
    ...REVISED_DIAGNOSIS,
    seoTitleOverride: "Servicio técnico Infinix en CABA | Team Celular",
    metaDescriptionOverride:
      "Reparación de Infinix Note, Hot y Zero en Recoleta y Belgrano. Plazo según falla y repuesto disponible.",
    titleOverride:
      "Reparacion de Infinix en Buenos Aires: donde arreglarlo sin red oficial",
    heroDescriptionOverride:
      `Team Celular es un taller independiente de microelectrónica en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), CABA. Revisamos pantalla, batería y pin de carga de las líneas Infinix Note, Hot y Zero, además de equipos mojados o que no encienden. La revisión técnica sin placa cuesta entre ARS 15.000 y 25.000. Si requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles: se cobra aunque no se repare y se descuenta del total si aceptás el arreglo. La reparación de placa lleva semanas, con precio y plazo por escrito antes de empezar. Para pantalla, batería y carga confirmamos modelo, repuesto y plazo antes de que dejes el equipo. Atendemos de lunes a viernes de 10:30 a 18:00, sin turno. Podés pagar en 3 cuotas sin interés.`,
    extraFaq: [
      {
        question: "Infinix tiene servicio tecnico oficial en Argentina?",
        answer:
          "Infinix atiende consultas por canales a distancia, pero no publica una red de centros de servicio fisicos en el pais donde dejar el equipo en persona. Por eso la mayoria de las reparaciones terminan en talleres independientes.",
      },
      {
        question: "Consiguen repuestos para Infinix en Argentina?",
        answer:
          "Depende del modelo. Las lineas Note y Hot son las mas frecuentes y tienen mejor disponibilidad; en modelos menos difundidos el tiempo de espera es mayor. Confirmamos disponibilidad y plazo antes de que dejes el equipo.",
      },
    ],
    brand: "Infinix",
    badge: "Android",
    imagePath: "/opengraph-image.png",
    models: ["Infinix Note 40", "Infinix GT 20 Pro", "Infinix Hot 40", "Infinix Smart 8"],
    specialtyFocus:
      "equipos de gama media con foco en bateria, pantalla y conectores",
    knownWeakPoints: [
      "pantalla quebrada por golpes laterales",
      "caida de autonomía en menos de un día",
      "microcortes de carga en USB-C",
    ],
    serviceHref: "/reparaciones/cambio-bateria-caba",
    siblingHref: "/guias/cambio-bateria-celular",
    siblingLabel: "Guia hermana: Bateria",
    keywords: ["reparacion infinix", "service infinix caba", "tecnico infinix"],
  },
  {
    slug: "reparacion-zte-buenos-aires",
    ...REVISED_DIAGNOSIS,
    seoTitleOverride: "Servicio técnico ZTE y Nubia en CABA | Team Celular",
    titleOverride: "Reparacion de ZTE en Buenos Aires: audio, carga y reinicios",
    metaDescriptionOverride:
      "Reparación de ZTE Blade, Nubia y Axon en CABA: audio, carga y reinicios. Plazo según la falla y repuesto.",
    heroDescriptionOverride:
      `Team Celular repara ZTE en CABA, en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. En las familias Blade, Nubia y Axon revisamos audio bajo o distorsionado, carga intermitente y reinicios. Probamos parlante, cable, cargador y conector antes de decidir qué pieza cambiar. Los reinicios también pueden requerir medir la placa: esa revisión cuesta ${formatArsPrice(PLACA_REVISION_PRICE)} y el informe se entrega en hasta 72 horas hábiles. Si hay que reparar la placa, el trabajo lleva semanas y confirmamos precio y plazo por escrito antes de empezar. Para otras reparaciones, el plazo depende del modelo y del repuesto disponible. Podés pagar en 3 cuotas sin interés.`,
    extraFaq: [
      {
        question: "Por que mi ZTE se reinicia solo?",
        answer:
          "Un reinicio intermitente rara vez es de software cuando el equipo ya tiene varios años: lo tipico es una falla de alimentacion en la placa, que aparece cuando el equipo exige corriente. Se diagnostica midiendo consumo, no reinstalando el sistema.",
      },
      {
        question: "El audio bajo de un ZTE se arregla o hay que cambiar el equipo?",
        answer:
          "En la mayoria de los casos se arregla. Primero descartamos que sea el filtro tapado por suciedad, que es limpieza tecnica; si el parlante esta dañado se reemplaza. Te lo decimos despues del diagnostico y antes de tocar nada.",
      },
    ],
    brand: "ZTE",
    badge: "Android",
    imagePath: "/opengraph-image.png",
    models: ["ZTE Blade V50", "ZTE Blade A73", "ZTE Nubia", "ZTE Axon"],
    specialtyFocus:
      "familias Blade y Nubia con foco en audio, carga y estabilidad de placa",
    knownWeakPoints: [
      "audio bajo o distorsionado",
      "falla de carga en movimientos del cable",
      "reinicios intermitentes en equipos antiguos",
    ],
    serviceHref: "/reparaciones/reparacion-audio-celular-caba",
    siblingHref: "/guias/pin-de-carga-suelto-solucion",
    siblingLabel: "Guia hermana: Pin de carga",
    keywords: ["reparacion zte", "service zte", "tecnico zte caba"],
  },
  {
    slug: "reparacion-tecno-buenos-aires",
    ...REVISED_DIAGNOSIS,
    seoTitleOverride: "Tecno: reparación y servicio técnico en CABA | Team Celular",
    titleOverride: "Reparacion de Tecno en Buenos Aires: Camon, Pova y Spark",
    metaDescriptionOverride:
      "Tecno Camon, Pova, Spark y Phantom: pantalla con rayas, cámara sin nitidez y batería que cae. Reparación en CABA.",
    heroDescriptionOverride:
      `Team Celular repara Tecno en CABA, en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. Confirmamos disponibilidad de repuesto para tu modelo antes de que dejes el equipo. En las líneas Camon, Pova, Spark y Phantom revisamos pantalla con rayas o toque fantasma, cámara sin nitidez y batería que pierde autonomía. ${SCREEN_BATTERY_TIMING_MESSAGE} Para la cámara, primero revisamos el vidrio del lente y el módulo. Si la falla requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles; el arreglo lleva semanas, con precio y plazo por escrito antes de empezar. Podés pagar en 3 cuotas sin interés.`,
    extraFaq: [
      {
        question: "Consiguen repuestos para Tecno en Argentina?",
        answer:
          "Depende del modelo. Es lo primero que verificamos: te confirmamos disponibilidad para tu equipo concreto antes de que lo dejes, para que no quede parado en el taller esperando una pieza.",
      },
      {
        question: "La camara de mi Tecno perdio nitidez, es el sensor?",
        answer:
          "No siempre. Muchas veces es el vidrio protector del lente, rayado o partido, y eso se cambia solo, mucho mas barato que el modulo. El diagnostico define cual de las dos es.",
      },
    ],
    brand: "Tecno",
    badge: "Android",
    imagePath: "/opengraph-image.png",
    models: ["Tecno Camon 30", "Tecno Pova", "Tecno Spark 20", "Tecno Phantom"],
    specialtyFocus:
      "modelos Camon y Pova con foco en pantalla, camara y consumo de energia",
    knownWeakPoints: [
      "pantalla con rayas o toque fantasma",
      "cámara con pérdida de nitidez",
      "batería que cae rápido en uso mixto",
    ],
    serviceHref: "/reparaciones/cambio-camara-caba",
    siblingHref: "/guias/reparacion-pantalla-celular",
    siblingLabel: "Guia hermana: Pantalla",
    keywords: ["reparacion tecno", "service tecno", "tecnico tecno caba"],
  },
  {
    slug: "reparacion-alcatel-buenos-aires",
    modifiedTime: "2026-10-15T00:00:00Z",
    seoTitleOverride: "Servicio técnico Alcatel en CABA | Team Celular",
    titleOverride: "Reparacion de Alcatel en Buenos Aires: conviene arreglarlo?",
    metaDescriptionOverride:
      "Reparación de Alcatel 1, 3, 5 y T en CABA. Revisión arancelada y presupuesto antes de reparar, con plazo según falla.",
    heroDescriptionOverride:
      `Team Celular repara Alcatel en CABA, en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. En las series 1, 3, 5 y T conviene comparar el presupuesto con el valor y el estado del equipo antes de decidir. Revisamos batería, conector de carga y pantalla; confirmamos repuesto, costo y plazo para tu modelo. La revisión técnica es arancelada: sin placa va de ARS 15.000 a 25.000. Si requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles; el arreglo lleva semanas y se presupuesta por separado. Podés pagar en 3 cuotas sin interés.`,
    extraFaq: [
      {
        question: "Conviene reparar un Alcatel o comprar otro?",
        answer:
          "Compará el costo de la reparación con el valor de reemplazo y el estado del equipo. Una batería o un pin de carga pueden justificar el arreglo, pero depende del modelo, el repuesto disponible y si hay otras fallas. Te pasamos el presupuesto para que decidas; no hace falta aceptar la reparación por haber pagado la revisión.",
      },
      {
        question: "Cobran el diagnostico si al final no lo reparo?",
        answer:
          `Sí, la revisión es arancelada aunque no aceptes el arreglo. Sin revisión de placa, cuesta entre ARS 15.000 y 25.000; te confirmamos el importe antes de abrir el equipo. Si requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)} y se descuenta del total si aceptás reparar. El presupuesto del arreglo se informa por separado antes de empezar.`,
      },
    ],
    brand: "Alcatel",
    badge: "Android",
    imagePath: "/opengraph-image.png",
    models: ["Alcatel 1", "Alcatel 3", "Alcatel 5", "Alcatel serie T"],
    specialtyFocus:
      "equipos con uso cotidiano donde importa costo-beneficio de la reparacion",
    knownWeakPoints: [
      "pantalla y touch sensibles a caidas",
      "batería degradada por antigüedad",
      "carga lenta por desgaste del conector",
    ],
    serviceHref: "/reparaciones/cambio-bateria-caba",
    siblingHref: "/guias/mantenimiento-preventivo-celulares",
    siblingLabel: "Guia hermana: Mantenimiento",
    keywords: ["reparacion alcatel", "service alcatel", "tecnico alcatel caba"],
  },
  {
    slug: "reparacion-asus-buenos-aires",
    modifiedTime: "2026-10-15T00:00:00Z",
    titleOverride: "Reparacion de Asus ROG y Zenfone en Buenos Aires",
    metaDescriptionOverride:
      "Reparación de Asus ROG Phone y Zenfone en CABA: sobretemperatura, batería exigida y fallas por estrés térmico.",
    heroDescriptionOverride:
      `Team Celular repara Asus ROG Phone y Zenfone en CABA, en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. Si el equipo se apaga al jugar, se calienta o perdió autonomía, medimos consumo y alimentación antes de proponer una batería o un trabajo de placa. La revisión de placa cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles; se cobra aunque no se repare y se descuenta del total si aceptás el arreglo. La reparación de placa lleva semanas, con precio y plazo por escrito. Para cambios de módulos confirmamos disponibilidad del repuesto y plazo para tu ROG o Zenfone antes de empezar. Podés pagar en 3 cuotas sin interés.`,
    extraFaq: [
      {
        question: "Mi ROG Phone se apaga cuando juego, es la bateria?",
        answer:
          "Puede ser la batería o una falla de alimentación en la placa. Medimos consumo bajo carga y revisamos la batería antes de cotizar una pieza. Si hace falta revisión de placa, te informamos su costo y el plazo del informe antes de ingresarla a ese proceso.",
      },
      {
        question: "Reparan placas de Asus o solo cambian modulos?",
        answer:
          "Trabajamos a nivel componente con microscopio. En equipos de alto rendimiento es la diferencia entre una reparacion posible y un presupuesto de reemplazo completo.",
      },
    ],
    brand: "ASUS",
    badge: "Zenfone y ROG",
    imagePath: "/images/reparacion_placa.webp",
    models: ["ROG Phone 8", "ROG Phone 7", "Zenfone 11", "Zenfone 10"],
    specialtyFocus:
      "equipos ROG y Zenfone con foco en temperatura, energia y placa",
    knownWeakPoints: [
      "sobretemperatura en uso gaming",
      "degradación de batería por carga exigente",
      "fallas de placa por estrés térmico",
    ],
    serviceHref: "/reparaciones/reparacion-placa-caba",
    siblingHref: "/guias/reparacion-samsung-buenos-aires",
    siblingLabel: "Guia hermana: Samsung",
    keywords: ["reparacion asus", "service rog phone", "tecnico asus caba"],
  },
  {
    slug: "reparacion-oneplus-buenos-aires",
    modifiedTime: "2026-10-15T00:00:00Z",
    titleOverride: "Reparacion de OnePlus en Buenos Aires: pantalla, bateria y carga",
    metaDescriptionOverride:
      "OnePlus 12, 11, 10 Pro y Nord: pantalla, batería y fallas del puerto USB-C. Reparación en CABA.",
    heroDescriptionOverride:
      `Team Celular repara OnePlus en CABA, en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. Si tu OnePlus 12, 11, 10 Pro o Nord carga lento o solo en cierta posición, probamos cable, cargador compatible y puerto USB-C y medimos consumo antes de cotizar piezas. ${SCREEN_BATTERY_TIMING_MESSAGE} Si requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles; el arreglo lleva semanas, con precio y plazo por escrito antes de empezar. Podés pagar en 3 cuotas sin interés.`,
    extraFaq: [
      {
        question: "Mi OnePlus carga lento, es la bateria o el cargador?",
        answer:
          "Probamos cable y cargador compatibles, revisamos el puerto USB-C y medimos consumo para distinguir un problema de conexión, batería o circuito de carga. El síntoma solo no alcanza para elegir una pieza. Te confirmamos qué revisión corresponde y su costo antes de abrir el equipo.",
      },
      {
        question: "Cambiar la pantalla de un OnePlus afecta la carga rapida?",
        answer:
          "El cambio de pantalla no debería alterar la carga rápida. Si el problema apareció después de una reparación, revisamos las conexiones y el alcance de su garantía antes de presupuestar otro trabajo. No se puede confirmar por ese síntoma solo si hace falta revisar un conector o la placa.",
      },
    ],
    brand: "OnePlus",
    badge: "Android premium",
    imagePath: "/opengraph-image.png",
    models: ["OnePlus 12", "OnePlus 11", "OnePlus Nord", "OnePlus 10 Pro"],
    specialtyFocus:
      "linea premium con foco en pantalla, bateria y carga ultra rapida",
    knownWeakPoints: [
      "pantalla con daño por impacto",
      "batería con pérdida de capacidad",
      "fallas de carga rápida por puerto USB-C",
    ],
    serviceHref: "/reparaciones/cambio-pin-carga-caba",
    siblingHref: "/guias/reparacion-xiaomi-buenos-aires",
    siblingLabel: "Guia hermana: Xiaomi",
    keywords: ["reparacion oneplus", "service oneplus", "tecnico oneplus buenos aires"],
  },
  {
    slug: "reparacion-huawei-buenos-aires",
    modifiedTime: "2026-10-15T00:00:00Z",
    seoTitleOverride: "Servicio técnico Huawei en CABA | Team Celular",
    titleOverride: "Reparacion de Huawei en Buenos Aires: camara, sensores y placa",
    metaDescriptionOverride:
      "Huawei P60, P50, Mate y Nova: cámara que no enfoca, sensores tras humedad o golpes y fallas de placa. Reparación en CABA.",
    heroDescriptionOverride:
      `Team Celular repara Huawei en CABA, en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. En P60, P50, Mate y Nova revisamos cámara sin enfoque y fallas de sensores después de golpes o humedad. Comprobamos módulo, flex, conectores y alimentación antes de decidir si hay que cambiar una pieza o revisar la placa. La revisión técnica sin placa cuesta entre ARS 15.000 y 25.000. Si requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles; el arreglo lleva semanas, con precio y plazo por escrito antes de empezar. Confirmamos disponibilidad de repuesto para tu modelo antes de que dejes el equipo. Podés pagar en 3 cuotas sin interés.`,
    extraFaq: [
      {
        question: "La camara de mi Huawei enfoca mal, tiene arreglo?",
        answer:
          "Puede tener arreglo, pero primero hay que identificar la causa: vidrio del lente, módulo, estabilizador o alimentación. La revisión permite cotizar el trabajo concreto y confirmar si hay repuesto para tu modelo antes de que decidas reparar.",
      },
      {
        question: "Mi Huawei se mojo y dejaron de andar algunos sensores",
        answer:
          `Después de un ingreso de líquido, revisamos sensores, flex, conectores y líneas de alimentación. Si requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)} y el informe se entrega en hasta 72 horas hábiles. Esa revisión se cobra aunque el equipo no se recupere y se descuenta si aceptás el arreglo. La reparación de placa lleva semanas, con precio y plazo por escrito; la viabilidad y el alcance del trabajo dependen del daño.`,
      },
    ],
    brand: "Huawei",
    badge: "Android y EMUI",
    imagePath: "/opengraph-image.png",
    models: ["Huawei P60", "Huawei P50", "Huawei Nova", "Huawei Mate"],
    specialtyFocus:
      "camara, sensores y placa en linea P, Mate y Nova",
    knownWeakPoints: [
      "módulo de cámara con enfoque irregular",
      "batería con descarga acelerada",
      "fallas de sensores luego de golpes o humedad",
    ],
    serviceHref: "/reparaciones/cambio-camara-caba",
    siblingHref: "/guias/reparacion-iphone-buenos-aires",
    siblingLabel: "Guia hermana: iPhone",
    keywords: ["reparacion huawei", "service huawei caba", "tecnico huawei recoleta"],
  },
  {
    slug: "reparacion-tcl-buenos-aires",
    seoTitleOverride: "Servicio técnico TCL celulares en CABA | Team Celular",
    metaDescriptionOverride:
      `Taller independiente para celulares TCL en Recoleta y Belgrano, CABA. Pantalla desde ${TCL_SCREEN_FROM}, según modelo y repuesto.`,
    titleOverride:
      "Reparación de celulares TCL en Buenos Aires: quién los arregla en CABA",
    workshop: {
      period: WORKSHOP_PERIOD,
      stats: [
        { value: "20", label: "celulares TCL recibidos" },
        { value: "7", label: "cambios de pantalla" },
      ],
      intro: `${WORKSHOP_TEAM} repara TCL sobre todo por pantalla. Con los NxtPaper hay un cuidado extra.`,
      notes: [
        {
          title: "NxtPaper: la pantalla tiene que ser mate",
          description:
            "La pantalla NxtPaper viene mate de fábrica. Tenemos el repuesto mate y lo probamos antes de instalarlo, para que quede como salió de fábrica.",
        },
        {
          title: "La pantalla es lo que más cambiamos",
          description:
            `7 de los 20 TCL que entraron fueron por pantalla. Los últimos cambios costaron de ${TCL_SCREEN_FROM} a ${TCL_SCREEN_TO}, según el modelo.`,
        },
        {
          title: "Pasanos el modelo exacto",
          description:
            "Un TCL 40 NxtPaper y un TCL 40 SE usan repuestos distintos. El modelo figura en Ajustes, dentro de la información del teléfono.",
        },
      ],
    },
    heroDescriptionOverride:
      "Recibimos celulares TCL para revisar pantalla, batería y carga en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), CABA. Somos un taller independiente. Pasanos el modelo exacto y qué le ocurre: confirmamos si la reparación es viable, si hay repuesto y cuánto cuesta antes de empezar. Te informamos la cobertura en el presupuesto antes de reparar. Si tu consulta es por la garantía del fabricante, consultá primero los canales oficiales de TCL Argentina.",
    modifiedTime: "2026-10-15T00:00:00Z",
    heroPointsOverride: [
      "Plazo de revisión según la falla; placa: informe hasta 72 horas hábiles.",
      "Cobertura informada en el presupuesto.",
      "Opiniones de clientes en Google de la sucursal Recoleta.",
      `Atención sin turno de lunes a viernes de 10:30 a 18:00. ${INSTALLMENTS_MESSAGE}`,
    ],
    diagnosisAnswerOverride:
      "El plazo depende de la falla. Si requiere revisión de placa, el informe se entrega en hasta 72 horas hábiles. El arreglo de placa lleva semanas y confirmamos precio y plazo por escrito antes de empezar. Para cambios de pantalla, batería o puerto, el plazo depende del modelo y del repuesto disponible.",
    extraFaq: [
      {
        question: "¿Tienen pantalla para TCL NxtPaper?",
        answer:
          "Sí. La pantalla NxtPaper es mate de fábrica y el repuesto tiene que ser igual. Tenemos el repuesto mate y lo probamos antes de instalarlo. Pasanos el modelo exacto para confirmar stock y precio.",
      },
      {
        question: "¿TCL tiene soporte oficial de celulares en Argentina?",
        answer:
          "TCL Argentina publica soporte para celulares y canales de postventa. Si buscás atención por la garantía del fabricante, consultá allí qué opciones corresponden a tu modelo y comprobante de compra. Team Celular es un taller independiente: no somos un service oficial de TCL. Te confirmamos por escrito el alcance de nuestra reparación y garantía antes de intervenir.",
      },
      {
        question: "¿Cuánto cuesta reparar un celular TCL?",
        answer:
          `Los últimos cambios de pantalla de TCL que cobramos fueron de ${TCL_SCREEN_FROM} a ${TCL_SCREEN_TO}, según el modelo; el detalle está en la tabla de esta guía. El precio de pantalla, batería o pin depende del modelo y del repuesto disponible; lo cotizamos antes de reparar. La revisión técnica sin placa va de $15.000 a $25.000. Si requiere revisión de placa, cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles. Informamos el costo antes de abrir el equipo y se descuenta si aceptás la reparación. El arreglo de placa lleva semanas y se presupuesta por separado, con precio y plazo por escrito.`,
      },
    ],
    extraRelatedLinks: [
      { href: "/reparaciones/cambio-bateria-caba", label: "Servicio de cambio de batería" },
      { href: "/reparaciones/cambio-pin-carga-caba", label: "Servicio de pin de carga" },
      { href: "/reparaciones/reparacion-placa-caba", label: "Condiciones de revisión de placa" },
      { href: "https://www.tcl.com/ar/es/support-mobile", label: "TCL Argentina: soporte de celulares" },
      { href: "https://www.tcl.com/ar/es/contacto", label: "TCL Argentina: canales de postventa" },
    ],
    brand: "TCL",
    badge: "Android",
    imagePath: "/opengraph-image.png",
    models: ["TCL 50", "TCL 40", "TCL 30", "TCL serie 20"],
    specialtyFocus:
      "equipos de uso diario con foco en pantalla, bateria y conectividad",
    knownWeakPoints: [
      "pantalla quebrada con pérdida de touch",
      "autonomía baja en uso continuo",
      "intermitencia de carga por desgaste del puerto",
    ],
    serviceHref: "/reparaciones/cambio-pantalla-caba",
    siblingHref: "/guias/reparacion-pantalla-celular",
    siblingLabel: "Guia hermana: Pantalla",
    keywords: ["reparacion tcl", "service tcl caba", "tecnico tcl buenos aires"],
  },
];

function buildServiceJsonLd(seed: BrandGuideSeed, pagePath: string) {
  if (!seed.repairPrices?.length) return null;

  const url = `${SITE_URL}${pagePath}`;
  const all = seed.repairPrices.flatMap((price) => [price.from, price.to]);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Reparacion de ${seed.brand} en CABA`,
    serviceType: "Reparacion de celulares",
    url,
    areaServed: [
      { "@type": "City", name: "CABA" },
      { "@type": "City", name: "Buenos Aires" },
    ],
    provider: { "@id": businessId("organization") },
    // AggregateOffer es el tipo correcto para un rango: un Offer con "price"
    // exigiria un valor unico que aca no existe.
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "ARS",
      lowPrice: Math.min(...all),
      highPrice: Math.max(...all),
      offerCount: seed.repairPrices.length,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Reparaciones para ${seed.brand}`,
      itemListElement: seed.repairPrices.map((price) => ({
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "ARS",
          minPrice: price.from,
          maxPrice: price.to,
        },
        itemOffered: {
          "@type": "Service",
          name: `${price.name} ${seed.brand}`,
        },
      })),
    },
  };
}

// Cada falla tipica recibe la explicacion de su tipo (antes eran 3 textos fijos
// iguales para todas las marcas, y contradecian la falla: "audio bajo" terminaba
// explicado como "el panel esta sano").
const WEAK_POINT_DESCRIPTIONS: Array<[RegExp, string]> = [
  [/pantalla|touch|oled|brillo/i, "Revisamos módulo, flex y conector antes de cotizar: a veces el panel está sano y falla la conexión. Si hay que cambiarlo, siempre es el módulo completo."],
  [/bater|autonom|descarga/i, "Medimos la salud de la batería y el consumo en reposo. Así sabemos si alcanza con cambiar la batería o si hay una fuga en la placa que la vacía."],
  [/carga|puerto|pin|usb/i, "Probamos con cable y cargador de banco y revisamos el conector con microscopio. Distinguimos suciedad, pin gastado o falla del circuito de carga."],
  [/c[aá]mara/i, "Probamos la cámara aislada del equipo para saber si falla el módulo, el flex o la placa, y no cambiar una pieza que no era la causa."],
  [/audio|parlante|micr[oó]fono/i, "Probamos parlante, auricular y micrófono por separado. Si el componente está bien, revisamos el circuito de audio en la placa."],
  [/placa|temperatura|sobrecalent|reinicio|t[eé]rmico/i, "Reproducimos la falla en el banco y medimos la placa. La revisión de placa sale $45.000 y se descuenta si se repara; si hay que trabajar un chip, te pasamos precio y plazo antes de empezar."],
  [/sensor|humedad/i, "Revisamos sensores, flex y rastros de humedad bajo microscopio: después de un golpe o de agua, la falla suele estar en un conector o una pista."],
];

function describeWeakPoint(point: string): string {
  const match = WEAK_POINT_DESCRIPTIONS.find(([pattern]) => pattern.test(point));
  return match ? match[1] : "Reproducimos la falla en el banco antes de cotizar, para no cambiar piezas que no eran la causa.";
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function buildBrandGuide(seed: BrandGuideSeed): BrandGuideConfig {
  const pagePath = `/guias/${seed.slug}`;
  const title =
    seed.titleOverride ??
    `Reparacion de ${seed.brand} en Buenos Aires: fallas comunes, diagnostico y solucion`;
  const pageLabel = `Reparacion ${seed.brand}`;
  const modelList = seed.models.join(", ");

  const symptoms: GuideItem[] = [
    ...seed.knownWeakPoints.map((point) => ({
      title: capitalize(point),
      description: describeWeakPoint(point),
    })),
    {
      title: `Fallas encadenadas en ${seed.brand}`,
      description:
        "Una falla sin resolver suele arrastrar audio, cámara o sensores. Por eso el ingreso incluye un control completo, no solo del síntoma que traés.",
    },
  ];

  const diagnostics: GuideItem[] = [
    {
      title: "Control de ingreso",
      description:
        `Queda por escrito cómo entró el ${seed.brand}: pantalla, cámara, audio, conectividad y carga.`,
    },
    {
      title: "Medición de consumo",
      description:
        "Consumo en reposo y curva de carga. Es lo que distingue una batería gastada de una fuga en placa.",
    },
    {
      title: "Inspección bajo microscopio",
      description:
        "Corrosión, pistas cortadas y soldaduras frías. Acá aparece lo que el reemplazo de módulo no resuelve.",
    },
    {
      title: "Prueba en uso real",
      description:
        "El equipo se prueba encendido y en uso antes de entregarlo, no solo al terminar la soldadura.",
    },
  ];

  const planSteps: GuideItem[] = [
    {
      title: "Presupuesto cerrado antes de tocar el equipo",
      description:
        "Número y plazo confirmados. Si no avanzás, te lo devolvemos como entró.",
    },
    {
      title: "Primero la falla que te trajo",
      description:
        "Si aparece algo más durante la reparación, te lo consultamos antes de sumarlo al presupuesto.",
    },
    {
      title: "Cobertura por tipo de reparación",
      description:
        MULTIBRAND_WARRANTY_MESSAGE,
    },
  ];

  const faq: GuideFaqItem[] = [
    {
      question: `¿Dónde reparar un ${seed.brand} en CABA si no es service oficial?`,
      answer:
        `Sí. Reparamos ${seed.brand} en nuestros talleres en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032), CABA. Confirmamos viabilidad según modelo y repuesto disponible antes de intervenir.`,
    },
    {
      question: "¿Cuánto tarda el diagnóstico?",
      answer:
        seed.diagnosisAnswerOverride ??
        REVISED_DIAGNOSIS.diagnosisAnswerOverride,
    },
    {
      question: `¿Qué modelos de ${seed.brand} reciben?`,
      answer: `Trabajamos, entre otros, estos modelos frecuentes: ${modelList}.`,
    },
    {
      question: "¿Conviene reparar o cambiar de equipo?",
      answer:
        "Depende del daño, del estado general y del costo total. Te pasamos el precio de la reparación para que lo compares con un equipo nuevo antes de decidir.",
    },
  ];

  const relatedLinks: GuideRelatedLink[] = [
    { href: seed.serviceHref, label: "Servicio recomendado" },
    { href: seed.siblingHref, label: seed.siblingLabel },
    { href: "/lab", label: "Laboratorio de microelectrónica" },
    { href: "/reparaciones", label: "Ver todos los servicios" },
    { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Pedir presupuesto" },
    ...(seed.extraRelatedLinks ?? []),
    // Estas guías solo recibían un enlace interno (el índice /guias). Enlazarlas
    // entre sí les da entrada desde cada guía de marca hermana.
    ...BRAND_GUIDE_SEEDS.filter((other) => other.slug !== seed.slug).map((other) => ({
      href: `/guias/${other.slug}`,
      label: `Reparación de ${other.brand}`,
    })),
  ];

  return {
    slug: seed.slug,
    brand: seed.brand,
    pagePath,
    pageLabel,
    title,
    heroDescription:
      seed.heroDescriptionOverride ??
      `Team Celular, en Paraguay 2451 Recoleta y Amenábar 2032 Belgrano (CABA), repara ${seed.brand} con diagnóstico y plazo según la falla. Esta guía explica las fallas más comunes, cómo las diagnosticamos y el paso recomendado según el estado del equipo.`,
    badge: seed.badge,
    readingTime: "5 min",
    publishedTime: "2026-04-20T00:00:00Z",
    modifiedTime: "2026-11-25T00:00:00Z",
    imagePath: seed.imagePath,
    articleAbout: [
      `Reparacion de ${seed.brand}`,
      `Servicio tecnico ${seed.brand} en CABA`,
      ...seed.models,
    ],
    heroPoints: seed.heroPointsOverride ?? REVISED_DIAGNOSIS.heroPointsOverride,
    symptomsTitle: `¿Cuáles son las fallas más frecuentes en ${seed.brand}?`,
    symptomsDescription:
      `Estas son las señales que más vemos en ${seed.brand}. Conviene resolverlas antes de que lleguen a la placa.`,
    symptoms,
    diagnosisTitle: `¿Cómo diagnosticamos un ${seed.brand}?`,
    diagnosisDescription:
      `Separamos el síntoma visible de la causa real antes de cambiar una pieza.`,
    diagnostics,
    planTitle: `¿Qué plan seguimos para reparar ${seed.brand}?`,
    planDescription:
      `Primero se resuelve la falla que más te complica el uso diario; lo demás se consulta antes de sumarlo.`,
    planSteps,
    faq: [...(seed.extraFaq ?? []), ...faq],
    relatedLinks,
    serviceJsonLd: buildServiceJsonLd(seed, pagePath),
    repairPrices: seed.repairPrices,
    workshop: seed.workshop,
    whatsappText: `Hola Team Celular, necesito presupuesto para reparar mi ${seed.brand}`,
    metadata: buildWebsiteMetadata({
      path: pagePath,
      // Sin el sufijo de sucursales: con marcas de nombre largo el title
      // superaba los 60 caracteres y se truncaba. Las sucursales ya estan en
      // la meta description.
      title: seed.seoTitleOverride ?? `Reparación de ${seed.brand} en CABA | Team Celular`,
      description:
        seed.metaDescriptionOverride ??
        `Taller en Recoleta y Belgrano que repara ${seed.brand}: pantalla, batería y carga con plazo según la falla y el repuesto.`,
      keywords: [
        ...seed.keywords,
        `reparacion ${seed.brand.toLowerCase()} buenos aires`,
        "service tecnico celulares caba",
      ],
      openGraphTitle: `Reparacion de ${seed.brand} en Buenos Aires | Team Celular`,
      openGraphDescription:
        `Guia practica para reparar ${seed.brand} con diagnostico tecnico, tiempos estimados y siguiente paso recomendado.`,
      openGraphImagePath: seed.imagePath,
      openGraphImageAlt: `Reparacion ${seed.brand} en Team Celular`,
      twitterTitle: `Service ${seed.brand} en CABA | Team Celular`,
      twitterDescription:
        `Conoce sintomas, diagnostico y opciones para reparar ${seed.brand} sin gastar de mas.`,
      languages: {
        "es-AR": pagePath,
      },
    }),
  };
}

const BRAND_GUIDES = BRAND_GUIDE_SEEDS.reduce<Record<BrandGuideSlug, BrandGuideConfig>>(
  (acc, seed) => {
    acc[seed.slug] = buildBrandGuide(seed);
    return acc;
  },
  {} as Record<BrandGuideSlug, BrandGuideConfig>
);

export function getBrandGuideConfig(slug: BrandGuideSlug): BrandGuideConfig {
  return BRAND_GUIDES[slug];
}

export function getBrandGuideMetadata(slug: BrandGuideSlug): Metadata {
  return BRAND_GUIDES[slug].metadata;
}

export const BRAND_GUIDE_LIST = BRAND_GUIDE_SEEDS.map((seed) => ({
  slug: seed.slug,
  brand: seed.brand,
  path: `/guias/${seed.slug}`,
  imagePath: seed.imagePath,
}));

export { SITE_URL };

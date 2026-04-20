import type { Metadata } from "next";
import type {
  GuideFaqItem,
  GuideItem,
  GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();

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
  specialtyFocus: string;
  knownWeakPoints: [string, string, string];
  serviceHref: string;
  siblingHref: string;
  siblingLabel: string;
  keywords: string[];
};

export type BrandGuideConfig = {
  slug: BrandGuideSlug;
  pagePath: string;
  pageLabel: string;
  title: string;
  heroDescription: string;
  badge: string;
  readingTime: string;
  publishedTime: string;
  modifiedTime: string;
  imagePath: string;
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
  metadata: Metadata;
};

const BRAND_GUIDE_SEEDS: BrandGuideSeed[] = [
  {
    slug: "reparacion-google-pixel-buenos-aires",
    brand: "Google Pixel",
    badge: "Android premium",
    imagePath: "/images/landings/landing-cambio-camara-caba-hero.webp",
    models: ["Pixel 9", "Pixel 8", "Pixel 7", "Pixel 6 Pro"],
    specialtyFocus:
      "enfoque de camara computacional, pantalla OLED y estabilidad de carga USB-C",
    knownWeakPoints: [
      "pantalla OLED con lineas o toque fantasma",
      "modulo de camara con enfoque irregular",
      "desgaste en conector USB-C por uso diario",
    ],
    serviceHref: "/reparaciones/cambio-pantalla-caba",
    siblingHref: "/guias/reparacion-samsung-buenos-aires",
    siblingLabel: "Guia hermana: Samsung",
    keywords: ["reparacion google pixel", "service pixel caba", "tecnico pixel buenos aires"],
  },
  {
    slug: "reparacion-honor-buenos-aires",
    brand: "Honor",
    badge: "Android",
    imagePath: "/images/dispositivoshdpro.webp",
    models: ["Honor Magic6 Pro", "Honor 200", "Honor X8", "Honor X7"],
    specialtyFocus:
      "paneles AMOLED, baterias de alta densidad y modulos de carga rapida",
    knownWeakPoints: [
      "pantalla golpeada con perdida de brillo",
      "autonomia irregular en uso intenso",
      "carga inestable por desgaste del puerto",
    ],
    serviceHref: "/reparaciones/cambio-bateria-caba",
    siblingHref: "/guias/reparacion-xiaomi-buenos-aires",
    siblingLabel: "Guia hermana: Xiaomi",
    keywords: ["reparacion honor", "service honor caba", "tecnico honor recoleta"],
  },
  {
    slug: "reparacion-poco-buenos-aires",
    brand: "POCO",
    badge: "Gaming y rendimiento",
    imagePath: "/images/componentes-pc-gaming.webp",
    models: ["POCO F6 Pro", "POCO F6", "POCO X6 Pro", "POCO M6 Pro"],
    specialtyFocus:
      "equipos de alto rendimiento con foco en temperatura, bateria y carga",
    knownWeakPoints: [
      "sobrecalentamiento en sesiones largas",
      "degradacion de bateria por uso exigente",
      "falla de carga rapida por desgaste de pin",
    ],
    serviceHref: "/reparaciones/cambio-pin-carga-caba",
    siblingHref: "/guias/reparacion-xiaomi-buenos-aires",
    siblingLabel: "Guia hermana: Xiaomi/Redmi",
    keywords: ["reparacion poco", "service poco caba", "reparar poco f6"],
  },
  {
    slug: "reparacion-oppo-buenos-aires",
    brand: "OPPO",
    badge: "Android",
    imagePath: "/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp",
    models: ["OPPO Reno12", "OPPO Reno11", "OPPO A79", "OPPO A58"],
    specialtyFocus:
      "linea Reno y A con foco en pantalla, bateria y tecnologia de carga rapida",
    knownWeakPoints: [
      "modulo de pantalla con touch inestable",
      "bateria con baja autonomia al final del dia",
      "degradacion del puerto de carga",
    ],
    serviceHref: "/reparaciones/cambio-pantalla-caba",
    siblingHref: "/guias/reparacion-pantalla-celular",
    siblingLabel: "Guia hermana: Pantallas",
    keywords: ["reparacion oppo", "service oppo caba", "tecnico oppo buenos aires"],
  },
  {
    slug: "reparacion-infinix-buenos-aires",
    brand: "Infinix",
    badge: "Android",
    imagePath: "/images/guia_cambio_bateria.webp",
    models: ["Infinix Note 40", "Infinix GT 20 Pro", "Infinix Hot 40", "Infinix Smart 8"],
    specialtyFocus:
      "equipos de gama media con foco en bateria, pantalla y conectores",
    knownWeakPoints: [
      "pantalla quebrada por golpes laterales",
      "caida de autonomia en menos de un dia",
      "microcortes de carga en USB-C",
    ],
    serviceHref: "/reparaciones/cambio-bateria-caba",
    siblingHref: "/guias/cambio-bateria-celular",
    siblingLabel: "Guia hermana: Bateria",
    keywords: ["reparacion infinix", "service infinix caba", "tecnico infinix"],
  },
  {
    slug: "reparacion-zte-buenos-aires",
    brand: "ZTE",
    badge: "Android",
    imagePath: "/images/aurisBlue.webp",
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
    brand: "Tecno",
    badge: "Android",
    imagePath: "/images/landings/landing-audio-celular-caba-hero.webp",
    models: ["Tecno Camon 30", "Tecno Pova", "Tecno Spark 20", "Tecno Phantom"],
    specialtyFocus:
      "modelos Camon y Pova con foco en pantalla, camara y consumo de energia",
    knownWeakPoints: [
      "pantalla con rayas o toque fantasma",
      "camara con perdida de nitidez",
      "bateria que cae rapido en uso mixto",
    ],
    serviceHref: "/reparaciones/cambio-camara-caba",
    siblingHref: "/guias/reparacion-pantalla-celular",
    siblingLabel: "Guia hermana: Pantalla",
    keywords: ["reparacion tecno", "service tecno", "tecnico tecno caba"],
  },
  {
    slug: "reparacion-alcatel-buenos-aires",
    brand: "Alcatel",
    badge: "Android",
    imagePath: "/images/guia_mantenimiento.webp",
    models: ["Alcatel 1", "Alcatel 3", "Alcatel 5", "Alcatel serie T"],
    specialtyFocus:
      "equipos con uso cotidiano donde importa costo-beneficio de la reparacion",
    knownWeakPoints: [
      "pantalla y touch sensibles a caidas",
      "bateria degradada por antiguedad",
      "carga lenta por desgaste del conector",
    ],
    serviceHref: "/reparaciones/cambio-bateria-caba",
    siblingHref: "/guias/mantenimiento-preventivo-celulares",
    siblingLabel: "Guia hermana: Mantenimiento",
    keywords: ["reparacion alcatel", "service alcatel", "tecnico alcatel caba"],
  },
  {
    slug: "reparacion-asus-buenos-aires",
    brand: "ASUS",
    badge: "Zenfone y ROG",
    imagePath: "/images/reparacion_placa.webp",
    models: ["ROG Phone 8", "ROG Phone 7", "Zenfone 11", "Zenfone 10"],
    specialtyFocus:
      "equipos ROG y Zenfone con foco en temperatura, energia y placa",
    knownWeakPoints: [
      "sobretemperatura en uso gaming",
      "degradacion de bateria por carga exigente",
      "fallas de placa por estres termico",
    ],
    serviceHref: "/reparaciones/reparacion-placa-caba",
    siblingHref: "/guias/microelectronica-reballing-caba",
    siblingLabel: "Guia hermana: Microelectronica",
    keywords: ["reparacion asus", "service rog phone", "tecnico asus caba"],
  },
  {
    slug: "reparacion-oneplus-buenos-aires",
    brand: "OnePlus",
    badge: "Android premium",
    imagePath: "/images/landings/landing-cambio-camara-caba-apoyo.webp",
    models: ["OnePlus 12", "OnePlus 11", "OnePlus Nord", "OnePlus 10 Pro"],
    specialtyFocus:
      "linea premium con foco en pantalla, bateria y carga ultra rapida",
    knownWeakPoints: [
      "pantalla con dano por impacto",
      "bateria con perdida de capacidad",
      "fallas de carga rapida por puerto USB-C",
    ],
    serviceHref: "/reparaciones/cambio-pin-carga-caba",
    siblingHref: "/guias/reparacion-xiaomi-buenos-aires",
    siblingLabel: "Guia hermana: Xiaomi",
    keywords: ["reparacion oneplus", "service oneplus", "tecnico oneplus buenos aires"],
  },
  {
    slug: "reparacion-huawei-buenos-aires",
    brand: "Huawei",
    badge: "Android y EMUI",
    imagePath: "/images/micro_diagnos_fino.webp",
    models: ["Huawei P60", "Huawei P50", "Huawei Nova", "Huawei Mate"],
    specialtyFocus:
      "camara, sensores y placa en linea P, Mate y Nova",
    knownWeakPoints: [
      "modulo de camara con enfoque irregular",
      "bateria con descarga acelerada",
      "fallas de sensores luego de golpes o humedad",
    ],
    serviceHref: "/reparaciones/cambio-camara-caba",
    siblingHref: "/guias/reparacion-iphone-buenos-aires",
    siblingLabel: "Guia hermana: iPhone",
    keywords: ["reparacion huawei", "service huawei caba", "tecnico huawei recoleta"],
  },
  {
    slug: "reparacion-tcl-buenos-aires",
    brand: "TCL",
    badge: "Android",
    imagePath: "/images/guia_cambio_modulo.webp",
    models: ["TCL 50", "TCL 40", "TCL 30", "TCL serie 20"],
    specialtyFocus:
      "equipos de uso diario con foco en pantalla, bateria y conectividad",
    knownWeakPoints: [
      "pantalla quebrada con perdida de touch",
      "autonomia baja en uso continuo",
      "intermitencia de carga por desgaste del puerto",
    ],
    serviceHref: "/reparaciones/cambio-pantalla-caba",
    siblingHref: "/guias/reparacion-pantalla-celular",
    siblingLabel: "Guia hermana: Pantalla",
    keywords: ["reparacion tcl", "service tcl caba", "tecnico tcl buenos aires"],
  },
];

function buildBrandGuide(seed: BrandGuideSeed): BrandGuideConfig {
  const pagePath = `/guias/${seed.slug}`;
  const title = `Reparacion de ${seed.brand} en Buenos Aires: fallas comunes, diagnostico y solucion`;
  const pageLabel = `Reparacion ${seed.brand}`;
  const modelList = seed.models.join(", ");

  const symptoms: GuideItem[] = [
    {
      title: seed.knownWeakPoints[0],
      description:
        `Cuando aparece ${seed.knownWeakPoints[0]}, conviene revisar modulo y conectores antes de seguir usando el equipo en condiciones inestables.`,
    },
    {
      title: seed.knownWeakPoints[1],
      description:
        `Si notas ${seed.knownWeakPoints[1]}, evaluamos desgaste de bateria y consumo en placa para evitar un cambio innecesario.`,
    },
    {
      title: seed.knownWeakPoints[2],
      description:
        `Ante ${seed.knownWeakPoints[2]}, validamos pin, flex de carga y lineas de datos para resolver la causa real.`,
    },
    {
      title: `Sistemas secundarios en ${seed.brand}`,
      description:
        "Audio, camara, sensores y conectividad pueden afectarse en cadena cuando una falla principal avanza sin diagnostico.",
    },
  ];

  const diagnostics: GuideItem[] = [
    {
      title: "Checklist funcional al ingreso",
      description:
        `Probamos funciones clave de ${seed.brand} (pantalla, camara, audio, conectividad y carga) para registrar el estado inicial real.`,
    },
    {
      title: "Medicion de energia y consumo",
      description:
        "Analizamos comportamiento de carga, estabilidad de bateria y consumo en reposo para detectar la causa principal.",
    },
    {
      title: "Inspeccion de modulos y conectores",
      description:
        "Revisamos fisicamente conectores, flex y piezas asociadas para evitar cambios innecesarios de componentes.",
    },
    {
      title: "Validacion final con pruebas de uso",
      description:
        "Antes de entregar, verificamos estabilidad general y dejamos documentado alcance de la reparacion.",
    },
  ];

  const planSteps: GuideItem[] = [
    {
      title: "Diagnostico inicial y presupuesto",
      description:
        "Te explicamos falla, alternativas de reparacion y tiempos estimados segun modelo, disponibilidad y complejidad.",
    },
    {
      title: "Reparacion sobre falla principal",
      description:
        "Intervenimos primero lo critico para recuperar funcionalidad de forma segura y sin sobrecostos.",
    },
    {
      title: "Control tecnico de calidad",
      description:
        "Ejecutamos pruebas de funcionamiento real para confirmar que la solucion sea estable y consistente.",
    },
    {
      title: "Entrega con recomendaciones",
      description:
        "Te damos recomendaciones de cuidado y seguimiento para extender vida util del equipo.",
    },
  ];

  const faq: GuideFaqItem[] = [
    {
      question: `Reparan ${seed.brand} aunque no sea una marca tan comun?`,
      answer:
        `Si. Atendemos equipos ${seed.brand} con protocolo tecnico y confirmamos viabilidad segun modelo, repuesto disponible y relacion costo-beneficio.`,
    },
    {
      question: "Cuanto tarda el diagnostico?",
      answer:
        "El diagnostico inicial se responde dentro del mismo dia habil y te permite decidir con informacion clara.",
    },
    {
      question: `Que modelos ${seed.brand} reciben?`,
      answer: `Trabajamos, entre otros, estos modelos frecuentes: ${modelList}.`,
    },
    {
      question: `Cual es el foco tecnico mas comun en ${seed.brand}?`,
      answer: `En esta marca solemos priorizar ${seed.specialtyFocus}.`,
    },
    {
      question: "Conviene reparar o cambiar de equipo?",
      answer:
        "Depende del dano, estado general y costo total. Te mostramos escenarios para elegir la opcion mas rentable.",
    },
  ];

  const relatedLinks: GuideRelatedLink[] = [
    { href: seed.serviceHref, label: "Servicio recomendado" },
    { href: seed.siblingHref, label: seed.siblingLabel },
    { href: "/reparaciones", label: "Ver todos los servicios" },
    { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Pedir presupuesto" },
  ];

  return {
    slug: seed.slug,
    pagePath,
    pageLabel,
    title,
    heroDescription: `Si tu ${seed.brand} presenta fallas de pantalla, bateria, carga o placa, esta guia te ayuda a entender sintomas, diagnostico y siguiente paso recomendado en CABA.`,
    badge: seed.badge,
    readingTime: "5 min",
    publishedTime: "2026-04-20T00:00:00Z",
    modifiedTime: "2026-04-20T00:00:00Z",
    imagePath: seed.imagePath,
    heroPoints: [
      `Diagnostico orientado a equipos ${seed.brand}.`,
      `Enfoque tecnico en ${seed.specialtyFocus}.`,
      `Punto critico frecuente: ${seed.knownWeakPoints[0]}.`,
    ],
    symptomsTitle: `Fallas frecuentes en equipos ${seed.brand}`,
    symptomsDescription:
      `Estas senales son las mas reportadas en ${seed.brand} y conviene abordarlas antes de que escalen a placa.`,
    symptoms,
    diagnosisTitle: `Como diagnosticamos un ${seed.brand}`,
    diagnosisDescription:
      `Aplicamos una secuencia tecnica para ${seed.brand}, separando sintoma visible de causa real sin cambiar piezas de mas.`,
    diagnostics,
    planTitle: `Plan recomendado para reparar ${seed.brand}`,
    planDescription:
      `El objetivo es estabilizar ${seed.brand} en uso diario, priorizando la falla que mas afecta rendimiento y autonomia.`,
    planSteps,
    faq,
    relatedLinks,
    whatsappText: `Hola Team Celular, necesito presupuesto para reparar mi ${seed.brand}`,
    metadata: buildWebsiteMetadata({
      path: pagePath,
      title: `Reparacion de ${seed.brand} en CABA | Service Tecnico en Buenos Aires`,
      description:
        `Servicio tecnico para ${seed.brand} en Recoleta: pantalla, bateria, carga y diagnostico tecnico con orientacion clara para decidir.`,
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

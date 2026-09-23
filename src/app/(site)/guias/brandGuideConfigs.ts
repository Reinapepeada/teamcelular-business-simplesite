import { GOOGLE_RATING_FALLBACK } from "@/lib/googleReviews";
import type { Metadata } from "next";
import type {
  GuideFaqItem,
  GuideItem,
  GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { businessId } from "@/lib/businessProfile";

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
};

export type BrandGuideConfig = {
  slug: BrandGuideSlug;
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
  metadata: Metadata;
};

const BRAND_GUIDE_SEEDS: BrandGuideSeed[] = [
  {
    slug: "reparacion-google-pixel-buenos-aires",
    titleOverride: "Reparacion de Google Pixel en Buenos Aires",
    metaDescriptionOverride:
      "Pantalla de Google Pixel desde $360.000 y batería desde $150.000. Pixel 6 a 10 Pro reparados en CABA el mismo día, con garantía escrita 90 días.",
    repairPrices: [
      { name: "Cambio de pantalla", from: 360000, to: 590000 },
      { name: "Cambio de bateria", from: 150000, to: 200000 },
    ],
    heroDescriptionOverride:
      "Team Celular repara Google Pixel en CABA con diagnostico el mismo dia, en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. El cambio de pantalla va de ARS 360.000 a 590.000 y el de bateria de ARS 150.000 a 200.000, segun el modelo: cubrimos desde Pixel 6 y 6a hasta Pixel 10 Pro, incluidas las variantes Pro y Pro XL. Pantalla y bateria salen en 2 a 4 horas. Tambien trabajamos las fallas de placa que aparecen seguido en equipos ingresados por importacion, con reballing BGA y soldadura SMD bajo microscopio. Garantia escrita de 90 dias sobre trabajo y repuesto, y pago en 3 cuotas sin interes. Google no tiene local propio de atencion en el pais, asi que estas reparaciones terminan en talleres independientes: la diferencia esta en si el taller puede trabajar la placa o solo reemplazar modulos completos.",
    extraFaq: [
      {
        question: "Google tiene servicio tecnico de Pixel en Argentina?",
        answer:
          "Google no opera un centro de reparacion propio en Argentina: su soporte deriva a socios autorizados. Como ademas la mayoria de los Pixel entran al pais por importacion, la garantia de fabrica suele no aplicar localmente.",
      },
      {
        question: "Reparan un Pixel comprado en el exterior?",
        answer:
          "Si. El origen del equipo no cambia el trabajo tecnico. Lo que si cambia es la disponibilidad del repuesto segun el modelo, y eso lo confirmamos antes de que lo dejes.",
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
    modifiedTime: "2026-08-20T00:00:00Z",
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
    metaDescriptionOverride:
      "Honor Magic y X reparados en CABA sin mandar el equipo por correo: diagnóstico el mismo día en Recoleta y Belgrano, garantía escrita 90 días.",
    titleOverride:
      "Reparacion de Honor en Buenos Aires: alternativa presencial al canal oficial",
    heroDescriptionOverride:
      "Team Celular repara Honor en CABA con diagnostico el mismo dia y entrega en mano: es un taller independiente de microelectronica en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. Resolvemos pantalla, bateria y modulo de carga de las lineas Magic y X, y tambien las fallas de placa que se resuelven cambiando el conjunto completo: aca se trabaja el componente que fallo, con reballing BGA y soldadura SMD bajo microscopio. Todo sale con garantia escrita de 90 dias sobre trabajo y repuesto, y se puede abonar en 3 cuotas sin interes. Honor tambien ofrece soporte propio en el pais, por hotline y reparacion via envio postal: la diferencia es el tiempo de ida y vuelta del correo frente a dejar el equipo en el mostrador y tener el diagnostico ese mismo dia.",
    extraFaq: [
      {
        question: "Que diferencia hay entre el canal de Honor y Team Celular?",
        answer:
          "Honor opera su propio canal de soporte en Argentina, con hotline y reparacion por envio postal. Team Celular es un taller independiente de microelectronica: atendemos en persona en Recoleta y Belgrano, el diagnostico se hace el mismo dia y reparamos a nivel componente, algo que el canal de la marca resuelve reemplazando el conjunto completo.",
      },
      {
        question: "Conviene el canal oficial de Honor o un taller independiente?",
        answer:
          "Si el equipo esta en garantia de fabrica, el canal oficial: cualquier intervencion externa la anula. Si la garantia ya vencio, pesa el tiempo y el tipo de falla. El canal oficial trabaja por envio y por reemplazo de modulo; nosotros entregamos el equipo en mano y reparamos a nivel componente cuando la falla esta en la placa.",
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
    modifiedTime: "2026-09-02T00:00:00Z",
    titleOverride: "Reparacion de POCO en Buenos Aires: temperatura, bateria y carga",
    metaDescriptionOverride:
      "POCO F6 Pro, F6, X6 Pro y M6 Pro: sobrecalentamiento, batería exigida y pin de carga gastado. Reparación en CABA con garantía escrita 90 días.",
    heroDescriptionOverride:
      "Team Celular repara POCO en CABA con diagnostico el mismo dia, en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. POCO vende potencia a precio contenido, y esa ecuacion se paga en calor: son los equipos que mas entran por sobrecalentamiento en sesiones largas. El calor sostenido no es solo una molestia, es lo que despues acelera la degradacion de la bateria y castiga la placa, asi que las tres fallas tipicas de la linea suelen ser la misma historia contada en orden. La carga rapida agrega su parte: el pin se desgasta antes que en un equipo de carga convencional. Si tu POCO calienta y ademas perdio autonomia, conviene diagnosticar las dos cosas juntas en vez de cambiar la bateria y volver en tres meses. Garantia escrita de 90 dias y 3 cuotas sin interes.",
    extraFaq: [
      {
        question: "Es normal que mi POCO caliente tanto?",
        answer:
          "Algo de calor en uso exigente es esperable por el tipo de procesador. Lo que no es normal es que caliente en uso liviano o que se apague: ahi hay algo que medir, y suele estar en la gestion de energia.",
      },
      {
        question: "El sobrecalentamiento arruina la bateria?",
        answer:
          "La acelera. Por eso cuando entra un POCO que calienta, medimos tambien el estado de la bateria: cambiar una sin revisar lo otro suele terminar en una segunda visita.",
      },
    ],
    brand: "POCO",
    badge: "Gaming y rendimiento",
    imagePath: "/images/micro_diagnos_fino.webp",
    models: ["POCO F6 Pro", "POCO F6", "POCO X6 Pro", "POCO M6 Pro"],
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
    modifiedTime: "2026-09-02T00:00:00Z",
    titleOverride: "Reparacion de OPPO en Buenos Aires: Reno y serie A",
    metaDescriptionOverride:
      "OPPO Reno12, Reno11, A79 y A58: touch inestable, poca autonomía y puerto de carga gastado. Reparación en CABA con garantía escrita 90 días.",
    heroDescriptionOverride:
      "Team Celular repara OPPO en CABA con diagnostico el mismo dia, en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. En las lineas Reno y A la consulta que mas se repite es el touch que responde mal sin que la pantalla este rota: se toca y no reacciona, o reacciona donde no es. Eso no siempre es el modulo. Muchas veces es el conector del flex, que se afloja despues de una caida sin marca visible, y revisarlo primero evita cambiar una pantalla que estaba sana. Las otras dos habituales son la autonomia que no llega al final del dia y el puerto de carga desgastado, que en equipos con carga rapida propietaria aparece antes de lo que uno espera. Pantalla y bateria salen en 2 a 4 horas segun stock. Garantia escrita de 90 dias sobre trabajo y repuesto, y 3 cuotas sin interes.",
    extraFaq: [
      {
        question: "El touch de mi OPPO falla pero la pantalla no esta rota",
        answer:
          "Es una consulta frecuente. Antes de cotizar un modulo revisamos el conector del flex: si se aflojo por un golpe, se reasienta y el touch vuelve, sin cambiar la pantalla. Recien si el panel esta dañado se reemplaza.",
      },
      {
        question: "Cuanto tarda un cambio de pantalla en un OPPO Reno?",
        answer:
          "Entre 2 y 4 horas cuando tenemos el modulo en stock. Si hay que pedirlo, te confirmamos el plazo antes de que dejes el equipo.",
      },
    ],
    brand: "OPPO",
    badge: "Android",
    imagePath: "/images/micro_diagnos_fino.webp",
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
    seoTitleOverride: "Servicio técnico Infinix en CABA | Team Celular",
    metaDescriptionOverride:
      "Infinix Note, Hot y Zero: sin service oficial físico en el país, los reparamos en Recoleta y Belgrano con diagnóstico en el día y garantía 90 días.",
    titleOverride:
      "Reparacion de Infinix en Buenos Aires: donde arreglarlo sin red oficial",
    heroDescriptionOverride:
      "Infinix no tiene una red de service centers fisicos verificable en Argentina: la marca atiende por canales de contacto a distancia, sin local propio donde dejar el equipo. Team Celular es un taller independiente de microelectronica en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), CABA, con diagnostico el mismo dia y garantia escrita de 90 dias sobre trabajo y repuesto. Reparamos pantalla, bateria y pin de carga de las lineas Note, Hot y Zero, y tambien equipos que no encienden o se mojaron, que es donde la reparacion a nivel componente cambia el resultado: reballing BGA y soldadura SMD bajo microscopio en vez de reemplazar la placa entera. El presupuesto se confirma antes de intervenir el equipo, y si no tiene reparacion posible te lo decimos sin cobrarte el intento. Atendemos de lunes a viernes de 10:30 a 18:00, sin turno, con pago en 3 cuotas sin interes.",
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
    imagePath: "/images/guia_cambio_bateria.webp",
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
    seoTitleOverride: "Servicio técnico ZTE y Nubia en CABA | Team Celular",
    modifiedTime: "2026-09-02T00:00:00Z",
    titleOverride: "Reparacion de ZTE en Buenos Aires: audio, carga y reinicios",
    metaDescriptionOverride:
      "ZTE Blade, Nubia y Axon con audio distorsionado, carga floja o reinicios: reparación en CABA el mismo día, con garantía escrita 90 días.",
    heroDescriptionOverride:
      "Team Celular repara ZTE en CABA con diagnostico el mismo dia, en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. Las tres fallas que mas entran en las familias Blade y Nubia son de tipo distinto entre si: el audio bajo o distorsionado suele ser el parlante o su filtro, la carga que corta cuando se mueve el cable casi siempre es el pin y no el cargador, y los reinicios intermitentes en equipos de varios años apuntan a la placa. Esa ultima es la que separa un taller de otro: en vez de cotizar el reemplazo del conjunto, se trabaja el componente que fallo con reballing BGA y soldadura SMD bajo microscopio. Todo sale con garantia escrita de 90 dias sobre trabajo y repuesto, y se puede pagar en 3 cuotas sin interes.",
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
    imagePath: "/images/micro_diagnos_fino.webp",
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
    seoTitleOverride: "Tecno: reparación y servicio técnico en CABA | Team Celular",
    titleOverride: "Reparacion de Tecno en Buenos Aires: Camon, Pova y Spark",
    metaDescriptionOverride:
      "Tecno Camon, Pova, Spark y Phantom: pantalla con rayas, cámara sin nitidez y batería que cae. Reparación en CABA con garantía escrita de 90 días.",
    heroDescriptionOverride:
      "Team Celular repara Tecno en CABA con diagnostico el mismo dia, en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. Tecno es una marca de llegada reciente al pais, asi que la pregunta real no suele ser si la falla tiene arreglo sino si el repuesto esta: por eso confirmamos disponibilidad para tu modelo antes de que dejes el equipo, y no despues. En las lineas Camon y Pova lo que mas vemos es pantalla con rayas o toque fantasma, camara que perdio nitidez y bateria que cae rapido en uso mixto. La pantalla y la bateria se resuelven en 2 a 4 horas cuando hay repuesto; la camara conviene diagnosticarla antes de cotizar, porque a veces es el vidrio del lente y no el modulo completo. Garantia escrita de 90 dias y 3 cuotas sin interes.",
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
    imagePath: "/images/landings/landing-audio-celular-caba-hero.webp",
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
    seoTitleOverride: "Servicio técnico Alcatel en CABA | Team Celular",
    titleOverride: "Reparacion de Alcatel en Buenos Aires: conviene arreglarlo?",
    metaDescriptionOverride:
      "Alcatel series 1, 3, 5 y T: te decimos si conviene reparar antes de cobrarte. Diagnóstico el mismo día en CABA y garantía de 90 días.",
    heroDescriptionOverride:
      "Team Celular repara Alcatel en CABA con diagnostico el mismo dia, en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. Con Alcatel la conversacion honesta es otra: son equipos de gama accesible, y en varios casos el costo de la reparacion se acerca demasiado al valor del telefono. Por eso el diagnostico incluye decirte si conviene o no repararlo, aunque la respuesta nos deje sin el trabajo. Lo que si vale casi siempre la pena es la bateria degradada por antiguedad y el conector de carga desgastado: son reparaciones de bajo costo que devuelven un par de años de uso. La pantalla partida es la que hay que pensar, porque el modulo es la pieza mas cara del equipo. Garantia escrita de 90 dias sobre trabajo y repuesto, y 3 cuotas sin interes.",
    extraFaq: [
      {
        question: "Conviene reparar un Alcatel o comprar otro?",
        answer:
          "Depende de que se rompio. Bateria o pin de carga casi siempre conviene: son reparaciones baratas que estiran la vida del equipo. Pantalla en un modelo de entrada es la que hay que evaluar con numeros, y te los damos antes de que decidas.",
      },
      {
        question: "Cobran el diagnostico si al final no lo reparo?",
        answer:
          "El diagnostico se hace primero y el presupuesto se confirma antes de intervenir el equipo. Si decidis no avanzar, te lo devolvemos como vino.",
      },
    ],
    brand: "Alcatel",
    badge: "Android",
    imagePath: "/images/guia_mantenimiento.webp",
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
    modifiedTime: "2026-09-02T00:00:00Z",
    titleOverride: "Reparacion de Asus ROG y Zenfone en Buenos Aires",
    metaDescriptionOverride:
      "Reparación de Asus ROG Phone y Zenfone en CABA: sobretemperatura, batería exigida y fallas por estrés térmico. Garantía escrita 90 días.",
    heroDescriptionOverride:
      "Team Celular repara Asus ROG Phone y Zenfone en CABA con diagnostico el mismo dia, en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. Un ROG Phone no falla como un telefono comun: esta pensado para sostener carga de trabajo alta durante horas, y eso deja marca. La sobretemperatura en uso gaming, la bateria degradada por ciclos de carga exigentes y las fallas de placa por estres termico son el mismo problema en tres etapas distintas. La ultima es donde termina la mayoria de los talleres, porque implica trabajar el componente y no cambiar el modulo: aca se hace con reballing BGA y soldadura SMD bajo microscopio. Si un ROG se apaga bajo carga pero anda bien en escritorio, ese sintoma se mide, no se adivina. Garantia escrita de 90 dias y 3 cuotas sin interes.",
    extraFaq: [
      {
        question: "Mi ROG Phone se apaga cuando juego, es la bateria?",
        answer:
          "Puede ser bateria, pero tambien puede ser gestion de energia en la placa: el equipo se apaga justo cuando mas corriente pide. La diferencia se ve midiendo consumo bajo carga, y cambiar la bateria sin medir es tirar una moneda.",
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
    siblingHref: "/guias/microelectronica-reballing-caba",
    siblingLabel: "Guia hermana: Microelectronica",
    keywords: ["reparacion asus", "service rog phone", "tecnico asus caba"],
  },
  {
    slug: "reparacion-oneplus-buenos-aires",
    modifiedTime: "2026-09-02T00:00:00Z",
    titleOverride: "Reparacion de OnePlus en Buenos Aires: pantalla, bateria y carga",
    metaDescriptionOverride:
      "OnePlus 12, 11, 10 Pro y Nord: pantalla, batería y fallas del puerto USB-C. Reparación en CABA con garantía escrita 90 días.",
    heroDescriptionOverride:
      "Team Celular repara OnePlus en CABA con diagnostico el mismo dia, en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. La falla mas caracteristica de la linea no es la pantalla sino la carga: son equipos construidos alrededor de la carga ultra rapida, y el puerto USB-C es la pieza que absorbe todo ese trabajo. Cuando un OnePlus empieza a cargar lento o solo en cierta posicion del cable, el problema esta en el conector mucho antes que en la bateria, y cambiar la bateria no lo resuelve. La pantalla por impacto y la perdida de capacidad de bateria son las otras dos que mas entran, y ambas salen en el dia. Tambien trabajamos las fallas de placa que en otros lados se cotizan como cambio de conjunto. Garantia escrita de 90 dias sobre trabajo y repuesto, y 3 cuotas sin interes.",
    extraFaq: [
      {
        question: "Mi OnePlus carga lento, es la bateria o el cargador?",
        answer:
          "Antes de esas dos, revisamos el puerto. En equipos de carga ultra rapida el conector es lo que mas se desgasta, y una carga lenta o intermitente casi siempre empieza ahi. Es ademas la reparacion mas barata de las tres.",
      },
      {
        question: "Cambiar la pantalla de un OnePlus afecta la carga rapida?",
        answer:
          "No, son sistemas separados. Si despues de un cambio de pantalla aparecio un problema de carga, lo que hay que revisar es el armado, y eso lo vemos sin cargarte el diagnostico.",
      },
    ],
    brand: "OnePlus",
    badge: "Android premium",
    imagePath: "/images/landings/landing-cambio-camara-caba-apoyo.webp",
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
    seoTitleOverride: "Servicio técnico Huawei en CABA | Team Celular",
    titleOverride: "Reparacion de Huawei en Buenos Aires: camara, sensores y placa",
    metaDescriptionOverride:
      "Huawei P60, P50, Mate y Nova: cámara que no enfoca, sensores tras humedad o golpes y fallas de placa. Reparación en CABA, garantía 90 días.",
    heroDescriptionOverride:
      "Team Celular repara Huawei en CABA con diagnostico el mismo dia, en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), sin turno previo, de lunes a viernes de 10:30 a 18:00. La linea P y Mate se compro en buena medida por la camara, asi que cuando el enfoque empieza a fallar el equipo pierde justo aquello por lo que se eligio. Ese es el trabajo mas frecuente que nos llega de la marca, junto con los sensores que dejan de responder despues de un golpe o de humedad: proximidad, giroscopio, huella. Los sensores son el caso donde mas se nota la diferencia entre cambiar un modulo y trabajar la placa, porque muchas veces lo que fallo es la linea que los alimenta y no el sensor. Eso se resuelve con microscopio, reballing BGA y soldadura SMD. Confirmamos disponibilidad de repuesto para tu modelo antes de que dejes el equipo. Garantia escrita de 90 dias y 3 cuotas sin interes.",
    extraFaq: [
      {
        question: "La camara de mi Huawei enfoca mal, tiene arreglo?",
        answer:
          "Casi siempre si. Puede ser el modulo de camara, el vidrio del lente o el estabilizador. Son tres reparaciones de costo muy distinto, y por eso se diagnostica antes de cotizar.",
      },
      {
        question: "Mi Huawei se mojo y dejaron de andar algunos sensores",
        answer:
          "Es el cuadro tipico de daño por liquido: el equipo enciende pero pierde funciones sueltas. Va al laboratorio de microelectronica para limpieza de placa y revision de las lineas afectadas. Si no tiene reparacion posible, te lo decimos sin cobrarte el intento.",
      },
    ],
    brand: "Huawei",
    badge: "Android y EMUI",
    imagePath: "/images/micro_diagnos_fino.webp",
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
      "Celulares TCL sin red oficial en el país: pantalla, batería y pin de carga en Recoleta y Belgrano (CABA), diagnóstico en el día, garantía 90 días.",
    titleOverride:
      "Reparacion de celulares TCL en Buenos Aires: quien los arregla en CABA",
    heroDescriptionOverride:
      "Buscar servicio tecnico TCL en Argentina lleva casi siempre a la linea de electrodomesticos, no a celulares: para telefonos TCL no hay una red oficial visible en el pais. Team Celular es un taller independiente de microelectronica en Paraguay 2451 (Recoleta) y Amenabar 2032 (Belgrano), CABA, y si recibe celulares TCL. Diagnosticamos el mismo dia y entregamos garantia escrita de 90 dias sobre trabajo y repuesto. Resolvemos pantalla, bateria y pin de carga, y en equipos que no encienden trabajamos a nivel componente con microscopio, que es lo que permite recuperar placas en marcas donde conseguir un repuesto completo es dificil. El presupuesto se confirma antes de tocar el equipo y la orden tecnica queda por escrito al ingresar. Atendemos de lunes a viernes de 10:30 a 18:00, sin turno, con pago en 3 cuotas sin interes.",
    extraFaq: [
      {
        question: "TCL tiene servicio tecnico oficial de celulares en Argentina?",
        answer:
          "Las busquedas de servicio tecnico TCL en Argentina devuelven mayormente la linea de electrodomesticos. Para celulares no hay una red oficial visible en el pais, asi que las reparaciones se resuelven en talleres independientes.",
      },
      {
        question: "Vale la pena reparar un celular TCL o conviene cambiarlo?",
        answer:
          "Depende del costo del repuesto contra el valor del equipo. En TCL los modulos completos suelen ser dificiles de conseguir, y ahi la reparacion a nivel componente puede ser la unica via razonable. Te damos el numero y la recomendacion antes de intervenir, sin cobrarte por decirte que no conviene.",
      },
    ],
    brand: "TCL",
    badge: "Android",
    imagePath: "/images/guia_cambio_modulo.webp",
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
    provider: { "@id": businessId("localbusiness") },
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
  [/placa|temperatura|sobrecalent|reinicio|t[eé]rmico/i, "Reproducimos la falla en el banco y medimos la placa. Si hay componentes dañados por calor, se reparan con microsoldadura bajo microscopio."],
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
      title: "Entrega con garantía escrita",
      description:
        "90 días sobre el trabajo y el repuesto instalado, con el alcance detallado por escrito.",
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
        "El diagnóstico sale el mismo día hábil, y con eso decidís si conviene reparar antes de que toquemos el equipo.",
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
  ];

  return {
    slug: seed.slug,
    pagePath,
    pageLabel,
    title,
    heroDescription:
      seed.heroDescriptionOverride ??
      `Team Celular, en Paraguay 2451 Recoleta y Amenábar 2032 Belgrano (CABA), repara ${seed.brand} con diagnóstico el mismo día y garantía escrita de 90 días sobre trabajo y repuesto. Esta guía explica las fallas más comunes, cómo las diagnosticamos y el paso recomendado según el estado del equipo.`,
    badge: seed.badge,
    readingTime: "5 min",
    publishedTime: "2026-04-20T00:00:00Z",
    modifiedTime: seed.modifiedTime ?? "2026-09-22T00:00:00Z",
    imagePath: seed.imagePath,
    articleAbout: [
      `Reparacion de ${seed.brand}`,
      `Servicio tecnico ${seed.brand} en CABA`,
      ...seed.models,
    ],
    heroPoints: [
      "Diagnóstico el mismo día, sin turno.",
      "Garantía escrita de 90 días sobre trabajo y repuesto.",
      `Google ${GOOGLE_RATING_FALLBACK.rating.toFixed(1).replace(".", ",")} con ${GOOGLE_RATING_FALLBACK.total} reseñas en Recoleta.`,
    ],
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
    whatsappText: `Hola Team Celular, necesito presupuesto para reparar mi ${seed.brand}`,
    metadata: buildWebsiteMetadata({
      path: pagePath,
      // Sin el sufijo de sucursales: con marcas de nombre largo el title
      // superaba los 60 caracteres y se truncaba. Las sucursales ya estan en
      // la meta description.
      title: seed.seoTitleOverride ?? `Reparación de ${seed.brand} en CABA | Team Celular`,
      description:
        seed.metaDescriptionOverride ??
        `Taller en Recoleta y Belgrano que repara ${seed.brand}: pantalla, batería y carga con diagnóstico el mismo día en CABA. Garantía escrita 90 días.`,
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

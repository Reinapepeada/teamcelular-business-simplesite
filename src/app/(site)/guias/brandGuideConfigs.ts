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
      "Reparación de Google Pixel en CABA: pantalla desde $360.000 y batería desde $150.000. Pixel 6 a 10 Pro, mismo día, garantía escrita 90 días.",
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
      "pantalla OLED con lineas o toque fantasma",
      "modulo de camara con enfoque irregular",
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
    titleOverride: "Reparacion de POCO en Buenos Aires: temperatura, bateria y carga",
    metaDescriptionOverride:
      "Reparación de POCO en CABA: F6 Pro, F6, X6 Pro y M6 Pro. Sobrecalentamiento, batería exigida y carga rápida con pin desgastado. Garantía escrita de 90 días.",
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
    titleOverride: "Reparacion de OPPO en Buenos Aires: Reno y serie A",
    metaDescriptionOverride:
      "Reparación de OPPO en CABA: Reno12, Reno11, A79 y A58. Touch inestable, batería con poca autonomía y desgaste del puerto de carga. Garantía escrita de 90 días.",
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
    titleOverride: "Reparacion de ZTE en Buenos Aires: audio, carga y reinicios",
    metaDescriptionOverride:
      "Reparación de ZTE en CABA: Blade, Nubia y Axon. Audio distorsionado, carga floja y reinicios intermitentes, con diagnóstico el mismo día y garantía de 90 días.",
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
    titleOverride: "Reparacion de Tecno en Buenos Aires: Camon, Pova y Spark",
    metaDescriptionOverride:
      "Reparación de Tecno en CABA: Camon, Pova, Spark y Phantom. Pantalla con rayas, cámara sin nitidez y batería que cae, con garantía escrita de 90 días.",
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
    titleOverride: "Reparacion de Alcatel en Buenos Aires: conviene arreglarlo?",
    metaDescriptionOverride:
      "Reparación de Alcatel en CABA: series 1, 3, 5 y T. Te decimos si conviene reparar antes de cobrarte, con diagnóstico el mismo día y garantía de 90 días.",
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
    titleOverride: "Reparacion de Asus ROG y Zenfone en Buenos Aires",
    metaDescriptionOverride:
      "Reparación de Asus ROG Phone y Zenfone en CABA: sobretemperatura, batería exigida y fallas de placa por estrés térmico. Microelectrónica y garantía de 90 días.",
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
    titleOverride: "Reparacion de OnePlus en Buenos Aires: pantalla, bateria y carga",
    metaDescriptionOverride:
      "Reparación de OnePlus en CABA: series 12, 11, 10 Pro y Nord. Pantalla, batería y fallas de carga rápida por el puerto USB-C, con garantía escrita de 90 días.",
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
    titleOverride: "Reparacion de Huawei en Buenos Aires: camara, sensores y placa",
    metaDescriptionOverride:
      "Reparación de Huawei en CABA: P60, P50, Mate y Nova. Cámara con enfoque irregular, sensores tras humedad o golpes y fallas de placa. Garantía de 90 días.",
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

function buildBrandGuide(seed: BrandGuideSeed): BrandGuideConfig {
  const pagePath = `/guias/${seed.slug}`;
  const title =
    seed.titleOverride ??
    `Reparacion de ${seed.brand} en Buenos Aires: fallas comunes, diagnostico y solucion`;
  const pageLabel = `Reparacion ${seed.brand}`;
  const modelList = seed.models.join(", ");

  const symptoms: GuideItem[] = [
    {
      title: seed.knownWeakPoints[0],
      description:
        "Revisamos modulo, flex y conectores antes de cotizar un reemplazo: es frecuente que el panel este sano y falle la conexion.",
    },
    {
      title: seed.knownWeakPoints[1],
      description:
        "Aislamos el modulo y lo probamos por separado, para no cobrar una pieza que no era la causa.",
    },
    {
      title: seed.knownWeakPoints[2],
      description:
        "Reproducimos la falla en el banco. Si es intermitente, medimos el circuito: cambiar la pieza sin eso deja el problema adentro.",
    },
    {
      title: `Fallas encadenadas en ${seed.brand}`,
      description:
        "Una falla sin resolver suele arrastrar audio, camara o sensores. Por eso el ingreso incluye un control completo, no solo del sintoma que traes.",
    },
  ];

  const diagnostics: GuideItem[] = [
    {
      title: "Control de ingreso",
      description:
        `Queda por escrito como entro el ${seed.brand}: pantalla, camara, audio, conectividad y carga.`,
    },
    {
      title: "Medicion de consumo",
      description:
        "Consumo en reposo y curva de carga. Es lo que distingue una bateria gastada de una fuga en placa.",
    },
    {
      title: "Inspeccion bajo microscopio",
      description:
        "Corrosion, pistas cortadas y soldaduras frias. Aca aparece lo que el reemplazo de modulo no resuelve.",
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
        "Numero y plazo confirmados. Si no avanzas, te lo devolvemos como entro.",
    },
    {
      title: "Primero la falla que te trajo",
      description:
        "Si aparece algo mas durante la reparacion, te lo consultamos antes de sumarlo al presupuesto.",
    },
    {
      title: "Entrega con garantia escrita",
      description:
        "90 dias sobre el trabajo y el repuesto instalado, con el alcance detallado por escrito.",
    },
  ];

  const faq: GuideFaqItem[] = [
    {
      question: `Reparan ${seed.brand} aunque no sea una marca tan comun?`,
      answer:
        `Si. Reparamos ${seed.brand} en nuestros talleres en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032), CABA. Confirmamos viabilidad según modelo y repuesto disponible antes de intervenir.`,
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
    { href: "/lab", label: "Laboratorio de microelectronica" },
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
    modifiedTime: seed.modifiedTime ?? "2026-06-09T00:00:00Z",
    imagePath: seed.imagePath,
    articleAbout: [
      `Reparacion de ${seed.brand}`,
      `Servicio tecnico ${seed.brand} en CABA`,
      ...seed.models,
    ],
    heroPoints: [
      `Diagnostico orientado a equipos ${seed.brand}.`,
      `Enfoque tecnico en ${seed.specialtyFocus}.`,
      `Punto critico frecuente: ${seed.knownWeakPoints[0]}.`,
    ],
    symptomsTitle: `¿Cuáles son las fallas más frecuentes en ${seed.brand}?`,
    symptomsDescription:
      `Estas senales son las mas reportadas en ${seed.brand} y conviene abordarlas antes de que escalen a placa.`,
    symptoms,
    diagnosisTitle: `¿Cómo diagnosticamos un ${seed.brand}?`,
    diagnosisDescription:
      `Aplicamos una secuencia tecnica para ${seed.brand}, separando sintoma visible de causa real sin cambiar piezas de mas.`,
    diagnostics,
    planTitle: `¿Qué plan seguimos para reparar ${seed.brand}?`,
    planDescription:
      `El objetivo es estabilizar ${seed.brand} en uso diario, priorizando la falla que mas afecta rendimiento y autonomia.`,
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
      title: `Reparación de ${seed.brand} en CABA | Team Celular`,
      description:
        seed.metaDescriptionOverride ??
        `Reparación de ${seed.brand} en CABA. Team Celular, Recoleta y Belgrano. Pantalla, batería y carga con diagnóstico el mismo día. Garantía escrita 90 días.`,
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

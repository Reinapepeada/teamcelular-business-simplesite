import type { ZoneLandingConfig } from "./zoneLanding";

export const ZONE_CONFIGS: Record<string, ZoneLandingConfig> = {
  palermo: {
    slug: "palermo",
    zoneName: "Palermo",
    metaTitle: "Reparación de Celulares en Palermo, CABA | Sin Turno",
    metaDescription:
      "Servicio técnico a minutos de Palermo: Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032). Pantalla y batería en 2–4 h, garantía 90 días.",
    socialDescription:
      "Team Celular atiende Palermo desde Recoleta y Belgrano. Pantalla, batería y carga con garantía escrita 90 días.",
    heroBadge: "Cobertura Palermo",
    heroIntro:
      "Si estás en Palermo, la sucursal más cerca depende del lado: desde Palermo Chico, Botánico y Plaza Italia te conviene Recoleta (Paraguay 2451); desde Palermo Hollywood, Las Cañitas y Colegiales, Belgrano (Amenábar 2032). En las dos hay diagnóstico el mismo día, pantalla y batería en 2 a 4 horas y garantía escrita de 90 días.",
    heroImage: "/images/dispositivoshdpro.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(59,130,246,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular desde Palermo. Marca y modelo:",
    highlights: [
      {
        title: "Pantalla que quedó mal",
        desc: "Si el display tiene líneas, manchas o el touch responde a medias, lo revisamos completo antes de darte un camino.",
        icon: "screen",
      },
      {
        title: "Batería que ya no rinde",
        desc: "Cuando el equipo se descarga rápido o se apaga solo, miramos consumo, batería y puerto de carga para no cambiar por cambiar.",
        icon: "battery",
      },
      {
        title: "Fallas que confunden",
        desc: "Si reinicia, no enciende o hace cosas raras, vamos a placa y diagnóstico fino para detectar la causa de verdad.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "Muchos equipos llegan por caidas: pantalla rota, glass trasero o flex dañado.",
      "En iPhone es comun ver bateria degradada y conectores de carga con desgaste.",
      "En Android suele entrar modulo display y problemas de energia por uso intensivo.",
    ],
    transportTip:
      "Desde Palermo podés llegar a Recoleta (Paraguay 2451) por Subte D hasta Pueyrredón (Av. Santa Fe y Pueyrredón), o a Belgrano (Amenábar 2032) por Subte D hasta Juramento. Ambas opciones están a pocas cuadras de la estación.",
    nearbyZones: [
      { name: "Recoleta", slug: "recoleta" },
      { name: "Belgrano", slug: "belgrano" },
      { name: "Caballito", slug: "caballito" },
    ],
    focusServices: ["pantalla", "bateria", "pin de carga", "microelectronica"],
    faqs: [
      {
        q: "¿Cuál es la sucursal más cerca de Palermo?",
        a: "Depende de la zona de Palermo. Plaza Italia y Palermo Chico quedan más cerca de Recoleta (Paraguay 2451); Hollywood, Las Cañitas y Colegiales, de Belgrano (Amenábar 2032). Si no sabés cuál te conviene, escribinos por WhatsApp con tu esquina.",
      },
      {
        q: "¿Qué demora tiene una reparación común?",
        a: "Pantalla, batería o carga suelen resolverse en el día si tenemos stock y el equipo no trae una falla extra escondida.",
      },
      {
        q: "¿Puedo pedir cotización sin ir?",
        a: "Sí. Con marca, modelo y síntomas te damos una orientación clara. Si hace falta revisión física, te lo decimos de frente.",
      },
      {
        q: "¿Trabajan con garantía por escrito?",
        a: "Sí. La reparación sale con garantía escrita de 90 días sobre trabajo y repuesto.",
      },
    ],
  },
  caballito: {
    slug: "caballito",
    // 1 impresion en 26 dias: fuera del indice hasta que haya demanda real.
    noIndex: true,
    zoneName: "Caballito",
    metaTitle: "Arreglo de Celulares en Caballito (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Caballito, CABA. Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y carga el mismo día con garantía escrita 90 días.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Caballito. Pantalla, batería y carga con garantía escrita 90 días.",
    heroBadge: "Cobertura Caballito",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA — Paraguay 2451 Recoleta y Amenábar 2032 Belgrano — y atiende Caballito con diagnóstico el mismo día. Pantalla, batería y carga con garantía escrita de 90 días y presupuesto claro antes de intervenir.",
    heroImage:
      "/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(99,102,241,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular desde Caballito. Marca y modelo:",
    highlights: [
      {
        title: "Pantalla maltratada",
        desc: "Si el equipo quedó con manchas, líneas o el touch responde cuando quiere, revisamos todo el módulo.",
        icon: "screen",
      },
      {
        title: "Carga y flex",
        desc: "Cuando entra y sale la carga o el pin quedó flojo, buscamos la causa para dejarlo bien de una.",
        icon: "repair",
      },
      {
        title: "Placa y energía",
        desc: "Si no enciende, se reinicia o consume más de la cuenta, hacemos diagnóstico técnico de fondo.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "En Caballito vemos equipos con bateria degradada por uso diario intenso.",
      "Tras golpes, aparecen lineas o touch parcial que requieren modulo completo.",
      "Tambien ingresan casos de humedad con necesidad de limpieza y revision interna.",
    ],
    transportTip:
      "Desde Caballito podes combinar subte/colectivo hacia Recoleta. Te pasamos referencia exacta por WhatsApp para que llegues directo.",
    nearbyZones: [
      { name: "Almagro", slug: "almagro" },
      { name: "Balvanera", slug: "balvanera" },
      { name: "Palermo", slug: "palermo" },
    ],
    focusServices: ["pantalla", "bateria", "pin de carga", "placa"],
    faqs: [
      {
        q: "¿Atienden Caballito todos los días hábiles?",
        a: "Sí, atendemos de lunes a viernes y coordinamos por WhatsApp para agilizar el ingreso.",
      },
      {
        q: "¿Puedo pedir presupuesto sin moverme de Caballito?",
        a: "Sí. Con marca, modelo y falla te damos una estimación inicial por WhatsApp.",
      },
      {
        q: "¿Hacen reparaciones en el día?",
        a: "Varias sí, sobre todo pantalla, batería o carga. Los casos de placa llevan más tiempo.",
      },
      {
        q: "¿Qué incluye la garantía?",
        a: "Cubre trabajo y repuesto instalado por 90 días. El alcance queda detallado por escrito al momento de entrega.",
      },
    ],
  },
  almagro: {
    // Sus busquedas en GSC eran ruido (sep 2026): fuera del indice.
    noIndex: true,
    slug: "almagro",
    zoneName: "Almagro",
    metaTitle: "Arreglo de Celulares en Almagro (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Almagro — Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y carga el mismo día, garantía escrita 90 días.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Almagro. Pantalla, batería y carga con garantía escrita 90 días.",
    heroBadge: "Cobertura Almagro",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA — Paraguay 2451 Recoleta y Amenábar 2032 Belgrano — y atiende Almagro con diagnóstico el mismo día. Pantalla, batería y carga con garantía escrita de 90 días sobre trabajo y repuesto.",
    heroImage: "/images/celuPorDentro.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(16,185,129,0.3),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular desde Almagro. Marca y modelo:",
    highlights: [
      {
        title: "Pantalla y vidrio",
        desc: "Reemplazo de modulo con prueba final para entregar el equipo listo para uso.",
        icon: "screen",
      },
      {
        title: "Bateria estable",
        desc: "Validamos si la causa real es bateria, software o consumo anormal.",
        icon: "battery",
      },
      {
        title: "Carga sin falsos contactos",
        desc: "Reparamos pin y flex para recuperar carga firme y segura.",
        icon: "repair",
      },
    ],
    localScenarios: [
      "En Almagro entran muchos equipos por pantalla rota y batería con poca autonomía.",
      "Cuando la carga entra y sale, muchas veces el pin está gastado o el flex ya no da más.",
      "Si hubo humedad o corto, revisamos la placa antes de decirte si la reparación conviene o no.",
    ],
    transportTip:
      "Desde Almagro podés llegar por subte o colectivo hacia Recoleta. En la página de contacto tenés el mapa para no perderte.",
    nearbyZones: [
      { name: "Caballito", slug: "caballito" },
      { name: "Balvanera", slug: "balvanera" },
      { name: "Microcentro", slug: "microcentro" },
    ],
    focusServices: ["pantalla", "bateria", "pin de carga", "diagnostico"],
    faqs: [
      {
        q: "Atienden celulares de Almagro?",
        a: "Si. Atendemos clientes de Almagro en nuestros talleres de Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032).",
      },
      {
        q: "Como cotizo rapido?",
        a: "Envia marca, modelo y falla por WhatsApp y te respondemos con estimacion inicial.",
      },
      {
        q: "Trabajan iPhone y Android?",
        a: "Si, trabajamos iPhone, Samsung, Motorola, Xiaomi y otras marcas segun disponibilidad.",
      },
      {
        q: "El presupuesto tiene costo?",
        a: "No. Si requiere diagnostico fisico previo, te avisamos antes de intervenir.",
      },
    ],
  },
  balvanera: {
    slug: "balvanera",
    zoneName: "Balvanera",
    zoneAlias: "Once y Balvanera",
    // SEO local 2026-09: el texto pasaba el "swap test" (cambiabas el barrio y
    // seguia valiendo). Ahora se apoya en lo que solo vale para Once: la linea H
    // deja a una cuadra de Recoleta y el Sarmiento combina en Plaza Miserere.
    branchSlug: "recoleta",
    metaTitle: "Arreglo de Celulares en Once y Balvanera | A 2 Estaciones por la H",
    metaDescription:
      "Desde Once, la línea H te deja a una cuadra de Team Celular (Paraguay 2451, Recoleta). Pantalla y batería en 2 a 4 horas, sin turno, garantía escrita 90 días.",
    socialDescription:
      "Team Celular queda a dos estaciones de Once por la línea H. Pantalla, batería y carga en el día con garantía escrita 90 días.",
    heroBadge: "Once, Abasto y Balvanera",
    heroIntro:
      "Si estás en Once, el taller más cerca es el de Recoleta: tomás la línea H en Plaza Miserere, bajás dos estaciones después en Córdoba y caminás una cuadra hasta Paraguay 2451. Pantalla y batería salen en 2 a 4 horas, sin turno, con garantía escrita de 90 días.",
    heroImage: "/images/reparacion_placa.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(245,158,11,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Estoy en Once/Balvanera y quiero un presupuesto. Marca y modelo:",
    highlights: [
      {
        title: "Lo dejás a la mañana, lo retirás a la tarde",
        desc: "Pantalla y batería salen en 2 a 4 horas. Si trabajás en Once, lo traés en el viaje y lo retirás a la vuelta.",
        icon: "speed",
      },
      {
        title: "Carga que entra y sale",
        desc: "El pin se gasta con el uso de todo el día. Primero probamos limpieza y ajuste; solo cambiamos si hace falta.",
        icon: "battery",
      },
      {
        title: "Mojado o no enciende",
        desc: "Diagnóstico de placa con microscopio y presupuesto antes de intervenir. Mientras antes llegue, más chances de recuperarlo.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "Si venís en el Sarmiento, bajás en Once y combinás con la línea H en Plaza Miserere sin salir a la calle.",
      "Desde el Abasto, la línea B hasta Pueyrredón combina con la H en Corrientes: una estación más y estás en Córdoba.",
      "Si el celular es tu herramienta de trabajo en el barrio, pedí presupuesto por WhatsApp antes de venir y te decimos si lo tenemos en el día.",
      "Desde Congreso, la línea A te lleva a Plaza Miserere en tres estaciones (Pasco, Alberti, Plaza Miserere) y ahí tomás la H hasta Córdoba.",
    ],
    transportTip:
      "Línea H desde Once (Plaza Miserere): dos estaciones hasta Córdoba, sobre Av. Pueyrredón. Paraguay 2451 queda a una cuadra, entre las estaciones Córdoba y Santa Fe. A pie desde Once son unas 10 cuadras por Pueyrredón.",
    nearbyZones: [
      { name: "Palermo", slug: "palermo" },
      { name: "Almagro", slug: "almagro" },
      { name: "Caballito", slug: "caballito" },
    ],
    focusServices: ["pantalla", "carga", "bateria", "placa"],
    faqs: [
      {
        q: "¿Cuál es la sucursal más cerca de Once?",
        a: "Recoleta, en Paraguay 2451. Por la línea H son dos estaciones desde Once hasta Córdoba, y de ahí una cuadra.",
      },
      {
        q: "¿Cuánto tardo desde el Sarmiento?",
        a: "Bajás en Once y combinás con la H en Plaza Miserere sin salir a la calle: son dos estaciones hasta Córdoba y una cuadra hasta el taller.",
      },
      {
        q: "¿Necesito turno?",
        a: "No. Atendemos de lunes a viernes de 10:30 a 18:00. Si querés asegurarte de que haya repuesto, escribinos antes por WhatsApp con marca y modelo.",
      },
      {
        q: "¿Qué hago si se me mojó el celular?",
        a: "Apagalo, no lo cargues y traelo cuanto antes. Mientras más tarda en llegar, más avanza la corrosión dentro de la placa.",
      },
      {
        q: "¿Siempre hay que cambiar el pin de carga?",
        a: "No. Muchas veces se resuelve con limpieza o ajuste. Lo confirmamos con diagnóstico antes de cambiar nada.",
      },
    ],
  },
  microcentro: {
    slug: "microcentro",
    // 1 impresion en 26 dias: fuera del indice hasta que haya demanda real.
    noIndex: true,
    zoneName: "Microcentro",
    metaTitle: "Arreglo de Celulares en Microcentro (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Microcentro — Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y carga el mismo día, garantía escrita 90 días.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Microcentro. Diagnóstico el mismo día y garantía escrita 90 días.",
    heroBadge: "Cobertura Microcentro",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA — Paraguay 2451 Recoleta y Amenábar 2032 Belgrano — y atiende Microcentro con diagnóstico el mismo día. Pantalla, batería y carga para equipos de trabajo con garantía escrita de 90 días.",
    heroImage: "/images/empresaFamiliar.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(20,184,166,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular desde Microcentro. Marca y modelo:",
    highlights: [
      {
        title: "Reparacion agil",
        desc: "Pantalla, bateria y carga con foco en devolverte el equipo lo antes posible.",
        icon: "speed",
      },
      {
        title: "Diagnostico tecnico",
        desc: "Si hay reinicios, sin señal o sin imagen, revisamos para evitar cambios al azar.",
        icon: "repair",
      },
      {
        title: "Soporte empresas",
        desc: "Si manejas varios equipos, coordinamos flujo de ingreso y facturacion.",
        icon: "business",
      },
    ],
    localScenarios: [
      "En Microcentro se repite desgaste de batería y carga porque el equipo suele ir y venir todo el día.",
      "Cuando el celular es herramienta de trabajo, la prioridad es responder rápido y no marearte con vueltas.",
      "También vemos fallas de placa en equipos que no encienden o se reinician sin explicación clara.",
    ],
    transportTip:
      "Desde Microcentro podés llegar a Recoleta (Paraguay 2451) por Subte D hasta Pueyrredón (Av. Santa Fe y Pueyrredón), o a Belgrano (Amenábar 2032) por Subte D hasta Juramento. Ambas opciones están a pocas cuadras de la estación.",
    nearbyZones: [
      { name: "Balvanera / Once", slug: "balvanera" },
      { name: "Recoleta", slug: "recoleta" },
      { name: "Almagro", slug: "almagro" },
    ],
    focusServices: ["pantalla", "bateria", "carga", "soporte empresas"],
    faqs: [
      {
        q: "Atienden Microcentro?",
        a: "Si. Tenemos dos talleres en CABA — Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032). Coordinamos ingreso por WhatsApp para que vengas directo sin esperar.",
      },
      {
        q: "Pueden emitir factura para empresa?",
        a: "Si. Emitimos factura y podemos organizar flujo de reparaciones para varios equipos.",
      },
      {
        q: "Cuanto tarda un presupuesto?",
        a: "El presupuesto inicial se responde rapido por WhatsApp o formulario. Si hace falta revision fisica, lo aclaramos antes.",
      },
      {
        q: "Tienen garantia escrita?",
        a: "Sí. Cada reparación sale con garantía escrita de 90 días sobre trabajo y repuesto.",
      },
    ],
  },
};

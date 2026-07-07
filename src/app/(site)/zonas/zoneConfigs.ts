import type { ZoneLandingConfig } from "./zoneLanding";

export const ZONE_CONFIGS: Record<string, ZoneLandingConfig> = {
  recoleta: {
    slug: "recoleta",
    zoneName: "Recoleta",
    metaTitle: "Arreglo de Celulares en Recoleta (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Recoleta, CABA. Taller en Paraguay 2451 con diagnÃ³stico el mismo dÃ­a y garantÃ­a escrita de 90 dÃ­as sobre trabajo y repuesto.",
    socialDescription:
      "Pantalla, baterÃ­a, carga y placa en Recoleta. Presupuesto rÃ¡pido y garantÃ­a por escrito.",
    heroBadge: "Atencion local en Recoleta",
    heroIntro:
      "Team Celular, en Paraguay 2451 Recoleta CABA, repara celulares con diagnÃ³stico el mismo dÃ­a, repuestos de calidad y garantÃ­a escrita de 90 dÃ­as sobre trabajo y repuesto. Pantalla, baterÃ­a, carga y placa sin vueltas.",
    heroImage: "/images/teamcelular.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(56,189,248,0.3),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular en Recoleta. Marca y modelo:",
    highlights: [
      {
        title: "Taller en la zona",
        desc: "Podes venir directo a Paraguay 2451 o coordinar por WhatsApp para reducir espera.",
        icon: "business",
      },
      {
        title: "Reparaciones en el dia",
        desc: "Pantalla, bateria y carga suelen resolverse en el dia segun modelo y stock.",
        icon: "speed",
      },
      {
        title: "Microelectronica real",
        desc: "No enciende, reinicios o mojado: trabajamos placa con equipamiento de laboratorio.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "Si tu equipo se mojÃ³, apagalo y no intentes cargarlo antes de traerlo; eso suele empeorar el daÃ±o.",
      "Si ves lÃ­neas, manchas o el touch responde a medias, normalmente ya estamos hablando de cambio de mÃ³dulo.",
      "Cuando la carga entra y sale, revisamos pin, flex y baterÃ­a antes de pasarte un nÃºmero.",
    ],
    transportTip:
      "Nuestro laboratorio estÃ¡ en Paraguay 2451 (Recoleta). Si estÃ¡s cerca, podÃ©s venir caminando; si venÃ­s en transporte pÃºblico, te pasamos la ruta por WhatsApp.",
    nearbyZones: [
      { name: "Palermo", slug: "palermo" },
      { name: "Belgrano", slug: "belgrano" },
      { name: "Microcentro", slug: "microcentro" },
    ],
    focusServices: ["pantalla", "bateria", "carga", "placa"],
    faqs: [
      {
        q: "Donde queda el taller en Recoleta?",
        a: "Estamos en Paraguay 2451, Recoleta, CABA. Horario: lunes a viernes de 10:30 a 18:00.",
      },
      {
        q: "Hacen arreglos en el dia?",
        a: "En muchos casos si. Si tu equipo requiere placa o repuesto especial, te informamos el plazo antes de avanzar.",
      },
      {
        q: "Dan garantia por escrito?",
        a: "SÃ­. Entregamos garantÃ­a escrita de 90 dÃ­as sobre trabajo y repuesto instalado.",
      },
      {
        q: "Como pido presupuesto rapido?",
        a: "Escribinos por WhatsApp con marca, modelo y falla. Si podes, agrega fotos para mejorar la estimacion.",
      },
    ],
  },
  palermo: {
    slug: "palermo",
    zoneName: "Palermo",
    metaTitle: "Arreglo de Celulares en Palermo (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Palermo, CABA â€” Team Celular, Paraguay 2451 Recoleta. Pantalla, baterÃ­a y carga el mismo dÃ­a con garantÃ­a escrita 90 dÃ­as.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Palermo. Pantalla, baterÃ­a y carga con garantÃ­a escrita 90 dÃ­as.",
    heroBadge: "Cobertura Palermo",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA â€” Paraguay 2451 Recoleta y Amenábar 2032 Belgrano â€” y atiende clientes de Palermo con diagnÃ³stico el mismo dÃ­a y garantÃ­a escrita de 90 dÃ­as. Pantalla, baterÃ­a, carga y fallas de placa sin vueltas.",
    heroImage: "/images/dispositivoshdpro.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(59,130,246,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular desde Palermo. Marca y modelo:",
    highlights: [
      {
        title: "Pantalla que quedÃ³ mal",
        desc: "Si el display tiene lÃ­neas, manchas o el touch responde a medias, lo revisamos completo antes de darte un camino.",
        icon: "screen",
      },
      {
        title: "BaterÃ­a que ya no rinde",
        desc: "Cuando el equipo se descarga rÃ¡pido o se apaga solo, miramos consumo, baterÃ­a y puerto de carga para no cambiar por cambiar.",
        icon: "battery",
      },
      {
        title: "Fallas que confunden",
        desc: "Si reinicia, no enciende o hace cosas raras, vamos a placa y diagnÃ³stico fino para detectar la causa de verdad.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "Muchos equipos llegan por caidas: pantalla rota, glass trasero o flex daÃ±ado.",
      "En iPhone es comun ver bateria degradada y conectores de carga con desgaste.",
      "En Android suele entrar modulo display y problemas de energia por uso intensivo.",
    ],
    transportTip:
      "Desde Palermo podÃ©s llegar a Recoleta (Paraguay 2451) por Subte D hasta Callao, o a Belgrano (Amenábar 2032) por Subte D hasta Juramento. Ambas opciones estÃ¡n a pocas cuadras de la estaciÃ³n.",
    nearbyZones: [
      { name: "Recoleta", slug: "recoleta" },
      { name: "Belgrano", slug: "belgrano" },
      { name: "Caballito", slug: "caballito" },
    ],
    focusServices: ["pantalla", "bateria", "pin de carga", "microelectronica"],
    faqs: [
      {
        q: "Â¿Atienden clientes de Palermo?",
        a: "SÃ­. Tenemos sucursales en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032). Palermo entra cÃ³modo a cualquiera de las dos â€” coordinamos por WhatsApp para que no tengas que dar vueltas de mÃ¡s.",
      },
      {
        q: "Â¿QuÃ© demora tiene una reparaciÃ³n comÃºn?",
        a: "Pantalla, baterÃ­a o carga suelen resolverse en el dÃ­a si tenemos stock y el equipo no trae una falla extra escondida.",
      },
      {
        q: "Â¿Puedo pedir cotizaciÃ³n sin ir?",
        a: "SÃ­. Con marca, modelo y sÃ­ntomas te damos una orientaciÃ³n clara. Si hace falta revisiÃ³n fÃ­sica, te lo decimos de frente.",
      },
      {
        q: "Â¿Trabajan con garantÃ­a por escrito?",
        a: "SÃ­. La reparaciÃ³n sale con garantÃ­a escrita de 90 dÃ­as sobre trabajo y repuesto.",
      },
    ],
  },
  belgrano: {
    slug: "belgrano",
    zoneName: "Belgrano",
    metaTitle: "Arreglo de Celulares en Belgrano CABA | Team Celular â€” Amenábar 2032",
    metaDescription:
      "ReparaciÃ³n de celulares en Belgrano CABA â€” Team Celular, Amenábar 2032. Pantalla, baterÃ­a y carga el mismo dÃ­a con diagnÃ³stico tÃ©cnico y garantÃ­a escrita 90 dÃ­as.",
    socialDescription:
      "Team Celular Belgrano, Amenábar 2032 CABA. Pantalla, baterÃ­a y placa con diagnÃ³stico el mismo dÃ­a y garantÃ­a escrita 90 dÃ­as.",
    heroBadge: "Sucursal en Belgrano Â· Amenábar 2032",
    heroIntro:
      "Team Celular tiene sucursal en Amenábar 2032, Belgrano CABA. Reparamos celulares con diagnÃ³stico el mismo dÃ­a, pantalla y baterÃ­a en 2â€“4 h, y garantÃ­a escrita de 90 dÃ­as sobre trabajo y repuesto. Lunes a viernes 10:30â€“18:00.",
    heroImage: "/images/celuPorDentro.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(14,165,233,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular en Belgrano (Amenábar 2032). Marca y modelo:",
    highlights: [
      {
        title: "Sucursal fÃ­sica en Belgrano",
        desc: "Amenábar 2032, a pocas cuadras del Subte D Juramento. Sin viaje hasta Recoleta.",
        icon: "business",
      },
      {
        title: "Carga y conectores",
        desc: "Cuando el pin estÃ¡ flojo o la carga entra y sale, buscamos la causa real para que no vuelvas por lo mismo.",
        icon: "repair",
      },
      {
        title: "DiagnÃ³stico de placa",
        desc: "Si se reinicia, se apaga o da fallas raras, vamos a hardware con instrumental de laboratorio para no adivinar.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "En Belgrano vemos mucho equipo de uso diario con pantalla rota y baterÃ­a ya muy gastada.",
      "TambiÃ©n aparecen pines de carga flojos por uso fuerte y por cargarlos todos los dÃ­as al lÃ­mite.",
      "Si hubo golpe o humedad, revisamos la placa para decirte si conviene reparar o no.",
    ],
    transportTip:
      "La sucursal Belgrano estÃ¡ en Amenábar 2032, a pocas cuadras del Subte D (estaciÃ³n Juramento). TambiÃ©n podÃ©s llegar en colectivo o en auto â€” hay estacionamiento disponible en la cuadra.",
    nearbyZones: [
      { name: "Palermo", slug: "palermo" },
      { name: "Recoleta", slug: "recoleta" },
      { name: "Microcentro", slug: "microcentro" },
    ],
    focusServices: ["pantalla", "bateria", "carga", "diagnostico placa"],
    faqs: [
      {
        q: "Â¿DÃ³nde queda la sucursal de Belgrano?",
        a: "En Amenábar 2032, Belgrano, CABA. Horario: lunes a viernes de 10:30 a 18:00.",
      },
      {
        q: "Â¿QuÃ© pasa si el equipo no enciende?",
        a: "Hacemos diagnÃ³stico tÃ©cnico para ver si el problema estÃ¡ en placa, energÃ­a o en un componente puntual. El diagnÃ³stico se informa antes de intervenir.",
      },
      {
        q: "Â¿Puedo cotizar por WhatsApp antes de ir a Belgrano?",
        a: "SÃ­. Escribinos con marca, modelo y falla para agilizar el diagnÃ³stico y evitar esperas en sucursal.",
      },
      {
        q: "Â¿Entregan garantÃ­a por escrito en Belgrano?",
        a: "SÃ­. Cada reparaciÃ³n sale con garantÃ­a escrita de 90 dÃ­as sobre trabajo y repuesto instalado.",
      },
    ],
  },
  caballito: {
    slug: "caballito",
    zoneName: "Caballito",
    metaTitle: "Arreglo de Celulares en Caballito (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Caballito, CABA. Team Celular, Paraguay 2451 Recoleta. Pantalla, baterÃ­a y carga el mismo dÃ­a con garantÃ­a escrita 90 dÃ­as.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Caballito. Pantalla, baterÃ­a y carga con garantÃ­a escrita 90 dÃ­as.",
    heroBadge: "Cobertura Caballito",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA â€” Paraguay 2451 Recoleta y Amenábar 2032 Belgrano â€” y atiende Caballito con diagnÃ³stico el mismo dÃ­a. Pantalla, baterÃ­a y carga con garantÃ­a escrita de 90 dÃ­as y presupuesto claro antes de intervenir.",
    heroImage:
      "/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(99,102,241,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular desde Caballito. Marca y modelo:",
    highlights: [
      {
        title: "Pantalla maltratada",
        desc: "Si el equipo quedÃ³ con manchas, lÃ­neas o el touch responde cuando quiere, revisamos todo el mÃ³dulo.",
        icon: "screen",
      },
      {
        title: "Carga y flex",
        desc: "Cuando entra y sale la carga o el pin quedÃ³ flojo, buscamos la causa para dejarlo bien de una.",
        icon: "repair",
      },
      {
        title: "Placa y energÃ­a",
        desc: "Si no enciende, se reinicia o consume mÃ¡s de la cuenta, hacemos diagnÃ³stico tÃ©cnico de fondo.",
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
        q: "Â¿Atienden Caballito todos los dÃ­as hÃ¡biles?",
        a: "SÃ­, atendemos de lunes a viernes y coordinamos por WhatsApp para agilizar el ingreso.",
      },
      {
        q: "Â¿Puedo pedir presupuesto sin moverme de Caballito?",
        a: "SÃ­. Con marca, modelo y falla te damos una estimaciÃ³n inicial por WhatsApp.",
      },
      {
        q: "Â¿Hacen reparaciones en el dÃ­a?",
        a: "Varias sÃ­, sobre todo pantalla, baterÃ­a o carga. Los casos de placa llevan mÃ¡s tiempo.",
      },
      {
        q: "Â¿QuÃ© incluye la garantÃ­a?",
        a: "Cubre trabajo y repuesto instalado por 90 dÃ­as. El alcance queda detallado por escrito al momento de entrega.",
      },
    ],
  },
  almagro: {
    slug: "almagro",
    zoneName: "Almagro",
    metaTitle: "Arreglo de Celulares en Almagro (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Almagro â€” Team Celular, Paraguay 2451 Recoleta. Pantalla, baterÃ­a y carga el mismo dÃ­a, garantÃ­a escrita 90 dÃ­as.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Almagro. Pantalla, baterÃ­a y carga con garantÃ­a escrita 90 dÃ­as.",
    heroBadge: "Cobertura Almagro",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA â€” Paraguay 2451 Recoleta y Amenábar 2032 Belgrano â€” y atiende Almagro con diagnÃ³stico el mismo dÃ­a. Pantalla, baterÃ­a y carga con garantÃ­a escrita de 90 dÃ­as sobre trabajo y repuesto.",
    heroImage: "/images/equipoCall.webp",
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
      "En Almagro entran muchos equipos por pantalla rota y baterÃ­a con poca autonomÃ­a.",
      "Cuando la carga entra y sale, muchas veces el pin estÃ¡ gastado o el flex ya no da mÃ¡s.",
      "Si hubo humedad o corto, revisamos la placa antes de decirte si la reparaciÃ³n conviene o no.",
    ],
    transportTip:
      "Desde Almagro podÃ©s llegar por subte o colectivo hacia Recoleta. En la pÃ¡gina de contacto tenÃ©s el mapa para no perderte.",
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
    zoneAlias: "Balvanera / Once",
    metaTitle: "Arreglo de Celulares en Balvanera (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Balvanera y Once, CABA. Team Celular, Paraguay 2451 Recoleta. Pantalla, carga y baterÃ­a con garantÃ­a escrita 90 dÃ­as.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Balvanera y Once. Pantalla, baterÃ­a y carga con garantÃ­a escrita 90 dÃ­as.",
    heroBadge: "Cobertura Balvanera / Once",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA â€” Paraguay 2451 Recoleta y Amenábar 2032 Belgrano â€” y atiende Balvanera y Once con diagnÃ³stico el mismo dÃ­a. Pantalla, baterÃ­a, carga y casos de placa con garantÃ­a escrita de 90 dÃ­as.",
    heroImage: "/images/cargadores.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(245,158,11,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular desde Balvanera/Once. Marca y modelo:",
    highlights: [
      {
        title: "Pantalla y modulo",
        desc: "Display sin imagen o touch fallando: cambio completo con pruebas funcionales.",
        icon: "screen",
      },
      {
        title: "Carga y bateria",
        desc: "Pin, flex y autonomia de bateria con diagnostico para evitar gasto innecesario.",
        icon: "battery",
      },
      {
        title: "ReparaciÃ³n de placa",
        desc: "Mojado, corto o no enciende: diagnÃ³stico con equipamiento de laboratorio y presupuesto antes de intervenir.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "En Balvanera y Once se repiten equipos con carga gastada por uso continuo y cables que ya no hacen buen contacto.",
      "Si el telÃ©fono se mojÃ³, apagalo y traelo rÃ¡pido: mientras mÃ¡s tarde, mÃ¡s se corroe adentro.",
      "Las fallas intermitentes las miramos con diagnÃ³stico tÃ©cnico para no mezclar software con hardware.",
    ],
    transportTip:
      "Desde Once o Balvanera llegÃ¡s rÃ¡pido en colectivo o combinando subte. Te compartimos el punto exacto para evitar vueltas de mÃ¡s.",
    nearbyZones: [
      { name: "Almagro", slug: "almagro" },
      { name: "Caballito", slug: "caballito" },
      { name: "Microcentro", slug: "microcentro" },
    ],
    focusServices: ["pantalla", "carga", "bateria", "placa"],
    faqs: [
      {
        q: "Atienden Balvanera y Once?",
        a: "Si. Cubrimos ambas zonas con atencion en talleres fisicos en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032).",
      },
      {
        q: "Que hago si se mojo el celular?",
        a: "Apagalo, no lo cargues y traelo cuanto antes para mejorar probabilidad de recuperacion.",
      },
      {
        q: "Siempre se cambia el pin de carga?",
        a: "No siempre. A veces se resuelve con limpieza o ajuste. Confirmamos con diagnostico.",
      },
      {
        q: "Como llego al taller desde Once?",
        a: "Tenemos dos sucursales: Paraguay 2451 Recoleta y Amenábar 2032 Belgrano. En la pÃ¡gina de contacto tenÃ©s mapa y recorrido recomendado para cada una.",
      },
    ],
  },
  microcentro: {
    slug: "microcentro",
    zoneName: "Microcentro",
    metaTitle: "Arreglo de Celulares en Microcentro (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Microcentro â€” Team Celular, Paraguay 2451 Recoleta. Pantalla, baterÃ­a y carga el mismo dÃ­a, garantÃ­a escrita 90 dÃ­as.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Microcentro. DiagnÃ³stico el mismo dÃ­a y garantÃ­a escrita 90 dÃ­as.",
    heroBadge: "Cobertura Microcentro",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA â€” Paraguay 2451 Recoleta y Amenábar 2032 Belgrano â€” y atiende Microcentro con diagnÃ³stico el mismo dÃ­a. Pantalla, baterÃ­a y carga para equipos de trabajo con garantÃ­a escrita de 90 dÃ­as.",
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
        desc: "Si hay reinicios, sin seÃ±al o sin imagen, revisamos para evitar cambios al azar.",
        icon: "repair",
      },
      {
        title: "Soporte empresas",
        desc: "Si manejas varios equipos, coordinamos flujo de ingreso y facturacion.",
        icon: "business",
      },
    ],
    localScenarios: [
      "En Microcentro se repite desgaste de baterÃ­a y carga porque el equipo suele ir y venir todo el dÃ­a.",
      "Cuando el celular es herramienta de trabajo, la prioridad es responder rÃ¡pido y no marearte con vueltas.",
      "TambiÃ©n vemos fallas de placa en equipos que no encienden o se reinician sin explicaciÃ³n clara.",
    ],
    transportTip:
      "Desde Microcentro podÃ©s llegar a Recoleta (Paraguay 2451) por Subte D hasta Callao, o a Belgrano (Amenábar 2032) por Subte D hasta Juramento. Ambas opciones estÃ¡n a pocas cuadras de la estaciÃ³n.",
    nearbyZones: [
      { name: "Balvanera / Once", slug: "balvanera" },
      { name: "Recoleta", slug: "recoleta" },
      { name: "Almagro", slug: "almagro" },
    ],
    focusServices: ["pantalla", "bateria", "carga", "soporte empresas"],
    faqs: [
      {
        q: "Atienden Microcentro?",
        a: "Si. Tenemos dos talleres en CABA â€” Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032). Coordinamos ingreso por WhatsApp para que vengas directo sin esperar.",
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
        a: "SÃ­. Cada reparaciÃ³n sale con garantÃ­a escrita de 90 dÃ­as sobre trabajo y repuesto.",
      },
    ],
  },
};

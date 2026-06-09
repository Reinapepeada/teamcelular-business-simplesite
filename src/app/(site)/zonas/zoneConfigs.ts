import type { ZoneLandingConfig } from "./zoneLanding";

export const ZONE_CONFIGS: Record<string, ZoneLandingConfig> = {
  recoleta: {
    slug: "recoleta",
    zoneName: "Recoleta",
    metaTitle: "Arreglo de Celulares en Recoleta (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Recoleta, CABA. Taller en Paraguay 2451 con diagnóstico el mismo día y garantía escrita de 90 días sobre trabajo y repuesto.",
    socialDescription:
      "Pantalla, batería, carga y placa en Recoleta. Presupuesto rápido y garantía por escrito.",
    heroBadge: "Atencion local en Recoleta",
    heroIntro:
      "Team Celular, en Paraguay 2451 Recoleta CABA, repara celulares con diagnóstico el mismo día, repuestos de calidad y garantía escrita de 90 días sobre trabajo y repuesto. Pantalla, batería, carga y placa sin vueltas.",
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
      "Si tu equipo se mojó, apagalo y no intentes cargarlo antes de traerlo; eso suele empeorar el daño.",
      "Si ves líneas, manchas o el touch responde a medias, normalmente ya estamos hablando de cambio de módulo.",
      "Cuando la carga entra y sale, revisamos pin, flex y batería antes de pasarte un número.",
    ],
    transportTip:
      "Nuestro laboratorio está en Paraguay 2451 (Recoleta). Si estás cerca, podés venir caminando; si venís en transporte público, te pasamos la ruta por WhatsApp.",
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
        a: "Sí. Entregamos garantía escrita de 90 días sobre trabajo y repuesto instalado.",
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
      "Arreglo de celulares en Palermo, CABA — Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y carga el mismo día con garantía escrita 90 días.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Palermo. Pantalla, batería y carga con garantía escrita 90 días.",
    heroBadge: "Cobertura Palermo",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA — Paraguay 2451 Recoleta y Amenábar 2030 Belgrano — y atiende clientes de Palermo con diagnóstico el mismo día y garantía escrita de 90 días. Pantalla, batería, carga y fallas de placa sin vueltas.",
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
      "Desde Palermo podés llegar a Recoleta (Paraguay 2451) por Subte D hasta Callao, o a Belgrano (Amenábar 2030) por Subte D hasta Juramento. Ambas opciones están a pocas cuadras de la estación.",
    nearbyZones: [
      { name: "Recoleta", slug: "recoleta" },
      { name: "Belgrano", slug: "belgrano" },
      { name: "Caballito", slug: "caballito" },
    ],
    focusServices: ["pantalla", "bateria", "pin de carga", "microelectronica"],
    faqs: [
      {
        q: "¿Atienden clientes de Palermo?",
        a: "Sí. Tenemos sucursales en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2030). Palermo entra cómodo a cualquiera de las dos — coordinamos por WhatsApp para que no tengas que dar vueltas de más.",
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
  belgrano: {
    slug: "belgrano",
    zoneName: "Belgrano",
    metaTitle: "Arreglo de Celulares en Belgrano CABA | Team Celular — Amenábar 2030",
    metaDescription:
      "Reparación de celulares en Belgrano CABA — Team Celular, Amenábar 2030. Pantalla, batería y carga el mismo día con diagnóstico técnico y garantía escrita 90 días.",
    socialDescription:
      "Team Celular Belgrano, Amenábar 2030 CABA. Pantalla, batería y placa con diagnóstico el mismo día y garantía escrita 90 días.",
    heroBadge: "Sucursal en Belgrano · Amenábar 2030",
    heroIntro:
      "Team Celular tiene sucursal en Amenábar 2030, Belgrano CABA. Reparamos celulares con diagnóstico el mismo día, pantalla y batería en 2–4 h, y garantía escrita de 90 días sobre trabajo y repuesto. Lunes a viernes 10:30–18:00.",
    heroImage: "/images/celuPorDentro.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(14,165,233,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular en Belgrano (Amenábar 2030). Marca y modelo:",
    highlights: [
      {
        title: "Sucursal física en Belgrano",
        desc: "Amenábar 2030, a pocas cuadras del Subte D Juramento. Sin viaje hasta Recoleta.",
        icon: "business",
      },
      {
        title: "Carga y conectores",
        desc: "Cuando el pin está flojo o la carga entra y sale, buscamos la causa real para que no vuelvas por lo mismo.",
        icon: "repair",
      },
      {
        title: "Diagnóstico de placa",
        desc: "Si se reinicia, se apaga o da fallas raras, vamos a hardware con instrumental de laboratorio para no adivinar.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "En Belgrano vemos mucho equipo de uso diario con pantalla rota y batería ya muy gastada.",
      "También aparecen pines de carga flojos por uso fuerte y por cargarlos todos los días al límite.",
      "Si hubo golpe o humedad, revisamos la placa para decirte si conviene reparar o no.",
    ],
    transportTip:
      "La sucursal Belgrano está en Amenábar 2030, a pocas cuadras del Subte D (estación Juramento). También podés llegar en colectivo o en auto — hay estacionamiento disponible en la cuadra.",
    nearbyZones: [
      { name: "Palermo", slug: "palermo" },
      { name: "Recoleta", slug: "recoleta" },
      { name: "Microcentro", slug: "microcentro" },
    ],
    focusServices: ["pantalla", "bateria", "carga", "diagnostico placa"],
    faqs: [
      {
        q: "¿Dónde queda la sucursal de Belgrano?",
        a: "En Amenábar 2030, Belgrano, CABA. Horario: lunes a viernes de 10:30 a 18:00.",
      },
      {
        q: "¿Qué pasa si el equipo no enciende?",
        a: "Hacemos diagnóstico técnico para ver si el problema está en placa, energía o en un componente puntual. El diagnóstico se informa antes de intervenir.",
      },
      {
        q: "¿Puedo cotizar por WhatsApp antes de ir a Belgrano?",
        a: "Sí. Escribinos con marca, modelo y falla para agilizar el diagnóstico y evitar esperas en sucursal.",
      },
      {
        q: "¿Entregan garantía por escrito en Belgrano?",
        a: "Sí. Cada reparación sale con garantía escrita de 90 días sobre trabajo y repuesto instalado.",
      },
    ],
  },
  caballito: {
    slug: "caballito",
    zoneName: "Caballito",
    metaTitle: "Arreglo de Celulares en Caballito (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Caballito, CABA. Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y carga el mismo día con garantía escrita 90 días.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Caballito. Pantalla, batería y carga con garantía escrita 90 días.",
    heroBadge: "Cobertura Caballito",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA — Paraguay 2451 Recoleta y Amenábar 2030 Belgrano — y atiende Caballito con diagnóstico el mismo día. Pantalla, batería y carga con garantía escrita de 90 días y presupuesto claro antes de intervenir.",
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
    slug: "almagro",
    zoneName: "Almagro",
    metaTitle: "Arreglo de Celulares en Almagro (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Almagro — Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y carga el mismo día, garantía escrita 90 días.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Almagro. Pantalla, batería y carga con garantía escrita 90 días.",
    heroBadge: "Cobertura Almagro",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA — Paraguay 2451 Recoleta y Amenábar 2030 Belgrano — y atiende Almagro con diagnóstico el mismo día. Pantalla, batería y carga con garantía escrita de 90 días sobre trabajo y repuesto.",
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
        a: "Si. Atendemos clientes de Almagro en nuestros talleres de Recoleta (Paraguay 2451) y Belgrano (Amenábar 2030).",
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
      "Arreglo de celulares en Balvanera y Once, CABA. Team Celular, Paraguay 2451 Recoleta. Pantalla, carga y batería con garantía escrita 90 días.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Balvanera y Once. Pantalla, batería y carga con garantía escrita 90 días.",
    heroBadge: "Cobertura Balvanera / Once",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA — Paraguay 2451 Recoleta y Amenábar 2030 Belgrano — y atiende Balvanera y Once con diagnóstico el mismo día. Pantalla, batería, carga y casos de placa con garantía escrita de 90 días.",
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
        title: "Reparación de placa",
        desc: "Mojado, corto o no enciende: diagnóstico con equipamiento de laboratorio y presupuesto antes de intervenir.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "En Balvanera y Once se repiten equipos con carga gastada por uso continuo y cables que ya no hacen buen contacto.",
      "Si el teléfono se mojó, apagalo y traelo rápido: mientras más tarde, más se corroe adentro.",
      "Las fallas intermitentes las miramos con diagnóstico técnico para no mezclar software con hardware.",
    ],
    transportTip:
      "Desde Once o Balvanera llegás rápido en colectivo o combinando subte. Te compartimos el punto exacto para evitar vueltas de más.",
    nearbyZones: [
      { name: "Almagro", slug: "almagro" },
      { name: "Caballito", slug: "caballito" },
      { name: "Microcentro", slug: "microcentro" },
    ],
    focusServices: ["pantalla", "carga", "bateria", "placa"],
    faqs: [
      {
        q: "Atienden Balvanera y Once?",
        a: "Si. Cubrimos ambas zonas con atencion en talleres fisicos en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2030).",
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
        a: "Tenemos dos sucursales: Paraguay 2451 Recoleta y Amenábar 2030 Belgrano. En la página de contacto tenés mapa y recorrido recomendado para cada una.",
      },
    ],
  },
  microcentro: {
    slug: "microcentro",
    zoneName: "Microcentro",
    metaTitle: "Arreglo de Celulares en Microcentro (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Microcentro — Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y carga el mismo día, garantía escrita 90 días.",
    socialDescription:
      "Team Celular, Recoleta CABA, atiende Microcentro. Diagnóstico el mismo día y garantía escrita 90 días.",
    heroBadge: "Cobertura Microcentro",
    heroIntro:
      "Team Celular tiene dos sucursales en CABA — Paraguay 2451 Recoleta y Amenábar 2030 Belgrano — y atiende Microcentro con diagnóstico el mismo día. Pantalla, batería y carga para equipos de trabajo con garantía escrita de 90 días.",
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
      "Desde Microcentro podés llegar a Recoleta (Paraguay 2451) por Subte D hasta Callao, o a Belgrano (Amenábar 2030) por Subte D hasta Juramento. Ambas opciones están a pocas cuadras de la estación.",
    nearbyZones: [
      { name: "Balvanera / Once", slug: "balvanera" },
      { name: "Recoleta", slug: "recoleta" },
      { name: "Almagro", slug: "almagro" },
    ],
    focusServices: ["pantalla", "bateria", "carga", "soporte empresas"],
    faqs: [
      {
        q: "Atienden Microcentro?",
        a: "Si. Tenemos dos talleres en CABA — Recoleta (Paraguay 2451) y Belgrano (Amenábar 2030). Coordinamos ingreso por WhatsApp para que vengas directo sin esperar.",
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

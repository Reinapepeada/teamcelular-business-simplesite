import type { ZoneLandingConfig } from "./zoneLanding";

export const ZONE_CONFIGS: Record<string, ZoneLandingConfig> = {
  recoleta: {
    slug: "recoleta",
    zoneName: "Recoleta",
    metaTitle: "Arreglo de Celulares en Recoleta (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares en Recoleta, CABA: pantalla, bateria, pin de carga, camaras, audio y microelectronica. Taller en Paraguay 2451 con garantia escrita.",
    socialDescription:
      "Pantalla, bateria, carga y placa en Recoleta. Presupuesto rapido con garantia por escrito.",
    heroBadge: "Atencion local en Recoleta",
    heroIntro:
      "Si estas en Recoleta y buscas arreglo de celulares, te atendemos en nuestro taller con diagnostico profesional, repuestos de calidad y garantia por escrito.",
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
      "Si tu equipo se mojo, apaga el telefono y no lo cargues antes de traerlo.",
      "Si hay lineas, manchas o touch parcial, suele requerir cambio de modulo completo.",
      "Si carga intermitente, validamos pin, flex y estado de bateria antes de cotizar.",
    ],
    transportTip:
      "Nuestro laboratorio esta en Paraguay 2451 (Recoleta). Si estas cerca, podes acercarte caminando; si venis en transporte publico, te pasamos la ruta por WhatsApp.",
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
        a: "Si. Te entregamos garantia por escrito con alcance y plazo segun la reparacion realizada.",
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
      "Arreglo de celulares para Palermo, CABA: pantalla, bateria, pin de carga y microelectronica. Taller en Recoleta con garantia escrita y presupuesto rapido.",
    socialDescription:
      "Servicio tecnico para Palermo con presupuesto rapido por WhatsApp y garantia por escrito.",
    heroBadge: "Cobertura Palermo",
    heroIntro:
      "Atendemos clientes de Palermo con foco en resolucion rapida para equipos de uso diario: pantalla, bateria, carga y fallas de placa.",
    heroImage: "/images/dispositivoshdpro.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(59,130,246,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular desde Palermo. Marca y modelo:",
    highlights: [
      {
        title: "Pantalla y touch",
        desc: "Modulo completo con pruebas de brillo, tactil y sensores antes de entrega.",
        icon: "screen",
      },
      {
        title: "Bateria y carga",
        desc: "Revisamos consumo, pin y bateria para evitar cambiar piezas innecesarias.",
        icon: "battery",
      },
      {
        title: "Casos complejos",
        desc: "Si se reinicia o no enciende, hacemos diagnostico de placa con microscopio.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "Muchos equipos llegan por caidas: pantalla rota, glass trasero o flex dañado.",
      "En iPhone es comun ver bateria degradada y conectores de carga con desgaste.",
      "En Android suele entrar modulo display y problemas de energia por uso intensivo.",
    ],
    transportTip:
      "Desde Palermo suele ser comodo Subte D hasta Callao y caminar unas cuadras. Si venis en auto, recomendamos validar trafico antes de salir.",
    nearbyZones: [
      { name: "Recoleta", slug: "recoleta" },
      { name: "Belgrano", slug: "belgrano" },
      { name: "Caballito", slug: "caballito" },
    ],
    focusServices: ["pantalla", "bateria", "pin de carga", "microelectronica"],
    faqs: [
      {
        q: "Atienden Palermo aunque el taller este en Recoleta?",
        a: "Si. Atendemos Palermo todos los dias habiles y coordinamos por WhatsApp para reducir tiempos.",
      },
      {
        q: "Que demora tiene una reparacion comun?",
        a: "Pantalla, bateria o carga suelen resolverse en el dia segun stock y cola de trabajo.",
      },
      {
        q: "Se puede pedir cotizacion sin ir?",
        a: "Si. Te damos un presupuesto orientativo con marca, modelo y sintomas. Si hace falta, pedimos revision fisica.",
      },
      {
        q: "Trabajan garantia por escrito?",
        a: "Si. Todas las reparaciones se entregan con garantia escrita y detalle de cobertura.",
      },
    ],
  },
  belgrano: {
    slug: "belgrano",
    zoneName: "Belgrano",
    metaTitle: "Arreglo de Celulares en Belgrano (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares para Belgrano, CABA: pantalla, bateria, carga y diagnostico de placa. Taller en Recoleta con garantia por escrito y presupuesto rapido.",
    socialDescription:
      "Soporte tecnico para Belgrano con reparaciones de pantalla, bateria, carga y placa.",
    heroBadge: "Cobertura Belgrano",
    heroIntro:
      "Si estas en Belgrano, te ayudamos con reparaciones de alto uso: pantalla, bateria, conectores y placa, con proceso claro desde el presupuesto.",
    heroImage: "/images/celuPorDentro.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(14,165,233,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular desde Belgrano. Marca y modelo:",
    highlights: [
      {
        title: "Pantallas premium",
        desc: "Display sin imagen, lineas o touch fallando: reemplazo y test funcional completo.",
        icon: "screen",
      },
      {
        title: "Carga y conectores",
        desc: "Pin, flex y conectores con solucion prolija para evitar falsos contactos.",
        icon: "repair",
      },
      {
        title: "Diagnostico de placa",
        desc: "Cuando hay fallas intermitentes, revisamos hardware y software para detectar la causa real.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "Muchos casos de Belgrano llegan por pantalla rota y bateria degradada.",
      "En equipos de uso laboral, es comun desgaste de pin de carga y flex.",
      "Golpes fuertes o humedad pueden derivar en trabajos de microelectronica.",
    ],
    transportTip:
      "Desde Belgrano suele resultar practico venir por Subte D hacia Callao y completar el tramo final a pie o en colectivo.",
    nearbyZones: [
      { name: "Palermo", slug: "palermo" },
      { name: "Recoleta", slug: "recoleta" },
      { name: "Microcentro", slug: "microcentro" },
    ],
    focusServices: ["pantalla", "bateria", "carga", "diagnostico placa"],
    faqs: [
      {
        q: "Reparan celulares para Belgrano?",
        a: "Si. Atendemos clientes de Belgrano y toda CABA con taller fisico en Recoleta.",
      },
      {
        q: "Que pasa si el equipo no enciende?",
        a: "Hacemos diagnostico tecnico para confirmar si la falla es de placa, energia o componente puntual.",
      },
      {
        q: "Puedo cotizar por WhatsApp?",
        a: "Si. Te respondemos con una estimacion inicial y pasos siguientes segun el caso.",
      },
      {
        q: "Entregan garantia por escrito?",
        a: "Si. Queda asentada en cada reparacion con alcance y plazo.",
      },
    ],
  },
  caballito: {
    slug: "caballito",
    zoneName: "Caballito",
    metaTitle: "Arreglo de Celulares en Caballito (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares para Caballito, CABA: pantalla, bateria, carga y reparacion de placa. Taller en Recoleta con garantia por escrito y presupuesto rapido.",
    socialDescription:
      "Servicio tecnico para Caballito con foco en pantalla, energia, carga y microelectronica.",
    heroBadge: "Cobertura Caballito",
    heroIntro:
      "Brindamos soporte tecnico para Caballito con enfoque en tiempo de resolucion y transparencia: te explicamos opciones antes de reparar.",
    heroImage:
      "/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp",
    heroGlowClass:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(99,102,241,0.32),transparent_44%)]",
    whatsappText:
      "Hola! Quiero un presupuesto para arreglo de celular desde Caballito. Marca y modelo:",
    highlights: [
      {
        title: "Cambio de pantalla",
        desc: "Pantalla rota, touch parcial o manchas: reemplazo con control de calidad.",
        icon: "screen",
      },
      {
        title: "Carga y flex",
        desc: "Resolvemos carga intermitente, falso contacto y flex dañados segun modelo.",
        icon: "repair",
      },
      {
        title: "Placa y energia",
        desc: "No enciende, se reinicia o consume de mas: diagnostico tecnico de fondo.",
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
        q: "Atienden Caballito todos los dias habiles?",
        a: "Si, atendemos de lunes a viernes y coordinamos por WhatsApp para agilizar el ingreso.",
      },
      {
        q: "Puedo pedir presupuesto sin moverme de Caballito?",
        a: "Si. Con marca, modelo y falla te damos una estimacion inicial por WhatsApp.",
      },
      {
        q: "Hacen reparaciones en el dia?",
        a: "Varias si, especialmente pantalla, bateria o carga. Casos de placa requieren mas tiempo.",
      },
      {
        q: "Que incluye la garantia?",
        a: "Incluye cobertura del trabajo realizado segun tipo de reparacion y repuesto instalado.",
      },
    ],
  },
  almagro: {
    slug: "almagro",
    zoneName: "Almagro",
    metaTitle: "Arreglo de Celulares en Almagro (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares para Almagro, CABA: pantalla, bateria y pin de carga. Taller en Recoleta con garantia por escrito y presupuesto rapido.",
    socialDescription:
      "Servicio tecnico para Almagro: pantalla, bateria, carga y diagnostico de placa.",
    heroBadge: "Cobertura Almagro",
    heroIntro:
      "Si estas en Almagro, resolvemos reparaciones frecuentes con diagnostico claro y seguimiento directo para que sepas tiempos reales.",
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
      "En Almagro entran muchos equipos por pantalla rota y bateria de baja autonomia.",
      "Cuando hay carga intermitente, suele ser pin desgastado o flex afectado.",
      "Si hubo humedad o corto, revisamos placa para medir viabilidad de reparacion.",
    ],
    transportTip:
      "Desde Almagro podes llegar por subte y colectivo hacia Recoleta. En la pagina de contacto tenes el mapa para ruta exacta.",
    nearbyZones: [
      { name: "Caballito", slug: "caballito" },
      { name: "Balvanera", slug: "balvanera" },
      { name: "Microcentro", slug: "microcentro" },
    ],
    focusServices: ["pantalla", "bateria", "pin de carga", "diagnostico"],
    faqs: [
      {
        q: "Atienden celulares de Almagro?",
        a: "Si. Atendemos clientes de Almagro en nuestro taller de Recoleta.",
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
      "Arreglo de celulares para Balvanera/Once, CABA: pantalla, bateria, carga y microelectronica. Taller en Recoleta con garantia por escrito y presupuesto rapido.",
    socialDescription:
      "Servicio tecnico para Balvanera/Once con reparaciones de alto uso y garantia escrita.",
    heroBadge: "Cobertura Balvanera / Once",
    heroIntro:
      "Para Balvanera y Once resolvemos fallas tipicas de uso intensivo: pantalla, bateria, carga y casos complejos de placa.",
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
        title: "Reparacion avanzada",
        desc: "Mojado, corto o no enciende: trabajamos placa segun viabilidad tecnica.",
        icon: "chip",
      },
    ],
    localScenarios: [
      "En Balvanera/Once se repiten equipos con carga desgastada por uso continuo.",
      "Si el telefono se mojo, es clave apagarlo y traerlo rapido para reducir corrosion.",
      "Fallas intermitentes se revisan con diagnostico tecnico para separar software y hardware.",
    ],
    transportTip:
      "Desde Once/Balvanera llegas rapido en colectivo o combinando subte. Te compartimos el punto exacto para evitar vueltas.",
    nearbyZones: [
      { name: "Almagro", slug: "almagro" },
      { name: "Caballito", slug: "caballito" },
      { name: "Microcentro", slug: "microcentro" },
    ],
    focusServices: ["pantalla", "carga", "bateria", "placa"],
    faqs: [
      {
        q: "Atienden Balvanera y Once?",
        a: "Si. Cubrimos ambas zonas con atencion en taller fisico en Recoleta.",
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
        a: "Estamos en Paraguay 2451, Recoleta. En contacto tenes mapa y recorrido recomendado.",
      },
    ],
  },
  microcentro: {
    slug: "microcentro",
    zoneName: "Microcentro",
    metaTitle: "Arreglo de Celulares en Microcentro (CABA) | Team Celular",
    metaDescription:
      "Arreglo de celulares para Microcentro, CABA: pantalla, bateria, carga y microelectronica. Taller en Recoleta con garantia por escrito y presupuesto rapido.",
    socialDescription:
      "Servicio tecnico para Microcentro con foco en tiempos rapidos para equipos de trabajo.",
    heroBadge: "Cobertura Microcentro",
    heroIntro:
      "Si tu celular es herramienta de trabajo en Microcentro, priorizamos diagnostico rapido, presupuesto claro y tiempos realistas para minimizar impacto operativo.",
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
      "En Microcentro se repite desgaste de bateria y carga por uso intensivo.",
      "Cuando el equipo es de trabajo, se prioriza diagnostico rapido y comunicacion clara.",
      "Tambien tratamos fallas de placa en equipos que no encienden o reinician.",
    ],
    transportTip:
      "Desde Microcentro podes venir por Subte D hacia Callao y completar el ultimo tramo hacia Paraguay 2451 (Recoleta).",
    nearbyZones: [
      { name: "Balvanera / Once", slug: "balvanera" },
      { name: "Recoleta", slug: "recoleta" },
      { name: "Almagro", slug: "almagro" },
    ],
    focusServices: ["pantalla", "bateria", "carga", "soporte empresas"],
    faqs: [
      {
        q: "Atienden Microcentro aunque el taller este en Recoleta?",
        a: "Si. Atendemos clientes de Microcentro a diario y coordinamos ingreso por WhatsApp.",
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
        a: "Si. Cada reparacion se entrega con garantia por escrito y condiciones claras.",
      },
    ],
  },
};

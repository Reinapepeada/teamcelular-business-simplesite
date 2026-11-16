export const REVIEW_COST_MESSAGE =
  "La revisión técnica es arancelada y suele variar entre ARS 15.000 y ARS 25.000, según marca, modelo y tipo de falla.";

export const WARRANTY_SCOPE_MESSAGE =
  "La garantía escrita cubre 90 días sobre trabajo y repuesto instalado; el alcance exacto se informa por escrito antes de avanzar.";

/**
 * Financiación. Los competidores que aparecen citados por motores de IA la
 * publican y Team Celular no la mencionaba en ninguna página, pese a ofrecerla.
 */
export const INSTALLMENTS_MESSAGE =
  "Se puede abonar en 3 cuotas sin interés.";

export const BUDGET_RESPONSE_MESSAGE =
  "Respondemos por WhatsApp en hasta 2 horas hábiles. Si el caso requiere revisión técnica, confirmamos diagnóstico inicial dentro de 24 horas hábiles.";

export const SCREEN_BATTERY_TIMING_MESSAGE =
  "Pantalla y batería suelen resolverse en 2 a 4 horas con repuesto en stock. Confirmamos el plazo según el diagnóstico.";

/**
 * Envíos de la tienda, informados por el negocio el 16/11/2026: a todo el país,
 * $12.000 en promedio y unos 5 días hábiles. El costo real lo calcula el
 * checkout según la dirección; acá va solo la referencia que se publica.
 */
export const SHIPPING = { averageArs: 12000, businessDays: 5 } as const;

export const SHIPPING_MESSAGE =
  "Enviamos a todo el país. El envío cuesta en promedio $12.000 y llega en unos 5 días hábiles; el costo exacto se confirma al comprar según tu dirección.";

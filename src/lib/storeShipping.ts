/**
 * Envío de la tienda, informado por el negocio el 27/11/2026: a todo el país,
 * unos $15.000, hasta $20.000 según la provincia, y llega en unos 5 días.
 * El costo exacto lo cotiza el backend con el código postal al comprar.
 *
 * `max` es una estimación del negocio, no una tarifa: si un destino cotiza por
 * encima hay que subirlo, porque Google exige no declarar menos de lo que se
 * cobra.
 */
export const STORE_SHIPPING = { typical: 15000, max: 20000, days: 5 } as const;

const pesos = (value: number) => `$${value.toLocaleString("es-AR")}`;

export const STORE_SHIPPING_SUMMARY = `Unos ${pesos(STORE_SHIPPING.typical)}, hasta ${pesos(STORE_SHIPPING.max)} según la provincia. Llega en unos ${STORE_SHIPPING.days} días.`;

export const STORE_SHIPPING_MESSAGE = `Envío a todo el país: alrededor de ${pesos(STORE_SHIPPING.typical)}, hasta ${pesos(STORE_SHIPPING.max)} según la provincia. Llega en unos ${STORE_SHIPPING.days} días. El costo exacto se calcula al comprar, con tu código postal.`;

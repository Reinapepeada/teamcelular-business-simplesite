/** Importe con el formato de la tienda. */
export const pesos = (monto: number, moneda = "ARS") =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: moneda }).format(monto);

/** Tarjeta de sección del checkout. */
export const tarjeta = "rounded-2xl border border-slate-200 p-4 dark:border-slate-800";

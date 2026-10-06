/**
 * Datos para el opt-in de Reseñas de Clientes en Google.
 *
 * **El mail se queda en el navegador del comprador.** La consulta del pedido
 * por clave es pública y no lo devuelve; acá se anota al crear el pedido y la
 * pantalla de éxito lo lee solo si la clave coincide, o sea, si el pedido es
 * de este navegador.
 */
const ESPACIO = "tc:resenas-google";
const DIAS_DE_ENVIO = 3;

type Almacen = Pick<Storage, "getItem" | "setItem">;

export interface DatosParaResenas {
    clave: string;
    email: string;
    envio: boolean;
}

export const anotarParaResenas = (almacen: Almacen, datos: DatosParaResenas): void => {
    try {
        almacen.setItem(ESPACIO, JSON.stringify(datos));
    } catch {
        // Sin almacenamiento no hay encuesta; la compra sigue igual.
    }
};

export const datosParaResenas = (almacen: Almacen | null, clave: string): DatosParaResenas | null => {
    try {
        const dato = JSON.parse(almacen?.getItem(ESPACIO) || "null");
        return dato?.clave === clave && typeof dato.email === "string" && dato.email ? dato : null;
    } catch {
        return null;
    }
};

/** YYYY-MM-DD en hora de Argentina: retiro = hoy, envío = hoy + 3 días. */
export const entregaEstimada = (envio: boolean, hoy = new Date()): string => {
    const fecha = new Date(hoy.getTime() + (envio ? DIAS_DE_ENVIO : 0) * 86_400_000);
    return fecha.toLocaleDateString("en-CA", { timeZone: "America/Argentina/Buenos_Aires" });
};

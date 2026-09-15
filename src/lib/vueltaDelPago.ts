/**
 * La vuelta de Mercado Pago.
 *
 * **Nada de lo que dice la redirección se toma como verdad.** El comprador
 * vuelve a `/checkout/exito?...` con parámetros que cualquiera puede escribir a
 * mano en la barra de direcciones: escribir `status=approved` en la URL no hace
 * que el pago exista. Lo único que sabe si se cobró es el backend, y lo dice
 * leyendo la base, no la redirección.
 *
 * De los parámetros se usa una sola cosa: `external_reference`, que es el
 * `commerce_key` del pedido. Eso es un **identificador, no una afirmación**:
 * decir "contame del pedido X" no es decir "el pedido X está pagado". Con la
 * clave en la mano se pregunta el estado, y si el pedido es de otro o no
 * existe, el backend no cuenta nada.
 */

import type { AlmacenClave } from "./checkoutKey";
import type { StoreOrderStatus } from "./storeApi";

const ESPACIO = "tc.pedido";

/** El pedido que este navegador dejó empezado. */
export interface PedidoGuardado {
    clave: string;
    /**
     * La credencial para pedir el link de pago de ESE pedido.
     *
     * **El backend la entrega una sola vez, al crear el pedido.** Si se
     * quedaba solo en memoria, un fallo del proveedor justo después de crear el
     * pedido más una recarga dejaban una compra con el stock reservado que el
     * comprador ya no podía pagar desde la tienda: hacía falta que alguien del
     * negocio la destrabara a mano.
     *
     * Guardarla tiene su costo —es una credencial en el navegador— y es el
     * menor de los dos: alcanza para pagarle a la tienda el pedido de uno
     * mismo, no para leer datos de nadie ni para cobrar nada. Se borra apenas
     * el pago entra.
     */
    token: string | null;
}

/**
 * Se recuerda el pedido apenas se crea, ANTES de pedir el link de pago.
 *
 * Antes y no después **porque el momento peligroso es justo el del medio**: el
 * pedido ya existe y tiene stock reservado, y todavía no hay a dónde mandar a
 * pagar. Recordarlo recién con el link en la mano deja ese hueco sin red.
 *
 * Es además la fuente preferida para la vuelta del pago: sale del navegador y
 * no de una URL que se puede editar.
 */
export const recordarPedido = (
    almacen: AlmacenClave,
    commerceKey: string,
    token: string | null = null
): void => {
    try {
        if (commerceKey) {
            almacen.setItem(ESPACIO, JSON.stringify({ clave: commerceKey, token }));
        }
    } catch {
        // Sin poder guardar la compra sigue: la vuelta usa el parámetro.
    }
};

export const pedidoGuardado = (almacen: AlmacenClave): PedidoGuardado | null => {
    try {
        const crudo = almacen.getItem(ESPACIO);
        if (!crudo || crudo.trim() === "") return null;

        // Las versiones anteriores guardaban la clave pelada. El carrito
        // sobrevive al deploy, así que ese formato sigue llegando: se lee en
        // vez de tirarlo, aunque venga sin token.
        try {
            const dato = JSON.parse(crudo);
            if (dato && typeof dato.clave === "string" && dato.clave.trim() !== "") {
                return {
                    clave: dato.clave.trim(),
                    token: typeof dato.token === "string" && dato.token ? dato.token : null,
                };
            }
            return null;
        } catch {
            return { clave: crudo.trim(), token: null };
        }
    } catch {
        return null;
    }
};

export const pedidoRecordado = (almacen: AlmacenClave): string | null =>
    pedidoGuardado(almacen)?.clave ?? null;

export const olvidarPedido = (almacen: AlmacenClave): void => {
    try {
        almacen.removeItem(ESPACIO);
    } catch {
        // La próxima compra lo reemplaza.
    }
};

/** De qué pedido preguntar, y si es uno que armó este navegador. */
export interface PedidoDeLaVuelta {
    clave: string;
    /**
     * `true` solo si la clave coincide con la que este navegador guardó antes
     * de irse a pagar.
     *
     * **De esto dependen los efectos, no lo que se muestra.** Mirar el estado
     * de un pedido no le hace nada a nadie: el backend no devuelve datos
     * personales y la clave ya es la credencial para consultarlo. Pero vaciar
     * el carrito y borrar la clave de checkout sí tocan la compra EN CURSO de
     * quien está mirando, y eso solo puede pasar cuando el pedido confirmado es
     * el suyo.
     */
    esNuestro: boolean;
}

/**
 * De qué pedido hay que preguntar el estado.
 *
 * **Primero `external_reference`, que es el pedido que Mercado Pago acaba de
 * procesar**; el recordado queda de respaldo para cuando la vuelta llega sin
 * parámetros. Al revés, alguien que pagó dos pedidos vería el viejo: el
 * guardado se escribe al salir a pagar y puede haber quedado atrás.
 *
 * Que la referencia venga de la URL no la hace peligrosa: es un
 * **identificador, no una afirmación**. Decir "contame del pedido X" no es
 * decir "X está pagado". Los otros parámetros —`status`, `collection_status`,
 * `payment_id`— sí son afirmaciones sobre el cobro, y por eso se ignoran: eso
 * lo dice el backend leyendo la base.
 */
export const claveDeLaVuelta = (
    almacen: AlmacenClave | null,
    params: { get(nombre: string): string | null }
): PedidoDeLaVuelta | null => {
    const recordado = almacen ? pedidoRecordado(almacen) : null;

    const crudo = params.get("external_reference");
    const referencia = crudo && crudo.trim() !== "" ? crudo.trim() : null;

    if (referencia) return { clave: referencia, esNuestro: referencia === recordado };
    if (recordado) return { clave: recordado, esNuestro: true };
    return null;
};

export type Desenlace = "pagado" | "esperando" | "rechazado" | "sin_pedido";

/**
 * Por cuál de las tres puertas volvió el comprador.
 *
 * Mercado Pago manda a `/checkout/exito`, `/checkout/error` o
 * `/checkout/pendiente` según cómo terminó el pago. **Eso cambia qué decirle,
 * nunca si cobró o no**: la puerta es parte de la URL y la URL no es prueba de
 * nada. Un pago aprobado que vuelve por la puerta de error sigue estando
 * pagado, y un pago rechazado que entra a mano por `/checkout/exito` sigue sin
 * estarlo.
 */
export type Intencion = "exito" | "pendiente" | "error";

/** Lo que la pantalla tiene que mostrar, derivado del estado que dio el backend. */
export interface VueltaMostrable {
    desenlace: Desenlace;
    titulo: string;
    detalle: string;
    /** Mientras sea true la pantalla vuelve a preguntar. */
    seguirPreguntando: boolean;
}

const ESPERANDO: VueltaMostrable = {
    desenlace: "esperando",
    titulo: "Estamos confirmando tu pago",
    detalle:
        "Mercado Pago nos tiene que avisar y a veces tarda unos segundos. No cierres esta página.",
    seguirPreguntando: true,
};

/**
 * Un pago que puede tardar horas o días: efectivo, Rapipago, transferencia.
 *
 * **Deja de preguntar.** Ninguna espera razonable en una pestaña abierta
 * alcanza para un pago que se completa en un local mañana, y dejar el reintento
 * corriendo solo castiga al backend con una pestaña olvidada.
 */
const DEMORADO: VueltaMostrable = {
    desenlace: "esperando",
    titulo: "Tu pago está en camino",
    detalle:
        "Elegiste un medio que tarda en acreditarse. Cuando entre te avisamos por mail y preparamos el pedido; el stock te queda reservado mientras tanto.",
    seguirPreguntando: false,
};

/**
 * El pago no entró.
 *
 * **El carrito no se toca.** Quien vuelve de un rechazo suele reintentar con
 * otra tarjeta, y hacerle rearmar el pedido es perderlo.
 */
const RECHAZADO: VueltaMostrable = {
    desenlace: "rechazado",
    titulo: "El pago no se completó",
    detalle:
        "No se hizo ningún cargo. Tu carrito quedó como estaba: podés intentar de nuevo con otro medio de pago.",
    seguirPreguntando: false,
};

/**
 * Traduce el estado del pedido a lo que ve el comprador.
 *
 * **`paid` sale de la base**, no de la redirección: es el backend el que dice
 * si el pago entró. Mientras no lo diga, la pantalla espera en vez de felicitar
 * a alguien que todavía no pagó —o de asustar a alguien que sí pagó y cuyo
 * aviso está en camino.
 */
export const vueltaMostrable = (
    estado: StoreOrderStatus | null,
    intencion: Intencion = "exito"
): VueltaMostrable => {
    // **Lo pagado se decide antes que la puerta.** Un pago que entró y volvió
    // por `/checkout/error` está pagado igual: si la puerta ganara, la pantalla
    // le diría "no se hizo ningún cargo" a alguien que ya pagó.
    if (estado?.paid) {
        return {
            desenlace: "pagado",
            titulo: "¡Listo! Tu pago entró",
            detalle:
                "Te mandamos el detalle por mail. Preparamos el pedido y te avisamos cuando salga.",
            seguirPreguntando: false,
        };
    }

    if (!estado) return intencion === "error" ? RECHAZADO : ESPERANDO;

    if (intencion === "error") return RECHAZADO;
    if (intencion === "pendiente") return DEMORADO;
    return ESPERANDO;
};

/**
 * Cuánto esperar antes de volver a preguntar, en milisegundos.
 *
 * Arranca rápido y se va estirando: el aviso de Mercado Pago suele llegar en
 * los primeros segundos, y preguntar cada medio segundo durante dos minutos es
 * castigar al backend por el caso raro.
 */
export const esperaAntesDeReintentar = (intento: number): number =>
    Math.min(1000 * 2 ** Math.max(0, intento), 15000);

/**
 * El camino del carrito a la pantalla de pago.
 *
 * Separado del componente porque acá vive lo que cuesta plata si sale mal: qué
 * se manda, en qué orden, y sobre todo **qué NO se rehace cuando algo falla a
 * mitad de camino**.
 */

import type { CheckoutPayload, ShippingAddress, StoreOrder } from "./storeApi";
import type { ItemComprable } from "./cartLines";
import { aLineasDeCheckout, carritoComprable } from "./cartLines";

export type Entrega = "envio" | "retiro";

export interface DatosDeCompra {
    nombre: string;
    email: string;
    telefono?: string;
    entrega: Entrega;
    direccion?: Partial<ShippingAddress>;
}

export type ErroresDeCompra = Partial<Record<
    "nombre" | "email" | "telefono" | "street" | "city" | "province" | "postal_code" | "carrito",
    string
>>;

// Deliberadamente laxo: alcanza para atajar el dedazo (falta la arroba, falta
// el punto) sin rechazar direcciones válidas raras. Quien valida de verdad es
// el backend, que además tiene reglas del proveedor de pago.
const FORMA_DE_MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Qué le falta al formulario.
 *
 * **La dirección se exige solo si el envío es a domicilio.** Pedirla siempre
 * hace abandonar a quien iba a retirar por el local, que es la mitad de las
 * compras de un negocio de barrio.
 */
export const validarDatos = (
    datos: DatosDeCompra,
    items: ItemComprable[]
): ErroresDeCompra => {
    const errores: ErroresDeCompra = {};

    if (!datos.nombre?.trim()) errores.nombre = "Poné tu nombre.";
    if (!datos.email?.trim()) {
        errores.email = "Poné tu mail.";
    } else if (!FORMA_DE_MAIL.test(datos.email.trim())) {
        // El mail es por donde llega el aviso de que el pedido salió. Un mail
        // mal escrito no rompe la compra: la deja muda.
        errores.email = "Ese mail no parece válido.";
    }

    if (datos.entrega === "envio") {
        const d = datos.direccion ?? {};
        if (!d.street?.trim()) errores.street = "Poné la calle y el número.";
        if (!d.city?.trim()) errores.city = "Poné la localidad.";
        if (!d.province?.trim()) errores.province = "Elegí la provincia.";
        if (!d.postal_code?.trim()) errores.postal_code = "Poné el código postal.";
    }

    const resumen = aLineasDeCheckout(items);
    if (!carritoComprable(resumen)) {
        errores.carrito = resumen.hayQueReagregar.length
            ? `Volvé a agregar: ${resumen.hayQueReagregar.join(", ")}.`
            : "Tu carrito está vacío.";
    }

    return errores;
};

export const hayErrores = (errores: ErroresDeCompra): boolean =>
    Object.keys(errores).length > 0;

export const armarPedido = (
    datos: DatosDeCompra,
    items: ItemComprable[],
    checkoutKey: string
): CheckoutPayload => {
    const { lineas } = aLineasDeCheckout(items);
    const payload: CheckoutPayload = {
        checkout_key: checkoutKey,
        customer_name: datos.nombre.trim(),
        customer_email: datos.email.trim(),
        items: lineas,
    };
    const telefono = datos.telefono?.trim();
    if (telefono) payload.customer_phone = telefono;

    if (datos.entrega === "envio") {
        const d = datos.direccion ?? {};
        payload.shipping_address = {
            street: d.street!.trim(),
            city: d.city!.trim(),
            province: d.province!.trim(),
            postal_code: d.postal_code!.trim(),
            extra: d.extra?.trim() || null,
        };
    }
    // Sin `shipping_address` el backend entiende retiro en el local y cobra
    // envío 0. Mandar una dirección vacía sería pedir un envío a ningún lado.

    return payload;
};

export interface ResultadoDeCompra {
    /** A dónde mandar al comprador para pagar. */
    checkoutUrl: string;
    /** El pedido creado, con el total que puso el servidor. */
    pedido: StoreOrder;
}

export interface PuertosDeCompra {
    crearPedido: (payload: CheckoutPayload) => Promise<StoreOrder>;
    pedirLink: (accessToken: string) => Promise<{ checkout_url: string }>;
    /**
     * Se llama apenas el pedido existe, antes de pedir el link.
     *
     * Opcional porque no cambia el resultado de la compra: es lo que le permite
     * al comprador volver si el link falla. Que no pueda guardar no puede
     * impedir pagar.
     */
    recordar?: (pedido: StoreOrder) => void;
}

/**
 * Error del flujo que dice **si el pedido ya existe**.
 *
 * Es la diferencia que decide qué se puede reintentar: si el pedido no llegó a
 * crearse, se puede volver a empezar; si ya existe, volver a empezar con otra
 * clave crea un segundo pedido que reserva el mismo stock dos veces.
 */
export class ErrorDeCompra extends Error {
    readonly pedido: StoreOrder | null;
    readonly causa: unknown;

    constructor(message: string, pedido: StoreOrder | null, causa: unknown) {
        super(message);
        this.name = "ErrorDeCompra";
        this.pedido = pedido;
        this.causa = causa;
    }
}

/**
 * Crea el pedido y devuelve a dónde se paga.
 *
 * **El pedido se crea una sola vez.** Si falla el link de pago, el pedido ya
 * existe y tiene el stock reservado: el error lo lleva adentro para que la
 * pantalla ofrezca reintentar SOLO el link. Reintentar la compra entera con una
 * clave nueva dejaría dos pedidos vivos por el mismo carrito, cada uno con su
 * reserva, y el stock disponible caería a la mitad sin que nadie haya comprado.
 */
export const comprar = async (
    puertos: PuertosDeCompra,
    payload: CheckoutPayload
): Promise<ResultadoDeCompra> => {
    let pedido: StoreOrder;
    try {
        pedido = await puertos.crearPedido(payload);
    } catch (causa) {
        throw new ErrorDeCompra("No se pudo crear el pedido.", null, causa);
    }

    // **Apenas existe el pedido, se anota.** Desde acá hasta que se abre el
    // pago hay stock reservado y nada que le permita al comprador volver:
    // guardarlo recién con el link en la mano deja ese hueco sin red.
    puertos.recordar?.(pedido);

    if (!pedido.access_token) {
        // Pasa cuando la misma `checkout_key` ya había creado el pedido: el
        // backend devuelve el pedido viejo sin el token, que se entrega una
        // sola vez. No se puede pedir el link, y crear otro pedido sería
        // cobrar dos veces lo mismo.
        throw new ErrorDeCompra(
            "Tu pedido ya estaba creado. Buscá el mail con el link de pago o escribinos.",
            pedido,
            null
        );
    }

    try {
        const { checkout_url } = await puertos.pedirLink(pedido.access_token);
        return { checkoutUrl: checkout_url, pedido };
    } catch (causa) {
        throw new ErrorDeCompra(
            "El pedido quedó reservado pero no pudimos abrir el pago.",
            pedido,
            causa
        );
    }
};

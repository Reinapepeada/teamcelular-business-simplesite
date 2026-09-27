/**
 * El camino del carrito a la pantalla de pago.
 *
 * Separado del componente porque acá vive lo que cuesta plata si sale mal: qué
 * se manda, en qué orden, y sobre todo **qué NO se rehace cuando algo falla a
 * mitad de camino**.
 */

import type { CheckoutPayload, ShippingAddress, StoreOrder } from "./storeApi";
import { StoreApiError } from "./storeApi";
import type { ItemComprable } from "./cartLines";
import { aLineasDeCheckout, carritoComprable } from "./cartLines";

export type Entrega = "envio" | "retiro";

/**
 * La dirección como la escribe el comprador: calle y número por separado, y
 * piso y depto aparte. Es la forma en que Envíopack da de alta el envío; pedirla
 * junta obligaba a quien despacha a volver a separarla a mano.
 */
export interface DireccionDelFormulario extends Partial<ShippingAddress> {
    number?: string;
    floor?: string;
    apartment?: string;
}

export interface DatosDeCompra {
    nombre: string;
    email: string;
    telefono?: string;
    entrega: Entrega;
    direccion?: DireccionDelFormulario;
}

export type ErroresDeCompra = Partial<Record<
    | "nombre" | "email" | "telefono" | "street" | "number" | "floor" | "apartment"
    | "city" | "province" | "postal_code" | "carrito",
    string
>>;

/**
 * Los largos que acepta el alta de un envío en Envíopack.
 *
 * El checkout no los necesita para cobrar, pero si deja pasar una calle de 60
 * letras el problema aparece recién al despachar, con la plata ya cobrada. El
 * backend valida lo mismo; esto es para avisar antes de mandar.
 */
export const LARGOS_DE_ENVIO = {
    nombre: 50,
    email: 100,
    street: 50,
    number: 5,
    floor: 6,
    apartment: 4,
    city: 50,
} as const;

const excede = (valor: string | undefined, maximo: number) =>
    (valor?.trim().length ?? 0) > maximo;

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
        const L = LARGOS_DE_ENVIO;
        if (!d.street?.trim()) errores.street = "Poné la calle.";
        else if (excede(d.street, L.street)) errores.street = `La calle puede tener hasta ${L.street} letras.`;
        if (!d.number?.trim()) errores.number = "Poné el número, o S/N si no tiene.";
        else if (excede(d.number, L.number)) errores.number = `El número puede tener hasta ${L.number} caracteres.`;
        if (excede(d.floor, L.floor)) errores.floor = `El piso puede tener hasta ${L.floor} caracteres.`;
        if (excede(d.apartment, L.apartment)) errores.apartment = `El depto puede tener hasta ${L.apartment} caracteres.`;
        if (!d.city?.trim()) errores.city = "Poné la localidad.";
        else if (excede(d.city, L.city)) errores.city = `La localidad puede tener hasta ${L.city} letras.`;
        if (!errores.nombre && excede(datos.nombre, L.nombre)) {
            errores.nombre = `Para el envío, nombre y apellido pueden tener hasta ${L.nombre} letras.`;
        }
        if (!errores.email && excede(datos.email, L.email)) {
            errores.email = `Para el envío, el mail puede tener hasta ${L.email} caracteres.`;
        }
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
    checkoutKey: string,
    recoveryToken?: string
): CheckoutPayload => {
    const { lineas } = aLineasDeCheckout(items);
    const payload: CheckoutPayload = {
        checkout_key: checkoutKey,
        customer_name: datos.nombre.trim(),
        customer_email: datos.email.trim(),
        items: lineas,
    };
    const telefono = datos.telefono?.trim();
    if (recoveryToken) payload.recovery_token = recoveryToken;
    if (telefono) payload.customer_phone = telefono;

    if (datos.entrega === "envio") {
        const d = datos.direccion ?? {};
        // El pedido todavía guarda calle y complemento como dos textos: se
        // arman acá con las partes que el comprador escribió por separado.
        const piso = d.floor?.trim();
        const depto = d.apartment?.trim();
        const complemento = [piso && `Piso ${piso}`, depto && `Depto ${depto}`]
            .filter(Boolean)
            .join(" ");
        payload.shipping_address = {
            street: [d.street?.trim(), d.number?.trim()].filter(Boolean).join(" "),
            city: d.city!.trim(),
            province: d.province!.trim(),
            postal_code: d.postal_code!.trim(),
            extra: complemento || d.extra?.trim() || null,
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

export const mensajePedidoTerminado = (pedido: StoreOrder): string | null => {
    if (pedido.status === "paid" || pedido.status === "paid_pending_stock_commit") {
        return `El pedido ${pedido.commerce_key} ya recibió el pago. No vuelvas a pagarlo.`;
    }
    if (pedido.status === "expired" || pedido.status === "cancelled") {
        return `El pedido ${pedido.commerce_key} está ${pedido.status === "expired" ? "vencido" : "cancelado"}. Podés iniciar una nueva compra.`;
    }
    return null;
};

const exigirPedidoPendiente = (pedido: StoreOrder): void => {
    const mensaje = mensajePedidoTerminado(pedido);
    if (mensaje) throw new ErrorDeCompra(mensaje, pedido, null);
};

/**
 * Primer paso: crea el pedido y reserva el stock.
 *
 * **La compra se parte en dos a propósito.** El total que se cobra —con el
 * precio de hoy y el envío cotizado— recién existe cuando el servidor crea el
 * pedido, y el comprador tiene que verlo ANTES de que le cobren. Hasta que esto
 * se partió, el importe real aparecía por primera vez en Mercado Pago, con el
 * pedido ya creado.
 *
 * **El pedido se crea una sola vez.** Si algo falla después, el pedido ya
 * existe y tiene el stock reservado: el error lo lleva adentro para que la
 * pantalla ofrezca seguir con ESE pedido. Reintentar la compra entera con una
 * clave nueva dejaría dos pedidos vivos por el mismo carrito, cada uno con su
 * reserva, y el stock disponible caería a la mitad sin que nadie haya comprado.
 */
export const reservar = async (
    puertos: PuertosDeCompra,
    payload: CheckoutPayload
): Promise<StoreOrder> => {
    let pedido: StoreOrder;
    try {
        pedido = await puertos.crearPedido(payload);
    } catch (causa) {
        if (causa instanceof StoreApiError && causa.code === "STOREFRONT_PAUSED") {
            throw new ErrorDeCompra(
                "Las nuevas compras están pausadas temporalmente. Podés reintentar más tarde. Si ya tenés un pedido, podés retomarlo desde el carrito.",
                null,
                causa
            );
        }
        throw new ErrorDeCompra("No se pudo crear el pedido.", null, causa);
    }

    // **Apenas existe el pedido, se anota.** Desde acá hasta que se abre el
    // pago hay stock reservado y nada que le permita al comprador volver:
    // guardarlo recién con el link en la mano deja ese hueco sin red. Y ahora
    // ese hueco es más largo, porque en el medio hay una pantalla donde el
    // comprador puede irse.
    puertos.recordar?.(pedido);
    exigirPedidoPendiente(pedido);

    if (!pedido.access_token) {
        // Pasa cuando la misma `checkout_key` ya había creado el pedido: el
        // backend devuelve el pedido viejo sin el token, que se entrega una
        // sola vez. No se puede pedir el link, y crear otro pedido sería
        // cobrar dos veces lo mismo.
        throw new ErrorDeCompra(
            `El pedido ${pedido.commerce_key} ya existe, pero este navegador no tiene su acceso. Escribinos con ese número antes de volver a comprar.`,
            pedido,
            null
        );
    }

    return pedido;
};

/**
 * Segundo paso: abre el pago del pedido que el comprador ya confirmó.
 *
 * Separado del primero porque se puede reintentar solo: el pedido sigue vivo y
 * pedirle otro link no crea otra reserva.
 */
export const abrirElPago = async (
    puertos: PuertosDeCompra,
    pedido: StoreOrder
): Promise<string> => {
    exigirPedidoPendiente(pedido);
    if (!pedido.access_token) {
        throw new ErrorDeCompra(
            `El pedido ${pedido.commerce_key} ya existe, pero este navegador no tiene su acceso. Escribinos con ese número antes de volver a comprar.`,
            pedido,
            null
        );
    }

    try {
        const { checkout_url } = await puertos.pedirLink(pedido.access_token);
        return checkout_url;
    } catch (causa) {
        throw new ErrorDeCompra(
            "El pedido quedó reservado pero no pudimos abrir el pago.",
            pedido,
            causa
        );
    }
};

/**
 * Los dos pasos juntos, sin pantalla en el medio.
 *
 * Queda para lo que no necesita confirmación y para los tests: el checkout del
 * comprador usa `reservar` y `abrirElPago` por separado.
 */
export const comprar = async (
    puertos: PuertosDeCompra,
    payload: CheckoutPayload
): Promise<ResultadoDeCompra> => {
    const pedido = await reservar(puertos, payload);
    const checkoutUrl = await abrirElPago(puertos, pedido);
    return { checkoutUrl, pedido };
};

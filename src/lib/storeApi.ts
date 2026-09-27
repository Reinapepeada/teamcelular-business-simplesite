/**
 * La tienda contra el backend de Fixbee.
 *
 * Reemplaza la salida por WhatsApp: el comprador arma el carrito, el servidor
 * cotiza el envío, reserva el stock y devuelve el link de pago.
 *
 * **El carrito viaja por `slug`, no por id.** El catálogo público no expone
 * ids —son correlativos de la base y recorrerlos deja leer el inventario
 * entero, publicado o no— así que el slug es lo único que el comprador tiene, y
 * es lo que aceptan tanto la cotización como el checkout.
 */

export const STORE_API_BASE = (process.env.NEXT_PUBLIC_STORE_API_URL ?? "").replace(/\/+$/, "");

/** Un producto del catálogo público. No trae `id`: ver el comentario de arriba. */
export interface StoreProduct {
    shipping_enabled?: boolean;
    slug: string | null;
    name: string;
    description: string | null;
    price: number;
    currency: string | null;
    brand: string | null;
    model: string | null;
    condition: string;
    category: string | null;
    image_key: string | null;
    image_urls?: string[];
    warranty_months: number | null;
    /** Lo que se puede comprar ahora, ya descontadas las reservas vivas. */
    available: number;
}

export interface StoreProductPage {
    items: StoreProduct[];
    total: number;
    page: number;
    size: number;
}

export interface StoreLine {
    slug: string;
    quantity: number;
}

export interface ShippingAddress {
    street_name?: string;
    street_number?: string;
    floor?: string | null;
    apartment?: string | null;
    street: string;
    city: string;
    province: string;
    postal_code: string;
    extra?: string | null;
}

export interface ShippingQuote {
    options: { price: number; hours?: number | null; service?: string | null; carrier?: string | null }[];
    cheapest: { price: number; hours?: number | null; service?: string | null; carrier?: string | null };
}

export interface StoreOrder {
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string | null;
    shipping?: Partial<ShippingAddress> | null;
    items?: { product_id: number; quantity: number; unit_price: number; current_product_name?: string | null }[];
    reservation_expires_at?: string | null;
    expires_at?: string | null;
    reserved_until?: string | null;
    created_at?: string | null;
    commerce_key: string;
    status: string;
    subtotal_amount: number;
    shipping_amount: number;
    /** **El total que se cobra.** Nunca se recalcula en el navegador. */
    total_amount: number;
    currency: string;
    /** Solo al crear el pedido. En cualquier lectura posterior viaja null. */
    access_token?: string | null;
}

export interface StoreOrderStatus {
    reservation_expires_at?: string | null;
    shipping?: Partial<ShippingAddress> | null;
    commerce_key: string;
    status: string;
    /** Sale de la base, no de la redirección del proveedor. */
    paid: boolean;
    payment_result?: "none" | "pending" | "approved" | "rejected" | "reversed";
    reason_code?: "insufficient_funds" | "invalid_card_data" | "rejected_by_bank" | "expired" | "other" | null;
    can_retry?: boolean;
    tracking_url?: string | null;
    total_amount: number;
    currency: string;
    fulfillment_status: string;
    tracking_ref: string | null;
}

/** Un error del backend con su código, para que la pantalla decida qué decir. */
export class StoreApiError extends Error {
    readonly status: number;
    readonly code: string;
    /** Qué línea del carrito falló, cuando el backend lo dice. */
    readonly slug: string | null;

    readonly field: string | null;
    readonly slugs: string[];
    readonly fields: string[];

    constructor(message: string, status: number, code: string, slug: string | null = null, field: string | null = null, slugs: string[] = [], fields: string[] = []) {
        super(message);
        this.name = "StoreApiError";
        this.status = status;
        this.code = code;
        this.slug = slug;
        this.field = field;
        this.slugs = slugs;
        this.fields = fields;
    }
}

/** Normaliza F1 y los sobres anteriores sin perder la causa comercial. */
export const parseStoreError = (status: number, body: unknown): StoreApiError => {
    const objeto = (value: unknown): Record<string, unknown> =>
        value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
    const sobre = objeto(body);
    const error = objeto(sobre.error);
    // El manejador anterior colocaba el detail original dentro de message.
    const anterior = objeto(error.message);
    const causa = typeof anterior.code === "string" ? anterior
        : typeof error.code === "string" ? error : objeto(sobre.detail);
    const detalles = { ...causa, ...objeto(causa.details) };
    const strings = (value: unknown): string[] => Array.isArray(value)
        ? value.filter((v): v is string => typeof v === "string") : [];
    const validaciones = detalles.validation_errors ?? sobre.validation_errors ?? sobre.detail;
    const camposAnteriores = Array.isArray(validaciones) ? validaciones.flatMap(v => {
        const ruta = objeto(v).loc ?? objeto(v).field;
        const campo = Array.isArray(ruta) ? ruta.at(-1) : typeof ruta === "string" ? ruta.split(" -> ").at(-1) : null;
        return typeof campo === "string" ? [campo] : [];
    }) : [];
    const fields = strings(detalles.fields);
    if (!fields.length) fields.push(...camposAnteriores);
    const field = typeof detalles.field === "string" ? detalles.field : fields[0] ?? null;
    return new StoreApiError(
        typeof causa.message === "string" ? causa.message : "No se pudo completar la operación.",
        status, typeof causa.code === "string" ? causa.code.toUpperCase() : "UNKNOWN",
        typeof detalles.slug === "string" ? detalles.slug : null, field, strings(detalles.slugs), fields,
    );
};

export const storeRequestUrl = (path: string, server = typeof window === "undefined") => {
    if (!server) return `${STORE_API_BASE}${path}`;
    const base =
        STORE_API_BASE ||
        process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
        "https://teamcelular.com";
    return new URL(path, `${base.replace(/\/+$/, "")}/`).toString();
};

async function pedir<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(storeRequestUrl(path), {
        ...init,
        cache: "no-store",
        headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
    if (!res.ok) {
        let cuerpo: unknown = null;
        try {
            cuerpo = await res.json();
        } catch {
            // Un 502 del proxy no trae JSON. El código queda en UNKNOWN.
        }
        throw parseStoreError(res.status, cuerpo);
    }
    return (await res.json()) as T;
}

export const fetchStoreProducts = (params: Record<string, string | number> = {}) => {
    const query = new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    return pedir<StoreProductPage>(`/store/products${query ? `?${query}` : ""}`);
};

export const fetchStoreProduct = (slug: string) =>
    pedir<StoreProduct>(`/store/products/${encodeURIComponent(slug)}`);

/**
 * Lo que necesitan los filtros, en una sola llamada.
 *
 * **Sale de lo publicado, no del inventario.** Una marca que solo existe en
 * productos sin publicar es un filtro que no devuelve nada, y de paso cuenta
 * que la empresa la tiene.
 */
export interface StoreFacets {
    categories: string[];
    brands: string[];
    min_price: number;
    max_price: number;
}

export const fetchStoreFacets = () => pedir<StoreFacets>("/store/facets");

/** El local donde se retira, tal como lo resuelve el backend para esta tienda. */
export interface PickupPoint {
    name: string;
    address: string;
    hours: string | null;
}

/**
 * Dónde se retira, o `null` si la tienda no lo informa.
 *
 * Un fallo acá no puede frenar la compra: sin el dato, la opción de retiro se
 * muestra sin detalle.
 */
export const fetchPickupPoint = async (): Promise<PickupPoint | null> => {
    try {
        return await pedir<PickupPoint>("/store/pickup-point");
    } catch {
        return null;
    }
};

export const quoteShipping = (province: string, postalCode: string, items: StoreLine[]) =>
    pedir<ShippingQuote>("/store/shipping/quote", {
        method: "POST",
        body: JSON.stringify({ province, postal_code: postalCode, items }),
    });

export interface CheckoutPayload {
    checkout_key: string;
    recovery_token?: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string | null;
    /** Sin dirección: retira en el local, y el envío es 0. */
    shipping_address?: ShippingAddress | null;
    items: StoreLine[];
}

export const createOrder = (payload: CheckoutPayload) =>
    pedir<StoreOrder>("/store/checkout", { method: "POST", body: JSON.stringify(payload) });

/**
 * El link donde se paga.
 *
 * El token va en el path y **nunca en una URL que quede a la vista**: es la
 * credencial del pedido.
 */
export const requestPaymentLink = (accessToken: string) =>
    pedir<{ checkout_url: string; provider_order_id?: string | null }>(
        `/store/orders/${encodeURIComponent(accessToken)}/pay`,
        { method: "POST" }
    );

/**
 * El estado del pedido para la pantalla de vuelta.
 *
 * **Se pregunta al servidor.** Mercado Pago vuelve con `status=approved` en la
 * query, pero eso lo escribe el navegador del comprador y llega antes que el
 * aviso firmado que acredita el pago de verdad. Un `paid` sacado de la query
 * dice "listo, pagaste" sobre un pedido todavía sin cobrar —y sobre cualquiera
 * que edite la URL—.
 */
export const fetchOrderStatus = (commerceKey: string) =>
    pedir<StoreOrderStatus>(`/store/orders/by-key/${encodeURIComponent(commerceKey)}`);

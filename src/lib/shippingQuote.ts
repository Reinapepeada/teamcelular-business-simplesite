import { StoreApiError, type ShippingQuote } from "./storeApi";

/** El backend confirma preparación y snapshot; datos ausentes no habilitan pago. */
export const exigirCotizacionLista = (quote: ShippingQuote): ShippingQuote & { quote_id: string } => {
    if (quote?.checkout_ready !== true) {
        throw new StoreApiError("Envíos en preparación", 409, "SHIPPING_CONFIGURATION_REQUIRED");
    }
    if (typeof quote.quote_id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(quote.quote_id)
        || typeof quote.expires_at !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/i.test(quote.expires_at) || !Number.isFinite(Date.parse(quote.expires_at))) {
        throw new StoreApiError("Cotización sin confirmar", 409, "SHIPPING_QUOTE_REQUIRED");
    }
    // No se confía en el reloj del comprador para aceptar una cotización vencida.
    // El servidor verifica vigencia/configuración bajo lock antes de reservar.
    return quote as ShippingQuote & { quote_id: string };
};

export const plazoDeTransporte = (quote: ShippingQuote): string | null => {
    const hours = quote.cheapest?.hours;
    return quote.hours_basis === "carrier_transit_after_dispatch" && typeof hours === "number" && Number.isFinite(hours) && hours > 0
        ? `Tránsito estimado: ~${hours} h desde el despacho. No incluye preparación.` : null;
};

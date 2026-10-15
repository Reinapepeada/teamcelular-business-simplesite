/** Contrato compartido con quote/checkout: conservar CPA, validar antes de reservar. */
export const MAX_UNIDADES_POR_PRODUCTO = 50;
export const normalizarCodigoPostal = (valor: string): string => valor.trim().toUpperCase();
export const codigoPostalValido = (valor: string): boolean =>
    /^(?:[0-9]{4}|[A-Z][0-9]{4}[A-Z]{3})$/.test(normalizarCodigoPostal(valor));

export const errorDeDestino = (province: string, postalCode: string): string | null => {
    if (!province.trim()) return "Elegí la provincia.";
    if (!codigoPostalValido(postalCode)) return "Poné un código postal de 4 dígitos o un CPA completo, como C1425ABC.";
    return null;
};

export const errorDeCantidades = (items: { slug?: string | null; quantity: number }[]): string | null => {
    const porSlug = new Map<string, number>();
    for (const item of items) {
        if (!Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_UNIDADES_POR_PRODUCTO) {
            return "Revisá las cantidades: podés comprar de 1 a 50 unidades por producto.";
        }
        const slug = item.slug?.trim();
        if (!slug) continue; // El aviso de productos anteriores se ocupa del slug.
        const cantidad = (porSlug.get(slug) ?? 0) + item.quantity;
        if (cantidad > MAX_UNIDADES_POR_PRODUCTO) return "Podés comprar hasta 50 unidades por producto, sumando sus variantes.";
        porSlug.set(slug, cantidad);
    }
    return null;
};

export const errorDeNombre = (valor: string, envio: boolean): string | null => {
    const nombre = valor.trim();
    if (!nombre) return "Poné tu nombre.";
    const largo = (text: string) => Array.from(text).length;
    if (!envio) return largo(nombre) > 200 ? "El nombre puede tener hasta 200 caracteres." : null;
    if (largo(nombre) > 50) return "Para el envío, nombre y apellido pueden tener hasta 50 letras.";
    // Igual que recipient_parts del backend: primer token y todo el resto.
    const partes = nombre.match(/^(\S+)\s+([\s\S]+)$/);
    if (!partes) return "Para el envío, poné tu nombre y apellido.";
    if (largo(partes[1]) > 30 || largo(partes[2]) > 30) return "Para el envío, el nombre y el apellido pueden tener hasta 30 caracteres cada uno.";
    return null;
};

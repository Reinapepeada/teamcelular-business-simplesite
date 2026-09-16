/**
 * La clave que impide cobrar dos veces el mismo carrito.
 *
 * El checkout es idempotente por `checkout_key`: mandar la misma clave devuelve
 * el pedido que ya existe en vez de crear otro. Eso solo sirve si el navegador
 * manda **la misma clave** cuando reintenta, y los reintentos que importan no
 * son el doble click —ese lo frena el botón deshabilitado— sino los otros: el
 * que recarga porque la conexión se cortó justo, el que vuelve atrás desde
 * Mercado Pago, el que cierra la pestaña y entra de nuevo.
 *
 * Por eso la clave se guarda, y por eso se guarda **atada al carrito**: si
 * sobreviviera a un cambio del carrito, agregar un producto y volver a comprar
 * devolvería el pedido viejo —sin el producto nuevo— y el comprador pagaría por
 * algo que no es lo que armó.
 */

/** Lo mínimo que hace falta de `localStorage`, para poder probarlo sin navegador. */
export interface AlmacenClave {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}

const ESPACIO = "tc.checkout";

/**
 * La huella del carrito: qué se lleva y cuánto.
 *
 * Ordenada, para que el mismo carrito en distinto orden sea el mismo carrito:
 * agregar A y después B tiene que dar la misma huella que agregar B y después
 * A, o el comprador que reordena termina con dos pedidos.
 */
export const huellaDelCarrito = (items: { slug: string; quantity: number }[]): string =>
    items
        .map(i => `${i.slug}:${i.quantity}`)
        .sort()
        .join("|");

const nuevaClave = (): string => {
    // 128 bits. `crypto.randomUUID` existe en todos los navegadores que soporta
    // Next 16; el fallback es para el render del servidor y para un navegador
    // sin contexto seguro, donde igual hace falta una clave.
    const c = (globalThis as any).crypto;
    if (c?.randomUUID) return `ck-${c.randomUUID()}`;
    return `ck-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

interface Guardada {
    key: string;
    huella: string;
    recoveryToken?: string;
}

const leer = (almacen: AlmacenClave): Guardada | null => {
    try {
        const crudo = almacen.getItem(ESPACIO);
        if (!crudo) return null;
        const dato = JSON.parse(crudo);
        if (typeof dato?.key === "string" && typeof dato?.huella === "string") return dato;
        return null;
    } catch {
        // Un JSON corrupto o un almacenamiento bloqueado (modo privado) no
        // pueden impedir comprar: se arranca de cero.
        return null;
    }
};

/**
 * La clave para este carrito: la misma mientras el carrito no cambie.
 *
 * Si el carrito cambió, la clave anterior ya no sirve —representa otro pedido—
 * y se emite una nueva.
 */
export const claveDeCheckout = (
    almacen: AlmacenClave,
    items: { slug: string; quantity: number }[]
): string => {
    const huella = huellaDelCarrito(items);
    const guardada = leer(almacen);
    if (guardada && guardada.huella === huella) return guardada.key;

    const key = nuevaClave();
    try {
        almacen.setItem(ESPACIO, JSON.stringify({ key, huella }));
    } catch {
        // Sin poder guardar, la clave sigue sirviendo para ESTE intento; lo que
        // se pierde es la proteccion contra el reintento tras recargar.
    }
    return key;
};

/**
 * Se olvida la clave. Se llama cuando el pedido ya está creado y pagado, o
 * cuando el comprador vacía el carrito.
 *
 * **No se llama al crear el pedido.** Entre crear el pedido y pagarlo hay una
 * pantalla de Mercado Pago de la que el comprador puede volver, y ahí la clave
 * todavía tiene que servir para recuperar el mismo pedido en vez de abrir uno
 * nuevo con el stock reservado dos veces.
 */
export const olvidarClave = (almacen: AlmacenClave, claveEsperada?: string): void => {
    try {
        if (claveEsperada && leer(almacen)?.key !== claveEsperada) return;
        almacen.removeItem(ESPACIO);
    } catch {
        // Nada que hacer: la proxima compra con otro carrito la reemplaza.
    }
};

/** Guarda el secreto antes de crear la reserva; nunca usa azar no criptográfico. */
export const secretoDeCheckout = (almacen: AlmacenClave, key: string): string => {
    const guardada = leer(almacen);
    if (!guardada || guardada.key !== key) throw new Error("Checkout no persistido");
    if (guardada.recoveryToken && /^[a-f0-9]{64}$/.test(guardada.recoveryToken)) {
        return guardada.recoveryToken;
    }
    const bytes = globalThis.crypto.getRandomValues(new Uint8Array(32));
    const recoveryToken = Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
    almacen.setItem(ESPACIO, JSON.stringify({ ...guardada, recoveryToken }));
    if (leer(almacen)?.recoveryToken !== recoveryToken) throw new Error("Checkout no persistido");
    return recoveryToken;
};

/** localStorage no ofrece transacciones entre pestañas; Web Locks protege el par. */
export const prepararCheckout = async (
    almacen: AlmacenClave,
    items: { slug: string; quantity: number }[],
    locks: LockManager | undefined = globalThis.navigator?.locks,
): Promise<{ clave: string; secreto: string }> => {
    if (!locks) throw new Error("Este navegador no permite proteger la compra entre pestañas.");
    return locks.request("tc.checkout", () => {
        const clave = claveDeCheckout(almacen, items);
        return { clave, secreto: secretoDeCheckout(almacen, clave) };
    });
};

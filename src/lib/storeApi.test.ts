/**
 * La capa que reemplaza al "Pedir por WhatsApp".
 *
 * Lo que se prueba es lo que cuesta plata si sale mal: que el total lo ponga el
 * servidor, que la redirección de Mercado Pago no marque nada como pagado, que
 * el token del pedido no quede en una URL a la vista, y que reintentar no
 * abra un segundo pedido sobre el mismo carrito.
 *
 * Corre con `node --test src/lib/storeApi.test.ts`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
    parseStoreError,
    StoreApiError,
    createOrder,
    fetchOrderStatus,
    requestPaymentLink,
    quoteShipping,
    storeRequestUrl,
} from "./storeApi.ts";
import { claveDeCheckout, huellaDelCarrito, olvidarClave, type AlmacenClave } from "./checkoutKey.ts";

test("el servidor consulta el proxy público con URL absoluta", () => {
    assert.equal(storeRequestUrl("/store/products", false), "/store/products");
    assert.match(storeRequestUrl("/store/products", true), /^https?:\/\/[^/]+\/store\/products$/);
});

// --- un almacenamiento de juguete ---------------------------------------

const almacenFalso = (inicial: Record<string, string> = {}): AlmacenClave & { datos: Record<string, string> } => {
    // Se usa el objeto recibido tal cual, para poder simular dos sesiones del
    // navegador compartiendo el mismo localStorage.
    const datos = inicial;
    return {
        datos,
        getItem: (k: string) => (k in datos ? datos[k] : null),
        setItem: (k: string, v: string) => {
            datos[k] = v;
        },
        removeItem: (k: string) => {
            delete datos[k];
        },
    };
};

const almacenRoto = (): AlmacenClave => ({
    getItem: () => {
        throw new Error("modo privado");
    },
    setItem: () => {
        throw new Error("modo privado");
    },
    removeItem: () => {
        throw new Error("modo privado");
    },
});

// --- fetch de juguete ----------------------------------------------------

interface Llamada {
    url: string;
    init?: RequestInit;
}

const conFetch = async (
    respuesta: { ok?: boolean; status?: number; body: unknown },
    fn: (llamadas: Llamada[]) => Promise<void>
) => {
    const llamadas: Llamada[] = [];
    const original = globalThis.fetch;
    globalThis.fetch = (async (url: string, init?: RequestInit) => {
        llamadas.push({ url: String(url), init });
        return {
            ok: respuesta.ok ?? true,
            status: respuesta.status ?? 200,
            json: async () => respuesta.body,
        };
    }) as unknown as typeof fetch;
    try {
        await fn(llamadas);
    } finally {
        globalThis.fetch = original;
    }
};

// --- el total lo pone el servidor ---------------------------------------

describe("el total", () => {
    test("es el que devuelve el servidor, no una suma del navegador", async () => {
        // El envío lo cotiza el servidor contra el proveedor y el precio del
        // catálogo puede haber cambiado entre que se vio y que se compró. Una
        // suma local es una promesa que el backend no tiene por qué cumplir.
        const delServidor = {
            commerce_key: "abc",
            status: "pending_payment",
            subtotal_amount: 15000,
            shipping_amount: 13803.58,
            total_amount: 28803.58,
            currency: "ARS",
            access_token: "tok",
        };

        await conFetch({ body: delServidor }, async () => {
            const pedido = await createOrder({
                checkout_key: "ck-1",
                customer_name: "Ana",
                customer_email: "ana@example.com",
                items: [{ slug: "pantalla", quantity: 1 }],
            });

            assert.equal(pedido.total_amount, 28803.58);
            assert.equal(pedido.subtotal_amount + pedido.shipping_amount, pedido.total_amount);
        });
    });
});

// --- la vuelta del pago --------------------------------------------------

describe("la vuelta desde Mercado Pago", () => {
    test("el estado se pregunta al servidor y no sale de la query", async () => {
        // MP redirige con `status=approved`, pero eso lo escribe el navegador
        // del comprador y llega antes que el aviso firmado. Cualquiera puede
        // editar esa URL.
        await conFetch(
            { body: { commerce_key: "abc", status: "pending_payment", paid: false, total_amount: 100, currency: "ARS", fulfillment_status: "pending", tracking_ref: null } },
            async llamadas => {
                const estado = await fetchOrderStatus("abc");

                assert.equal(estado.paid, false);
                assert.ok(llamadas[0].url.endsWith("/store/orders/by-key/abc"));
            }
        );
    });

    test("se consulta por la clave del pedido, nunca por el token", async () => {
        // La `commerce_key` viaja en la URL de vuelta; el token de acceso
        // habilita a pedir link de pago y no puede quedar en el historial, en
        // el referer ni en los sistemas del proveedor.
        await conFetch({ body: {} }, async llamadas => {
            await fetchOrderStatus("clave-publica");
            assert.ok(!llamadas[0].url.includes("tok"));
        });
    });
});

// --- el link de pago -----------------------------------------------------

describe("el link de pago", () => {
    test("manda el token del pedido por POST", async () => {
        await conFetch({ body: { checkout_url: "https://mp.test/x" } }, async llamadas => {
            const link = await requestPaymentLink("tok-secreto");

            assert.equal(link.checkout_url, "https://mp.test/x");
            assert.equal(llamadas[0].init?.method, "POST");
        });
    });
});

// --- errores -------------------------------------------------------------

describe("los errores del backend", () => {
    test("el codigo llega en MAYUSCULAS y se compara asi", () => {
        const err = parseStoreError(409, { error: { code: "product_unavailable", message: "x" } });

        assert.ok(err instanceof StoreApiError);
        assert.equal(err.code, "PRODUCT_UNAVAILABLE");
    });

    test("dice que linea del carrito fallo", () => {
        // Un carrito de seis productos con uno agotado, sin esto, dice "no
        // disponible" sin decir cual: lo unico que le queda al comprador es
        // vaciarlo y empezar de nuevo.
        const err = parseStoreError(409, {
            error: { code: "PRODUCT_UNAVAILABLE", message: "x", details: { slug: "auricular" } },
        });

        assert.equal(err.slug, "auricular");
    });

    test("un error sin cuerpo JSON no rompe la pantalla", async () => {
        // Un 502 del proxy no trae JSON.
        const original = globalThis.fetch;
        globalThis.fetch = (async () => ({
            ok: false,
            status: 502,
            json: async () => {
                throw new Error("no es json");
            },
        })) as unknown as typeof fetch;
        try {
            await assert.rejects(
                () => quoteShipping("B", "1900", [{ slug: "x", quantity: 1 }]),
                (e: StoreApiError) => e.status === 502 && e.code === "UNKNOWN"
            );
        } finally {
            globalThis.fetch = original;
        }
    });
});

// --- la clave idempotente ------------------------------------------------

describe("la clave del checkout", () => {
    const carrito = [{ slug: "pantalla", quantity: 1 }];

    test("es la misma mientras el carrito no cambie", () => {
        // El reintento que importa no es el doble click —ese lo frena el boton—
        // sino recargar porque la conexion se corto, o volver atras desde MP.
        const almacen = almacenFalso();

        const primera = claveDeCheckout(almacen, carrito);
        const segunda = claveDeCheckout(almacen, carrito);

        assert.equal(primera, segunda);
    });

    test("sobrevive a recargar la pagina", () => {
        const datos: Record<string, string> = {};
        const primera = claveDeCheckout(almacenFalso(datos), carrito);
        // Otra "sesion" del navegador, con el mismo localStorage.
        const segunda = claveDeCheckout(almacenFalso(datos), carrito);

        assert.equal(primera, segunda);
    });

    test("cambia si el carrito cambia", () => {
        // **El caso que haria pagar por otra cosa.** Si la clave sobreviviera al
        // cambio, agregar un producto y volver a comprar devolveria el pedido
        // viejo —sin el producto nuevo— porque el checkout es idempotente.
        const almacen = almacenFalso();

        const antes = claveDeCheckout(almacen, carrito);
        const despues = claveDeCheckout(almacen, [...carrito, { slug: "funda", quantity: 2 }]);

        assert.notEqual(antes, despues);
    });

    test("cambia si cambia la cantidad, no solo los productos", () => {
        const almacen = almacenFalso();

        const uno = claveDeCheckout(almacen, [{ slug: "pantalla", quantity: 1 }]);
        const dos = claveDeCheckout(almacen, [{ slug: "pantalla", quantity: 2 }]);

        assert.notEqual(uno, dos);
    });

    test("el mismo carrito en otro orden es el mismo carrito", () => {
        // Si no, reordenar el carrito abre un pedido nuevo y reserva el stock
        // dos veces.
        const a = huellaDelCarrito([
            { slug: "pantalla", quantity: 1 },
            { slug: "funda", quantity: 2 },
        ]);
        const b = huellaDelCarrito([
            { slug: "funda", quantity: 2 },
            { slug: "pantalla", quantity: 1 },
        ]);

        assert.equal(a, b);
    });

    test("olvidarla emite una nueva para el mismo carrito", () => {
        const almacen = almacenFalso();
        const antes = claveDeCheckout(almacen, carrito);

        olvidarClave(almacen);

        assert.notEqual(claveDeCheckout(almacen, carrito), antes);
    });

    test("sin poder guardar igual devuelve una clave", () => {
        // Modo privado, o cookies bloqueadas. Se pierde la proteccion entre
        // recargas, pero no se puede impedir comprar por eso.
        const clave = claveDeCheckout(almacenRoto(), carrito);

        assert.ok(clave.length > 8);
    });

    test("un almacenamiento con basura no rompe la compra", () => {
        const almacen = almacenFalso({ "tc.checkout": "{no es json" });

        const clave = claveDeCheckout(almacen, carrito);

        assert.ok(clave.startsWith("ck-"));
    });

    test("dos claves seguidas no se repiten", () => {
        const a = claveDeCheckout(almacenFalso(), carrito);
        const b = claveDeCheckout(almacenFalso(), [{ slug: "otro", quantity: 1 }]);

        assert.notEqual(a, b);
    });
});

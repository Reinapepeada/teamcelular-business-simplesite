/**
 * El camino del carrito a la pantalla de pago.
 *
 * Lo que se prueba es lo que deja plata o stock colgado: que no se cree un
 * segundo pedido cuando el primero ya existe, que el retiro en el local no pida
 * dirección, y que el total que se muestra sea el del servidor.
 *
 * Corre con `node --test src/lib/checkoutFlow.test.ts`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
    armarPedido,
    comprar,
    ErrorDeCompra,
    hayErrores,
    validarDatos,
    type DatosDeCompra,
} from "./checkoutFlow.ts";
import type { StoreOrder } from "./storeApi.ts";

const carrito = [{ slug: "pantalla", quantity: 1, nombre: "Pantalla" }];

const datos = (over: Partial<DatosDeCompra> = {}): DatosDeCompra => ({
    nombre: "Ana Perez",
    email: "ana@example.com",
    entrega: "retiro",
    ...over,
});

const direccion = {
    street: "Rivadavia 100",
    city: "La Plata",
    province: "B",
    postal_code: "1900",
};

const pedido = (over: Partial<StoreOrder> = {}): StoreOrder => ({
    commerce_key: "clave-publica",
    status: "pending_payment",
    subtotal_amount: 15000,
    shipping_amount: 0,
    total_amount: 15000,
    currency: "ARS",
    access_token: "tok",
    ...over,
});

// --- validación ----------------------------------------------------------

describe("lo que le falta al formulario", () => {
    test("el caso feliz no tiene errores", () => {
        assert.equal(hayErrores(validarDatos(datos(), carrito)), false);
    });

    test("sin nombre ni mail no se compra", () => {
        const e = validarDatos(datos({ nombre: " ", email: "" }), carrito);

        assert.ok(e.nombre);
        assert.ok(e.email);
    });

    test("un mail con dedazo se ataja", () => {
        // El mail es por donde llega el aviso de que el pedido salió. Mal
        // escrito no rompe la compra: la deja muda.
        assert.ok(validarDatos(datos({ email: "ana@example" }), carrito).email);
        assert.ok(validarDatos(datos({ email: "ana.example.com" }), carrito).email);
    });

    test("retirar por el local NO pide direccion", () => {
        // **Pedirla siempre hace abandonar a quien iba a retirar**, que en un
        // negocio de barrio es la mitad de las compras.
        const e = validarDatos(datos({ entrega: "retiro" }), carrito);

        assert.equal(e.street, undefined);
        assert.equal(e.city, undefined);
        assert.equal(e.province, undefined);
        assert.equal(e.postal_code, undefined);
    });

    test("el envio a domicilio pide la direccion completa", () => {
        // Falta uno solo y el proveedor no puede cotizar ni despachar.
        const e = validarDatos(datos({ entrega: "envio", direccion: { street: "Rivadavia 100" } }), carrito);

        assert.equal(e.street, undefined);
        assert.ok(e.city);
        assert.ok(e.province);
        assert.ok(e.postal_code);
    });

    test("un carrito vacio no se compra", () => {
        assert.ok(validarDatos(datos(), []).carrito);
    });

    test("un carrito con items viejos dice cuales reagregar", () => {
        const e = validarDatos(datos(), [{ quantity: 1, nombre: "Funda" }]);

        assert.ok(e.carrito?.includes("Funda"));
    });
});

// --- el cuerpo que viaja -------------------------------------------------

describe("el pedido que se manda", () => {
    test("retiro en el local no manda direccion", () => {
        // Sin `shipping_address` el backend entiende retiro y cobra envío 0.
        // Mandar una dirección vacía sería pedir un envío a ningún lado.
        const p = armarPedido(datos({ entrega: "retiro" }), carrito, "ck-1");

        assert.equal("shipping_address" in p, false);
    });

    test("envio a domicilio manda los cuatro campos", () => {
        const p = armarPedido(datos({ entrega: "envio", direccion }), carrito, "ck-1");

        assert.deepEqual(p.shipping_address, { ...direccion, extra: null });
    });

    test("no manda telefono vacio", () => {
        // Un string vacío no es "no tengo teléfono": es un campo que el backend
        // guarda como dato del cliente.
        const p = armarPedido(datos({ telefono: "   " }), carrito, "ck-1");

        assert.equal("customer_phone" in p, false);
    });

    test("recorta los espacios de lo que se escribio", () => {
        const p = armarPedido(datos({ nombre: "  Ana  ", email: " ana@example.com " }), carrito, "ck-1");

        assert.equal(p.customer_name, "Ana");
        assert.equal(p.customer_email, "ana@example.com");
    });

    test("lleva la clave idempotente que se le dio", () => {
        assert.equal(armarPedido(datos(), carrito, "ck-unica").checkout_key, "ck-unica");
    });

    test("no manda precios", () => {
        // El total lo pone el servidor. Un precio mandado desde el navegador es
        // un precio que el comprador puede editar.
        const p = armarPedido(datos(), carrito, "ck-1");

        assert.deepEqual(p.items, [{ slug: "pantalla", quantity: 1 }]);
        assert.equal(JSON.stringify(p).includes("price"), false);
    });
});

// --- la compra -----------------------------------------------------------

describe("crear el pedido y abrir el pago", () => {
    test("devuelve a donde pagar y el total del servidor", async () => {
        const delServidor = pedido({ shipping_amount: 13803.58, total_amount: 28803.58 });
        const r = await comprar(
            {
                crearPedido: async () => delServidor,
                pedirLink: async () => ({ checkout_url: "https://mp.test/pagar" }),
            },
            armarPedido(datos(), carrito, "ck-1")
        );

        assert.equal(r.checkoutUrl, "https://mp.test/pagar");
        assert.equal(r.pedido.total_amount, 28803.58);
    });

    test("el pedido se crea UNA sola vez", async () => {
        let veces = 0;
        await comprar(
            {
                crearPedido: async () => {
                    veces += 1;
                    return pedido();
                },
                pedirLink: async () => ({ checkout_url: "x" }),
            },
            armarPedido(datos(), carrito, "ck-1")
        );

        assert.equal(veces, 1);
    });

    test("si falla el link, el error avisa que el pedido YA existe", async () => {
        // **El caso que reservaria el stock dos veces.** Si la pantalla
        // reintentara la compra entera con una clave nueva, quedarian dos
        // pedidos vivos por el mismo carrito, cada uno con su reserva, y el
        // stock disponible caeria a la mitad sin que nadie haya comprado.
        const creado = pedido();

        await assert.rejects(
            () =>
                comprar(
                    {
                        crearPedido: async () => creado,
                        pedirLink: async () => {
                            throw new Error("502");
                        },
                    },
                    armarPedido(datos(), carrito, "ck-1")
                ),
            (e: ErrorDeCompra) => {
                assert.equal(e.pedido, creado);
                assert.ok(e.pedido?.access_token, "hace falta el token para reintentar solo el link");
                return true;
            }
        );
    });

    test("si falla crear el pedido, no hay pedido colgado", async () => {
        await assert.rejects(
            () =>
                comprar(
                    {
                        crearPedido: async () => {
                            throw new Error("409");
                        },
                        pedirLink: async () => ({ checkout_url: "x" }),
                    },
                    armarPedido(datos(), carrito, "ck-1")
                ),
            (e: ErrorDeCompra) => e.pedido === null
        );
    });

    test("un pedido devuelto sin token no se vuelve a crear", async () => {
        // Pasa cuando la misma clave ya habia creado el pedido: el backend
        // devuelve el viejo sin el token, que se entrega una sola vez. Crear
        // otro seria cobrar dos veces lo mismo.
        let pidioLink = false;

        await assert.rejects(
            () =>
                comprar(
                    {
                        crearPedido: async () => pedido({ access_token: null }),
                        pedirLink: async () => {
                            pidioLink = true;
                            return { checkout_url: "x" };
                        },
                    },
                    armarPedido(datos(), carrito, "ck-1")
                ),
            (e: ErrorDeCompra) => e.pedido !== null
        );
        assert.equal(pidioLink, false);
    });
});

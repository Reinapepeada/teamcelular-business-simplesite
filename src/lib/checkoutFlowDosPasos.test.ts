/**
 * La compra partida en dos: reservar y después pagar.
 *
 * Lo que se prueba es lo que cuesta plata o stock si sale mal: que reservar no
 * mande a pagar antes de que el comprador vea el total, y que un fallo al abrir
 * el pago no cree un segundo pedido sobre el mismo stock.
 *
 * Corre con `npm test`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { abrirElPago, comprar, ErrorDeCompra, reservar } from "./checkoutFlow.ts";
import type { CheckoutPayload, StoreOrder } from "./storeApi.ts";

const payload: CheckoutPayload = {
    checkout_key: "ck-1",
    customer_name: "Ana",
    customer_email: "ana@example.com",
    items: [{ slug: "pantalla", quantity: 1 }],
};

const pedido = {
    commerce_key: "CK-9",
    status: "pending_payment",
    subtotal_amount: 1000,
    shipping_amount: 0,
    total_amount: 1000,
    currency: "ARS",
    access_token: "tok-secreto",
} as StoreOrder;

describe("reservar", () => {
    test("crea el pedido y NO pide el link", async () => {
        // El total que se cobra recién existe cuando el servidor crea el
        // pedido: mandar a pagar antes es cobrarle sin que lo haya visto.
        let pidioLink = false;
        const r = await reservar(
            {
                crearPedido: async () => pedido,
                pedirLink: async () => {
                    pidioLink = true;
                    return { checkout_url: "https://mp/pagar" };
                },
            },
            payload,
        );
        assert.equal(r.commerce_key, "CK-9");
        assert.equal(pidioLink, false);
    });

    test("anota el pedido antes de devolverlo", async () => {
        // Desde acá hay stock reservado y una pantalla de la que el comprador
        // se puede ir: sin anotarlo, ese pedido no se recupera más.
        let anotado = false;
        await reservar(
            {
                crearPedido: async () => pedido,
                pedirLink: async () => ({ checkout_url: "x" }),
                recordar: () => {
                    anotado = true;
                },
            },
            payload,
        );
        assert.equal(anotado, true);
    });

    test("corta si el pedido ya existía y vino sin token", async () => {
        await assert.rejects(
            reservar(
                {
                    crearPedido: async () => ({ ...pedido, access_token: null }),
                    pedirLink: async () => ({ checkout_url: "x" }),
                },
                payload,
            ),
            ErrorDeCompra,
        );
    });
});

describe("abrirElPago", () => {
    test("devuelve el link del pedido ya confirmado", async () => {
        const url = await abrirElPago(
            {
                crearPedido: async () => pedido,
                pedirLink: async (token) => {
                    assert.equal(token, "tok-secreto");
                    return { checkout_url: "https://mp/pagar" };
                },
            },
            pedido,
        );
        assert.equal(url, "https://mp/pagar");
    });

    test("si falla NO crea un segundo pedido", async () => {
        // El pedido ya tiene stock reservado: crear otro duplicaría la reserva
        // sobre el mismo stock sin que nadie haya comprado.
        let creo = false;
        await assert.rejects(
            abrirElPago(
                {
                    crearPedido: async () => {
                        creo = true;
                        return pedido;
                    },
                    pedirLink: async () => {
                        throw new Error("proveedor caido");
                    },
                },
                pedido,
            ),
            ErrorDeCompra,
        );
        assert.equal(creo, false);
    });

    test("el error se lleva el pedido, para poder reintentar solo el link", async () => {
        try {
            await abrirElPago(
                {
                    crearPedido: async () => pedido,
                    pedirLink: async () => {
                        throw new Error("proveedor caido");
                    },
                },
                pedido,
            );
            assert.fail("tenía que fallar");
        } catch (e) {
            assert.ok(e instanceof ErrorDeCompra);
            assert.equal((e as ErrorDeCompra).pedido?.commerce_key, "CK-9");
        }
    });
});

describe("comprar", () => {
    test("sigue haciendo los dos pasos de una", async () => {
        const r = await comprar(
            {
                crearPedido: async () => pedido,
                pedirLink: async () => ({ checkout_url: "https://mp/pagar" }),
            },
            payload,
        );
        assert.equal(r.checkoutUrl, "https://mp/pagar");
        assert.equal(r.pedido.commerce_key, "CK-9");
    });
});

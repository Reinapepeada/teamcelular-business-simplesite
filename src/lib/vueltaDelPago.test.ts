/**
 * La vuelta de Mercado Pago.
 *
 * Lo que se prueba acá es sobre todo lo que la pantalla NO debe creer: los
 * parámetros de la redirección los puede escribir cualquiera en la barra de
 * direcciones, y decir "pagado" ahí no puede alcanzar para dar una compra por
 * cobrada.
 *
 * Corre con `npm test`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
    claveDeLaVuelta,
    esperaAntesDeReintentar,
    estadoDeEntrega,
    olvidarPedido,
    pedidoGuardado,
    pedidoYaNoSePuedePagar,
    pedidoRecordado,
    recordarPedido,
    vueltaMostrable,
} from "./vueltaDelPago.ts";
import { claveDeCheckout, type AlmacenClave } from "./checkoutKey.ts";
import type { StoreOrderStatus } from "./storeApi.ts";

const almacenFalso = (inicial: Record<string, string> = {}): AlmacenClave => {
    const datos = { ...inicial };
    return {
        getItem: (k) => (k in datos ? datos[k] : null),
        setItem: (k, v) => {
            datos[k] = v;
        },
        removeItem: (k) => {
            delete datos[k];
        },
    };
};

const almacenRoto = (): AlmacenClave => ({
    getItem: () => {
        throw new Error("bloqueado");
    },
    setItem: () => {
        throw new Error("bloqueado");
    },
    removeItem: () => {
        throw new Error("bloqueado");
    },
});

const query = (pares: Record<string, string>) => new URLSearchParams(pares);

const estado = (over: Partial<StoreOrderStatus> = {}): StoreOrderStatus => ({
    commerce_key: "CK-1",
    status: "pending",
    paid: false,
    payment_reversed: false,
    total_amount: 15000,
    currency: "ARS",
    fulfillment_status: "pending",
    tracking_ref: null,
    ...over,
});

describe("el pedido recordado", () => {
    test("reintento sin token no borra credencial previa del mismo pedido ni la transfiere a otro", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-42", token: "original", checkoutKey: "ck-original" });
        recordarPedido(almacen, { clave: "CK-42", token: null });
        assert.equal(pedidoGuardado(almacen)?.token, "original");
        assert.equal(pedidoGuardado(almacen)?.checkoutKey, "ck-original");
        recordarPedido(almacen, { clave: "CK-43", token: null });
        assert.equal(pedidoGuardado(almacen)?.token, null);
        assert.equal(pedidoGuardado(almacen)?.checkoutKey, undefined);
    });
    test("se guarda y se recupera", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-42" });
        assert.equal(pedidoRecordado(almacen), "CK-42");
    });

    test("se olvida cuando se pide", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-42" });
        olvidarPedido(almacen);
        assert.equal(pedidoRecordado(almacen), null);
    });

    test("un almacenamiento bloqueado no rompe la compra", () => {
        const almacen = almacenRoto();
        assert.doesNotThrow(() => recordarPedido(almacen, { clave: "CK-42" }));
        assert.doesNotThrow(() => olvidarPedido(almacen));
        assert.equal(pedidoRecordado(almacen), null);
    });

    test("una clave vacia no se guarda", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "" });
        assert.equal(pedidoRecordado(almacen), null);
    });

    test("una clave vacia no pisa el pedido que ya estaba", () => {
        // Si la pisara, el comprador vuelve de Mercado Pago y la pantalla
        // queda sin saber de que pedido preguntar.
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-42" });
        recordarPedido(almacen, { clave: "" });
        assert.equal(pedidoRecordado(almacen), "CK-42");
    });
});

describe("claveDeLaVuelta", () => {
    test("manda la referencia de la URL: es el pedido que MP acaba de procesar", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-VIEJO" });
        const pedido = claveDeLaVuelta(almacen, query({ external_reference: "CK-NUEVO" }));
        assert.equal(pedido?.clave, "CK-NUEVO");
    });

    test("una referencia ajena se mira pero no cuenta como propia", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-MIO" });
        const pedido = claveDeLaVuelta(almacen, query({ external_reference: "CK-DE-OTRO" }));
        assert.equal(pedido?.esNuestro, false);
    });

    test("la misma clave que guardo este navegador si es propia", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-MIO" });
        const pedido = claveDeLaVuelta(almacen, query({ external_reference: "CK-MIO" }));
        assert.equal(pedido?.esNuestro, true);
    });

    test("sin referencia en la URL usa la guardada, que es propia", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-MIO" });
        assert.deepEqual(claveDeLaVuelta(almacen, query({})), {
            clave: "CK-MIO",
            esNuestro: true,
        });
    });

    test("sirve aunque no haya almacenamiento: pagar en otro dispositivo", () => {
        const pedido = claveDeLaVuelta(null, query({ external_reference: "CK-7" }));
        assert.equal(pedido?.clave, "CK-7");
        assert.equal(pedido?.esNuestro, false);
    });

    test("sin pedido por ningun lado no hay nada que preguntar", () => {
        assert.equal(claveDeLaVuelta(almacenFalso(), query({})), null);
        assert.equal(claveDeLaVuelta(almacenFalso(), query({ external_reference: "  " })), null);
    });

    test("no toma el payment_id como si fuera el pedido", () => {
        assert.equal(
            claveDeLaVuelta(almacenFalso(), query({ payment_id: "123456", status: "approved" })),
            null,
        );
    });
});

describe("vueltaMostrable", () => {
    test("sin estado todavia, espera", () => {
        const v = vueltaMostrable(null);
        assert.equal(v.desenlace, "esperando");
        assert.equal(v.seguirPreguntando, true);
    });

    test("paid en true es lo unico que da la compra por cobrada", () => {
        const v = vueltaMostrable(estado({ paid: true, status: "paid" }));
        assert.equal(v.desenlace, "pagado");
        assert.equal(v.seguirPreguntando, false);
    });

    test("un status que dice approved pero paid en false NO alcanza", () => {
        // El status es texto del proveedor; `paid` lo decide la base. Si la
        // pantalla mirara el texto, felicitaria por un pago que no entro.
        const v = vueltaMostrable(estado({ paid: false, status: "approved" }));
        assert.equal(v.desenlace, "esperando");
        assert.equal(v.seguirPreguntando, true);
    });

    test("mientras espera, sigue preguntando", () => {
        assert.equal(vueltaMostrable(estado({ paid: false })).seguirPreguntando, true);
    });
});

describe("esperaAntesDeReintentar", () => {
    test("arranca corto: el aviso suele llegar enseguida", () => {
        assert.equal(esperaAntesDeReintentar(0), 1000);
    });

    test("se va estirando", () => {
        assert.ok(esperaAntesDeReintentar(1) > esperaAntesDeReintentar(0));
        assert.ok(esperaAntesDeReintentar(3) > esperaAntesDeReintentar(1));
    });

    test("tiene techo: no se espera un minuto entre preguntas", () => {
        assert.equal(esperaAntesDeReintentar(50), 15000);
    });

    test("un intento negativo no da una espera negativa", () => {
        assert.ok(esperaAntesDeReintentar(-3) > 0);
    });
});

describe("vueltaMostrable segun la puerta por la que volvio", () => {
    test("lo pagado manda sobre la puerta: aprobado que vuelve por /error sigue pagado", () => {
        // Si la puerta ganara, la pantalla le diria "no se hizo ningun cargo"
        // a alguien que ya pago.
        const v = vueltaMostrable(estado({ paid: true }), "error");
        assert.equal(v.desenlace, "pagado");
    });

    test("un rechazo no se queda preguntando", () => {
        const v = vueltaMostrable(estado({ paid: false }), "error");
        assert.equal(v.desenlace, "rechazado");
        assert.equal(v.seguirPreguntando, false);
    });

    test("una vuelta de error no afirma que no hubo cargo", () => {
        const v = vueltaMostrable(estado({ paid: false }), "error");
        assert.doesNotMatch(v.detalle, /no se hizo ningún cargo/i);
        assert.match(v.detalle, /revisá si Mercado Pago registró un cargo/i);
    });

    test("un pago demorado tampoco se espera con la pestana abierta", () => {
        // Efectivo o Rapipago pueden tardar dias: reintentar es dejar una
        // pestana olvidada golpeando el backend.
        const v = vueltaMostrable(estado({ paid: false }), "pendiente");
        assert.equal(v.seguirPreguntando, false);
        assert.notEqual(v.desenlace, "rechazado");
        assert.doesNotMatch(v.detalle, /stock te queda reservado/i);
    });

    test("por la puerta de exito si espera, que es donde el aviso llega en segundos", () => {
        assert.equal(vueltaMostrable(estado({ paid: false }), "exito").seguirPreguntando, true);
    });

    test("sin estado todavia, la puerta de exito espera", () => {
        assert.equal(vueltaMostrable(null, "exito").seguirPreguntando, true);
    });
});

describe("el token del pedido a medio pagar", () => {
    test("se guarda junto con la clave", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-42", token: "tok-secreto" });
        assert.deepEqual(pedidoGuardado(almacen), {
            clave: "CK-42",
            token: "tok-secreto",
            total: null,
            moneda: null,
            huella: null,
        });
    });

    test("sin token se guarda igual: la vuelta solo necesita la clave", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-42" });
        assert.deepEqual(pedidoGuardado(almacen), {
            clave: "CK-42",
            token: null,
            total: null,
            moneda: null,
            huella: null,
        });
    });

    test("un pedido guardado por la version vieja se sigue leyendo", () => {
        // Antes se guardaba la clave pelada. El almacenamiento sobrevive al
        // deploy: tirar ese formato perderia el pedido en curso.
        const almacen = almacenFalso({ "tc.pedido": "CK-VIEJO" });
        assert.equal(pedidoGuardado(almacen)?.clave, "CK-VIEJO");
        assert.equal(pedidoRecordado(almacen), "CK-VIEJO");
    });

    test("un token en blanco o de otro tipo vuelve como null", () => {
        // Devolverlo tal cual lo dejaria pasar el chequeo de "hay token" en
        // algunos lugares y no en otros, y la tienda terminaria pidiendo el
        // link de pago con una credencial vacia.
        const vacio = almacenFalso({ "tc.pedido": JSON.stringify({ clave: "CK-1", token: "" }) });
        assert.equal(pedidoGuardado(vacio)?.token, null);

        const raro = almacenFalso({ "tc.pedido": JSON.stringify({ clave: "CK-1", token: 7 }) });
        assert.equal(pedidoGuardado(raro)?.token, null);
    });

    test("olvidar el pedido se lleva el token", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-42", token: "tok-secreto" });
        olvidarPedido(almacen);
        assert.equal(pedidoGuardado(almacen), null);
    });

    test("un almacenamiento con basura no rompe la vuelta", () => {
        assert.equal(pedidoGuardado(almacenFalso({ "tc.pedido": "{roto" }))?.clave, "{roto");
        assert.equal(pedidoGuardado(almacenFalso({ "tc.pedido": "{}" })), null);
        assert.equal(pedidoGuardado(almacenRoto()), null);
    });

    test("la clave sigue saliendo de pedidoRecordado, que es lo que usa la vuelta", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-42", token: "tok-secreto" });
        assert.equal(pedidoRecordado(almacen), "CK-42");
    });
});

describe("olvidar el pedido sin llevarse el que sigue", () => {
    test("con la clave esperada, borra solo si sigue siendo ese", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-A", token: "tok-a" });
        olvidarPedido(almacen, "CK-A");
        assert.equal(pedidoGuardado(almacen), null);
    });

    test("una confirmacion que llega tarde no borra el pedido nuevo", () => {
        // El comprador ya arranco otra compra: borrar a ciegas se lleva la
        // credencial del pedido EN CURSO por la buena noticia de uno anterior.
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-NUEVO", token: "tok-nuevo" });
        olvidarPedido(almacen, "CK-VIEJO");
        assert.equal(pedidoGuardado(almacen)?.clave, "CK-NUEVO");
        assert.equal(pedidoGuardado(almacen)?.token, "tok-nuevo");
    });

    test("sin clave esperada borra lo que haya", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-A" });
        olvidarPedido(almacen);
        assert.equal(pedidoGuardado(almacen), null);
    });
});

describe("el monto y la huella del pedido guardado", () => {
    test("se guardan para no tener que inventarlos al recuperar", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, {
            clave: "CK-1",
            token: "tok",
            total: 15000,
            moneda: "ARS",
            huella: "pantalla:1",
        });
        const g = pedidoGuardado(almacen);
        assert.equal(g?.total, 15000);
        assert.equal(g?.moneda, "ARS");
        assert.equal(g?.huella, "pantalla:1");
    });

    test("un total que no es numero vuelve como null y no como NaN", () => {
        // Mostrarlo daria "quedo reservado por $ NaN" justo cuando el
        // comprador necesita saber que importe va a reintentar.
        const almacen = almacenFalso({
            "tc.pedido": JSON.stringify({ clave: "CK-1", total: "mil" }),
        });
        assert.equal(pedidoGuardado(almacen)?.total, null);

        const nan = almacenFalso({
            "tc.pedido": '{"clave":"CK-1","total":null}',
        });
        assert.equal(pedidoGuardado(nan)?.total, null);
    });

    test("una huella en blanco vuelve como null, no como cadena vacia", () => {
        // La huella de un carrito vacio TAMBIEN es la cadena vacia: si una
        // guardada en blanco se devolviera tal cual, un pedido viejo
        // "coincidiria" con el carrito vacio y la tienda ofreceria pagarlo.
        const almacen = almacenFalso({
            "tc.pedido": JSON.stringify({ clave: "CK-1", token: "tok", huella: "" }),
        });
        assert.equal(pedidoGuardado(almacen)?.huella, null);
    });

    test("el formato viejo no trae huella, asi que no se recupera como propio", () => {
        const almacen = almacenFalso({ "tc.pedido": "CK-VIEJO" });
        assert.equal(pedidoGuardado(almacen)?.huella, null);
    });
});

describe("sin respuesta del backend no se afirma nada sobre el cobro", () => {
    test("la puerta de error, sin estado todavia, espera en vez de decir que no se cobro", () => {
        // Volver por /checkout/error dice por donde redirigio Mercado Pago, no
        // que no se haya cobrado. Si la consulta fallo o todavia no contesto,
        // afirmar el rechazo es dejar que la URL diga lo que no puede decir.
        const v = vueltaMostrable(null, "error");
        assert.notEqual(v.desenlace, "rechazado");
        assert.equal(v.seguirPreguntando, true);
    });

    test("recien con el backend diciendo que no esta pagado se muestra el rechazo", () => {
        assert.equal(vueltaMostrable(estado({ paid: false }), "error").desenlace, "rechazado");
    });

    test("un pago demorado, con respuesta, deja de preguntar", () => {
        assert.equal(vueltaMostrable(estado({ paid: false }), "pendiente").seguirPreguntando, false);
    });
});

describe("seguimiento del pedido", () => {
    test("un reembolso confirmado reemplaza el mensaje de compra y oculta la entrega", () => {
        const devuelto = estado({ paid: true, status: "paid", payment_reversed: true });
        assert.equal(vueltaMostrable(devuelto).desenlace, "devuelto");
        assert.equal(vueltaMostrable(devuelto).seguirPreguntando, false);
        assert.equal(estadoDeEntrega(devuelto), null);
    });
    test("no muestra entrega antes de acreditar el pago", () => {
        assert.equal(estadoDeEntrega(estado({ paid: false, fulfillment_status: "shipped" })), null);
    });

    test("distingue deuda de stock de un pedido en preparación", () => {
        const pendiente = estado({ paid: true, status: "paid_pending_stock_commit", fulfillment_status: "pending" });
        assert.equal(estadoDeEntrega(pendiente), "Disponibilidad en revisión");
        assert.equal(vueltaMostrable(pendiente).titulo, "Recibimos tu pago");
    });

    test("muestra el estado de entrega registrado por el backend", () => {
        assert.equal(estadoDeEntrega(estado({ paid: true, status: "paid", fulfillment_status: "preparing" })), "En preparación");
        assert.equal(estadoDeEntrega(estado({ paid: true, status: "paid", fulfillment_status: "shipped" })), "Despachado");
        assert.equal(estadoDeEntrega(estado({ paid: true, status: "paid", fulfillment_status: "delivered" })), "Entregado");
    });
});

test("una reserva vencida deja de esperar confirmación de pago", () => {
    const vista = vueltaMostrable(estado({ status: "expired", paid: false }), "exito");
    assert.equal(vista.seguirPreguntando, false);
    assert.equal(vista.desenlace, "rechazado");
});

describe("cuando un pedido ya no se puede pagar", () => {
    test("pagado: se suelta", () => {
        assert.equal(pedidoYaNoSePuedePagar(estado({ paid: true, status: "paid" })), true);
    });

    test("paid manda, aunque el estado en texto diga otra cosa", () => {
        // Toda esta pantalla se apoya en `paid` y no en el texto del estado.
        // Si la decision saliera solo del texto, un pedido cobrado con el
        // estado todavia sin mover quedaria ofreciendo pagarlo de nuevo.
        assert.equal(
            pedidoYaNoSePuedePagar(estado({ paid: true, status: "pending_payment" })),
            true,
        );
    });

    test("vencido o cancelado: se suelta", () => {
        assert.equal(pedidoYaNoSePuedePagar(estado({ paid: false, status: "expired" })), true);
        assert.equal(pedidoYaNoSePuedePagar(estado({ paid: false, status: "cancelled" })), true);
    });

    test("esperando pago: NO se suelta, aunque el backend haya dicho 409", () => {
        // El 409 sale igual cuando la tienda no puede cobrar por credenciales.
        // Soltar ahi tira la credencial de un pedido que se puede pagar apenas
        // el negocio arregle sus credenciales.
        assert.equal(
            pedidoYaNoSePuedePagar(estado({ paid: false, status: "pending_payment" })),
            false,
        );
    });

    test("sin poder confirmar el estado, se conserva", () => {
        // Soltarlo es irreversible: el token se entrega una sola vez.
        assert.equal(pedidoYaNoSePuedePagar(null), false);
    });
});

describe("olvidarPedido avisa si borro", () => {
    test("devuelve true cuando borro de verdad", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-A", token: "tok" });
        assert.equal(olvidarPedido(almacen, "CK-A"), true);
    });

    test("devuelve false cuando el guardado es otro", () => {
        // De esto depende que NO se borre la clave de checkout de la compra en
        // curso: esa clave es lo que impide que un reintento cree un segundo
        // pedido con su propia reserva sobre el mismo stock.
        const almacen = almacenFalso();
        recordarPedido(almacen, { clave: "CK-NUEVO", token: "tok" });
        assert.equal(olvidarPedido(almacen, "CK-VIEJO"), false);
        assert.equal(pedidoGuardado(almacen)?.clave, "CK-NUEVO");
    });

    test("devuelve false cuando no hay nada guardado", () => {
        assert.equal(olvidarPedido(almacenFalso(), "CK-A"), false);
    });

    test("un almacenamiento bloqueado devuelve false y no rompe", () => {
        // Con clave esperada corta antes, al no poder leer. Sin clave llega
        // hasta el borrado, que es la otra forma de fallar: las dos tienen que
        // decir que NO borraron, o la clave de checkout se va detras de un
        // borrado que nunca ocurrio.
        assert.equal(olvidarPedido(almacenRoto(), "CK-A"), false);
        assert.equal(olvidarPedido(almacenRoto()), false);
    });
});

test("pedido terminal libera su checkout y permite repetir el carrito", () => {
    const almacen = almacenFalso();
    const items = [{ slug: "pantalla", quantity: 1 }];
    const key = claveDeCheckout(almacen, items);
    recordarPedido(almacen, { clave: "CO-1", checkoutKey: key, token: "token" });
    assert.equal(pedidoGuardado(almacen)?.checkoutKey, key);
    assert.equal(olvidarPedido(almacen, "CO-1"), true);
    assert.notEqual(claveDeCheckout(almacen, items), key);
});

test("confirmacion tardia no borra checkout nuevo aun sin pedido nuevo", () => {
    const almacen = almacenFalso();
    const oldKey = claveDeCheckout(almacen, [{ slug: "viejo", quantity: 1 }]);
    recordarPedido(almacen, { clave: "CO-1", checkoutKey: oldKey });
    const items = [{ slug: "nuevo", quantity: 1 }];
    const newKey = claveDeCheckout(almacen, items);
    olvidarPedido(almacen, "CO-1");
    assert.equal(claveDeCheckout(almacen, items), newKey);
});

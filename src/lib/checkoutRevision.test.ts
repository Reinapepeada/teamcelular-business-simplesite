import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { revisarPedido, reservarYPagarSiCoincide, recuperarIntento, abrirElPago, armarPedido, problemaDeCheckout, ErrorDeCompra, type DatosDeCompra } from "./checkoutFlow.ts";
import { intentoDeCheckout, prepararIntento } from "./checkoutKey.ts";
import { parseStoreError, StoreApiError, type StoreOrder } from "./storeApi.ts";
import { vencimientoReserva, resumenParaConfirmar } from "./resumenDelPedido.ts";
import { recordarPedido, pedidoGuardado } from "./vueltaDelPago.ts";
import { leerConPartes } from "../../tools/leerFuente.mjs";

const datos: DatosDeCompra = { nombre: "Ana", email: "ana@example.com", entrega: "retiro" };
const items = [{ slug: "pantalla", quantity: 2, nombre: "Pantalla" }];
const pedido = (total = 120): StoreOrder => ({ commerce_key: "TC-1", access_token: "token", status: "pending_payment", subtotal_amount: 100, shipping_amount: 20, total_amount: total, currency: "ARS" });

test("revisar cotiza provincia y CP sin crear pedido; retiro no cotiza", async () => {
    let cotizaciones = 0;
    const cotizar = async (province: string, cp: string, lineas: unknown) => {
        cotizaciones++;
        assert.equal(province, "B"); assert.equal(cp, "1900");
        assert.deepEqual(lineas, [{ slug: "pantalla", quantity: 2 }]);
        return { cheapest: { price: 20 }, options: [{ price: 20 }] };
    };
    const r = await revisarPedido({ ...datos, entrega: "envio", direccion: { province: "B", postal_code: "1900" } }, items, 100, cotizar);
    assert.equal(r.total, 120);
    assert.equal((await revisarPedido(datos, items, 100, cotizar)).total, 100);
    assert.equal(cotizaciones, 1);
    // Verifica que el formulario sigue conectado solo a la revisión.
    const fuente = leerConPartes("src/components/store/CheckoutDialog.tsx", "src/components/store/checkout");
    const submit = fuente.slice(fuente.indexOf("const onSubmit ="), fuente.indexOf("const confirmarRevision ="));
    assert.match(submit, /await revisarPedido\(/);
    assert.doesNotMatch(submit, /await (reservar|createOrder|prepararCheckout)/);
});

test("sin cotización válida no se presenta envío gratis", async () => {
    await assert.rejects(revisarPedido({ ...datos, entrega: "envio", direccion: { province: "B", postal_code: "1900" } }, items, 100, async () => ({ cheapest: { price: NaN }, options: [] })), StoreApiError);
});

for (const total of [119, 120, 121, 118.99, 121.01]) {
    test(`confirmar total ${total}: tolerancia de un peso y reserva única`, async () => {
        const pasos: string[] = [];
        const puertos = {
            crearPedido: async () => { pasos.push("crear"); return pedido(total); },
            recordar: () => { pasos.push("recordar"); },
            pedirLink: async (token: string) => { assert.equal(token, "token"); pasos.push("link"); return { checkout_url: "https://pago.example" }; },
        };
        const resultado = await reservarYPagarSiCoincide(puertos, armarPedido(datos, items, "checkout-1"), 100, 20);
        const cambio = Math.abs(total - 120) > 1;
        assert.equal(resultado.checkoutUrl, cambio ? null : "https://pago.example");
        assert.deepEqual(pasos, cambio ? ["crear", "recordar"] : ["crear", "recordar", "link"]);
        if (cambio) {
            assert.equal(resumenParaConfirmar(resultado.pedido, 100, 20).precioCambio, true);
            await abrirElPago(puertos, resultado.pedido);
            assert.deepEqual(pasos, ["crear", "recordar", "link"]);
        }
    });
}

test("fallo del link directo conserva pedido y solo reintenta link", async () => {
    let creaciones = 0, links = 0;
    const puertos = { crearPedido: async () => { creaciones++; return pedido(); }, pedirLink: async () => { if (++links === 1) throw new StoreApiError("fallo", 409, "ORDER_NOT_PAYABLE"); return { checkout_url: "https://pago.example" }; } };
    let pendiente: StoreOrder | null = null;
    await assert.rejects(reservarYPagarSiCoincide(puertos, armarPedido(datos, items, "checkout-1"), 100, 20), (e: ErrorDeCompra) => { pendiente = e.pedido; return !!pendiente?.access_token; });
    await abrirElPago(puertos, pendiente!);
    assert.equal(creaciones, 1); assert.equal(links, 2);
});

test("códigos: stock identificable, envío, campo largo, pausa y desconocido", () => {
    const error = (code: string, details = {}) => parseStoreError(422, { error: { code, details } });
    const stock = problemaDeCheckout(error("product_unavailable", { slug: "pantalla" }), items);
    assert.match(stock.mensaje, /Ya no hay stock de Pantalla/); assert.equal(stock.quitarSlug, "pantalla");
    assert.equal(problemaDeCheckout(error("product_not_found")).quitarSlug, undefined);
    assert.equal(problemaDeCheckout(error("shipping_unavailable")).ofrecerRetiro, true);
    assert.match(problemaDeCheckout(error("shipping_unavailable")).mensaje, /No pudimos cotizar/);
    for (const [field, campo] of [["customer_name", "nombre"], ["customer_email", "email"], ["street", "street"], ["city", "city"], ["extra", "floor"]] as const) {
        assert.ok(problemaDeCheckout(error("shipping_field_too_long", { field })).campos?.[campo]);
    }
    assert.match(problemaDeCheckout(error("storefront_paused")).mensaje, /pausadas/);
    assert.match(problemaDeCheckout(error("desconocido")).mensaje, /Probá de nuevo/);
});

test("reserva exacta o aproximada persiste sin extenderse al recuperar", () => {
    const created_at = "2026-09-27T12:00:00Z";
    const expires_at = "2026-09-27T12:10:00Z";
    assert.match(vencimientoReserva({ created_at })!, /\(aprox\.\)$/);
    assert.doesNotMatch(vencimientoReserva({ created_at, expires_at })!, /aprox/);
    assert.equal(vencimientoReserva({ reserved_until: expires_at }), vencimientoReserva({ expires_at }));
    assert.equal(vencimientoReserva({}), null);
    let contenido = "";
    const almacen = { getItem: () => contenido, setItem: (_: string, v: string) => { contenido = v; }, removeItem: () => {} };
    recordarPedido(almacen, { clave: "TC-1", reserva: { created_at }, token: "token" });
    assert.equal(vencimientoReserva(pedidoGuardado(almacen)!.reserva!), vencimientoReserva({ created_at }));
});

const almacenamiento = () => {
    const valores = new Map<string, string>();
    return {
        getItem: (key: string) => valores.get(key) ?? null,
        setItem: (key: string, value: string) => { valores.set(key, value); },
        removeItem: (key: string) => { valores.delete(key); },
    };
};
const datosConEnvio: DatosDeCompra = {
    ...datos, entrega: "envio",
    direccion: { street: "Primera", number: "123", city: "La Plata", province: "B", postal_code: "1900" },
};

test("respuesta perdida y datos editados: conserva payload, clave y secreto; no paga hasta revisar el pedido real", async () => {
    const almacen = almacenamiento();
    const original = await prepararIntento(almacen, items, (key, secret) => armarPedido(datosConEnvio, items, key, secret));
    let existente: StoreOrder | null = null;
    let reservas = 0, links = 0;
    const puertos = {
        crearPedido: async (payload: typeof original.payload) => {
            assert.deepEqual(payload, original.payload);
            assert.deepEqual(intentoDeCheckout(almacen), original.payload, "persistido antes del POST");
            if (existente) return existente;
            reservas++;
            existente = { ...pedido(), customer_name: payload.customer_name, customer_email: payload.customer_email,
                shipping: payload.shipping_address, items: [{ product_id: 1, quantity: 2, unit_price: 50 }] };
            throw new TypeError("Respuesta perdida");
        },
        pedirLink: async () => { links++; return { checkout_url: "https://pago.example" }; },
    };
    await assert.rejects(reservarYPagarSiCoincide(puertos, original.payload, 100, 20), ErrorDeCompra);
    const editados = { ...datosConEnvio, email: "nuevo@example.com", direccion: { ...datosConEnvio.direccion, street: "Otra" } };
    const reintento = await prepararIntento(almacen, items, (key, secret) => armarPedido(editados, items, key, secret));
    assert.equal(reintento.recuperado, true);
    const resultado = await reservarYPagarSiCoincide(puertos, reintento.payload, 100, 20, reintento.recuperado);
    assert.equal(resultado.checkoutUrl, null);
    assert.equal(resultado.pedido.customer_email, datos.email);
    assert.equal(resultado.pedido.shipping?.street, "Primera 123");
    assert.equal(links, 0);
    assert.equal(reservas, 1);
    await abrirElPago(puertos, resultado.pedido);
    assert.equal(links, 1);
});

test("recarga sin tc.pedido y proveedor caído: recupera la reserva original sin cotizar ni abrir pago", async () => {
    const almacen = almacenamiento();
    const intento = await prepararIntento(almacen, items, (key, secret) => armarPedido(datosConEnvio, items, key, secret));
    const existente = { ...pedido(), customer_email: datos.email, shipping: intento.payload.shipping_address };
    await assert.rejects(reservarYPagarSiCoincide({
        crearPedido: async () => { throw new TypeError("Respuesta perdida después de reservar"); },
        pedirLink: async () => { throw new Error("No debe pagar"); },
    }, intento.payload, 100, 20));
    assert.equal(pedidoGuardado(almacen), null);
    // Recrear el adaptador simula otra carga del navegador: solo sobrevive el almacenamiento.
    const recargado = { ...almacen };
    let cotizaciones = 0;
    const cotizar = async () => { cotizaciones++; throw new StoreApiError("Proveedor caído", 409, "SHIPPING_UNAVAILABLE"); };
    const recuperado = await recuperarIntento(recargado, {
        crearPedido: async payload => { assert.deepEqual(payload, intento.payload); return existente; },
        pedirLink: async () => { throw new Error("La recuperación no paga"); },
    });
    if (!recuperado) await revisarPedido(datosConEnvio, items, 100, cotizar);
    assert.equal(recuperado?.commerce_key, "TC-1");
    assert.equal(recuperado?.shipping_amount, 20);
    assert.equal(cotizaciones, 0);
    // El componente debe elegir la recuperación antes de validar datos nuevos o cotizar.
    const fuente = leerConPartes("src/components/store/CheckoutDialog.tsx", "src/components/store/checkout");
    const submit = fuente.slice(fuente.indexOf("const onSubmit ="), fuente.indexOf("const confirmarRevision ="));
    assert.ok(submit.indexOf("await retomarIntento()") < submit.indexOf("validarDatos("));
    assert.ok(submit.indexOf("await retomarIntento()") < submit.indexOf("await revisarPedido("));
    assert.match(fuente, /\(comprobandoIntento \|\| intentoPendiente\) && !aConfirmar/);
    assert.match(fuente, /pedido\.customer_email/);
    assert.match(fuente, /pedido\.shipping\.street/);
});

test("recuperación incierta conserva el intento y no inventa una clave para otro carrito", async () => {
    const almacen = almacenamiento();
    const original = await prepararIntento(almacen, items, (key, secret) => armarPedido(datos, items, key, secret));
    await assert.rejects(recuperarIntento(almacen, {
        crearPedido: async () => { throw new TypeError("Sin conexión"); },
        pedirLink: async () => { throw new Error("No debe pagar"); },
    }), ErrorDeCompra);
    const distinto = await prepararIntento(almacen, [{ slug: "otro", quantity: 1 }], () => { throw new Error("No debe cambiar los datos"); });
    assert.deepEqual(distinto.payload, original.payload);
    assert.equal(distinto.recuperado, true);
});

test("sin intento enviado puede revisar y cotizar; una recuperación fallida conserva todos los datos", async () => {
    const almacen = almacenamiento();
    const puertos = {
        crearPedido: async () => { throw new StoreApiError("Sin respuesta", 503, "UNAVAILABLE"); },
        pedirLink: async () => { throw new Error("No debe pagar"); },
    };
    assert.equal(await recuperarIntento(almacen, puertos), null);
    let cotizaciones = 0;
    await revisarPedido(datosConEnvio, items, 100, async () => {
        cotizaciones++;
        return { cheapest: { price: 20 }, options: [] };
    });
    assert.equal(cotizaciones, 1);
    const intento = await prepararIntento(almacen, items, (key, secret) => armarPedido(datosConEnvio, items, key, secret));
    await assert.rejects(recuperarIntento(almacen, puertos), ErrorDeCompra);
    assert.deepEqual(intentoDeCheckout(almacen), intento.payload);
});

test("dos pestañas con datos distintos persisten un único cuerpo original", async () => {
    const almacen = almacenamiento();
    const [primero, segundo] = await Promise.all([
        prepararIntento(almacen, items, (key, secret) => armarPedido(datos, items, key, secret)),
        prepararIntento(almacen, items, (key, secret) => armarPedido({ ...datos, email: "otro@example.com" }, items, key, secret)),
    ]);
    assert.deepEqual(primero.payload, segundo.payload);
    assert.equal(primero.recuperado, false);
    assert.equal(segundo.recuperado, true);
});

test("sin poder guardar el payload no permite reservar; intentos antiguos sin cuerpo no se reemplazan", async () => {
    const almacen = almacenamiento();
    const guardar = almacen.setItem;
    almacen.setItem = (key, value) => {
        if (JSON.parse(value).payload) throw new Error("Almacenamiento lleno");
        guardar(key, value);
    };
    await assert.rejects(prepararIntento(almacen, items, (key, secret) => armarPedido(datos, items, key, secret)), /Almacenamiento lleno/);
    const antes = almacen.getItem("tc.checkout");
    await assert.rejects(prepararIntento(almacen, items, () => { throw new Error("No debe sustituir el original"); }), /intento anterior/);
    assert.equal(almacen.getItem("tc.checkout"), antes);
});

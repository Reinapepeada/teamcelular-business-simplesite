import { test } from "node:test";
import assert from "node:assert/strict";
import { codigoPostalValido, errorDeCantidades, errorDeNombre, normalizarCodigoPostal } from "./commerceValidation.ts";
import { armarPedido, revisarPedido, validarDatos, type DatosDeCompra } from "./checkoutFlow.ts";

const datos: DatosDeCompra = { nombre: "Ana Perez", email: "ana@example.test", entrega: "envio", direccion: {
    street: "Calle", number: "123", city: "CABA", province: "C", postal_code: " c1425abc ", floor: "2", apartment: "B",
} };
const items = [{ slug: "funda", quantity: 1 }];

test("F8 CP4 y CPA se conservan completos y canónicos en cotización y pedido", async () => {
    for (const [entrada, normalizado] of [[" 1425 ", "1425"], [" c1425abc ", "C1425ABC"]]) {
        assert.equal(codigoPostalValido(entrada), true);
        assert.equal(normalizarCodigoPostal(entrada), normalizado);
        const compra = { ...datos, direccion: { ...datos.direccion, postal_code: entrada } };
        assert.deepEqual(validarDatos(compra, items), {});
        await revisarPedido(compra, items, 100, async (_province, cp) => {
            assert.equal(cp, normalizado);
            return { cheapest: { price: 20 }, options: [] };
        });
        const direccion = armarPedido(compra, items, "ck-1").shipping_address!;
        assert.equal(direccion.postal_code, normalizado);
        assert.equal(direccion.street_name, "Calle");
        assert.equal(direccion.street_number, "123");
        assert.equal(direccion.floor, "2");
        assert.equal(direccion.apartment, "B");
    }
});

test("F8 CP inválido nunca se completa ni llega a cotizar", async () => {
    for (const cp of ["", "142", "12345", "C1425", "C 1425 ABC", "Ñ1425ABC", "１４２５"]) {
        assert.equal(codigoPostalValido(cp), false);
        const compra = { ...datos, direccion: { ...datos.direccion, postal_code: cp } };
        assert.ok(validarDatos(compra, items).postal_code);
        await assert.rejects(revisarPedido(compra, items, 100, async () => { assert.fail("No debe cotizar"); }));
    }
});

test("F8 cantidades enteras 1–50 por slug agregado antes de cotizar o reservar", async () => {
    for (const quantity of [0, -1, 1.1, 51, Infinity, NaN, "2", true]) {
        const invalidos = [{ slug: "funda", quantity: quantity as number }];
        assert.ok(errorDeCantidades(invalidos));
        assert.ok(validarDatos(datos, invalidos).carrito);
        await assert.rejects(revisarPedido(datos, invalidos, 100, async () => { assert.fail("No debe cotizar"); }));
    }
    assert.equal(errorDeCantidades([{ slug: "funda", quantity: 1 }, { slug: "funda", quantity: 49 }]), null);
    assert.ok(errorDeCantidades([{ slug: "funda", quantity: 25 }, { slug: " funda ", quantity: 26 }]));
    assert.equal(errorDeCantidades([{ slug: "funda", quantity: 50 }, { slug: "cable", quantity: 50 }]), null);
});

test("F8 nombre del destinatario respeta partición y límites del transportista", () => {
    assert.equal(errorDeNombre(" Ana  Maria de Perez ", true), null);
    assert.ok(errorDeNombre("Ana", true));
    assert.equal(errorDeNombre("Ana", false), null);
    assert.equal(errorDeNombre("N".repeat(200), false), null);
    assert.ok(errorDeNombre("N".repeat(201), false));
    assert.equal(errorDeNombre(`${"N".repeat(30)} ${"A".repeat(19)}`, true), null);
    assert.ok(errorDeNombre(`${"N".repeat(31)} Perez`, true));
    assert.ok(errorDeNombre(`Ana ${"A".repeat(31)}`, true));
    assert.ok(errorDeNombre(`${"N".repeat(30)} ${"A".repeat(20)}`, true));
    assert.ok(errorDeNombre("Ana " + "A".repeat(29) + "  B", true));
});

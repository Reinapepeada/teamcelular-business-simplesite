import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { adaptarProducto } from "./storeCatalog.ts";
import { productoDeVidriera } from "./fixbeeCatalog.ts";
import { productosSoloRetiro } from "./cartLines.ts";
import { armarPedido, crearPedidoConRecuperacion, ErrorDeCompra, problemaDeCheckout, revisarPedido, validarDatos, type DatosDeCompra } from "./checkoutFlow.ts";
import { intentoDeCheckout, prepararIntento } from "./checkoutKey.ts";
import { parseStoreError, StoreApiError, type StoreProduct } from "./storeApi.ts";

const items = [{ slug: "equipo", nombre: "Equipo", quantity: 1, shipping_enabled: false }, { slug: "funda", nombre: "Funda", quantity: 1 }];
const datos: DatosDeCompra = { nombre: "Ana", email: "ana@example.com", entrega: "envio", direccion: {
    street: " Rivadavia ", number: " 123 ", floor: " 5 ", apartment: " B ", city: "CABA", province: "C", postal_code: "1000",
} };
const rechazo = () => parseStoreError(422, { error: { code: "pickup_only", details: { slugs: ["equipo", "funda", 123] } } });
const almacenamiento = () => {
    const valores = new Map<string, string>();
    return { getItem: (k: string) => valores.get(k) ?? null, setItem: (k: string, v: string) => { valores.set(k, v); }, removeItem: (k: string) => { valores.delete(k); } };
};

test("catálogo y ficha conservan solo retiro; dato ausente permite envío", () => {
    const base = { slug: "equipo", name: "Equipo", available: 1 } as StoreProduct;
    for (const flag of [undefined, true, false]) {
        const catalogo = adaptarProducto({ ...base, shipping_enabled: flag })!;
        assert.equal(catalogo.shipping_enabled, flag !== false);
        assert.equal(productoDeVidriera(catalogo).shipping_enabled, flag !== false);
    }
});

test("carrito mixto bloquea envío, permite retiro y tolera carritos viejos", async () => {
    assert.deepEqual(productosSoloRetiro(items), ["Equipo"]);
    assert.match(validarDatos(datos, items).carrito!, /Equipo/);
    const retiro = { ...datos, entrega: "retiro" as const };
    assert.deepEqual(validarDatos(retiro, items), {});
    assert.equal(armarPedido(retiro, items, "key").shipping_address, undefined);
    assert.equal((await revisarPedido(retiro, items, 100, async () => { throw Error("No debe cotizar"); })).total, 100);
    assert.deepEqual(validarDatos(datos, [{ slug: "viejo", quantity: 1 }]), {});
});

test("dirección estructurada recorta espacios y conserva los textos compatibles", () => {
    assert.deepEqual(armarPedido(datos, items, "key").shipping_address, {
        street_name: "Rivadavia", street_number: "123", floor: "5", apartment: "B",
        street: "Rivadavia 123", extra: "Piso 5 Depto B", city: "CABA", province: "C", postal_code: "1000",
    });
});

test("pickup_only nombra productos y ofrece retiro en cotización y checkout", () => {
    const error = rechazo();
    assert.deepEqual(error.slugs, ["equipo", "funda"]);
    for (const causa of [error, new ErrorDeCompra("Rechazado", null, error)]) {
        const problema = problemaDeCheckout(causa, items);
        assert.match(problema.mensaje, /Equipo, Funda/);
        assert.equal(problema.ofrecerRetiro, true);
    }
    assert.match(problemaDeCheckout(parseStoreError(422, { error: { code: "pickup_only" } })).mensaje, /uno o más productos/);
    assert.match(problemaDeCheckout(parseStoreError(422, { error: { code: "pickup_only", details: { slug: "equipo" } } }), items).mensaje, /Equipo/);
});

test("422 pickup_only libera su intento y permite revisar un nuevo retiro", async () => {
    const almacen = almacenamiento();
    const anterior = await prepararIntento(almacen, items, (k, s) => armarPedido(datos, items, k, s));
    await assert.rejects(crearPedidoConRecuperacion(async () => { throw rechazo(); }, anterior.payload, almacen), StoreApiError);
    assert.equal(intentoDeCheckout(almacen), null);
    const nuevo = await prepararIntento(almacen, items, (k, s) => armarPedido({ ...datos, entrega: "retiro" }, items, k, s));
    assert.notEqual(nuevo.payload.checkout_key, anterior.payload.checkout_key);
    assert.equal(nuevo.payload.shipping_address, undefined);
});

test("respuesta perdida y errores inciertos conservan el intento original", async () => {
    for (const error of [new Error("Sin conexión"), new StoreApiError("Error", 500, "PICKUP_ONLY"), new StoreApiError("Error", 408, "TIMEOUT")]) {
        const almacen = almacenamiento();
        const anterior = await prepararIntento(almacen, items, (k, s) => armarPedido(datos, items, k, s));
        await assert.rejects(crearPedidoConRecuperacion(async () => { throw error; }, anterior.payload, almacen));
        assert.deepEqual(intentoDeCheckout(almacen), anterior.payload);
    }
});

test("rechazo tardío no borra el intento guardado por otra pestaña", async () => {
    const almacen = almacenamiento();
    const actual = await prepararIntento(almacen, items, (k, s) => armarPedido(datos, items, k, s));
    await assert.rejects(crearPedidoConRecuperacion(async () => { throw rechazo(); }, { ...actual.payload, checkout_key: "anterior" }, almacen));
    assert.deepEqual(intentoDeCheckout(almacen), actual.payload);
});

test("fallo al borrar no pierde el intento recuperable", async () => {
    const almacen = almacenamiento();
    const actual = await prepararIntento(almacen, items, (k, s) => armarPedido(datos, items, k, s));
    await assert.rejects(crearPedidoConRecuperacion(async () => { throw rechazo(); }, actual.payload, { ...almacen, removeItem: () => { throw Error("Bloqueado"); } }));
    assert.deepEqual(intentoDeCheckout(almacen), actual.payload);
});

test("las pantallas conectan la restricción y ofrecen retiro sin borrar datos personales", () => {
    const carrito = readFileSync(new URL("../components/store/StoreCartSheet.tsx", import.meta.url), "utf8");
    const checkout = readFileSync(new URL("../components/store/CheckoutDialog.tsx", import.meta.url), "utf8");
    const ficha = readFileSync(new URL("../app/(site)/tienda/[slug]/ProductDetailClient.tsx", import.meta.url), "utf8");
    assert.match(ficha, /product.shipping_enabled === false \? "Solo retiro en el local"/);
    assert.match(carrito, /cart.length > 0 && soloRetiro.length === 0 &&/);
    assert.match(carrito, /Retirar en el local<\/button>/);
    assert.match(checkout, /disabled=\{soloRetiro.length > 0\}/);
    assert.match(checkout, /setDatos\(previos => \(\{ \.\.\.previos, entrega: "retiro" \}\)\)/);
    assert.match(checkout, /hayErrores\(validarDatos\(revision.datos, items\)\)/);
    assert.match(checkout, /problema\?\.ofrecerRetiro/);
});

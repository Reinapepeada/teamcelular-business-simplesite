import assert from "node:assert/strict";
import { lookupQuote } from "./quoteLookup";

// Ejecutar con: npx tsx src/lib/quoteLookup.test.ts

// iPhone con dos opciones de pantalla: rango del piso al precio de lista.
const iphone13 = lookupQuote("iPhone", "iPhone 13", ["Pantalla"]);
assert.equal(iphone13?.precision, "range");
assert.equal(iphone13?.from, 139900);
assert.equal(iphone13?.to, 249900);

// iPhone con una sola opción de pantalla: precio puntual de lista.
const iphone11 = lookupQuote("iPhone", "iPhone 11", ["Pantalla"]);
assert.equal(iphone11?.precision, "exact");
assert.equal(iphone11?.from, 129900);

// El modelo mas largo gana: "iPhone 13" tambien esta contenido en "13 Pro Max".
const proMax = lookupQuote("Apple", "iphone 13 pro max", ["Pantalla"]);
assert.equal(proMax?.to, 279900);
assert.equal(proMax?.from, 176900);

// Sin acentos ni mayusculas tiene que resolver igual.
assert.equal(lookupQuote("", "IPHONE 14 PRO", ["Batería"])?.from, 125000);

// Marca reconocida sin modelo cargado: rango de gama, no numero puntual.
const galaxy = lookupQuote("Samsung", "Galaxy A54", ["Pantalla"]);
assert.equal(galaxy?.precision, "range");
assert.equal(galaxy?.from, 69000);
assert.equal(galaxy?.to, 1199900);

// Alias de submarca.
assert.equal(lookupQuote("Redmi", "Note 13", ["Batería"])?.precision, "range");

// Sin precio de lista para esa falla: no se inventa nada.
assert.equal(lookupQuote("iPhone", "iPhone 13", ["Placa"]), null);

// Marca desconocida: silencio, no un numero equivocado.
assert.equal(lookupQuote("Nokia", "3310", ["Pantalla"]), null);

// Sin falla elegida todavia.
assert.equal(lookupQuote("iPhone", "iPhone 13", []), null);

console.log("quoteLookup: ok");

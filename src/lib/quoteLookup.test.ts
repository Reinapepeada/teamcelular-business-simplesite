import assert from "node:assert/strict";
import { lookupQuote } from "./quoteLookup";

// Ejecutar con: npx tsx src/lib/quoteLookup.test.ts

// Modelo exacto de iPhone: precio puntual de lista.
const iphone13 = lookupQuote("iPhone", "iPhone 13", ["Pantalla"]);
assert.equal(iphone13?.precision, "exact");
assert.equal(iphone13?.from, 249900);

// El modelo mas largo gana: "iPhone 13" tambien esta contenido en "13 Pro Max".
const proMax = lookupQuote("Apple", "iphone 13 pro max", ["Pantalla"]);
assert.equal(proMax?.from, 279900);

// Sin acentos ni mayusculas tiene que resolver igual.
assert.equal(lookupQuote("", "IPHONE 14 PRO", ["Bateria"])?.from, 209900);

// Marca reconocida sin modelo cargado: rango de gama, no numero puntual.
const galaxy = lookupQuote("Samsung", "Galaxy A54", ["Pantalla"]);
assert.equal(galaxy?.precision, "range");
assert.equal(galaxy?.from, 99900);
assert.equal(galaxy?.to, 1199900);

// Alias de submarca.
assert.equal(lookupQuote("Redmi", "Note 13", ["Bateria"])?.precision, "range");

// Sin precio de lista para esa falla: no se inventa nada.
assert.equal(lookupQuote("iPhone", "iPhone 13", ["Placa"]), null);

// Marca desconocida: silencio, no un numero equivocado.
assert.equal(lookupQuote("Nokia", "3310", ["Pantalla"]), null);

// Sin falla elegida todavia.
assert.equal(lookupQuote("iPhone", "iPhone 13", []), null);

console.log("quoteLookup: ok");

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const footer = readFileSync(new URL("../src/components/footer/FooterNUI.tsx", import.meta.url), "utf8");
const contacto = readFileSync(new URL("../src/app/(site)/contacto/page.tsx", import.meta.url), "utf8");

test("'Ver ubicación' del footer lleva al mapa aunque ya se esté en /contacto", () => {
  assert.match(footer, /href="\/contacto#ubicacion"\s[\s\S]{0,400}Ver ubicación/);
  assert.match(contacto, /<section id="ubicacion"[^>]*>\s*<h2[^>]*>\s*Nuestras sucursales en CABA/);
});

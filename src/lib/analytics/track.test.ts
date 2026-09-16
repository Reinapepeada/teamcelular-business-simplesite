import assert from "node:assert/strict";

// Ejecutar con: npx tsx src/lib/analytics/track.test.ts

const clarityCalls: unknown[][] = [];
const gtagCalls: unknown[][] = [];

(globalThis as Record<string, unknown>).window = globalThis;
(globalThis as unknown as Window).gtag = (...args: unknown[]) => {
  gtagCalls.push(args);
};
(globalThis as unknown as Window).clarity = (...args: unknown[]) => {
  clarityCalls.push(args);
};

// import diferido: los stubs de window tienen que existir antes de cargar el modulo
import("./track").then(({ track }) => run(track));

type Track = typeof import("./track").track;

function run(track: Track) {

track("budget_wizard_abandon", { step_id: "issue", step_index: 2 });

// GA4 sigue recibiendo el evento con todos sus parametros.
assert.deepEqual(gtagCalls[0], [
  "event",
  "budget_wizard_abandon",
  { step_id: "issue", step_index: 2 },
]);

// Clarity recibe el evento y el paso como tag, que es lo que permite filtrar
// las grabaciones por "abandono en el paso de la falla".
assert.deepEqual(clarityCalls[0], ["event", "budget_wizard_abandon"]);
assert.deepEqual(clarityCalls[1], ["set", "budget_wizard_abandon_step", "issue"]);

// Un evento sin paso no genera tag: no se inventa una dimension vacia.
clarityCalls.length = 0;
track("cta_click", { cta_name: "home_hero" });
assert.deepEqual(clarityCalls, [["event", "cta_click"]]);

// Sin props tampoco rompe.
clarityCalls.length = 0;
track("branch_selector_open");
assert.deepEqual(clarityCalls, [["event", "branch_selector_open"]]);

console.log("track: ok");
}

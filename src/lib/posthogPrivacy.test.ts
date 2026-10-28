import assert from "node:assert/strict";
import { test } from "node:test";
import { type CaptureResult } from "posthog-js";
import { isPostHogPublicPage, sanitizePostHogEvent } from "./analytics/posthog";
import { isPerformanceDependencyUrl } from "./analytics/measurement";

function event(name = "$pageview", url = "https://teamcelular.com/presupuesto-reparacion?email=private@example.test#contact") {
  return {
    event: name,
    properties: {
      $current_url: url, distinct_id: "anonymous-test", $session_id: "session-test",
      form_name: "repair_budget_wizard", form_version: "v3", step_index: 1,
      email: "private@example.test", phone: "private-phone", model: "free text",
      destination: "https://wa.me/private?text=private", repair_type: "private",
      $initial_current_url: url, $session_entry_url: url,
      $set: { email: "private@example.test" }, $referrer: url, utm_source: "private@example.test",
    },
  } as CaptureResult;
}

test("PostHog conserva visitas y pasos, sin respuestas ni parámetros o perfiles personales", () => {
  for (const name of ["$pageview", "budget_wizard_view", "budget_wizard_step_view", "budget_wizard_abandon", "lead_form_submit"]) {
    const result = sanitizePostHogEvent(event(name));
    assert.deepEqual(result?.properties, {
      distinct_id: "anonymous-test", $session_id: "session-test",
      form_name: "repair_budget_wizard", form_version: "v3", step_index: 1,
      $current_url: "https://teamcelular.com/presupuesto-reparacion",
      $pathname: "/presupuesto-reparacion",
      measurement_version: 2, page_type: "budget",
    });
  }
});

test("PostHog excluye previews, rutas privadas y eventos fuera del alcance autorizado", () => {
  for (const url of ["https://preview.vercel.app/", "https://teamcelular.com.evil.test/", "https://teamcelular.com/admin/leads", "https://teamcelular.com/checkout/exito?token=private", "invalid"]) {
    assert.equal(sanitizePostHogEvent(event("$pageview", url)), null);
  }
  assert.equal(isPostHogPublicPage("localhost", "/"), false);
  assert.equal(sanitizePostHogEvent(event("$autocapture")), null);
  assert.equal(sanitizePostHogEvent(event("$identify")), null);
  const otherForm = event("lead_form_submit");
  otherForm.properties.form_name = "other";
  assert.ok(sanitizePostHogEvent(otherForm));
  assert.equal(sanitizePostHogEvent(null), null);
});

test("sólo se permiten las dependencias oficiales de Web Vitals por HTTPS", () => {
  assert.equal(isPerformanceDependencyUrl("https://us-assets.i.posthog.com/static/1.441.2/web-vitals-with-attribution.js"), true);
  assert.equal(isPerformanceDependencyUrl("https://us-assets.i.posthog.com/static/web-vitals.js?v=1"), true);
  for (const url of ["https://us-assets.i.posthog.com/static/recorder.js", "https://us-assets.i.posthog.com/static/surveys.js",
    "https://posthog.com.evil.test/web-vitals.js", "http://us-assets.i.posthog.com/static/web-vitals.js", "invalid"]) {
    assert.equal(isPerformanceDependencyUrl(url), false);
  }
});

test("Web Vitals conserva valores numéricos y elimina objetos de atribución con contenido del DOM", () => {
  const metric = event("$web_vitals", "https://teamcelular.com/tienda?email=private@example.test");
  metric.properties.$web_vitals_LCP_value = 1234;
  metric.properties.$web_vitals_LCP_event = { target: "private@example.test", entries: [{ element: "private-field" }] };
  const result = sanitizePostHogEvent(metric);
  assert.equal(result?.properties.$web_vitals_LCP_value, 1234);
  assert.equal(result?.properties.$web_vitals_LCP_event, undefined);
  assert.ok(!JSON.stringify(result).includes("private"));
});

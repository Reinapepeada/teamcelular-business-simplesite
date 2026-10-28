import assert from "node:assert/strict";
import { test } from "node:test";
import { type CaptureResult } from "posthog-js";
import { isPostHogPublicPage, sanitizePostHogEvent } from "./analytics/posthog";

function event(name = "$pageview", url = "https://teamcelular.com/presupuesto-reparacion?email=private@example.test#contact") {
  return {
    event: name,
    properties: {
      $current_url: url, distinct_id: "anonymous-test", $session_id: "session-test",
      form_name: "repair_budget_wizard", form_version: "v3", step_index: 1,
      email: "private@example.test", phone: "private-phone", model: "free text",
      destination: "https://wa.me/private?text=private", repair_type: "private",
      $initial_current_url: url, $session_entry_url: url,
      $set: { email: "private@example.test" }, $referrer: url, utm_source: "private",
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
  assert.equal(sanitizePostHogEvent(otherForm), null);
  assert.equal(sanitizePostHogEvent(null), null);
});

import assert from "node:assert/strict";
import test from "node:test";
import { blockingAdvisories } from "./audit-prod.mjs";

const advisory = (id, severity) => ({
  source: 1,
  name: "pkg",
  title: "t",
  severity,
  url: `https://github.com/advisories/${id}`,
});

const report = {
  vulnerabilities: {
    braces: { via: [advisory("GHSA-allowed", "high")] },
    chokidar: { via: ["braces"] },
    sharp: { via: [advisory("GHSA-new", "high")] },
    postcss: { via: [advisory("GHSA-moderate", "moderate")] },
  },
};

test("falla con high/critical nuevos y deja pasar los exceptuados vigentes", () => {
  const blocking = blockingAdvisories(report, { "GHSA-allowed": "2027-01-06" }, new Date("2026-10-06"));
  assert.equal(blocking.length, 1);
  assert.match(blocking[0], /^GHSA-new high/);
});

test("una excepcion vencida vuelve a bloquear", () => {
  const blocking = blockingAdvisories(report, { "GHSA-allowed": "2027-01-06" }, new Date("2027-01-07"));
  assert.equal(blocking.length, 2);
  assert.ok(blocking.some((line) => line.includes("excepcion vencida")));
});

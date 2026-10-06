import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const workflow = readFileSync(".github/workflows/commerce-ci.yml", "utf8");
const nodeVersion = readFileSync(".nvmrc", "utf8").trim();
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const npmConfig = readFileSync(".npmrc", "utf8");

test("CI de tienda prueba y compila sin secretos ni despliegue", () => {
  assert.match(workflow, /run: npm ci/);
  assert.match(workflow, /node-version-file: \.nvmrc/);
  assert.match(workflow, /actions\/checkout@11d5960a326750d5838078e36cf38b85af677262/);
  assert.match(workflow, /actions\/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020/);
  assert.doesNotMatch(workflow, /uses: actions\/(checkout|setup-node)@v\d/);
  assert.equal(nodeVersion, "24.14.0");
  assert.equal(packageJson.engines.node, ">=22.19.0");
  assert.match(npmConfig, /^engine-strict=true\s*$/);
  assert.match(workflow, /run: npm audit --audit-level=high --omit=dev/);
  assert.match(workflow, /run: npm run lint/);
  assert.match(workflow, /run: npm test/);
  assert.match(workflow, /run: npm run build/);
  assert.match(
    workflow,
    /NEXT_PUBLIC_BASE_URL: https:\/\/store\.example\.test/,
  );
  assert.match(workflow, /STORE_SAME_ORIGIN_PROXY_CONFIRMED: ["']true["']/);
  assert.doesNotMatch(workflow, /\b(deploy|ssh|rsync|secrets\.)\b/i);
});

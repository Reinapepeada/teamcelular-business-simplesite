import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["src", "public"];
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".txt"]);
const mojibake = /Ã|Â|â€|�/;
const offenders = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walk(path);
      continue;
    }
    if (![...extensions].some((ext) => path.endsWith(ext))) continue;

    const text = readFileSync(path, "utf8");
    if (mojibake.test(text)) offenders.push(path);
  }
}

roots.forEach(walk);
assert.deepEqual(offenders, [], `mojibake found in:\n${offenders.join("\n")}`);

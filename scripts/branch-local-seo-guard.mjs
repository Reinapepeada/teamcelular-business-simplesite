import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");

const businessProfile = read("src/lib/businessProfile.ts");
const structuredData = read("src/components/seo/StructuredData.tsx");
const llms = read("public/llms.txt");
const ai = read("public/ai.txt");

for (const branch of ["recoleta", "belgrano"]) {
  assert.match(businessProfile, new RegExp(`slug:\\s*"${branch}"`), `missing BRANCHES.${branch} slug`);
  assert.match(
    businessProfile,
    new RegExp(`whatsappText:\\s*"[^"]*${branch}`, "i"),
    `missing contextual WhatsApp text for ${branch}`,
  );
  assert.match(llms, new RegExp(`/sucursales/caba/${branch}`), `missing ${branch} in llms.txt`);
  assert.match(ai, new RegExp(`/sucursales/caba/${branch}`), `missing ${branch} in ai.txt`);
}

for (const field of ["mapUrl", "latitude", "longitude", "postalCode"]) {
  assert.match(businessProfile, new RegExp(field), `branch data missing ${field}`);
}

assert.match(structuredData, /BRANCHES\.map/, "StructuredData should build departments from BRANCHES");
assert.match(businessProfile, /phone:\s*"\+54 11 3173-9099"/, "Belgrano should expose Amenabar phone");
assert.match(businessProfile, /whatsapp:\s*"https:\/\/wa\.me\/5491131739099"/, "Belgrano should use Amenabar WhatsApp");
assert.match(businessProfile, /street:\s*"Amenabar 2032"/, "Belgrano should use Amenabar 2032");
assert.doesNotMatch(businessProfile, /Amenabar 2030/, "Belgrano should not use old Amenabar 2030 address");

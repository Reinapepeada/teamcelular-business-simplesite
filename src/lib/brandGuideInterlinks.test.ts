import { test } from "node:test";
import assert from "node:assert/strict";
import { BRAND_GUIDE_LIST, getBrandGuideConfig } from "@/app/(site)/guias/brandGuideConfigs";

test("cada guía de marca enlaza a todas las demás guías de marca", () => {
  for (const guide of BRAND_GUIDE_LIST) {
    const hrefs = getBrandGuideConfig(guide.slug).relatedLinks.map((link) => link.href);
    for (const other of BRAND_GUIDE_LIST) {
      if (other.slug === guide.slug) {
        assert.equal(hrefs.includes(other.path), false, `${guide.slug} no debe enlazarse a sí misma`);
      } else {
        assert.equal(hrefs.includes(other.path), true, `${guide.slug} debe enlazar a ${other.path}`);
      }
    }
  }
});

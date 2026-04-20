import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-zte-buenos-aires"
);

export default function ZteGuidePage() {
  return <BrandGuidePage slug="reparacion-zte-buenos-aires" />;
}

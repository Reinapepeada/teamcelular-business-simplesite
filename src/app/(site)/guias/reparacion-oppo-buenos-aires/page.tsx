import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-oppo-buenos-aires"
);

export default function OppoGuidePage() {
  return <BrandGuidePage slug="reparacion-oppo-buenos-aires" />;
}

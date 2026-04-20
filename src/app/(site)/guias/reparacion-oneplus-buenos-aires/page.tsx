import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-oneplus-buenos-aires"
);

export default function OneplusGuidePage() {
  return <BrandGuidePage slug="reparacion-oneplus-buenos-aires" />;
}

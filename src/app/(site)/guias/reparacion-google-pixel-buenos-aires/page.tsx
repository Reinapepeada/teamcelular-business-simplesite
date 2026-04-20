import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-google-pixel-buenos-aires"
);

export default function GooglePixelGuidePage() {
  return <BrandGuidePage slug="reparacion-google-pixel-buenos-aires" />;
}

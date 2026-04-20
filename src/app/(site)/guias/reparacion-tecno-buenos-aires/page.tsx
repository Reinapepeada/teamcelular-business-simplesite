import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-tecno-buenos-aires"
);

export default function TecnoGuidePage() {
  return <BrandGuidePage slug="reparacion-tecno-buenos-aires" />;
}

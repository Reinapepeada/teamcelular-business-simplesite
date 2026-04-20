import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-asus-buenos-aires"
);

export default function AsusGuidePage() {
  return <BrandGuidePage slug="reparacion-asus-buenos-aires" />;
}

import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-honor-buenos-aires"
);

export default function HonorGuidePage() {
  return <BrandGuidePage slug="reparacion-honor-buenos-aires" />;
}

import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-infinix-buenos-aires"
);

export default function InfinixGuidePage() {
  return <BrandGuidePage slug="reparacion-infinix-buenos-aires" />;
}

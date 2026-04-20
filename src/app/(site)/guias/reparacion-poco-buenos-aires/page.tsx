import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-poco-buenos-aires"
);

export default function PocoGuidePage() {
  return <BrandGuidePage slug="reparacion-poco-buenos-aires" />;
}

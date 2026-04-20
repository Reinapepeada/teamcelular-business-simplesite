import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-alcatel-buenos-aires"
);

export default function AlcatelGuidePage() {
  return <BrandGuidePage slug="reparacion-alcatel-buenos-aires" />;
}

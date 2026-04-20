import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-huawei-buenos-aires"
);

export default function HuaweiGuidePage() {
  return <BrandGuidePage slug="reparacion-huawei-buenos-aires" />;
}

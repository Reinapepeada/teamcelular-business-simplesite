import type { Metadata } from "next";
import BrandGuidePage from "../BrandGuidePage";
import { getBrandGuideMetadata } from "../brandGuideConfigs";

export const metadata: Metadata = getBrandGuideMetadata(
  "reparacion-tcl-buenos-aires"
);

export default function TclGuidePage() {
  return <BrandGuidePage slug="reparacion-tcl-buenos-aires" />;
}

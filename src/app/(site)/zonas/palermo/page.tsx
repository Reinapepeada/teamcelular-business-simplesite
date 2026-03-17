import ZoneLandingPage, { buildZoneMetadata } from "../zoneLanding";
import { ZONE_CONFIGS } from "../zoneConfigs";

const config = ZONE_CONFIGS.palermo;

export const metadata = buildZoneMetadata(config);

export default function ZonaPalermoPage() {
  return <ZoneLandingPage config={config} />;
}

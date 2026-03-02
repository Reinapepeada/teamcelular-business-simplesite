import ZoneLandingPage, { buildZoneMetadata } from "../zoneLanding";
import { ZONE_CONFIGS } from "../zoneConfigs";

const config = ZONE_CONFIGS.balvanera;

export const metadata = buildZoneMetadata(config);

export default function ZonaBalvaneraPage() {
  return <ZoneLandingPage config={config} />;
}

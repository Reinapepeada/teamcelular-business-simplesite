import ZoneLandingPage, { buildZoneMetadata } from "../zoneLanding";
import { ZONE_CONFIGS } from "../zoneConfigs";

const config = ZONE_CONFIGS.microcentro;

export const metadata = buildZoneMetadata(config);

export default function ZonaMicrocentroPage() {
  return <ZoneLandingPage config={config} />;
}

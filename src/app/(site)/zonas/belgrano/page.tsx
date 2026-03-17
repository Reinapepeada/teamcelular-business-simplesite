import ZoneLandingPage, { buildZoneMetadata } from "../zoneLanding";
import { ZONE_CONFIGS } from "../zoneConfigs";

const config = ZONE_CONFIGS.belgrano;

export const metadata = buildZoneMetadata(config);

export default function ZonaBelgranoPage() {
  return <ZoneLandingPage config={config} />;
}

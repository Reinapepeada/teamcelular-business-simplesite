import ZoneLandingPage, { buildZoneMetadata } from "../zoneLanding";
import { ZONE_CONFIGS } from "../zoneConfigs";

const config = ZONE_CONFIGS.caballito;

export const metadata = buildZoneMetadata(config);

export default function ZonaCaballitoPage() {
  return <ZoneLandingPage config={config} />;
}

import ZoneLandingPage, { buildZoneMetadata } from "../zoneLanding";
import { ZONE_CONFIGS } from "../zoneConfigs";

const config = ZONE_CONFIGS.recoleta;

export const metadata = buildZoneMetadata(config);

export default function ZonaRecoletaPage() {
  return <ZoneLandingPage config={config} />;
}

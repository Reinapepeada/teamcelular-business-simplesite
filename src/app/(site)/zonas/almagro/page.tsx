import ZoneLandingPage, { buildZoneMetadata } from "../zoneLanding";
import { ZONE_CONFIGS } from "../zoneConfigs";

const config = ZONE_CONFIGS.almagro;

export const metadata = buildZoneMetadata(config);

export default function ZonaAlmagroPage() {
  return <ZoneLandingPage config={config} />;
}

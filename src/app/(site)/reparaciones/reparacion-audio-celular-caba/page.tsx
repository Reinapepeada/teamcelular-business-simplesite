import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";

const config = SERVICE_CONFIGS["reparacion-audio-celular-caba"];

export const metadata = buildServiceMetadata(config);

export default function ReparacionAudioCelularCabaPage() {
  return <ServiceLandingPage config={config} />;
}

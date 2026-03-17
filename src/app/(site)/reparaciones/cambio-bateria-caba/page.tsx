import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";

const config = SERVICE_CONFIGS["cambio-bateria-caba"];

export const metadata = buildServiceMetadata(config);

export default function CambioBateriaCabaPage() {
  return <ServiceLandingPage config={config} />;
}

import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";

const config = SERVICE_CONFIGS["cambio-pantalla-caba"];

export const metadata = buildServiceMetadata(config);

export default function CambioPantallaCabaPage() {
  return <ServiceLandingPage config={config} />;
}

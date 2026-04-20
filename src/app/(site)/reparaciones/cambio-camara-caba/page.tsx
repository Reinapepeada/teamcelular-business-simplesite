import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";

const config = SERVICE_CONFIGS["cambio-camara-caba"];

export const metadata = buildServiceMetadata(config);

export default function CambioCamaraCabaPage() {
  return <ServiceLandingPage config={config} />;
}

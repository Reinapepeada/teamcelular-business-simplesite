import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";

const config = SERVICE_CONFIGS["cambio-pin-carga-caba"];

export const metadata = buildServiceMetadata(config);

export default function CambioPinCargaCabaPage() {
  return <ServiceLandingPage config={config} />;
}

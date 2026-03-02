import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";

const config = SERVICE_CONFIGS["cambio-flex-caba"];

export const metadata = buildServiceMetadata(config);

export default function CambioFlexCabaPage() {
  return <ServiceLandingPage config={config} />;
}

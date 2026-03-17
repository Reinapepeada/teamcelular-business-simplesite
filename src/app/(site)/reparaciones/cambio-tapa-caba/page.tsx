import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";

const config = SERVICE_CONFIGS["cambio-tapa-caba"];

export const metadata = buildServiceMetadata(config);

export default function CambioTapaCabaPage() {
  return <ServiceLandingPage config={config} />;
}

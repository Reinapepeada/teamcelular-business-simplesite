import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";

const config = SERVICE_CONFIGS["reparacion-placa-caba"];

export const metadata = buildServiceMetadata(config);

export default function ReparacionPlacaCabaPage() {
  return <ServiceLandingPage config={config} />;
}

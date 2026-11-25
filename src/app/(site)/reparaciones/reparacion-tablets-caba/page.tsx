import { SiApple, SiLenovo, SiSamsung, SiXiaomi } from "react-icons/si";
import ServiceLandingPage, { buildServiceMetadata } from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";

const config = SERVICE_CONFIGS["reparacion-tablets-caba"];

export const metadata = buildServiceMetadata(config);

const BRANDS = [
  { label: "iPad", Icon: SiApple },
  { label: "Galaxy Tab", Icon: SiSamsung, wide: true },
  { label: "Lenovo", Icon: SiLenovo, wide: true },
  { label: "Xiaomi", Icon: SiXiaomi },
];

// Reemplaza los accesos a guías de marcas de celulares, que no aplican a tablets.
function TabletBrands() {
  return (
    <ul aria-label="Marcas de tablets que reparamos" className="grid grid-cols-2 gap-2 border-y border-[#333336] py-4 sm:grid-cols-4">
      {BRANDS.map(({ label, Icon, wide }) => (
        <li key={label} className="flex min-h-20 flex-col items-center justify-center gap-3 text-[#c7c7cc]">
          <Icon aria-hidden className={wide ? "h-7 w-16" : "h-7 w-7"} />
          <span className="text-sm">{label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ReparacionTabletsCabaPage() {
  return <ServiceLandingPage config={config} brands={<TabletBrands />} />;
}

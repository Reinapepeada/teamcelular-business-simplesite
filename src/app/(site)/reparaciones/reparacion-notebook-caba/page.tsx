import Link from "next/link";
import {
  FaBatteryQuarter,
  FaBug,
  FaHdd,
  FaKeyboard,
  FaLaptop,
  FaPowerOff,
  FaThermometerHalf,
  FaTint,
} from "react-icons/fa";
import { SiAcer, SiApple, SiAsus, SiDell, SiHp, SiLenovo } from "react-icons/si";
import ServiceLandingPage, { buildServiceMetadata } from "../serviceLanding";
import { NOTEBOOK_PRICES, SERVICE_CONFIGS } from "../serviceConfigs";
import { formatArsPrice } from "@/lib/repairPrices";

const config = SERVICE_CONFIGS["reparacion-notebook-caba"];

export const metadata = buildServiceMetadata(config);

const SYMPTOMS = [
  { Icon: FaThermometerHalf, symptom: "Se calienta, el ventilador suena fuerte o se apaga sola", cause: "Polvo en el disipador y pasta térmica seca.", fix: "Limpieza interna y cambio de pasta térmica." },
  { Icon: FaHdd, symptom: "Tarda en arrancar y todo anda lento", cause: "Disco rígido mecánico gastado o Windows saturado.", fix: "Cambio a SSD con traspaso de Windows y archivos." },
  { Icon: FaPowerOff, symptom: "No prende o prende sin imagen", cause: "Cargador, pin de carga, memoria o placa.", fix: "Revisión por etapas; si es placa, microsoldadura." },
  { Icon: FaBatteryQuarter, symptom: "No carga o dura muy poco", cause: "Cargador, conector de carga o batería agotada.", fix: "Medimos cada parte y cambiamos la que falla." },
  { Icon: FaLaptop, symptom: "La bisagra cruje o la tapa se despega", cause: "Anclajes de la bisagra rotos en la carcasa.", fix: "Reparación de bisagra y refuerzo de la base." },
  { Icon: FaKeyboard, symptom: "Teclas que no andan o escriben solas", cause: "Líquido derramado o flex del teclado.", fix: "Limpieza o cambio de teclado según el modelo." },
  { Icon: FaTint, symptom: "Se le volcó agua, café o mate", cause: "Líquido sobre la placa: corroe en horas.", fix: "Apagala, no la cargues y traela para limpiar la placa." },
  { Icon: FaBug, symptom: "Virus, ventanas emergentes o Windows que no inicia", cause: "Software dañado o malware.", fix: "Respaldo de archivos y reinstalación de Windows con drivers." },
];

// Puntos del diagrama: [x, y] en el viewBox, número y rótulo.
const PARTS = [
  { n: 1, x: 160, y: 70, label: "Pantalla y flex de video" },
  { n: 2, x: 300, y: 200, label: "Bisagras" },
  { n: 3, x: 120, y: 262, label: "Teclado" },
  { n: 4, x: 360, y: 300, label: "Ventilador y disipador" },
  { n: 5, x: 250, y: 312, label: "Placa madre" },
  { n: 6, x: 160, y: 318, label: "Disco SSD y memoria RAM" },
  { n: 7, x: 70, y: 312, label: "Batería" },
  { n: 8, x: 436, y: 304, label: "Conector de carga" },
];

const BRANDS = [
  { label: "HP", Icon: SiHp },
  { label: "Lenovo", Icon: SiLenovo, wide: true },
  { label: "Dell", Icon: SiDell },
  { label: "Asus", Icon: SiAsus, wide: true },
  { label: "Acer", Icon: SiAcer, wide: true },
  { label: "MacBook", Icon: SiApple },
];

function NotebookBrands() {
  return (
    <ul aria-label="Marcas de notebooks que reparamos" className="grid grid-cols-3 gap-2 border-y border-[#333336] py-4 sm:grid-cols-6">
      {BRANDS.map(({ label, Icon, wide }) => (
        <li key={label} className="flex min-h-20 flex-col items-center justify-center gap-3 text-[#c7c7cc]">
          <Icon aria-hidden className={wide ? "h-7 w-16" : "h-7 w-7"} />
          <span className="text-sm">{label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ReparacionNotebookCabaPage() {
  return (
    <ServiceLandingPage config={config} brands={<NotebookBrands />}>
      <section className="tc-section">
        <p className="tc-eyebrow">Guía rápida</p>
        <h2 className="tc-heading mt-3 max-w-3xl">¿Qué le pasa a tu notebook?</h2>
        <p className="tc-body mt-5 max-w-3xl">
          Buscá el síntoma que ves. Para cada uno tenés la causa más común y lo que hacemos para arreglarlo. La revisión confirma cuál es en tu equipo.
        </p>
        <ul className="mt-10 divide-y divide-[#333336] rounded-[28px] bg-[#1d1d1f] px-5 sm:px-7">
          {SYMPTOMS.map(({ Icon, symptom, cause, fix }) => (
            <li key={symptom} className="grid gap-3 py-6 md:grid-cols-[1.1fr_0.9fr_0.9fr] md:gap-6">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0a2a5c] text-[#6aa6ff]">
                  <Icon aria-hidden />
                </span>
                <h3 className="text-[17px] font-semibold leading-snug">{symptom}</h3>
              </div>
              <p className="pl-14 text-[15px] leading-6 text-[#a1a1a6] md:pl-0">
                <span className="block text-[12px] uppercase tracking-[0.08em] text-[#86868b]">Causa común</span>
                {cause}
              </p>
              <p className="pl-14 text-[15px] leading-6 text-[#f5f5f7] md:pl-0">
                <span className="block text-[12px] uppercase tracking-[0.08em] text-[#86868b]">Qué hacemos</span>
                {fix}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full bg-[#f5f5f7] text-[#1d1d1f]">
        <div className="tc-section grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="tc-eyebrow !text-[#6e6e73]">Por dentro</p>
            <h2 className="tc-heading mt-3 !text-[#1d1d1f]">¿Qué partes de una notebook se reparan?</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-[#424245]">
              Casi todas. Lo que más entra al laboratorio es la ventilación tapada (4), el disco lento (6) y las bisagras rotas (2). La placa (5) se repara con microsoldadura cuando la falla está en un componente y no en toda la placa.
            </p>
            <ol className="mt-6 grid gap-x-6 gap-y-2 text-[15px] leading-6 text-[#424245] sm:grid-cols-2">
              {PARTS.map((part) => (
                <li key={part.n} className="flex gap-3">
                  <span className="w-5 shrink-0 font-semibold tabular-nums text-[#1a6dff]">{part.n}</span>
                  {part.label}
                </li>
              ))}
            </ol>
          </div>
          <figure>
            <svg viewBox="0 0 480 360" role="img" aria-labelledby="notebook-diagram-title" className="h-auto w-full">
              <title id="notebook-diagram-title">Diagrama de una notebook con sus partes numeradas</title>
              <rect x="70" y="20" width="340" height="190" rx="14" fill="#1d1d1f" />
              <rect x="86" y="36" width="308" height="160" rx="6" fill="#2c3e5c" />
              <rect x="20" y="214" width="440" height="126" rx="16" fill="#d2d2d7" />
              <rect x="40" y="228" width="400" height="58" rx="8" fill="#ffffff" />
              <g fill="#e8e8ed">
                {Array.from({ length: 24 }, (_, i) => (
                  <rect key={i} x={50 + (i % 12) * 32} y={236 + Math.floor(i / 12) * 24} width="26" height="18" rx="3" />
                ))}
              </g>
              <rect x="40" y="294" width="60" height="38" rx="5" fill="#9fc5a8" />
              <rect x="130" y="300" width="58" height="26" rx="4" fill="#b7b7c2" />
              <rect x="200" y="296" width="110" height="34" rx="5" fill="#7fa37f" />
              <circle cx="360" cy="312" r="20" fill="#86868b" />
              <circle cx="360" cy="312" r="7" fill="#d2d2d7" />
              <rect x="426" y="262" width="20" height="12" rx="3" fill="#424245" />
              <rect x="140" y="204" width="40" height="14" rx="4" fill="#424245" />
              <rect x="300" y="204" width="40" height="14" rx="4" fill="#424245" />
              {PARTS.map((part) => (
                <g key={part.n}>
                  <circle cx={part.x} cy={part.y} r="13" fill="#1a6dff" stroke="#ffffff" strokeWidth="2" />
                  <text x={part.x} y={part.y + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill="#ffffff">{part.n}</text>
                </g>
              ))}
            </svg>
            <figcaption className="mt-3 text-sm text-[#6e6e73]">Esquema simplificado. La ubicación de cada parte cambia según el modelo.</figcaption>
          </figure>
        </div>
      </section>

      <section className="tc-section">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="tc-heading">¿Conviene reparar o comprar otra?</h2>
          <div className="space-y-5 text-[17px] leading-relaxed text-[#a1a1a6]">
            <p>
              <strong className="text-[#f5f5f7]">Conviene reparar</strong> si la falla es limpieza, disco, Windows, bisagra, teclado o batería. Una notebook de 4 o 5 años con SSD y la ventilación limpia rinde bien para trabajo y estudio.
            </p>
            <p>
              <strong className="text-[#f5f5f7]">Hay que pensarlo</strong> si la placa tiene daño grande o si la reparación supera la mitad de lo que sale un equipo equivalente. En ese caso te lo decimos con números antes de que pagues algo más que la revisión ({formatArsPrice(NOTEBOOK_PRICES.revision.from)} a {formatArsPrice(NOTEBOOK_PRICES.revision.to)}).
            </p>
            <p>
              Si el problema es solo que está lenta, mirá primero la pregunta del SSD más abajo. Para fallas de encendido, leé cómo trabajamos la{" "}
              <Link href="/reparaciones/reparacion-placa-caba" className="tc-link">reparación de placa</Link>.
            </p>
          </div>
        </div>
      </section>
    </ServiceLandingPage>
  );
}

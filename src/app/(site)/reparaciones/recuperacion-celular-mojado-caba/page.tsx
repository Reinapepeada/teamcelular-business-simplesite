import Link from "next/link";
import { BRANCHES, BUSINESS_PROFILE } from "@/lib/businessProfile";
import { PLACA_REVISION_PRICE, formatArsPrice } from "@/lib/repairPrices";
import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";

const config = SERVICE_CONFIGS["recuperacion-celular-mojado-caba"];

export const metadata = buildServiceMetadata(config);

export default function RecuperacionCelularMojadoCabaPage() {
  return (
    <ServiceLandingPage config={config}>
      <section className="tc-section">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="tc-eyebrow">Revisión y presupuesto</p>
            <h2 className="tc-heading mt-3">¿Cuánto cuesta reparar un celular mojado?</h2>
            <p className="tc-body mt-5">
              No hay un precio único: depende del modelo, del ingreso de líquido y
              de qué componentes estén afectados. Te informamos el costo de
              revisión antes de ingresar el equipo. Preguntar por WhatsApp no tiene costo.
            </p>
          </div>
          <div className="overflow-x-auto rounded-[28px] bg-[#1d1d1f] px-5 sm:px-7">
            <table className="w-full text-left text-[15px] leading-6">
              <caption className="sr-only">Etapas que se cotizan en un celular con daño por líquidos</caption>
              <thead>
                <tr className="border-b border-[#424245] text-[#f5f5f7]">
                  <th scope="col" className="py-5 pr-4">Etapa</th>
                  <th scope="col" className="py-5">Cómo se informa el costo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333336] text-[#a1a1a6]">
                <tr><th scope="row" className="py-5 pr-4 font-medium text-[#f5f5f7]">Revisión técnica</th><td className="py-5">Arancel informado antes de ingresar. Si no aceptás el arreglo, pagás la revisión acordada.</td></tr>
                <tr><th scope="row" className="py-5 pr-4 font-medium text-[#f5f5f7]">Limpieza y secado</th><td className="py-5">Se explica el alcance y se cotiza según la evaluación. Confirmá qué incluye antes de autorizar.</td></tr>
                <tr><th scope="row" className="py-5 pr-4 font-medium text-[#f5f5f7]">Reparación y repuestos</th><td className="py-5">Presupuesto según el daño encontrado. Un componente adicional requiere que te avisemos antes de avanzar.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="tc-body mt-8 max-w-4xl">
          Si hace falta una revisión de placa, corresponde otro servicio: cuesta{" "}
          {formatArsPrice(PLACA_REVISION_PRICE)}, se cobra aunque no se repare y se
          descuenta si aceptás el arreglo. Ese importe no es una tarifa de limpieza
          ni el precio total de recuperar un celular mojado. Consultá las{" "}
          <Link href="/reparaciones/reparacion-placa-caba" className="tc-link">condiciones de revisión de placa</Link>.
        </p>
      </section>

      <section className="tc-section !pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="tc-heading">¿Cuánto tarda el diagnóstico y el arreglo?</h2>
            <p className="tc-body mt-5">
              La evaluación inicial orienta cómo seguir; no equivale a tener el
              celular reparado. Confirmamos el plazo al recibirlo según el daño.
              Si requiere revisión de placa, el informe lleva hasta 72 horas
              hábiles y un arreglo de placa lleva semanas. El plazo del trabajo
              se informa por escrito antes de que lo aceptes.
            </p>
          </div>
          <div>
            <h2 className="tc-heading">¿Querés recuperar el equipo o sus fotos?</h2>
            <p className="tc-body mt-5">
              Decinos qué es lo más importante antes de autorizar una intervención.
              Recuperar datos puede requerir que el celular vuelva a funcionar
              parcialmente; no siempre es posible. Primero evaluamos el acceso
              a la información y el daño. No prometemos recuperar fotos, contactos
              ni chats por el solo hecho de limpiar la placa.
            </p>
            <p className="tc-body mt-4">
              No mandes contraseñas ni códigos de verificación por WhatsApp. Si
              hace falta acceder al equipo, lo coordinamos con vos en la sucursal.
            </p>
          </div>
        </div>
      </section>

      <section className="tc-section !pt-0" aria-labelledby="caso-ilustrativo">
        <div className="rounded-[28px] border border-[#424245] p-6 sm:p-10">
          <p className="tc-eyebrow">Ejemplo hipotético</p>
          <h2 id="caso-ilustrativo" className="tc-heading mt-3">Prende, pero el táctil deja de responder</h2>
          <p className="mt-4 text-[15px] leading-6 text-[#a1a1a6]">
            Este ejemplo explica cómo se decide un trabajo. No corresponde a una
            reparación ni a un resultado real de Team Celular.
          </p>
          <p className="tc-body mt-5">
            Supongamos que un celular cae al agua y después falla el táctil.
            La inspección encuentra residuos en el conector de pantalla. Se
            propone una limpieza y luego pruebas: si recupera respuesta y se
            mantiene estable, no habría motivo para cambiar la pantalla por
            descarte. Si sigue fallando, se evalúa el módulo o la placa y se
            consulta un nuevo presupuesto antes de seguir.
          </p>
          <p className="tc-body mt-4">
            El síntoma orienta la revisión; lo que se encuentra al medir define
            la propuesta. Un caso parecido puede tener otro daño y otro resultado.
          </p>
        </div>
      </section>

      <section className="tc-section !pt-0">
        <h2 className="tc-heading">¿Dónde traer un celular mojado en CABA?</h2>
        <p className="tc-body mt-5">{BUSINESS_PROFILE.hours.text}. Escribinos para coordinar el ingreso y explicar qué pasó.</p>
        <ul className="mt-6 divide-y divide-[#333336]">
          {BRANCHES.map((branch) => (
            <li key={branch.slug} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
              <span className="text-[19px]">{branch.shortName}: {branch.street}</span>
              <Link href={branch.url} className="tc-link inline-flex min-h-11 items-center">Ver sucursal {branch.shortName} ›</Link>
            </li>
          ))}
        </ul>
        <p className="tc-body mt-6 max-w-4xl">
          Para los primeros pasos, leé la{" "}
          <Link href="/guias/celular-mojado-que-hacer" className="tc-link">guía de qué hacer si se mojó tu celular</Link>.
          Si un iPhone solo muestra una alerta de humedad en el conector, consultá
          también las{" "}
          <a href="https://support.apple.com/es-la/102643" className="tc-link" target="_blank" rel="noopener noreferrer">indicaciones de Apple para esa alerta</a>:
          no es lo mismo que confirmar líquido dentro del equipo.
        </p>
        <p className="mt-6 text-[14px] text-[#86868b]">Contenido actualizado el <time dateTime="2026-10-15">15 de octubre de 2026</time>.</p>
      </section>
    </ServiceLandingPage>
  );
}

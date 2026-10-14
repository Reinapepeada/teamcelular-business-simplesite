import { BsCheckCircleFill } from "react-icons/bs";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { formatArsPrice } from "@/lib/repairPrices";
import { VIRUS_CLEANING_PLANS, VIRUS_CLEANING_PRICE_DATE } from "@/lib/virusCleaning";
import { BUSINESS_PROFILE } from "@/lib/businessProfile";

const WHATSAPP_URL = `${BUSINESS_PROFILE.whatsapp}?text=`;

export default function VirusCleaningPlans() {
  return (
    <section id="precios" className="w-full scroll-mt-24 rounded-[28px] bg-[#f5f5f7] p-5 dark:bg-[#171719] sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
        ¿Cuánto cuesta sacar un virus del celular en CABA?
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600 dark:text-slate-300">
        Limpieza simple conservando tus datos: {formatArsPrice(VIRUS_CLEANING_PLANS[0].price)}.{" "}
        Reinstalación con backup: {formatArsPrice(VIRUS_CLEANING_PLANS[1].price)}.{" "}
        Te explicamos cuál corresponde antes de avanzar.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {VIRUS_CLEANING_PLANS.map((plan) => (
          <article
            key={plan.id}
            className={
              plan.recommended
                ? "rounded-2xl bg-[#20216b] p-6 text-white lg:p-8"
                : "rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            }
          >
            {plan.recommended && (
              <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                Si hace falta reinstalar
              </p>
            )}
            <h3
              className={`text-lg font-bold ${plan.recommended ? "" : "text-slate-900 dark:text-white"}`}
            >
              {plan.name}
            </h3>
            <p
              className={`mt-2 text-3xl font-extrabold tracking-tight ${plan.recommended ? "lg:text-4xl" : "text-slate-900 dark:text-white"}`}
            >
              {formatArsPrice(plan.price)}
            </p>
            <p
              className={`mt-1 text-sm font-semibold ${plan.recommended ? "text-emerald-300" : "text-slate-500 dark:text-slate-400"}`}
            >
              {plan.data}
            </p>

            <ul
              className={`mt-4 divide-y text-sm leading-6 ${plan.recommended ? "divide-white/15" : "divide-slate-100 text-slate-600 dark:divide-slate-800 dark:text-slate-300"}`}
            >
              {plan.includes.map((item) => (
                <li key={item} className="flex gap-2 py-2">
                  <BsCheckCircleFill
                    className={`mt-1 h-4 w-4 shrink-0 ${plan.recommended ? "text-emerald-300" : "text-primary"}`}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>

            <p
              className={`mt-4 text-[13px] leading-6 ${plan.recommended ? "text-white/75" : "text-slate-500 dark:text-slate-400"}`}
            >
              {plan.fit}
            </p>

            <TrackedCtaLink
              href={`${WHATSAPP_URL}${encodeURIComponent(`Hola Team Celular, quiero la ${plan.name.toLowerCase()} (${formatArsPrice(plan.price)}) para mi celular. Marca y modelo:`)}`}
              ctaName={`virus_plan_${plan.id}`}
              ctaLocation="virus_pricing"
              ctaVariant="whatsapp"
              external
              target="_blank"
              className={
                plan.recommended
                  ? "mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#20216b] transition hover:bg-slate-100"
                  : "mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600 dark:text-slate-200"
              }
            >
              {plan.recommended ? "Consultar reinstalación con backup" : "Consultar limpieza simple"}
            </TrackedCtaLink>
          </article>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-6 text-slate-500 dark:text-slate-400">
        Precios en pesos argentinos, publicados el {VIRUS_CLEANING_PRICE_DATE}.
        Confirmamos el valor y el plazo antes de trabajar. Si el diagnóstico muestra
        que el problema es batería, pin de carga o placa, te pasamos el
        presupuesto de esa reparación antes de hacer nada. Lunes a viernes de
        10:30 a 18:00.
      </p>
    </section>
  );
}

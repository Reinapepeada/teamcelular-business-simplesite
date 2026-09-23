import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { BUSINESS_PROFILE, businessId } from "@/lib/businessProfile";
import { INSTALLMENTS_MESSAGE } from "@/lib/copyStandards";
import {
  IPHONE_MODELS_WITH_PAGE,
  IPHONE_PRICES_UPDATED,
  formatArs,
  getIphoneModel,
  getIphoneModelNotes,
  priceLabel,
} from "../iphoneModels";

export function generateStaticParams() {
  return IPHONE_MODELS_WITH_PAGE.map((model) => ({ model }));
}

/**
 * Sin esto, la ruta dinamica renderiza cualquier modelo del catalogo de
 * precios y quedan publicadas las 26 URLs, incluidas las que no tienen una
 * sola busqueda registrada. Solo existen las de generateStaticParams.
 */
export const dynamicParams = false;

function hasOwnPage(slug: string): boolean {
  return (IPHONE_MODELS_WITH_PAGE as readonly string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>;
}): Promise<Metadata> {
  const { model: slug } = await params;
  const model = getIphoneModel(slug);

  if (!model || !hasOwnPage(slug)) {
    return buildWebsiteMetadata({
      path: "/guias/reparacion-iphone-buenos-aires",
      title: "Modelo no encontrado | Team Celular",
      description: "Ese modelo de iPhone no tiene página propia.",
      robots: { index: false, follow: true },
    });
  }

  const path = `/reparaciones/iphone/${model.slug}`;
  // El precio en la meta es el diferencial: ninguno de los competidores que
  // aparecen citados por motores de IA publica cuánto sale la reparación.
  const priceHint =
    model.screen !== null
      ? `Pantalla ${formatArs(model.screen)}, batería ${priceLabel(model.battery)}.`
      : "Presupuesto el mismo día.";

  return buildWebsiteMetadata({
    path,
    title: `Reparación de ${model.name} en CABA | Team Celular`,
    description: `${priceHint} Team Celular repara ${model.name} en Recoleta y Belgrano, en 2-4 h y con garantía escrita de 90 días.`,
    keywords: [
      `reparacion ${model.name} caba`,
      `cambio de pantalla ${model.name}`,
      `cambio de bateria ${model.name}`,
      `precio pantalla ${model.name}`,
      `servicio tecnico ${model.name} buenos aires`,
    ],
    languages: { "es-AR": path },
  });
}

export default async function IphoneModelPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model: slug } = await params;
  const model = getIphoneModel(slug);

  if (!model || !hasOwnPage(slug)) {
    notFound();
  }

  const SITE_URL = getSiteUrl();
  const pageUrl = `${SITE_URL}/reparaciones/iphone/${model.slug}`;
  const modelNotes = getIphoneModelNotes(model.slug);

  const repairs = [
    {
      name: "Cambio de pantalla",
      price: model.screen,
      time: "2 a 4 horas",
      detail: modelNotes
        ? `Módulo ${modelNotes.panel}. Pasamos el chip IC de tu pantalla a la nueva para que no pierdas True Tone ni Face ID.`
        : `Módulo completo del ${model.name}. Pasamos el chip IC de tu pantalla a la nueva para que no pierdas True Tone ni Face ID.`,
    },
    {
      name: "Cambio de batería",
      price: model.battery,
      time: "1 a 2 horas",
      detail: "Antes medimos el consumo: si la batería está bien y el problema es otro, te lo decimos.",
    },
    {
      name: "Puerto de carga",
      price: null,
      time: "2 a 3 horas",
      detail: modelNotes
        ? `Conector ${modelNotes.port}. Se presupuesta tras el diagnóstico: puede ser limpieza técnica, cambio de módulo o trabajo en placa.`
        : "Se presupuesta tras el diagnóstico: puede ser limpieza técnica, cambio de módulo o trabajo en placa.",
    },
    {
      name: "Reparación de placa",
      price: null,
      time: "24 a 48 horas",
      detail: "Microelectrónica con microscopio para equipos que no encienden, reinician o se mojaron.",
    },
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `Reparación de ${model.name} en CABA`,
    serviceType: "Reparación de celulares",
    url: pageUrl,
    areaServed: [
      { "@type": "City", name: "CABA" },
      { "@type": "City", name: "Buenos Aires" },
    ],
    provider: { "@id": businessId("localbusiness") },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Reparaciones para ${model.name}`,
      itemListElement: repairs
        .filter((repair) => repair.price !== null)
        .map((repair) => ({
          "@type": "Offer",
          price: String(repair.price),
          priceCurrency: "ARS",
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: `${repair.name} ${model.name}`,
            description: repair.detail,
          },
        })),
    },
  };

  return (
    <section className="w-full max-w-5xl px-6 py-14 pb-24 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Reparaciones", url: `${SITE_URL}/reparaciones` },
          { name: `iPhone ${model.name.replace("iPhone ", "")}`, url: pageUrl },
        ]}
      />

      <header>
        <span className="tc-eyebrow">
          Precio publicado
        </span>
        <h1 className="tc-display mt-6 text-slate-900 dark:text-[#f5f5f7]">
          Reparación de {model.name} en CABA
        </h1>

        {/* Respuesta autocontenida: entidad, precio, plazo, garantía y ubicación
            en el primer bloque de la página, que es de donde salen las citas. */}
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-[#a1a1a6]">
          El cambio de pantalla de {model.name} cuesta{" "}
          <strong>{priceLabel(model.screen)}</strong> y el de batería{" "}
          <strong>{priceLabel(model.battery)}</strong> en Team Celular, con sucursales en
          Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), CABA. La pantalla se
          resuelve en 2 a 4 horas y la batería en 1 a 2, según stock. El diagnóstico se
          hace el mismo día, el presupuesto se confirma antes de intervenir el equipo y
          todo sale con garantía escrita de 90 días sobre el trabajo y el repuesto.
          Atendemos de lunes a viernes de 10:30 a 18:00, sin turno previo. Precios
          actualizados a {IPHONE_PRICES_UPDATED}.
        </p>

        <AuthorByline updatedLabel={IPHONE_PRICES_UPDATED} className="mt-6" />

        <div className="mt-8 flex flex-wrap gap-4">
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName={`iphone_${model.slug}_budget`}
            ctaLocation="iphone_model_hero"
            ctaVariant="primary"
            className="tc-btn tc-btn-primary"
          >
            Pedir presupuesto
          </TrackedCtaLink>
          <TrackedCtaLink
            href={`https://wa.me/5491151034595?text=${encodeURIComponent(
              `Hola Team Celular, quiero reparar mi ${model.name}. La falla es:`
            )}`}
            ctaName={`iphone_${model.slug}_whatsapp`}
            ctaLocation="iphone_model_hero"
            ctaVariant="whatsapp"
            external
            className="tc-btn tc-btn-ghost"
          >
            Consultar por WhatsApp
          </TrackedCtaLink>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
          ¿Cuánto sale reparar un {model.name}?
        </h2>
        <div className="bg-[#1d1d1f] mt-6 divide-y divide-slate-200 rounded-[28px] dark:divide-slate-700">
          {repairs.map((repair) => (
            <div key={repair.name} className="grid gap-2 px-6 py-5 md:grid-cols-[1.1fr_0.6fr_0.6fr]">
              <div>
                <p className="font-semibold text-slate-900 dark:text-[#f5f5f7]">{repair.name}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-[#86868b]">{repair.detail}</p>
              </div>
              <p className="text-sm text-slate-500 dark:text-[#86868b]">{repair.time}</p>
              <p className="font-semibold text-primary">{priceLabel(repair.price)}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500 dark:text-[#86868b]">
          {BUSINESS_PROFILE.name} confirma el número exacto después del diagnóstico. Si el
          equipo tiene más de una falla, te lo decimos antes de avanzar. {INSTALLMENTS_MESSAGE}
        </p>
      </section>

      <section className="bg-[#1d1d1f] mt-12 rounded-[28px] p-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
          ¿Qué pasa si el {model.name} no enciende o se mojó?
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600 dark:text-[#a1a1a6]">
          Esos casos no se resuelven cambiando un módulo. Van al laboratorio de
          microelectrónica, donde se trabaja a nivel componente con microscopio: reballing
          BGA, soldadura SMD y limpieza de placa por daño de líquido. Es la diferencia con
          el canal oficial, que ante una falla de placa cotiza el reemplazo completo. Si el
          equipo no tiene reparación posible, te lo decimos antes de intervenir: solo se cobra el diagnóstico (ARS 15.000 a 25.000 según el equipo).
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/guias/presupuesto-service-oficial-segunda-opinion"
            className="font-semibold text-primary hover:underline"
          >
            Segunda opinión al presupuesto del service oficial →
          </Link>
          <Link href="/lab" className="font-semibold text-primary hover:underline">
            Conocé el laboratorio →
          </Link>
        </div>
      </section>

      {modelNotes ? (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
            Qué tiene de particular reparar un {model.name}
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600 dark:text-[#a1a1a6]">
            Cada modelo trae su propia trampa. Esto es lo que cambia el trabajo, el
            repuesto o el presupuesto en este equipo concreto.
          </p>
          <ul className="mt-6 space-y-4">
            {modelNotes.notes.map((note) => (
              <li
                key={note}
                className="bg-[#1d1d1f] rounded-[28px] p-6 leading-relaxed text-slate-600 dark:text-[#a1a1a6]"
              >
                {note}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">Otros modelos</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {IPHONE_MODELS_WITH_PAGE.filter((other) => other !== model.slug).map((other) => {
            const target = getIphoneModel(other);
            if (!target) return null;
            return (
              <Link
                key={other}
                href={`/reparaciones/iphone/${other}`}
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-[#a1a1a6]"
              >
                {target.name}
              </Link>
            );
          })}
          <Link
            href="/guias/reparacion-iphone-buenos-aires"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-[#a1a1a6]"
          >
            Ver todos los iPhone
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { BsBoxSeam, BsClock, BsGeoAlt, BsShop } from "react-icons/bs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { BUSINESS_PROFILE, getBranch } from "@/lib/businessProfile";
import { SHIPPING, SHIPPING_MESSAGE } from "@/lib/copyStandards";
import { formatArsPrice } from "@/lib/repairPrices";

const PATH = "/envios";

export const metadata: Metadata = buildWebsiteMetadata({
  path: PATH,
  title: "Envíos a todo el país | Team Celular",
  description:
    "Enviamos a toda la Argentina: $12.000 en promedio, $25.000 como máximo, unos 5 días hábiles. También podés retirar en Recoleta, CABA.",
});

export default function EnviosPage() {
  const SITE_URL = getSiteUrl();
  const pickup = getBranch("recoleta");

  const facts = [
    { icon: BsGeoAlt, title: "A todo el país", text: "Despachamos a cualquier dirección de la Argentina." },
    { icon: BsBoxSeam, title: `${formatArsPrice(SHIPPING.averageArs)} en promedio`, text: `Como máximo ${formatArsPrice(SHIPPING.maxArs)}. El costo exacto lo ves al comprar.` },
    { icon: BsClock, title: `Unos ${SHIPPING.businessDays} días hábiles`, text: "Plazo estimado de entrega." },
    { icon: BsShop, title: "Retiro en el local", text: `${pickup.street}, ${pickup.neighborhood}. ${BUSINESS_PROFILE.hours.text}.` },
  ];

  return (
    <section className="w-full max-w-5xl px-6 py-14 pb-24 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Envíos", url: `${SITE_URL}${PATH}` },
        ]}
      />

      <header>
        <span className="tc-eyebrow">Tienda</span>
        <h1 className="tc-display mt-6 text-[#f5f5f7]">Envíos a todo el país</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#a1a1a6]">{SHIPPING_MESSAGE}</p>
      </header>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {facts.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4 rounded-[28px] bg-[#1d1d1f] p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1766f2]/15">
              <Icon aria-hidden="true" className="h-6 w-6 text-[#6aa6ff]" />
            </span>
            <span>
              <span className="block font-semibold text-[#f5f5f7]">{title}</span>
              <span className="mt-1 block text-sm text-[#a1a1a6]">{text}</span>
            </span>
          </li>
        ))}
      </ul>

      <section className="mt-12 space-y-4 text-[#a1a1a6]">
        <h2 className="tc-heading text-[#f5f5f7]">Cómo funciona</h2>
        <p>
          Al finalizar la compra elegís envío o retiro. Si elegís envío, cargás la dirección y
          el checkout te muestra el costo antes de pagar. Algunos productos son solo para
          retiro; la ficha lo aclara.
        </p>
        <p>
          El plazo es una estimación y depende del correo y de la zona. Si necesitás el
          producto para una fecha, escribinos antes de comprar.
        </p>
        <p>
          Si el producto no es lo que esperabas, tenés 10 días corridos desde que lo recibís.
          Las condiciones están en{" "}
          <Link href="/devoluciones" className="font-semibold text-[#6aa6ff] hover:underline">
            devoluciones
          </Link>
          .
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/tienda" className="tc-btn tc-btn-primary">
          Ir a la tienda
        </Link>
        <a href={BUSINESS_PROFILE.whatsapp} className="tc-btn tc-btn-ghost" target="_blank" rel="noopener noreferrer">
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  );
}

import Link from "next/link";
import { AI_DESCRIPTION, AI_DISAMBIGUATION, AI_FILES, AI_PAGES, createAiGraph } from "@/lib/aiVisibility";
import { BRANCHES, BUSINESS_PROFILE } from "@/lib/businessProfile";
import { HOME_FAQS } from "@/lib/homeFaqs";
import { REPAIR_CASE } from "@/lib/repairCase";
import { buildWebsiteMetadata } from "@/lib/seoMetadata";

export const metadata = buildWebsiteMetadata({
  path: "/ai", title: "Team Celular Argentina: información oficial de la marca",
  description: "Datos oficiales de Team Celular en CABA: sucursales, contacto, servicios, preguntas frecuentes y fuentes para consultar y citar.",
});

export default function AiBrandPage() {
  return (
    <div className="w-full bg-black text-[#f5f5f7]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createAiGraph()).replace(/</g, "\\u003c") }} />
      <header className="tc-section border-b border-white/15">
        <p className="tc-eyebrow mb-5">Team Celular · CABA, Argentina</p>
        <h1 className="tc-display max-w-4xl">Información oficial.<br />Fuentes para consultar.</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-slate-200">{AI_DESCRIPTION}</p>
        <p className="mt-5 max-w-3xl leading-relaxed text-slate-300">{AI_DISAMBIGUATION}</p>
        <Link href="/presupuesto-reparacion" className="tc-btn tc-btn-primary mt-8">Consultar una reparación</Link>
      </header>

      <section className="tc-section border-b border-white/15" aria-labelledby="branches-title">
        <h2 id="branches-title" className="tc-heading">Dos sucursales en Buenos Aires.</h2>
        <p className="mt-5 text-lg text-slate-200">{BUSINESS_PROFILE.hours.text}, sin turno.</p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {BRANCHES.map((branch) => (
            <div key={branch.slug} className="border-t border-white/20 pt-5">
              <h3 className="tc-subheading">{branch.name}</h3>
              <p className="mt-3">{branch.street}, {branch.locality}</p>
              <a className="tc-link inline-block py-3" href={`tel:${branch.phone.replace(/\s|-/g, "")}`}>{branch.phone}</a>
              <p><Link href={branch.url} className="tc-link inline-block py-2">Ver sucursal, ubicación y contacto →</Link></p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="tc-section border-b border-white/15" aria-labelledby="faq-title">
        <h2 id="faq-title" className="tc-heading">Antes de traer el equipo.</h2>
        <div className="mt-8 max-w-3xl divide-y divide-white/15">
          {HOME_FAQS.map(({ question, answer }) => (
            <div key={question} className="py-6">
              <h3 className="text-xl font-semibold">{question}</h3>
              <p className="mt-3 leading-relaxed text-slate-200">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tc-section border-b border-white/15" aria-labelledby="case-title">
        <h2 id="case-title" className="tc-heading">Un caso real del laboratorio.</h2>
        <h3 className="tc-subheading mt-6">{REPAIR_CASE.title}</h3>
        <p className="mt-4 max-w-3xl leading-relaxed text-slate-200">{REPAIR_CASE.summary}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-slate-200">{REPAIR_CASE.outcome}</p>
        <Link href={REPAIR_CASE.path} className="tc-link mt-4 inline-block py-3">Leer el caso y los repuestos utilizados →</Link>
      </section>

      <section className="tc-section border-b border-white/15" aria-labelledby="sources-title">
        <h2 id="sources-title" className="tc-heading">Consultá la fuente de cada dato.</h2>
        <p className="mt-5 max-w-3xl text-lg text-slate-200">Los precios, el stock y las condiciones se consultan en la página del servicio o producto. El presupuesto final se confirma antes de avanzar.</p>
        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
          {AI_PAGES.filter(([path]) => path !== "/ai").map(([path, title]) => (
            <li key={path} className="border-b border-white/10"><Link href={path} className="tc-link inline-block py-3">{title} →</Link></li>
          ))}
        </ul>
        <h3 className="tc-subheading mt-10">Perfiles oficiales</h3>
        <ul className="mt-4 space-y-1 break-words">
          {BUSINESS_PROFILE.sameAs.map((url) => <li key={url}><a href={url} className="tc-link inline-block py-2">{url}</a></li>)}
        </ul>
      </section>

      <section className="tc-section" aria-labelledby="files-title">
        <h2 id="files-title" className="tc-heading">Archivos de referencia.</h2>
        <p className="mt-5 max-w-3xl text-lg text-slate-200">Formatos de lectura para buscadores, asistentes y personas que necesiten verificar la información de la marca.</p>
        <ul className="mt-8 divide-y divide-white/15">
          {AI_FILES.map(([path, title]) => (
            <li key={path} className="grid gap-1 py-4 sm:grid-cols-2">
              <a className="tc-link w-fit py-2 font-mono text-sm" href={path}>{path}</a>
              <span className="py-2 text-slate-200">{title}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

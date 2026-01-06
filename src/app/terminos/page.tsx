import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Team Celular",
  description:
    "Términos y condiciones de uso del sitio y de los servicios de Team Celular (Buenos Aires).",
  alternates: {
    canonical: `${SITE_URL}/terminos`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Términos y Condiciones | Team Celular",
    description:
      "Términos y condiciones de uso del sitio y de los servicios de Team Celular (Buenos Aires).",
    url: `${SITE_URL}/terminos`,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/images/teamcelular.webp`,
        width: 1200,
        height: 630,
        alt: "Team Celular - Términos y Condiciones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Términos y Condiciones | Team Celular",
    description:
      "Términos y condiciones de uso del sitio y de los servicios de Team Celular (Buenos Aires).",
    images: [`${SITE_URL}/images/teamcelular.webp`],
  },
};

export default function TerminosPage() {
  return (
    <section className="container mx-auto w-full max-w-4xl px-6 py-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Términos y condiciones", url: `${SITE_URL}/terminos` },
        ]}
      />

      <nav className="mb-8 text-sm text-slate-600 dark:text-slate-400">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
          </li>
          <li>/</li>
          <li className="text-primary font-semibold">Términos</li>
        </ol>
      </nav>

      <header className="mb-10 space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Términos y condiciones
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Última actualización: 6 de enero de 2026.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Este texto es informativo y no constituye asesoramiento legal. Si
          necesitás una versión ajustada a tu actividad, consultá con un
          profesional.
        </p>
      </header>

      <article className="prose prose-slate max-w-none dark:prose-invert">
        <h2>1. Aceptación</h2>
        <p>
          Al navegar este sitio web o solicitar un presupuesto/servicio, aceptás
          estos términos. Si no estás de acuerdo, te pedimos que no uses el
          sitio.
        </p>

        <h2>2. Servicios y presupuestos</h2>
        <p>
          Team Celular brinda diagnóstico y reparación de dispositivos móviles y
          comercializa repuestos/accesorios. Los presupuestos pueden ser
          estimativos cuando se basan en información incompleta (por ejemplo,
          sin diagnóstico físico).
        </p>

        <h2>3. Plazos</h2>
        <p>
          Los tiempos informados son aproximados y pueden variar según
          disponibilidad de repuestos, complejidad técnica, estado previo del
          equipo y/o saturación operativa.
        </p>

        <h2>4. Garantía</h2>
        <p>
          La garantía aplica según lo indicado en la documentación entregada al
          cliente y puede variar según el tipo de reparación y repuesto
          utilizado. No cubre daños posteriores por golpes, líquidos, apertura
          por terceros o uso indebido.
        </p>

        <h2>5. Información del cliente</h2>
        <p>
          El cliente es responsable de proporcionar información veraz y de
          realizar copias de seguridad cuando sea posible. En reparaciones
          complejas, puede existir riesgo de pérdida de datos.
        </p>

        <h2>6. Uso del sitio</h2>
        <p>
          No está permitido usar el sitio para actividades ilícitas, intentar
          vulnerar su seguridad o afectar su funcionamiento.
        </p>

        <h2>7. Propiedad intelectual</h2>
        <p>
          El contenido del sitio (textos, imágenes, marca y diseño) pertenece a
          Team Celular o se usa con autorización. No se permite su reproducción
          sin permiso.
        </p>

        <h2>8. Enlaces a terceros</h2>
        <p>
          El sitio puede contener enlaces a servicios de terceros (por ejemplo,
          Google, Instagram, WhatsApp). Team Celular no controla ni es
          responsable por sus políticas o contenidos.
        </p>

        <h2>9. Cambios</h2>
        <p>
          Podemos actualizar estos términos. La versión vigente estará
          publicada en esta página.
        </p>

        <h2>10. Contacto</h2>
        <p>
          Para consultas, escribinos a{" "}
          <a href="mailto:teamcelular.arg@gmail.com">teamcelular.arg@gmail.com</a>{" "}
          o visitá la sección{" "}
          <Link href="/contacto">Contacto</Link>.
        </p>
      </article>
    </section>
  );
}


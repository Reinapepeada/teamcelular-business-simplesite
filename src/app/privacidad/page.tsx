import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export const metadata: Metadata = {
  title: "Política de Privacidad | Team Celular",
  description:
    "Política de privacidad y tratamiento de datos personales de Team Celular (Buenos Aires).",
  alternates: {
    canonical: `${SITE_URL}/privacidad`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Política de Privacidad | Team Celular",
    description:
      "Política de privacidad y tratamiento de datos personales de Team Celular (Buenos Aires).",
    url: `${SITE_URL}/privacidad`,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Team Celular - Política de Privacidad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidad | Team Celular",
    description:
      "Política de privacidad y tratamiento de datos personales de Team Celular (Buenos Aires).",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function PrivacidadPage() {
  return (
    <section className="container mx-auto w-full max-w-4xl px-6 py-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Política de privacidad", url: `${SITE_URL}/privacidad` },
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
          <li className="text-primary font-semibold">Privacidad</li>
        </ol>
      </nav>

      <header className="mb-10 space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Política de privacidad
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Última actualización: 6 de enero de 2026.
        </p>
      </header>

      <article className="prose prose-slate max-w-none dark:prose-invert">
        <h2>1. Qué datos podemos procesar</h2>
        <ul>
          <li>
            Datos de contacto que nos compartís al escribirnos (por ejemplo,
            nombre, teléfono, email).
          </li>
          <li>
            Información del equipo para presupuestar (marca, modelo, falla,
            fotos o descripciones).
          </li>
          <li>
            Datos técnicos de navegación/medición para mejorar el sitio
            (métricas agregadas de rendimiento y uso).
          </li>
        </ul>

        <h2>2. Cómo los usamos</h2>
        <ul>
          <li>Responder consultas y presupuestos.</li>
          <li>Brindar soporte, seguimiento y coordinación de servicios.</li>
          <li>Mejorar rendimiento, seguridad y experiencia del sitio.</li>
        </ul>

        <h2>3. Herramientas y terceros</h2>
        <p>
          Podemos utilizar servicios de terceros para analítica y performance
          (por ejemplo, Vercel Analytics/Speed Insights) y para comunicación
          (por ejemplo, WhatsApp, email). Cada proveedor tiene sus propias
          políticas.
        </p>

        <h2>4. Cookies</h2>
        <p>
          El sitio puede usar cookies/almacenamiento local para funcionalidades
          y medición. Podés administrar cookies desde tu navegador.
        </p>

        <h2>5. Conservación</h2>
        <p>
          Conservamos la información el tiempo necesario para gestionar
          consultas, presupuestos y servicios, o para cumplir obligaciones
          legales.
        </p>

        <h2>6. Derechos</h2>
        <p>
          Podés solicitar acceso, actualización o eliminación de tus datos
          escribiendo a{" "}
          <a href="mailto:teamcelular.arg@gmail.com">teamcelular.arg@gmail.com</a>.
        </p>

        <h2>7. Cambios</h2>
        <p>
          Podemos actualizar esta política. La versión vigente estará publicada
          en esta página.
        </p>

        <h2>8. Contacto</h2>
        <p>
          Para consultas sobre privacidad, escribinos a{" "}
          <a href="mailto:teamcelular.arg@gmail.com">teamcelular.arg@gmail.com</a>{" "}
          o visitá{" "}
          <Link href="/contacto">Contacto</Link>.
        </p>
      </article>
    </section>
  );
}


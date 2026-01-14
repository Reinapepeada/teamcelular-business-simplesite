import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export const metadata: Metadata = {
  title: "Política de Devoluciones y Reembolsos | Team Celular",
  description:
    "Política de devoluciones, reembolsos y derecho de arrepentimiento para compras en Team Celular (Argentina).",
  alternates: {
    canonical: `${SITE_URL}/devoluciones`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Política de Devoluciones y Reembolsos | Team Celular",
    description:
      "Política de devoluciones, reembolsos y derecho de arrepentimiento para compras en Team Celular (Argentina).",
    url: `${SITE_URL}/devoluciones`,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Team Celular - Política de Devoluciones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Devoluciones y Reembolsos | Team Celular",
    description:
      "Política de devoluciones, reembolsos y derecho de arrepentimiento para compras en Team Celular (Argentina).",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function DevolucionesPage() {
  return (
    <section className="container mx-auto w-full max-w-4xl px-6 py-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Devoluciones", url: `${SITE_URL}/devoluciones` },
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
          <li className="text-primary font-semibold">Devoluciones</li>
        </ol>
      </nav>

      <header className="mb-10 space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Política de devoluciones y reembolsos
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Última actualización: 12 de enero de 2026.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Esta política es informativa y no limita los derechos del consumidor
          reconocidos por la normativa vigente en Argentina.
        </p>
      </header>

      <article className="prose prose-slate max-w-none dark:prose-invert">
        <h2>1. Alcance</h2>
        <p>
          Esta política aplica a productos comprados a través de la tienda
          online de Team Celular y/o en nuestro local en Argentina. Para
          consultas, escribinos a{" "}
          <a href="mailto:teamcelular.arg@gmail.com">teamcelular.arg@gmail.com</a>{" "}
          o visitá{" "}
          <Link href="/contacto">Contacto</Link>.
        </p>

        <h2>2. Derecho de arrepentimiento (compras a distancia)</h2>
        <p>
          Si realizaste una compra a distancia (por ejemplo, online con entrega
          o envío), podés ejercer el derecho de arrepentimiento dentro de{" "}
          <strong>10 días corridos</strong> desde la recepción del producto.
          Para gestionarlo, contactanos y coordinaremos la devolución.
        </p>

        <h3>Condiciones generales</h3>
        <ul>
          <li>
            El producto debe estar en el mismo estado en el que fue entregado,
            sin uso, con su empaque, accesorios y documentación.
          </li>
          <li>
            Se debe presentar comprobante de compra (número de pedido/factura).
          </li>
          <li>
            Si corresponde, se verificará que el producto conserve etiquetas,
            sellos o films de fábrica.
          </li>
        </ul>

        <h3>Costos y modalidad de devolución</h3>
        <ul>
          <li>
            <strong>Sin costo:</strong> si ejercés el derecho de
            arrepentimiento dentro de plazo, o si el producto tiene una falla,
            defecto o hubo un error en la entrega/preparación, coordinamos la
            devolución sin cargo.
          </li>
          <li>
            <strong>Modalidades:</strong> entrega en nuestro local, retiro en
            CABA (según zona) o devolución por mensajería/correo según se
            acuerde.
          </li>
          <li>
            <strong>Sin cargo de reposición:</strong> no cobramos cargos por
            reposición/restocking.
          </li>
        </ul>

        <h2>3. Productos con fallas o defectos</h2>
        <p>
          Si el producto presenta una falla o defecto, contactanos para
          evaluar el caso y ofrecerte la solución que corresponda (cambio,
          reparación, nota de crédito o reembolso), de acuerdo con la normativa
          aplicable. Cuando corresponda, rige la garantía legal (Ley 24.240):
          <strong> 6 meses para productos nuevos</strong> y{" "}
          <strong>3 meses para productos usados</strong>.
        </p>

        <h2>4. Reembolsos</h2>
        <ul>
          <li>
            Una vez recibido el producto y verificado su estado, procesaremos
            el reembolso por el mismo medio de pago utilizado dentro de{" "}
            <strong>10 días hábiles</strong>.
          </li>
          <li>
            Los plazos pueden variar según el medio de pago y la entidad
            emisora (por ejemplo, tarjetas y billeteras virtuales).
          </li>
        </ul>

        <h2>5. Cambios</h2>
        <p>
          Si preferís un cambio por otro producto (sujeto a stock), coordinamos
          la gestión y se ajustará la diferencia de precio si corresponde.
        </p>

        <h2>6. Excepciones</h2>
        <p>Por razones de seguridad e higiene, o por su naturaleza, no aceptamos devoluciones de:</p>
        <ul>
          <li>
            Productos de uso personal o higiene (por ejemplo, auriculares) que
            hayan sido abiertos o utilizados.
          </li>
          <li>Productos digitales o tarjetas/códigos de recarga.</li>
          <li>
            Productos con daño por mal uso, golpes, humedad/líquidos,
            manipulación indebida o intervención de terceros.
          </li>
        </ul>

        <h2>7. Dónde gestionarlas</h2>
        <p>
          Podés iniciar una devolución o reclamo escribiendo a{" "}
          <a href="mailto:teamcelular.arg@gmail.com">teamcelular.arg@gmail.com</a>{" "}
          o por WhatsApp. También podés acercarte a nuestro local: Paraguay 2451,
          Recoleta, CABA (con comprobante de compra).
        </p>
      </article>
    </section>
  );
}

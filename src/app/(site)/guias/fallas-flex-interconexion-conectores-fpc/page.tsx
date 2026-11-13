import Image from "next/image";
import Link from "next/link";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideByline from "@/components/seo/GuideByline";
import VideoSchema from "@/components/seo/VideoSchema";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { FPC_GUIDE } from "@/lib/fpcGuide";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}${FPC_GUIDE.path}`;

export const metadata = buildWebsiteMetadata({
  path: FPC_GUIDE.path,
  title: "Fallas del flex y conectores FPC de celulares | Team Celular",
  description: FPC_GUIDE.description,
  ogType: "article",
  openGraphImagePath: FPC_GUIDE.image,
  openGraphImageDimensions: { width: 1440, height: 1080 },
  openGraphImageAlt: "Conector en la placa de un celular bajo microscopio, foto de Team Celular",
});

export default function FpcGuidePage() {
  return (
    <article className="mx-auto w-full max-w-[808px] space-y-9 bg-black px-4 py-8 text-[#f5f5f7] sm:px-6 sm:py-12">
      <ArticleSchema title={FPC_GUIDE.title} description={FPC_GUIDE.description} publishedTime={FPC_GUIDE.publishedTime} modifiedTime={FPC_GUIDE.publishedTime} image={`${SITE_URL}${FPC_GUIDE.image}`} url={PAGE_URL} about={["Flex de interconexión", "Conectores FPC", "Diagnóstico de celulares"]} />
      <VideoSchema name="Limpieza del conector de un flex bajo microscopio" description="Un cepillo trabaja sobre el conector del extremo de un flex. Fragmento sin audio de una etapa del proceso; no documenta el diagnóstico completo ni la prueba final del equipo." contentPath={FPC_GUIDE.video} thumbnailPath={FPC_GUIDE.poster} uploadDate={FPC_GUIDE.publishedTime} duration="PT25S" />
      <BreadcrumbJsonLd items={[{ name: "Inicio", url: `${SITE_URL}/` }, { name: "Guías", url: `${SITE_URL}/guias` }, { name: "Flex y conectores FPC", url: PAGE_URL }]} />
      <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-sm text-[#a1a1a6]">
        <Link href="/guias" className="tc-link inline-flex min-h-11 items-center">Guías</Link>
        <span aria-hidden>/</span><span aria-current="page">Flex y conectores FPC</span>
      </nav>
      <header className="space-y-5">
        <p className="tc-eyebrow">Conexiones internas · Fotos del laboratorio</p>
        <h1 className="text-balance text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.12] tracking-[-0.025em]">{FPC_GUIDE.title}</h1>
        <GuideByline modifiedTime={FPC_GUIDE.publishedTime} />
      </header>
        <p className="leading-7 text-[#c7c7cc]">Cuando un celular deja de cargar, el problema puede estar en una conexión interna. En los equipos que tienen una placa de carga separada de la placa principal, un flex une ambos conjuntos. El flexible, sus conectores y las uniones con la placa son puntos distintos que hay que revisar antes de decidir qué reparar.</p>
        <p className="leading-7 text-[#c7c7cc]">En Team Celular, en CABA, usamos el microscopio para observar estas piezas. Las fotos de este artículo muestran cómo son el conector de la placa y el extremo del flex, y ayudan a entender por qué cambiar una pieza sin identificar la falla puede dejar el problema sin resolver.</p>
        <figure className="space-y-3">
          <Image src="/images/guias/fpc/conector-en-placa.webp" alt="Conector montado sobre la placa de un celular, junto a los blindajes metálicos, visto bajo microscopio." width={1440} height={1080} sizes="(max-width: 767px) calc(100vw - 32px), 760px" priority className="h-auto w-full rounded-xl" />
          <figcaption className="text-sm leading-6 text-[#a1a1a6]">Conector montado en placa. Sus contactos forman una parte de la conexión; la otra está en el extremo del flex. Foto del laboratorio de Team Celular.</figcaption>
        </figure>
      <section className="space-y-5">
        <h2 className="tc-heading !text-2xl">¿Qué es el flex de interconexión?</h2>
        <p className="leading-7 text-[#c7c7cc]">Es un circuito flexible que conecta partes del teléfono. En este artículo nos centramos en el que une la placa principal —también llamada main board— con la placa de carga.</p>
        <p className="leading-7 text-[#c7c7cc]">FPC son las siglas de <em>Flexible Printed Circuit</em>: circuito impreso flexible. En el taller también se usa “conector FPC” para nombrar la conexión de ese flexible con la placa. Existen diferentes diseños, por eso el modelo del equipo importa al identificar el repuesto y la forma de conectarlo.</p>
        <p className="leading-7 text-[#c7c7cc]">Conviene distinguir tres elementos: el cuerpo del flex, el conector que lleva en su extremo y el conector montado en la placa. Un daño en cualquiera de ellos puede interrumpir la conexión, pero no se repara de la misma manera.</p>
        <figure className="space-y-3">
          <Image src="/images/guias/fpc/extremo-flex.webp" alt="Extremo de un flex de celular con su conector y las pistas que llegan a él." width={1440} height={1080} sizes="(max-width: 767px) calc(100vw - 32px), 760px" className="h-auto w-full rounded-xl" />
          <figcaption className="text-sm leading-6 text-[#a1a1a6]">Extremo del flex bajo microscopio. Se distinguen las pistas del circuito flexible y el conector que permite unirlo a la placa.</figcaption>
        </figure>
      </section>
      <section className="space-y-5">
        <h2 className="tc-heading !text-2xl">¿En qué celulares puede aparecer esta falla?</h2>
        <p className="leading-7 text-[#c7c7cc]">Puede presentarse en equipos que utilizan un flex entre la placa de carga y la placa principal. En el taller trabajamos con modelos de Samsung Galaxy A, S y M; Motorola E, G y Edge; y Xiaomi, POCO y Redmi, incluida la línea Redmi Note, que emplean este tipo de conexión.</p>
        <p className="leading-7 text-[#c7c7cc]">Esto no significa que todos los modelos de esas familias tengan la misma distribución interna ni que todos vayan a presentar el problema. Para revisar el equipo y buscar un repuesto compatible hace falta identificar el modelo exacto y, cuando corresponda, su variante.</p>
      </section>
      <section className="space-y-5">
        <h2 className="tc-heading !text-2xl">¿Cómo saber si falla el flex o el pin de carga?</h2>
        <p className="leading-7 text-[#c7c7cc]">El síntoma por sí solo no alcanza. Que el teléfono no cargue, cargue de forma intermitente o tenga problemas al conectarse por USB no identifica automáticamente un flex dañado. Las funciones que pasan por esa conexión dependen del diseño del equipo.</p>
        <p className="leading-7 text-[#c7c7cc]">El pin o puerto de carga es donde enchufás el cable. El flex de interconexión está dentro del teléfono. Antes de atribuir la falla a una conexión interna, hay que comprobar el cable, el cargador y el puerto, y continuar la revisión según el resultado.</p>
        <p className="leading-7 text-[#c7c7cc]">También importa cómo empezó el problema: si apareció después de un golpe, de contacto con líquido o de una reparación anterior. Esos antecedentes orientan la búsqueda; no reemplazan el diagnóstico.</p>
        <p className="leading-7 text-[#c7c7cc]">Si la dificultad está en el puerto externo, podés consultar nuestra <Link href="/guias/pin-de-carga-suelto-solucion" className="tc-link underline underline-offset-4">guía sobre fallas del pin de carga</Link>.</p>
      </section>
      <section className="space-y-5">
        <h2 className="tc-heading !text-2xl">¿Qué puede fallar en esta conexión?</h2>
        <p className="leading-7 text-[#c7c7cc]">El daño puede estar en las pistas del flexible, en los contactos del conector o en la unión de este con la placa. Por ejemplo, un flex puede tener una pista interrumpida aunque su conector siga encastrando. También puede ocurrir lo contrario: el flexible está en condiciones, pero el conector de la placa tiene un problema.</p>
        <p className="leading-7 text-[#c7c7cc]">La forma de conectar y desconectar estas piezas también importa. Un encastre desalineado o un esfuerzo sobre el conector puede dañar contactos o partes de su estructura. Los fabricantes incluyen precauciones específicas de manipulación para evitar esos daños; no todos los conectores se retiran de la misma manera. <a href="https://www.hirose.com/en/product/document?clcode=CL0684-3618-0-51&amp;documentid=D49052_en&amp;documenttype=Catalog&amp;lang=en&amp;productname=DF37NC%281.5%29-34DS-0.4V%2851%29&amp;series=DF37" className="tc-link underline underline-offset-4">Referencia técnica de Hirose</a>.</p>
        <p className="leading-7 text-[#c7c7cc]">Por eso, que una pieza entre en su lugar no demuestra que la conexión eléctrica funcione correctamente.</p>
        <figure className="space-y-3">
          <Image src="/images/guias/fpc/detalle-contactos.webp" alt="Detalle de los contactos y pistas en el extremo de un flex, observado bajo microscopio." width={1440} height={1080} sizes="(max-width: 767px) calc(100vw - 32px), 760px" className="h-auto w-full rounded-xl" />
          <figcaption className="text-sm leading-6 text-[#a1a1a6]">Acercamiento al extremo del flex. El aumento permite examinar detalles de los contactos y las uniones que no se distinguen a simple vista.</figcaption>
        </figure>
      </section>
      <section className="space-y-5">
        <h2 className="tc-heading !text-2xl">¿Qué revisamos con el microscopio?</h2>
        <p className="leading-7 text-[#c7c7cc]">El microscopio permite observar los contactos, el cuerpo del conector y las zonas donde se une al circuito. Esa inspección ayuda a localizar daños visibles y a decidir dónde continuar las comprobaciones.</p>
        <p className="leading-7 text-[#c7c7cc]">Pero una foto no muestra por sí sola si todas las líneas conducen correctamente. Para distinguir una falla del flex de una falla en la placa hay que relacionar lo observado con las mediciones y con el comportamiento del equipo. El objetivo es identificar dónde se interrumpe o altera la conexión antes de elegir el trabajo.</p>
      </section>
      <section className="space-y-5">
        <h2 className="tc-heading !text-2xl">¿Limpiar el conector alcanza para repararlo?</h2>
        <p className="leading-7 text-[#c7c7cc]">Puede ser parte del trabajo cuando hay suciedad o residuos que interfieren con el contacto. Después de limpiar hay que volver a inspeccionar y comprobar la conexión.</p>
        <p className="leading-7 text-[#c7c7cc]">La limpieza no reconstruye una pista cortada, un contacto roto ni una unión desprendida. Si existe alguno de esos daños, corresponde evaluar otra intervención.</p>
        <figure className="space-y-3">
          <video controls playsInline preload="none" width={1280} height={720} poster={FPC_GUIDE.poster} aria-label="Limpieza del conector de un flex bajo microscopio" aria-describedby="fpc-video-caption" className="h-auto w-full rounded-xl bg-[#1d1d1f]">
            <source src={FPC_GUIDE.video} type="video/mp4" />
            <track kind="descriptions" src="/videos/guias/fpc/limpieza-conector-flex.vtt" srcLang="es" label="Descripción en español" />
            Tu navegador no reproduce este video. <a href={FPC_GUIDE.video}>Abrir el video de limpieza del conector</a>.
          </video>
          <figcaption id="fpc-video-caption" className="text-sm leading-6 text-[#a1a1a6]">Fragmento de 25 segundos del trabajo sobre el conector de un flex. Se muestra una etapa del proceso; el video no documenta el diagnóstico completo ni la prueba final del equipo.</figcaption>
          <p className="text-sm leading-6 text-[#a1a1a6]">Video sin audio. Bajo el microscopio, un cepillo trabaja sobre el conector del extremo de un flex.</p>
        </figure>
      </section>
      <section className="space-y-5">
        <h2 className="tc-heading !text-2xl">¿Cuándo se cambia el flex y cuándo se trabaja sobre la placa?</h2>
        <p className="leading-7 text-[#c7c7cc]">Si el daño está limitado al flexible y los conectores de las placas están en condiciones, puede corresponder reemplazar el flex por uno compatible.</p>
        <p className="leading-7 text-[#c7c7cc]">Si el problema está en un conector soldado a la placa, cambiar solamente el flex no lo resuelve. Hay que evaluar el estado del conector, sus puntos de soldadura y las pistas de esa zona. Según el daño, puede requerirse un trabajo de microsoldadura.</p>
        <p className="leading-7 text-[#c7c7cc]">Son intervenciones distintas, con presupuestos y plazos que dependen del equipo y del diagnóstico. Una falla localizada en la conexión tampoco implica automáticamente que haya que reemplazar la placa completa.</p>
        <p className="leading-7 text-[#c7c7cc]">Podés conocer cómo recibimos y evaluamos estos trabajos en <Link href="/reparaciones/reparacion-placa-caba" className="tc-link underline underline-offset-4">diagnóstico y reparación de placa</Link>.</p>
      </section>
      <section className="space-y-5">
        <h2 className="tc-heading !text-2xl">¿Cómo se comprueba el resultado?</h2>
        <p className="leading-7 text-[#c7c7cc]">La revisión no termina cuando el conector queda colocado. Hay que comprobar la función que fallaba y las funciones relacionadas con esa conexión en el modelo intervenido.</p>
        <p className="leading-7 text-[#c7c7cc]">Si el problema era intermitente, una comprobación aislada puede no ser suficiente para darlo por resuelto. El resultado se evalúa sobre el equipo y su falla concreta, no solamente por cómo se ve la pieza después del trabajo.</p>
      </section>
      <section className="space-y-5">
        <h2 className="tc-heading !text-2xl">¿Qué datos conviene tener para consultar?</h2>
        <p className="leading-7 text-[#c7c7cc]">Contanos la marca y el modelo, qué dejó de funcionar y si el problema ocurre siempre o aparece por momentos. Sumá si hubo un golpe, contacto con líquido o una reparación previa. Si ya se cambió el pin, la placa de carga o el flex, ese dato también sirve.</p>
        <p className="leading-7 text-[#c7c7cc]">No hace falta abrir el teléfono ni enviarnos contraseñas para hacer la primera consulta.</p>
        <p className="leading-7 text-[#c7c7cc]">En Team Celular recibimos equipos en <strong>Paraguay 2451, Recoleta</strong>, y <strong>Amenábar 2032, Belgrano</strong>. La revisión permite confirmar qué está fallando y qué trabajo corresponde antes de reparar.</p>
        <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="fpc_guide_budget" ctaLocation="fpc_guide_end" ctaVariant="primary" className="tc-btn tc-btn-primary">Consultar por la falla de mi celular</TrackedCtaLink>
      </section>
    </article>
  );
}

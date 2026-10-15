import Link from "next/link";
import ComparisonGuidePage, { ComparisonCta, ComparisonTable } from "@/components/seo/ComparisonGuidePage";
import { buildWebsiteMetadata } from "@/lib/seoMetadata";
import { REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE, SCREEN_BATTERY_TIMING_MESSAGE } from "@/lib/copyStandards";
import { formatArsPrice, PLACA_REVISION_PRICE } from "@/lib/repairPrices";

const PATH = "/guias/team-celular-vs-gofix-view-phone";
const TITLE = "Team Celular vs GoFix y View Phone: reparación en CABA";
const DESCRIPTION = "Compará Team Celular, GoFix y View Phone en CABA: sucursales, marcas, turnos y garantía. Datos públicos revisados el 15/10/2026.";

export const metadata = buildWebsiteMetadata({ path: PATH, title: TITLE, description: DESCRIPTION, ogType: "article", keywords: ["Team Celular vs GoFix", "alternativa a GoFix", "Team Celular vs View Phone", "reparación celulares Belgrano"], languages: { "es-AR": PATH } });

const faq = [
  { question: "¿Qué diferencia hay entre Team Celular, GoFix y View Phone?", answer: "Team Celular atiende varias marcas en Recoleta y Belgrano; GoFix publica una red multimarca con locales en CABA y otras zonas; View Phone se presenta como especialista Apple en Monroe 2810, Belgrano. La elección depende del modelo, la falla, el presupuesto y la sucursal que pueda recibirlo." },
  { question: "¿Cuál de los tres cobra menos por reparar mi celular?", answer: "Esta comparación no establece un ganador por precio. Necesitás presupuestos del mismo modelo, falla y calidad de repuesto, con instalación, revisión y condiciones de pago detalladas. Un precio desde para otro modelo no permite comparar el costo final." },
  { question: "¿Los tres ofrecen garantía?", answer: "Team Celular informa 90 días por escrito sobre trabajo y repuesto; GoFix comunica tres meses; View Phone comunica 90 días por escrito. Confirmá el alcance, las exclusiones y cómo gestionar un reclamo antes de aprobar cada presupuesto." },
  { question: "¿Team Celular cobra la revisión aunque no repare?", answer: `La revisión técnica es arancelada. La general suele variar entre ARS 15.000 y ARS 25.000; la revisión de placa cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, se cobra aunque no se repare y se descuenta si se realiza la reparación. Confirmamos qué revisión necesita tu equipo antes de ingresarlo.` },
  { question: "¿Tengo que pedir turno en Team Celular?", answer: "Podés acercarte a Recoleta o Belgrano de lunes a viernes de 10:30 a 18:00 sin turno. Consultá antes por WhatsApp si necesitás confirmar un repuesto o un plazo. Para GoFix y View Phone, coordiná con la sucursal elegida según su modalidad publicada." },
];

export default function RepairShopComparison() {
  return (
    <ComparisonGuidePage path={PATH} title={TITLE} description="En CABA, Team Celular atiende varias marcas en Recoleta y Belgrano; GoFix ofrece una red de locales y View Phone se especializa en Apple en Belgrano. Compará el mismo modelo, repuesto y costo total antes de elegir." faq={faq}>
      <section>
        <h2>¿Qué cambia entre los tres servicios?</h2>
        <p>Si tenés el equipo roto y estás mirando talleres, probablemente quieras resolver tres cosas: que lo reciban, saber cuánto vas a pagar y entender qué pasa si vuelve a fallar. Una marca conocida o una sucursal cerca pueden ayudarte a elegir, pero no reemplazan las condiciones del trabajo. Esta tabla reúne información publicada por cada negocio; los enlaces para comprobarla están al final.</p>
        <ComparisonTable caption="Información pública consultada el 15 de octubre de 2026" columns={["Criterio", "Team Celular", "GoFix", "View Phone"]} rows={[
          { label: "Ubicación relevante", values: ["Paraguay 2451, Recoleta; Amenábar 2032, Belgrano.", "Red de locales; Belgrano en Arcos 1922, según su directorio.", "Monroe 2810, Belgrano."] },
          { label: "Marcas publicadas", values: ["iPhone, Samsung, Motorola, Xiaomi y otras según modelo.", "Apple, Samsung, Motorola, Xiaomi y otras.", "Especializado en Apple: iPhone, MacBook, iPad y Apple Watch."] },
          { label: "Garantía anunciada", values: ["90 días por escrito sobre trabajo y repuesto; alcance informado antes de reparar.", "Tres meses en reparaciones.", "90 días por escrito."] },
          { label: "Plazo", values: ["Pantalla y batería: habitualmente 2–4 h con stock y según diagnóstico. Placa: plazo propio.", "Muchas reparaciones en el día, sujeto a repuesto y diagnóstico.", "Publica reparación express en el día con turno; confirmar caso."] },
          { label: "Coordinación", values: ["Sin turno en horario de atención; consulta previa por WhatsApp.", "Consultar modalidad y horarios del local elegido.", "Cotización y reserva de turno."] },
          { label: "Costo de diagnóstico", values: [`Revisión general orientativa ARS 15.000–25.000. Placa: ${formatArsPrice(PLACA_REVISION_PRICE)}; se cobra aunque no se repare y se descuenta al reparar.`, "Importe no verificado en las páginas consultadas; pedirlo al local.", "Importe no verificado en las páginas consultadas; pedirlo al cotizar."] },
        ]} />
        <p>Que un importe no esté verificado acá no significa que sea gratis ni que el negocio no lo informe por otro canal. Tampoco atribuimos a toda una red las condiciones de una sucursal: consultá con el local al que vas a entregar el celular.</p>
        <ComparisonCta guideKey="team_celular_gofix_view_phone" location="comparison_after_table" />
      </section>
      <section>
        <h2>¿En qué caso puede convenirte cada opción?</h2>
        <h3>Si priorizás una red de locales</h3>
        <p>GoFix puede entrar en tu lista si querés elegir entre varios barrios o necesitás atención fuera de las zonas donde estamos nosotros. Antes de viajar, confirmá que ese local recibe tu modelo y tu falla. La existencia de una sucursal no indica por sí sola que tenga el repuesto o que pueda entregar el trabajo ese día.</p>
        <h3>Si buscás un servicio enfocado en Apple en Belgrano</h3>
        <p>View Phone puede ser una opción si preferís un negocio dedicado al ecosistema Apple y te sirve coordinar un turno. Pedí el detalle del repuesto y del trabajo para tu generación de iPhone: una descripción general no asegura que estén disponibles todas las opciones para todos los modelos.</p>
        <h3>Si querés consultar en Team Celular</h3>
        <p>En Team podés traer un iPhone o un Android a cualquiera de nuestras dos sucursales. Si ya tenés un presupuesto de otro taller, nos sirve para entender qué te ofrecieron y qué falta aclarar. Una segunda opinión requiere revisar el equipo; no prometemos reparar una placa por una foto ni declaramos equivocado un diagnóstico ajeno sin comprobar la falla.</p>
        <p>{REVIEW_COST_MESSAGE} Para placa, la revisión cuesta {formatArsPrice(PLACA_REVISION_PRICE)} y tiene una condición distinta: se cobra aunque el equipo no se repare y se descuenta si se repara. {WARRANTY_SCOPE_MESSAGE} Podés leer el alcance en <Link href="/reparaciones/reparacion-placa-caba">reparación de placa</Link> o consultar el <Link href="/presupuesto-reparacion">proceso de presupuesto</Link>.</p>
      </section>
      <section>
        <h2>¿Cómo comparás dos presupuestos sin mezclar trabajos distintos?</h2>
        <p>Pedí que ambos presupuestos respondan estas preguntas. Si uno dice solo “cambio de pantalla” y otro identifica módulo, instalación y funciones disponibles, todavía no tenés dos propuestas equivalentes. La diferencia puede estar en el repuesto, en el alcance o en una falla adicional.</p>
        <ol>
          <li><strong>Modelo exacto.</strong> Incluí versión, tamaño y, si hace falta, código de modelo. Un iPhone común y su variante Pro no usan necesariamente la misma pantalla. Un precio publicado para otra variante sirve como orientación, no como cotización de tu equipo.</li>
          <li><strong>Falla comprobada.</strong> Una pantalla negra puede requerir un módulo o una revisión de placa. Preguntá qué pruebas sostienen el diagnóstico y qué ocurrirá si aparecen otros daños al abrirlo. No compares un reemplazo puntual con una reparación de varias fallas.</li>
          <li><strong>Repuesto identificado.</strong> Pedí tecnología, procedencia y condición. “Premium” o “calidad original” no alcanzan para saber qué se instala. La <Link href="/guias/reparacion-pantalla-celular#comparar-pantallas">comparativa de pantallas</Link> explica las preguntas que conviene hacer.</li>
          <li><strong>Total y forma de pago.</strong> Confirmá si incluye instalación, revisión, repuesto, traslado y cualquier costo de financiación. Preguntá cuánto queda a pagar al retirar y si hay una seña. Compará importes en la misma fecha y bajo el mismo medio de pago.</li>
          <li><strong>Plazo y condiciones.</strong> Diferenciá tiempo de diagnóstico y tiempo de reparación. Un trabajo de pantalla con stock no permite estimar cuánto llevará una placa con daño por líquido. Pedí que te avisen antes de cambiar el alcance o el importe aprobado.</li>
          <li><strong>Garantía y comprobante.</strong> Verificá qué falla cubre, desde cuándo corre y dónde se reclama. La duración anunciada no dice por sí sola qué sucede ante otro golpe, líquido o una falla diferente. Conservá la orden de ingreso y el comprobante de entrega.</li>
        </ol>
      </section>
      <section>
        <h2>¿Alcanza con elegir el taller más rápido o el más barato?</h2>
        <p>La urgencia importa si usás el celular para trabajar. Pero “en el día” no debería tomarse como garantía para cualquier falla. En Team Celular, {SCREEN_BATTERY_TIMING_MESSAGE} Si hay una falla de placa, puede hacer falta más tiempo de medición y pruebas; confirmamos ese plazo por separado.</p>
        <p>El precio más bajo puede ser adecuado si el repuesto y las funciones te sirven. El más alto también necesita explicación: pedí qué cambia y qué evidencia acompaña la propuesta. No usamos una diferencia de precio para deducir cómo trabaja otro taller ni para afirmar que una opción es mejor en todos los casos.</p>
        <p>Si el presupuesto se acerca a lo que cuesta un reemplazo que te sirve, revisá <Link href="/guias/reparar-celular-o-comprar-otro">cuándo conviene reparar o comprar otro celular</Link>. La decisión puede cambiar si el equipo tiene otras fallas, si necesitás rescatar datos o si ya estabas por cambiarlo.</p>
      </section>
      <section>
        <h2>¿Qué conviene dejar asentado antes de entregar el celular?</h2>
        <p>Registrá el estado exterior, los accesorios que entregás y las funciones que todavía andan. Si el equipo enciende, hacé una copia de seguridad antes de llevarlo. Avisá si recibió líquido, tuvo otra reparación o si la falla apareció después de una caída: esos antecedentes cambian el diagnóstico.</p>
        <p>Informá desde el principio si tus datos son la prioridad. Volver a usar el equipo y recuperar información pueden requerir trabajos distintos. Pedí que no se autorice una restauración, un borrado ni un cambio de placa sin explicarte las consecuencias y pedir tu aprobación. La recuperación de datos no debe darse por garantizada.</p>
        <p>Para la entrega, acordá una prueba de las funciones relacionadas con el trabajo: imagen y táctil si cambiaste pantalla; carga si se reparó el conector; cámaras, sonido y sensores cuando corresponda. Si alguna función no puede probarse por el estado previo del celular, conviene que quede escrita. Ese registro te ayuda a entender qué resolvió la reparación.</p>
      </section>
      <section>
        <h2>¿De dónde salen los datos de esta comparación?</h2>
        <p>Consulta documental realizada el 15 de octubre de 2026. No hicimos reparaciones de prueba ni pedidos de presupuesto a los competidores. No asignamos puntajes, posiciones de Google ni un ganador por precio. Los plazos publicados son anuncios de cada negocio y requieren confirmación para el caso concreto.</p>
        <ul>
          <li><a href="https://gofix.com.ar/reparaciones/" rel="noopener noreferrer">GoFix: servicios, marcas y garantía</a>; <a href="https://gofix.com.ar/nuestros-locales/" rel="noopener noreferrer">directorio de locales</a>; <a href="https://gofix.com.ar/preguntas-frecuentes1/" rel="noopener noreferrer">preguntas frecuentes y plazos</a>.</li>
          <li><a href="https://viewphone.com.ar/" rel="noopener noreferrer">View Phone: especialización, dirección, turnos y garantía</a>. La dirección también figura en su <a href="https://www.viewphoneba.com/contacto/" rel="noopener noreferrer">tienda View Phone BA</a>.</li>
          <li><Link href="/sucursales">Team Celular: sucursales</Link>; <Link href="/presupuesto-reparacion">revisión y presupuesto</Link>; <Link href="/reparaciones/reparacion-placa-caba">condiciones específicas de placa</Link>.</li>
        </ul>
        <p>Los horarios, precios y condiciones pueden cambiar. Confirmalos con el negocio elegido antes de trasladarte o aprobar un trabajo. Si una página pública no resuelve una pregunta, la dejamos como dato por confirmar; no la completamos con una suposición.</p>
      </section>
    </ComparisonGuidePage>
  );
}

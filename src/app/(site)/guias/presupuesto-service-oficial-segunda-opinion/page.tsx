import Link from "next/link";
import ComparisonGuidePage, { ComparisonCta, ComparisonTable } from "@/components/seo/ComparisonGuidePage";
import { buildWebsiteMetadata } from "@/lib/seoMetadata";
import { REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE, BUDGET_RESPONSE_MESSAGE, SCREEN_BATTERY_TIMING_MESSAGE } from "@/lib/copyStandards";
import { formatArsPrice, PLACA_REVISION_PRICE } from "@/lib/repairPrices";

const PATH = "/guias/presupuesto-service-oficial-segunda-opinion";
const TITLE = "Service oficial vs taller independiente en CABA";

export const metadata = buildWebsiteMetadata({
  path: PATH,
  title: "Service Oficial vs Taller Independiente en CABA",
  description: `Service oficial o independiente en CABA: compará cobertura y repuestos. Revisión de placa ${formatArsPrice(PLACA_REVISION_PRICE)} en Team Celular; se descuenta al reparar.`,
  keywords: ["service oficial vs taller independiente", "servicio técnico oficial o independiente iPhone", "presupuesto service oficial caro", "segunda opinión reparación celular"],
  openGraphTitle: "Service oficial vs taller independiente en CABA | Team Celular",
  openGraphDescription: "Compará cobertura, repuestos, revisión y alcance antes de aceptar un presupuesto.",
  openGraphImagePath: "/images/reparacion_placa.webp",
  openGraphImageAlt: "Reparación a nivel placa con microscopio en Team Celular",
  ogType: "article",
  languages: { "es-AR": PATH },
});

const faq = [
  { question: "¿Conviene el servicio oficial o un taller independiente para mi iPhone?", answer: "Si el iPhone tiene cobertura, consultá primero con Apple o un proveedor autorizado. Fuera de cobertura, compará diagnóstico, repuesto, funciones, costo total y plazo. Team Celular es un taller independiente en Recoleta y Belgrano; no se presenta como proveedor autorizado ni como integrante del programa IRP de Apple." },
  { question: "¿Una reparación independiente anula toda la garantía?", answer: "No corresponde afirmarlo de forma automática para todos los casos. Apple distingue la reparación no autorizada y los daños causados por ella de la cobertura de su propia red. Si el equipo tiene garantía o un plan vigente, verificá sus condiciones con el fabricante antes de autorizar una intervención externa." },
  { question: "¿El service oficial siempre cambia la placa completa?", answer: "No se puede generalizar. La reparación propuesta depende de la marca, del modelo, de la falla y del centro. Si tu presupuesto indica reemplazo de placa, podés pedir una segunda opinión para evaluar si hay una reparación viable a nivel componente. No se garantiza que exista ni que sea más barata." },
  { question: "¿Cuánto cuesta revisar una placa en Team Celular?", answer: `La revisión de placa cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}. Se cobra aunque el equipo no se repare y se descuenta si se realiza la reparación. No equivale al precio del arreglo: después del diagnóstico te informamos viabilidad, importe y plazo para que decidas.` },
  { question: "¿Qué pasa si el equipo no tiene reparación?", answer: "La revisión arancelada se cobra según el alcance informado al ingresar. No cobramos una reparación que no se realiza. Si la prioridad son tus datos, aclaralo antes: evaluamos ese objetivo por separado y no garantizamos recuperación ni que el equipo vuelva al uso diario." },
];

export default function SecondOpinionGuidePage() {
  return (
    <ComparisonGuidePage path={PATH} title={TITLE} publishedTime="2026-08-12T00:00:00Z" description="Con cobertura vigente, consultá primero el canal oficial. Fuera de cobertura, compará repuesto, costo total y plazo. Team Celular es un taller independiente en Recoleta y Belgrano, CABA: evaluamos la falla y presupuestamos antes de reparar." faq={faq}>
      <section>
        <h2>¿Qué cambia entre el servicio oficial y Team Celular?</h2>
        <p>El canal oficial y un taller independiente pueden resolver necesidades distintas. La diferencia no se resume en que uno cambia piezas y el otro repara: hace falta leer la propuesta concreta. Tampoco puede deducirse el precio o la demora solo por el tipo de proveedor. Esta comparación identifica la cobertura de cada canal y las condiciones que publicamos en Team.</p>
        <ComparisonTable caption="Oficial e independiente: criterios revisados el 15 de octubre de 2026" columns={["Criterio", "Canal oficial de la marca", "Team Celular, taller independiente"]} rows={[
          { label: "Cobertura del fabricante", values: ["Evalúa garantía y planes de la marca según sus condiciones.", "La reparación tiene nuestra garantía; no es una reparación respaldada por Apple o Samsung."] },
          { label: "Trabajo propuesto", values: ["Depende de marca, modelo, falla y procedimiento. Revisá el presupuesto del centro.", "Evaluamos pantalla, batería, carga y placa. Si corresponde, se cotiza reparación a nivel componente."] },
          { label: "Repuestos", values: ["Confirmá la pieza, el procedimiento y la disponibilidad con el centro autorizado.", "Informamos procedencia, condición y funciones de la opción disponible antes de presupuestar."] },
          { label: "Diagnóstico y plazo", values: ["Pedir plazo al centro para el modelo y la falla; no asignamos una demora general.", "Diagnóstico inicial dentro de 24 horas hábiles; placa puede requerir pruebas adicionales. Pantalla y batería suelen llevar 2–4 h con stock."] },
          { label: "Precio", values: ["Solicitar cotización vigente y confirmar si hay cobertura. Samsung publica precios sugeridos fuera de garantía.", `Revisión general orientativa ARS 15.000–25.000; revisión de placa ${formatArsPrice(PLACA_REVISION_PRICE)}. Reparación con presupuesto propio.`] },
          { label: "Garantía del trabajo", values: ["Según marca, cobertura y reparación; pedir las condiciones del centro.", "90 días por escrito sobre trabajo y repuesto, con alcance informado antes de avanzar."] },
          { label: "Datos", values: ["Preguntar qué procedimiento se hará y si exige borrar o reemplazar componentes.", "Informar si la prioridad es recuperar datos. No garantizamos recuperación ni preservación en todos los casos."] },
        ]} />
        <ComparisonCta guideKey="oficial_o_independiente" location="comparison_after_table" />
      </section>
      <section>
        <h2>¿Qué significa que un taller sea oficial, independiente o IRP?</h2>
        <p>Apple distingue proveedores autorizados y participantes de su programa de reparaciones independientes. Los autorizados ofrecen reparaciones en garantía y fuera de garantía con respaldo de Apple. El programa IRP permite acceder a recursos para determinadas reparaciones fuera de garantía. Que un negocio se llame independiente no demuestra que participe de ese programa.</p>
        <p>Team Celular es un taller independiente y no se presenta como centro autorizado de Apple o Samsung ni como integrante del programa IRP. Para comprobar la condición de otro proveedor Apple, usá el <a href="https://support.apple.com/es-co/repair/verify-repair-provider" rel="noopener noreferrer">verificador oficial de proveedores</a>. Para Samsung, consultá su <a href="https://www.samsung.com/ar/support/service-center/" rel="noopener noreferrer">buscador de centros de soporte</a> y confirmá que reciban tu producto.</p>
        <p>La distinción te ayuda a saber a quién reclamar y qué respaldo acompaña el trabajo. No permite concluir, sin diagnóstico, qué proveedor resolverá una falla concreta. Pedí siempre una orden identificada con negocio, equipo y trabajo autorizado. Si te ofrecen un repuesto original, solicitá además su procedencia y condición.</p>
      </section>
      <section>
        <h2>¿Cuándo conviene empezar por el canal oficial?</h2>
        <p>Si el equipo tiene garantía o un plan vigente, revisá primero qué atención puede corresponder. Tené a mano modelo, comprobante de compra y síntomas. Una caída, una falla espontánea y un daño por líquido pueden tener tratamientos distintos. No apruebes una intervención externa antes de saber qué opciones ofrece la cobertura de tu caso.</p>
        <p>Apple aclara que las reparaciones no autorizadas no están respaldadas por su garantía o AppleCare y que los daños causados por proveedores no autorizados no están cubiertos por esos programas. Eso no equivale a afirmar que abrir cualquier equipo anula automáticamente toda cobertura. Confirmá la política aplicable con el fabricante; esta guía no decide un reclamo de garantía.</p>
        <p>Samsung informa atención dentro y fuera de garantía y ofrece un acceso a precios sugeridos de reparación. Por eso tampoco corresponde decir que las marcas nunca publican valores. Un precio de referencia puede requerir diagnóstico y no reemplaza la cotización para tu modelo. La <a href="https://www.samsung.com/ar/support/" rel="noopener noreferrer">página de soporte Samsung Argentina</a> reúne esas opciones.</p>
      </section>
      <section>
        <h2>¿Cuándo sirve pedir una segunda opinión?</h2>
        <p>Puede servir si no entendés el diagnóstico, si el presupuesto se acerca al costo de otro equipo o si te proponen cambiar la placa y querés evaluar una alternativa. Traé la orden anterior completa: modelo, falla informada, pieza propuesta, importe y observaciones. No hace falta interpretar el nombre de cada componente; sí entender qué resultado se espera del trabajo.</p>
        <p>Si te dijeron que el equipo no tiene reparación, preguntá qué se comprobó y cuál es el límite encontrado. Puede haber restricciones de repuesto, daño extendido u otras razones. No damos por hecho que ese diagnóstico sea incorrecto. Una segunda revisión sirve para contrastar la viabilidad del caso, no para prometer un resultado distinto antes de medir.</p>
        <p>En Team revisamos el estado del equipo y, si el caso lo requiere, consumos, conectores y zonas afectadas de la placa. La posibilidad de reparar un componente depende del daño y de los recursos disponibles para ese modelo. Cuando no vemos un camino viable o el costo no tiene sentido para tu objetivo, lo explicamos antes de proponer un arreglo.</p>
        <p>Si todavía estás decidiendo cuánto gastar, leé <Link href="/guias/reparar-celular-o-comprar-otro">reparar el celular o comprar otro</Link>. Esa decisión necesita comparar el presupuesto completo y un reemplazo que realmente te sirva. No alcanza con una regla de antigüedad o con un porcentaje fijo del precio del teléfono.</p>
      </section>
      <section>
        <h2>¿Por qué dos presupuestos pueden tener precios distintos?</h2>
        <p>Primero comprobá si incluyen lo mismo. Un presupuesto puede ofrecer un repuesto diferente, contemplar más fallas o incluir un procedimiento que el otro no necesita. Pedí modelo exacto, pieza, instalación, revisión, condiciones de pago y garantía. No deduzcas la calidad del trabajo únicamente por el importe final.</p>
        <p>Si se trata de pantalla, “original”, “OLED” e “InCell” no describen lo mismo: algunas palabras indican procedencia y otras tecnología. Preguntá por la opción concreta, las funciones disponibles y la configuración necesaria. La <Link href="/guias/reparacion-pantalla-celular#comparar-pantallas">guía de pantallas</Link> desarrolla esa comparación sin asumir que todos los modelos admiten todas las alternativas.</p>
        <p>Una reparación a nivel componente tampoco es automáticamente económica: puede exigir tiempo de diagnóstico y pruebas. Si permite evitar un reemplazo mayor, el ahorro debe surgir de dos presupuestos equivalentes. No prometemos que el canal independiente sea siempre más barato ni que el oficial sea siempre más lento.</p>
      </section>
      <section>
        <h2>¿Cuánto cuesta la revisión y qué pasa si no reparás?</h2>
        <p>{REVIEW_COST_MESSAGE} La revisión de placa cuesta {formatArsPrice(PLACA_REVISION_PRICE)}: se cobra aunque no se repare y se descuenta si se repara. Confirmamos qué revisión corresponde antes del ingreso. Una consulta inicial por WhatsApp orienta, pero no reemplaza el diagnóstico físico cuando hace falta medir el equipo.</p>
        <p>El costo de revisar no es el precio de arreglar. Después del diagnóstico te informamos viabilidad, alcance, importe y plazo. Si no aprobás el arreglo, no se realiza esa reparación y sigue correspondiendo el arancel de revisión informado. Conservá la orden para saber qué se autorizó y qué pruebas se hicieron.</p>
        <p>{BUDGET_RESPONSE_MESSAGE} Una placa puede requerir pruebas adicionales: te informamos el plazo propio del caso. {SCREEN_BATTERY_TIMING_MESSAGE} Esas referencias no son una promesa de entrega para cualquier falla. Consultá las condiciones completas en <Link href="/presupuesto-reparacion">presupuesto de reparación</Link> y <Link href="/reparaciones/reparacion-placa-caba">revisión de placa</Link>.</p>
      </section>
      <section>
        <h2>¿Qué necesitás acordar sobre datos y garantía del trabajo?</h2>
        <p>Si el celular permite acceso, hacé una copia de seguridad antes de entregarlo. Si no enciende y la información es importante, dejalo asentado. No autorices una restauración, borrado o reemplazo de placa sin entender qué pasará con los datos. Reparar el equipo para usarlo y recuperar información pueden ser trabajos distintos.</p>
        <p>La recuperación no se puede garantizar por el síntoma ni por una reparación anterior. Pedí que te expliquen el objetivo del procedimiento y sus límites. Si no se puede asegurar la conservación, necesitás saberlo antes de aprobar. La prioridad de rescatar información debe quedar diferenciada del presupuesto para devolver el equipo al uso cotidiano.</p>
        <p>{WARRANTY_SCOPE_MESSAGE} Esa garantía corresponde a nuestro trabajo y no reemplaza una cobertura del fabricante. Al retirar, probá las funciones relacionadas con lo reparado y conservá el comprobante. Preguntá cómo proceder si vuelve a aparecer el síntoma, en qué sucursal se recibe y qué exclusiones se informaron.</p>
      </section>
      <section>
        <h2>¿Qué fuentes usamos y cómo se hizo la comparación?</h2>
        <p>Revisión documental del 15 de octubre de 2026. Usamos las políticas públicas de los fabricantes y las condiciones publicadas de Team Celular. No probamos servicios de otros centros ni tenemos sus cotizaciones para tu equipo. Los criterios de elección son orientación editorial; no asignamos un ganador general.</p>
        <ul>
          <li><a href="https://support.apple.com/es-lamr/repair" rel="noopener noreferrer">Apple: opciones de reparación, respaldo y cobertura</a>.</li>
          <li><a href="https://support.apple.com/es-co/repair/verify-repair-provider" rel="noopener noreferrer">Apple: diferencias y verificación de proveedores</a>.</li>
          <li><a href="https://www.samsung.com/ar/support/" rel="noopener noreferrer">Samsung Argentina: garantía, soporte y acceso a precios sugeridos</a>.</li>
          <li><Link href="/presupuesto-reparacion">Team Celular: revisión y presupuesto</Link>; <Link href="/reparaciones/reparacion-placa-caba">condiciones de revisión de placa</Link>.</li>
        </ul>
        <p>Si estás comparando talleres por nombre, también podés leer <Link href="/guias/team-celular-vs-gofix-view-phone">Team Celular, GoFix y View Phone</Link>. La dirección, el horario y las condiciones del lugar elegido deben confirmarse antes de llevar el equipo.</p>
      </section>
    </ComparisonGuidePage>
  );
}

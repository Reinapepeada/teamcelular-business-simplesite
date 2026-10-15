import Link from "next/link";
import ComparisonGuidePage, { ComparisonCta, ComparisonTable } from "@/components/seo/ComparisonGuidePage";
import { buildWebsiteMetadata } from "@/lib/seoMetadata";
import { REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import { formatArsPrice, PLACA_REVISION_PRICE } from "@/lib/repairPrices";

const PATH = "/guias/reparar-celular-o-comprar-otro";
const TITLE = "¿Conviene reparar el celular o comprar otro? Guía en CABA";
const DESCRIPTION = `Compará reparación y reemplazo según falla, costo total, estado y datos. Revisión de placa ${formatArsPrice(PLACA_REVISION_PRICE)} en Team Celular, Recoleta y Belgrano.`;

export const metadata = buildWebsiteMetadata({ path: PATH, title: TITLE, description: DESCRIPTION, ogType: "article", keywords: ["conviene reparar celular o comprar otro", "vale la pena cambiar pantalla celular", "reparar placa o cambiar celular", "cambiar batería o comprar celular"], languages: { "es-AR": PATH } });

const faq = [
  { question: "¿Cuándo conviene reparar un celular en vez de comprar otro?", answer: "Puede convenir cuando la falla está localizada, el resto del equipo funciona para tu uso y el costo total es razonable frente a un reemplazo equivalente. Compará presupuesto, estado de batería y pantalla, soporte de software y tiempo sin equipo. La antigüedad o un porcentaje de precio no deciden por sí solos." },
  { question: "¿Qué porcentaje del valor del celular conviene gastar en repararlo?", answer: "No hay un porcentaje universal. Necesitás el precio final de la reparación y el costo de un reemplazo que realmente te sirva, con su estado y garantía. También pesan otras fallas del equipo, soporte de software y posibles trabajos adicionales. Evitá decidir solo con un precio desde." },
  { question: "¿Vale la pena reparar la placa si el celular no enciende?", answer: `Primero hace falta diagnóstico: no encender no demuestra por sí solo una falla de placa. En Team Celular la revisión de placa cuesta ${formatArsPrice(PLACA_REVISION_PRICE)}, se cobra aunque no se repare y se descuenta si se repara. Informamos viabilidad, precio y plazo antes de autorizar el arreglo; la recuperación no está garantizada.` },
  { question: "¿Cambiar la batería permite seguir usando un celular viejo?", answer: "Puede resolver una batería degradada, pero no corrige otras causas de consumo ni agrega soporte de software. Antes de cambiarla conviene revisar batería, carga y consumo del equipo. Si el modelo todavía cubre tus necesidades y el resto funciona bien, pedí un presupuesto para comparar." },
  { question: "¿Recuperar los datos es lo mismo que reparar el celular?", answer: "No. El objetivo puede ser recuperar acceso a información aunque no convenga devolver el equipo al uso diario. Aclaralo antes de autorizar trabajos, borrados, restauraciones o reemplazos de placa. La posibilidad de recuperación depende del daño, del equipo y del acceso disponible; no se garantiza." },
];

export default function RepairOrReplaceGuide() {
  return (
    <ComparisonGuidePage path={PATH} title={TITLE} description="Reparar puede convenir si la falla está localizada y el equipo todavía te sirve. Comprar otro merece evaluación cuando se acumulan daños. En Team Celular, Recoleta y Belgrano, CABA, comparamos el diagnóstico con tus necesidades antes de presupuestar." faq={faq}>
      <section>
        <h2>¿Qué tenés que comparar antes de decidir?</h2>
        <p>No alcanza con enfrentar el presupuesto del arreglo con el precio del primer celular que encontrás. Un reemplazo más barato puede tener menos capacidad, una batería gastada o una garantía distinta. Y una reparación económica puede dejar pendientes otras fallas que ya te molestaban. La comparación sirve cuando sabés qué equipo te queda después de cada opción.</p>
        <ComparisonTable caption="Criterios para evaluar reparación o reemplazo; no es un diagnóstico de tu equipo" columns={["Situación", "Qué evaluar al reparar", "Qué evaluar al comprar otro"]} rows={[
          { label: "Batería degradada; resto funcional", values: ["Confirmar que el consumo venga de la batería y cotizar el cambio.", "Precio y estado de batería del reemplazo; migración y configuración."] },
          { label: "Pantalla rota", values: ["Tecnología del repuesto, funciones, instalación y otros daños por el golpe.", "Modelo equivalente, capacidad y estado de pantalla y sensores."] },
          { label: "No carga o no enciende", values: ["Distinguir cargador, puerto, batería y placa mediante diagnóstico.", "Costo de sustitución y qué pasará con los datos del equipo averiado."] },
          { label: "Varias fallas acumuladas", values: ["Presupuesto completo y qué problemas quedarían pendientes.", "Estado comprobable y garantía del equipo elegido."] },
          { label: "Datos importantes sin copia", values: ["Evaluar recuperación como objetivo separado; no prometer resultado.", "Comprar otro no recupera por sí solo los datos del anterior."] },
          { label: "Software o apps que ya no sirven", values: ["Una pieza nueva no cambia los requisitos de las apps ni el soporte del fabricante.", "Comprobar compatibilidad y actualizaciones para el modelo concreto."] },
        ]} />
        <ComparisonCta guideKey="reparar_o_comprar" location="comparison_after_table" />
      </section>
      <section>
        <h2>¿Cómo calculás el costo real de cada camino?</h2>
        <p>Para reparar, anotá el presupuesto final aprobado y preguntá cómo se imputa la revisión: puede estar incluida, descontarse o cobrarse aparte según el trabajo. Sumá únicamente los importes que efectivamente debas pagar. También considerá el traslado y cuánto tiempo podés pasar sin el equipo. No cuentes dos veces una revisión que ya está descontada.</p>
        <p>Para reemplazar, buscá un equipo que cubra las mismas tareas que necesitás: llamadas, cámara, almacenamiento, aplicaciones de trabajo y conectividad. Agregá los gastos que correspondan, como accesorios que debas cambiar o financiación. Si pensás entregar el celular dañado como parte de pago, necesitás una tasación confirmada; no uses el valor publicado de uno funcionando como si fuera el tuyo.</p>
        <p>Compará ambos totales en la misma fecha y con el mismo criterio de pago. Una oferta en efectivo y un plan en cuotas no son importes directamente equivalentes. Conservá las cotizaciones y su vigencia. Esta guía no fija precios de equipos nuevos o usados: dependen del modelo, del estado y del vendedor.</p>
        <p>En Team Celular, {REVIEW_COST_MESSAGE} La revisión específica de placa cuesta {formatArsPrice(PLACA_REVISION_PRICE)}, se cobra aunque no se repare y se descuenta si se repara. Esa revisión no es el precio de reparar una placa: el arreglo requiere presupuesto propio. Podés consultar las condiciones en <Link href="/reparaciones/reparacion-placa-caba">reparación de placa en CABA</Link>.</p>
      </section>
      <section>
        <h2>¿Conviene cambiar la batería o comprar otro celular?</h2>
        <p>Si el único problema es la autonomía, una batería nueva puede ser una opción para seguir usando el equipo. Antes hace falta comprobar si el desgaste de la batería explica el síntoma. Un celular que se descarga rápido también puede tener consumo anormal, problemas de carga u otra falla. Cambiar una pieza por descarte no asegura resolverlo.</p>
        <p>Hacé una lista corta del resto del equipo: ¿la pantalla está bien?, ¿tenés espacio suficiente?, ¿funcionan cámara, micrófono y carga?, ¿las aplicaciones que necesitás siguen siendo compatibles? Si esas respuestas te cierran, el presupuesto de batería tiene sentido como alternativa al reemplazo. Si ya querías cambiar por otras razones, la decisión económica será distinta.</p>
        <p>En un equipo usado que estés por comprar, pedí que también se revise la batería. Comprar otro celular no significa necesariamente conseguir mayor autonomía. La <Link href="/guias/cambio-bateria-celular">guía de cambio de batería</Link> explica qué revisamos; los precios por modelo se consultan en <Link href="/reparaciones/cambio-bateria-caba">el servicio de batería</Link>.</p>
      </section>
      <section>
        <h2>¿Cuándo tiene sentido cambiar la pantalla?</h2>
        <p>Una pantalla rota no vuelve inútil automáticamente al resto del teléfono. Si el golpe no dañó más componentes y el modelo sigue sirviéndote, cotizá una pantalla identificada por tecnología y condición. Compará el total instalado con el costo de un equipo equivalente. No compares una pantalla alternativa con una original sin aclarar qué funciones y terminación ofrece cada una.</p>
        <p>Antes de autorizar, preguntá si se pudieron probar sensores, cámaras y conectividad. Un golpe puede haber afectado más que el vidrio. Si la pantalla está negra, primero hay que distinguir si el problema está en el display, la conexión o la placa. El síntoma por sí solo no permite cotizar con certeza todas las piezas necesarias.</p>
        <p>Como ejemplo de decisión, sin valores inventados: si el equipo funciona bien y solo necesita pantalla, comparás un trabajo puntual con un reemplazo. Si además necesita batería y carga, pedí el conjunto de trabajos antes de decidir. La conclusión puede cambiar al sumar esos daños. Revisá la <Link href="/guias/reparacion-pantalla-celular#comparar-pantallas">comparativa entre original, OLED e InCell</Link> antes de elegir el módulo.</p>
      </section>
      <section>
        <h2>¿Y si no enciende, se mojó o te dijeron que es la placa?</h2>
        <p>En esos casos no conviene usar el precio de un cambio de batería como estimación. Hace falta revisar alimentación, consumo, conectores y las zonas afectadas. El diagnóstico puede encontrar una falla localizada o varios daños. El presupuesto debe decir qué se intentará reparar, cuál es el alcance y qué plazo se estima después de medir el equipo.</p>
        <p>Si hubo líquido, informá cuándo ocurrió y si se lo cargó o intentó encender después. No lo sigas probando ni cargando para ver si revive. La recuperación depende del daño y del estado de los componentes. Una limpieza o reparación no garantiza que un equipo con corrosión vuelva a ser adecuado para el uso diario.</p>
        <p>Cuando ya existe un diagnóstico de otro servicio, traé la orden y el presupuesto. Nos permiten entender la propuesta anterior y evaluar si corresponde una segunda revisión. No prometemos que una reparación a nivel componente siempre sea posible ni más barata que un reemplazo. Podés leer <Link href="/guias/presupuesto-service-oficial-segunda-opinion">cómo comparar el canal oficial con un taller independiente</Link>.</p>
      </section>
      <section>
        <h2>¿Qué pasa si lo más importante son tus fotos y tus datos?</h2>
        <p>Decilo antes de aprobar cualquier intervención. Recuperar información y volver a usar el celular son objetivos distintos. Puede no convenir una reparación para uso diario y, aun así, tener sentido evaluar si es posible acceder a los datos. También puede ocurrir que el daño impida recuperarlos. No hay un resultado asegurado antes del diagnóstico.</p>
        <p>Si el equipo enciende y permite acceder, hacé una copia antes de llevarlo. Comprobá que podés entrar a tus cuentas y revisá tus medios de recuperación. Si está averiado, no autorices una restauración o un reemplazo de placa pensando que eso conserva automáticamente la información. Pedí que te expliquen las consecuencias de cada procedimiento.</p>
        <p>Al evaluar otro celular, incluí el tiempo de configurar cuentas y trasladar la información que tengas respaldada. Un teléfono nuevo no soluciona la falta de una copia del anterior. Para iPhone, Apple publica los <a href="https://support.apple.com/es-lamr/108366" rel="noopener noreferrer">métodos de respaldo</a>; verificá cuál tenías activo y qué copia está disponible.</p>
      </section>
      <section>
        <h2>¿Qué otras preguntas ayudan a evitar una mala compra o reparación?</h2>
        <ul>
          <li><strong>Soporte de software.</strong> Comprobá en el fabricante y en las apps que usás qué versiones requieren. Una reparación de hardware no agrega compatibilidad ni cambia el calendario de actualizaciones. Evaluá el modelo concreto, no una regla general por antigüedad.</li>
          <li><strong>Equipo de reemplazo.</strong> Si es usado, verificá almacenamiento, batería, funciones, bloqueo de cuentas y comprobante. Preguntá qué garantía te ofrece el vendedor. No tomes un precio bajo como prueba de que el equipo está en condiciones equivalentes al tuyo.</li>
          <li><strong>Uso durante la espera.</strong> Si necesitás el celular para trabajar, consultá el plazo de diagnóstico y el de reparación por separado. Considerá si disponés de un equipo temporal. El tiempo sin teléfono puede pesar tanto como una diferencia de precio.</li>
          <li><strong>Trabajo documentado.</strong> Conservá la orden de ingreso, lo autorizado y el comprobante final. {WARRANTY_SCOPE_MESSAGE} Preguntá qué problemas quedarían fuera del alcance si el celular presenta más de una falla.</li>
        </ul>
      </section>
      <section>
        <h2>¿Cómo verificamos esta guía?</h2>
        <p>Revisada el 15 de octubre de 2026 con las condiciones publicadas de <Link href="/presupuesto-reparacion">presupuesto de Team Celular</Link>, la <Link href="/reparaciones/reparacion-placa-caba">revisión de placa</Link> y la documentación de <a href="https://support.apple.com/es-lamr/repair" rel="noopener noreferrer">opciones de reparación de Apple</a>. Los casos explican criterios de decisión; no se presentan como historias de clientes ni como una tasación de tu equipo.</p>
        <p>No aplicamos una regla del 50 % ni garantizamos cuántos años durará una reparación. Para decidir, necesitamos un diagnóstico, el presupuesto total y el estado del reemplazo que estás considerando. Si todavía no tenés esos datos, el primer paso es reunirlos antes de gastar en cualquiera de los dos caminos.</p>
      </section>
    </ComparisonGuidePage>
  );
}

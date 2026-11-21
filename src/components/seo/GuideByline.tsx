import { TECHNICAL_AUTHOR, TECHNICAL_AUTHOR_PATH } from "@/lib/businessProfile";

const DATE_FORMAT = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

// La fecha vivia solo en el JSON-LD. Los extractores de los motores de IA leen
// el texto renderizado: sin fecha visible la guia no se puede fechar y pierde
// elegibilidad por frescura.
export default function GuideByline({
  modifiedTime,
  tone = "dark",
}: {
  modifiedTime: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-white/70" : "text-slate-600 dark:text-slate-400";

  return (
    <p className={`text-[13px] ${color}`}>
      Actualizado el{" "}
      <time dateTime={modifiedTime}>
        {DATE_FORMAT.format(new Date(modifiedTime))}
      </time>{" "}
      por{" "}
      <a href={TECHNICAL_AUTHOR_PATH} rel="author" className="underline underline-offset-2">
        {TECHNICAL_AUTHOR.name}
      </a>
      , {TECHNICAL_AUTHOR.jobTitle.toLowerCase()}
    </p>
  );
}

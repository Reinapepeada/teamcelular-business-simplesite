import { TECHNICAL_AUTHOR } from "@/lib/businessProfile";

interface AuthorBylineProps {
  /** ISO date already rendered elsewhere as dateModified in the Article schema. */
  updatedLabel?: string;
  className?: string;
}

/**
 * Visible author credit. The Article schema declares a Person, and structured
 * data has to reflect what the page actually shows, so the byline and the
 * markup are fed from the same source.
 */
export default function AuthorByline({ updatedLabel, className = "" }: AuthorBylineProps) {
  return (
    <div
      className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-slate-600 dark:text-slate-400 ${className}`}
    >
      <span>
        Escrito y revisado por{" "}
        <a
          href={TECHNICAL_AUTHOR.url}
          target="_blank"
          rel="noopener noreferrer author"
          className="font-semibold text-primary underline-offset-2 hover:underline"
        >
          {TECHNICAL_AUTHOR.name}
        </a>{`, ${TECHNICAL_AUTHOR.jobTitle.toLowerCase()}.`}
      </span>
      <span className="text-slate-500 dark:text-slate-500">
        Repara celulares desde los 12 años. Formación con {TECHNICAL_AUTHOR.training.join(", ")}.
      </span>
      {updatedLabel ? (
        <span className="text-slate-500 dark:text-slate-500">Actualizado: {updatedLabel}.</span>
      ) : null}
    </div>
  );
}

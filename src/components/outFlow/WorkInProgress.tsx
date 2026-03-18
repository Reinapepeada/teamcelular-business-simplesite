import Link from "next/link";
import { IoMdConstruct } from "react-icons/io";

export default function WorkInProgress() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
            <IoMdConstruct
                size={44}
                className="mb-4 text-emerald-600"
                aria-hidden
            />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                En construcción
            </p>
            <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Estamos preparando este apartado
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Todavía no está listo, pero podés volver al inicio o seguir
                navegando desde las páginas principales.
            </p>
            <Link
                href="/"
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
                Volver al inicio
            </Link>
        </div>
    );
}

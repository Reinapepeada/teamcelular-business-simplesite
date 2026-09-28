"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function CatalogRetryButton() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    return (
        <button
            type="button"
            onClick={() => startTransition(() => router.refresh())}
            disabled={pending}
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
        >
            {pending ? "Cargando…" : "Reintentar"}
        </button>
    );
}

"use client";

import { useEffect } from "react";
import { capturePostHogException } from "@/lib/analytics/posthog";

export default function StoreError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => { capturePostHogException(error); }, [error]);
  return (
    <section className="mx-auto my-12 max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-2xl font-semibold">No pudimos cargar la tienda</h1>
      <p className="mt-3 text-muted-foreground">Puede ser una falla temporal. Probá de nuevo en unos instantes.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white"
      >
        Reintentar
      </button>
    </section>
  );
}

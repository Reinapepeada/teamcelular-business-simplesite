import type { Instrumentation } from "next";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.VERCEL_ENV === "preview") {
    const { installCatalogTransportTrace } = await import("@/lib/catalogTransportTrace");
    installCatalogTransportTrace();
  }
}

export const onRequestError: Instrumentation.onRequestError = async (error, request) => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { capturePostHogRequestError } = await import("@/lib/analytics/posthogServer");
    await capturePostHogRequestError(error, request.path, request.headers.dnt === "1");
  }
};

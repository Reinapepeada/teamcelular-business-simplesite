import type { Instrumentation } from "next";

export const onRequestError: Instrumentation.onRequestError = async (error, request) => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { capturePostHogRequestError } = await import("@/lib/analytics/posthogServer");
    await capturePostHogRequestError(error, request.path, request.headers.dnt === "1");
  }
};

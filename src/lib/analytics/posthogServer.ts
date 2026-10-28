import { randomUUID } from "node:crypto";
import { PostHog } from "posthog-node";
import { isPostHogErrorPage } from "./posthog";
import { sanitizePostHogException } from "./posthogErrors";

export async function capturePostHogRequestError(error: unknown, path: string, doNotTrack = false) {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (doNotTrack || process.env.VERCEL_ENV !== "production" || !token || !host || !base) return;
  try {
    const url = new URL(path, base);
    if (!isPostHogErrorPage(url.hostname, url.pathname)) return;
    const client = new PostHog(token, {
      host, flushAt: 1, flushInterval: 0, requestTimeout: 2000, fetchRetryCount: 0,
      enableExceptionAutocapture: false,
      before_send: event => {
        if (event.event !== "$exception") return null;
        const exception = sanitizePostHogException(event.properties || {});
        return exception ? { ...event, properties: { ...exception,
          $current_url: `${url.origin}${url.pathname}`, $pathname: url.pathname,
          $geoip_disable: true, $process_person_profile: false,
        } } : null;
      },
    });
    await client.captureException(error, randomUUID());
    await client.shutdown();
  } catch { /* La medición no debe ocultar el error original ni impedir la respuesta. */ }
}

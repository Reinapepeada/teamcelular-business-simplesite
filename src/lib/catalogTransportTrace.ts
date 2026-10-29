import { channel } from "node:diagnostics_channel";

export const catalogTraceChannels = [
  "undici:request:create", "undici:client:beforeConnect", "undici:client:connected",
  "undici:client:connectError", "undici:client:sendHeaders", "undici:request:headers",
  "undici:request:trailers", "undici:request:error",
] as const;

type Message = {
  request?: { method?: string; origin?: string | URL; path?: string };
  response?: { statusCode?: number };
  error?: { code?: string; name?: string };
  connectParams?: object;
  socket?: object;
};
type Record = { resource: string; stage: string; elapsed_ms: number; status?: number; error_code?: string };
type Trace = { resource: string; start: number };

function publicResource(request: Message["request"]): string | undefined {
  if (request?.method !== "GET" || !request.origin || !request.path) return;
  const origin = new URL(request.origin);
  if (origin.username || origin.password || !["https://api.beescend.com", "https://teamcelular.com"].includes(origin.origin)) return;
  const path = request.path.split(/[?#]/, 1)[0];
  if (path === "/store/facets" || path === "/store/products") return path;
  if (/^\/store\/products\/[a-z0-9][a-z0-9-]*$/.test(path)) return "/store/products/{slug}";
}

/** Temporary Preview-only observer. Never retains message headers, bodies or socket data. */
export function createCatalogTraceObserver(emit: (record: Record) => void) {
  const requests = new WeakMap<object, Trace>();
  const connections = new WeakMap<object, number>();
  return (name: string, message: unknown) => {
    try {
      const value = message as Message;
      const now = performance.now();
      if (name === "undici:client:beforeConnect" && value.connectParams) {
        // This event has no request association. Do not infer one from host/concurrency.
        return;
      }
      if (name === "undici:client:connected" && value.connectParams && value.socket) {
        connections.set(value.socket, now);
        return;
      }
      // connectError has no request/socket association. Do not attribute another request's connection.
      if (!value.request) return;
      if (name === "undici:request:create") {
        const resource = publicResource(value.request);
        if (!resource) return;
        requests.set(value.request, { resource, start: now });
      }
      const trace = requests.get(value.request);
      if (!trace) return;
      const record: Record = { resource: trace.resource, stage: "", elapsed_ms: Math.round(now - trace.start) };
      if (name === "undici:request:create") record.stage = "create";
      else if (name === "undici:client:sendHeaders") {
        const connected = value.socket && connections.get(value.socket);
        if (typeof connected === "number" && connected >= trace.start) emit({ ...record, stage: "connect", elapsed_ms: Math.round(connected - trace.start) });
        record.stage = "sendHeaders";
      } else if (name === "undici:request:headers") {
        record.stage = "headers";
        if (Number.isInteger(value.response?.statusCode)) record.status = value.response?.statusCode;
      } else if (name === "undici:request:trailers") record.stage = "body";
      else if (name === "undici:request:error") {
        record.stage = "error";
        const code = value.error?.code;
        record.error_code = code && /^(UND_ERR_(CONNECT_TIMEOUT|HEADERS_TIMEOUT|BODY_TIMEOUT|SOCKET|ABORTED|REQ_ABORTED)|ECONNRESET|ECONNREFUSED|ETIMEDOUT|ENOTFOUND|EAI_AGAIN)$/.test(code) ? code : "UNCLASSIFIED";
      } else return;
      emit(record);
      if (["body", "error"].includes(record.stage)) requests.delete(value.request);
    } catch {
      // Diagnostics subscribers are synchronous: observation must never affect a request.
    }
  };
}

let installed = false;
export function installCatalogTransportTrace() {
  if (installed || process.env.VERCEL_ENV !== "preview" || process.env.NEXT_RUNTIME !== "nodejs") return;
  installed = true;
  console.info("catalog_transport_runtime", JSON.stringify({ node: process.version, undici: process.versions.undici ?? "unavailable" }));
  const observe = createCatalogTraceObserver(record => console.info("catalog_transport_trace", JSON.stringify(record)));
  for (const name of catalogTraceChannels) channel(name).subscribe(message => observe(name, message));
}

const ERROR_TYPES = new Set(["Error", "TypeError", "ReferenceError", "RangeError", "SyntaxError", "URIError", "EvalError", "AggregateError", "StoreApiError", "TimeoutError", "AbortError", "ChunkLoadError"]);
// Códigos genéricos de Node/undici en error.cause: describen el corte, nunca el destino.
const NETWORK_CODES = new Set(["ECONNRESET", "ECONNREFUSED", "ECONNABORTED", "ETIMEDOUT", "EPIPE", "ENOTFOUND", "EAI_AGAIN",
  "EHOSTUNREACH", "ENETUNREACH", "UND_ERR_SOCKET", "UND_ERR_CLOSED", "UND_ERR_ABORTED", "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT", "UND_ERR_BODY_TIMEOUT", "UND_ERR_INFO", "UND_ERR_RES_CONTENT_LENGTH_MISMATCH"]);
const STORE_RESOURCES = new Set(["facets", "products", "product"]);

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function codeFilename(value: unknown): string | undefined {
  if (typeof value !== "string") return;
  try {
    const url = new URL(value);
    if (["teamcelular.com", "www.teamcelular.com"].includes(url.hostname)
      && url.protocol === "https:" && /^\/_next\/static\/[\w./()[\]-]+\.m?js$/.test(url.pathname)) {
      return `${url.origin}${url.pathname}`;
    }
  } catch { /* Las trazas del servidor usan rutas de archivos. */ }
  const compiled = value.replaceAll("\\", "/").match(/(?:^|\/)\.next\/server\/([\w./()[\]@-]+\.js)$/);
  return compiled ? `.next/server/${compiled[1]}` : undefined;
}

// ponytail: conservar ubicaciones de código, nunca mensajes libres, variables ni contexto de la solicitud.
export function sanitizePostHogException(properties: Record<string, unknown>, runtime: "browser" | "server" = "browser", error?: unknown): Record<string, unknown> | null {
  if (!Array.isArray(properties.$exception_list) || !properties.$exception_list.length) return null;
  const status = runtime === "server" ? record(error).status : undefined;
  const httpStatus = Number.isSafeInteger(status) && Number(status) >= 400 && Number(status) <= 599 ? Number(status) : undefined;
  const message = `Error de la aplicación (${runtime === "server" ? "servidor" : "navegador"}${httpStatus ? `, HTTP ${httpStatus}` : ""})`;
  const exceptions = properties.$exception_list.slice(0, 5).map(value => {
    const exception = record(value);
    const mechanism = record(exception.mechanism);
    const stacktrace = record(exception.stacktrace);
    const frames = (Array.isArray(stacktrace.frames) ? stacktrace.frames : []).slice(-40).flatMap(value => {
      const frame = record(value);
      const filename = codeFilename(frame.filename);
      if (!filename) return [];
      return [{ filename, in_app: true, function: "<redacted>", module: "application",
        platform: frame.platform === "node:javascript" || frame.platform === "web:javascript"
          ? frame.platform : filename.startsWith(".next/server/") ? "node:javascript" : "web:javascript",
        ...(Number.isSafeInteger(frame.lineno) && Number(frame.lineno) >= 0 ? { lineno: frame.lineno } : {}),
        ...(Number.isSafeInteger(frame.colno) && Number(frame.colno) >= 0 ? { colno: frame.colno } : {}),
      }];
    });
    return {
      type: typeof exception.type === "string" && ERROR_TYPES.has(exception.type) ? exception.type : "Error",
      value: message,
      ...(typeof mechanism.handled === "boolean"
        ? { mechanism: { type: "generic", handled: mechanism.handled,
          ...(typeof mechanism.synthetic === "boolean" ? { synthetic: mechanism.synthetic } : {}),
          ...(Number.isSafeInteger(mechanism.exception_id) && Number(mechanism.exception_id) >= 0
            ? { exception_id: mechanism.exception_id } : {}),
        } } : {}),
      ...(frames.length ? { stacktrace: { type: "raw", frames } } : {}),
    };
  });
  return { $exception_list: exceptions, $exception_type: exceptions[0].type,
    $exception_message: message, $exception_level: "error", error_runtime: runtime,
    ...(httpStatus ? { http_status: httpStatus } : {}),
    ...(runtime === "server" ? serverCause(error) : {}),
  };
}

// Causa del error de servidor en valores cerrados: código del backend, código de red y recurso, sin texto libre.
function serverCause(error: unknown): Record<string, string> {
  const value = record(error);
  const code = value.name === "StoreApiError" && typeof value.code === "string" ? value.code.toUpperCase() : undefined;
  const network = record(value.cause).code;
  return {
    ...(code && /^[A-Z][A-Z0-9_]{0,63}$/.test(code) ? { store_error_code: code } : {}),
    ...(typeof network === "string" && NETWORK_CODES.has(network) ? { network_error_code: network } : {}),
    ...(typeof value.storeResource === "string" && STORE_RESOURCES.has(value.storeResource)
      ? { store_resource: value.storeResource } : {}),
  };
}

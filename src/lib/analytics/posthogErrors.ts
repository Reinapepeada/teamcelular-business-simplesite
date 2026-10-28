const ERROR_TYPES = new Set(["Error", "TypeError", "ReferenceError", "RangeError", "SyntaxError", "URIError", "EvalError", "AggregateError"]);

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
export function sanitizePostHogException(properties: Record<string, unknown>): Record<string, unknown> | null {
  if (!Array.isArray(properties.$exception_list) || !properties.$exception_list.length) return null;
  const exceptions = properties.$exception_list.slice(0, 5).map(value => {
    const exception = record(value);
    const mechanism = record(exception.mechanism);
    const stacktrace = record(exception.stacktrace);
    const frames = (Array.isArray(stacktrace.frames) ? stacktrace.frames : []).slice(-40).flatMap(value => {
      const frame = record(value);
      const filename = codeFilename(frame.filename);
      if (!filename) return [];
      return [{ filename, in_app: true,
        platform: frame.platform === "node:javascript" || frame.platform === "web:javascript"
          ? frame.platform : filename.startsWith(".next/server/") ? "node:javascript" : "web:javascript",
        ...(Number.isSafeInteger(frame.lineno) && Number(frame.lineno) >= 0 ? { lineno: frame.lineno } : {}),
        ...(Number.isSafeInteger(frame.colno) && Number(frame.colno) >= 0 ? { colno: frame.colno } : {}),
      }];
    });
    return {
      type: typeof exception.type === "string" && ERROR_TYPES.has(exception.type) ? exception.type : "Error",
      value: "Error de la aplicación",
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
    $exception_message: "Error de la aplicación", $exception_level: "error" };
}

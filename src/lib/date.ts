export const ARGENTINA_TIME_ZONE = "America/Argentina/Buenos_Aires";

function normalizeArgentinaDateInput(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return trimmed;
  }

  const compactFraction = trimmed.replace(/(\.\d{3})\d+/, "$1");

  if (/[zZ]$/.test(compactFraction) || /[+-]\d{2}:\d{2}$/.test(compactFraction)) {
    return compactFraction;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(compactFraction)) {
    return `${compactFraction}T00:00:00-03:00`;
  }

  return `${compactFraction}-03:00`;
}

export function parseArgentinaDate(value: string): Date {
  return new Date(normalizeArgentinaDateInput(value));
}

export function formatArgentinaDateTime(value: string): string {
  const date = parseArgentinaDate(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("es-AR", {
    timeZone: ARGENTINA_TIME_ZONE,
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatArgentinaDate(value: string, options: Intl.DateTimeFormatOptions = {}): string {
  const date = parseArgentinaDate(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("es-AR", {
    timeZone: ARGENTINA_TIME_ZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  });
}

export function formatArgentinaDateShort(value: string): string {
  const date = parseArgentinaDate(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("es-AR", {
    timeZone: ARGENTINA_TIME_ZONE,
    day: "2-digit",
    month: "short",
  });
}

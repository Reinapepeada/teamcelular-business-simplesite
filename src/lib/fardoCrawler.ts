import type { NextFetchEvent, NextRequest } from "next/server";
import { AI_FILES, AI_PAGES } from "@/lib/aiVisibility";

const SOURCE_ID = "9edf4cc5-d982-42b3-b85e-7cdf3002804d";
const INGEST = "https://api.platform-fardo.com/api/crawler-events";
const PUBLIC_PATHS = new Set<string>([...AI_PAGES, ...AI_FILES].map(([path]) => path));
const BOTS = /(?:^|[\s;(])(GPTBot|OAI-SearchBot|ChatGPT-User|PerplexityBot|ClaudeBot|Claude-SearchBot|Claude-User|anthropic-ai|Google-Extended|CCBot)(?=[/\s;)]|$)/i;
const KNOWN_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai", "Google-Extended", "CCBot"];

export function fardoCrawlerPayload(url: URL, method: string, userAgent: string) {
  if (!['GET', 'HEAD'].includes(method) || !["teamcelular.com", "www.teamcelular.com"].includes(url.hostname)) return null;
  const path = url.pathname.replace(/\/$/, "") || "/";
  if (!PUBLIC_PATHS.has(path)) return null;
  const match = userAgent.match(BOTS)?.[1];
  const bot = KNOWN_BOTS.find((name) => name.toLowerCase() === match?.toLowerCase());
  if (!bot) return null;
  // Sólo rutas públicas conocidas. Sin query, IP, referrer ni user-agent crudo.
  return {
    event_id: crypto.randomUUID(), occurred_at: new Date().toISOString(),
    host: url.hostname, path, bot_name: bot, user_agent: bot, status_code: null,
  };
}

export async function signFardoEvent(secret: string, message: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function collectFardoBot(request: NextRequest, event?: Pick<NextFetchEvent, "waitUntil">) {
  const secret = process.env.FARDO_CRAWLER_SECRET;
  if (!secret || !event) return;
  const payload = fardoCrawlerPayload(new URL(request.url), request.method, request.headers.get("user-agent") || "");
  if (!payload) return;
  const body = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  event.waitUntil(signFardoEvent(secret, `${timestamp}.${body}`).then(async (signature) => {
    const response = await fetch(INGEST, {
      method: "POST", body, signal: AbortSignal.timeout(2000),
      headers: {
        "Content-Type": "application/json", "X-Fardo-Source-Id": SOURCE_ID,
        "X-Fardo-Timestamp": timestamp, "X-Fardo-Signature": signature,
      },
    });
    if (!response.ok) console.warn(`[fardo] Ingest rechazado: HTTP ${response.status}`);
    await response.body?.cancel();
  }).catch(() => console.warn("[fardo] No se pudo reportar una visita de bot")));
}

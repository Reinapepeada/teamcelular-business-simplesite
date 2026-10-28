import posthog from "posthog-js";
import { isPostHogPublicPage, sanitizePostHogEvent } from "@/lib/analytics/posthog";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (token && host && isPostHogPublicPage(window.location.hostname, window.location.pathname)) {
  posthog.init(token, {
    api_host: host,
    defaults: "2026-08-30",
    capture_pageview: "history_change",
    capture_pageleave: false,
    autocapture: false,
    capture_dead_clicks: false,
    rageclick: false,
    capture_exceptions: false,
    capture_performance: false,
    capture_heatmaps: false,
    advanced_disable_flags: true,
    disable_session_recording: true,
    disable_surveys: true,
    disable_external_dependency_loading: true,
    logs: { captureConsoleLogs: false },
    person_profiles: "never",
    ip: false,
    save_campaign_params: false,
    save_referrer: false,
    respect_dnt: true,
    before_send: sanitizePostHogEvent,
  });
  window.posthog = posthog;
}

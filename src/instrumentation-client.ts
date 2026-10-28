import posthog from "posthog-js";
import { isPostHogPublicPage, measure, sanitizePostHogEvent } from "@/lib/analytics/posthog";
import { isPerformanceDependencyUrl } from "@/lib/analytics/measurement";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (isPostHogPublicPage(window.location.hostname, window.location.pathname)) window.tcMeasure = measure;

if (token && host && isPostHogPublicPage(window.location.hostname, window.location.pathname)) {
  posthog.init(token, {
    api_host: host,
    defaults: "2026-08-30",
    capture_pageview: "history_change",
    capture_pageleave: false,
    autocapture: false,
    capture_dead_clicks: false,
    rageclick: false,
    capture_exceptions: { capture_unhandled_errors: true, capture_unhandled_rejections: true, capture_console_errors: false },
    capture_performance: { web_vitals: true, network_timing: false },
    capture_heatmaps: false,
    advanced_disable_flags: true,
    disable_session_recording: true,
    disable_surveys: true,
    disable_external_dependency_loading: false,
    prepare_external_dependency_script: script => {
      if (isPerformanceDependencyUrl(script.src)) return script;
      const url = new URL(script.src);
      return url.protocol === "https:" && url.hostname.endsWith(".posthog.com")
        && /\/exception-autocapture\.js$/.test(url.pathname) ? script : null;
    },

    logs: { captureConsoleLogs: false },
    person_profiles: "never",
    save_campaign_params: false,
    save_referrer: false,
    respect_dnt: true,
    before_send: sanitizePostHogEvent,
  });
  window.posthog = posthog;
}

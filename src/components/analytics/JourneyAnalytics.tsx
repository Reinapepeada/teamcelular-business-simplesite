"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isPostHogPublicPage, measure } from "@/lib/analytics/posthog";

export default function JourneyAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    if (!isPostHogPublicPage(window.location.hostname, pathname) || pathname.startsWith("/checkout")
      || navigator.doNotTrack === "1") return;
    let activeSince = document.visibilityState === "hidden" ? 0 : performance.now();
    let activeMs = 0;
    let maxScroll = 0;
    let errorSeen = false;
    const sample = () => {
      const height = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      maxScroll = Math.max(maxScroll, Math.min(100, Math.round(window.scrollY / height * 100)));
    };
    const pause = () => {
      if (activeSince) activeMs += performance.now() - activeSince;
      activeSince = 0;
    };
    const visibility = () => {
      if (document.visibilityState === "hidden") { pause(); report(); }
      else activeSince = performance.now();
    };
    const report = () => {
      sample(); pause();
      if (activeMs < 1000) return;
      measure("page_engagement", { engaged_seconds: Math.round(activeMs / 1000),
        percent_scrolled: Math.floor(maxScroll / 25) * 25, content_path: pathname });
      activeMs = 0;
    };
    const viewed = new Set<string>();
    const timers = new Map<Element, ReturnType<typeof setTimeout>>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        clearTimeout(timers.get(entry.target));
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue;
        const element = entry.target as HTMLElement;
        const name = element.dataset.ctaName;
        const location = element.dataset.ctaLocation || "body";
        const key = `${name}:${location}`;
        if (!name || viewed.has(key)) continue;
        timers.set(element, setTimeout(() => {
          if (!element.isConnected || document.visibilityState === "hidden" || viewed.has(key)) return;
          viewed.add(key);
          measure("cta_view", { cta_name: name, cta_location: location, cta_variant: element.dataset.ctaVariant || "other" });
        }, 1000));
      }
    }, { threshold: [0, 0.5] });
    const observe = (root: ParentNode) => root.querySelectorAll("[data-cta-name]").forEach(node => observer.observe(node));
    observe(document);
    const mutations = new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) if (node instanceof HTMLElement) {
        if (node.matches("[data-cta-name]")) observer.observe(node);
        observe(node);
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    const click = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      const product = element?.closest<HTMLAnchorElement>("a[data-product-slug]");
      if (product) { measure("select_item", { item_id: product.dataset.productSlug, item_list_id: "catalog" }); return; }
      const link = element?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.dataset.analyticsTracked === "true") return;
      const location = link.closest("[data-cta-location]")?.getAttribute("data-cta-location")
        || (link.closest("nav") ? "nav" : link.closest("footer") ? "footer" : "body");
      if (link.protocol === "tel:") measure("phone_click", { cta_variant: "phone", cta_location: location });
      else if (link.protocol === "mailto:") measure("email_click", { cta_variant: "email", cta_location: location });
      else if (/maps\.app\.goo\.gl|share\.google\/|google\.[^/]+\/maps/.test(link.href)) measure("directions_click", { cta_location: location });
      else if (link.origin === window.location.origin && link.closest("nav")) measure("navigation_click", { cta_name: new URL(link.href).pathname, cta_location: location });
    };
    const toggle = (event: Event) => {
      const details = event.target;
      if (details instanceof HTMLDetailsElement && details.open && details.dataset.faqIndex) {
        measure("faq_open", { faq_index: Number(details.dataset.faqIndex) });
      }
    };
    const error = (event: ErrorEvent) => {
      // Sólo categoría fija; nunca mensaje, stack, URL ni variables del cliente.
      try {
        if (!errorSeen && event.filename && new URL(event.filename, window.location.origin).origin === window.location.origin) {
          errorSeen = true;
          measure("client_error", { error_code: "uncaught_client_error" });
        }
      } catch { /* Filename inválido: no se envía. */ }
    };
    window.addEventListener("scroll", sample, { passive: true });
    window.addEventListener("pagehide", report);
    window.addEventListener("error", error);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("click", click, true);
    document.addEventListener("toggle", toggle, true);
    return () => {
      report(); observer.disconnect(); mutations.disconnect(); timers.forEach(clearTimeout);
      window.removeEventListener("scroll", sample); window.removeEventListener("pagehide", report);
      window.removeEventListener("error", error); document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("click", click, true); document.removeEventListener("toggle", toggle, true);
    };
  }, [pathname]);
  return null;
}

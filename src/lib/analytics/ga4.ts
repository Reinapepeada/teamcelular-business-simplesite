import { BRANCHES } from "@/lib/businessProfile";

const PRODUCTION_HOSTS = ["teamcelular.com", "www.teamcelular.com"];
const MEASUREMENT_ID = "G-1S64KMRF99";

export function isGa4ProductionHost(hostname: string): boolean {
  return PRODUCTION_HOSTS.includes(hostname);
}

// ponytail: el hostname distingue producción de `next start` local y previews.
export const GA4_INIT_SCRIPT = `if (${JSON.stringify(PRODUCTION_HOSTS)}.includes(location.hostname)) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  var ga4Script = document.createElement('script');
  ga4Script.async = true;
  ga4Script.src = 'https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}';
  document.head.appendChild(ga4Script);
  window.gtag('js', new Date());
  window.gtag('config', '${MEASUREMENT_ID}');
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href*="wa.me/"]');
    if (!a || a.getAttribute('data-whatsapp-tracked') === 'true') return;
    var tagged = a.closest('[data-cta-location]');
    var zone = tagged ? tagged.getAttribute('data-cta-location')
      : a.closest('.tc-sticky-cta') ? 'sticky'
      : a.closest('nav') ? 'nav'
      : a.closest('header') ? 'hero'
      : a.closest('footer') ? 'footer'
      : 'body';
    var branches = ${JSON.stringify(BRANCHES.map((branch) => ({ slug: branch.slug, phone: new URL(branch.whatsapp).pathname })))};
    var branch = branches.find(function (item) { return item.phone === new URL(a.href).pathname; });
    window.gtag('event', 'whatsapp_click', {
      link_url: a.href, page_path: location.pathname, cta_location: zone,
      preferred_branch: branch ? branch.slug : undefined
    });
  }, true);
}`;

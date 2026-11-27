import { BRANCHES } from "@/lib/businessProfile";

const PRODUCTION_HOSTS = ["teamcelular.com", "www.teamcelular.com"];
const MEASUREMENT_ID = "G-1S64KMRF99";

export function isGa4ProductionHost(hostname: string): boolean {
  return PRODUCTION_HOSTS.includes(hostname);
}

// ponytail: el hostname distingue producción de `next start` local y previews.
// gtag.js pesa cerca de 190 KB y corre tareas largas que suben el INP: se pide con
// la página cargada y el hilo libre. dataLayer guarda el page view y los eventos
// hasta entonces. Un clic, redirección, envío o compra lo pide en el acto, porque
// después de esos eventos la persona suele salir de la página.
export const GA4_INIT_SCRIPT = `if (${JSON.stringify(PRODUCTION_HOSTS)}.includes(location.hostname)) {
  window.dataLayer = window.dataLayer || [];
  var ga4Requested = false;
  var loadGa4 = function () {
    if (ga4Requested) return;
    ga4Requested = true;
    var ga4Script = document.createElement('script');
    ga4Script.async = true;
    ga4Script.src = 'https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}';
    document.head.appendChild(ga4Script);
  };
  window.gtag = function () {
    window.dataLayer.push(arguments);
    if (arguments[0] === 'event' && /click|redirect|submit|purchase|checkout/.test(arguments[1])) loadGa4();
  };
  var loadGa4WhenIdle = function () {
    if (window.requestIdleCallback) window.requestIdleCallback(loadGa4, { timeout: 2000 });
    else window.setTimeout(loadGa4, 1);
  };
  if (document.readyState === 'complete') loadGa4WhenIdle();
  else window.addEventListener('load', loadGa4WhenIdle, { once: true });
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
    var parameters = {
      cta_variant: 'whatsapp', cta_location: zone, conversion_kind: 'whatsapp_handoff',
      preferred_branch: branch ? branch.slug : undefined
    };
    if (window.tcMeasure) window.tcMeasure('whatsapp_click', parameters);
    else window.gtag('event', 'whatsapp_click', parameters);
  }, true);
}`;

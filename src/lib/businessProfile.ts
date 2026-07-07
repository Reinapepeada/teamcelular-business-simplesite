import { getSiteUrl } from "@/lib/seoMetadata";

export const SITE_URL = getSiteUrl();

export const BUSINESS_PROFILE = {
  name: "Team Celular",
  phone: "+54 11 5103-4595",
  whatsapp: "https://wa.me/5491151034595",
  email: "teamcelular.arg@gmail.com",
  primaryAddress: {
    street: "Paraguay 2451",
    locality: "Ciudad Autonoma de Buenos Aires",
    region: "CABA",
    postalCode: "C1121",
    country: "AR",
    neighborhood: "Recoleta",
    latitude: -34.597528,
    longitude: -58.403048,
    mapUrl: "https://maps.app.goo.gl/krFJfjDA4CuR83BK9",
  },
  secondaryAddress: {
    street: "Amenabar 2032",
    locality: "Ciudad Autonoma de Buenos Aires",
    region: "CABA",
    country: "AR",
    neighborhood: "Belgrano",
  },
  hours: {
    text: "Lunes a viernes de 10:30 a 18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:30",
    closes: "18:00",
  },
  warrantyDays: 90,
  responseWindow: "hasta 2 horas habiles por WhatsApp",
  reviewCostRange: "ARS 15.000 a ARS 25.000",
  sameAs: [
    "https://www.instagram.com/teamcelular.arg/",
    "https://www.facebook.com/TeamCelular/",
    "https://www.linkedin.com/company/teamcelular/",
    "https://maps.app.goo.gl/krFJfjDA4CuR83BK9",
    "https://wa.me/5491151034595",
  ],
  knowsAbout: [
    "Reparacion de celulares",
    "Servicio tecnico iPhone",
    "Servicio tecnico Samsung",
    "Cambio de pantalla",
    "Cambio de bateria",
    "Cambio de pin de carga",
    "Microelectronica de celulares",
    "Reballing BGA",
    "Recuperacion de celulares mojados",
    "Diagnostico de placa logica",
    "Venta de repuestos y accesorios para celulares",
  ],
  serviceAreas: [
    "CABA",
    "Recoleta",
    "Belgrano",
    "Palermo",
    "Caballito",
    "Almagro",
    "Balvanera",
    "Microcentro",
    "Buenos Aires",
  ],
  technicalReviewer: {
    name: "Equipo tecnico de Team Celular",
    description:
      "Tecnicos de laboratorio especializados en diagnostico de celulares, microelectronica, cambio de modulos y recuperacion por liquido.",
  },
} as const;

export const BRANCHES = [
  {
    slug: "recoleta",
    name: "Team Celular - Sucursal Recoleta",
    shortName: "Recoleta",
    url: "/sucursales/caba/recoleta",
    street: "Paraguay 2451",
    locality: "Ciudad Autonoma de Buenos Aires",
    region: "CABA",
    postalCode: "C1121",
    country: "AR",
    neighborhood: "Recoleta",
    latitude: -34.597528,
    longitude: -58.403048,
    mapUrl: "https://maps.app.goo.gl/krFJfjDA4CuR83BK9",
    phone: BUSINESS_PROFILE.phone,
    whatsapp: BUSINESS_PROFILE.whatsapp,
    whatsappText: "Hola Team Celular, quiero consultar con la sucursal Recoleta. Marca y modelo:",
  },
  {
    slug: "belgrano",
    name: "Team Celular - Sucursal Belgrano",
    shortName: "Belgrano",
    url: "/sucursales/caba/belgrano",
    street: "Amenabar 2032",
    locality: "Ciudad Autonoma de Buenos Aires",
    region: "CABA",
    postalCode: "C1428",
    country: "AR",
    neighborhood: "Belgrano",
    latitude: -34.5638065,
    longitude: -58.4579996,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Amenabar%202032%20Belgrano%20CABA",
    phone: "+54 11 3173-9099",
    whatsapp: "https://wa.me/5491131739099",
    whatsappText: "Hola Team Celular, quiero consultar con la sucursal Belgrano. Marca y modelo:",
  },
] as const;

export const DEFAULT_WHATSAPP_TEXT =
  "Hola Team Celular, quiero reparar mi equipo. Marca y modelo: Falla: Me pasan presupuesto y proximos pasos?";

export function whatsappUrl(text = DEFAULT_WHATSAPP_TEXT, baseUrl: string = BUSINESS_PROFILE.whatsapp) {
  return `${baseUrl}?text=${encodeURIComponent(text)}`;
}

export function getBranch(slug: (typeof BRANCHES)[number]["slug"]) {
  return BRANCHES.find((branch) => branch.slug === slug) ?? BRANCHES[0];
}

export function businessId(fragment = "localbusiness") {
  return `${SITE_URL}#${fragment}`;
}

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  if (pathOrUrl === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}/${pathOrUrl.replace(/^\/+/, "")}`;
}

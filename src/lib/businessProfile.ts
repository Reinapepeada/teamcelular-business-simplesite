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
    street: "Amenabar 2030",
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

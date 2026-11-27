import type { BrandWorkshop } from "@/components/seo/BrandWorkshopNotes";

/**
 * Cifras de órdenes propias para el bloque "Desde el taller" y la home.
 *
 * Fuente: Fixbee, órdenes de celulares de Team Celular creadas en los 12 meses
 * previos al 25/11/2026 (consulta del 27/11/2026). "Recibidos" cuenta órdenes;
 * cada reparación cuenta servicios cerrados, sin pegados ni recolocaciones.
 * "El mismo día" compara la fecha de ingreso con la de cierre de la orden
 * finalizada, en hora de Buenos Aires: mide la entrega, no las horas de banco.
 */
export const WORKSHOP_PERIOD = "en los 12 meses previos al 25 de noviembre de 2026";

const QUOTE_TIMING = "Te confirmamos el plazo al cotizar, según el diagnóstico y el repuesto disponible.";

export const SAME_DAY_FAQ = {
  question: "¿Reparan el celular en el momento?",
  answer: `Depende de la reparación y del repuesto. Team Celular entregó el mismo día 59 de 83 arreglos de pin de carga, 59 de 113 cambios de batería y 100 de 235 cambios de pantalla ${WORKSHOP_PERIOD}. ${QUOTE_TIMING}`,
};

export const BRAND_WORKSHOPS = {
  samsung: {
    period: WORKSHOP_PERIOD,
    stats: [
      { value: "392", label: "Samsung recibidos" },
      { value: "90", label: "cambios de pantalla" },
      { value: "48", label: "arreglos de pin de carga" },
    ],
    intro:
      "Samsung es la marca que más entra a nuestros talleres de Recoleta y Belgrano. El arreglo que más hacemos es el cambio de pantalla; después viene el pin de carga.",
    notes: [
      {
        title: "El pin de carga casi siempre sale en el día",
        description: "37 de los 48 arreglos de pin de carga de Samsung se entregaron el mismo día en que entró el equipo.",
      },
      {
        title: "Con la pantalla, preguntá el plazo antes",
        description: `36 de los 90 cambios de pantalla se entregaron el mismo día; el resto llevó más tiempo. ${QUOTE_TIMING}`,
      },
      {
        title: "Batería: seis de cada diez, el mismo día",
        description: "19 de los 32 cambios de batería de Samsung con orden finalizada se entregaron el día en que entraron.",
      },
    ],
  },
  iphone: {
    period: WORKSHOP_PERIOD,
    stats: [
      { value: "167", label: "iPhone recibidos" },
      { value: "46", label: "cambios de pantalla" },
      { value: "35", label: "cambios de batería" },
    ],
    intro:
      "En iPhone, el arreglo que más hacemos en Recoleta y Belgrano es el cambio de pantalla; después viene la batería.",
    notes: [
      {
        title: "Pantalla y batería: la mitad sale en el día",
        description: `24 de los 46 cambios de pantalla y 19 de los 35 cambios de batería de iPhone se entregaron el mismo día en que entró el equipo. ${QUOTE_TIMING}`,
      },
      {
        title: "El pin de carga es el arreglo más rápido",
        description: "10 de los 11 arreglos de pin de carga de iPhone se entregaron el mismo día.",
      },
    ],
  },
  motorola: {
    period: WORKSHOP_PERIOD,
    stats: [
      { value: "141", label: "Motorola recibidos" },
      { value: "43", label: "cambios de pantalla" },
      { value: "11", label: "cambios de batería" },
    ],
    intro: "En Motorola, el arreglo que más hacemos en Recoleta y Belgrano es el cambio de pantalla.",
    notes: [
      {
        title: "Más de un tercio de las pantallas sale en el día",
        description: `16 de los 43 cambios de pantalla de Motorola se entregaron el mismo día en que entró el equipo. ${QUOTE_TIMING}`,
      },
      {
        title: "La batería rara vez sale en el día",
        description: "3 de los 11 cambios de batería de Motorola se entregaron el mismo día; el resto llevó más tiempo.",
      },
    ],
  },
  xiaomi: {
    period: WORKSHOP_PERIOD,
    stats: [
      { value: "109", label: "Xiaomi, Redmi y POCO recibidos" },
      { value: "22", label: "cambios de pantalla" },
      { value: "18", label: "cambios de batería" },
    ],
    intro:
      "En Xiaomi, Redmi y POCO, el arreglo que más hacemos en Recoleta y Belgrano es el cambio de pantalla; después viene la batería.",
    notes: [
      {
        title: "La batería sale en el día más de la mitad de las veces",
        description: "Seis de cada diez cambios de batería de Xiaomi, Redmi y POCO se entregaron el mismo día en que entró el equipo.",
      },
      {
        title: "Con la pantalla, preguntá el plazo antes",
        description: `9 de los 22 cambios de pantalla se entregaron el mismo día; el resto llevó más tiempo. ${QUOTE_TIMING}`,
      },
    ],
  },
} satisfies Record<string, BrandWorkshop>;

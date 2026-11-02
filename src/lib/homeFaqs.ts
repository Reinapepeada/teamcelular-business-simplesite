import { BUDGET_RESPONSE_MESSAGE, REVIEW_COST_MESSAGE, SCREEN_BATTERY_TIMING_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import { PLACA_REVISION_PRICE, formatArsPrice } from "@/lib/repairPrices";

// Una sola fuente para el contenido visible de la home y la ficha para IA.
export const HOME_FAQS = [
    {
        question: "¿Tienen servicio técnico de celulares cerca?",
        answer: "Team Celular tiene dos talleres en CABA: Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano). El tiempo de viaje depende de tu punto de partida, el transporte y el tránsito. Consultá el recorrido en el mapa de cada sucursal antes de salir.",
    },
    {
        question: "¿Dónde arreglar el celular en CABA?",
        answer: "Podés acercarte a cualquiera de las dos sucursales de lunes a viernes de 10:30 a 18:00, sin turno. Te informamos el costo de la revisión antes de ingresar el equipo y el presupuesto antes de repararlo.",
    },
    {
        question: "¿Qué marcas reparan?",
        answer: "Trabajamos con iPhone, Samsung, Motorola, Xiaomi y la mayoría de las marcas actuales. Si tu modelo es poco común, consultanos disponibilidad antes de acercarte.",
    },
    {
        question: "¿Hacen retiro dentro de CABA?",
        answer: "Sí, con moto, de lunes a viernes. Cuesta ARS 15.000 y el horario depende del barrio: escribinos y lo coordinamos.",
    },
    { question: "¿Cuánto tarda un presupuesto?", answer: BUDGET_RESPONSE_MESSAGE },
    {
        question: "¿La revisión técnica tiene costo?",
        answer: `${REVIEW_COST_MESSAGE} La revisión de placa cuesta ${formatArsPrice(PLACA_REVISION_PRICE)} y se descuenta si se repara. Te informamos el costo antes de ingresar el equipo.`,
    },
    { question: "¿Cuánto tarda un cambio de pantalla o batería?", answer: SCREEN_BATTERY_TIMING_MESSAGE },
    { question: "¿Qué cubre la garantía?", answer: WARRANTY_SCOPE_MESSAGE },
];

// Casos aportados por el titular del laboratorio el 16/11/2026, con fotos y
// video propios. La fecha es la de documentación, no la de la reparación.
// Solo se afirma lo que el titular contó o lo que se ve en las fotos.
export const EDGE_50_ULTRA_CASE = {
  path: "/guias/caso-motorola-edge-50-ultra-cambio-pantalla",
  label: "Caso de Motorola Edge 50 Ultra",
  title: "Motorola Edge 50 Ultra: cambio de pantalla original, paso a paso",
  description:
    "Caso real de Team Celular: cambio de pantalla original en un Motorola Edge 50 Ultra, con fotos del desarme y las pruebas de color y táctil antes de entregarlo.",
  summary:
    "Team Celular, en CABA, cambió la pantalla rota de un Motorola Edge 50 Ultra por un módulo original. El trabajo se hizo desde la tapa trasera y, antes de entregarlo, el laboratorio probó color, luz de fondo y táctil con el equipo encendido.",
  outcome:
    "El equipo encendió con el módulo nuevo y la prueba de hardware del propio teléfono marcó en verde pantalla, luz de fondo y pantalla táctil.",
  publishedTime: "2026-11-16T15:00:00Z",
} as const;

export const GALAXY_A50_SPEAKER_CASE = {
  path: "/guias/caso-samsung-a50-parlante-distorsion",
  label: "Caso de Samsung Galaxy A50",
  title: "Samsung Galaxy A50: parlante con distorsión que se resolvió sin cambiarlo",
  description:
    "Caso real de Team Celular: un Samsung Galaxy A50 con el parlante distorsionado. La falla era de fijación al marco, no del parlante.",
  summary:
    "Un Samsung Galaxy A50 llegó a Team Celular, en CABA, con el parlante distorsionando. Al abrirlo, el laboratorio encontró que el parlante no estaba bien fijado al marco. Se fijó correctamente y la distorsión desapareció.",
  outcome: "La distorsión se resolvió fijando bien el parlante al marco del equipo.",
  publishedTime: "2026-11-16T15:00:00Z",
} as const;

export const EXTRA_REPAIR_CASES = [EDGE_50_ULTRA_CASE, GALAXY_A50_SPEAKER_CASE] as const;

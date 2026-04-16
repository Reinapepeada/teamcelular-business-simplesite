export const BUDGET_WIZARD_VERSION = "v1";

export const BUDGET_WIZARD_STEPS = [
  { id: "device", label: "Equipo" },
  { id: "issue", label: "Falla" },
  { id: "urgency", label: "Urgencia" },
  { id: "contact", label: "Contacto" },
] as const;

export type BudgetWizardStepId = (typeof BUDGET_WIZARD_STEPS)[number]["id"];

export const BUDGET_FUNNEL_FORM_NAME = "repair_budget_wizard";
export const BUDGET_FUNNEL_FORM_LOCATION = "presupuesto_reparacion";
export const BUDGET_FUNNEL_NAME = "repair_budget_funnel";

export const BUDGET_FUNNEL_EVENTS = {
  wizardViewed: "budget_wizard_view",
  stepViewed: "budget_wizard_step_view",
  stepCompleted: "budget_wizard_step_complete",
  stepBack: "budget_wizard_step_back",
  abandoned: "budget_wizard_abandon",
  submit: "lead_form_submit",
  redirect: "lead_whatsapp_redirect",
} as const;

export const BUDGET_FUNNEL_EVENT_MAP = {
  budget_wizard_view: {
    goal: "Entrada al formulario",
    requiredFields: ["form_name", "form_location", "form_version"],
  },
  budget_wizard_step_view: {
    goal: "Visualizacion de paso",
    requiredFields: ["step_index", "step_id", "step_label", "total_steps"],
  },
  budget_wizard_step_complete: {
    goal: "Paso completado",
    requiredFields: ["step_index", "step_id", "step_label", "total_steps"],
  },
  budget_wizard_step_back: {
    goal: "Retroceso entre pasos",
    requiredFields: ["step_index", "step_id", "step_label", "total_steps"],
  },
  budget_wizard_abandon: {
    goal: "Abandono del wizard",
    requiredFields: ["step_index", "step_id", "step_label", "total_steps"],
  },
  lead_form_submit: {
    goal: "Envio del formulario",
    requiredFields: ["lead_channel", "repair_type", "urgency", "contact_channel"],
  },
  lead_whatsapp_redirect: {
    goal: "Salida a WhatsApp",
    requiredFields: ["lead_channel", "repair_type", "urgency", "contact_channel"],
  },
} as const;

export function getBudgetWizardStep(stepIndex: number) {
  if (stepIndex < 0) {
    return BUDGET_WIZARD_STEPS[0];
  }

  if (stepIndex >= BUDGET_WIZARD_STEPS.length) {
    return BUDGET_WIZARD_STEPS[BUDGET_WIZARD_STEPS.length - 1];
  }

  return BUDGET_WIZARD_STEPS[stepIndex];
}

interface BuildBudgetFunnelPayloadInput {
  stepIndex?: number;
  stepId?: BudgetWizardStepId;
  extra?: Record<string, string | number | boolean | null | undefined>;
}

export function buildBudgetFunnelPayload({
  stepIndex = 0,
  stepId,
  extra = {},
}: BuildBudgetFunnelPayloadInput) {
  const step = stepId
    ? BUDGET_WIZARD_STEPS.find((item) => item.id === stepId) || getBudgetWizardStep(stepIndex)
    : getBudgetWizardStep(stepIndex);

  return {
    funnel_name: BUDGET_FUNNEL_NAME,
    form_name: BUDGET_FUNNEL_FORM_NAME,
    form_location: BUDGET_FUNNEL_FORM_LOCATION,
    form_version: BUDGET_WIZARD_VERSION,
    step_index: BUDGET_WIZARD_STEPS.findIndex((item) => item.id === step.id) + 1,
    step_id: step.id,
    step_label: step.label,
    total_steps: BUDGET_WIZARD_STEPS.length,
    ...extra,
  };
}

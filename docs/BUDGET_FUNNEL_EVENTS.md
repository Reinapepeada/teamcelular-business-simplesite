# Budget Funnel Events

## Objetivo
Documentar el mapa de eventos del wizard de presupuesto para medir:
- inicio del flujo
- avance por pasos
- abandono
- envio y redireccion a WhatsApp

## Alcance
- Formulario: presupuesto de reparacion
- Ubicacion: /presupuesto-reparacion
- Version: v1

## Pasos del wizard
1. Equipo (`device`)
2. Falla (`issue`)
3. Urgencia (`urgency`)
4. Contacto (`contact`)

## Eventos

| Evento | Cuando dispara | Payload base |
|---|---|---|
| `budget_wizard_view` | Al entrar al wizard | `form_name`, `form_location`, `form_version` |
| `budget_wizard_step_view` | Al mostrar un paso | `step_index`, `step_id`, `step_label`, `total_steps` |
| `budget_wizard_step_complete` | Al completar paso y avanzar | `step_index`, `step_id`, `step_label`, `total_steps` |
| `budget_wizard_step_back` | Al volver al paso anterior | `step_index`, `step_id`, `step_label`, `total_steps` |
| `budget_wizard_abandon` | Al salir sin enviar | `step_index`, `step_id`, `step_label`, `total_steps` |
| `lead_form_submit` | Al enviar formulario | `lead_channel`, `repair_type`, `urgency`, `contact_channel` |
| `lead_whatsapp_redirect` | Al redireccionar a WhatsApp | `lead_channel`, `repair_type`, `urgency`, `contact_channel` |

## Convenciones de payload
- `lead_channel`: `whatsapp_redirect`
- `repair_type`: falla principal seleccionada por el usuario
- `urgency`: `hoy`, `esta_semana`, `sin_urgencia`
- `contact_channel`: `whatsapp`, `llamada`, `email`
- `form_version`: `v1`

## Uso en codigo
El mapa y helpers estan centralizados en:
- `src/lib/analytics/budgetFunnel.ts`

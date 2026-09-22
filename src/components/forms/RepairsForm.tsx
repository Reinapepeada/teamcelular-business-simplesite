"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics/track";
import { lookupQuote, quotableModels } from "@/lib/quoteLookup";
import { formatArsPrice } from "@/lib/repairPrices";
import {
    BUDGET_FUNNEL_EVENTS,
    BUDGET_WIZARD_STEPS,
    BUDGET_WIZARD_VERSION,
    buildBudgetFunnelPayload,
} from "@/lib/analytics/budgetFunnel";
import { recordLeadInteraction } from "@/lib/analytics/leadInteractions";
import { BranchPreferencePicker } from "@/components/cro/BranchSelector";
import {
    branchWhatsappUrl,
    readBranchPreference,
    saveBranchPreference,
    type BranchSelectionMethod,
    type BranchSlug,
} from "@/lib/branchPreference";
import { FaCheckCircle, FaExclamationCircle, FaWhatsapp } from "react-icons/fa";

const repairOptions = [
    "Pantalla",
    "Bateria",
    "Carga",
    "Placa",
    "Boton",
    "Camara",
    "Parlante",
    "Microfono",
    "Software",
    "Otro",
];

// Valores fijos para los eventos de analytics: ya no se preguntan, el
// detalle se completa en la conversacion de WhatsApp.
const DEFAULT_URGENCY = "esta_semana";
const DEFAULT_CONTACT_CHANNEL = "whatsapp";
const UNKNOWN = "sin especificar";

export default function RepairsForm() {
    const [model, setModel] = useState("");
    const [repairTypes, setRepairTypes] = useState<string[]>([]);
    const [preferredBranch, setPreferredBranch] = useState<BranchSlug | "">("");
    const [branchSelectionMethod, setBranchSelectionMethod] = useState<BranchSelectionMethod>("manual");
    const [errorMessage, setErrorMessage] = useState("");
    const [leadAttemptId, setLeadAttemptId] = useState("");

    const repairTypeLabel = repairTypes.join(", ");
    const modelValue = model.trim() || UNKNOWN;
    const brandValue = model.trim().split(/\s+/)[0] || UNKNOWN;

    const startedRef = useRef(false);
    const submittedRef = useRef(false);
    const repairTypeRef = useRef("sin_definir");
    repairTypeRef.current = repairTypeLabel || "sin_definir";

    useEffect(() => {
        const preference = readBranchPreference();
        if (preference) {
            setPreferredBranch(preference.slug);
            setBranchSelectionMethod("remembered");
        }

        setLeadAttemptId(
            typeof window.crypto?.randomUUID === "function"
                ? window.crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        );

        track(
            BUDGET_FUNNEL_EVENTS.wizardViewed,
            buildBudgetFunnelPayload({ extra: { wizard_source: `budget_wizard_${BUDGET_WIZARD_VERSION}` } }),
        );

        return () => {
            if (startedRef.current && !submittedRef.current) {
                track(
                    BUDGET_FUNNEL_EVENTS.abandoned,
                    buildBudgetFunnelPayload({ extra: { repair_type: repairTypeRef.current } }),
                );
            }
        };
    }, []);

    function markStarted() {
        if (startedRef.current) return;
        startedRef.current = true;
        track(BUDGET_FUNNEL_EVENTS.stepViewed, buildBudgetFunnelPayload({}));
    }

    function toggleRepairType(option: string) {
        markStarted();
        setRepairTypes((current) =>
            current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
        );
        setErrorMessage("");
    }

    function selectBranch(slug: BranchSlug, method: BranchSelectionMethod) {
        markStarted();
        setPreferredBranch(slug);
        setBranchSelectionMethod(method);
        saveBranchPreference(slug, method);
        setErrorMessage("");
    }

    function handleSend() {
        if (repairTypes.length === 0) {
            setErrorMessage("Tocá qué le pasa al celular.");
            return;
        }
        if (!preferredBranch) {
            setErrorMessage("Elegí la sucursal que te queda más cerca.");
            return;
        }

        // ponytail: el backend de leads no esta operativo; el mensaje va armado
        // directo a WhatsApp. Si vuelve, recuperar el POST a /api/repair-lead.
        const message = [
            "Hola Team Celular, quiero un presupuesto.",
            `Falla: ${repairTypeLabel}`,
            `Modelo: ${modelValue}`,
        ].join("\n");
        const destination = branchWhatsappUrl(preferredBranch, message);
        const step = BUDGET_WIZARD_STEPS[0];
        submittedRef.current = true;

        track(
            BUDGET_FUNNEL_EVENTS.submit,
            buildBudgetFunnelPayload({
                extra: {
                    lead_channel: "whatsapp_direct",
                    repair_type: repairTypeLabel,
                    urgency: DEFAULT_URGENCY,
                    contact_channel: DEFAULT_CONTACT_CHANNEL,
                    preferred_branch: preferredBranch,
                    branch_selection_method: branchSelectionMethod,
                },
            }),
        );

        recordLeadInteraction({
            eventName: "lead_form_submit",
            ctaName: "budget_wizard_submit",
            ctaLocation: "presupuesto_reparacion_wizard",
            ctaVariant: "whatsapp",
            destination,
            leadAttemptId,
            formName: "repair_budget_wizard",
            formLocation: "presupuesto_reparacion",
            formVersion: BUDGET_WIZARD_VERSION,
            stepIndex: 1,
            stepId: step.id,
            stepLabel: step.label,
            totalSteps: BUDGET_WIZARD_STEPS.length,
            brand: brandValue,
            model: modelValue,
            repairType: repairTypeLabel,
            urgency: DEFAULT_URGENCY,
            contactChannel: DEFAULT_CONTACT_CHANNEL,
            contact: "",
            description: "",
        });

        window.location.assign(destination);
    }

    return (
        <div className="space-y-6">
            <fieldset className="space-y-3">
                <legend className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    ¿Qué le pasa a tu celular?
                </legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {repairOptions.map((option) => {
                        const selected = repairTypes.includes(option);

                        return (
                            <button
                                key={option}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => toggleRepairType(option)}
                                className={`flex min-h-11 items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                                    selected
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                                }`}
                            >
                                <span>{option}</span>
                                {selected ? <FaCheckCircle aria-hidden /> : null}
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            <label className="block space-y-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                <span>
                    ¿Qué modelo es?{" "}
                    <span className="text-sm font-normal text-slate-500 dark:text-slate-400">(si no sabés, dejalo vacío)</span>
                </span>
                <input
                    type="text"
                    value={model}
                    onFocus={markStarted}
                    onChange={(event) => setModel(event.target.value)}
                    list="modelos-con-precio"
                    placeholder="Ej: iPhone 13, Galaxy A54, Moto G54"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
            </label>
            <datalist id="modelos-con-precio">
                {quotableModels().map((name) => (
                    <option key={name} value={name} />
                ))}
            </datalist>

            <QuoteEstimate model={model} repairTypes={repairTypes} />

            <BranchPreferencePicker value={preferredBranch} onChange={selectBranch} />

            {errorMessage ? (
                <p
                    role="alert"
                    className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
                >
                    <FaExclamationCircle aria-hidden />
                    {errorMessage}
                </p>
            ) : null}

            <button
                type="button"
                onClick={handleSend}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-800 sm:w-auto"
            >
                <FaWhatsapp aria-hidden />
                Pedir presupuesto por WhatsApp
            </button>

            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                Te respondemos en hasta 2 horas hábiles. El precio final se confirma antes de tocar el equipo.
            </p>
        </div>
    );
}

/**
 * Precio de referencia antes de ir a WhatsApp. El SERP de "presupuesto" lo
 * ganan cotizadores que devuelven un numero en el momento.
 */
function QuoteEstimate({ model, repairTypes }: { model: string; repairTypes: string[] }) {
    const quote = lookupQuote("", model, repairTypes);
    if (!quote) return null;

    const price =
        quote.precision === "exact"
            ? formatArsPrice(quote.from)
            : `${formatArsPrice(quote.from)} a ${formatArsPrice(quote.to)}`;

    return (
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Precio de referencia</p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{quote.label}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-white">{price}</p>
            <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                {quote.precision === "exact"
                    ? "Sale en 2 a 4 horas, con garantía escrita de 90 días. Puede variar según el estado del equipo."
                    : "Es un rango por gama, no un valor cerrado."}
            </p>
        </div>
    );
}

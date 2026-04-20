"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { track } from "@vercel/analytics";
import {
    BUDGET_FUNNEL_EVENTS,
    BUDGET_WIZARD_STEPS,
    BUDGET_WIZARD_VERSION,
    buildBudgetFunnelPayload,
} from "@/lib/analytics/budgetFunnel";
import {
    FaArrowLeft,
    FaArrowRight,
    FaCheckCircle,
    FaExclamationCircle,
    FaWhatsapp,
} from "react-icons/fa";

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

const urgencyOptions = [
    {
        value: "hoy",
        label: "Lo necesito hoy",
        description: "Priorizamos un primer diagnostico y ventana de atencion rapida.",
    },
    {
        value: "esta_semana",
        label: "Esta semana",
        description: "Coordinamos dentro de una franja de horario flexible.",
    },
    {
        value: "sin_urgencia",
        label: "Sin urgencia",
        description: "Te respondemos con calma y alternativas por costo/beneficio.",
    },
] as const;

const contactChannelOptions = [
    { value: "whatsapp", label: "WhatsApp" },
    { value: "llamada", label: "Llamada" },
    { value: "email", label: "Email" },
] as const;

const PHONE_CONTACT_REGEX = /^[+\d][\d\s()-]{7,19}$/;
const EMAIL_CONTACT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const LAST_STEP_INDEX = BUDGET_WIZARD_STEPS.length - 1;

const contactFieldMeta = {
    whatsapp: {
        label: "WhatsApp de contacto",
        placeholder: "Ej: +54 9 11 1234-5678",
        helper: "Inclui codigo de area para responderte rapido.",
        type: "tel" as const,
        inputMode: "tel" as const,
        autoComplete: "tel",
    },
    llamada: {
        label: "Telefono para llamada",
        placeholder: "Ej: 11 1234-5678",
        helper: "Te llamamos en horario comercial.",
        type: "tel" as const,
        inputMode: "tel" as const,
        autoComplete: "tel",
    },
    email: {
        label: "Email de contacto",
        placeholder: "Ej: nombre@correo.com",
        helper: "Aca te enviamos el diagnostico inicial.",
        type: "email" as const,
        inputMode: "email" as const,
        autoComplete: "email",
    },
} as const;

export default function RepairsForm() {
    const [stepIndex, setStepIndex] = useState(0);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [repairTypes, setRepairTypes] = useState<string[]>([]);
    const [urgency, setUrgency] = useState<(typeof urgencyOptions)[number]["value"]>("esta_semana");
    const [description, setDescription] = useState("");
    const [contactChannel, setContactChannel] = useState<(typeof contactChannelOptions)[number]["value"]>("whatsapp");
    const [contact, setContact] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [leadAttemptId, setLeadAttemptId] = useState("");

    const selectedContactMeta = contactFieldMeta[contactChannel];
    const repairTypeLabel = repairTypes.join(", ");

    const stepRef = useRef(stepIndex);
    const startedRef = useRef(false);
    const submittedRef = useRef(false);

    useEffect(() => {
        if (typeof window !== "undefined" && typeof window.crypto?.randomUUID === "function") {
            setLeadAttemptId(window.crypto.randomUUID());
            return;
        }

        setLeadAttemptId(`${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
    }, []);

    useEffect(() => {
        track(
            BUDGET_FUNNEL_EVENTS.wizardViewed,
            buildBudgetFunnelPayload({
                stepIndex: 0,
                extra: {
                    wizard_source: `budget_wizard_${BUDGET_WIZARD_VERSION}`,
                },
            }),
        );
    }, []);

    useEffect(() => {
        stepRef.current = stepIndex;
        track(
            BUDGET_FUNNEL_EVENTS.stepViewed,
            buildBudgetFunnelPayload({
                stepIndex,
            }),
        );
    }, [stepIndex]);

    useEffect(() => {
        return () => {
            if (startedRef.current && !submittedRef.current) {
                track(
                    BUDGET_FUNNEL_EVENTS.abandoned,
                    buildBudgetFunnelPayload({
                        stepIndex: stepRef.current,
                        extra: {
                            repair_type: repairTypeLabel || "sin_definir",
                            urgency,
                            contact_channel: contactChannel,
                        },
                    }),
                );
            }
        };
    }, [contactChannel, repairTypeLabel, urgency]);

    function validateStep(index: number): string | null {
        if (index === 0 && (!brand.trim() || !model.trim())) {
            return "Completa marca y modelo para seguir.";
        }

        if (index === 1 && repairTypes.length === 0) {
            return "Selecciona al menos una falla para continuar.";
        }

        if (index === LAST_STEP_INDEX) {
            const normalizedContact = contact.trim();

            if (!normalizedContact) {
                return "Necesitamos un dato de contacto para responderte.";
            }

            if (
                (contactChannel === "whatsapp" || contactChannel === "llamada") &&
                !PHONE_CONTACT_REGEX.test(normalizedContact)
            ) {
                return "Ingresa un telefono valido con codigo de area para continuar.";
            }

            if (contactChannel === "email" && !EMAIL_CONTACT_REGEX.test(normalizedContact)) {
                return "Ingresa un email valido para continuar.";
            }
        }

        return null;
    }

    function toggleRepairType(option: string) {
        setRepairTypes((current) => {
            if (current.includes(option)) {
                return current.filter((item) => item !== option);
            }

            return [...current, option];
        });
        setErrorMessage("");
    }

    function handleBack() {
        if (stepIndex === 0) {
            return;
        }

        const nextStepIndex = Math.max(stepIndex - 1, 0);
        setErrorMessage("");
        track(
            BUDGET_FUNNEL_EVENTS.stepBack,
            buildBudgetFunnelPayload({
                stepIndex,
                extra: {
                    to_step_index: nextStepIndex + 1,
                },
            }),
        );
        setStepIndex(nextStepIndex);
    }

    function handleNext() {
        const validationError = validateStep(stepIndex);
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        startedRef.current = true;
        setErrorMessage("");

        track(
            BUDGET_FUNNEL_EVENTS.stepCompleted,
            buildBudgetFunnelPayload({
                stepIndex,
                extra: {
                    repair_type: repairTypeLabel || "sin_definir",
                    urgency,
                    contact_channel: contactChannel,
                },
            }),
        );

        setStepIndex((current) => Math.min(current + 1, LAST_STEP_INDEX));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        const validationError = validateStep(LAST_STEP_INDEX);
        if (validationError) {
            event.preventDefault();
            setErrorMessage(validationError);
            return;
        }

        submittedRef.current = true;

        const submitPayload = buildBudgetFunnelPayload({
            stepIndex,
            extra: {
                lead_channel: "whatsapp_redirect",
                repair_type: repairTypeLabel || "sin_definir",
                urgency,
                contact_channel: contactChannel,
            },
        });

        track(BUDGET_FUNNEL_EVENTS.submit, submitPayload);
        track(BUDGET_FUNNEL_EVENTS.redirect, submitPayload);
    }

    const progressPercentage = ((stepIndex + 1) / BUDGET_WIZARD_STEPS.length) * 100;

    const selectedUrgency = urgencyOptions.find((option) => option.value === urgency);

    const selectedContactChannel = contactChannelOptions.find(
        (option) => option.value === contactChannel,
    );

    function renderStepContent() {
        if (stepIndex === 0) {
            return (
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                        <span>Marca</span>
                        <input
                            type="text"
                            value={brand}
                            onChange={(event) => setBrand(event.target.value)}
                            placeholder="Ej: iPhone, Samsung, Xiaomi"
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                        />
                        <span className="text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
                            Si no la recuerdas exacta, escribe una aproximada.
                        </span>
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                        <span>Modelo</span>
                        <input
                            type="text"
                            value={model}
                            onChange={(event) => setModel(event.target.value)}
                            placeholder="Ej: iPhone 13, Galaxy A54, Redmi Note 11"
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                        />
                        <span className="text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
                            Con esto te damos un estimado mucho mas preciso.
                        </span>
                    </label>
                </div>
            );
        }

        if (stepIndex === 1) {
            return (
                <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Selecciona una o varias fallas
                    </legend>
                    <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Marca los sintomas principales. Luego afinamos detalles por WhatsApp.
                    </p>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Seleccionadas: {repairTypes.length}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {repairOptions.map((option) => {
                            const selected = repairTypes.includes(option);

                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => toggleRepairType(option)}
                                    className={`flex min-h-11 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
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
                    {repairTypes.length > 0 ? (
                        <div className="space-y-2">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Tocala para quitarla:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {repairTypes.map((repairType) => (
                                    <button
                                        key={repairType}
                                        type="button"
                                        onClick={() => toggleRepairType(repairType)}
                                        className="inline-flex min-h-8 items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary/15"
                                        aria-label={`Quitar ${repairType}`}
                                    >
                                        {repairType}
                                        <span aria-hidden>x</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </fieldset>
            );
        }

        if (stepIndex === 2) {
            return (
                <div className="space-y-6">
                    <fieldset className="space-y-3">
                        <legend className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Nivel de urgencia
                        </legend>
                        <div className="grid gap-3 md:grid-cols-3">
                            {urgencyOptions.map((option) => {
                                const selected = urgency === option.value;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setUrgency(option.value)}
                                        className={`rounded-2xl border px-4 py-4 text-left transition ${
                                            selected
                                                ? "border-primary bg-primary/10"
                                                : "border-slate-200 bg-white hover:border-primary/35 dark:border-slate-700 dark:bg-slate-900"
                                        }`}
                                    >
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {option.label}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                                            {option.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>

                    <label className="block space-y-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                        <span>Descripcion de la falla (opcional)</span>
                        <textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            rows={5}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                            placeholder="Ej: Se cayo ayer, el touch responde mal y se descarga rapido."
                        />
                    </label>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Canal de respuesta preferido
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-3">
                        {contactChannelOptions.map((option) => {
                            const selected = contactChannel === option.value;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setContactChannel(option.value)}
                                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                                        selected
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-primary/35 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                                    }`}
                                >
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                </fieldset>

                <label className="block space-y-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                    <span>{selectedContactMeta.label}</span>
                    <input
                        type={selectedContactMeta.type}
                        inputMode={selectedContactMeta.inputMode}
                        autoComplete={selectedContactMeta.autoComplete}
                        value={contact}
                        onChange={(event) => setContact(event.target.value)}
                        placeholder={selectedContactMeta.placeholder}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                    <span className="text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
                        {selectedContactMeta.helper}
                    </span>
                </label>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                        Resumen rapido antes de enviar
                    </p>
                    <ul className="mt-2 space-y-1">
                        <li>
                            <strong>Equipo:</strong> {brand || "-"} {model || ""}
                        </li>
                        <li>
                            <strong>Fallas:</strong> {repairTypeLabel || "-"}
                        </li>
                        <li>
                            <strong>Urgencia:</strong> {selectedUrgency?.label || "-"}
                        </li>
                        <li>
                            <strong>Canal:</strong> {selectedContactChannel?.label || "-"}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <form
            action="/api/repair-lead"
            method="post"
            className="space-y-6"
            onSubmit={handleSubmit}
        >
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                Te toma menos de 1 minuto. Te respondemos por WhatsApp en hasta 2 horas habiles.
                Si hace falta revision tecnica, confirmamos diagnostico inicial dentro de 24 horas habiles.
            </p>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    <span>
                        Paso {stepIndex + 1} de {BUDGET_WIZARD_STEPS.length}
                    </span>
                    <span>{Math.round(progressPercentage)}% completado</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                        className="h-2 rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                <ol className="mt-4 grid gap-2 sm:grid-cols-4">
                    {BUDGET_WIZARD_STEPS.map((step, index) => {
                        const active = index === stepIndex;
                        const done = index < stepIndex;

                        return (
                            <li
                                key={step.id}
                                className={`rounded-xl border px-3 py-2 text-center text-xs font-semibold transition ${
                                    active
                                        ? "border-primary bg-primary/10 text-primary"
                                        : done
                                            ? "border-emerald-700 bg-emerald-700/10 text-emerald-800 dark:text-emerald-300"
                                            : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300"
                                }`}
                            >
                                {step.label}
                            </li>
                        );
                    })}
                </ol>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900/70">
                {renderStepContent()}
            </div>

            {errorMessage ? (
                <p
                    role="alert"
                    className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
                >
                    <FaExclamationCircle aria-hidden />
                    {errorMessage}
                </p>
            ) : null}

            <input type="hidden" name="brand" value={brand} />
            <input type="hidden" name="model" value={model} />
            {repairTypes.map((repairType) => (
                <input key={repairType} type="hidden" name="repairType" value={repairType} />
            ))}
            <input type="hidden" name="urgency" value={urgency} />
            <input type="hidden" name="description" value={description} />
            <input type="hidden" name="contactChannel" value={contactChannel} />
            <input type="hidden" name="contact" value={contact} />
            <input
                type="hidden"
                name="wizardSource"
                value={`budget_wizard_${BUDGET_WIZARD_VERSION}`}
            />
            <input type="hidden" name="leadAttemptId" value={leadAttemptId} />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {stepIndex > 0 ? (
                    <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600 dark:text-slate-200"
                    >
                        <FaArrowLeft aria-hidden />
                        Paso anterior
                    </button>
                ) : null}

                {stepIndex < LAST_STEP_INDEX ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                    >
                        Continuar
                        <FaArrowRight aria-hidden />
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-800"
                    >
                        <FaWhatsapp aria-hidden />
                        Enviar datos y abrir WhatsApp
                    </button>
                )}

                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Enviamos todo una sola vez y te llevamos directo al chat.
                </p>
            </div>

            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                Solo usamos esta informacion para responder tu consulta tecnica.
            </p>
        </form>
    );
}

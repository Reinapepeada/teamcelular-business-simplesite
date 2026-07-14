"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FaLocationArrow, FaMapMarkerAlt, FaTimes, FaWhatsapp } from "react-icons/fa";
import { BRANCHES } from "@/lib/businessProfile";
import { recordLeadInteraction } from "@/lib/analytics/leadInteractions";
import {
  branchWhatsappUrl,
  distanceKm,
  readBranchPreference,
  saveBranchPreference,
  type BranchSelectionMethod,
  type BranchSlug,
} from "@/lib/branchPreference";

interface PickerProps {
  value: BranchSlug | "";
  onChange: (slug: BranchSlug, method: BranchSelectionMethod) => void;
  compact?: boolean;
}

export function BranchPreferencePicker({ value, onChange, compact = false }: PickerProps) {
  const [distances, setDistances] = useState<Partial<Record<BranchSlug, number>>>({});
  const [locationState, setLocationState] = useState<"idle" | "loading" | "denied" | "error">("idle");

  function useLocation() {
    if (!navigator.geolocation) {
      setLocationState("error");
      return;
    }
    setLocationState("loading");
    recordLeadInteraction({
      eventName: "branch_location_request",
      ctaName: "branch_use_location",
      ctaLocation: "branch_selector",
      ctaVariant: "other",
    });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const measured = Object.fromEntries(
          BRANCHES.map((branch) => [
            branch.slug,
            distanceKm(coords.latitude, coords.longitude, branch.latitude, branch.longitude),
          ]),
        ) as Record<BranchSlug, number>;
        setDistances(measured);
        setLocationState("idle");
        const nearest = BRANCHES.reduce((best, branch) =>
          measured[branch.slug] < measured[best.slug] ? branch : best,
        );
        onChange(nearest.slug, "nearest");
        recordLeadInteraction({
          eventName: "branch_location_success",
          ctaName: `branch_nearest_${nearest.slug}`,
          ctaLocation: "branch_selector",
          ctaVariant: "other",
        });
      },
      (error) => {
        const denied = error.code === error.PERMISSION_DENIED;
        setLocationState(denied ? "denied" : "error");
        recordLeadInteraction({
          eventName: denied ? "branch_location_denied" : "branch_location_error",
          ctaName: "branch_use_location",
          ctaLocation: "branch_selector",
          ctaVariant: "other",
        });
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  }

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        Sucursal preferida
      </legend>
      <div className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
        {BRANCHES.map((branch) => {
          const selected = value === branch.slug;
          return (
            <button
              key={branch.slug}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(branch.slug, "manual")}
              className={`min-h-16 rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${
                selected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-slate-200 bg-white text-slate-700 hover:border-primary/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-2 font-semibold">
                <FaMapMarkerAlt aria-hidden /> {branch.shortName}
              </span>
              <span className="mt-1 block text-sm text-slate-600 dark:text-slate-400">
                {branch.street}{distances[branch.slug] != null ? ` · ${distances[branch.slug]!.toFixed(1)} km aprox.` : ""}
              </span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={useLocation}
        disabled={locationState === "loading"}
        className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:opacity-60"
      >
        <FaLocationArrow aria-hidden />
        {locationState === "loading" ? "Comparando distancias..." : "Usar mi ubicación para elegir"}
      </button>
      {locationState === "denied" || locationState === "error" ? (
        <p className="text-sm text-slate-600 dark:text-slate-400" role="status">
          No pudimos usar tu ubicación. Podés elegir cualquiera de las dos sucursales manualmente.
        </p>
      ) : (
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
          La ubicación se usa solo para comparar distancias y no se guarda.
        </p>
      )}
    </fieldset>
  );
}

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  ctaName: string;
  ctaLocation: string;
  message?: string;
  ariaLabel?: string;
}

export default function BranchWhatsAppButton({
  children,
  className,
  ctaName,
  ctaLocation,
  message,
  ariaLabel,
}: ButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<BranchSlug | "">("");

  useEffect(() => {
    const preference = readBranchPreference();
    if (preference) setSelected(preference.slug);
  }, []);

  function openSelector() {
    recordLeadInteraction({
      eventName: "branch_selector_open",
      ctaName,
      ctaLocation,
      ctaVariant: "whatsapp",
    });
    dialogRef.current?.showModal();
  }

  function choose(slug: BranchSlug, method: BranchSelectionMethod) {
    setSelected(slug);
    saveBranchPreference(slug, method);
  }

  function continueToWhatsApp() {
    if (!selected) return;
    const destination = branchWhatsappUrl(selected, message);
    recordLeadInteraction({
      eventName: "branch_whatsapp_redirect",
      ctaName: `${ctaName}_${selected}`,
      ctaLocation,
      ctaVariant: "whatsapp",
      destination,
    });
    window.open(destination, "_blank", "noopener,noreferrer");
    dialogRef.current?.close();
  }

  return (
    <>
      <button type="button" onClick={openSelector} className={className} aria-label={ariaLabel}>
        {children || <><FaWhatsapp aria-hidden /> WhatsApp</>}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={`${ctaName}-branch-title`}
        className="mb-0 mt-auto w-full max-w-xl rounded-t-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/55 dark:bg-slate-900 dark:text-slate-100 sm:m-auto sm:rounded-2xl"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={`${ctaName}-branch-title`} className="text-xl font-bold">¿Con qué sucursal querés hablar?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Ambas realizan todo tipo de reparaciones. La elección es una preferencia y podés cambiarla.
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Cerrar selector de sucursal"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <FaTimes aria-hidden />
            </button>
          </div>
          <div className="mt-5">
            <BranchPreferencePicker value={selected} onChange={choose} compact />
          </div>
          <button
            type="button"
            disabled={!selected}
            onClick={continueToWhatsApp}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-700/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaWhatsapp aria-hidden />
            {selected ? `Continuar con ${BRANCHES.find((branch) => branch.slug === selected)?.shortName}` : "Elegí una sucursal"}
          </button>
        </div>
      </dialog>
    </>
  );
}

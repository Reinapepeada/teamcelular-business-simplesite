"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { FaLocationArrow, FaMapMarkerAlt, FaTimes, FaWhatsapp } from "react-icons/fa";
import { BRANCHES } from "@/lib/businessProfile";
import { recordLeadInteraction } from "@/lib/analytics/leadInteractions";
import { measure } from "@/lib/analytics/posthog";
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
  /** Con destino, cada sede es un enlace: elegirla ya abre WhatsApp. */
  linkFor?: (slug: BranchSlug) => string;
}

export function BranchPreferencePicker({ value, onChange, compact = false, linkFor }: PickerProps) {
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
          const className = `min-h-16 rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${
            selected
              ? "border-primary bg-primary/10 text-primary dark:text-secondary"
              : "border-slate-200 bg-white text-slate-700 hover:border-primary/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          }`;
          const content = (
            <>
              <span className="flex items-center gap-2 font-semibold">
                {linkFor ? <FaWhatsapp aria-hidden /> : <FaMapMarkerAlt aria-hidden />} {branch.shortName}
                {linkFor && selected ? <span className="text-xs font-medium">· tu sucursal</span> : null}
              </span>
              <span className="mt-1 block text-sm text-slate-600 dark:text-slate-400">
                {branch.street}{distances[branch.slug] != null ? ` · ${distances[branch.slug]!.toFixed(1)} km aprox.` : ""}
              </span>
            </>
          );
          return linkFor ? (
            <a
              key={branch.slug}
              href={linkFor(branch.slug)}
              target="_blank"
              rel="noopener noreferrer"
              data-whatsapp-tracked="true"
              onClick={() => onChange(branch.slug, "manual")}
              className={className}
            >
              {content}
            </a>
          ) : (
            <button
              key={branch.slug}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(branch.slug, "manual")}
              className={className}
            >
              {content}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={useLocation}
        disabled={locationState === "loading"}
        className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold text-primary dark:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:opacity-60"
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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<BranchSlug | "">("");
  const redirected = useRef(false);

  useLayoutEffect(() => {
    // Abrir con el contenido montado evita medir y enfocar un diálogo vacío.
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  function openSelector() {
    redirected.current = false;
    setOpen(true);
    setSelected(readBranchPreference()?.slug ?? "");
    // La medición de apertura puede esperar al pintado del selector.
    requestAnimationFrame(() => {
      setTimeout(() => recordLeadInteraction({
        eventName: "branch_selector_open",
        ctaName,
        ctaLocation,
        ctaVariant: "whatsapp",
      }), 0);
    });
  }

  // Cada sede es un enlace a WhatsApp: tocarla elige y abre en un paso. Antes
  // habia que elegir y despues "Continuar", y 1 de cada 5 cerraba sin elegir.
  // "nearest" llega desde la geolocalizacion (sin gesto del usuario): solo marca.
  function choose(slug: BranchSlug, method: BranchSelectionMethod) {
    measure("branch_preference_selected", { preferred_branch: slug, selection_method: method });
    setSelected(slug);
    saveBranchPreference(slug, method);
    if (method !== "manual") return;
    redirected.current = true;
    recordLeadInteraction({
      eventName: "branch_whatsapp_redirect",
      preferredBranch: slug,
      ctaName: `${ctaName}_${slug}`,
      ctaLocation,
      ctaVariant: "whatsapp",
      destination: branchWhatsappUrl(slug, message),
    });
    dialogRef.current?.close();
  }

  return (
    <>
      <button type="button" onClick={openSelector} className={className} aria-label={ariaLabel}
        data-cta-name={ctaName} data-cta-location={ctaLocation} data-cta-variant="whatsapp">
        {children || <><FaWhatsapp aria-hidden /> WhatsApp</>}
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => {
          measure("branch_selector_close", { cta_name: ctaName, cta_location: ctaLocation,
            conversion_kind: redirected.current ? "after_handoff" : "dismissed" });
          setOpen(false);
        }}
        aria-labelledby={`${ctaName}-branch-title`}
        className="mb-0 mt-auto w-full max-w-xl rounded-t-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/55 dark:bg-slate-900 dark:text-slate-100 sm:m-auto sm:rounded-2xl"
      >
        {open && <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* No es <h2>: el selector se renderiza varias veces por pagina y metia
                  encabezados duplicados en el esquema del documento. El dialogo
                  conserva su nombre accesible via aria-labelledby. */}
              <p id={`${ctaName}-branch-title`} className="text-xl font-bold">¿Con qué sucursal querés hablar?</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Tocá una y se abre WhatsApp. Ambas realizan todo tipo de reparaciones.
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
            <BranchPreferencePicker value={selected} onChange={choose} compact linkFor={(slug) => branchWhatsappUrl(slug, message)} />
          </div>
        </div>}
      </dialog>
    </>
  );
}

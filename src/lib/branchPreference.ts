import { BRANCHES, getBranch, whatsappUrl } from "@/lib/businessProfile";

export type BranchSlug = (typeof BRANCHES)[number]["slug"];
export type BranchSelectionMethod = "manual" | "nearest" | "remembered" | "contextual";

const STORAGE_KEY = "teamcelular.branchPreference.v1";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

export interface BranchPreference {
  slug: BranchSlug;
  selectedAt: number;
  method: BranchSelectionMethod;
}

export function readBranchPreference(): BranchPreference | null {
  if (typeof window === "undefined") return null;
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null") as BranchPreference | null;
    if (!value || !BRANCHES.some((branch) => branch.slug === value.slug)) return null;
    if (Date.now() - value.selectedAt > MAX_AGE_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return value;
  } catch {
    return null;
  }
}

export function saveBranchPreference(slug: BranchSlug, method: BranchSelectionMethod) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ slug, method, selectedAt: Date.now() }));
}

export function branchWhatsappUrl(slug: BranchSlug, text?: string) {
  const branch = getBranch(slug);
  return whatsappUrl(text || branch.whatsappText, branch.whatsapp);
}

export function distanceKm(
  latitude: number,
  longitude: number,
  branchLatitude: number,
  branchLongitude: number,
) {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const deltaLatitude = radians(branchLatitude - latitude);
  const deltaLongitude = radians(branchLongitude - longitude);
  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(radians(latitude)) *
      Math.cos(radians(branchLatitude)) *
      Math.sin(deltaLongitude / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import type { MouseEventHandler, ReactNode } from "react";
import {
  recordLeadInteraction,
  type LeadInteractionCtaVariant,
} from "@/lib/analytics/leadInteractions";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";

type CtaVariant = LeadInteractionCtaVariant;

interface TrackedCtaLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  ctaName: string;
  ctaLocation: string;
  ctaVariant?: CtaVariant;
  eventName?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  prefetch?: boolean;
  ariaLabel?: string;
  directBranch?: boolean;
}

function trackCta(
  eventName: string,
  ctaName: string,
  ctaLocation: string,
  ctaVariant: CtaVariant,
  href: string,
) {
  track(eventName, {
    cta_name: ctaName,
    cta_location: ctaLocation,
    cta_variant: ctaVariant,
    destination: href,
  });

  recordLeadInteraction({
    eventName,
    ctaName,
    ctaLocation,
    ctaVariant,
    destination: href,
  });
}

export default function TrackedCtaLink({
  href,
  className,
  children,
  ctaName,
  ctaLocation,
  ctaVariant = "other",
  eventName = "cta_click",
  external = false,
  target,
  rel,
  prefetch,
  ariaLabel,
  directBranch = false,
}: TrackedCtaLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    trackCta(eventName, ctaName, ctaLocation, ctaVariant, href);
  };

  const safeRel = target === "_blank" ? rel || "noopener noreferrer" : rel;

  if (ctaVariant === "whatsapp" && external && !directBranch) {
    let message: string | undefined;
    try {
      message = new URL(href).searchParams.get("text") || undefined;
    } catch {
      message = undefined;
    }
    return (
      <BranchWhatsAppButton
        ctaName={ctaName}
        ctaLocation={ctaLocation}
        className={className}
        message={message}
        ariaLabel={ariaLabel}
      >
        {children}
      </BranchWhatsAppButton>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        target={target}
        rel={safeRel}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={safeRel}
      prefetch={prefetch}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

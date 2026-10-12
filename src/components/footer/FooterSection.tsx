"use client";

import { useId, useState, type ReactNode } from "react";
import { BsChevronDown } from "react-icons/bs";

/** Keep link markup in the initial HTML; only its mobile presentation collapses. */
export default function FooterSection({ title, children }: { title: string; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <section className="min-w-0 border-b border-white/10 md:border-0">
      <h2 className="text-base font-semibold text-white md:mb-4 md:text-lg">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((value) => !value)}
          className="footer-toggle flex min-h-12 w-full items-center justify-between gap-4 rounded-lg py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
        >
          {title}
          <BsChevronDown aria-hidden="true" className={`shrink-0 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} />
        </button>
        <span className="footer-heading hidden md:block">{title}</span>
      </h2>
      <div id={panelId} className={`footer-panel flex-col gap-1 pb-4 md:flex md:gap-3 md:pb-0 ${expanded ? "flex" : "hidden"}`}>
        {children}
      </div>
      <noscript>
        <style>{`.footer-panel { display: flex !important; } .footer-toggle { display: none !important; } .footer-heading { display: block !important; padding-block: 12px; }`}</style>
      </noscript>
    </section>
  );
}

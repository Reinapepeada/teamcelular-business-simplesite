"use client";

import { useEffect, useRef, useState } from "react";

interface BranchMapProps {
  /** Full street address, e.g. "Amenabar 2032, Belgrano, CABA". */
  address: string;
  /** Branch name, used for the iframe accessible title. */
  name: string;
  className?: string;
}

/**
 * Google Maps embed. Uses the keyless `output=embed` query form, so it needs
 * no API key and no billing account.
 *
 * El iframe trae cerca de 1 MB de JavaScript. `loading="lazy"` lo pide igual
 * con el mapa a más de una pantalla de distancia, así que se monta recién
 * cuando el mapa está por entrar en pantalla. El alto fijo evita saltos.
 */
export default function BranchMap({ address, name, className = "" }: BranchMapProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={box}
      className={`h-[320px] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 ${className}`}
    >
      {near ? (
        <iframe
          src={src}
          title={`Mapa de ${name}`}
          width="100%"
          height="320"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full border-0"
        />
      ) : null}
    </div>
  );
}

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
 */
export default function BranchMap({ address, name, className = "" }: BranchMapProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 ${className}`}>
      <iframe
        src={src}
        title={`Mapa de ${name}`}
        width="100%"
        height="320"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full border-0"
      />
    </div>
  );
}

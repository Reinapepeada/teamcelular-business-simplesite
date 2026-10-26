import Link from "next/link";
import { SiApple, SiMotorola, SiSamsung, SiXiaomi } from "react-icons/si";

const brands = [
  { label: "iPhone", slug: "iphone", Icon: SiApple },
  { label: "Samsung", slug: "samsung", Icon: SiSamsung },
  { label: "Motorola", slug: "motorola", Icon: SiMotorola },
  { label: "Xiaomi", slug: "xiaomi", Icon: SiXiaomi },
];

export default function RepairBrandLinks() {
  return (
    <nav aria-label="Reparaciones por marca" className="grid grid-cols-4 gap-2 py-4">
      {brands.map(({ label, slug, Icon }) => (
        <Link key={slug} href={`/guias/reparacion-${slug}-buenos-aires`}
          className="flex min-h-20 flex-col items-center justify-center gap-3 rounded-xl text-[#c7c7cc] transition-colors hover:bg-[#1d1d1f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6aa6ff]">
          <Icon aria-hidden viewBox={slug === "samsung" ? "0 9 24 6" : undefined} className={slug === "samsung" ? "h-7 w-16" : "h-7 w-7"} />
          <span className="text-sm">{label}</span>
        </Link>
      ))}
    </nav>
  );
}

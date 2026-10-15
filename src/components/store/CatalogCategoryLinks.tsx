import Link from "next/link";
import { getCategoryContent } from "@/lib/catalogCategories";
import { slugify } from "@/lib/productSlug";

export default function CatalogCategoryLinks({ categories, activeSlug }: { categories: string[]; activeSlug?: string }) {
  if (!categories.length) return null;
  return (
    <nav aria-label="Categorías de la tienda" className="mx-auto mb-5 flex w-full max-w-screen-2xl gap-2 overflow-x-auto px-4 pb-2 sm:flex-wrap sm:px-6 lg:px-8">
      {categories.map((name) => {
        const slug = slugify(name);
        return (
          <Link key={slug} href={`/tienda/categoria/${slug}`} prefetch={false} aria-current={slug === activeSlug ? "page" : undefined}
            className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:border-primary hover:text-white aria-[current=page]:border-primary aria-[current=page]:text-white">
            {getCategoryContent(name).title}
          </Link>
        );
      })}
    </nav>
  );
}

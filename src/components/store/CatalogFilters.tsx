import Link from "next/link";
import type {
    CatalogFilterOptions,
    CatalogFiltersState,
} from "@/lib/catalog";

interface CatalogFiltersProps {
    basePath: string;
    filters: CatalogFiltersState;
    options: CatalogFilterOptions;
    forcedCategoryName?: string;
}

function ActiveFilter({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <span className="inline-flex min-h-9 items-center rounded-full border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
            {children}
        </span>
    );
}

export default function CatalogFilters({
    basePath,
    filters,
    options,
    forcedCategoryName,
}: CatalogFiltersProps) {
    const hasActiveFilters =
        Boolean(filters.search) ||
        filters.categories.length > 0 ||
        filters.brands.length > 0 ||
        Boolean(filters.minPrice) ||
        Boolean(filters.maxPrice) ||
        Boolean(filters.sort);

    const minPrice = filters.minPrice || String(options.priceRange.min || 0);
    const maxPrice = filters.maxPrice || String(options.priceRange.max || 0);

    return (
        <aside className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Filtros
                </p>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">
                    Ajusta la busqueda
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Filtra por marca, categoria, precio o una palabra clave.
                </p>
            </div>

            {hasActiveFilters ? (
                <div className="mt-4 flex flex-wrap gap-2">
                    {forcedCategoryName ? (
                        <ActiveFilter>{forcedCategoryName}</ActiveFilter>
                    ) : null}
                    {filters.search ? (
                        <ActiveFilter>Busqueda: {filters.search}</ActiveFilter>
                    ) : null}
                    {filters.categories.map((category) => (
                        <ActiveFilter key={category}>{category}</ActiveFilter>
                    ))}
                    {filters.brands.map((brand) => (
                        <ActiveFilter key={brand}>{brand}</ActiveFilter>
                    ))}
                    {filters.minPrice || filters.maxPrice ? (
                        <ActiveFilter>
                            ${minPrice} - ${maxPrice}
                        </ActiveFilter>
                    ) : null}
                </div>
            ) : null}

            <form action={basePath} method="get" className="mt-6 space-y-6">
                <div className="space-y-2">
                    <label
                        htmlFor="catalog-search"
                        className="text-sm font-medium text-slate-900 dark:text-slate-100"
                    >
                        Buscar producto
                    </label>
                    <input
                        id="catalog-search"
                        name="search"
                        type="search"
                        defaultValue={filters.search}
                        placeholder="Ej: cargador iPhone, modulo Samsung"
                        className="min-h-12 w-full rounded-2xl border border-slate-300 dark:border-slate-600 px-4 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="catalog-sort"
                        className="text-sm font-medium text-slate-900 dark:text-slate-100"
                    >
                        Orden
                    </label>
                    <select
                        id="catalog-sort"
                        name="sort"
                        defaultValue={filters.sort}
                        className="min-h-12 w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="">Relevancia</option>
                        <option value="price-asc">Menor precio</option>
                        <option value="price-desc">Mayor precio</option>
                        <option value="name-asc">Nombre A-Z</option>
                        <option value="name-desc">Nombre Z-A</option>
                    </select>
                </div>

                {!forcedCategoryName ? (
                    <fieldset className="space-y-3">
                        <legend className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            Categorias
                        </legend>
                        <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                            {options.categories.map((category) => (
                                <label
                                    key={category.id}
                                    className="flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700/70 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    <input
                                        type="checkbox"
                                        name="categories"
                                        value={category.name}
                                        defaultChecked={filters.categories.includes(
                                            category.name,
                                        )}
                                        className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary"
                                    />
                                    <span>{category.name}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                ) : (
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-800/70 p-4">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            Categoria actual
                        </p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            {forcedCategoryName}
                        </p>
                    </div>
                )}

                <fieldset className="space-y-3">
                    <legend className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        Marcas
                    </legend>
                    <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                        {options.brands.map((brand) => (
                            <label
                                key={brand.id}
                                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700/70 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                <input
                                    type="checkbox"
                                    name="brands"
                                    value={brand.name}
                                    defaultChecked={filters.brands.includes(brand.name)}
                                    className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary"
                                />
                                <span>{brand.name}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="space-y-3">
                    <legend className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        Rango de precio
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <label
                                htmlFor="catalog-min-price"
                                className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
                            >
                                Minimo
                            </label>
                            <input
                                id="catalog-min-price"
                                type="number"
                                name="minPrice"
                                min={options.priceRange.min}
                                max={options.priceRange.max}
                                defaultValue={filters.minPrice}
                                placeholder={String(options.priceRange.min)}
                                className="min-h-12 w-full rounded-2xl border border-slate-300 dark:border-slate-600 px-4 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="catalog-max-price"
                                className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
                            >
                                Maximo
                            </label>
                            <input
                                id="catalog-max-price"
                                type="number"
                                name="maxPrice"
                                min={options.priceRange.min}
                                max={options.priceRange.max}
                                defaultValue={filters.maxPrice}
                                placeholder={String(options.priceRange.max)}
                                className="min-h-12 w-full rounded-2xl border border-slate-300 dark:border-slate-600 px-4 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>
                </fieldset>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="submit"
                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90"
                    >
                        Aplicar filtros
                    </button>
                    <Link
                        href={basePath}
                        className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 px-5 text-sm font-semibold text-slate-700 dark:text-slate-300 transition hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                        Limpiar
                    </Link>
                </div>
            </form>
        </aside>
    );
}


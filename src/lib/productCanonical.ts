import { getAllProducts } from '@/services/products';
import { fetchWithCache } from '@/lib/serverCache';
import { slugify } from '@/lib/productSlug';
import type { Product } from '@/app/tienda/product';

/**
 * Parts suppliers whose name is appended to otherwise identical products, e.g.
 * "Cambio de Bateria iPhone 12 Mini - CK" vs "- JC". Each supplier ships its
 * own URL for the same repair, splitting ranking signal across near-duplicates.
 */
const SUPPLIER_TOKENS = ['ampsentrix', 'puxida', 'ck', 'jc'] as const;

/**
 * Key shared by every supplier variant of the same repair, or null when the
 * product carries no supplier suffix (nothing to group).
 */
export function variantGroupKey(name?: string | null): string | null {
    const slug = slugify(name ?? '');
    if (!slug) return null;

    for (const token of SUPPLIER_TOKENS) {
        if (slug.endsWith(`-${token}`)) {
            return slug.slice(0, -(token.length + 1));
        }
    }

    return null;
}

/**
 * Returns the product that should own the canonical URL for this repair.
 * Picks the lowest id among the group so the choice stays stable as stock
 * and prices change. Returns the product itself when it has no siblings.
 */
export async function resolveCanonicalProduct(product: Product): Promise<Product> {
    const key = variantGroupKey(product.name);
    if (!key) return product;

    try {
        const all = await fetchWithCache('products:all', () => getAllProducts(), 1000 * 60 * 10);
        const siblings = all.filter((candidate) => variantGroupKey(candidate.name) === key);

        if (siblings.length < 2) return product;

        return siblings.reduce((winner, candidate) =>
            candidate.id < winner.id ? candidate : winner
        );
    } catch {
        // Never let a catalog hiccup break the page: fall back to self-canonical.
        return product;
    }
}

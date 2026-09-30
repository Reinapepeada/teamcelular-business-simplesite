import { feedMerchant } from "@/lib/merchantFeed";
import { listarCatalogo, type CatalogProduct } from "@/lib/storeCatalog";

export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com").replace(/\/+$/, "");
const TAMANIO = 60;

export async function GET() {
    const productos: CatalogProduct[] = [];
    try {
        for (let page = 1; ; page++) {
            const pagina = await listarCatalogo({ page, size: TAMANIO });
            productos.push(...pagina.items);
            if (pagina.items.length === 0 || page * TAMANIO >= pagina.total) break;
        }
    } catch (error) {
        // Un feed vacío haría que Merchant dé de baja todo; un 503 lo hace reintentar.
        console.error("Error armando el feed de Merchant:", error);
        return new Response("Catálogo no disponible", { status: 503 });
    }
    return new Response(feedMerchant(productos, SITE_URL), {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}

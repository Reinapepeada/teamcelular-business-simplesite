import { BsStarFill } from "react-icons/bs";
import { getGoogleReviews } from "@/lib/googleReviews";
import { getBranch } from "@/lib/businessProfile";

/**
 * Puntaje de Google junto al CTA. Sale de la misma consulta que la sección de
 * reseñas (Next la deduplica), así que nunca muestra un número distinto.
 * Sin dato de la API no se renderiza nada: no se publica un puntaje fijo.
 */
export default async function GoogleRatingBadge() {
    const place = await getGoogleReviews();
    if (!place) return null;
    const branch = getBranch("recoleta");

    return (
        <li>
            <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
            >
                <BsStarFill aria-hidden className="text-yellow-400" />
                <span>
                    <strong className="font-semibold tabular-nums text-[#f5f5f7]">
                        {place.rating.toFixed(1).replace(".", ",")}
                    </strong>{" "}
                    en Google · {place.user_ratings_total} reseñas de {branch.shortName}
                </span>
            </a>
        </li>
    );
}

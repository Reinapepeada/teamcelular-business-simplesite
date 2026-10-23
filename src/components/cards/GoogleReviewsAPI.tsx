import Image from "next/image";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { getGoogleReviews } from "@/lib/googleReviews";
import { getBranch } from "@/lib/businessProfile";

function StarRating({ rating }: { rating: number }) {
    return (
        <span role="img" aria-label={`${rating.toLocaleString("es-AR")} de 5 estrellas`} className="inline-flex gap-1 text-yellow-400">
            {[1, 2, 3, 4, 5].map(index => {
                const Icon = rating >= index ? FaStar : rating >= index - 0.5 ? FaStarHalfAlt : FaRegStar;
                return <Icon key={index} aria-hidden />;
            })}
        </span>
    );
}

export default async function GoogleReviewsAPI() {
    const placeData = await getGoogleReviews();
    const branch = getBranch("recoleta");
    const reviews = placeData?.reviews.slice(0, 3) ?? [];

    return (
        <article className="space-y-6">
            <header className="space-y-3 text-center">
                <h2 className="tc-heading text-white">Lo que dicen nuestros clientes</h2>
                <p className="text-sm text-[#a1a1a6]">Opiniones de la sucursal Recoleta · Paraguay 2451</p>
                {placeData && (
                    <p className="flex flex-wrap items-center justify-center gap-3 text-[#f5f5f7]">
                        <StarRating rating={placeData.rating} />
                        <span className="text-2xl font-semibold tabular-nums">{placeData.rating.toFixed(1).replace(".", ",")}</span>
                        <span>{placeData.user_ratings_total} reseñas</span>
                    </p>
                )}
                {reviews.length > 0 && <p className="text-sm text-[#a1a1a6]">Hasta tres opiniones en el orden de relevancia de Google, sin filtrar por puntuación. Se conserva el texto original.</p>}
            </header>

            {reviews.length > 0 && (
                <div className="grid gap-4 md:grid-cols-3">
                    {reviews.map((review, index) => (
                        <article key={`${review.review_url}-${index}`} className="tc-card min-w-0 space-y-4">
                            <div className="flex items-center gap-3">
                                {review.profile_photo_url && <Image src={review.profile_photo_url} alt={review.author_name} width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover" />}
                                <div className="min-w-0">
                                    <p className="break-words font-semibold text-white">
                                        {review.author_url ? <a href={review.author_url} target="_blank" rel="noopener noreferrer" className="tc-link underline underline-offset-4">{review.author_name}</a> : review.author_name}
                                    </p>
                                    {review.relative_time_description && <p className="mt-1 text-xs text-[#a1a1a6]">{review.relative_time_description}</p>}
                                </div>
                            </div>
                            <StarRating rating={review.rating} />
                            {review.text.length > 220 ? (
                                <details className="group text-[15px] leading-6 text-[#c7c7cc]">
                                    <summary className="min-h-11 cursor-pointer rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                                        <span className="group-open:hidden">{review.text.slice(0, 220).replace(/\s+\S*$/, "")}… </span>
                                        <span className="tc-link underline underline-offset-4">Leer reseña completa</span>
                                    </summary>
                                    <p className="mt-3 whitespace-pre-line break-words">{review.text}</p>
                                </details>
                            ) : <p className="whitespace-pre-line break-words text-[15px] leading-6 text-[#c7c7cc]">{review.text}</p>}
                            <a href={review.review_url} target="_blank" rel="noopener noreferrer" className="tc-link inline-flex min-h-11 items-center text-sm underline underline-offset-4">Ver reseña original</a>
                        </article>
                    ))}
                </div>
            )}

            <footer className="space-y-3 text-center">
                <p translate="no" className="whitespace-nowrap text-sm font-normal not-italic tracking-normal text-white">Google Maps</p>
                <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer" className="tc-btn tc-btn-ghost">Ver reseñas de Recoleta en Google Maps</a>
            </footer>
        </article>
    );
}

import Image from "next/image";
import { FaGoogle, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { getGoogleReviews } from "@/lib/googleReviews";

function StarRating({ rating }: { rating: number }) {
    const stars = [];

    for (let index = 1; index <= 5; index += 1) {
        if (rating >= index) {
            stars.push(<FaStar key={index} className="text-yellow-400" />);
        } else if (rating >= index - 0.5) {
            stars.push(<FaStarHalfAlt key={index} className="text-yellow-400" />);
        } else {
            stars.push(
                <FaRegStar
                    key={index}
                    className="text-slate-300 dark:text-slate-600"
                />,
            );
        }
    }

    return <div className="flex items-center gap-1">{stars}</div>;
}

export default async function GoogleReviewsAPI() {
    const placeData = await getGoogleReviews();

    if (!placeData) {
        return (
            <article className="space-y-8">
                <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                        <FaGoogle className="text-4xl text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-[2.2rem] dark:text-white">
                            Lo que dicen nuestros clientes
                        </h2>
                    </div>
                    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-md dark:border-white/10 dark:bg-slate-900/50">
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Las resenas no estan disponibles en este momento.
                        </p>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
                            Podes ver todas las opiniones directamente en nuestro
                            perfil de Google.
                        </p>
                        <div className="mt-6">
                            <a
                                href="https://share.google/EyVELq4ujwgdGKEEJ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
                            >
                                <FaGoogle />
                                Ver resenas en Google
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    const { rating, reviews, user_ratings_total } = placeData;

    return (
        <article className="space-y-8">
            <div className="space-y-4 text-center">
                <div className="flex items-center justify-center gap-3">
                    <FaGoogle className="text-4xl text-primary" />
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-[2.2rem] dark:text-white">
                        Lo que dicen nuestros clientes
                    </h2>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <StarRating rating={rating} />
                    <span className="text-2xl font-bold text-primary">
                        {rating.toFixed(1)}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                        ({user_ratings_total} resenas en Google)
                    </span>
                </div>
                <p className="mx-auto max-w-3xl text-[1.02rem] leading-7 text-slate-700 dark:text-slate-300">
                    La confianza de nuestros clientes sostiene cada presupuesto,
                    cada reparacion y cada derivacion que recibimos en Recoleta.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {reviews.slice(0, 3).map((review, index) => (
                    <article
                        key={`${review.author_name}-${index}`}
                        className="rounded-2xl border border-slate-200/75 bg-white/75 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/55"
                    >
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    {review.profile_photo_url ? (
                                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                            <Image
                                                src={review.profile_photo_url}
                                                alt={review.author_name}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white">
                                            {review.author_name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-[0.98rem] font-semibold leading-snug text-slate-900 dark:text-white">
                                            {review.author_name}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {review.relative_time_description}
                                        </p>
                                    </div>
                                </div>
                                <FaGoogle className="mt-1 text-xl text-primary" />
                            </div>

                            <StarRating rating={review.rating} />

                            <p className="text-[0.92rem] leading-6 text-slate-600 dark:text-slate-300">
                                &ldquo;{review.text}&rdquo;
                            </p>
                        </div>
                    </article>
                ))}
            </div>

            <div className="text-center">
                <a
                    href="https://www.google.com/search?sca_esv=9624f88e5d8f48a2&sxsrf=ANbL-n6PeKIqm41-bypsB-8HWDe7zFQalg:1771801721760&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOXEE8cC5R2ZYv4fXETPwAQ_JiykyTTHr0oxDxZtD8WSXZVUA8OJCZms9nfxGPg4g-4NYVf2hADghUJ9PwquRPKZ1OkM6cS4CtSrNj4eOc4Uy6Eo-NUm93lZz-nFxWLJzPj4rj8BiTRaZ549Idwxp3wqfzJNfJTNLhnDHazg_E2kkHZJKjQ%3D%3D&q=Team+celular+%7C+Reparacion+de+celulares+%7C+Reparacion+de+computadoras+Opiniones&sa=X&ved=2ahUKEwjZufPhm-6SAxWxqpUCHT-THJQQ0bkNegQIJxAH&biw=1745&bih=828&dpr=1.1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
                >
                    <FaGoogle />
                    Ver todas las resenas en Google
                </a>
            </div>
        </article>
    );
}

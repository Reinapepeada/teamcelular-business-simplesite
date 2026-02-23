"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar, FaGoogle, FaSpinner, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface GoogleReview {
  author_name: string;
  profile_photo_url?: string | null;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface PlaceDetails {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-slate-300 dark:text-slate-600" />);
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>;
};

export default function GoogleReviewsAPI() {
  const [placeData, setPlaceData] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/google-reviews", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Error de red" }));
          throw new Error(errorData.error || `Error ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || typeof data !== 'object') {
          throw new Error("Respuesta inválida del servidor");
        }
        
        setPlaceData(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        const errorMessage = err instanceof Error ? err.message : "Error al cargar las reseñas";
        setError(errorMessage);
        setPlaceData(null);
      } finally {
        setLoading(false);
      }
    };

    // Pequeño delay para evitar problemas de hidratación
    const timer = setTimeout(() => {
      fetchReviews();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <article className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <FaGoogle className="text-4xl text-primary" />
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-[2.2rem] dark:text-white">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="flex items-center justify-center gap-3 py-12">
            <FaSpinner className="text-4xl text-primary animate-spin" />
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Cargando reseñas de Google...
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (error || !placeData) {
    return (
      <article className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <FaGoogle className="text-4xl text-primary" />
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-[2.2rem] dark:text-white">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-md dark:border-white/10 dark:bg-slate-900/50">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Las reseñas no están disponibles en este momento.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
              Por favor, visitá nuestro perfil de Google para ver las opiniones de nuestros clientes.
            </p>
            <div className="mt-6">
              <a
                href="https://share.google/EyVELq4ujwgdGKEEJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
              >
                <FaGoogle />
                Ver reseñas en Google
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  const { rating, user_ratings_total, reviews } = placeData;

  return (
    <article className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <FaGoogle className="text-4xl text-primary" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-[2.2rem] dark:text-white">
            Lo que dicen nuestros clientes
          </h2>
        </div>
        <div className="flex items-center justify-center gap-3">
          <StarRating rating={rating} />
          <span className="text-2xl font-bold text-primary">{rating.toFixed(1)}</span>
          <span className="text-slate-600 dark:text-slate-400">
            ({user_ratings_total} reseñas en Google)
          </span>
        </div>
        <p className="max-w-3xl mx-auto text-[1.02rem] leading-7 text-slate-700 dark:text-slate-300">
          La confianza de nuestros clientes es lo que nos impulsa a seguir mejorando cada día.
          Estas son algunas de las opiniones reales de quienes confiaron en nosotros.
        </p>
      </div>

      {/* Grid responsive: 1 col mobile, 2 cols tablet, 5 cols desktop */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {reviews.slice(0, 5).map((review, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200/75 bg-white/75 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/55"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {review.profile_photo_url ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
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
                <FaGoogle className="text-xl text-primary" />
              </div>

              <StarRating rating={review.rating} />

              <p className="text-[0.92rem] leading-6 text-slate-600 dark:text-slate-300">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://www.google.com/search?sca_esv=9624f88e5d8f48a2&sxsrf=ANbL-n6PeKIqm41-bypsB-8HWDe7zFQalg:1771801721760&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOXEE8cC5R2ZYv4fXETPwAQ_JiykyTTHr0oxDxZtD8WSXZVUA8OJCZms9nfxGPg4g-4NYVf2hADghUJ9PwquRPKZ1OkM6cS4CtSrNj4eOc4Uy6Eo-NUm93lZz-nFxWLJzPj4rj8BiTRaZ549Idwxp3wqfzJNfJTNLhnDHazg_E2kkHZJKjQ%3D%3D&q=Team+celular+%7C+Reparacion+de+celulares+%7C+Reparacion+de+computadoras+Opiniones&sa=X&ved=2ahUKEwjZufPhm-6SAxWxqpUCHT-THJQQ0bkNegQIJxAH&biw=1745&bih=828&dpr=1.1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
        >
          <FaGoogle />
          Ver todas las reseñas en Google
        </a>
      </div>
    </article>
  );
}

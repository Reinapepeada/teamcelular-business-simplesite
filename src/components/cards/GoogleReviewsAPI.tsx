"use client";
import { useEffect, useState } from "react";
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg">
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
                className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 border-2 border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white shadow-lg hover:shadow-xl"
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
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
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          La confianza de nuestros clientes es lo que nos impulsa a seguir mejorando cada día.
          Estas son algunas de las opiniones reales de quienes confiaron en nosotros.
        </p>
      </div>

      {/* Grid responsive: 1 col mobile, 2 cols tablet, 5 cols desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {reviews.slice(0, 5).map((review, index) => (
          <div
            key={index}
            className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {review.profile_photo_url ? (
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                      {review.author_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {review.author_name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {review.relative_time_description}
                    </p>
                  </div>
                </div>
                <FaGoogle className="text-xl text-primary" />
              </div>

              <StarRating rating={review.rating} />

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://g.page/r/CZcZRTXuPnxSEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 border-2 border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white shadow-lg hover:shadow-xl"
        >
          <FaGoogle />
          Ver todas las reseñas en Google
        </a>
      </div>
    </article>
  );
}

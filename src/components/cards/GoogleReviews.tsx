"use client";
import React from "react";
import { Card } from "@nextui-org/react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaGoogle } from "react-icons/fa";

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  profileImage?: string;
}

const reviews: Review[] = [
  {
    author: "María González",
    rating: 5,
    text: "Excelente servicio! Me cambiaron la pantalla del iPhone en el día y quedó perfecta. Los chicos son súper atentos y te explican todo. Volveré sin dudas.",
    date: "Hace 2 semanas",
  },
  {
    author: "Carlos Rodríguez",
    rating: 5,
    text: "Llevé mi Samsung con un problema de placa que nadie me podía solucionar. En Team Celular lo arreglaron en 48hs. Profesionales de verdad, muy recomendable.",
    date: "Hace 1 mes",
  },
  {
    author: "Ana Martínez",
    rating: 5,
    text: "Me atendieron por WhatsApp super rápido y me dieron el presupuesto enseguida. Fui al taller en Recoleta y en pocas horas tenía mi cel como nuevo. Precios justos!",
    date: "Hace 3 semanas",
  },
  {
    author: "Diego Fernández",
    rating: 5,
    text: "Contraté el servicio para mi empresa. Atienden varios equipos al mismo tiempo y siempre cumplen con los tiempos. Muy buen trato y seriedad.",
    date: "Hace 2 meses",
  },
  {
    author: "Laura Sánchez",
    rating: 5,
    text: "Mi Motorola no cargaba más y pensé que era la batería. Resultó ser el pin de carga. Me lo arreglaron en el momento y no me cobraron caro. Muy honestos!",
    date: "Hace 1 semana",
  },
  {
    author: "Roberto Silva",
    rating: 5,
    text: "Llevé un iPhone con problemas de cámara y Touch ID. Lo dejaron funcionando perfecto con garantía escrita. El local está impecable y tienen equipamiento profesional.",
    date: "Hace 3 semanas",
  },
];

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

export default function GoogleReviews() {
  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1);

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
          <StarRating rating={parseFloat(averageRating)} />
          <span className="text-2xl font-bold text-primary">{averageRating}</span>
          <span className="text-slate-600 dark:text-slate-400">
            ({reviews.length} reseñas en Google)
          </span>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          La confianza de nuestros clientes es lo que nos impulsa a seguir mejorando cada día.
          Estas son algunas de las opiniones reales de quienes confiaron en nosotros.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {review.author}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {review.date}
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
          </Card>
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

import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "API key o Place ID no configurado" },
      { status: 500 }
    );
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=es`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews.authorAttribution,reviews.rating,reviews.text,reviews.originalText,reviews.publishTime,reviews.relativePublishTimeDescription",
        "Referer": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      },
      // Caché de 5 días (432000 segundos) - las reseñas no cambian frecuentemente
      next: { revalidate: 432000 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText } };
      }
      
      const errorMessage = errorData.error?.message || errorData.error || "Error desconocido";
      
      return NextResponse.json(
        { 
          error: `Error de Google API: ${errorMessage}`,
          status: response.status
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Mapear todas las reseñas con su idioma original
    const allReviews = (data.reviews || []).map((review: any) => ({
      author_name: review.authorAttribution?.displayName || "Usuario de Google",
      profile_photo_url: review.authorAttribution?.photoUri || null,
      rating: review.rating || 0,
      // Mantener el idioma original de la reseña
      text: review.originalText?.text || review.text?.text || "",
      relative_time_description: review.relativePublishTimeDescription || "Recientemente",
      time: review.publishTime ? new Date(review.publishTime).getTime() / 1000 : Date.now() / 1000,
    }));

    // Ordenar por rating y tiempo: primero 5 estrellas más recientes
    const sortedReviews = allReviews
      .sort((a: any, b: any) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.time - a.time;
      });

    const result = {
      rating: data.rating || 0,
      user_ratings_total: data.userRatingCount || 0,
      reviews: sortedReviews,
    };

    return NextResponse.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    
    return NextResponse.json(
      { 
        error: "Error al cargar las reseñas",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

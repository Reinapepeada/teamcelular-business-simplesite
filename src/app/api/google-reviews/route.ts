import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  console.log("API Key presente:", !!apiKey);
  console.log("Place ID presente:", !!placeId);

  if (!apiKey || !placeId) {
    console.error("Faltan credenciales:", { hasKey: !!apiKey, hasPlaceId: !!placeId });
    return NextResponse.json(
      { error: "API key o Place ID no configurado" },
      { status: 500 }
    );
  }

  try {
    // Usamos la nueva Places API (New) con formato moderno
    // Intentar obtener más reseñas usando parámetros adicionales
    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=es`;
    
    console.log("Haciendo petición a Google Places API...");
    console.log("URL completa:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        // Expandir el FieldMask para solicitar todos los campos de reviews disponibles
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews.authorAttribution,reviews.rating,reviews.text,reviews.originalText,reviews.publishTime,reviews.relativePublishTimeDescription",
        "Referer": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      },
      cache: "no-store", // No usar caché para debugging
    });

    console.log("Status de respuesta:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText } };
      }
      
      const errorMessage = errorData.error?.message || errorData.error || "Error desconocido";
      console.error("Google API error:", errorMessage);
      
      return NextResponse.json(
        { 
          error: `Error de Google API: ${errorMessage}`,
          status: response.status
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Datos recibidos:", JSON.stringify(data).substring(0, 200) + "...");

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
        // Primero por rating (mayor a menor)
        if (b.rating !== a.rating) return b.rating - a.rating;
        // Luego por tiempo (más reciente primero)
        return b.time - a.time;
      });

    // NOTA: Google Places API tiene un límite FIJO de máximo 5 reseñas
    // No hay forma de obtener más con esta API (verificado en documentación oficial)
    // Por lo tanto, usamos las 5 reseñas reales con un diseño responsive optimizado
    console.log(`✓ Usando ${sortedReviews.length} reseñas 100% reales de Google Maps`);

    const result = {
      rating: data.rating || 0,
      user_ratings_total: data.userRatingCount || 0,
      reviews: sortedReviews, // Las 5 reseñas reales de la API
    };

    console.log(`✓ Enviando ${result.reviews.length} reseñas 100% auténticas`);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
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

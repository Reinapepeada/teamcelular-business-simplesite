export interface GoogleReview {
    author_name: string;
    profile_photo_url?: string | null;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
    author_url?: string;
    review_url?: string;
}

export interface PlaceDetails {
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
}

function googleMapsUrl(value: unknown): string | undefined {
    if (typeof value !== "string") return undefined;
    try {
        const url = new URL(value);
        if (url.protocol === "https:" && (url.hostname === "google.com" || url.hostname.endsWith(".google.com"))) return url.href;
    } catch { /* No publicar enlaces externos inválidos. */ }
    return undefined;
}

export function normalizeGoogleReviews(data: unknown): PlaceDetails | null {
    if (!data || typeof data !== "object") return null;
    const place = data as Record<string, unknown>;
    if (typeof place.rating !== "number" || !Number.isFinite(place.rating) || place.rating < 1 || place.rating > 5 ||
        typeof place.userRatingCount !== "number" || !Number.isInteger(place.userRatingCount) || place.userRatingCount < 1) return null;
    const reviews: GoogleReview[] = [];
    for (const value of Array.isArray(place.reviews) ? place.reviews : []) {
        if (!value || typeof value !== "object") continue;
        const review = value as Record<string, any>;
        const source = googleMapsUrl(review.googleMapsUri);
        const text = review.originalText?.text || review.text?.text;
        if (!source || typeof text !== "string" || !text.trim() ||
            typeof review.rating !== "number" || !Number.isFinite(review.rating) || review.rating < 1 || review.rating > 5) continue;
        const published = typeof review.publishTime === "string" ? Date.parse(review.publishTime) : NaN;
        reviews.push({
            author_name: typeof review.authorAttribution?.displayName === "string" ? review.authorAttribution.displayName : "Usuario de Google",
            profile_photo_url: typeof review.authorAttribution?.photoUri === "string" ? review.authorAttribution.photoUri : null,
            author_url: googleMapsUrl(review.authorAttribution?.uri),
            review_url: source,
            rating: review.rating,
            text,
            relative_time_description: typeof review.relativePublishTimeDescription === "string" ? review.relativePublishTimeDescription : "",
            time: Number.isFinite(published) ? published / 1000 : 0,
        });
    }
    // Conservar la relevancia que entrega Google; no seleccionar por estrellas.
    return { rating: place.rating, user_ratings_total: place.userRatingCount, reviews };
}

export async function getGoogleReviews(): Promise<PlaceDetails | null> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        return null;
    }

    try {
        const response = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}?languageCode=es`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask":
                        "displayName,rating,userRatingCount,reviews.authorAttribution,reviews.googleMapsUri,reviews.rating,reviews.text,reviews.originalText,reviews.publishTime,reviews.relativePublishTimeDescription",
                    Referer:
                        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
                },
                next: { revalidate: 432000 },
            },
        );

        if (!response.ok) {
            return null;
        }

        return normalizeGoogleReviews(await response.json());
    } catch (error) {
        console.error("Error loading Google reviews", error);
        return null;
    }
}

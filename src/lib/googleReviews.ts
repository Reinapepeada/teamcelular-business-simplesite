export interface GoogleReview {
    author_name: string;
    profile_photo_url?: string | null;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
}

export interface PlaceDetails {
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
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
                        "displayName,rating,userRatingCount,reviews.authorAttribution,reviews.rating,reviews.text,reviews.originalText,reviews.publishTime,reviews.relativePublishTimeDescription",
                    Referer:
                        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
                },
                next: { revalidate: 432000 },
            },
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        const reviews = (data.reviews || [])
            .map((review: any) => ({
                author_name:
                    review.authorAttribution?.displayName || "Usuario de Google",
                profile_photo_url: review.authorAttribution?.photoUri || null,
                rating: review.rating || 0,
                text: review.originalText?.text || review.text?.text || "",
                relative_time_description:
                    review.relativePublishTimeDescription || "Recientemente",
                time: review.publishTime
                    ? new Date(review.publishTime).getTime() / 1000
                    : Date.now() / 1000,
            }))
            .sort((a: GoogleReview, b: GoogleReview) => {
                if (b.rating !== a.rating) return b.rating - a.rating;
                return b.time - a.time;
            });

        return {
            rating: data.rating || 0,
            user_ratings_total: data.userRatingCount || 0,
            reviews,
        };
    } catch (error) {
        console.error("Error loading Google reviews", error);
        return null;
    }
}

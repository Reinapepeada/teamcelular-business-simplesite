import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/googleReviews";

export async function GET() {
    try {
        const reviews = await getGoogleReviews();

        if (!reviews) {
            return NextResponse.json(
                { error: "Google reviews no disponibles" },
                { status: 500 },
            );
        }

        return NextResponse.json(reviews);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Error desconocido";

        return NextResponse.json(
            {
                error: "Error al cargar las resenas",
                details: errorMessage,
            },
            { status: 500 },
        );
    }
}

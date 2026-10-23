import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeGoogleReviews } from "./googleReviews.ts";

test("Las reseñas conservan relevancia, fuente, autor y fecha sin privilegiar cinco estrellas", () => {
    const result = normalizeGoogleReviews({ rating: 4.6, userRatingCount: 120, reviews: [
        { rating: 3, originalText: { text: "Texto original del cliente." }, text: { text: "Traducción." }, authorAttribution: { displayName: "Autor de prueba", uri: "https://www.google.com/maps/contrib/123" }, googleMapsUri: "https://www.google.com/maps/reviews/primera", publishTime: "2026-10-01T12:00:00Z" },
        { rating: 5, originalText: { text: "Segunda opinión." }, googleMapsUri: "https://maps.google.com/maps/reviews/segunda" },
    ] });
    assert.equal(result?.user_ratings_total, 120);
    assert.deepEqual(result?.reviews.map(review => review.rating), [3, 5]);
    assert.equal(result?.reviews[0].text, "Texto original del cliente.");
    assert.equal(result?.reviews[0].author_url, "https://www.google.com/maps/contrib/123");
    assert.equal(result?.reviews[0].review_url, "https://www.google.com/maps/reviews/primera");
    assert.equal(result?.reviews[0].time, 1790856000);
    assert.equal(result?.reviews[1].time, 0);
    assert.equal(result?.reviews[1].relative_time_description, "");
});

test("Una respuesta incompleta no fabrica reputación, fuentes ni fechas", () => {
    for (const invalid of [null, {}, { rating: 0, userRatingCount: 0 }, { rating: 6, userRatingCount: 2 }]) assert.equal(normalizeGoogleReviews(invalid), null);
    const result = normalizeGoogleReviews({ rating: 4, userRatingCount: 10, reviews: [
        { rating: 5, originalText: { text: "Sin fuente" } },
        { rating: 5, originalText: { text: "Enlace inseguro" }, googleMapsUri: "javascript:alert(1)" },
        { rating: 5, originalText: { text: "Dominio engañoso" }, googleMapsUri: "https://www.google.com.ejemplo.test/reviews/1" },
        { rating: 4, text: { text: "Opinión con fuente" }, googleMapsUri: "https://www.google.com/maps/reviews/1", publishTime: "incorrecta", authorAttribution: { uri: "https://otro.test/" } },
    ] });
    assert.equal(result?.rating, 4);
    assert.equal(result?.reviews.length, 1);
    assert.equal(result?.reviews[0].author_url, undefined);
    assert.equal(result?.reviews[0].time, 0);
});

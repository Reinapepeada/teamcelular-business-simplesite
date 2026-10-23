// Evita que SSR/build de las pruebas consulte servicios reales por un fallback.
const original = globalThis.fetch;
globalThis.fetch = (input, options) => {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
    // Respuesta sintética local: nunca consulta Places ni usa credenciales reales.
    if (url.origin === 'https://places.googleapis.com' && url.pathname === '/v1/places/fixture-recoleta') {
        return Promise.resolve(Response.json({ rating: 4.5, userRatingCount: 12, reviews: [
            { rating: 3, originalText: { text: 'Reseña ficticia para probar la lectura completa sin conexiones externas. '.repeat(8) }, authorAttribution: { displayName: 'Cliente ficticio A', uri: 'https://www.google.com/maps/contrib/fixture-a' }, googleMapsUri: 'https://www.google.com/maps/reviews/fixture-a' },
            { rating: 5, originalText: { text: 'Segunda reseña ficticia.' }, authorAttribution: { displayName: 'Cliente ficticio B' }, googleMapsUri: 'https://www.google.com/maps/reviews/fixture-b' },
        ] }));
    }
    if (!['127.0.0.1', 'localhost', '::1'].includes(url.hostname)) {
        throw new Error('Las pruebas de comercio solo permiten fetch a loopback');
    }
    return original(input, options);
};

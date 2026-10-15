// Evita que SSR/build de las pruebas consulte servicios reales por un fallback.
const original = globalThis.fetch;
globalThis.fetch = (input, options) => {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
    if (!['127.0.0.1', 'localhost', '::1'].includes(url.hostname)) {
        throw new Error('Las pruebas de comercio solo permiten fetch a loopback');
    }
    return original(input, options);
};

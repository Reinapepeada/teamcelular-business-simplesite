import { test, expect, type APIRequestContext } from '@playwright/test';

const googlebot = { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', Accept: 'text/html' };
const fixture = (failure = '') => `http://127.0.0.1:3101/__fixture/seo?failure=${failure}`;

test.afterEach(async ({ request }) => { await request.get(fixture()); });
// El SSR recuerda una falla 5 s para no esperar otro plazo en el render de error.
const recuperar = async (request: APIRequestContext) => {
    await request.get(fixture());
    await new Promise(resolve => setTimeout(resolve, 5_100));
};

test('sitemap: falla temporal de facetas no publica una lista recortada con 200', async ({ request }) => {
    await request.get(fixture('facets'));
    expect((await request.get('/sitemap.xml', { headers: googlebot })).status()).toBe(500);
    await request.get(fixture());
    const recovered = await request.get('/sitemap.xml', { headers: googlebot });
    expect(recovered.status()).toBe(200);
    expect(await recovered.text()).toContain('/tienda/funda-prueba');
});

test('sitemap: falla temporal de productos no elimina las fichas de la lista', async ({ request }) => {
    await request.get(fixture('listing'));
    expect((await request.get('/sitemap.xml', { headers: googlebot })).status()).toBe(500);
});

for (const [failure, path] of [
    ['facets', '/tienda/categoria/accesorios'],
    ['listing', '/tienda/categoria/accesorios'],
    ['listing', '/tienda'],
    ['listing', '/tienda?page=2'],
    ['product', '/tienda/funda-prueba'],
]) {
    test(`falla de ${failure} en ${path} conserva respuesta temporal y recupera la URL`, async ({ request }) => {
        await request.get(fixture(failure));
        expect((await request.get(path, { headers: googlebot })).status()).toBe(500);
        await recuperar(request);
        const recovered = await request.get(path, { headers: googlebot });
        expect(recovered.status()).toBe(200);
        expect(await recovered.text()).toContain('rel="canonical"');
    });
}

for (const [failure, path] of [
    ['reset-once-product', '/tienda/funda-prueba'],
    ['bad-gateway-once-listing', '/tienda/categoria/accesorios'],
    ['stall-once-listing', '/tienda'],
]) {
    test(`una falla suelta (${failure}) en ${path} se reintenta y responde 200 con contenido`, async ({ request }) => {
        expect((await request.get(path, { headers: googlebot })).status()).toBe(200);
        await request.get(fixture(failure));
        const response = await request.get(path, { headers: googlebot });
        expect(response.status()).toBe(200);
        expect(await response.text()).toContain('Funda de prueba');
    });
}

test('categoría y producto realmente inexistentes siguen respondiendo 404', async ({ request }) => {
    for (const path of ['/tienda/categoria/no-publicada', '/tienda/no-publicado']) {
        expect((await request.get(path, { headers: googlebot })).status()).toBe(404);
    }
});

test('la pantalla de falla permite reintentar sin crear pedidos ni cambiar catálogo', async ({ page, request }) => {
    await page.route('**/*', route => ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
    await request.get(fixture('listing'));
    await page.goto('/tienda/categoria/accesorios');
    await expect(page.getByRole('heading', { name: 'No pudimos cargar la tienda' })).toBeVisible();
    await recuperar(request);
    await page.getByRole('button', { name: 'Reintentar', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Accesorios', exact: true, level: 1 })).toBeVisible();
});

test('categoría comparte las lecturas de metadata, contenido y filtros solo dentro del render', async ({ request }) => {
    await request.get(fixture());
    for (const count of [1, 2]) {
        const response = await request.get('/tienda/categoria/accesorios', { headers: googlebot });
        expect(response.status()).toBe(200);
        expect(await response.text()).toContain('Funda de prueba');
        const calls = await (await request.get('http://127.0.0.1:3101/__fixture/catalog-counts')).json();
        expect(calls['/store/products']).toBe(count);
        expect(calls['/store/facets']).toBe(count);
    }
});

for (const [failure, path, status] of [
    ['stall-listing', '/tienda', 500],
    ['stall-facets', '/tienda', 200],
    ['stall-facets', '/tienda/categoria/accesorios', 500],
    ['serial-stall-listing', '/tienda/categoria/accesorios', 500],
    ['serial-slow-success', '/tienda/categoria/accesorios', 200],
    ['stall-product-body', '/tienda/funda-prueba', 500],
    ['stall-listing', '/feed/google.xml', 503],
] as const) {
    test(`el presupuesto SSR resuelve ${failure} en ${path} sin confundir fallas con ausencia`, async ({ request }, testInfo) => {
        // Compilar la ruta antes de medir el plazo de red, sin incluir arranque de dev.
        expect((await request.get(path, { headers: googlebot })).status()).toBe(200);
        await request.get(fixture(failure));
        const started = Date.now();
        const response = await request.get(path, { headers: googlebot });
        const elapsed = Date.now() - started;
        const calls = await (await request.get('http://127.0.0.1:3101/__fixture/catalog-counts')).json();
        await testInfo.attach('catalog-deadline', { body: JSON.stringify({ elapsed_ms: elapsed, calls }), contentType: 'application/json' });
        expect(response.status()).toBe(status);
        // Un solo plazo de 8 s por solicitud aunque Next repita el render para la página de error
        // (antes 16 s); el caso en serie suma la relectura de 3 s de facetas en ese segundo render.
        expect(elapsed).toBeLessThan(14_000);
        if (status === 200) expect(await response.text()).toContain('Funda de prueba');
        await recuperar(request);
        const recovered = await request.get(path, { headers: googlebot });
        expect(recovered.status()).toBe(200);
        expect(await recovered.text()).toContain(path === '/feed/google.xml' ? '<rss' : 'rel="canonical"');
    });
}

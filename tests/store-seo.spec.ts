import { test, expect } from '@playwright/test';

const googlebot = { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', Accept: 'text/html' };
const fixture = (failure = '') => `http://127.0.0.1:3101/__fixture/seo?failure=${failure}`;

test.afterEach(async ({ request }) => { await request.get(fixture()); });

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
        await request.get(fixture());
        const recovered = await request.get(path, { headers: googlebot });
        expect(recovered.status()).toBe(200);
        expect(await recovered.text()).toContain('rel="canonical"');
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
    await request.get(fixture());
    await page.getByRole('button', { name: 'Reintentar', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Accesorios', exact: true, level: 1 })).toBeVisible();
});

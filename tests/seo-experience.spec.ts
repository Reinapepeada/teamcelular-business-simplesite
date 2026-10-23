import { test, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const routes = [
    '/', '/guias', '/guias/reparacion-iphone-buenos-aires', '/guias/reparacion-infinix-buenos-aires',
    '/reparaciones/cambio-camara-caba', '/reparaciones/cambio-bateria-caba',
    '/guias/reparacion-motorola-buenos-aires', '/guias/reparacion-xiaomi-buenos-aires',
    '/guias/reparacion-samsung-buenos-aires', '/guias/cambio-bateria-celular',
    '/guias/reparacion-pantalla-celular', '/guias/celular-mojado-que-hacer',
    '/guias/mantenimiento-preventivo-celulares', '/guias/soporte-empresas-servicio-tecnico',
    '/reparaciones', '/reparaciones/iphone/13', '/reparaciones/reparacion-audio-celular-caba',
    '/reparaciones/recuperacion-celular-mojado-caba', '/reparaciones/cambio-tapa-caba',
    '/zonas/palermo', '/zonas/balvanera', '/sucursales', '/sucursales/caba/recoleta',
    '/sucursales/caba/belgrano', '/sobrenosotros', '/lab', '/contacto',
    '/presupuesto-reparacion', '/en/phone-repair-buenos-aires', '/tienda', '/tienda/funda-prueba',
];

test.beforeEach(async ({ page }) => {
    await page.route('**/*', route =>
        ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname)
            ? route.continue() : route.abort());
});

for (const width of [390, 1280]) {
    test(`Familias del sitio: lectura, imágenes y HTML a ${width}px`, async ({ page }) => {
        test.setTimeout(240_000);
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        const metrics = [];
        for (const [index, route] of routes.entries()) {
            const response = await page.goto(route);
            expect(response!.status(), route).toBe(200);
            await expect(page.locator('main h1'), route).toHaveCount(1);
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
            const images = await page.locator('main img').evaluateAll(elements => elements.map(el => ({ src: el.getAttribute('src'), alt: el.getAttribute('alt') })));
            for (const image of images) {
                expect(image.alt, route).toBeTruthy();
                expect(decodeURIComponent(image.src ?? ''), route).not.toMatch(/guia_|portada_|micro_diagnos|handsome-young|landing-(cambio-camara|audio-celular|celular-mojado)/);
            }
            for (const raw of await page.locator('script[type="application/ld+json"]').allTextContents()) expect(() => JSON.parse(raw), route).not.toThrow();
            metrics.push({ route, width, ...await page.evaluate(() => ({ height: document.documentElement.scrollHeight, visibleWords: document.querySelector('main')!.innerText.split(/\s+/).length })) });
            await page.screenshot({ path: test.info().outputPath(`family-${width}-${index}.png`) });
        }
        await writeFile(test.info().outputPath(`metrics-${width}.json`), JSON.stringify(metrics, null, 2));
        expect(errors).toEqual([]);
    });
}

test('Guías: precio adelantado, detalle nativo y enlaces conservados sin JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
    const page = await context.newPage();
    await page.route('**/*', route => ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
    for (const brand of ['iphone', 'motorola', 'xiaomi']) {
        await page.goto(`http://127.0.0.1:3100/guias/reparacion-${brand}-buenos-aires`);
        const prices = page.locator(`#costos-reparacion-${brand}`);
        expect((await prices.boundingBox())!.y).toBeLessThan(1800);
        await expect(prices.locator('tbody tr')).not.toHaveCount(0);
        const optional = page.locator('article > details').first();
        await optional.locator('summary').focus();
        await page.keyboard.press('Enter');
        await expect(optional).toHaveAttribute('open', '');
        await expect(optional.locator('p').first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.goto('http://127.0.0.1:3100/guias/reparacion-infinix-buenos-aires');
    const detail = page.locator('main details').filter({ has: page.locator('summary h3') }).first();
    await detail.locator('summary').click();
    await expect(detail.locator('p')).toBeVisible();
    await expect(page.locator('main header')).toContainText('Se cobra aunque no se repare');
    await page.goto('http://127.0.0.1:3100/guias');
    expect(await page.locator('main li h3 a[href^="/guias/"]').count()).toBeGreaterThan(20);
    await context.close();
});

test('Navegación por teclado: saltar contenido, cerrar menú y recuperar foco', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#contenido-principal')).toBeFocused();
    const toggle = page.getByRole('button', { name: 'Abrir menu' });
    await toggle.click();
    await expect(page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('link', { name: 'Reparaciones', exact: true })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('Presupuesto: valida la falla y conserva precio, revisión y sucursal', async ({ page }) => {
    await page.goto('/presupuesto-reparacion#solicitar-presupuesto');
    const submit = page.getByRole('button', { name: 'Pedir presupuesto por WhatsApp', exact: true });
    await submit.click();
    await expect(page.locator('main').getByRole('alert')).toContainText('Tocá qué le pasa');
    await page.getByRole('button', { name: 'Pantalla', exact: true }).click();
    await page.getByPlaceholder('Ej: iPhone 13, Galaxy A54, Moto G54').fill('iPhone 13');
    await expect(page.getByText('Precio de referencia', { exact: true })).toBeVisible();
    await expect(page.locator('main')).toContainText('249.900');
    await submit.click();
    await expect(page.locator('main').getByRole('alert')).toContainText('sucursal');
    await page.getByRole('button', { name: 'Placa', exact: true }).click();
    await expect(page.getByText('Revisión de placa', { exact: true })).toBeVisible();
    await expect(page.locator('main')).toContainText('45.000');
    await expect(page.locator('main')).toContainText('aunque no');
    // WhatsApp is fulfilled locally: this never sends a real message or creates an order.
    await page.route('https://wa.me/**', route => route.fulfill({ contentType: 'text/html', body: '<p>WhatsApp ficticio de prueba</p>' }));
    await page.route('**/api/lead-interactions', route => route.fulfill({ json: { ok: true } }));
    await page.getByRole('button', { name: /Belgrano.*Amenábar/ }).click();
    const destination = page.waitForRequest(request => request.url().startsWith('https://wa.me/'));
    await submit.click();
    const url = new URL((await destination).url());
    expect(url.pathname).toBe('/5491131739099');
    expect(url.searchParams.get('text')).toContain('iPhone 13');
    expect(url.searchParams.get('text')).toContain('Pantalla');
    expect(url.searchParams.get('text')).toContain('Placa');
});

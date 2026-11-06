import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.route('**/*', route =>
        ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname)
            ? route.continue() : route.abort());
});

const pages = [
    '/',
    '/guias/celular-mojado-que-hacer',
    '/guias/pantalla-con-lineas-causas-reparacion',
    '/guias/face-id-touch-id-no-funciona',
    '/guias/celular-con-virus-que-hacer',
    '/guias/reparacion-google-pixel-buenos-aires',
];

for (const [width, height] of [[360, 640], [390, 844], [1280, 800]]) {
    for (const path of pages) {
        test(`WhatsApp del hero sobre el pliegue en ${path} a ${width}x${height}`, async ({ page }) => {
            await page.setViewportSize({ width, height });
            await page.goto(path);
            const hero = page.locator('h1').locator('xpath=ancestor::*[self::header or self::section][1]');
            const cta = hero.getByText('Consultar por WhatsApp', { exact: true });
            await expect(cta).toBeVisible();
            const box = (await cta.boundingBox())!;
            // La barra CTA fija de móvil tapa el borde inferior.
            expect(box.y + box.height).toBeLessThanOrEqual(height - (width < 768 ? 80 : 0));
            if (['/', '/guias/celular-mojado-que-hacer'].includes(path)) await page.screenshot({ path: test.info().outputPath(`hero-${width}.png`) });
        });
    }
}

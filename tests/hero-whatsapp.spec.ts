import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.route('**/*', route =>
        ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname)
            ? route.continue() : route.abort());
});

const pages = [
    ['/', 'Consultar por WhatsApp'],
    ['/guias/celular-mojado-que-hacer', 'Hablar por WhatsApp'],
    ['/guias/pantalla-con-lineas-causas-reparacion', 'Hablar por WhatsApp'],
    ['/guias/face-id-touch-id-no-funciona', 'Hablar por WhatsApp'],
    ['/guias/celular-con-virus-que-hacer', 'Hablar por WhatsApp'],
    ['/guias/reparacion-google-pixel-buenos-aires', 'Hablar por WhatsApp'],
];

for (const [width, height] of [[360, 640], [390, 844], [1280, 800]]) {
    for (const [path, label] of pages) {
        test(`WhatsApp del hero sobre el pliegue en ${path} a ${width}x${height}`, async ({ page }) => {
            await page.setViewportSize({ width, height });
            await page.goto(path);
            const cta = page.locator('main').getByText(label, { exact: true }).first();
            await expect(cta).toBeVisible();
            const box = (await cta.boundingBox())!;
            // La barra CTA fija de móvil tapa el borde inferior.
            expect(box.y + box.height).toBeLessThanOrEqual(height - (width < 768 ? 80 : 0));
            if (path === '/') await page.screenshot({ path: test.info().outputPath(`hero-${width}.png`) });
        });
    }
}

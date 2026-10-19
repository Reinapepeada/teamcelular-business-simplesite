import { test, expect } from '@playwright/test';

// Estos recorridos usan sólo los servicios ficticios del entorno de pruebas.
test.beforeEach(async ({ page }) => {
    await page.route('**/*', route =>
        ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname)
            ? route.continue() : route.abort());
});

for (const width of [320, 390, 1280]) {
    test(`Palermo: precios legibles antes de la imagen a ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/zonas/palermo');
        const table = page.locator('#precios table');
        await expect(table).toBeVisible();
        await expect(table.locator('thead th')).toHaveCount(2);
        await expect(table.locator('tbody tr')).toHaveCount(6);
        const tableBox = await table.boundingBox();
        const imageBox = await page.locator('.tc-zoom img').first().boundingBox();
        expect(tableBox!.y + tableBox!.height).toBeLessThan(imageBox!.y);
        expect(await table.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(page.locator('article a[href^="/reparaciones/"]')).toHaveCount(4);
        await table.screenshot({ path: test.info().outputPath(`palermo-${width}.png`) });
    });

    test(`Pin: precio y revisión accesibles por modelo a ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/reparaciones/cambio-pin-carga-caba');
        const prices = page.locator('main dl').first();
        await expect(prices).toBeVisible();
        await expect(prices.locator('dt')).toHaveCount(2);
        const pricesBox = await prices.boundingBox();
        const imageBox = await page.locator('.tc-zoom img').first().boundingBox();
        if (width < 1024) expect(pricesBox!.y + pricesBox!.height).toBeLessThan(imageBox!.y);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(page.getByRole('link', { name: 'Consultar precio para mi modelo', exact: true }))
            .toHaveAttribute('href', '/presupuesto-reparacion#solicitar-presupuesto');
        await expect(page.locator('main a[href="/guias/pin-de-carga-suelto-solucion"]')).toBeVisible();
        await prices.screenshot({ path: test.info().outputPath(`pin-${width}.png`) });
    });
}

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.route('**/*', route =>
        ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname)
            ? route.continue() : route.abort());
});

for (const width of [320, 390, 1280]) {
    test(`Inicio: lectura breve, FAQ por teclado y oferta accesible a ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/');
        await page.screenshot({ path: test.info().outputPath(`inicio-${width}.png`) });
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.getByRole('navigation', { name: 'Reparaciones por marca' }).getByRole('link')).toHaveCount(4);
        expect((await page.locator('#repairs-title').boundingBox())!.y).toBeLessThan(1600);
        await expect(page.locator('#precios')).toContainText('Revisión técnica: ARS 15.000 a ARS 25.000');
        const faq = page.locator('#faq-title').locator('..').locator('details').first();
        await faq.locator('summary').focus();
        await page.keyboard.press('Enter');
        await expect(faq).toHaveAttribute('open', '');
        await expect(faq.locator('p')).toBeVisible();
        const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
        const data = schema.map(value => JSON.parse(value)).find(value => value['@type'] === 'FAQPage');
        expect(data.mainEntity[0].acceptedAnswer.text).toBe(await faq.locator('p').textContent());
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });

    test(`Pantalla: precio antes de ilustración y comparación desplegable a ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/reparaciones/cambio-pantalla-caba');
        await expect(page.locator('main dl').first()).toContainText('249.900');
        const prices = await page.locator('main dl').first().boundingBox();
        const image = await page.locator('main figure img').first().boundingBox();
        if (width < 1024) expect(prices!.y + prices!.height).toBeLessThan(image!.y);
        const comparison = page.getByText('Qué comparar al cambiar la pantalla', { exact: true });
        await comparison.click();
        await expect(page.getByText('Módulo completo.', { exact: true })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.screenshot({ path: test.info().outputPath(`pantalla-${width}.png`), fullPage: true });
    });

    test(`Samsung: detalle disponible sin desbordar a ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/guias/reparacion-samsung-buenos-aires');
        await expect(page.locator('h1')).toHaveCount(1);
        const process = page.locator('summary').filter({ hasText: '¿Cómo es el proceso de reparación de Samsung' });
        await process.click();
        await expect(page.getByRole('heading', { name: 'Buscamos la falla de origen' })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.screenshot({ path: test.info().outputPath(`samsung-${width}.png`), fullPage: true });
    });
}

for (const [slug, phone] of [['recoleta', '+541151034595'], ['belgrano', '+541131739099']]) {
    test(`Sucursal ${slug}: teléfono propio y acceso directo a Maps`, async ({ page }) => {
        await page.goto(`/sucursales/caba/${slug}`);
        await expect(page.locator('header').getByRole('link', { name: /Llamar/ })).toHaveAttribute('href', `tel:${phone}`);
        await expect(page.getByRole('link', { name: 'Cómo llegar en Maps' })).toHaveAttribute('href', /^https:\/\/share\.google\//);
        expect(await page.locator('main details').count()).toBeGreaterThan(0);
    });
}

test('La información de presupuesto y las FAQ funcionan sin JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.route('**/*', route => ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
    await page.goto('http://127.0.0.1:3100/');
    const summary = page.getByText('Qué comparar al cambiar la pantalla', { exact: true });
    await summary.click();
    await expect(page.getByText('Módulo completo.', { exact: true })).toBeVisible();
    await expect(page.locator('a[href="/presupuesto-reparacion#solicitar-presupuesto"]').first()).toBeVisible();
    await context.close();
});

for (const width of [320, 390, 1280]) {
    test(`Sucursales: cobertura rastreable sin JavaScript a ${width}px`, async ({ browser }) => {
        const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } });
        const page = await context.newPage();
        await page.route('**/*', route => ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
        await page.goto('http://127.0.0.1:3100/sucursales');
        const coverage = page.getByRole('navigation', { name: 'Cómo llegar desde otros barrios' });
        await expect(coverage).toBeVisible();
        await expect(coverage.getByRole('link')).toHaveCount(2);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        for (const [label, path] of [['Desde Palermo', '/zonas/palermo'], ['Desde Balvanera / Once', '/zonas/balvanera']]) {
            await expect(coverage.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', path);
            const response = await page.request.get(path);
            expect(response.status()).toBe(200);
        }
        await page.screenshot({ path: test.info().outputPath(`cobertura-${width}.png`), fullPage: true });
        await context.close();
    });
}

test('El botón primario conserva contraste AA en reposo y hover', async ({ page }) => {
    await page.goto('/sucursales');
    const button = page.locator('main .tc-btn-primary').first();
    for (const state of ['normal', 'hover']) {
        if (state === 'hover') {
            await button.hover();
            await button.evaluate(async element => {
                await Promise.all(element.getAnimations().map(animation => animation.finished));
            });
        }
        await expect.poll(async () => button.evaluate(element => {
            const style = getComputedStyle(element);
            const luminance = (color: string) => {
                const rgb = color.match(/[\d.]+/g)!.slice(0, 3).map(value => Number(value) / 255);
                return rgb.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
                    .reduce((total, value, index) => total + value * [0.2126, 0.7152, 0.0722][index], 0);
            };
            const fg = luminance(style.color);
            const bg = luminance(style.backgroundColor);
            return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
        })).toBeGreaterThanOrEqual(4.5);
    }
});

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.route('**/*', route => {
        const request = route.request();
        const url = new URL(request.url());
        return ['127.0.0.1', 'localhost'].includes(url.hostname)
            && request.method() === 'GET'
            && !url.pathname.startsWith('/api/')
            ? route.continue() : route.abort();
    });
});

for (const width of [320, 390]) {
    test(`Menú móvil ${width}px: un enlace a la página actual cierra y libera el scroll`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/contacto');
        const toggle = page.getByRole('button', { name: 'Abrir menu', exact: true });
        await toggle.click();
        const menu = page.getByRole('navigation', { name: 'Navegación móvil' });
        await expect(menu.getByRole('link', { name: 'Reparaciones', exact: true })).toBeFocused();
        const current = menu.getByRole('link', { name: 'Contacto', exact: true });
        await expect(current).toHaveAttribute('aria-current', 'page');
        await page.screenshot({ path: test.info().outputPath(`menu-mobile-${width}.png`) });
        await current.focus();
        await page.keyboard.press('Enter');
        await expect(menu).toHaveCount(0);
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });

    test(`Menú móvil ${width}px: presupuesto en la misma ruta deja ver el formulario`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/presupuesto-reparacion');
        await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
        const menu = page.getByRole('navigation', { name: 'Navegación móvil' });
        await menu.getByRole('link', { name: 'Pedir presupuesto', exact: true }).click();
        await expect(page).toHaveURL(/\/presupuesto-reparacion#solicitar-presupuesto$/);
        await expect(menu).toHaveCount(0);
        expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
        await expect(page.locator('#solicitar-presupuesto')).toBeVisible();
    });
}

test('Menú móvil: el selector de sucursal y Escape conservan sus propios focos', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/contacto');
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    const menu = page.getByRole('navigation', { name: 'Navegación móvil' });
    const whatsapp = menu.getByRole('button', { name: 'Abrir WhatsApp', exact: true });
    await whatsapp.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(menu).toBeVisible();
    await expect(whatsapp).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(menu).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Abrir menu', exact: true })).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('Menú de escritorio: página actual y salida por Tab cierran Más', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/contacto');
    const more = page.getByRole('button', { name: 'Más', exact: true });
    await more.click();
    const dropdown = page.locator('#more-site-links');
    const current = dropdown.getByRole('link', { name: 'Contacto', exact: true });
    await expect(current).toHaveAttribute('aria-current', 'page');
    await current.focus();
    await page.keyboard.press('Enter');
    await expect(dropdown).toHaveCount(0);
    await expect(more).toBeFocused();

    await more.click();
    await dropdown.getByRole('link', { name: 'Sobre nosotros', exact: true }).focus();
    await page.keyboard.press('Tab');
    await expect(dropdown).toHaveCount(0);
    await expect(more).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('header').first().getByRole('link', { name: 'Presupuesto', exact: true })).toBeFocused();
});

for (const width of [320, 390, 1280]) {
    test(`Contacto ${width}px: ambas sedes aparecen antes de las preguntas y tienen destinos propios`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        const response = await page.goto('/contacto');
        expect(response!.status()).toBe(200);
        await expect(page.locator('main h1')).toHaveCount(1);
        const faq = page.getByRole('heading', { name: 'Preguntas frecuentes', exact: true });
        for (const branch of ['Recoleta', 'Belgrano']) {
            const heading = page.getByRole('heading', { name: `Sucursal ${branch}`, exact: true });
            await expect(heading).toBeVisible();
            expect((await heading.boundingBox())!.y).toBeLessThan((await faq.boundingBox())!.y);
            await expect(page.locator('main').getByRole('link', { name: `Ver contacto de ${branch}`, exact: true }))
                .toHaveAttribute('href', `/sucursales/caba/${branch.toLowerCase()}`);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.screenshot({ path: test.info().outputPath(`contacto-${width}.png`) });
        const branchSection = page.getByRole('heading', { name: 'Nuestras sucursales en CABA', exact: true }).locator('..');
        await branchSection.scrollIntoViewIfNeeded();
        await page.screenshot({ path: test.info().outputPath(`contacto-sedes-${width}.png`) });
        expect(errors).toEqual([]);
    });
}

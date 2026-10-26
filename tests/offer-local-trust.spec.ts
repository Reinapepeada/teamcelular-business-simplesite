import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.route('**/*', route => ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

test('La consulta de precio conserva el modelo y pide el alcance sin añadir pasos', async ({ page }) => {
    await page.goto('/guias/reparacion-iphone-buenos-aires');
    await page.getByLabel('Elegí tu modelo de iPhone').selectOption('13');
    await expect(page.locator('#costos-reparacion-iphone')).toContainText('249.900');
    await page.getByRole('button', { name: 'Consultar precio y stock de mi iPhone 13', exact: true }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', { name: /Belgrano.*Amenábar/ }).click();
    const link = dialog.getByRole('link', { name: /Continuar/ });
    const destination = new URL((await link.getAttribute('href'))!);
    expect(destination.pathname).toBe('/5491131739099');
    expect(destination.searchParams.get('text')).toContain('mi iPhone 13');
    expect(destination.searchParams.get('text')).toContain('colocación, pruebas y garantía');
});

test('Sucursales ofrece teléfonos y Maps propios sin JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
    const page = await context.newPage();
    await page.route('**/*', route => ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
    await page.goto('http://127.0.0.1:3100/sucursales');
    for (const [name, phone] of [['Recoleta', '+541151034595'], ['Belgrano', '+541131739099']]) {
        await expect(page.locator('main').getByRole('link', { name: new RegExp(`^${name}:`) })).toHaveAttribute('href', `tel:${phone}`);
        await expect(page.getByRole('link', { name: `Cómo llegar a ${name}`, exact: true })).toHaveAttribute('href', /^https:\/\/share\.google\//);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: test.info().outputPath('sucursales-320.png'), fullPage: true });
    await context.close();
});

test('Los testimonios seleccionan hasta tres reseñas de cinco estrellas y conservan la reputación global', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/sucursales/caba/recoleta');
    const section = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Lo que dicen nuestros clientes', exact: true }) });
    const authors = section.locator('article p.font-semibold');
    await expect(authors).toHaveText(['Cliente ficticio A', 'Cliente ficticio B', 'Cliente ficticio C']);
    await expect(section.getByRole('img', { name: '5 de 5 estrellas', exact: true })).toHaveCount(3);
    await expect(section.getByRole('img', { name: '4,5 de 5 estrellas', exact: true })).toBeVisible();
    await expect(section).toContainText('12 reseñas');
    await expect(section).toContainText('Selección de reseñas de 5 estrellas');
    await expect(section.getByRole('link', { name: 'Ver reseñas de Recoleta en Google Maps', exact: true })).toBeVisible();
    await expect(section.getByRole('link', { name: 'Cliente ficticio A', exact: true })).toHaveAttribute('href', 'https://www.google.com/maps/contrib/fixture-a');
    await expect(section.getByRole('link', { name: 'Ver reseña original' }).first()).toHaveAttribute('href', 'https://www.google.com/maps/reviews/fixture-a');
    const detail = section.locator('details');
    await expect(detail).not.toHaveAttribute('open');
    await detail.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(detail.locator('p')).toBeVisible();
    expect((await detail.locator('p').textContent())!.length).toBeGreaterThan(500);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: test.info().outputPath('resenas-320.png'), fullPage: true });
});

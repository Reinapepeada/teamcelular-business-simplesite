import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.route('**/*', route => {
        const request = route.request();
        const url = new URL(request.url());
        return ['localhost', '127.0.0.1'].includes(url.hostname)
            && request.method() === 'GET'
            && !url.pathname.startsWith('/api/')
            ? route.continue() : route.abort();
    });
});

for (const width of [320, 390, 1280]) {
    test(`Sucursales ${width}px: teléfono por sede y rangos completos sin desplazamiento horizontal`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/sucursales');
        const branches = [
            { name: 'Recoleta', slug: 'recoleta', phone: 'tel:+541151034595' },
            { name: 'Belgrano', slug: 'belgrano', phone: 'tel:+541131739099' },
        ];
        for (const branch of branches) {
            const card = page.getByRole('heading', { name: `${branch.name} (CABA)`, exact: true }).locator('..');
            const phone = card.locator(`a[href="${branch.phone}"]`);
            await expect(phone).toBeVisible();
            expect((await phone.boundingBox())!.height).toBeGreaterThanOrEqual(44);
            await phone.focus();
            await expect(phone).toBeFocused();
            await expect(card.getByRole('link', { name: 'Ver ficha de sucursal', exact: true }))
                .toHaveAttribute('href', `/sucursales/caba/${branch.slug}`);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

        for (const branch of branches) {
            await page.goto(`/sucursales/caba/${branch.slug}`);
            const table = page.locator('main table');
            await expect(table.locator('tbody tr')).toHaveCount(6);
            const geometry = await table.evaluate(element => {
                const container = element.parentElement!;
                const bounds = container.getBoundingClientRect();
                return {
                    overflow: container.scrollWidth > container.clientWidth,
                    cellsWithinContainer: [...element.querySelectorAll('tbody td')].every(cell => {
                        const rect = cell.getBoundingClientRect();
                        return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1;
                    }),
                };
            });
            expect(geometry.overflow).toBe(false);
            expect(geometry.cellsWithinContainer).toBe(true);
            for (const row of await table.locator('tbody tr').all()) {
                await expect(row.locator('td').last()).toContainText('Desde');
                await expect(row.locator('td').last()).toContainText('hasta');
            }
        }
    });
}

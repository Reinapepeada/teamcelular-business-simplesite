import { test, expect, type Page } from '@playwright/test';

const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Content-Type', 'access-control-allow-methods': 'GET, POST, OPTIONS' };
const product = { id: 0, storeSlug: 'funda-prueba', name: 'Funda de prueba', retail_price: 100, shipping_enabled: true, variants: [{ id: 0, stock: 100, images: [] }] };
const item = { product, storeSlug: 'funda-prueba', cartKey: 'store:funda-prueba', quantity: 1 };
const attempt = { checkout_key: 'ck-prueba', recovery_token: 'a'.repeat(64), customer_name: 'Ana Prueba', customer_email: 'ana@example.test', items: [{ slug: 'funda-prueba', quantity: 1 }] };
const saved = { cartRevision: 'revision-fixture', clave: 'TC-PRUEBA', checkoutKey: attempt.checkout_key, token: 'token-ficticio', total: 100, moneda: 'ARS', huella: 'funda-prueba:1' };
const status = (paid = false) => ({ commerce_key: saved.clave, status: paid ? 'paid' : 'pending_payment', paid, payment_result: paid ? 'approved' : 'pending', can_retry: false, total_amount: 100, currency: 'ARS', fulfillment_status: 'pending', tracking_ref: null });

async function seed(page: Page, quantity = 1, recover = true) {
    await page.addInitScript(({ item, attempt, saved, quantity, recover }) => {
        if (localStorage.getItem('fixture-seeded')) return;
        localStorage.setItem('fixture-seeded', 'true');
        localStorage.setItem('cart-storage', JSON.stringify({ version: 0, state: { cartRevision: 'revision-fixture', cart: [{ ...item, quantity }], totalItems: quantity, totalPrice: quantity * 100, destinoEnvio: { province: 'C', postal_code: 'C1425ABC' } } }));
        if (recover) {
            localStorage.setItem('tc.checkout', JSON.stringify({ key: attempt.checkout_key, cartRevision: 'revision-fixture', recoveryToken: attempt.recovery_token, huella: 'funda-prueba:1', payload: attempt }));
            localStorage.setItem('tc.pedido', JSON.stringify(saved));
        }
    }, { item, attempt, saved, quantity, recover });
}

async function isolate(page: Page, getStatus: () => ReturnType<typeof status>) {
    await page.context().route('**/*', async route => {
        const url = new URL(route.request().url());
        if (!['127.0.0.1', 'localhost'].includes(url.hostname)) return route.abort();
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
        if (url.pathname.startsWith('/store/orders/by-key/')) return route.fulfill({ headers: cors, json: getStatus() });
        if (url.pathname === '/store/pickup-point') return route.fulfill({ headers: cors, json: { name: 'Local de prueba', address: 'Dirección ficticia 123', hours: 'Lunes 10 a 18' } });
        if (url.pathname.startsWith('/store/') && route.request().method() !== 'GET') return route.fulfill({ status: 500, headers: cors, json: { error: { code: 'UNEXPECTED_MUTATION' } } });
        return route.continue();
    });
}

for (const width of [320, 375, 1280]) {
    test(`F10–12 regreso pendiente, actualización y recarga a ${width}px`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: 900 });
        await seed(page, 2);
        let paid = false;
        let mutations = 0;
        page.on('request', req => { if (req.url().includes('/store/') && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) mutations++; });
        await isolate(page, () => status(paid));
        await page.goto('/checkout/exito?status=approved');
        await expect(page.getByRole('heading', { name: 'Tu pago sigue pendiente' })).toBeVisible();
        await expect(page).toHaveURL(/external_reference=TC-PRUEBA$/);
        await expect(page.getByRole('button', { name: 'Reintentar el pago' })).toHaveCount(0);
        const button = page.getByRole('button', { name: 'Actualizar estado' });
        await expect(button).toBeEnabled();
        await button.focus();
        paid = true;
        await button.press('Enter');
        await expect(page.getByRole('heading', { name: '¡Listo! Tu pago entró' })).toBeVisible();
        await expect(button).toBeFocused();
        await expect(page.getByText('Tu carrito todavía tiene productos.', { exact: false })).toBeVisible();
        await expect.poll(() => page.evaluate(() => localStorage.getItem('tc.pedido'))).toBeNull();
        expect(await page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart[0].quantity)).toBe(2);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.screenshot({ path: testInfo.outputPath(`paid-preserved-cart-${width}.png`), fullPage: true });
        await page.reload();
        await expect(page.getByRole('heading', { name: '¡Listo! Tu pago entró' })).toBeVisible();
        expect(mutations).toBe(0);
    });
}

test('F10 dos pestañas: la confirmación elimina solo carrito idéntico; una pestaña vieja no lo revive', async ({ page, context }) => {
    await seed(page);
    let paid = false;
    await isolate(page, () => status(paid));
    await page.goto('/checkout/exito');
    await expect(page.getByRole('heading', { name: 'Tu pago sigue pendiente' })).toBeVisible();
    const other = await context.newPage();
    await other.goto('/tienda');
    await expect(other.getByRole('heading', { name: /Repuestos y accesorios/ })).toBeVisible();
    paid = true;
    await page.getByRole('button', { name: 'Actualizar estado' }).click();
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart.length)).toBe(0);
    await other.getByRole('button', { name: /Abrir carrito/ }).click();
    await expect(other.getByText('Tu carrito está vacío', { exact: false })).toBeVisible();
    expect(await other.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart.length)).toBe(0);
});

test('F8 validación de nombre y CPA antes de cotizar, sin crear pedido', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await seed(page, 1, false);
    await isolate(page, () => status());
    let quotes = 0;
    let creates = 0;
    await page.route('**/store/shipping/quote', async route => {
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
        quotes++;
        expect(route.request().postDataJSON().postal_code).toBe('C1425ABC');
        return route.fulfill({ headers: cors, json: { cheapest: { price: 20 }, options: [{ price: 20 }] } });
    });
    page.on('request', req => { if (new URL(req.url()).pathname === '/store/checkout') creates++; });
    await page.goto('/tienda');
    await page.getByRole('button', { name: /Abrir carrito/ }).click();
    await page.getByRole('button', { name: 'Continuar con la compra' }).click();
    await page.getByLabel('Envío a domicilio', { exact: false }).check();
    await page.getByLabel('Nombre y apellido', { exact: true }).fill('Ana');
    await page.getByLabel('Mail', { exact: true }).fill('ana@example.test');
    await page.getByLabel('Calle', { exact: true }).fill('Calle de prueba');
    await page.getByLabel('Número', { exact: true }).fill('123');
    await page.getByLabel('Localidad', { exact: true }).fill('CABA');
    await page.getByLabel('Código postal', { exact: true }).fill('C1425');
    await page.getByRole('button', { name: /Revisar pedido/ }).click();
    await expect(page.getByText('Para el envío, poné tu nombre y apellido.')).toBeVisible();
    await expect(page.getByLabel('Nombre y apellido', { exact: true })).toBeFocused();
    expect(quotes).toBe(0); expect(creates).toBe(0);
    await page.screenshot({ path: testInfo.outputPath('shipping-validation-320.png'), fullPage: true });
    await page.getByLabel('Nombre y apellido', { exact: true }).fill('Ana Prueba');
    await page.getByLabel('Código postal', { exact: true }).fill(' c1425abc ');
    await page.getByRole('button', { name: /Revisar pedido/ }).click();
    await expect.poll(() => quotes).toBe(1);
    expect(creates).toBe(0);
});


test('dos clicks de cantidad esperan el lock y se aplican ambos', async ({ page }) => {
    await seed(page, 1, false);
    await isolate(page, () => status());
    await page.goto('/tienda');
    await page.getByRole('button', { name: /Abrir carrito/ }).click();
    await page.evaluate(() => new Promise<void>(resolve => {
        void navigator.locks.request('tc.cart', async () => {
            resolve();
            await new Promise<void>(release => { (window as unknown as { releaseCart: () => void }).releaseCart = release; });
        });
    }));
    await page.getByRole('button', { name: 'Aumentar cantidad de Funda de prueba' }).click();
    await page.getByRole('button', { name: 'Aumentar cantidad de Funda de prueba' }).click();
    await page.evaluate(() => (window as unknown as { releaseCart: () => void }).releaseCart());
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart[0].quantity)).toBe(3);
});

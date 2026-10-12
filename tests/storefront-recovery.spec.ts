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
        return route.fulfill({ headers: cors, json: { quote_id: "11111111-1111-4111-8111-111111111111", expires_at: "2099-01-01T12:00:00Z", checkout_ready: true, cheapest: { price: 20 }, options: [{ price: 20 }] } });
    });
    page.on('request', req => { if (new URL(req.url()).pathname === '/store/checkout') creates++; });
    await page.goto('/tienda');
    await page.getByRole('button', { name: /Abrir carrito/ }).click();
    await page.getByRole('button', { name: 'Continuar con la compra' }).click();
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Envío a domicilio', { exact: false }).check();
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Nombre y apellido', { exact: true }).fill('Ana');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Mail', { exact: true }).fill('ana@example.test');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Calle', { exact: true }).fill('Calle de prueba');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Número', { exact: true }).fill('123');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Localidad', { exact: true }).fill('CABA');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Código postal', { exact: true }).fill('C1425');
    await page.getByRole('button', { name: /Revisar pedido/ }).click();
    await expect(page.getByText('Para el envío, poné tu nombre y apellido.')).toBeVisible();
    await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Nombre y apellido', { exact: true })).toBeFocused();
    expect(quotes).toBe(0); expect(creates).toBe(0);
    await page.screenshot({ path: testInfo.outputPath('shipping-validation-320.png'), fullPage: true });
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Nombre y apellido', { exact: true }).fill('Ana Prueba');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Código postal', { exact: true }).fill(' c1425abc ');
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

async function openCheckout(page: Page) {
    await page.goto('/tienda');
    await page.getByRole('button', { name: /Abrir carrito/ }).click();
    await page.getByRole('button', { name: 'Continuar con la compra' }).click();
    await expect(page.getByRole('dialog', { name: 'Finalizar compra' })).toBeVisible();
}

async function fillBuyer(page: Page) {
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Nombre y apellido', { exact: true }).fill('Ana Prueba');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Mail', { exact: true }).fill('ana@example.test');
}

async function fillShipping(page: Page) {
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Envío a domicilio', { exact: false }).check();
    await fillBuyer(page);
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Calle', { exact: true }).fill('Dirección de prueba');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Número', { exact: true }).fill('123');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Localidad', { exact: true }).fill('CABA');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Código postal', { exact: true }).fill('C1425ABC');
}

for (const [width, height] of [[320, 568], [375, 667], [1280, 900]]) {
    test(`primer error completo descubierto y teclado conserva foco ${width}px`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height });
        await seed(page, 1, false);
        await isolate(page, () => status());
        await openCheckout(page);
        await fillShipping(page);
        const name = page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Nombre y apellido', { exact: true });
        await name.fill('Ana');
        await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
        await expect(name).toBeFocused();
        await expect.poll(() => name.evaluate(input => {
            const field = input.closest('[data-checkout-field]')!.getBoundingClientRect();
            const header = document.querySelector('[data-checkout-header]')!.getBoundingClientRect();
            const scroll = document.querySelector('[data-checkout-scroll]')!.getBoundingClientRect();
            return field.top >= Math.max(header.bottom, scroll.top) && field.bottom <= Math.min(scroll.bottom, innerHeight);
        })).toBe(true);
        await page.screenshot({ path: testInfo.outputPath(`first-error-visible-${width}.png`) });
        await name.press('Tab');
        await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Mail', { exact: true })).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(name).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('dialog', { name: 'Finalizar compra' })).not.toBeVisible();
        await page.getByRole('button', { name: 'Continuar con la compra' }).click();
        await expect(name).toHaveValue('Ana');
        await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Calle', { exact: true })).toHaveValue('Dirección de prueba');
        await name.fill('Ana Prueba');
        expect(await page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart.length)).toBe(1);
    });
}

for (const kind of ['missing', 'unavailable', 'temporary'] as const) {
    test(`retiro ${kind}: explica, reintenta y revisa dirección/horario antes de crear`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await seed(page, 1, false);
        await isolate(page, () => status());
        let ready = false, calls = 0, creates = 0;
        await page.route('**/store/pickup-point', async route => {
            if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
            calls++;
            return ready ? route.fulfill({ headers: cors, json: { name: 'Local de prueba', address: 'Dirección ficticia 123', hours: 'Lunes 10 a 18' } })
                : kind === 'missing' ? route.fulfill({ headers: cors, json: { name: 'Local de prueba', address: 'Dirección ficticia 123', hours: null } })
                : route.fulfill({ status: kind === 'unavailable' ? 404 : 503, headers: cors, json: { detail: { code: kind === 'unavailable' ? 'pickup_unavailable' : 'temporary' } } });
        });
        page.on('request', req => { if (new URL(req.url()).pathname === '/store/checkout') creates++; });
        await openCheckout(page);
        await fillBuyer(page);
        const review = page.getByRole('button', { name: 'Revisar pedido', exact: true });
        await expect(review).toBeDisabled();
        await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByText(kind === 'missing' ? /todavía no informó el horario/ : kind === 'unavailable' ? /no tiene un punto de retiro confirmado/ : /Puede ser una falla temporal/)).toBeVisible();
        await page.getByRole('dialog', { name: 'Finalizar compra' }).locator('[data-pickup-details]').scrollIntoViewIfNeeded();
        await page.screenshot({ path: testInfo.outputPath(`pickup-${kind}.png`) });
        const before = calls; ready = true;
        await page.getByRole('button', { name: 'Reintentar datos de retiro' }).click();
        await expect.poll(() => calls).toBeGreaterThan(before);
        await expect(review).toBeEnabled();
        await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Nombre y apellido', { exact: true })).toHaveValue('Ana Prueba');
        await review.click();
        await expect(page.getByRole('heading', { name: 'Revisá tu pedido' })).toBeVisible();
        await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByText('Local de prueba · Dirección ficticia 123 · Lunes 10 a 18')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Confirmar y pagar' })).toBeEnabled();
        expect(creates).toBe(0);
        await page.getByRole('dialog', { name: 'Finalizar compra' }).locator('[data-pickup-details]').scrollIntoViewIfNeeded();
        await page.screenshot({ path: testInfo.outputPath(`pickup-confirmed-${kind}.png`) });
    });
}

test('retiro incompleto permite envío válido sin crear pedido y conserva datos', async ({ page }) => {
    await seed(page, 1, false);
    await isolate(page, () => status());
    await page.route('**/store/pickup-point', route => route.fulfill({ headers: cors, json: { name: 'Local de prueba', address: '', hours: null } }));
    await page.route('**/store/shipping/quote', route => route.fulfill({ headers: cors, json: { quote_id: "11111111-1111-4111-8111-111111111111", expires_at: "2099-01-01T12:00:00Z", checkout_ready: true, cheapest: { price: 20 }, options: [{ price: 20 }] } }));
    let creates = 0;
    page.on('request', req => { if (new URL(req.url()).pathname === '/store/checkout') creates++; });
    await openCheckout(page);
    await fillShipping(page);
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Revisá tu pedido' })).toBeVisible();
    await expect(page.getByText(/Dirección de prueba · 123.*CP C1425ABC/)).toBeVisible();
    expect(creates).toBe(0);
});

for (const failure of ['SHIPPING_UNAVAILABLE', 'http500', 'network'] as const) {
    test(`cotización ${failure}: retry sin pedido nuevo y CP preservado`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await seed(page, 1, false);
        await isolate(page, () => status());
        let ready = false, quotes = 0, creates = 0;
        await page.route('**/store/shipping/quote', async route => {
            if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
            quotes++;
            expect(route.request().postDataJSON().postal_code).toBe('C1425ABC');
            if (ready) return route.fulfill({ headers: cors, json: { quote_id: "11111111-1111-4111-8111-111111111111", expires_at: "2099-01-01T12:00:00Z", checkout_ready: true, cheapest: { price: 20 }, options: [{ price: 20 }] } });
            if (failure === 'network') return route.abort();
            return route.fulfill({ status: failure === 'http500' ? 500 : 409, headers: cors, json: { error: { code: failure } } });
        });
        page.on('request', req => { if (new URL(req.url()).pathname === '/store/checkout') creates++; });
        await page.goto('/tienda');
        await page.getByRole('button', { name: /Abrir carrito/ }).click();
        await page.getByRole('dialog', { name: 'Resumen del carrito' }).locator('label').filter({ has: page.locator('input[name="carrito-entrega"]') }).nth(1).click();
        await expect(page.locator('input[name="carrito-entrega"]').nth(1)).toBeChecked();
        await expect(page.getByText(/No pudimos (cotizar|calcular) el envío/)).toBeVisible();
        await expect(page.getByText('No hay envío', { exact: false })).toHaveCount(0);
        await expect(page.locator('#carrito-cp')).toHaveValue('C1425ABC');
        const before = quotes; ready = true;
        await page.getByRole('button', { name: 'Reintentar envío' }).click();
        await expect.poll(() => quotes).toBe(before + 1);
        await expect(page.getByText(/Envío a CP C1425ABC/)).toBeVisible();
        expect(creates).toBe(0);
        expect(await page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart[0].quantity)).toBe(1);
        await page.screenshot({ path: testInfo.outputPath(`quote-retry-${failure}.png`) });
    });
}

const purchaseStates = [
    { title: 'retiro aprobado', changes: { delivery_mode: 'pickup', fulfillment_status: 'preparing' }, text: 'Registramos tu pedido para retirar en el local.' },
    { title: 'envío aprobado', changes: { delivery_mode: 'shipping', fulfillment_status: 'preparing' }, text: 'Registramos tu pedido con envío a domicilio.' },
    { title: 'retirado', changes: { delivery_mode: 'pickup', fulfillment_status: 'delivered' }, text: 'Tu pedido ya fue retirado.' },
    { title: 'despachado', changes: { delivery_mode: 'shipping', fulfillment_status: 'shipped' }, text: 'Tu pedido ya fue despachado.' },
    { title: 'entregado', changes: { delivery_mode: 'shipping', fulfillment_status: 'delivered' }, text: 'Tu pedido figura como entregado.' },
    { title: 'modo antiguo desconocido', changes: {}, text: 'Registramos tu pedido. Acá podés consultar cómo avanza la entrega.' },
    { title: 'reversado', changes: { payment_result: 'reversed', status: 'payment_reversed' }, text: 'El proveedor informó una reversa del pago.' },
];
for (const entry of purchaseStates) {
    test(`vuelta ${entry.title}: estado fiel y asistencia sin token`, async ({ page }) => {
        await seed(page, 2);
        await isolate(page, () => ({ ...status(true), ...entry.changes }));
        await page.goto('/checkout/exito');
        await expect(page.getByText(entry.text, { exact: false })).toBeVisible();
        await expect(page.getByText('Te avisaremos por mail cuando salga.', { exact: false })).toHaveCount(0);
        const help = page.getByRole('link', { name: 'Escribinos', exact: true });
        await expect(help).toHaveAttribute('href', /TC-PRUEBA/);
        expect(await help.getAttribute('href')).not.toContain(saved.token);
        expect(page.url()).not.toContain(saved.token);
        expect(await page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart[0].quantity)).toBe(2);
    });
}

test('retiro ya listo con horario ausente ofrece consulta del pedido, no una compra nueva', async ({ page }) => {
    await seed(page, 2);
    await isolate(page, () => ({ ...status(true), delivery_mode: 'pickup', fulfillment_status: 'ready_for_pickup' }));
    await page.route('**/store/pickup-point', route => route.fulfill({ headers: cors, json: { name: 'Local de prueba', address: 'Dirección ficticia 123', hours: null } }));
    await page.goto('/checkout/exito');
    await expect(page.getByText(/Confirmalo con la tienda antes de acercarte/)).toBeVisible();
    await expect(page.getByText('elegir envío', { exact: false })).toHaveCount(0);
    await expect(page.getByText('antes de pagar', { exact: false })).toHaveCount(0);
});

test.describe('zona horaria del comprador', () => {
    test.use({ timezoneId: 'Asia/Tokyo' });
    test('reserva explícita persiste al recargar en zona horaria distinta', async ({ page }) => {
    await seed(page, 1);
    let expiry: string | null = '2026-10-13T01:00:00Z';
    await isolate(page, () => ({ ...status(), reservation_expires_at: expiry }));
    await page.goto('/checkout/pendiente');
    await expect(page.getByText('12/10/2026, 22:00 (hora de Argentina)')).toBeVisible();
    await page.reload();
    await expect(page.getByText('12/10/2026, 22:00 (hora de Argentina)')).toBeVisible();
    expiry = null;
    await page.getByRole('button', { name: 'Actualizar estado' }).click();
    await expect(page.getByText('Reserva hasta', { exact: true })).toHaveCount(0);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart[0].quantity)).toBe(1);
});

});

const createdOrder = { commerce_key: saved.clave, access_token: saved.token, status: 'pending_payment', customer_name: 'Ana Prueba', customer_email: 'ana@example.test', shipping: null, items: [{ product_id: 1, quantity: 1, unit_price: 100, current_product_name: 'Funda de prueba' }], subtotal_amount: 100, shipping_amount: 0, total_amount: 100, currency: 'ARS', reservation_expires_at: '2026-10-13T01:00:00Z' };

test('importe no confirmado: actualiza la misma reserva, no abre pago y sobrevive recarga', async ({ page }, testInfo) => {
    await seed(page, 1, false);
    await isolate(page, () => status());
    const payloads: Record<string, unknown>[] = [];
    let complete = false, payments = 0;
    await page.route('**/store/checkout', async route => {
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
        payloads.push(route.request().postDataJSON());
        return route.fulfill({ headers: cors, json: { ...createdOrder, total_amount: complete ? 100 : null } });
    });
    page.on('request', req => { if (/\/pay$/.test(new URL(req.url()).pathname)) payments++; });
    await openCheckout(page);
    await fillBuyer(page);
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await page.getByRole('button', { name: 'Confirmar y pagar' }).click();
    await expect(page.getByText('Por confirmar', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ir a pagar', exact: true })).toBeDisabled();
    await expect(page.getByText(/Tu carrito y tu reserva se conservan/)).toBeVisible();
    expect(payloads.length).toBe(1); expect(payments).toBe(0);
    await page.screenshot({ path: testInfo.outputPath('unconfirmed-total-protected.png') });
    await page.reload();
    await page.getByRole('button', { name: /Abrir carrito/ }).click();
    await page.getByRole('button', { name: 'Continuar con la compra' }).click();
    await page.getByRole('button', { name: 'Recuperar y revisar pedido' }).click();
    await expect(page.getByRole('button', { name: 'Actualizar pedido' })).toBeVisible();
    complete = true;
    await page.getByRole('button', { name: 'Actualizar pedido' }).click();
    await expect(page.getByRole('button', { name: 'Ir a pagar', exact: true })).toBeEnabled();
    expect(payloads.length).toBe(3);
    for (const payload of payloads) expect(payload).toEqual(payloads[0]);
    expect(payments).toBe(0);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart.length)).toBe(1);
});

test('guardado antiguo sin payload consulta mismo pedido y revalida pago sin crear otro', async ({ page }) => {
    await seed(page);
    await page.addInitScript(() => localStorage.removeItem('tc.checkout'));
    let paid = false, mutations = 0;
    await isolate(page, () => ({ ...status(paid), payment_result: paid ? 'approved' : 'rejected', can_retry: !paid, delivery_mode: 'shipping' }));
    page.on('request', req => { if (req.url().includes('/store/') && req.method() === 'POST') mutations++; });
    await openCheckout(page);
    await page.getByRole('button', { name: 'Reintentar el pago' }).click();
    await expect(page).toHaveURL(/external_reference=TC-PRUEBA$/);
    const retry = page.getByRole('button', { name: 'Reintentar el pago' });
    await expect(retry).toBeVisible();
    paid = true;
    await retry.click();
    await expect(page.getByRole('heading', { name: '¡Listo! Tu pago entró' })).toBeVisible();
    expect(mutations).toBe(0);
    expect(page.url()).not.toContain(saved.token);
});

for (const terminal of ['paid', 'expired', 'payment_reversed']) {
    test(`recuperación ${terminal} no vuelve a pedir link ni crea un pedido con otra clave`, async ({ page }) => {
        await seed(page);
        await isolate(page, () => ({ ...status(terminal === 'paid'), status: terminal, payment_result: terminal === 'payment_reversed' ? 'reversed' : terminal === 'paid' ? 'approved' : 'none' }));
        let creates = 0, payments = 0;
        await page.route('**/store/checkout', route => {
            if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
            creates++;
            expect(route.request().postDataJSON().checkout_key).toBe(attempt.checkout_key);
            return route.fulfill({ headers: cors, json: { ...createdOrder, status: terminal } });
        });
        page.on('request', req => { if (/\/pay$/.test(new URL(req.url()).pathname)) payments++; });
        await openCheckout(page);
        await page.getByRole('button', { name: 'Recuperar y revisar pedido' }).click();
        if (terminal === 'expired') await expect(page.getByText(/está vencido/)).toBeVisible();
        else {
            await expect(page).toHaveURL(/external_reference=TC-PRUEBA$/);
            await expect(page.getByRole('heading', { name: terminal === 'paid' ? '¡Listo! Tu pago entró' : 'Este pago fue revertido' })).toBeVisible();
        }
        expect(creates).toBe(1); expect(payments).toBe(0);
    });
}

test('falla de cotización en checkout conserva toda la dirección al reintentar', async ({ page }) => {
    await seed(page, 1, false);
    await isolate(page, () => status());
    const destinations: unknown[] = [];
    let ready = false, creates = 0;
    await page.route('**/store/shipping/quote', route => {
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
        destinations.push(route.request().postDataJSON());
        return route.fulfill(ready ? { headers: cors, json: { quote_id: "11111111-1111-4111-8111-111111111111", expires_at: "2099-01-01T12:00:00Z", checkout_ready: true, cheapest: { price: 20 }, options: [{ price: 20 }] } } : { status: 503, headers: cors, json: { error: { code: 'SHIPPING_UNAVAILABLE' } } });
    });
    page.on('request', req => { if (new URL(req.url()).pathname === '/store/checkout') creates++; });
    await openCheckout(page);
    await fillShipping(page);
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Piso (opcional)', { exact: true }).fill('2');
    await page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Depto (opcional)', { exact: true }).fill('B');
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByRole('alert')).toHaveText(/No pudimos cotizar el envío/);
    for (const [label, value] of [['Calle', 'Dirección de prueba'], ['Número', '123'], ['Piso (opcional)', '2'], ['Depto (opcional)', 'B'], ['Localidad', 'CABA'], ['Código postal', 'C1425ABC']]) {
        await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel(label, { exact: true })).toHaveValue(value);
    }
    ready = true;
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Revisá tu pedido' })).toBeVisible();
    expect(destinations).toHaveLength(2); expect(destinations[0]).toEqual(destinations[1]); expect(creates).toBe(0);
});

test('error contractual tras confirmar vuelve al campo completo y mantiene el destino', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await seed(page, 1, false);
    await isolate(page, () => status());
    await page.route('**/store/shipping/quote', route => route.fulfill({ headers: cors, json: { quote_id: "11111111-1111-4111-8111-111111111111", expires_at: "2099-01-01T12:00:00Z", checkout_ready: true, cheapest: { price: 20 }, options: [{ price: 20 }] } }));
    await page.route('**/store/checkout', route => route.request().method() === 'OPTIONS' ? route.fulfill({ status: 204, headers: cors }) : route.fulfill({ status: 422, headers: cors, json: { error: { code: 'VALIDATION_ERROR', details: { fields: ['street_name'] } } } }));
    await openCheckout(page);
    await fillShipping(page);
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await page.getByRole('button', { name: 'Confirmar y pagar' }).click();
    const street = page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Calle', { exact: true });
    await expect(street).toBeFocused();
    await expect(street).toHaveValue('Dirección de prueba');
    await expect.poll(() => street.evaluate(input => {
        const field = input.closest('[data-checkout-field]')!.getBoundingClientRect();
        const header = document.querySelector('[data-checkout-header]')!.getBoundingClientRect();
        const scroll = document.querySelector('[data-checkout-scroll]')!.getBoundingClientRect();
        return field.top >= header.bottom && field.bottom <= scroll.bottom;
    })).toBe(true);
    expect(await page.evaluate(() => localStorage.getItem('tc.checkout'))).toBeNull();
    await page.screenshot({ path: testInfo.outputPath('server-error-visible-320.png') });
});

test('cambiar modalidad desde carrito invalida sólo la revisión sin reservar', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await seed(page, 1, false);
    await isolate(page, () => status());
    let creates = 0;
    await page.route('**/store/shipping/quote', route => route.fulfill({ headers: cors, json: { quote_id: "11111111-1111-4111-8111-111111111111", expires_at: "2099-01-01T12:00:00Z", checkout_ready: true, cheapest: { price: 20 }, options: [{ price: 20 }] } }));
    page.on('request', req => { if (new URL(req.url()).pathname === '/store/checkout') creates++; });
    await openCheckout(page);
    await fillShipping(page);
    await page.getByRole('radio', { name: /Retiro en el local/ }).check();
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Revisá tu pedido' })).toBeVisible();
    await page.getByRole('button', { name: 'Volver al carrito' }).click();
    await page.getByRole('dialog', { name: 'Resumen del carrito' }).locator('label').filter({ has: page.locator('input[name="carrito-entrega"]') }).nth(1).click();
    await page.getByRole('button', { name: 'Continuar con la compra' }).click();
    await expect(page.getByRole('heading', { name: 'Tus datos y entrega' })).toBeVisible();
    await expect(page.getByRole('radio', { name: /Envío a domicilio/ })).toBeChecked();
    await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Nombre y apellido', { exact: true })).toHaveValue('Ana Prueba');
    await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Calle', { exact: true })).toHaveValue('Dirección de prueba');
    await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Código postal', { exact: true })).toHaveValue('C1425ABC');
    expect(creates).toBe(0);
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Envío a', exact: true })).toBeVisible();
    await expect(page.getByText(/Dirección de prueba · 123.*CP C1425ABC/)).toBeVisible();
    expect(creates).toBe(0);
    expect(await page.evaluate(() => localStorage.getItem('tc.checkout'))).toBeNull();
});

const quoteId = '11111111-1111-4111-8111-111111111111';
const nextQuoteId = '22222222-2222-4222-8222-222222222222';
const readyShippingQuote = (id = quoteId) => ({ quote_id: id, expires_at: '2099-01-01T12:00:00Z', checkout_ready: true, package_status: 'estimated', hours_basis: 'carrier_transit_after_dispatch', cheapest: { price: 20, hours: 48 }, options: [{ price: 20 }] });

for (const [width, height] of [[320, 568], [375, 667], [1280, 900]]) {
    test(`stock repartido conserva carrito y destino sin cobrar ni pedir quitar productos ${width}px`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height });
        await seed(page, 2, false); // Dos unidades agregadas, que el servidor no puede servir desde un solo local.
        await isolate(page, () => status());
        let creates = 0, payments = 0;
        await page.route('**/store/shipping/quote', route => route.request().method() === 'OPTIONS'
            ? route.fulfill({ status: 204, headers: cors })
            : route.fulfill({ status: 409, headers: cors, json: { error: { code: 'stock_requires_consolidation' } } }));
        page.on('request', req => { if (req.method() !== 'POST') return; if (new URL(req.url()).pathname === '/store/checkout') creates++; if (/\/pay$/.test(req.url())) payments++; });
        await openCheckout(page);
        await fillShipping(page);
        const checkout = page.getByRole('dialog', { name: 'Finalizar compra' });
        await checkout.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
        await expect(checkout.getByRole('alert')).toHaveText(/Necesitamos reunir estos productos en un local/);
        await expect(checkout.getByRole('button', { name: 'Quitar del carrito' })).toHaveCount(0);
        await expect(checkout.getByRole('button', { name: 'Retirar en el local', exact: true })).toHaveCount(0);
        await expect(checkout.getByRole('button', { name: 'Confirmar y pagar' })).toHaveCount(0);
        await expect(checkout.getByRole('link', { name: 'Consultar por este envío' })).toBeVisible();
        await expect(checkout.getByLabel('Código postal', { exact: true })).toHaveValue('C1425ABC');
        await expect(checkout.getByLabel(/Origen|Peso|Ancho|Largo|Alto|Seguro/)).toHaveCount(0);
        await checkout.getByRole('alert').scrollIntoViewIfNeeded();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.screenshot({ path: testInfo.outputPath(`consolidation-preserved-${width}.png`) });
        await checkout.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
        expect(creates).toBe(0); expect(payments).toBe(0);
        expect(await page.evaluate(() => localStorage.getItem('tc.checkout'))).toBeNull();
        expect(await page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart[0].quantity)).toBe(2);
        await page.getByRole('button', { name: 'Volver al carrito' }).click();
        const cart = page.getByRole('dialog', { name: 'Resumen del carrito' });
        await expect(cart.getByText(/Necesitamos reunir estos productos en un local/)).toBeVisible();
        await expect(cart.getByRole('link', { name: 'Consultar por este envío' })).toBeVisible();
        await expect(cart.locator('#carrito-cp')).toHaveValue('C1425ABC');
    });
}

for (const [code, text] of [
    ['shipping_configuration_required', 'Estamos preparando los envíos'],
    ['shipping_package_review_required', 'Necesitamos revisar el paquete'],
]) {
    test(`${code} preserva datos y sólo retiro elegido explícitamente sigue disponible`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await seed(page, 1, false); await isolate(page, () => status());
        await page.route('**/store/shipping/quote', route => route.request().method() === 'OPTIONS' ? route.fulfill({ status: 204, headers: cors }) : route.fulfill({ status: 409, headers: cors, json: { error: { code } } }));
        let creates = 0, payments = 0;
        page.on('request', req => { if (req.method() !== 'POST') return; if (new URL(req.url()).pathname === '/store/checkout') creates++; if (/\/pay$/.test(req.url())) payments++; });
        await openCheckout(page); await fillShipping(page);
        const checkout = page.getByRole('dialog', { name: 'Finalizar compra' });
        await checkout.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
        await expect(checkout.getByRole('alert')).toContainText(text);
        await expect(checkout.getByRole('button', { name: 'Confirmar y pagar' })).toHaveCount(0);
        await checkout.getByRole('alert').scrollIntoViewIfNeeded();
        await page.screenshot({ path: testInfo.outputPath(`${code}.png`) });
        await checkout.getByRole('radio', { name: /Retiro en el local/ }).check();
        await checkout.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
        await expect(checkout.getByRole('heading', { name: 'Revisá tu pedido' })).toBeVisible();
        await expect(checkout.getByText('Local de prueba · Dirección ficticia 123 · Lunes 10 a 18')).toBeVisible();
        expect(creates).toBe(0); expect(payments).toBe(0);
    });
}

for (const [code, width] of [['shipping_quote_required', 320], ['shipping_quote_expired', 375], ['shipping_quote_changed', 1280]] as const) {
    test(`${code} exige nueva revisión aun con mismo precio y conserva destino ${width}px`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: width === 320 ? 568 : width === 375 ? 667 : 900 });
        await seed(page, 1, false); await isolate(page, () => status());
        let quotes = 0, reservations = 0, payments = 0;
        const payloads: Record<string, unknown>[] = [];
        await page.route('**/store/shipping/quote', route => {
            if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
            quotes++;
            return route.fulfill({ headers: cors, json: readyShippingQuote(quotes === 1 ? quoteId : nextQuoteId) });
        });
        await page.route('**/store/checkout', route => {
            if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
            const body = route.request().postDataJSON(); payloads.push(body);
            if (payloads.length === 1) return route.fulfill({ status: 409, headers: cors, json: { error: { code } } });
            reservations++;
            return route.fulfill({ headers: cors, json: { ...createdOrder, shipping: body.shipping_address, items: [{ ...createdOrder.items[0], unit_price: 100.01 }], subtotal_amount: 100.01, shipping_amount: 20, total_amount: 120.01 } });
        });
        page.on('request', req => { if (req.method() === 'POST' && /\/pay$/.test(req.url())) payments++; });
        await openCheckout(page); await fillShipping(page);
        const checkout = page.getByRole('dialog', { name: 'Finalizar compra' });
        await checkout.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
        await checkout.getByRole('button', { name: 'Confirmar y pagar' }).click();
        await expect(checkout.getByRole('alert')).toContainText('Necesitamos actualizar el envío');
        await expect(checkout.locator('[data-checkout-header]')).toContainText('Estimado:');
        expect(payloads[0].quote_id).toBe(quoteId);
        expect(await page.evaluate(() => localStorage.getItem('tc.checkout'))).toBeNull();
        await expect(checkout.getByLabel('Calle', { exact: true })).toHaveValue('Dirección de prueba');
        await expect(checkout.getByLabel('Código postal', { exact: true })).toHaveValue('C1425ABC');
        await checkout.getByRole('button', { name: 'Volver a calcular envío' }).click();
        await expect(checkout.getByRole('heading', { name: 'Revisá tu pedido' })).toBeVisible();
        expect(payloads).toHaveLength(1); expect(reservations).toBe(0); expect(payments).toBe(0);
        await checkout.getByRole('button', { name: 'Confirmar y pagar' }).click();
        await expect(checkout.getByRole('heading', { name: 'Revisá y confirmá tu compra' })).toBeVisible();
        await expect(checkout.getByText(/Los importes cambiaron respecto de la revisión/)).toBeVisible();
        await expect(checkout.locator('[data-checkout-header]')).toContainText(/100,01/);
        await expect(checkout.locator('[data-checkout-header]')).not.toContainText('Estimado:');
        await expect(checkout.getByText(/120,01/, { exact: false })).toBeVisible();
        expect(payloads[1].quote_id).toBe(nextQuoteId); expect(payloads[1].checkout_key).not.toBe(payloads[0].checkout_key);
        expect(reservations).toBe(1); expect(payments).toBe(0);
        expect(await page.evaluate(() => JSON.parse(localStorage.getItem('tc.checkout')!).payload.quote_id)).toBe(nextQuoteId);
        await checkout.getByRole('button', { name: 'Ir a pagar' }).scrollIntoViewIfNeeded();
        await page.screenshot({ path: testInfo.outputPath(`quote-reviewed-exact-${width}.png`) });
        await page.reload();
        await page.getByRole('button', { name: /Abrir carrito/ }).click();
        expect(await page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart[0].quantity)).toBe(1);
        expect(reservations).toBe(1); expect(payments).toBe(0);
    });
}

test('snapshot guardado recupera misma compra tras respuesta perdida, sin recotizar ni pagar', async ({ page }) => {
    await seed(page, 1, false); await isolate(page, () => status());
    let quotes = 0, payments = 0;
    const payloads: Record<string, unknown>[] = [];
    await page.route('**/store/shipping/quote', route => {
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
        quotes++; return route.fulfill({ headers: cors, json: readyShippingQuote() });
    });
    await page.route('**/store/checkout', route => {
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
        const body = route.request().postDataJSON(); payloads.push(body);
        if (payloads.length === 1) return route.abort(); // Servidor podría haber creado: nunca sustituir el intento.
        return route.fulfill({ headers: cors, json: { ...createdOrder, shipping: body.shipping_address, shipping_amount: 20, total_amount: 120 } });
    });
    page.on('request', req => { if (req.method() === 'POST' && /\/pay$/.test(req.url())) payments++; });
    await openCheckout(page); await fillShipping(page);
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await page.getByRole('button', { name: 'Confirmar y pagar' }).click();
    await expect(page.getByRole('button', { name: 'Recuperar y revisar pedido' })).toBeVisible();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('tc.checkout')!).payload.quote_id)).toBe(quoteId);
    await page.reload();
    await page.getByRole('button', { name: /Abrir carrito/ }).click();
    await page.getByRole('button', { name: 'Continuar con la compra' }).click();
    await page.getByRole('button', { name: 'Recuperar y revisar pedido' }).click();
    await expect(page.getByRole('heading', { name: 'Revisá y confirmá tu compra' })).toBeVisible();
    expect(payloads).toHaveLength(2); expect(payloads[1]).toEqual(payloads[0]);
    expect(quotes).toBe(1); expect(payments).toBe(0);
});

test('destino cambiado desde carrito invalida snapshot previo sin borrar contacto ni calle', async ({ page }) => {
    await seed(page, 1, false); await isolate(page, () => status());
    const destinations: string[] = []; let creates = 0;
    await page.route('**/store/shipping/quote', route => {
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
        destinations.push(route.request().postDataJSON().postal_code);
        return route.fulfill({ headers: cors, json: readyShippingQuote() });
    });
    page.on('request', req => { if (req.method() === 'POST' && new URL(req.url()).pathname === '/store/checkout') creates++; });
    await openCheckout(page); await fillShipping(page);
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await page.getByRole('button', { name: 'Volver al carrito' }).click();
    await page.locator('#carrito-cp').fill('C1414ABC');
    await page.getByRole('button', { name: 'Continuar con la compra' }).click();
    const checkout = page.getByRole('dialog', { name: 'Finalizar compra' });
    await expect(checkout.getByRole('heading', { name: 'Tus datos y entrega' })).toBeVisible();
    await expect(checkout.getByLabel('Código postal', { exact: true })).toHaveValue('C1414ABC');
    await expect(checkout.getByLabel('Nombre y apellido', { exact: true })).toHaveValue('Ana Prueba');
    await expect(checkout.getByLabel('Calle', { exact: true })).toHaveValue('Dirección de prueba');
    expect(creates).toBe(0);
    await checkout.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await expect(checkout.getByText(/CP C1414ABC/)).toBeVisible();
    expect(destinations.at(-1)).toBe('C1414ABC'); expect(creates).toBe(0);
});

test('respuesta tardía de quote no reactiva revisión para destino viejo de otra pestaña', async ({ page, context }) => {
    await seed(page, 1, false); await isolate(page, () => status());
    let release: (() => void) | undefined; let quotes = 0, creates = 0;
    await page.route('**/store/shipping/quote', async route => {
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
        quotes++;
        if (quotes === 1) await new Promise<void>(resolve => { release = resolve; });
        return route.fulfill({ headers: cors, json: readyShippingQuote() });
    });
    page.on('request', req => { if (req.method() === 'POST' && new URL(req.url()).pathname === '/store/checkout') creates++; });
    await openCheckout(page); await fillShipping(page);
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await expect.poll(() => !!release).toBe(true);
    const other = await context.newPage(); await other.goto('/tienda');
    await other.getByRole('button', { name: /Abrir carrito/ }).click();
    await other.getByRole('dialog', { name: 'Resumen del carrito' }).locator('label').filter({ has: other.locator('input[name="carrito-entrega"]') }).nth(1).click();
    await other.locator('#carrito-cp').fill('C1414ABC');
    await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByLabel('Código postal', { exact: true })).toHaveValue('C1414ABC');
    release!();
    await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByRole('alert')).toContainText('El carrito o el destino cambió');
    await expect(page.getByRole('button', { name: 'Confirmar y pagar' })).toHaveCount(0);
    expect(creates).toBe(0); expect(await page.evaluate(() => localStorage.getItem('tc.checkout'))).toBeNull();
});

test('readiness ausente no habilita compra y horas sin base no prometen llegada', async ({ page }) => {
    await seed(page, 1, false); await isolate(page, () => status());
    await page.route('**/store/shipping/quote', route => route.fulfill({ headers: cors, json: { ...readyShippingQuote(), checkout_ready: undefined } }));
    await openCheckout(page); await fillShipping(page);
    await page.getByRole('button', { name: 'Revisar pedido', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Finalizar compra' }).getByRole('alert')).toContainText('Estamos preparando los envíos');
    await expect(page.getByRole('button', { name: 'Confirmar y pagar' })).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem('tc.checkout'))).toBeNull();
});

test('cotización lista muestra sólo tránsito desde despacho, sin prometer llegada ni seguro', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await seed(page, 1, false); await isolate(page, () => status());
    await page.route('**/store/shipping/quote', route => route.fulfill({ headers: cors, json: readyShippingQuote() }));
    await page.goto('/tienda'); await page.getByRole('button', { name: /Abrir carrito/ }).click();
    const cart = page.getByRole('dialog', { name: 'Resumen del carrito' });
    await cart.locator('label').filter({ has: page.locator('input[name="carrito-entrega"]') }).nth(1).click();
    await expect(cart.getByText(/Tránsito estimado: ~48 h desde el despacho. No incluye preparación./)).toBeVisible();
    await expect(cart.getByText(/llega en|envío asegurado|tarifa reservada/i)).toHaveCount(0);
    await page.screenshot({ path: testInfo.outputPath('shipping-transit-estimate-375.png') });
});

test('pedido guardado con configuración de envío pendiente no se atribuye a Mercado Pago', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await seed(page);
    let requests = 0, mutations = 0;
    await isolate(page, () => { requests++; return { ...status(), payment_result: 'none', reason_code: 'shipping_configuration_required', can_retry: false, delivery_mode: 'shipping' }; });
    page.on('request', req => { if (req.url().includes('/store/') && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) mutations++; });
    await page.goto('/checkout/exito?external_reference=TC-PRUEBA');
    await expect(page.getByRole('heading', { name: 'Tu envío necesita revisión' })).toBeVisible();
    await expect(page.getByText(/Tu pedido sigue guardado/)).toBeVisible();
    await expect(page.getByText(/Si ya pagaste, conservá el comprobante/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reintentar el pago' })).toHaveCount(0);
    await expect(page.getByText(/Mercado Pago está demorando|Tu pago sigue pendiente/)).toHaveCount(0);
    const help = page.getByRole('link', { name: /Escribinos|Ayuda|WhatsApp/i }).first();
    await expect(help).toHaveAttribute('href', /TC-PRUEBA/);
    expect(await help.getAttribute('href')).not.toContain(saved.token);
    await page.screenshot({ path: testInfo.outputPath('saved-order-shipping-configuration-375.png') });
    const refresh = page.getByRole('button', { name: 'Actualizar estado' });
    await expect(refresh).toHaveAttribute('aria-disabled', 'false');
    const beforeRefresh = requests; // Desarrollo puede montar dos consultas iniciales; el clic debe sumar exactamente una.
    await refresh.click();
    await expect.poll(() => requests).toBe(beforeRefresh + 1);
    // Ventana deliberada: no debe reaparecer el polling de 2/4/8 segundos tras este estado.
    await page.waitForTimeout(15_000);
    expect(requests).toBe(beforeRefresh + 1);
    await page.reload();
    await expect(page.getByRole('heading', { name: 'Tu envío necesita revisión' })).toBeVisible();
    expect(mutations).toBe(0);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('cart-storage')!).state.cart[0].quantity)).toBe(1);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('tc.checkout')!).payload.checkout_key)).toBe(attempt.checkout_key);
});

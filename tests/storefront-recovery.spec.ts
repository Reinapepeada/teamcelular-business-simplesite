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
    await page.route('**/store/shipping/quote', route => route.fulfill({ headers: cors, json: { cheapest: { price: 20 }, options: [{ price: 20 }] } }));
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
            if (ready) return route.fulfill({ headers: cors, json: { cheapest: { price: 20 }, options: [{ price: 20 }] } });
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
        return route.fulfill(ready ? { headers: cors, json: { cheapest: { price: 20 }, options: [{ price: 20 }] } } : { status: 503, headers: cors, json: { error: { code: 'SHIPPING_UNAVAILABLE' } } });
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
    await page.route('**/store/shipping/quote', route => route.fulfill({ headers: cors, json: { cheapest: { price: 20 }, options: [{ price: 20 }] } }));
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
    await page.route('**/store/shipping/quote', route => route.fulfill({ headers: cors, json: { cheapest: { price: 20 }, options: [{ price: 20 }] } }));
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

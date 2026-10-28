import { test, expect } from '@playwright/test';

const origin = 'https://teamcelular.com';
const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Content-Type', 'access-control-allow-methods': 'GET, OPTIONS' };

test('consulta mide apertura sin enviar respuestas ni destino de WhatsApp', async ({ page }) => {
    await page.addInitScript(() => {
        const events: unknown[] = [];
        Object.assign(window, { fixtureEvents: events });
        Object.defineProperty(window, 'gtag', { configurable: true,
            get: () => (_command: string, name: string, props: unknown) => events.push({ name, props }), set: () => undefined });
    });
    await page.context().route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.origin === origin) {
            if (url.pathname.startsWith('/api/')) return route.fulfill({ json: { ok: true } });
            const response = await route.fetch({ url: `http://127.0.0.1:3100${url.pathname}${url.search}`,
                headers: { ...route.request().headers(), origin: 'http://127.0.0.1:3100', referer: 'http://127.0.0.1:3100/', 'sec-fetch-site': 'same-origin' } });
            return route.fulfill({ response });
        }
        if (['127.0.0.1', 'localhost'].includes(url.hostname)) return route.continue();
        return route.abort();
    });
    await page.goto(`${origin}/presupuesto-reparacion?utm_source=google&utm_medium=organic&email=private@example.test`);
    await expect.poll(() => page.evaluate(() => (window as unknown as { fixtureEvents: Array<{ name: string }> }).fixtureEvents.map(event => event.name))).toContain('budget_wizard_view');
    const events = await page.evaluate(() => (window as unknown as { fixtureEvents: unknown[] }).fixtureEvents);
    expect(JSON.stringify(events)).not.toMatch(/private@example|wa\.me|destination|customer_email/);
    expect(JSON.stringify(events)).toContain('organic_search');
});

test('compra exige API confirmada y no se duplica al recargar', async ({ page }) => {
    let paid = false;
    let mutations = 0;
    await page.addInitScript(() => {
        const events: unknown[] = [];
        Object.assign(window, { fixtureEvents: events });
        Object.defineProperty(window, 'gtag', { configurable: true,
            get: () => (_command: string, name: string, props: unknown) => events.push({ name, props }), set: () => undefined });
        if (!localStorage.getItem('fixture-seeded')) {
            localStorage.setItem('fixture-seeded', 'true');
            localStorage.setItem('tc.pedido', JSON.stringify({ clave: 'TC-PRUEBA', token: 'private-token', total: 120, moneda: 'ARS', huella: 'fixture' }));
            localStorage.setItem('tc.analytics.order.TC-PRUEBA', JSON.stringify({ saved_at: Date.now(), shipping: 20, items: [{ item_id: 'product-5', price: 50, quantity: 2 }] }));
        }
    });
    await page.context().route('**/*', async route => {
        const request = route.request();
        const url = new URL(request.url());
        if (url.pathname.startsWith('/store/orders/by-key/')) return route.fulfill({ headers: cors, json: {
            commerce_key: 'TC-PRUEBA', status: paid ? 'paid' : 'pending_payment', paid,
            payment_result: paid ? 'approved' : 'pending', total_amount: 120, currency: 'ARS',
            fulfillment_status: 'pending', tracking_ref: null, can_retry: false,
        } });
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method()) && url.pathname.startsWith('/store/')) {
            mutations++;
            return route.abort();
        }
        if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
        if (url.origin === origin) {
            const response = await route.fetch({ url: `http://127.0.0.1:3100${url.pathname}${url.search}`,
                headers: { ...request.headers(), origin: 'http://127.0.0.1:3100', referer: 'http://127.0.0.1:3100/', 'sec-fetch-site': 'same-origin' } });
            return route.fulfill({ response });
        }
        if (['127.0.0.1', 'localhost'].includes(url.hostname)) return route.continue();
        return route.abort();
    });
    const purchases = () => page.evaluate(() => (window as unknown as { fixtureEvents: Array<{ name: string; props: Record<string, unknown> }> }).fixtureEvents.filter(event => event.name === 'purchase'));
    await page.goto(`${origin}/checkout/exito?status=approved&token=private-token`);
    await expect(page.getByRole('heading', { name: 'Tu pago sigue pendiente' })).toBeVisible();
    expect(await purchases()).toHaveLength(0);
    paid = true;
    await page.getByRole('button', { name: 'Actualizar estado' }).click();
    await expect(page.getByRole('heading', { name: '¡Listo! Tu pago entró' })).toBeVisible();
    await expect.poll(purchases).toHaveLength(1);
    const events = await purchases();
    expect(events[0].props).toMatchObject({ value: 100, shipping: 20, order_total: 120, currency: 'ARS' });
    expect(events[0].props.transaction_id).toMatch(/^tc_[a-f0-9]{64}$/);
    expect(JSON.stringify(events)).not.toMatch(/private-token|TC-PRUEBA/);
    await page.reload();
    await expect(page.getByRole('heading', { name: '¡Listo! Tu pago entró' })).toBeVisible();
    expect(await purchases()).toHaveLength(0);
    expect(mutations).toBe(0);
});

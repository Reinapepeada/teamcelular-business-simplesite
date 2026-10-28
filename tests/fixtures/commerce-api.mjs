import http from 'node:http';
const product = { slug: 'funda-prueba', name: 'Funda de prueba', description: 'Producto ficticio para pruebas', price: 100, currency: 'ARS', brand: 'Prueba', model: 'Prueba', condition: 'new', category: 'Accesorios', image_key: null, image_urls: [], warranty_months: 1, available: 100, shipping_enabled: true };
let seoFailure = '';
const catalogCalls = new Map();
const catalogTrace = [];
http.createServer((request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');
    const path = url.pathname;
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (request.method === 'OPTIONS') { response.writeHead(204); return response.end(); }
    if (path === '/health') return response.end('{}');
    if (request.method !== 'GET') { response.writeHead(405); return response.end('{}'); }
    if (path === '/__fixture/seo') {
        seoFailure = url.searchParams.get('failure') || '';
        catalogCalls.clear();
        catalogTrace.length = 0;
        return response.end('{}');
    }
    if (path === '/__fixture/catalog-counts') return response.end(JSON.stringify(Object.fromEntries(catalogCalls)));
    if (path === '/__fixture/catalog-trace') return response.end(JSON.stringify(catalogTrace));
    if (path === '/store/facets' || path.startsWith('/store/products')) {
        catalogCalls.set(path, (catalogCalls.get(path) || 0) + 1);
        const trace = { path, started_ms: Date.now(), closed_ms: null };
        catalogTrace.push(trace);
        response.on('close', () => { trace.closed_ms = Date.now(); });
    }
    if (seoFailure === 'stall-listing' && path === '/store/products'
        || seoFailure === 'stall-facets' && path === '/store/facets'
        || seoFailure === 'serial-stall-listing' && path === '/store/products') return;
    if (seoFailure === 'serial-stall-listing' && path === '/store/facets') {
        const timer = setTimeout(() => response.end(JSON.stringify({ categories: ['Accesorios'], brands: ['Prueba'], min_price: 100, max_price: 100 })), 3_000);
        response.once('close', () => clearTimeout(timer));
        return;
    }
    if (seoFailure === 'stall-product-body' && path === '/store/products/funda-prueba') {
        response.writeHead(200);
        response.write('{"slug":');
        return;
    }
    if (seoFailure === 'facets' && path === '/store/facets'
        || seoFailure === 'listing' && path === '/store/products'
        || seoFailure === 'product' && path === '/store/products/funda-prueba') {
        response.writeHead(503);
        return response.end(JSON.stringify({ error: { code: 'TEMPORARY_FAILURE' } }));
    }
    if (path === '/store/facets') return response.end(JSON.stringify({ categories: ['Accesorios'], brands: ['Prueba'], min_price: 100, max_price: 100 }));
    if (path === '/store/products') return response.end(JSON.stringify({ items: [product], page: 1, size: 12, total: 1 }));
    if (path === '/store/products/funda-prueba') return response.end(JSON.stringify(product));
    if (path === '/store/pickup-point') return response.end(JSON.stringify({ name: 'Local de prueba', address: 'Dirección ficticia 123', hours: 'Lunes 10 a 18' }));
    response.writeHead(404); response.end('{}');
}).listen(3101, '127.0.0.1');

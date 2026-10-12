import http from 'node:http';
const product = { slug: 'funda-prueba', name: 'Funda de prueba', description: 'Producto ficticio para pruebas', price: 100, currency: 'ARS', brand: 'Prueba', model: 'Prueba', condition: 'new', category: 'Accesorios', image_key: null, image_urls: [], warranty_months: 1, available: 100, shipping_enabled: true };
http.createServer((request, response) => {
    const path = new URL(request.url, 'http://127.0.0.1').pathname;
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (request.method === 'OPTIONS') { response.writeHead(204); return response.end(); }
    if (path === '/health') return response.end('{}');
    if (request.method !== 'GET') { response.writeHead(405); return response.end('{}'); }
    if (path === '/store/facets') return response.end(JSON.stringify({ categories: ['Accesorios'], brands: ['Prueba'], price_min: 100, price_max: 100 }));
    if (path === '/store/products') return response.end(JSON.stringify({ items: [product], page: 1, size: 12, total: 1 }));
    if (path === '/store/products/funda-prueba') return response.end(JSON.stringify(product));
    if (path === '/store/pickup-point') return response.end(JSON.stringify({ name: 'Local de prueba', address: 'Dirección ficticia 123', hours: 'Lunes 10 a 18' }));
    response.writeHead(404); response.end('{}');
}).listen(3101, '127.0.0.1');

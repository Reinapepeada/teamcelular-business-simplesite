import { test, expect } from '@playwright/test';

// Entidades locales: la marca es una Organization, cada sucursal su único LocalBusiness
// y toda referencia {"@id"} resuelve en la misma página o en el grafo global (/ai-feed.jsonld).
const routes = [
    '/', '/sucursales', '/sucursales/caba/recoleta', '/sucursales/caba/belgrano',
    '/zonas/palermo', '/zonas/balvanera', '/guias', '/guias/reparacion-iphone-buenos-aires',
    '/guias/reparacion-samsung-buenos-aires', '/guias/reparacion-motorola-buenos-aires',
    '/guias/reparacion-xiaomi-buenos-aires', '/guias/reparacion-infinix-buenos-aires',
    '/guias/soporte-empresas-servicio-tecnico', '/reparaciones/cambio-pin-carga-caba',
    '/reparaciones/cambio-bateria-caba', '/reparaciones/iphone/13', '/reparaciones/eliminar-virus-celular-caba',
    '/lab', '/en/phone-repair-buenos-aires', '/presupuesto-reparacion', '/sobrenosotros', '/contacto',
    '/ai', '/tienda/funda-prueba',
];

type Node = Record<string, unknown>;

function walk(value: unknown, visit: (node: Node) => void) {
    if (Array.isArray(value)) return value.forEach(item => walk(item, visit));
    if (!value || typeof value !== 'object') return;
    visit(value as Node);
    Object.values(value as Node).forEach(item => walk(item, visit));
}

function collect(roots: unknown[]) {
    const defined = new Set<string>();
    const referenced = new Set<string>();
    const localBusinessByStreet = new Map<string, Set<string>>();
    walk(roots, node => {
        const id = node['@id'];
        if (typeof id !== 'string') return;
        if (Object.keys(node).every(key => key === '@id')) referenced.add(id);
        else defined.add(id);
        if ([node['@type']].flat().includes('LocalBusiness')) {
            const street = String((node.address as Node | undefined)?.streetAddress ?? id);
            localBusinessByStreet.set(street, new Set([...(localBusinessByStreet.get(street) ?? []), id]));
        }
    });
    return { defined, referenced, localBusinessByStreet };
}

test('Ninguna página duplica LocalBusiness por dirección ni deja @id colgados', async ({ request }) => {
    test.setTimeout(240_000);
    const global = collect([await (await request.get('/ai-feed.jsonld')).json()]);
    for (const route of routes) {
        const response = await request.get(route);
        expect(response.status(), route).toBe(200);
        const html = await response.text();
        const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
            .map(match => JSON.parse(match[1]));
        expect(blocks.length, route).toBeGreaterThan(0);
        const page = collect(blocks);
        for (const [street, ids] of page.localBusinessByStreet) expect([...ids], `${route} ${street}`).toHaveLength(1);
        for (const id of page.referenced) {
            expect(page.defined.has(id) || global.defined.has(id), `${route} referencia ${id}`).toBe(true);
        }
        // El LocalBusiness raíz (dominio#localbusiness) ya no existe: solo las sucursales tienen uno.
        expect(html, route).not.toMatch(/"https?:\/\/[^"/]+\/?#localbusiness"/);
        expect(html, route).not.toContain('share.google');
    }
});

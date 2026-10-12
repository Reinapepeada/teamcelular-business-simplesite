import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const footer = readFileSync(new URL('../src/components/footer/FooterNUI.tsx', import.meta.url), 'utf8');
const section = readFileSync(new URL('../src/components/footer/FooterSection.tsx', import.meta.url), 'utf8');

test('footer navigation collapses in three mobile sections without moving contact or legal links inside', () => {
  assert.deepEqual([...footer.matchAll(/<FooterSection title="([^"]+)"/g)].map(m => m[1]), ['Servicios', 'Guías técnicas', 'Recursos']);
  const lastPanel = footer.lastIndexOf('</FooterSection>');
  for (const destination of ['tel:+5491151034595', 'mailto:teamcelular.arg@gmail.com', '/contacto#ubicacion', '/terminos', '/devoluciones', '/privacidad']) {
    assert.ok(footer.indexOf(`href="${destination}"`) > lastPanel, destination);
  }
  assert.match(footer, /BRANCHES\.map/);
  assert.match(footer, /\/en\/phone-repair-buenos-aires/);
});

test('footer disclosure is keyboard-native, labelled, SSR-complete and expanded on desktop', () => {
  assert.match(section, /<button[\s\S]*type="button"/);
  assert.match(section, /aria-expanded=\{expanded\}/);
  assert.match(section, /aria-controls=\{panelId\}/);
  assert.match(section, /id=\{panelId\}/);
  assert.match(section, /focus-visible:outline/);
  assert.match(section, /md:flex/);
  assert.match(section, /\{children\}/);
  assert.doesNotMatch(section, /expanded\s*&&\s*children/);
  assert.match(section, /<noscript>[\s\S]*display: flex !important/);
});

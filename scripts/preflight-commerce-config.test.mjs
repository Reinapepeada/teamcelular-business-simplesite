import assert from 'node:assert/strict';
import test from 'node:test';
import { validateCommerceConfig } from './preflight-commerce-config.mjs';

test('acepta API mismo host o proxy mismo origen versionado', () => {
  const base = { NODE_ENV: 'production', NEXT_PUBLIC_BASE_URL: 'https://teamcelular.com' };
  assert.deepEqual(validateCommerceConfig({ ...base, NEXT_PUBLIC_STORE_API_URL: 'https://teamcelular.com/api' }), []);
  assert.deepEqual(validateCommerceConfig(base), []);
});

test('rechaza API de otro host', () => {
  const base = { NODE_ENV: 'production', NEXT_PUBLIC_BASE_URL: 'https://teamcelular.com' };
  assert.match(
    validateCommerceConfig({ ...base, NEXT_PUBLIC_STORE_API_URL: 'https://api.example.com' }).join(' '),
    /conservar el host/,
  );
});

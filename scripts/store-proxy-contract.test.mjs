import assert from 'node:assert/strict';
import test from 'node:test';
import config from '../next.config.js';

test('el proxy de tienda apunta al storefront productivo', async () => {
  const rewrites = await config.rewrites();

  assert.deepEqual(rewrites, [
    {
      source: '/store/:path*',
      destination: 'https://api.beescend.com/store/:path*',
    },
  ]);
});

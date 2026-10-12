const assert = require('node:assert/strict');
const { mkdirSync, writeFileSync } = require('node:fs');
const { chromium } = require('playwright');

(async () => {
  const phase = process.argv[2] || 'after';
  mkdirSync('footer-evidence', { recursive: true });
  const browser = await chromium.launch();
  const measurements = [];
  try {
    for (const width of [320, 375, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.route('**/*', route => {
        const url = new URL(route.request().url());
        return url.hostname === '127.0.0.1' && !url.pathname.startsWith('/store/')
          ? route.continue() : route.abort();
      });
      await page.goto('http://127.0.0.1:3027/terminos', { waitUntil: 'networkidle' });
      const footer = page.locator('footer');
      await footer.waitFor();
      const links = await footer.locator('a').evaluateAll(anchors => anchors.map(a => a.getAttribute('href')).sort());
      const box = await footer.boundingBox();
      measurements.push({ width, height: box.height, links });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'No horizontal overflow');
      await footer.screenshot({ path: `footer-evidence/${phase}-${width}.png` });
      if (phase === 'after') {
        assert.equal(await footer.getByRole('link', { name: 'Ver ubicación', exact: true }).isVisible(), true);
        assert.equal(await footer.getByRole('link', { name: 'Términos', exact: true }).isVisible(), true);
        if (width < 768) {
          const toggles = footer.locator('.footer-toggle');
          assert.equal(await toggles.count(), 3);
          for (const button of await toggles.all()) {
            assert.equal(await button.getAttribute('aria-expanded'), 'false');
            const id = await button.getAttribute('aria-controls');
            const panel = page.locator(`[id="${id}"]`);
            assert.equal(await panel.isVisible(), false);
            await button.focus();
            await page.keyboard.press('Enter');
            assert.equal(await button.getAttribute('aria-expanded'), 'true');
            assert.equal(await panel.isVisible(), true);
            await page.keyboard.press('Tab');
            assert.equal(await panel.locator('a').first().evaluate(a => a === document.activeElement), true);
            await button.focus();
            await page.keyboard.press('Space');
            assert.equal(await panel.isVisible(), false);
            await page.keyboard.press('Tab');
            assert.equal(await panel.evaluate(p => p.contains(document.activeElement)), false);
            await button.click();
            await button.click();
            assert.equal(await button.getAttribute('aria-expanded'), 'false');
          }
          await toggles.first().click();
          if (width === 375) await footer.screenshot({ path: 'footer-evidence/after-375-expanded.png' });
          await page.setViewportSize({ width: 1280, height: 900 });
          for (const panel of await footer.locator('.footer-panel').all()) assert.equal(await panel.isVisible(), true);
          await page.setViewportSize({ width, height: 900 });
          assert.equal(await toggles.first().getAttribute('aria-expanded'), 'true');
        } else {
          for (const panel of await footer.locator('.footer-panel').all()) assert.equal(await panel.isVisible(), true);
          assert.equal(await footer.locator('.footer-toggle').first().isVisible(), false);
        }
      }
      await page.close();
    }
    if (phase === 'after') {
      const before = require('../footer-evidence/before.json');
      for (const m of measurements) {
        const baseline = before.find(b => b.width === m.width);
        assert.deepEqual(m.links, baseline.links, 'Preserve all existing anchor destinations');
        if (m.width < 768) assert.ok(m.height < baseline.height * 0.55, 'Mobile footer at least 45% shorter');
      }
      const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
      await noJS.route('**/*', r => new URL(r.request().url()).hostname === '127.0.0.1' ? r.continue() : r.abort());
      await noJS.goto('http://127.0.0.1:3027/terminos');
      for (const panel of await noJS.locator('footer .footer-panel').all()) assert.equal(await panel.isVisible(), true, 'No-JS fallback exposes content');
      await noJS.close();
    }
    writeFileSync(`footer-evidence/${phase}.json`, JSON.stringify(measurements, null, 2));
    console.log(JSON.stringify(measurements.map(({ width, height }) => ({ width, height }))));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

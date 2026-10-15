import { defineConfig } from '@playwright/test';
import path from 'node:path';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    workers: 1,
    timeout: 45_000,
    expect: { timeout: 15_000 },
    use: {
        baseURL: 'http://127.0.0.1:3100',
        headless: true,
        launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE },
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
    },
    webServer: [
        { command: 'node tests/fixtures/commerce-api.mjs', url: 'http://127.0.0.1:3101/health', reuseExistingServer: false },
        {
            command: 'npm run dev -- --hostname 127.0.0.1 --port 3100',
            url: 'http://127.0.0.1:3100/checkout/exito', timeout: 120_000, reuseExistingServer: false,
            env: {
                NEXT_PUBLIC_BASE_URL: 'http://127.0.0.1:3100',
                NEXT_PUBLIC_STORE_API_URL: 'http://127.0.0.1:3101',
                NEXT_PUBLIC_API_URL: 'http://127.0.0.1:3101',
                NEXT_TELEMETRY_DISABLED: '1',
                NODE_OPTIONS: `--import ${path.resolve('tests/fixtures/local-network-only.mjs')}`,
            },
        },
    ],
});

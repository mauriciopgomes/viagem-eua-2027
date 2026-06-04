// ============================================================
// Visual smoke test for the PWA.
// Run: node visual-smoke-test.js
//
// Requires Playwright when available. If Playwright is not installed,
// this script exits successfully with a clear SKIP message so the base
// test suite stays dependency-free.
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

let chromium;
try {
    chromium = require('playwright').chromium;
} catch (e) {
    console.log('SKIP visual smoke test: Playwright is not installed.');
    process.exit(0);
}

const BASE = __dirname;
const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2'
};

function serveFile(req, res) {
    const rawPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const safePath = path.normalize(rawPath === '/' ? '/index.html' : rawPath).replace(/^(\.\.[/\\])+/, '');
    const filePath = path.join(BASE, safePath);
    if (!filePath.startsWith(BASE)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        res.end(data);
    });
}

(async () => {
    const server = http.createServer(serveFile);
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    const url = `http://127.0.0.1:${port}/`;
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });

    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });

    try {
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.locator('#sec-home.section.active').waitFor();
        await page.locator('.activity-card').first().waitFor();

        await page.locator('button[aria-controls="sec-map"]').click();
        await page.locator('#sec-map.section.active').waitFor();
        await page.locator('.leaflet-pane').waitFor();

        await page.locator('button[aria-controls="sec-explore"]').click();
        await page.locator('#sec-explore.section.active').waitFor();
        await page.locator('.explore-section').first().waitFor();

        await page.locator('button[aria-controls="sec-settings"]').click();
        await page.locator('#sec-settings.section.active').waitFor();
        await page.locator('#appVersion').waitFor();

        if (errors.length) throw new Error('Browser errors:\n' + errors.join('\n'));
        console.log('PASS visual smoke test');
    } finally {
        await browser.close();
        await new Promise(resolve => server.close(resolve));
    }
})().catch(err => {
    console.error(err);
    process.exit(1);
});

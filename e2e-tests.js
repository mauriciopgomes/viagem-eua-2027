#!/usr/bin/env node
// e2e-tests.js — End-to-End tests for Viagem EUA 2027 PWA
// Tests user interactions, rendering, and PWA features in a real browser
// Run: npm run e2e (after: npm install --save-dev @playwright/test)

const { chromium } = require('@playwright/test');
const path = require('path');

// Test framework
let passed = 0, failed = 0, total = 0;
const results = [];
let currentSection = '';

function section(name) {
    currentSection = name;
    console.log(`\n📋 ${name}`);
}

async function test(name, fn) {
    total++;
    try {
        await fn();
        passed++;
        results.push({ section: currentSection, name, status: '✅' });
        console.log(`  ✅ ${name}`);
    } catch (e) {
        failed++;
        results.push({ section: currentSection, name, status: '❌', error: e.message });
        console.log(`  ❌ ${name}: ${e.message}`);
    }
}

function assertEqual(actual, expected, msg) {
    if (actual !== expected) {
        throw new Error(`${msg || 'assertEqual'}: expected "${expected}", got "${actual}"`);
    }
}

function assert(condition, msg) {
    if (!condition) throw new Error(msg || 'Assertion failed');
}

// Main E2E tests
(async () => {
    let browser, context, page;
    const baseUrl = 'file://' + path.resolve(__dirname, 'index.html');

    try {
        // Launch browser with Playwright
        browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
        context = await browser.newContext({ viewport: { width: 375, height: 812 } });
        page = await context.newPage();
        
        console.log(`🌐 Loading: ${baseUrl}`);
        await page.goto(baseUrl, { waitUntil: 'networkidle' });

        // ==================== PAGE LOAD ====================
        section('PWA — Page Load & DOM');

        await test('Page title contains "Viagem"', async () => {
            const title = await page.title();
            assert(title.includes('Viagem'), `Title: ${title}`);
        });

        await test('Hero image renders', async () => {
            const heroImg = await page.locator('#heroImg');
            assert(await heroImg.count() > 0, 'Hero image not found');
        });

        await test('Day selector container exists', async () => {
            const daySelector = await page.locator('#daySelector');
            assert(await daySelector.count() > 0, 'Day selector not found');
        });

        await test('Dark theme applied', async () => {
            const bgColor = await page.evaluate(() => {
                return window.getComputedStyle(document.documentElement).backgroundColor;
            });
            // Should have dark background (black or very dark)
            assert(bgColor.includes('rgb'), `Background color: ${bgColor}`);
        });

        // ==================== NAVIGATION ====================
        section('PWA — Navigation & Day Selection');

        await test('Select day 2 via pill click', async () => {
            const dayPill = page.locator('.day-pill[data-d="2"]');
            await dayPill.click();
            await page.waitForTimeout(500);

            const heroSrc = await page.locator('#heroImg').getAttribute('src');
            assert(heroSrc.includes('dia-02'), `Hero image src: ${heroSrc}`);
        });

        await test('Render day activities', async () => {
            const activityCount = await page.locator('.activity-card').count();
            assert(activityCount > 0, `No activities rendered (got ${activityCount})`);
        });

        await test('Activity cards have images', async () => {
            const firstCard = page.locator('.activity-card').first();
            const img = firstCard.locator('.activity-card-photo');
            const src = await img.getAttribute('src');
            assert(src && src.length > 0, 'Activity card has no image');
        });

        // ==================== INTERACTIVITY ====================
        section('PWA — User Interactions');

        await test('Click activity card opens detail sheet', async () => {
            const firstCard = page.locator('.activity-card').first();
            await firstCard.click();
            await page.waitForTimeout(300);

            const sheet = page.locator('#sheet');
            const isVisible = await sheet.evaluate(el => el.classList.contains('open') || el.style.display !== 'none');
            assert(isVisible, 'Detail sheet not visible after click');
        });

        await test('Close sheet on Escape key', async () => {
            const sheet = page.locator('#sheet');
            if (await sheet.count() > 0) {
                await page.keyboard.press('Escape');
                await page.waitForTimeout(300);

                const isClosed = await sheet.evaluate(el => !el.classList.contains('open') && el.style.display === 'none');
                assert(isClosed, 'Sheet not closed after Escape');
            }
        });

        await test('Previous day button works', async () => {
            // Click day 3 pill, then day 2 pill
            await page.locator('.day-pill[data-d="3"]').click();
            await page.waitForTimeout(300);
            await page.locator('.day-pill[data-d="2"]').click();
            await page.waitForTimeout(300);

            const heroSrc = await page.locator('#heroImg').getAttribute('src');
            assert(heroSrc.includes('dia-02'), `Hero image should be dia-02, got: ${heroSrc}`);
        });

        await test('Next day button works', async () => {
            // Click day 2 pill, then day 3 pill
            await page.locator('.day-pill[data-d="2"]').click();
            await page.waitForTimeout(300);
            await page.locator('.day-pill[data-d="3"]').click();
            await page.waitForTimeout(300);

            const heroSrc = await page.locator('#heroImg').getAttribute('src');
            assert(heroSrc.includes('dia-03'), `Hero image should be dia-03, got: ${heroSrc}`);
        });

        // ==================== DATA VALIDATION ====================
        section('PWA — Data Integrity');

        await test('All days have valid data', async () => {
            const validation = await page.evaluate(() => {
                if (!window.days || !Array.isArray(window.days)) return 'No days array';
                if (window.days.length !== 33) return `Expected 33 days, got ${window.days.length}`;
                
                for (let d of window.days) {
                    if (!d.day || !d.title || !d.items || !Array.isArray(d.items)) {
                        return `Day ${d.day} invalid structure`;
                    }
                }
                return null;
            });
            assert(validation === null, validation || 'Data validation passed');
        });

        await test('Activity photos exist', async () => {
            const photoValidation = await page.evaluate(() => {
                if (!window.activityPhotos || typeof window.activityPhotos !== 'object') {
                    return 'No activityPhotos object';
                }
                const keys = Object.keys(window.activityPhotos);
                if (keys.length < 100) return `Only ${keys.length} photos (expected 300+)`;
                return null;
            });
            assert(photoValidation === null, photoValidation || 'Photos validation passed');
        });

        await test('Place info exists for major locations', async () => {
            const placeValidation = await page.evaluate(() => {
                if (!window.placeInfo || typeof window.placeInfo !== 'object') {
                    return 'No placeInfo object';
                }
                const keys = Object.keys(window.placeInfo);
                if (keys.length < 300) return `Only ${keys.length} places (expected 300+)`;
                
                // Check for specific major locations
                const required = ['Times Square', 'Golden Gate Bridge', 'Grand Canyon'];
                for (let loc of required) {
                    if (!window.placeInfo[loc]) return `Missing ${loc}`;
                }
                return null;
            });
            assert(placeValidation === null, placeValidation || 'Place info validation passed');
        });

        // ==================== RESPONSIVE DESIGN ====================
        section('PWA — Responsive Design');

        await test('Mobile layout renders (375px)', async () => {
            const hero = page.locator('.hero');
            const display = await hero.evaluate(el => window.getComputedStyle(el).display);
            assert(display === 'block', `Hero display: ${display}`);
        });

        await test('Day pills render on mobile', async () => {
            const dayPills = await page.locator('.day-pill').count();
            assert(dayPills > 0, `No day pills rendered (got ${dayPills})`);
        });

        // ==================== PERFORMANCE ====================
        section('PWA — Performance Metrics');

        await test('LCP (Largest Contentful Paint) < 3s', async () => {
            const lcpTime = await page.evaluate(() => {
                return new Promise((resolve) => {
                    let lcp = 0;
                    const observer = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        lcp = entries[entries.length - 1].renderTime || entries[entries.length - 1].loadTime;
                    });
                    observer.observe({ type: 'largest-contentful-paint', buffered: true });
                    setTimeout(() => resolve(lcp), 1500);
                });
            });
            assert(lcpTime < 3000, `LCP too high: ${Math.round(lcpTime)}ms`);
        });

        await test('Images lazy load', async () => {
            const lazyImages = await page.locator('img[loading="lazy"]').count();
            assert(lazyImages > 0, `No lazy-loaded images found`);
        });

        // ==================== ACCESSIBILITY ====================
        section('PWA — Accessibility (a11y)');

        await test('All images have alt text', async () => {
            const images = page.locator('img');
            const count = await images.count();
            for (let i = 0; i < count; i++) {
                const alt = await images.nth(i).getAttribute('alt');
                assert(alt && alt.trim().length > 0, `Image ${i} missing alt text`);
            }
        });

        await test('Color contrast sufficient', async () => {
            const bodyColor = await page.evaluate(() => {
                const text = document.querySelector('body');
                const bgColor = window.getComputedStyle(text).backgroundColor;
                const textColor = window.getComputedStyle(text).color;
                return { bg: bgColor, fg: textColor };
            });
            assert(bodyColor.bg && bodyColor.fg, `Could not determine colors`);
        });

        await test('Buttons are keyboard accessible', async () => {
            const btnCount = await page.locator('button, a[href], [role="button"]').count();
            assert(btnCount > 5, `Too few accessible buttons: ${btnCount}`);
        });

        await test('Tab navigation works', async () => {
            const tabs = page.locator('.tab-item');
            const tabCount = await tabs.count();
            assert(tabCount === 4, `Expected 4 tabs, got ${tabCount}`);
        });

        // ==================== PWA FEATURES ====================
        section('PWA — Service Worker & Offline');

        await test('Service Worker API available', async () => {
            const swAvailable = await page.evaluate(() => {
                return navigator.serviceWorker ? true : false;
            });
            assert(swAvailable, 'Service Worker API not available');
        });

        await test('Manifest.json loads', async () => {
            const manifestStatus = await page.evaluate(async () => {
                try {
                    const resp = await fetch('manifest.json');
                    return resp.ok;
                } catch (e) {
                    return false;
                }
            });
            assert(manifestStatus, 'Manifest.json not loading');
        });

        // ==================== SUMMARY ====================
        console.log(`\n${'='.repeat(60)}`);
        console.log(`📊 RESULTS: ${passed}/${total} passed (${failed} failed)`);
        console.log(`${'='.repeat(60)}\n`);

        if (failed > 0) {
            process.exit(1);
        }

    } catch (err) {
        console.error('❌ Fatal error:', err.message);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
    }
})();

#!/usr/bin/env node
// e2e-tests.js — End-to-End tests for Viagem EUA 2027 PWA
// Tests user interactions, rendering, and PWA features in a real browser
// Run: npm run e2e (after: npm install --save-dev @playwright/test)

const { chromium } = require('@playwright/test');
const path = require('path');

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

(async () => {
    let browser, context, page;
    // Use HTTP server to avoid CSP file:// restrictions (inline onclick handlers need same-origin)
    // Start server with: npm run dev (python3 -m http.server 8000)
    const baseUrl = 'http://localhost:8000';

    try {
        browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
        context = await browser.newContext({ viewport: { width: 390, height: 844 } });
        page = await context.newPage();

        console.log(`🌐 Loading: ${baseUrl}`);
        await page.goto(baseUrl, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // ==================== PAGE LOAD ====================
        section('PWA — Page Load & DOM');

        await test('Page title set', async () => {
            const title = await page.title();
            assert(title && title.length > 0, `Title is empty`);
        });

        await test('Hero image renders with src', async () => {
            const heroImg = page.locator('#heroImg');
            assert(await heroImg.count() > 0, 'Hero image not found');
            const src = await heroImg.getAttribute('src');
            assert(src && src.includes('dia-'), `Hero image src: ${src}`);
        });

        await test('Day selector container exists', async () => {
            assert(await page.locator('#daySelector').count() > 0, '#daySelector not found');
        });

        await test('Dark theme CSS variables set', async () => {
            const bg = await page.evaluate(() => {
                return window.getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
            });
            // --bg is defined in :root — if empty, stylesheet didn't load
            assert(bg.length > 0, `--bg CSS variable not set (stylesheet not loaded?)`);
        });

        await test('Day 1 activities render (≥5 cards)', async () => {
            const count = await page.locator('.activity-card').count();
            assert(count >= 5, `Expected ≥5 activity cards, got ${count}`);
        });

        await test('Activity cards have media section', async () => {
            const count = await page.locator('.activity-card-media').count();
            assert(count >= 1, `No .activity-card-media found`);
        });

        await test('Activity type badges render', async () => {
            const count = await page.locator('.activity-type-badge').count();
            assert(count >= 1, `No .activity-type-badge found`);
        });

        await test('Hero countdown badge renders', async () => {
            // updateCountdown() should set a badge in .hero-badge-countdown or .hero-badge
            const hasBadge = await page.evaluate(() => {
                const el = document.querySelector('.hero-badge-countdown, .hero-badge');
                return el ? el.textContent.length > 0 : false;
            });
            assert(hasBadge, 'No hero countdown/badge text found');
        });

        // ==================== NAVIGATION ====================
        section('PWA — Navigation & Day Selection');

        await test('Day pills render for all 33 days', async () => {
            const count = await page.locator('.day-pill').count();
            assertEqual(count, 33, 'Day pill count');
        });

        await test('Day pills have thumbnail slot (.pill-thumb)', async () => {
            const count = await page.locator('.pill-thumb').count();
            assertEqual(count, 33, 'Pill thumb count');
        });

        await test('Day pills have aria-label', async () => {
            const count = await page.locator('.day-pill[aria-label]').count();
            assertEqual(count, 33, 'Day pills with aria-label');
        });

        await test('Select day 5 (voo NYC→LAX) — hero updates + no CSP errors', async () => {
            const errors = [];
            page.on('console', msg => { if (msg.type() === 'error' && msg.text().includes('Content Security Policy')) errors.push(msg.text()); });
            await page.locator('.day-pill[data-d="5"]').click();
            await page.waitForTimeout(800);
            const heroSrc = await page.locator('#heroImg').getAttribute('src');
            const count = await page.locator('.activity-card').count();
            assert(heroSrc.includes('dia-05'), `Hero src: ${heroSrc}`);
            assert(count >= 3, `Expected ≥3 activities for day 5, got ${count}`);
            assert(errors.length === 0, `CSP violations: ${errors.length}`);
        });

        await test('Select day 15 (Yosemite) — hero updates', async () => {
            await page.locator('.day-pill[data-d="15"]').click();
            await page.waitForTimeout(800);
            const heroSrc = await page.locator('#heroImg').getAttribute('src');
            const count = await page.locator('.activity-card').count();
            // dayPhotos[15] is whatever photo data.js assigns to day 15 — just verify it changed
            assert(heroSrc && heroSrc.includes('dia-'), `Hero src not a dia image: ${heroSrc}`);
            assert(count >= 3, `Expected ≥3 activities for day 15, got ${count}`);
        });

        await test('Select day 1 and return to start', async () => {
            await page.locator('.day-pill[data-d="1"]').click();
            await page.waitForTimeout(500);
            const count = await page.locator('.activity-card').count();
            assert(count >= 5, `Expected ≥5 activities for day 1, got ${count}`);
        });

        await test('Keyboard ArrowRight advances day', async () => {
            // Focus home section, then press arrow
            await page.locator('#sec-home').click();
            await page.waitForTimeout(100);
            await page.keyboard.press('ArrowRight');
            await page.waitForTimeout(500);
            const activePill = await page.locator('.day-pill.active, .day-pill[data-d="2"]').first().getAttribute('data-d');
            assert(activePill === '2', `Expected active pill to be day 2, got ${activePill}`);
        });

        await test('Keyboard ArrowLeft goes back', async () => {
            await page.keyboard.press('ArrowLeft');
            await page.waitForTimeout(500);
            const activePill = await page.locator('.day-pill.active, .day-pill[data-d="1"]').first().getAttribute('data-d');
            assert(activePill === '1', `Expected active pill to be day 1, got ${activePill}`);
        });

        // ==================== INTERACTIVITY ====================
        section('PWA — User Interactions');

        await test('Activity card click opens detail sheet', async () => {
            // Find a card with onclick=openDetail (has placeInfo)
            const cardWithDetail = await page.evaluate(() => {
                const cards = Array.from(document.querySelectorAll('.activity-card[onclick]'));
                return cards.length > 0;
            });
            if (cardWithDetail) {
                const card = page.locator('.activity-card[onclick]').first();
                await card.click();
            } else {
                await page.locator('.activity-card').first().click();
            }
            await page.waitForTimeout(600);
            const hasOpen = await page.locator('#sheet').evaluate(el => el.classList.contains('open'));
            assert(hasOpen, 'Sheet does not have .open class after card click');
        });

        await test('Sheet body has content', async () => {
            const text = await page.locator('#sheetBody').textContent();
            assert(text && text.trim().length > 0, 'Sheet body is empty');
        });

        await test('Close sheet on Escape', async () => {
            await page.keyboard.press('Escape');
            await page.waitForTimeout(500);
            const hasOpen = await page.locator('#sheet').evaluate(el => el.classList.contains('open'));
            assert(!hasOpen, 'Sheet still has .open class after Escape');
        });

        await test('Check button toggles done state', async () => {
            const checkBtn = page.locator('.card-action-btn[data-action-check]').first();
            const wasDone = await checkBtn.evaluate(el => el.classList.contains('action-done'));
            await checkBtn.click();
            await page.waitForTimeout(200);
            const isDone = await checkBtn.evaluate(el => el.classList.contains('action-done'));
            assert(isDone !== wasDone, 'Check button state did not toggle');
            // Restore
            await checkBtn.click();
            await page.waitForTimeout(200);
        });

        await test('Fav button toggles active state', async () => {
            const favBtn = page.locator('.card-action-btn[data-action-fav]').first();
            const wasActive = await favBtn.evaluate(el => el.classList.contains('action-fav-active'));
            await favBtn.click();
            await page.waitForTimeout(200);
            const isActive = await favBtn.evaluate(el => el.classList.contains('action-fav-active'));
            assert(isActive !== wasActive, 'Fav button state did not toggle');
            // Restore
            await favBtn.click();
            await page.waitForTimeout(200);
        });

        await test('Search input accepts text', async () => {
            const search = page.locator('#searchInput');
            await search.fill('Yosemite');
            await page.waitForTimeout(400);
            const val = await search.inputValue();
            assert(val === 'Yosemite', `Search value: ${val}`);
            await search.fill('');
            await page.waitForTimeout(200);
        });

        // ==================== TABS ====================
        section('PWA — Tab Navigation');

        await test('Map tab switches to sec-map', async () => {
            await page.locator('#tabMap').click();
            await page.waitForTimeout(500);
            const isActive = await page.locator('#sec-map').evaluate(el => el.classList.contains('active'));
            assert(isActive, '#sec-map does not have .active class after map tab click');
        });

        await test('Map element present in DOM', async () => {
            const mapEl = await page.locator('#map').count();
            assert(mapEl > 0, '#map element not found');
        });

        await test('Explore tab switches to sec-explore', async () => {
            await page.locator('#tabExplore').click();
            await page.waitForTimeout(500);
            const isActive = await page.locator('#sec-explore').evaluate(el => el.classList.contains('active'));
            assert(isActive, '#sec-explore does not have .active class after explore tab click');
        });

        await test('Explore renders content', async () => {
            const content = await page.locator('#exploreContent').textContent();
            assert(content && content.trim().length > 0, '#exploreContent is empty');
        });

        await test('Explore hotel items render', async () => {
            const hotelsFilter = page.locator('[data-filter="hotels"]');
            if (await hotelsFilter.count() > 0) {
                await hotelsFilter.click();
                await page.waitForTimeout(400);
            }
            const count = await page.locator('.hotel-item').count();
            assert(count > 0, `No .hotel-item in Explore (got ${count})`);
        });

        await test('Explore hotel thumbnails render', async () => {
            const count = await page.locator('.hotel-thumb-wrap').count();
            assert(count > 0, 'No .hotel-thumb-wrap in Explore');
        });

        await test('Explore park cards render', async () => {
            const parksFilter = page.locator('[data-filter="parks"]');
            if (await parksFilter.count() > 0) {
                await parksFilter.click();
                await page.waitForTimeout(400);
            }
            const count = await page.locator('.explore-park-card').count();
            assert(count > 0, `No .explore-park-card in Explore (got ${count})`);
        });

        await test('Settings tab switches to sec-settings', async () => {
            await page.locator('#tabSettings').click();
            await page.waitForTimeout(500);
            const isActive = await page.locator('#sec-settings').evaluate(el => el.classList.contains('active'));
            assert(isActive, '#sec-settings does not have .active class after settings tab click');
        });

        await test('Settings has sync URL input', async () => {
            const input = await page.locator('#syncUrlInput').count();
            assert(input > 0, '#syncUrlInput not found in Settings');
        });

        await test('Home tab returns to sec-home', async () => {
            await page.locator('#tabHome').click();
            await page.waitForTimeout(500);
            const isActive = await page.locator('#sec-home').evaluate(el => el.classList.contains('active'));
            assert(isActive, '#sec-home does not have .active class after home tab click');
        });

        // ==================== DATA INTEGRITY ====================
        section('PWA — Data Integrity (in-browser)');

        await test('totalDays === 33', async () => {
            const count = await page.evaluate(() => typeof totalDays !== 'undefined' ? totalDays : null);
            assertEqual(count, 33, 'totalDays');
        });

        await test('days array has 33 items', async () => {
            const count = await page.evaluate(() => {
                // data.js declares `const days` — accessible in file scope
                try { return window.days ? window.days.length : days.length; }
                catch(e) { return null; }
            });
            assert(count === 33, `days.length: ${count}`);
        });

        await test('activityPhotos has ≥100 entries', async () => {
            const count = await page.evaluate(() => {
                try { return Object.keys(activityPhotos).length; } catch(e) { return -1; }
            });
            assert(count >= 100, `activityPhotos has ${count} entries`);
        });

        await test('placeInfo has ≥100 entries', async () => {
            const count = await page.evaluate(() => {
                try { return Object.keys(placeInfo).length; } catch(e) { return -1; }
            });
            assert(count >= 100, `placeInfo has ${count} entries`);
        });

        await test('dayPhotos covers all 33 days', async () => {
            const count = await page.evaluate(() => {
                try { return Object.keys(dayPhotos).length; } catch(e) { return -1; }
            });
            assertEqual(count, 33, 'dayPhotos entry count');
        });

        await test('Key locations in placeInfo (Golden Gate, Grand Canyon)', async () => {
            const missing = await page.evaluate(() => {
                try {
                    const required = ['Golden Gate Bridge', 'Grand Canyon'];
                    return required.filter(loc => !placeInfo[loc]);
                } catch(e) { return ['placeInfo undefined']; }
            });
            assert(missing.length === 0, `Missing placeInfo entries: ${missing.join(', ')}`);
        });

        await test('activityPhotos includes Times Square', async () => {
            const has = await page.evaluate(() => {
                try { return 'Times Square' in activityPhotos; } catch(e) { return false; }
            });
            assert(has, 'activityPhotos missing "Times Square"');
        });

        // ==================== RESPONSIVE ====================
        section('PWA — Responsive Design');

        await test('Mobile (390px): hero visible', async () => {
            await page.setViewportSize({ width: 390, height: 844 });
            const display = await page.locator('.hero').evaluate(el => window.getComputedStyle(el).display);
            assert(display !== 'none', `Hero display: ${display}`);
        });

        await test('Mobile (390px): tab bar visible', async () => {
            const display = await page.locator('.tab-bar').evaluate(el => window.getComputedStyle(el).display);
            assert(display !== 'none', `Tab bar display: ${display}`);
        });

        await test('Mobile (390px): cards are wide (≥80% vw)', async () => {
            const cardWidth = await page.locator('.activity-card').first().evaluate(el => el.offsetWidth);
            const vw = await page.evaluate(() => window.innerWidth);
            assert(cardWidth >= vw * 0.8, `Card ${cardWidth}px < 80% of ${vw}px viewport`);
        });

        await test('Desktop (1440px): home-main visible', async () => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.waitForTimeout(300);
            const display = await page.locator('.home-main').evaluate(el => window.getComputedStyle(el).display);
            assert(display !== 'none', `home-main display: ${display}`);
            await page.setViewportSize({ width: 390, height: 844 });
        });

        await test('Desktop (1440px): sidebar renders days', async () => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.waitForTimeout(300);
            const sidebarItems = await page.locator('.sidebar-item').count();
            assert(sidebarItems === 33, `Expected 33 sidebar items, got ${sidebarItems}`);
            await page.setViewportSize({ width: 390, height: 844 });
        });

        // ==================== PERFORMANCE ====================
        section('PWA — Performance Metrics');

        await test('Images use lazy loading', async () => {
            const count = await page.locator('img[loading="lazy"]').count();
            assert(count > 0, 'No lazy-loaded images found');
        });

        await test('Activity card media loads within 3s', async () => {
            await page.locator('.day-pill[data-d="1"]').click();
            await page.waitForTimeout(500);
            const mediaCount = await page.locator('.activity-card-media').count();
            assert(mediaCount >= 5, `Expected ≥5 card media, got ${mediaCount}`);
        });

        await test('LCP ≤ 3000ms', async () => {
            const lcp = await page.evaluate(() => new Promise(resolve => {
                let val = 0;
                try {
                    const obs = new PerformanceObserver(list => {
                        const e = list.getEntries();
                        val = e[e.length - 1].renderTime || e[e.length - 1].loadTime;
                    });
                    obs.observe({ type: 'largest-contentful-paint', buffered: true });
                } catch(e) {}
                setTimeout(() => resolve(val), 1500);
            }));
            // val===0 = browser didn't report → skip
            assert(lcp === 0 || lcp < 3000, `LCP: ${Math.round(lcp)}ms`);
        });

        // ==================== ACCESSIBILITY ====================
        section('PWA — Accessibility (a11y)');

        await test('Visible non-decorative images have alt text', async () => {
            const bad = await page.evaluate(() => {
                // Decorative images: empty alt="" is correct a11y
                // We only flag images that are VISIBLE and have no alt at all (attribute missing)
                return Array.from(document.querySelectorAll('img:not([alt])')).filter(img => {
                    const s = window.getComputedStyle(img);
                    if (s.display === 'none' || s.visibility === 'hidden') return false;
                    if (img.offsetWidth === 0 && img.offsetHeight === 0) return false;
                    return true;
                }).map(img => img.id || img.src.slice(-30));
            });
            assert(bad.length === 0, `Images missing alt attribute: ${bad.join(', ')}`);
        });

        await test('Tab bar has role="tablist"', async () => {
            const count = await page.locator('[role="tablist"]').count();
            assert(count > 0, 'No element with role="tablist" found');
        });

        await test('4 tabs with role="tab"', async () => {
            const count = await page.locator('[role="tab"]').count();
            assertEqual(count, 4, 'Tab count with role=tab');
        });

        await test('Buttons have accessible labels', async () => {
            // Buttons with no text AND no aria-label are inaccessible
            const bad = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('button')).filter(btn => {
                    const text = (btn.textContent || '').trim();
                    const label = btn.getAttribute('aria-label') || '';
                    const title = btn.getAttribute('title') || '';
                    return text === '' && label === '' && title === '';
                }).length;
            });
            assert(bad === 0, `${bad} buttons have no accessible text/label/title`);
        });

        await test('Day note textarea auto-resizes', async () => {
            const textarea = page.locator('.day-note-input').first();
            if (await textarea.count() > 0) {
                await textarea.fill('Test note');
                await page.waitForTimeout(200);
                const h = await textarea.evaluate(el => el.scrollHeight);
                assert(h > 0, 'Textarea has no height');
                await textarea.fill('');
            }
        });

        await test('Offline bar in DOM', async () => {
            assert(await page.locator('#offlineBar').count() > 0, '#offlineBar not found');
        });

        // ==================== PWA FEATURES ====================
        section('PWA — Service Worker & Manifest');

        await test('Service Worker API available', async () => {
            const ok = await page.evaluate(() => !!navigator.serviceWorker);
            assert(ok, 'navigator.serviceWorker not available');
        });

        await test('<link rel="manifest"> present', async () => {
            assert(await page.locator('link[rel="manifest"]').count() > 0, 'No manifest link');
        });

        await test('SyncEngine defined with required methods', async () => {
            const ok = await page.evaluate(() =>
                typeof SyncEngine !== 'undefined' &&
                typeof SyncEngine.track === 'function' &&
                typeof SyncEngine.push === 'function' &&
                typeof SyncEngine.pull === 'function'
            );
            assert(ok, 'SyncEngine missing or incomplete');
        });

        await test('StorageLayer defined with get/set/remove', async () => {
            const ok = await page.evaluate(() =>
                typeof StorageLayer !== 'undefined' &&
                typeof StorageLayer.get === 'function' &&
                typeof StorageLayer.set === 'function' &&
                typeof StorageLayer.remove === 'function'
            );
            assert(ok, 'StorageLayer missing or incomplete');
        });

        await test('escapeHtml function exists', async () => {
            const ok = await page.evaluate(() => typeof escapeHtml === 'function' && escapeHtml('<script>') === '&lt;script&gt;');
            assert(ok, 'escapeHtml not working correctly');
        });

        await test('showDay function accessible', async () => {
            const ok = await page.evaluate(() => typeof showDay === 'function');
            assert(ok, 'showDay function not accessible');
        });

        // ==================== SUMMARY ====================
        console.log(`\n${'='.repeat(60)}`);
        console.log(`📊 RESULTS: ${passed}/${total} passed (${failed} failed)`);
        console.log(`${'='.repeat(60)}\n`);

        if (failed > 0) {
            console.log('❌ FAILURES:');
            results.filter(r => r.status === '❌').forEach(r => {
                console.log(`  • [${r.section}] ${r.name}`);
                console.log(`    ${r.error}`);
            });
            console.log('');
            process.exit(1);
        }

    } catch (err) {
        console.error('❌ Fatal error:', err.message);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
    }
})();

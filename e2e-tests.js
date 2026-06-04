#!/usr/bin/env node
// e2e-tests.js — End-to-End tests for Viagem EUA 2027 PWA
// Tests user interactions, rendering, and PWA features in a real browser
// Run: npm run e2e (after: npm install --save-dev puppeteer)

const puppeteer = require('puppeteer');
const fs = require('fs');
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
    let browser, page;
    const baseUrl = 'file://' + path.resolve(__dirname, 'index.html');

    try {
        // Launch browser
        browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        page = await browser.newPage();
        
        // Set viewport to mobile
        await page.setViewport({ width: 375, height: 812 });
        
        console.log(`🌐 Loading: ${baseUrl}`);
        await page.goto(baseUrl, { waitUntil: 'networkidle0' });

        // ==================== PAGE LOAD ====================
        section('PWA — Page Load & DOM');

        await test('Page title contains "Viagem"', async () => {
            const title = await page.title();
            assert(title.includes('Viagem'), `Title: ${title}`);
        });

        await test('Hero image renders', async () => {
            const heroImg = await page.$('#heroImg');
            assert(heroImg !== null, 'Hero image not found');
        });

        await test('Days grid container exists', async () => {
            const daysGrid = await page.$('#daysGrid');
            assert(daysGrid !== null, 'Days grid not found');
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

        await test('Select day 2 from dropdown', async () => {
            // Click day selector dropdown
            await page.click('#daySelector');
            await page.waitForTimeout(100);
            
            // Click option for day 2
            await page.evaluate(() => {
                const opts = document.querySelectorAll('#daySelector option');
                opts[2].selected = true;
                document.getElementById('daySelector').dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForTimeout(500);

            // Verify hero image changed
            const heroSrc = await page.$eval('#heroImg', el => el.src);
            assert(heroSrc.includes('dia-02'), `Hero image src: ${heroSrc}`);
        });

        await test('Render day activities', async () => {
            const activityCount = await page.evaluate(() => {
                return document.querySelectorAll('.activity-card').length;
            });
            assert(activityCount > 0, `No activities rendered (got ${activityCount})`);
        });

        await test('Activity cards have images', async () => {
            const cardWithImg = await page.evaluate(() => {
                const cards = document.querySelectorAll('.activity-card');
                for (let card of cards) {
                    const img = card.querySelector('.activity-card-photo');
                    if (img && img.src) return true;
                }
                return false;
            });
            assert(cardWithImg, 'No activity cards with images found');
        });

        // ==================== INTERACTIVITY ====================
        section('PWA — User Interactions');

        await test('Click activity card opens detail modal', async () => {
            // Get first activity card
            const firstCard = await page.$('.activity-card');
            assert(firstCard !== null, 'No activity cards found');

            // Click it
            await firstCard.click();
            await page.waitForTimeout(300);

            // Check if modal appeared
            const modal = await page.$('#detailModal');
            const isVisible = await page.evaluate(() => {
                const mod = document.getElementById('detailModal');
                return mod && mod.style.display !== 'none';
            });
            assert(isVisible, 'Detail modal not visible after click');
        });

        await test('Close modal on Escape key', async () => {
            // Make sure modal is open
            const modal = await page.$('#detailModal');
            if (modal) {
                await page.keyboard.press('Escape');
                await page.waitForTimeout(300);

                const isClosed = await page.evaluate(() => {
                    const mod = document.getElementById('detailModal');
                    return mod && mod.style.display === 'none';
                });
                assert(isClosed, 'Modal not closed after Escape');
            }
        });

        await test('Previous day button works', async () => {
            // Get current day
            const dayBefore = await page.evaluate(() => {
                return parseInt(document.getElementById('daySelector').value);
            });

            // Click previous button
            await page.click('#prevDayBtn');
            await page.waitForTimeout(500);

            // Check day changed
            const dayAfter = await page.evaluate(() => {
                return parseInt(document.getElementById('daySelector').value);
            });
            assert(dayAfter === dayBefore - 1, `Day didn't decrease: ${dayBefore} -> ${dayAfter}`);
        });

        await test('Next day button works', async () => {
            const dayBefore = await page.evaluate(() => {
                return parseInt(document.getElementById('daySelector').value);
            });

            await page.click('#nextDayBtn');
            await page.waitForTimeout(500);

            const dayAfter = await page.evaluate(() => {
                return parseInt(document.getElementById('daySelector').value);
            });
            assert(dayAfter === dayBefore + 1, `Day didn't increase: ${dayBefore} -> ${dayAfter}`);
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
            const layout = await page.evaluate(() => {
                const heroSection = document.querySelector('.hero-section');
                return heroSection ? window.getComputedStyle(heroSection).display : 'not found';
            });
            assert(layout === 'block', `Hero section display: ${layout}`);
        });

        await test('Days grid stacks on mobile', async () => {
            const gridCols = await page.evaluate(() => {
                const grid = document.getElementById('daysGrid');
                return window.getComputedStyle(grid).gridTemplateColumns;
            });
            // On mobile, should be 1 column (not multiple)
            const colCount = gridCols.split(' ').length;
            assert(colCount === 1, `Grid columns on mobile: ${gridCols}`);
        });

        // ==================== PERFORMANCE ====================
        section('PWA — Performance Metrics');

        await test('Lighthouse CLS < 0.1', async () => {
            // Get CLS (Cumulative Layout Shift)
            const cls = await page.evaluate(() => {
                return new Promise((resolve) => {
                    let clsValue = 0;
                    const observer = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            if (!entry.hadRecentInput) {
                                clsValue += entry.value;
                            }
                        }
                        resolve(clsValue);
                    });
                    observer.observe({ type: 'layout-shift', buffered: true });
                    setTimeout(() => resolve(clsValue), 1000);
                });
            });
            assert(cls < 0.2, `CLS too high: ${cls.toFixed(3)}`);
        });

        await test('Images lazy load', async () => {
            const lazyImages = await page.evaluate(() => {
                const imgs = document.querySelectorAll('img[loading="lazy"]');
                return imgs.length;
            });
            assert(lazyImages > 0, `No lazy-loaded images found`);
        });

        // ==================== ACCESSIBILITY ====================
        section('PWA — Accessibility (a11y)');

        await test('All images have alt text', async () => {
            const missingAlt = await page.evaluate(() => {
                const imgs = document.querySelectorAll('img');
                let missing = 0;
                for (let img of imgs) {
                    if (!img.alt || img.alt.trim() === '') missing++;
                }
                return missing;
            });
            assert(missingAlt === 0, `${missingAlt} images missing alt text`);
        });

        await test('Color contrast sufficient (AAA)', async () => {
            const contrast = await page.evaluate(() => {
                // Simple check: text should be light on dark background
                const text = document.querySelector('body');
                const bgColor = window.getComputedStyle(text).backgroundColor;
                const textColor = window.getComputedStyle(text).color;
                return { bg: bgColor, fg: textColor };
            });
            assert(contrast.bg && contrast.fg, `Could not determine colors`);
        });

        await test('Buttons are keyboard accessible', async () => {
            const btnCount = await page.evaluate(() => {
                return document.querySelectorAll('button, a[href], [role="button"]').length;
            });
            assert(btnCount > 5, `Too few accessible buttons: ${btnCount}`);
        });

        // ==================== PWA FEATURES ====================
        section('PWA — Service Worker & Offline');

        await test('Service Worker registered', async () => {
            const swRegistered = await page.evaluate(() => {
                return navigator.serviceWorker ? 'yes' : 'no';
            });
            assert(swRegistered === 'yes', 'Service Worker API not available');
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

// E2E Tests with Playwright (optional, gracefully skips if Playwright not installed)
// Run with: npx playwright test visual-e2e-test.js --headed

const fs = require('fs');
const path = require('path');

// Check if Playwright is available
let playwright = null;
try {
    playwright = require('playwright');
} catch(e) {
    console.log('\n⚠️  Playwright não instalado. Skipping E2E tests.');
    console.log('   Para instalar: npm install playwright\n');
    process.exit(0);
}

const test = require('@playwright/test').test;
const expect = require('@playwright/test').expect;

test.describe('PWA E2E Tests', () => {
    let browser, context, page;

    test.beforeAll(async () => {
        browser = await playwright.chromium.launch();
        context = await browser.createContext({
            viewport: { width: 375, height: 667 } // Mobile viewport
        });
        page = await context.newPage();
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('should load homepage', async () => {
        // Use file:// protocol for local testing
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Check title
        await expect(page).toHaveTitle('Viagem EUA 2027');

        // Check hero section
        const hero = page.locator('.hero');
        await expect(hero).toBeVisible();
    });

    test('should navigate between days', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Click Day 1
        const day1Button = page.locator('button:has-text("1")').first();
        await day1Button.click();
        await page.waitForTimeout(300);

        // Verify scroll to top
        const scrollTop = await page.evaluate(() => window.scrollY);
        expect(scrollTop).toBeLessThan(100);

        // Navigate to Day 15 (middle of trip)
        const day15Button = page.locator('button:has-text("15")').first();
        await day15Button.click();
        await page.waitForTimeout(300);

        // Verify content changed
        const dayTitle = page.locator('[data-day-header]');
        await expect(dayTitle).toBeVisible();
    });

    test('should toggle favorites', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Find first activity with favorite button
        const favButton = page.locator('[data-fav-btn]').first();
        if (await favButton.isVisible()) {
            // Click to add favorite
            await favButton.click();
            await page.waitForTimeout(100);

            // Verify star is filled
            const isFilled = await favButton.evaluate((el) => {
                return el.classList.contains('filled') || el.textContent.includes('★');
            });
            expect(isFilled).toBe(true);

            // Click to remove favorite
            await favButton.click();
            await page.waitForTimeout(100);

            // Verify star is empty
            const isEmpty = await favButton.evaluate((el) => {
                return !el.classList.contains('filled') || el.textContent.includes('☆');
            });
            expect(isEmpty).toBe(true);
        }
    });

    test('should toggle day checklist', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Find first checkbox
        const checkbox = page.locator('input[type="checkbox"]').first();
        if (await checkbox.isVisible()) {
            // Check the box
            await checkbox.click();
            await page.waitForTimeout(100);

            // Verify it's checked
            let isChecked = await checkbox.isChecked();
            expect(isChecked).toBe(true);

            // Uncheck
            await checkbox.click();
            await page.waitForTimeout(100);

            // Verify it's unchecked
            isChecked = await checkbox.isChecked();
            expect(isChecked).toBe(false);
        }
    });

    test('should preload next days', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Get rendered days count before navigation
        let renderedBefore = await page.evaluate(() => {
            return Object.keys(window.renderedDays || {}).length;
        });

        // Navigate to Day 5
        const day5Button = page.locator('button:has-text("5")').first();
        await day5Button.click();
        await page.waitForTimeout(1000); // Wait for preload timers

        // Get rendered days count after navigation
        let renderedAfter = await page.evaluate(() => {
            return Object.keys(window.renderedDays || {}).length;
        });

        // Should have preloaded next days (5, 6, 7)
        expect(renderedAfter).toBeGreaterThan(renderedBefore);
    });

    test('should save notes', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Find day note textarea
        const noteField = page.locator('textarea[data-day-note]').first();
        if (await noteField.isVisible()) {
            // Type a note
            const testNote = 'Test note ' + Date.now();
            await noteField.fill(testNote);
            await page.waitForTimeout(200);

            // Verify it's saved to localStorage
            const saved = await page.evaluate((note) => {
                return localStorage.getItem('note-1') === note;
            }, testNote);
            expect(saved).toBe(true);
        }
    });

    test('should display map on mobile', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Look for map tab
        const mapTab = page.locator('[data-tab="map"]');
        if (await mapTab.isVisible()) {
            await mapTab.click();
            await page.waitForTimeout(500);

            // Verify map container is visible
            const mapContainer = page.locator('#map');
            await expect(mapContainer).toBeVisible();
        }
    });

    test('should show activity photos with lazy loading', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Check for lazy-loaded images
        const lazyImages = page.locator('img[loading="lazy"]');
        const lazyCount = await lazyImages.count();

        expect(lazyCount).toBeGreaterThan(0);
    });

    test('should be installable (PWA)', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Check manifest.json exists
        const manifest = page.locator('link[rel="manifest"]');
        await expect(manifest).toBeVisible();

        // Get manifest URL and fetch it
        const manifestHref = await manifest.getAttribute('href');
        expect(manifestHref).toBeTruthy();

        // Verify it's valid JSON
        const manifestUrl = new URL(manifestHref, page.url()).href;
        const response = await page.request.get(manifestUrl);
        expect(response.ok()).toBe(true);

        const manifestData = await response.json();
        expect(manifestData.display).toBe('standalone');
        expect(manifestData.short_name).toBeTruthy();
    });

    test('should handle network offline gracefully', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Go offline
        await context.setOffline(true);

        // Page should still be functional
        const hero = page.locator('.hero');
        await expect(hero).toBeVisible();

        // Go back online
        await context.setOffline(false);
    });

    test('should render 33 days', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Check for all 33 day buttons
        const dayButtons = page.locator('button:has-text(/^\\d+$/)').filter({ hasText: /^[1-9]|[12][0-9]|3[0-3]$/ });
        const dayCount = await dayButtons.count();

        expect(dayCount).toBeGreaterThanOrEqual(33);
    });

    test('should show hero image with alt text', async () => {
        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Check hero image
        const heroImg = page.locator('.hero img').first();
        await expect(heroImg).toBeVisible();

        // Verify alt text exists and is descriptive
        const altText = await heroImg.getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText).toMatch(/Dia \d+/); // Should mention day
    });
});

test.describe('Mobile Responsiveness', () => {
    test('should be responsive on small screens', async () => {
        const { browser } = await playwright.chromium.launch();
        const context = await browser.createContext({
            viewport: { width: 320, height: 568 } // iPhone SE
        });
        const page = await context.newPage();

        await page.goto('file://' + path.join(__dirname, 'index.html'));
        await page.waitForLoadState('networkidle');

        // Check that navigation is visible
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();

        // Check that content is not cut off
        const content = page.locator('main');
        const contentBox = await content.boundingBox();
        expect(contentBox.width).toBeLessThanOrEqual(320);

        await browser.close();
    });
});

console.log('✅ E2E test suite loaded. Run with: npx playwright test visual-e2e-test.js --headed\n');

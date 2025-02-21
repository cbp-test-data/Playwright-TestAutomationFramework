import { test, expect } from '@playwright/test';
import { DataGenerator } from '../utils/DataGenerator';

// Data-Driven Testing
test.describe('Data-Driven Tests', () => {
    const testData = [
        { username: 'user1', password: 'pass1', expected: 'success' },
        { username: 'user2', password: 'invalid', expected: 'error' },
        { username: '', password: '', expected: 'validation' }
    ];

    for (const data of testData) {
        test(`login with ${data.expected} case`, async ({ page }) => {
            await test.step('Login attempt', async () => {
                await page.fill('#username', data.username);
                await page.fill('#password', data.password);
                await page.click('#login');
            });

            if (data.expected === 'success') {
                await expect(page.locator('#dashboard')).toBeVisible();
            } else if (data.expected === 'error') {
                await expect(page.locator('.error')).toContainText('Invalid credentials');
            } else {
                await expect(page.locator('.validation')).toBeVisible();
            }
        });
    }
});

// Visual Regression Testing
test.describe('Visual Tests', () => {
    test('responsive layout', async ({ page }) => {
        // Desktop view
        await page.setViewportSize({ width: 1920, height: 1080 });
        await expect(page).toHaveScreenshot('desktop.png');

        // Tablet view
        await page.setViewportSize({ width: 768, height: 1024 });
        await expect(page).toHaveScreenshot('tablet.png');

        // Mobile view
        await page.setViewportSize({ width: 375, height: 812 });
        await expect(page).toHaveScreenshot('mobile.png');
    });
});

// API Testing Patterns
test.describe('API Tests', () => {
    test('complete CRUD flow', async ({ request }) => {
        // Create
        const createResponse = await request.post('/api/items', {
            data: { name: 'Test Item', value: 100 }
        });
        expect(createResponse.ok()).toBeTruthy();
        const itemId = (await createResponse.json()).id;

        // Read
        const readResponse = await request.get(`/api/items/${itemId}`);
        expect(readResponse.ok()).toBeTruthy();

        // Update
        const updateResponse = await request.put(`/api/items/${itemId}`, {
            data: { value: 200 }
        });
        expect(updateResponse.ok()).toBeTruthy();

        // Delete
        const deleteResponse = await request.delete(`/api/items/${itemId}`);
        expect(deleteResponse.ok()).toBeTruthy();
    });
});

// Performance Testing Patterns
test.describe('Performance Tests', () => {
    test('page load performance', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/');
        const loadTime = Date.now() - startTime;

        // Record metrics
        await test.step('Record Performance Metrics', async () => {
            const metrics = await page.evaluate(() => ({
                fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
                lcp: performance.getEntriesByName('largest-contentful-paint')[0]?.startTime,
                cls: performance.getEntriesByName('layout-shift').reduce((sum, entry) => 
                    sum + (entry as unknown as { value: number }).value, 0)
            }));

            expect(loadTime).toBeLessThan(3000);
            expect(metrics.fcp).toBeLessThan(1000);
            expect(metrics.lcp).toBeLessThan(2500);
            expect(metrics.cls).toBeLessThan(0.1);
        });
    });
});

// Accessibility Testing
test.describe('Accessibility Tests', () => {
    test('page accessibility', async ({ page }) => {
        await page.goto('/');
        const violations = await page.evaluate(async () => {
            // @ts-ignore
            const { axe } = await import('@axe-core/playwright');
            return await axe(document);
        });
        expect(violations.length).toBe(0);
    });
});

// Component Testing
test.describe('Component Tests', () => {
    test('interactive components', async ({ page }) => {
        await test.step('Dropdown interaction', async () => {
            await page.click('.dropdown-trigger');
            await expect(page.locator('.dropdown-menu')).toBeVisible();
            await page.click('.dropdown-item');
            await expect(page.locator('.dropdown-menu')).toBeHidden();
        });

        await test.step('Modal dialog', async () => {
            await page.click('.modal-trigger');
            await expect(page.locator('.modal')).toBeVisible();
            await page.click('.modal-close');
            await expect(page.locator('.modal')).toBeHidden();
        });
    });
});

// Error Handling Patterns
test.describe('Error Handling', () => {
    test('network error recovery', async ({ page }) => {
        await page.route('**/api/**', route => route.abort('failed'));
        await page.goto('/dashboard');
        await expect(page.locator('.error-message')).toBeVisible();
        
        // Retry mechanism
        await page.unroute('**/api/**');
        await page.click('.retry-button');
        await expect(page.locator('.dashboard-content')).toBeVisible();
    });
});

// State Management
test.describe('State Management', () => {
    test('preserve and restore state', async ({ context }) => {
        // Set initial state
        const page = await context.newPage();
        await page.goto('/');
        await page.fill('#username', 'testuser');
        await page.fill('#password', 'testpass');
        await page.click('#remember-me');
        
        // Save state
        await context.storageState({ path: 'state.json' });
        
        // Create new context with saved state
        const browser = context.browser();
        if (!browser) {
            throw new Error('Browser instance not found');
        }
        const newContext = await browser.newContext({
            storageState: 'state.json'
        });
        const newPage = await newContext.newPage();
        await newPage.goto('/');
        
        // Verify state persistence
        await expect(newPage.locator('#username')).toHaveValue('testuser');
        await expect(newPage.locator('#remember-me')).toBeChecked();
    });
}); 
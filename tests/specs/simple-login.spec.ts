import { test, expect } from '@playwright/test';
import { CommonUtils } from '../utils/CommonUtils';

test.describe('Simple Login Test Suite', () => {
    let commonUtils: CommonUtils;

    test.beforeEach(async ({ page }) => {
        commonUtils = new CommonUtils(page);
    });

    test('successful login', async ({ page }) => {
        await commonUtils.logTestStep('Navigating to login page');
        await page.goto('https://opensource-demo.orangehrmlive.com/');
        
        await commonUtils.logTestStep('Entering credentials');
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        
        // Take screenshot before login
        const beforeLoginPath = await commonUtils.takeFullPageScreenshot('before-login');
        await commonUtils.logTestStep('Captured pre-login screenshot');

        await commonUtils.logTestStep('Clicking login button');
        await page.click('button[type="submit"]');

        await commonUtils.logTestStep('Verifying successful login');
        await expect(page.locator('.oxd-userdropdown-name')).toBeVisible();
        
        // Take screenshot after login
        const afterLoginPath = await commonUtils.takeFullPageScreenshot('after-login');
        await commonUtils.logTestStep('Captured post-login screenshot');

        await commonUtils.saveResults('successful-login');
    });

    test('failed login', async ({ page }) => {
        await commonUtils.logTestStep('Navigating to login page');
        await page.goto('https://opensource-demo.orangehrmlive.com/');
        
        await commonUtils.logTestStep('Entering invalid credentials');
        await page.fill('input[name="username"]', 'invalid_user');
        await page.fill('input[name="password"]', 'invalid_password');
        
        // Take screenshot before login attempt
        const beforeLoginPath = await commonUtils.takeFullPageScreenshot('before-failed-login');
        await commonUtils.logTestStep('Captured pre-login screenshot');

        await commonUtils.logTestStep('Clicking login button');
        await page.click('button[type="submit"]');

        await commonUtils.logTestStep('Verifying error message');
        const errorMessage = await page.locator('.oxd-alert-content-text');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Invalid credentials');
        
        // Take screenshot of error
        const errorScreenPath = await commonUtils.takeFullPageScreenshot('login-error');
        await commonUtils.logTestStep('Captured error screenshot', 'error');

        await commonUtils.saveResults('failed-login');
    });
}); 
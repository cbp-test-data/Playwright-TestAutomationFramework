import { Page } from '@playwright/test';
import { config } from '../../config/config';

export class TestHelper {
    /**
     * Generate a random string
     * @param length - Length of the random string
     */
    generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    /**
     * Generate a random email
     */
    generateRandomEmail(): string {
        return `test.${this.generateRandomString(8)}@example.com`;
    }

    /**
     * Wait for network idle
     * @param page - Playwright page object
     */
    async waitForNetworkIdle(page: Page): Promise<void> {
        await page.waitForLoadState('networkidle');
    }

    /**
     * Take screenshot on test failure
     * @param page - Playwright page object
     * @param testName - Name of the test
     */
    async takeScreenshotOnFailure(page: Page, testName: string): Promise<void> {
        if (config.reporting.screenshotOnFailure) {
            await page.screenshot({
                path: `${config.reporting.reportPath}/screenshots/${testName}-failure.png`,
                fullPage: true
            });
        }
    }

    /**
     * Format date for test data
     * @param date - Date object
     */
    formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    /**
     * Parse JSON safely
     * @param str - String to parse
     */
    safeJSONParse(str: string): any {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    }

    /**
     * Sleep for specified milliseconds
     * @param ms - Milliseconds to sleep
     */
    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
} 
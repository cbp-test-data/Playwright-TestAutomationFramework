import { TestInfo, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class TestReporter {
    private static readonly REPORT_DIR = 'test-results';
    private static readonly SCREENSHOT_DIR = path.join(TestReporter.REPORT_DIR, 'screenshots');
    private static readonly VIDEO_DIR = path.join(TestReporter.REPORT_DIR, 'videos');
    private static readonly TRACE_DIR = path.join(TestReporter.REPORT_DIR, 'traces');

    /**
     * Initialize the reporter directories
     */
    static init(): void {
        [this.REPORT_DIR, this.SCREENSHOT_DIR, this.VIDEO_DIR, this.TRACE_DIR].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    /**
     * Save a screenshot for a test
     * @param testInfo Test information
     * @param name Screenshot name
     * @param page Playwright page
     */
    static async saveScreenshot(testInfo: TestInfo, name: string, page: Page): Promise<void> {
        const screenshotPath = path.join(
            this.SCREENSHOT_DIR,
            `${testInfo.title}-${name}-${Date.now()}.png`
        );
        await page.screenshot({ path: screenshotPath, fullPage: true });
    }

    /**
     * Save test artifacts (screenshots, videos, traces)
     * @param testInfo Test information
     * @param page Playwright page
     */
    static async saveTestArtifacts(testInfo: TestInfo, page: Page): Promise<void> {
        if (testInfo.status !== 'passed') {
            // Save screenshot on failure
            await this.saveScreenshot(testInfo, 'failure', page);

            // Save trace if available
            if (testInfo.attachments.find(a => a.name === 'trace')) {
                const tracePath = path.join(
                    this.TRACE_DIR,
                    `${testInfo.title}-${Date.now()}.zip`
                );
                // Handle trace export through attachments
            }
        }
    }

    /**
     * Log test step
     * @param testInfo Test information
     * @param message Step message
     */
    static async logStep(testInfo: TestInfo, message: string): Promise<void> {
        console.log(`[${testInfo.title}] ${message}`);
        testInfo.annotations.push({ type: 'step', description: message });
    }

    /**
     * Add test metadata
     * @param testInfo Test information
     * @param key Metadata key
     * @param value Metadata value
     */
    static addMetadata(testInfo: TestInfo, key: string, value: string): void {
        testInfo.annotations.push({ type: 'metadata', description: `${key}: ${value}` });
    }

    /**
     * Log test error
     * @param testInfo Test information
     * @param error Error object
     */
    static logError(testInfo: TestInfo, error: Error): void {
        console.error(`[${testInfo.title}] Error: ${error.message}`);
        testInfo.annotations.push({ type: 'error', description: error.message });
    }
} 
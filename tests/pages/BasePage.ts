import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param url - The URL to navigate to
     */
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Wait for an element to be visible
     * @param selector - The selector to wait for
     */
    async waitForElement(selector: string): Promise<Locator> {
        const element = this.page.locator(selector);
        await element.waitFor({ state: 'visible' });
        return element;
    }

    /**
     * Click an element
     * @param selector - The selector to click
     */
    async click(selector: string): Promise<void> {
        const element = await this.waitForElement(selector);
        await element.click();
    }

    /**
     * Type text into an input field
     * @param selector - The selector of the input field
     * @param text - The text to type
     */
    async type(selector: string, text: string): Promise<void> {
        const element = await this.waitForElement(selector);
        await element.fill(text);
    }

    /**
     * Get text from an element
     * @param selector - The selector to get text from
     */
    async getText(selector: string): Promise<string> {
        const element = await this.waitForElement(selector);
        return element.innerText();
    }

    /**
     * Check if an element is visible
     * @param selector - The selector to check
     */
    async isVisible(selector: string): Promise<boolean> {
        const element = this.page.locator(selector);
        return await element.isVisible();
    }

    /**
     * Take a screenshot
     * @param name - The name of the screenshot
     */
    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `./screenshots/${name}.png` });
    }
} 
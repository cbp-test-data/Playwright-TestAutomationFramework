import { Page, Locator, ElementHandle, Browser, BrowserContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class CommonUtils {
    private page: Page;
    private testResults: any[];

    constructor(page: Page) {
        this.page = page;
        this.testResults = [];
    }

    /**
     * Table Handling Methods
     */

    /**
     * Get table data as LinkedHashMap
     * @param tableSelector - CSS selector for table
     * @returns Map with row data
     */
    async getTableData(tableSelector: string): Promise<Map<string, Record<string, string>>> {
        const tableData = new Map<string, Record<string, string>>();
        
        // Get headers
        const headers = await this.page.$$eval(`${tableSelector} th`, ths => 
            ths.map(th => th.textContent?.trim() || '')
        );

        // Get rows
        const rows = await this.page.$$(`${tableSelector} tbody tr`);
        
        for (let i = 0; i < rows.length; i++) {
            const cells = await rows[i].$$('td');
            const rowData: Record<string, string> = {};
            
            for (let j = 0; j < cells.length; j++) {
                const cellText = await cells[j].textContent();
                rowData[headers[j]] = cellText?.trim() || '';
            }
            
            // Use first column as key
            tableData.set(rowData[headers[0]], rowData);
        }
        
        return tableData;
    }

    /**
     * Get specific cell data from table
     * @param tableSelector - CSS selector for table
     * @param rowIndex - Row index (1-based)
     * @param columnIndex - Column index (1-based)
     */
    async getTableCell(tableSelector: string, rowIndex: number, columnIndex: number): Promise<string> {
        const cell = await this.page.$(`${tableSelector} tr:nth-child(${rowIndex}) td:nth-child(${columnIndex})`);
        return (await cell?.textContent() || '').trim();
    }

    /**
     * Sort table by column
     * @param tableSelector - CSS selector for table
     * @param columnIndex - Column to sort by
     */
    async sortTableByColumn(tableSelector: string, columnIndex: number): Promise<void> {
        await this.page.click(`${tableSelector} th:nth-child(${columnIndex})`);
    }

    /**
     * Filter table data
     * @param tableSelector - CSS selector for table
     * @param columnIndex - Column to filter
     * @param filterText - Text to filter by
     */
    async filterTable(tableSelector: string, columnIndex: number, filterText: string): Promise<void> {
        // Implementation depends on table's filter mechanism
        await this.page.fill(`${tableSelector} .filter:nth-child(${columnIndex})`, filterText);
    }

    /**
     * Screenshot Methods
     */

    /**
     * Take full page screenshot
     * @param name - Screenshot name
     */
    async takeFullPageScreenshot(name: string): Promise<string> {
        const screenshotPath = path.join('test-results', 'screenshots', `${name}-${Date.now()}.png`);
        await this.page.screenshot({ 
            path: screenshotPath,
            fullPage: true 
        });
        return screenshotPath;
    }

    /**
     * Take element screenshot
     * @param selector - Element selector
     * @param name - Screenshot name
     */
    async takeElementScreenshot(selector: string, name: string): Promise<string> {
        const element = await this.page.$(selector);
        const screenshotPath = path.join('test-results', 'screenshots', `${name}-${Date.now()}.png`);
        await element?.screenshot({ path: screenshotPath });
        return screenshotPath;
    }

    /**
     * Mouse Actions
     */

    /**
     * Hover over element
     * @param selector - Element selector
     */
    async hover(selector: string): Promise<void> {
        await this.page.hover(selector);
    }

    /**
     * Drag and drop
     * @param sourceSelector - Source element selector
     * @param targetSelector - Target element selector
     */
    async dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void> {
        await this.page.dragAndDrop(sourceSelector, targetSelector);
    }

    /**
     * Double click element
     * @param selector - Element selector
     */
    async doubleClick(selector: string): Promise<void> {
        await this.page.dblclick(selector);
    }

    /**
     * Right click element
     * @param selector - Element selector
     */
    async rightClick(selector: string): Promise<void> {
        await this.page.click(selector, { button: 'right' });
    }

    /**
     * Keyboard Actions
     */

    /**
     * Press key combination
     * @param keys - Keys to press
     */
    async pressKeys(...keys: string[]): Promise<void> {
        for (const key of keys) {
            await this.page.keyboard.press(key);
        }
    }

    /**
     * Type text with delay
     * @param selector - Element selector
     * @param text - Text to type
     * @param delay - Delay between keystrokes
     */
    async typeWithDelay(selector: string, text: string, delay: number): Promise<void> {
        await this.page.fill(selector, text, { timeout: delay });
    }

    /**
     * File Upload Methods
     */

    /**
     * Upload single file
     * @param selector - File input selector
     * @param filePath - Path to file
     */
    async uploadFile(selector: string, filePath: string): Promise<void> {
        const input = await this.page.$(selector);
        await input?.setInputFiles(filePath);
    }

    /**
     * Upload multiple files
     * @param selector - File input selector
     * @param filePaths - Array of file paths
     */
    async uploadMultipleFiles(selector: string, filePaths: string[]): Promise<void> {
        const input = await this.page.$(selector);
        await input?.setInputFiles(filePaths);
    }

    /**
     * Log test step with timestamp
     */
    async logTestStep(message: string, level: 'info' | 'error' = 'info'): Promise<void> {
        const step = {
            timestamp: new Date().toISOString(),
            message,
            level
        };
        this.testResults.push(step);
        console.log(`[${step.timestamp}] ${level.toUpperCase()}: ${message}`);
    }

    /**
     * Save test results to JSON file
     */
    async saveResults(testName: string): Promise<void> {
        const resultsDir = path.join('test-results', 'custom-report');
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir, { recursive: true });
        }
        
        const resultsPath = path.join(resultsDir, `${testName}-${Date.now()}.json`);
        fs.writeFileSync(resultsPath, JSON.stringify(this.testResults, null, 2));
    }

    /**
     * Wait Methods
     */

    /**
     * Wait for network idle
     */
    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Wait for element to be visible with custom timeout
     * @param selector - Element selector
     * @param timeout - Timeout in milliseconds
     */
    async waitForElement(selector: string, timeout?: number): Promise<void> {
        await this.page.waitForSelector(selector, { 
            state: 'visible',
            timeout 
        });
    }

    /**
     * Wait for element to contain text
     * @param selector - Element selector
     * @param text - Text to wait for
     */
    async waitForText(selector: string, text: string): Promise<void> {
        await this.page.waitForSelector(`${selector}:has-text("${text}")`);
    }

    /**
     * Assertion Methods
     */

    /**
     * Assert element text
     * @param selector - Element selector
     * @param expectedText - Expected text
     */
    async assertText(selector: string, expectedText: string): Promise<void> {
        const actualText = await this.page.textContent(selector);
        if (actualText?.trim() !== expectedText) {
            throw new Error(`Text mismatch. Expected: ${expectedText}, Actual: ${actualText}`);
        }
    }

    /**
     * Assert element attribute
     * @param selector - Element selector
     * @param attribute - Attribute name
     * @param expectedValue - Expected value
     */
    async assertAttribute(selector: string, attribute: string, expectedValue: string): Promise<void> {
        const element = await this.page.$(selector);
        const actualValue = await element?.getAttribute(attribute);
        if (actualValue !== expectedValue) {
            throw new Error(`Attribute mismatch. Expected: ${expectedValue}, Actual: ${actualValue}`);
        }
    }

    /**
     * Assert element is visible
     * @param selector - Element selector
     */
    async assertVisible(selector: string): Promise<void> {
        const isVisible = await this.page.isVisible(selector);
        if (!isVisible) {
            throw new Error(`Element ${selector} is not visible`);
        }
    }
} 
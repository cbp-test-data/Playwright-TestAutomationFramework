import { BasePage } from './BasePage';
import { IHomePage, ILoginPage } from './types';
import { PageFactory } from './PageFactory';

export class OrangeHRMHomePage extends BasePage implements IHomePage {
    // Locators
    private readonly welcomeLink = '#welcome';
    private readonly logoutLink = '//a[text()="Logout"]';
    private readonly dashboardHeader = '#content > div > div.head > h1';

    /**
     * Click on the welcome link
     */
    async clickWelcome(): Promise<IHomePage> {
        await this.click(this.welcomeLink);
        return this;
    }

    /**
     * Click on the logout link
     */
    async clickLogout(): Promise<ILoginPage> {
        await this.click(this.logoutLink);
        return PageFactory.getLoginPage(this.page);
    }

    /**
     * Get page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get dashboard header text
     */
    async getDashboardHeader(): Promise<string> {
        return await this.getText(this.dashboardHeader);
    }

    /**
     * Check if user is logged in
     */
    async isLoggedIn(): Promise<boolean> {
        return await this.isVisible(this.welcomeLink);
    }

    /**
     * Perform logout
     */
    async logout(): Promise<ILoginPage> {
        await this.clickWelcome();
        await this.page.waitForTimeout(1000); // Wait for logout menu to appear
        return await this.clickLogout();
    }
} 
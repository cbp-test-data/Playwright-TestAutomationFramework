import { BasePage } from './BasePage';
import { ILoginPage, IHomePage } from './types';
import { PageFactory } from './PageFactory';

export class OrangeHRMLoginPage extends BasePage implements ILoginPage {
    // Locators
    private readonly usernameInput = '#txtUsername';
    private readonly passwordInput = '#txtPassword';
    private readonly loginButton = '#btnLogin';
    private readonly errorMessage = '#spanMessage';

    /**
     * Enter username in the login form
     * @param username - Username to enter
     */
    async enterUserName(username: string): Promise<ILoginPage> {
        await this.type(this.usernameInput, username);
        return this;
    }

    /**
     * Enter password in the login form
     * @param password - Password to enter
     */
    async enterPassWord(password: string): Promise<ILoginPage> {
        await this.type(this.passwordInput, password);
        return this;
    }

    /**
     * Click login button
     */
    async clickLogin(): Promise<IHomePage> {
        await this.click(this.loginButton);
        return PageFactory.getHomePage(this.page);
    }

    /**
     * Get page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get error message text
     */
    async getErrorMessage(): Promise<string> {
        return await this.getText(this.errorMessage);
    }

    /**
     * Perform login with given credentials
     * @param username - Username to login with
     * @param password - Password to login with
     */
    async login(username: string, password: string): Promise<IHomePage> {
        await this.enterUserName(username);
        await this.enterPassWord(password);
        return await this.clickLogin();
    }
} 
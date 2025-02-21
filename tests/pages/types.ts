import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ILoginPage {
    enterUserName(username: string): Promise<ILoginPage>;
    enterPassWord(password: string): Promise<ILoginPage>;
    clickLogin(): Promise<IHomePage>;
    getTitle(): Promise<string>;
    getErrorMessage(): Promise<string>;
    login(username: string, password: string): Promise<IHomePage>;
}

export interface IHomePage {
    clickWelcome(): Promise<IHomePage>;
    clickLogout(): Promise<ILoginPage>;
    getTitle(): Promise<string>;
    getDashboardHeader(): Promise<string>;
    isLoggedIn(): Promise<boolean>;
    logout(): Promise<ILoginPage>;
}

export type PageClassType = {
    new(page: Page): BasePage;
}; 
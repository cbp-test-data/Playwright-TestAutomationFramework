import { Page } from '@playwright/test';
import { ILoginPage, IHomePage } from './types';
import { OrangeHRMLoginPage } from './OrangeHRMLoginPage';
import { OrangeHRMHomePage } from './OrangeHRMHomePage';

export class PageFactory {
    private static pages: Map<string, any> = new Map();

    static getLoginPage(page: Page): ILoginPage {
        const key = 'login';
        if (!this.pages.has(key)) {
            this.pages.set(key, new OrangeHRMLoginPage(page));
        }
        return this.pages.get(key);
    }

    static getHomePage(page: Page): IHomePage {
        const key = 'home';
        if (!this.pages.has(key)) {
            this.pages.set(key, new OrangeHRMHomePage(page));
        }
        return this.pages.get(key);
    }

    static clearPages(): void {
        this.pages.clear();
    }
} 
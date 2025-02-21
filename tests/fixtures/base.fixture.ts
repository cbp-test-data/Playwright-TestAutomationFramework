import { test as base } from '@playwright/test';
import { TestHelper } from '../utils/TestHelper';
import { PageFactory } from '../pages/PageFactory';
import { ILoginPage } from '../pages/types';

// Declare the types of your fixtures
type MyFixtures = {
    loginPage: ILoginPage;
    testHelper: TestHelper;
};

// Extend the base test with your fixtures
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = PageFactory.getLoginPage(page);
        await use(loginPage);
    },

    testHelper: async ({}, use) => {
        await use(new TestHelper());
    }
});

export { expect } from '@playwright/test'; 
import { test, expect } from '../fixtures/base.fixture';
import { orangeHRMTestData } from '../fixtures/test-data';
import { config } from '../../config/config';
import { PageFactory } from '../pages/PageFactory';
import { DataGenerator } from '../utils/DataGenerator';
import { TestReporter } from '../utils/TestReporter';

test.describe('OrangeHRM Tests', () => {
    test.beforeAll(async () => {
        TestReporter.init();
    });

    test.beforeEach(async ({ page }, testInfo) => {
        // Navigate to the application before each test
        await page.goto(config.baseURL);
        // Clear page objects before each test
        PageFactory.clearPages();
        // Log test start
        await TestReporter.logStep(testInfo, 'Starting test');
    });

    test.afterEach(async ({ page }, testInfo) => {
        // Save test artifacts
        await TestReporter.saveTestArtifacts(testInfo, page);
    });

    test('Login and Logout Test', async ({ loginPage }, testInfo) => {
        await TestReporter.logStep(testInfo, 'Attempting login');
        
        // Login to the application
        const homePage = await loginPage.login(orangeHRMTestData.username, orangeHRMTestData.password);

        await TestReporter.logStep(testInfo, 'Verifying successful login');
        // Verify successful login
        expect(await homePage.isLoggedIn()).toBeTruthy();
        expect(await homePage.getDashboardHeader()).toBe('Dashboard');

        await TestReporter.logStep(testInfo, 'Performing logout');
        // Perform logout
        const logoutPage = await homePage.logout();

        await TestReporter.logStep(testInfo, 'Verifying successful logout');
        // Verify successful logout
        expect(await logoutPage.getTitle()).toBe('OrangeHRM');
    });

    test('Failed Login Test - Invalid Password', async ({ loginPage }, testInfo) => {
        const invalidPassword = DataGenerator.generatePassword();
        await TestReporter.logStep(testInfo, `Attempting login with invalid password: ${invalidPassword}`);

        // Attempt login with invalid credentials
        await loginPage.login(orangeHRMTestData.username, invalidPassword);

        await TestReporter.logStep(testInfo, 'Verifying error message');
        // Verify error message
        expect(await loginPage.getErrorMessage()).toBe('Invalid credentials');
    });

    test('Failed Login Test - Empty Credentials', async ({ loginPage }, testInfo) => {
        await TestReporter.logStep(testInfo, 'Attempting login with empty credentials');
        
        // Attempt login with empty credentials
        await loginPage.login('', '');

        await TestReporter.logStep(testInfo, 'Verifying error message');
        // Verify error message
        expect(await loginPage.getErrorMessage()).toBe('Username cannot be empty');
    });

    test('Failed Login Test - Invalid Username', async ({ loginPage }, testInfo) => {
        const invalidUsername = DataGenerator.generateUsername();
        await TestReporter.logStep(testInfo, `Attempting login with invalid username: ${invalidUsername}`);

        // Attempt login with invalid username
        await loginPage.login(invalidUsername, orangeHRMTestData.password);

        await TestReporter.logStep(testInfo, 'Verifying error message');
        // Verify error message
        expect(await loginPage.getErrorMessage()).toBe('Invalid credentials');
    });

    test('Login Page Title Test', async ({ loginPage }, testInfo) => {
        await TestReporter.logStep(testInfo, 'Verifying login page title');
        
        // Verify login page title
        expect(await loginPage.getTitle()).toBe('OrangeHRM');
    });

    test('Login and Verify Dashboard', async ({ loginPage }, testInfo) => {
        await TestReporter.logStep(testInfo, 'Performing login');
        
        // Login to the application
        const homePage = await loginPage.login(orangeHRMTestData.username, orangeHRMTestData.password);

        await TestReporter.logStep(testInfo, 'Verifying dashboard');
        // Verify dashboard
        expect(await homePage.isLoggedIn()).toBeTruthy();
        expect(await homePage.getDashboardHeader()).toBe('Dashboard');

        await TestReporter.logStep(testInfo, 'Performing cleanup - logout');
        // Cleanup - logout
        await homePage.logout();
    });
}); 
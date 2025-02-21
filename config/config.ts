import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
    // Base URLs
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    apiBaseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',

    // Browser configuration
    browser: {
        headless: process.env.HEADLESS !== 'false',
        slowMo: parseInt(process.env.SLOW_MO || '0'),
        defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000')
    },

    // Test configuration
    test: {
        retries: parseInt(process.env.TEST_RETRIES || '2'),
        parallel: process.env.TEST_PARALLEL !== 'false',
        workers: parseInt(process.env.TEST_WORKERS || '4')
    },

    // Authentication
    auth: {
        username: process.env.AUTH_USERNAME || '',
        password: process.env.AUTH_PASSWORD || '',
        apiKey: process.env.API_KEY || ''
    },

    // Reporting
    reporting: {
        screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE !== 'false',
        video: process.env.VIDEO_RECORDING !== 'false',
        reportPath: process.env.REPORT_PATH || './test-results'
    }
}; 
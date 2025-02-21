import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

async function globalSetup(config: FullConfig) {
    // Load environment variables from .env file
    dotenv.config({
        path: path.join(__dirname, '..', '.env')
    });

    // Create directories for reports and screenshots if they don't exist
    const fs = require('fs');
    const dirs = [
        './test-results',
        './test-results/screenshots',
        './playwright-report'
    ];

    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

export default globalSetup; 
#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Install Playwright browsers
echo "Installing Playwright browsers..."
npx playwright install

# Create environment file
echo "Creating .env file..."
if [ ! -f ".env" ]; then
    cp .env.example .env
fi

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p test-results/screenshots
mkdir -p playwright-report

# Make test runner executable
echo "Making test runner executable..."
chmod +x run-tests.sh

echo "Setup complete! You can now run tests using:"
echo "./run-tests.sh"
echo "Or with options:"
echo "./run-tests.sh --mode headed --browser chromium" 
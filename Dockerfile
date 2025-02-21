# Use Node.js LTS version as base image
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Create necessary directories
RUN mkdir -p test-results/screenshots test-results/videos test-results/traces playwright-report

# Set environment variables
ENV CI=true
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Command to run tests
CMD ["npm", "test"] 
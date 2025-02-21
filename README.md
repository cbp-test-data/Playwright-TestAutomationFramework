# Playwright Test Automation Framework

A comprehensive test automation framework using Playwright with TypeScript, implementing the Page Object Model pattern for both UI and API testing. This framework has been migrated from a Java-based Selenium and RestAssured framework.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
  - [Local Execution](#local-execution)
  - [Docker Execution](#docker-execution)
  - [Kubernetes Execution](#kubernetes-execution)
- [Common Utilities](#common-utilities)
- [ReportPortal Integration](#reportportal-integration)
- [Test Reports](#test-reports)
- [CI/CD Integration](#ci-cd-integration)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **UI Testing**: Automated browser testing using Playwright
- **API Testing**: Built-in API testing capabilities
- **Page Object Model**: Structured and maintainable page objects
- **TypeScript Support**: Full TypeScript implementation for better type safety
- **Parallel Execution**: Run tests in parallel across multiple browsers
- **Cross-browser Testing**: Support for Chromium, Firefox, and WebKit
- **Reporting**: 
  - Detailed HTML reports with screenshots and traces
  - ReportPortal integration for advanced analytics
  - Grafana dashboards for metrics visualization
- **Data Generation**: Built-in test data generation utilities
- **Configuration Management**: Environment-based configuration
- **CI/CD Ready**: Ready for integration with CI/CD pipelines
- **Docker Support**: Containerized test execution
- **Kubernetes Support**: Scalable test execution on Kubernetes clusters
- **ELK Integration**: Test results aggregation in Elasticsearch and Kibana
- **Common Utilities**: Comprehensive utility functions for:
  - Table handling with LinkedHashMap
  - Screenshot capture
  - Mouse and keyboard actions
  - File upload operations
  - Custom assertions
  - Wait conditions

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (optional)
- Kubernetes cluster (optional)
- kubectl and kustomize (for Kubernetes deployment)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Playwright_Test_Automation_Framework
```

2. Install dependencies:
```bash
npm install
npm install @reportportal/client-javascript
```

3. Run the setup script:
```bash
./setup.sh
```

This will:
- Install dependencies
- Install Playwright browsers
- Create necessary directories
- Set up environment configuration

## Project Structure

```
Playwright_Test_Automation_Framework/
├── config/                 # Configuration files
├── tests/
│   ├── api/              # API test files
│   ├── fixtures/         # Test fixtures and data
│   ├── pages/           # Page Object Model implementations
│   ├── specs/           # Test specifications
│   └── utils/           # Utility functions
├── test-results/         # Test execution results
├── playwright-report/    # HTML test reports
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Configuration

1. Environment Variables:
   - Copy `.env.example` to `.env`
   - Update the values according to your environment:
     ```
     BASE_URL=https://your-app-url.com
     HEADLESS=true
     ```

2. Playwright Configuration:
   - Edit `playwright.config.ts` for custom settings
   - Configure browsers, viewport, timeouts, etc.

## Running Tests

See [ExecutionHelp.md](docs/ExecutionHelp.md) for detailed execution instructions.

## Test Reports

1. HTML Reports:
```bash
npm run report:html
```

2. ReportPortal Dashboard:
   - Access your ReportPortal instance
   - Navigate to your project dashboard
   - View detailed test analytics and trends

3. Grafana Dashboards:
   - Test execution metrics
   - Performance metrics
   - Resource utilization

## Best Practices

1. **Using Common Utilities**:
   - Always use CommonUtils for standard operations
   - Extend CommonUtils for project-specific needs
   - Keep page-specific logic in page objects

2. **Table Handling**:
   - Use LinkedHashMap for structured data
   - Implement proper wait conditions
   - Handle dynamic tables appropriately

3. **Screenshots**:
   - Take contextual screenshots
   - Use meaningful names
   - Clean up old screenshots

4. **ReportPortal**:
   - Log meaningful steps
   - Add relevant attachments
   - Use appropriate log levels

## Troubleshooting

See [troubleshooting.md](docs/troubleshooting.md) for common issues and solutions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request

## License

This project is licensed under the ISC License.

## Kubernetes Deployment

### Environment Structure

The framework supports multiple environments through Kustomize overlays:

```
k8s/
├── base/                  # Base configuration
│   ├── kustomization.yaml
│   ├── playwright-tests.yaml
│   ├── services.yaml
│   ├── ingress.yaml
│   ├── monitoring.yaml
│   └── grafana-dashboard.yaml
└── overlays/             # Environment overlays
    ├── dev/
    ├── qa/
    ├── staging/
    └── prod/
```

### Environment Configurations

1. **Development (dev)**:
   - Runs every 6 hours
   - Lower resource requirements
   - Debug mode enabled
   - 2 parallel workers

2. **QA**:
   - Runs every 4 hours
   - Medium resource allocation
   - Enhanced debugging and screenshots
   - 2 parallel workers with retries

3. **Staging**:
   - Runs every 12 hours
   - Higher resource allocation
   - Video recording enabled
   - 3 parallel workers

4. **Production**:
   - Runs daily at midnight
   - Maximum resource allocation
   - Full monitoring and alerting
   - 4 parallel workers

### Deployment Commands

```bash
# View the generated manifests for an environment
kubectl kustomize k8s/overlays/dev

# Deploy to a specific environment
kubectl apply -k k8s/overlays/dev

# Delete from a specific environment
kubectl delete -k k8s/overlays/prod

# View test execution logs
kubectl logs -f job/playwright-tests
```

## Monitoring and Alerting

### Prometheus Metrics

The framework exposes the following metrics:

- `playwright_test_failures_total`: Total number of test failures
- `playwright_test_duration_seconds`: Test execution duration
- `playwright_test_retries_total`: Number of test retries
- `playwright_resource_usage`: Resource utilization metrics

### Grafana Dashboards

1. **Test Execution Dashboard**:
   - Test success/failure rates
   - Execution duration trends
   - Resource utilization graphs
   - Error distribution charts

2. **Environment Dashboard**:
   - Environment-specific metrics
   - Comparison across environments
   - Historical trends

### Alerts

1. **Critical Alerts**:
   - Test failures in production
   - High execution time
   - Resource exhaustion

2. **Warning Alerts**:
   - Increased retry rates
   - Performance degradation
   - Resource usage warnings

## Advanced Usage Examples

### Custom Test Configurations

```typescript
import { test } from '../fixtures/base.fixture';

test.describe('Advanced Tests', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('responsive design test', async ({ page }) => {
        // Test implementation
    });

    test('network throttling test', async ({ page }) => {
        await page.route('**/*', (route) => {
            route.continue({
                delay: 100
            });
        });
        // Test implementation
    });
});
```

### API Testing with Authentication

```typescript
import { test } from '../fixtures/api.fixture';

test.describe('API Tests', () => {
    test('authenticated request', async ({ request, authToken }) => {
        const response = await request.post('/api/data', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            data: {
                key: 'value'
            }
        });
        expect(response.status()).toBe(200);
    });
});
```

### Visual Testing

```typescript
import { test } from '../fixtures/visual.fixture';

test('visual comparison', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveScreenshot('dashboard.png', {
        maxDiffPixelRatio: 0.1
    });
});
```

## Performance Testing

### Load Testing Configuration

```typescript
import { chromium } from '@playwright/test';

async function runLoadTest() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    
    // Simulate multiple users
    for (let i = 0; i < 100; i++) {
        const page = await context.newPage();
        await page.goto('/target-page');
        // Perform actions
    }
}
```

## Security Testing

### OWASP Compliance Tests

```typescript
import { test } from '../fixtures/security.fixture';

test.describe('Security Tests', () => {
    test('XSS prevention', async ({ page }) => {
        const xssPayload = '<script>alert("xss")</script>';
        await page.fill('#input', xssPayload);
        // Verify XSS prevention
    });
});
```

## Troubleshooting

### Common Issues and Solutions

1. **Test Flakiness**:
   ```typescript
   test('stable test', async ({ page }) => {
       await page.waitForLoadState('networkidle');
       await page.waitForSelector('.ready');
       // Continue with test
   });
   ```

2. **Resource Management**:
   ```typescript
   test.afterEach(async ({ page }) => {
       await page.close();
   });
   ```

3. **Network Issues**:
   ```typescript
   test.beforeEach(async ({ context }) => {
       await context.route('**/*', route => {
           route.continue();
       });
   });
   ```

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Run the test suite
5. Submit a pull request

### Code Style Guide

- Follow TypeScript best practices
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused
- Write unit tests for utilities

## License

This project is licensed under the ISC License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the maintainers
- Check the documentation 
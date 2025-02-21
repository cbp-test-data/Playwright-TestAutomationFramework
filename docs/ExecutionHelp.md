# Playwright Test Automation Framework - Execution Guide

This guide provides detailed information about executing tests in different environments and configurations.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Execution](#local-execution)
- [Docker Execution](#docker-execution)
- [Kubernetes Execution](#kubernetes-execution)
- [AWS Cloud Execution](#aws-cloud-execution)
- [Environment-Specific Execution](#environment-specific-execution)
- [Test Types and Execution](#test-types-and-execution)
- [Reporting and Monitoring](#reporting-and-monitoring)
- [Troubleshooting](#troubleshooting)

## Prerequisites

1. **System Requirements**:
   ```bash
   Node.js >= v14
   npm >= v6
   Docker (optional)
   Kubernetes cluster (optional)
   AWS account (optional)
   ```

2. **Initial Setup**:
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd Playwright_Test_Automation_Framework

   # Run setup script
   ./setup.sh

   # Verify installation
   npm test
   ```

## Local Execution

1. **Basic Test Execution**:
   ```bash
   # Run all tests
   npm test

   # Run tests in headed mode
   npm run test:headed

   # Run tests with UI mode
   npm run test:ui

   # Run tests in debug mode
   npm run test:debug

   # Run API tests only
   npm run test:api

   # Run UI tests only
   npm run test:ui-only
   ```

2. **Parallel Execution**:
   ```bash
   # Run tests in parallel (4 workers)
   npm run test:parallel

   # Run tests sequentially
   npm run test:single
   ```

3. **Using Test Runner Script**:
   ```bash
   # Run all tests in headless mode
   ./run-tests.sh

   # Run tests in headed mode
   ./run-tests.sh --mode headed

   # Run specific browser tests
   ./run-tests.sh --browser chromium
   ./run-tests.sh --browser firefox
   ./run-tests.sh --browser webkit

   # Run specific test files
   ./run-tests.sh --test "login.spec.ts"
   ```

## Docker Execution

1. **Build and Run**:
   ```bash
   # Build Docker image
   docker build -t playwright-tests .

   # Run tests in container
   docker run playwright-tests

   # Run with environment variables
   docker run -e BASE_URL=https://your-app.com playwright-tests
   ```

2. **Using Docker Compose**:
   ```bash
   # Start all services
   docker-compose up -d

   # Run tests with monitoring
   docker-compose up playwright-tests

   # View test results
   docker-compose logs -f playwright-tests
   ```

## Kubernetes Execution

1. **Base Deployment**:
   ```bash
   # Deploy base configuration
   kubectl apply -k k8s/base
   ```

2. **Environment-Specific Deployment**:
   ```bash
   # Deploy to development
   kubectl apply -k k8s/overlays/dev

   # Deploy to QA
   kubectl apply -k k8s/overlays/qa

   # Deploy to staging
   kubectl apply -k k8s/overlays/staging

   # Deploy to production
   kubectl apply -k k8s/overlays/prod
   ```

3. **Special Test Configurations**:
   ```bash
   # Deploy load testing configuration
   kubectl apply -k k8s/overlays/load

   # Deploy security testing configuration
   kubectl apply -k k8s/overlays/security

   # Deploy performance testing configuration
   kubectl apply -k k8s/overlays/perf
   ```

4. **Monitoring Execution**:
   ```bash
   # View test pods
   kubectl get pods -l app=playwright-automation

   # View test logs
   kubectl logs -f -l app=playwright-automation

   # View test results
   kubectl port-forward svc/playwright-report-service 8080:80
   ```

## AWS Cloud Execution

1. **Setup AWS Resources**:
   ```bash
   # Configure AWS credentials
   aws configure

   # Create S3 bucket for results
   aws s3 mb s3://playwright-test-results

   # Create EC2 key pair
   aws ec2 create-key-pair --key-name playwright-tests
   ```

2. **Execute via GitHub Actions**:
   ```bash
   # Using GitHub CLI
   gh workflow run aws-playwright.yml \
     -f environment=staging \
     -f browser=chromium \
     -f test_suite=login.spec.ts
   ```

## Environment-Specific Execution

1. **Development Environment**:
   - Runs every 6 hours
   - 2 parallel workers
   - Debug mode enabled
   ```bash
   npm test -- --config=dev
   ```

2. **QA Environment**:
   - Runs every 4 hours
   - Enhanced debugging
   - Screenshot on failure
   ```bash
   npm test -- --config=qa
   ```

3. **Staging Environment**:
   - Runs every 12 hours
   - Video recording enabled
   - 3 parallel workers
   ```bash
   npm test -- --config=staging
   ```

4. **Production Environment**:
   - Runs daily at midnight
   - Maximum resource allocation
   - Full monitoring
   ```bash
   npm test -- --config=prod
   ```

## Test Types and Execution

1. **UI Tests**:
   ```bash
   # Run all UI tests
   npm run test:ui-only

   # Run specific UI test
   npx playwright test tests/specs/login.spec.ts
   ```

2. **API Tests**:
   ```bash
   # Run all API tests
   npm run test:api

   # Run specific API test
   npx playwright test tests/api/users.spec.ts
   ```

3. **Performance Tests**:
   ```bash
   # Run with performance tracing
   npm test -- --config=performance.config.ts
   ```

4. **Security Tests**:
   ```bash
   # Run security scans
   npm test -- --config=security.config.ts
   ```

5. **Load Tests**:
   ```bash
   # Run load tests
   npm test -- --config=load.config.ts
   ```

## Reporting and Monitoring

1. **Test Reports**:
   ```bash
   # Generate HTML report
   npm run report:html

   # Show report in browser
   npm run report
   ```

2. **Monitoring**:
   ```bash
   # Access Grafana dashboard
   kubectl port-forward svc/grafana 3000:3000

   # Access Kibana logs
   kubectl port-forward svc/kibana 5601:5601
   ```

3. **Clean Up**:
   ```bash
   # Clean test results
   npm run clean

   # Clean and run tests
   npm run pretest && npm test
   ```

## Troubleshooting

1. **Common Issues**:
   - Browser launch failures:
     ```bash
     npx playwright install
     ```
   - Network issues:
     ```bash
     npm run test:debug
     ```
   - Resource issues:
     ```bash
     npm run test:single
     ```

2. **Debug Mode**:
   ```bash
   # Run with debug logs
   DEBUG=playwright:* npm test

   # Run specific test in debug mode
   npx playwright test --debug tests/specs/login.spec.ts
   ```

3. **Environment Variables**:
   ```bash
   # Set environment variables
   export BASE_URL=https://your-app.com
   export HEADLESS=false
   export WORKERS=2

   # Run with specific browser
   BROWSER=firefox npm test
   ```

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Framework Documentation](./README.md)
- [Troubleshooting Guide](./troubleshooting.md)
- [API Documentation](./api.md)

## Support

For support and questions:
1. Create an issue in the repository
2. Contact the maintainers
3. Check the documentation
4. Join the community channels 
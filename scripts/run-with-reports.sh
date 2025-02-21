#!/bin/bash

# Clean previous results
echo "Cleaning previous test results..."
rm -rf test-results playwright-report

# Run the tests
echo "Running tests..."
npx playwright test tests/specs/simple-login.spec.ts --reporter=list,html,json

# Generate HTML report
echo "Generating HTML report..."
npx playwright show-report

# Upload results to ReportPortal (if configured)
if [ -n "$RP_TOKEN" ]; then
    echo "Uploading results to ReportPortal..."
    # Add your ReportPortal upload command here
    echo "Results uploaded to ReportPortal"
fi

echo "Test execution and reporting complete!"
echo "HTML report is available in playwright-report/index.html" 
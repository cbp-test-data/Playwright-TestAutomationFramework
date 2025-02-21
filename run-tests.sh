#!/bin/bash

# Function to display script usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo "Options:"
    echo "  -m, --mode     Test mode (headed/headless) [default: headless]"
    echo "  -b, --browser  Browser to run tests (chromium/firefox/webkit/all) [default: chromium]"
    echo "  -t, --test     Test pattern to run [default: all tests]"
    echo "  -h, --help     Display this help message"
    exit 1
}

# Default values
MODE="headless"
BROWSER="chromium"
TEST_PATTERN=""

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -m|--mode)
            MODE="$2"
            shift
            shift
            ;;
        -b|--browser)
            BROWSER="$2"
            shift
            shift
            ;;
        -t|--test)
            TEST_PATTERN="$2"
            shift
            shift
            ;;
        -h|--help)
            usage
            ;;
        *)
            echo "Unknown option: $1"
            usage
            ;;
    esac
done

# Set HEADLESS environment variable based on mode
if [ "$MODE" = "headed" ]; then
    export HEADLESS=false
else
    export HEADLESS=true
fi

# Prepare test command
TEST_CMD="npx playwright test"

# Add browser selection
if [ "$BROWSER" != "all" ]; then
    TEST_CMD="$TEST_CMD --project=$BROWSER"
fi

# Add test pattern if specified
if [ -n "$TEST_PATTERN" ]; then
    TEST_CMD="$TEST_CMD $TEST_PATTERN"
fi

# Run the tests
echo "Running tests with command: $TEST_CMD"
eval $TEST_CMD

# Show the report
npx playwright show-report 
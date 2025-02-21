#!/bin/bash

# Update system
apt-get update
apt-get upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install required dependencies for Playwright
apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    libatspi2.0-0

# Create working directory
mkdir -p /home/ubuntu/playwright-tests
chown -R ubuntu:ubuntu /home/ubuntu/playwright-tests

# Install global npm packages
npm install -g npm@latest
npm install -g playwright@latest

# Set environment variables
echo "export PATH=$PATH:/home/ubuntu/.local/share/npm/bin" >> /home/ubuntu/.bashrc
echo "export NODE_PATH=/home/ubuntu/.local/share/npm/lib/node_modules" >> /home/ubuntu/.bashrc 
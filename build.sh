#!/bin/bash
set -ex

# Clean installation
rm -rf node_modules package-lock.json

# Install with exact versions
npm config set legacy-peer-deps true
npm install --no-audit --no-fund

# Explicit dev dependencies
npm install --no-save --no-audit --no-fund \
  vite@5.4.14 \
  drizzle-kit@0.30.4 \
  @vitejs/plugin-react@4.3.2

# Verify installations
./node_modules/.bin/vite --version
./node_modules/.bin/drizzle-kit --version

# Build
npm run build
npm run db:push

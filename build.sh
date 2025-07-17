#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Setting up database schema..."
npm run db:push

echo "Build completed successfully!"

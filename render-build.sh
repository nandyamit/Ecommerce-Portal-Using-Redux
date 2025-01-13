#!/usr/bin/env bash
# exit on error
set -o errexit

# Initial cleanup
rm -rf client/dist

# Install dependencies
npm install
cd client
npm install

# Build client
npm run build

# Return to root
cd ..

# Start the server
npm start
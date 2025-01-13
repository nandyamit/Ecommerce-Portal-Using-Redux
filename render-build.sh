#!/usr/bin/env bash
# exit on error
set -o errexit

# Initial cleanup
rm -rf client/dist

# Install root dependencies
npm install

# Move to server directory and rebuild bcrypt
cd server
npm install
npm install node-pre-gyp
npm install bcrypt
cd ..

# Move to client directory
cd client

# Clean install dependencies
npm ci

# Install Vite globally
npm install -g vite

# Run build
vite build

# Return to root
cd ..
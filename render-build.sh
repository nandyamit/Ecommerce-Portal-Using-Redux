#!/usr/bin/env bash
# exit on error
set -o errexit

# Initial cleanup
rm -rf client/dist

# Install root dependencies
npm install

# Move to server directory and seed data
cd server
npm install
node config/seeds.js
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
#!/usr/bin/env bash
# exit on error
set -o errexit

# Initial cleanup
rm -rf client/dist

# Install root dependencies
npm install

# Move to client directory
cd client

# Clean install dependencies
npm ci

# Create local Vite config
echo 'import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false
  }
});' > vite.config.js

# Install Vite globally
npm install -g vite

# Run build
vite build

# Return to root
cd ..
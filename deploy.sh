#!/bin/bash
# Custom deploy script for GitHub Pages

# Build the project
echo "Building project..."
npm run build

# Ensure .nojekyll exists in out directory
echo "Creating .nojekyll file..."
touch out/.nojekyll

# Ensure _config.yml exists
echo "Creating _config.yml file..."
echo "skip_jekyll: true" > out/_config.yml

# Deploy with gh-pages
echo "Deploying to GitHub Pages..."
npx gh-pages -d out --no-history --force

echo "Deployment complete!"

#!/usr/bin/env node

/**
 * Deploy script that ensures .nojekyll exists before deploying to GitHub Pages
 * This prevents Jekyll from processing and blocking _next folder
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting deployment process...\n');

// Step 1: Build
console.log('📦 Building Next.js project...');
try {
  execSync('next build --webpack', { cwd: process.cwd(), stdio: 'inherit' });
  console.log('✓ Build successful\n');
} catch (error) {
  console.error('✗ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Ensure .nojekyll exists
const outDir = path.join(process.cwd(), 'out');
const nojekyllPath = path.join(outDir, '.nojekyll');

console.log('📝 Creating .nojekyll file...');
try {
  fs.writeFileSync(nojekyllPath, '', 'utf8');
  console.log('✓ .nojekyll created\n');
} catch (error) {
  console.error('✗ Failed to create .nojekyll:', error.message);
  process.exit(1);
}

// Step 3: Create .gitkeep in _next to ensure it's tracked
const nextDir = path.join(outDir, '_next');
if (fs.existsSync(nextDir)) {
  const gitkeepPath = path.join(nextDir, '.gitkeep');
  fs.writeFileSync(gitkeepPath, '', 'utf8');
  console.log('📁 Ensured _next directory is tracked\n');
}

// Step 4: Deploy
console.log('🌐 Deploying to GitHub Pages...');
try {
  execSync('gh-pages -d out --no-history', { cwd: process.cwd(), stdio: 'inherit' });
  console.log('\n✓ Deployment successful!\n');
  console.log('🎉 Your site should be live at: https://nilkanthholidays.in');
} catch (error) {
  console.error('✗ Deployment failed:', error.message);
  process.exit(1);
}

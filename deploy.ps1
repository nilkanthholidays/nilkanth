# Custom deploy script for GitHub Pages (PowerShell)

# Build the project
Write-Host "Building project..." -ForegroundColor Green
npm run build

# Ensure .nojekyll exists in out directory
Write-Host "Creating .nojekyll file..." -ForegroundColor Green
New-Item -Path "out/.nojekyll" -ItemType File -Force | Out-Null

# Ensure _config.yml exists  
Write-Host "Creating _config.yml file..." -ForegroundColor Green
@"
# Disable Jekyll
skip_jekyll: true
"@ | Set-Content -Path "out/_config.yml" -Force

# Deploy with gh-pages
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green
npx gh-pages -d out --no-history --force

Write-Host "Deployment complete!" -ForegroundColor Cyan

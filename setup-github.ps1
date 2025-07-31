# PowerShell script for GitHub setup
Write-Host "=== GitHub Setup for Personal Brand Builder ===" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"

# Get Personal Access Token (hidden input)
$token = Read-Host "Enter your Personal Access Token" -AsSecureString
$tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($token))

Write-Host ""
Write-Host "Setting up Git remote..." -ForegroundColor Yellow

# Add remote origin
git remote add origin "https://${username}:${tokenPlain}@github.com/${username}/personal-brand-builder.git"

Write-Host "Renaming branch to main..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "=== Success! ===" -ForegroundColor Green
Write-Host "Your code is now on GitHub at:" -ForegroundColor Green
Write-Host "https://github.com/${username}/personal-brand-builder" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next step: Deploy to Vercel at https://vercel.com/new" -ForegroundColor Yellow
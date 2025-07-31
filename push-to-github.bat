@echo off
echo Adding remote origin...
git remote add origin https://github.com/YOUR_USERNAME/personal-brand-builder.git

echo.
echo Renaming branch to main...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo Done! Your code is now on GitHub.
pause
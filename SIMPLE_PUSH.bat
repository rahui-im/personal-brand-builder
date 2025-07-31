@echo off
echo ===================================
echo GitHub Push - Personal Brand Builder
echo ===================================
echo.

set /p username="GitHub 사용자명 입력: "
set /p token="Personal Access Token 입력: "

echo.
echo 설정 중...
git remote add origin https://%username%:%token%@github.com/%username%/personal-brand-builder.git

echo.
echo 푸시 중...
git push -u origin main

echo.
echo 완료!
echo GitHub: https://github.com/%username%/personal-brand-builder
pause
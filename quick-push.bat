@echo off
echo ========================================
echo GitHub Push Helper - Personal Brand Builder
echo ========================================
echo.
echo 먼저 다음을 준비하세요:
echo 1. GitHub 사용자명
echo 2. Personal Access Token
echo 3. GitHub에 저장소를 이미 생성했는지 확인
echo.
pause

set /p username="GitHub 사용자명을 입력하세요: "
set /p token="Personal Access Token을 입력하세요: "

echo.
echo 원격 저장소 추가 중...
git remote add origin https://%username%:%token%@github.com/%username%/personal-brand-builder.git

echo.
echo 브랜치를 main으로 변경 중...
git branch -M main

echo.
echo GitHub에 푸시 중...
git push -u origin main

echo.
echo ========================================
echo 완료! 브라우저에서 확인하세요:
echo https://github.com/%username%/personal-brand-builder
echo ========================================
pause
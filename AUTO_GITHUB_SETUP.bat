@echo off
chcp 65001 > nul
color 0A
cls

echo ╔══════════════════════════════════════════════════════════════╗
echo ║          🚀 GitHub 자동 설정 도우미                          ║
echo ║                  희희락락 프로젝트                           ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 이 스크립트는 GitHub 저장소 생성을 제외한 모든 것을 자동화합니다.
echo.
echo 📋 필요한 작업:
echo    1. 브라우저에서 GitHub 저장소 생성 (30초)
echo    2. 이 스크립트 실행으로 자동 푸시
echo.
echo ══════════════════════════════════════════════════════════════
echo.
echo 🌐 지금 브라우저를 열어서 저장소를 만들어주세요:
echo.
echo    1. https://github.com/new 접속
echo    2. Repository name: personal-brand-builder
echo    3. Public 선택
echo    4. Create repository 클릭
echo.
echo ══════════════════════════════════════════════════════════════
echo.
echo 저장소를 만드셨나요? (Y/N)
choice /C YN /N /M "> "

if %ERRORLEVEL% EQU 2 (
    echo.
    echo 저장소를 먼저 만들어주세요!
    start https://github.com/new
    pause
    exit
)

echo.
echo ✅ 좋습니다! 이제 자동으로 푸시를 진행합니다.
echo.
timeout /t 2 /nobreak > nul

echo 🔐 GitHub 인증 정보를 입력해주세요:
echo.
set /p token="Personal Access Token 입력: "

echo.
echo 🚀 GitHub에 푸시 중...
echo.

git remote remove origin 2>nul
git remote add origin https://imhyelan78:%token%@github.com/imhyelan78/personal-brand-builder.git
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    cls
    echo ╔══════════════════════════════════════════════════════════════╗
    echo ║                    ✅ 성공!                                  ║
    echo ╚══════════════════════════════════════════════════════════════╝
    echo.
    echo 🎉 모든 코드가 GitHub에 업로드되었습니다!
    echo.
    echo 📌 확인하기:
    echo    https://github.com/imhyelan78/personal-brand-builder
    echo.
    echo 📦 다음 단계 - Vercel 배포:
    echo    1. https://vercel.com/new 접속
    echo    2. "Import Git Repository" 클릭
    echo    3. personal-brand-builder 선택
    echo    4. Deploy 클릭!
    echo.
    start https://github.com/imhyelan78/personal-brand-builder
    echo.
) else (
    echo.
    echo ❌ 오류가 발생했습니다.
    echo.
    echo 가능한 원인:
    echo    - Personal Access Token이 잘못됨
    echo    - 저장소가 생성되지 않음
    echo    - 저장소 이름이 다름
    echo.
)

pause
@echo off
chcp 65001 > nul
color 0A
cls

echo ╔══════════════════════════════════════════════════════════════╗
echo ║          🚀 Personal Brand Builder - GitHub Push             ║
echo ║                      희희락락 프로젝트                        ║
echo ╔══════════════════════════════════════════════════════════════╝
echo.
echo 📋 체크리스트:
echo    ✅ 3개의 커밋이 준비됨
echo    ✅ CI/CD 설정 완료
echo    ✅ Vercel 배포 준비 완료
echo.
echo ⚠️  시작하기 전에 준비하세요:
echo    1. GitHub 계정
echo    2. personal-brand-builder 저장소 (GitHub.com에서 생성)
echo    3. Personal Access Token
echo.
echo 📌 Personal Access Token 만들기:
echo    GitHub → Settings → Developer settings → Personal access tokens
echo    → Generate new token (classic) → repo, workflow 권한 선택
echo.
pause

cls
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                   GitHub 정보 입력                            ║
echo ╔══════════════════════════════════════════════════════════════╝
echo.
set /p username="👤 GitHub 사용자명: "
echo.
echo 🔐 Personal Access Token을 입력하세요:
echo    (보안을 위해 입력 시 화면에 표시되지 않습니다)
powershell -Command "$token = Read-Host -AsSecureString; $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token); $plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR); git remote add origin https://%username%:$plainToken@github.com/%username%/personal-brand-builder.git 2>nul"

echo.
echo 🔄 GitHub에 푸시 중...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ 성공! 코드가 GitHub에 업로드되었습니다!
    echo.
    echo 🌐 GitHub에서 확인: https://github.com/%username%/personal-brand-builder
    echo.
    echo 📦 다음 단계: Vercel 배포
    echo    1. https://vercel.com/new 접속
    echo    2. GitHub 저장소 연결
    echo    3. Deploy 클릭!
    echo.
) else (
    echo.
    echo ❌ 오류가 발생했습니다. 다음을 확인하세요:
    echo    - GitHub에 저장소를 생성했는지
    echo    - Personal Access Token이 올바른지
    echo    - Token에 repo, workflow 권한이 있는지
    echo.
)

pause
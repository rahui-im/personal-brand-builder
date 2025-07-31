# 📤 GitHub Push Instructions

코드를 GitHub에 푸시하려면 다음 중 하나를 선택하세요:

## 옵션 1: PowerShell 스크립트 사용 (추천) ✨

1. PowerShell을 관리자 권한으로 실행
2. 다음 명령어 실행:
```powershell
cd D:\homepage\personal-brand-builder
.\setup-github.ps1
```

## 옵션 2: 수동 설정 🔧

Git Bash 또는 터미널에서:

```bash
# 1. 원격 저장소 추가 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/personal-brand-builder.git

# 2. 푸시 (인증 정보 입력 필요)
git push -u origin main
```

인증 요청 시:
- Username: GitHub 사용자명
- Password: Personal Access Token (비밀번호 아님!)

## 옵션 3: 토큰 포함 URL 사용 🔐

```bash
# YOUR_USERNAME과 YOUR_TOKEN을 실제 값으로 변경
git remote add origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/personal-brand-builder.git
git push -u origin main
```

## 현재 준비된 커밋들:

1. ✅ 초기 프로젝트 설정 (희희락락 홈페이지)
2. ✅ GitHub Actions CI/CD 워크플로우
3. ✅ Vercel 배포 설정
4. ✅ 문서 및 가이드 추가

총 3개의 커밋이 GitHub에 푸시될 준비가 되었습니다!

## 푸시 후 확인사항:

- [ ] GitHub 저장소에서 코드 확인
- [ ] Actions 탭에서 CI/CD 실행 확인
- [ ] README.md의 "희희락락" 표시 확인

---

💡 **도움말**: Personal Access Token이 없다면 GITHUB_AUTH_SETUP.md 파일을 참고하세요!
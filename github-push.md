# GitHub Push 명령어

## 옵션 1: HTTPS (Personal Access Token 사용)

```bash
# 1. 원격 저장소 추가 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/personal-brand-builder.git

# 2. 브랜치 이름을 main으로 변경
git branch -M main

# 3. GitHub에 푸시
git push -u origin main
```

인증 팝업이 뜨면:
- Username: GitHub 사용자명
- Password: Personal Access Token (비밀번호가 아님!)

## 옵션 2: 토큰을 URL에 포함 (자동 인증)

```bash
# YOUR_USERNAME과 YOUR_TOKEN을 실제 값으로 변경
git remote add origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/personal-brand-builder.git
git branch -M main
git push -u origin main
```

## 현재 상태 확인

```bash
# 원격 저장소 확인
git remote -v

# 현재 브랜치 확인
git branch

# 커밋 로그 확인
git log --oneline
```
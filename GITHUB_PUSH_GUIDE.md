# 🚀 GitHub 푸시 가이드

## 준비사항 체크리스트

1. ✅ **GitHub 계정이 있나요?**
   - 없다면: [github.com/signup](https://github.com/signup) 에서 가입

2. ✅ **GitHub에 저장소를 만들었나요?**
   - [github.com/new](https://github.com/new) 에서 생성
   - Repository name: `personal-brand-builder`
   - Public 선택
   - "Create repository" 클릭

3. ✅ **Personal Access Token이 있나요?**
   - GitHub → Settings → Developer settings → Personal access tokens
   - "Generate new token (classic)" 클릭
   - 권한: `repo` (전체), `workflow` 선택
   - 토큰을 안전한 곳에 복사 저장

## 실행 방법

### 방법 1: PowerShell 스크립트 (권장) 🎯

1. **PowerShell을 관리자 권한으로 실행**
   - Windows 키 → "PowerShell" 검색
   - "관리자 권한으로 실행" 클릭

2. **프로젝트 폴더로 이동**
   ```powershell
   cd D:\homepage\personal-brand-builder
   ```

3. **스크립트 실행**
   ```powershell
   .\setup-github.ps1
   ```

4. **정보 입력**
   - GitHub 사용자명 입력
   - Personal Access Token 입력 (타이핑해도 화면에 보이지 않음)

### 방법 2: 수동 명령어 💻

```bash
# 1. Git Bash 열기
# 2. 프로젝트 폴더로 이동
cd /d/homepage/personal-brand-builder

# 3. 원격 저장소 추가 (YOUR_USERNAME과 YOUR_TOKEN을 실제 값으로 변경)
git remote add origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/personal-brand-builder.git

# 4. 브랜치 이름 변경
git branch -M main

# 5. 푸시
git push -u origin main
```

### 방법 3: 배치 파일 사용 📁

`quick-push.bat` 파일을 더블클릭하고 안내에 따라 진행

## 문제 해결

### "PowerShell 스크립트를 실행할 수 없습니다" 오류

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Permission denied" 오류

- Personal Access Token이 올바른지 확인
- Token에 `repo` 권한이 있는지 확인

### "Repository not found" 오류

- GitHub에 저장소를 먼저 생성했는지 확인
- 저장소 이름이 `personal-brand-builder`인지 확인

## 성공 확인 ✅

푸시가 성공하면:
1. `https://github.com/YOUR_USERNAME/personal-brand-builder` 에서 코드 확인
2. README.md가 보이고 "희희락락" 타이틀이 표시됨
3. 모든 파일이 업로드됨

## 다음 단계: Vercel 배포 🚀

GitHub 푸시가 완료되면:
1. [vercel.com/new](https://vercel.com/new) 접속
2. GitHub 저장소 연결
3. Deploy 클릭!

---

💡 **팁**: PowerShell 스크립트가 가장 쉽고 안전한 방법입니다!
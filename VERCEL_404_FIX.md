# 🔧 Vercel 404 에러 해결 가이드

## 가능한 원인들:

### 1. 빌드 실패
Vercel 대시보드에서 확인:
1. [vercel.com](https://vercel.com) 로그인
2. `personal-brand-builder` 프로젝트 클릭
3. **Deployments** 탭 확인
4. 최근 배포의 상태 확인 (🔴 빨간색이면 실패)

### 2. 환경 변수 누락
프로젝트 Settings에서:
1. **Settings** → **Environment Variables**
2. 다음 추가:
   ```
   NEXT_PUBLIC_APP_NAME = Personal Brand Builder - 희희락락
   ```
3. **Save** 클릭
4. **Deployments** → **Redeploy** 클릭

### 3. 빌드 명령어 문제
Settings → General에서 확인:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## 🚀 빠른 해결법:

### 방법 1: 재배포
1. Vercel 대시보드 → 프로젝트 선택
2. **Deployments** 탭
3. 최근 배포의 **...** 메뉴 클릭
4. **Redeploy** 선택

### 방법 2: 로컬 테스트
```bash
cd personal-brand-builder
npm install
npm run build
npm start
```
로컬에서 작동하는지 확인

### 방법 3: 새로운 배포
1. 코드 수정 후 GitHub 푸시
```bash
git add .
git commit -m "fix: Vercel deployment configuration"
git push origin main
```

## 📋 체크리스트:
- [ ] package.json에 build 스크립트 있는지 확인
- [ ] node_modules가 .gitignore에 있는지 확인
- [ ] 환경 변수 설정됨
- [ ] 빌드 로그에 에러 없음

## 🔍 빌드 로그 확인:
1. Vercel 대시보드 → Deployments
2. 실패한 배포 클릭
3. **Building** 섹션에서 에러 확인
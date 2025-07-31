# 🚀 Vercel 배포 가이드 - 희희락락

## 📌 1단계: Vercel 계정 준비

### Vercel 계정이 없다면:
1. [vercel.com/signup](https://vercel.com/signup) 접속
2. **"Continue with GitHub"** 클릭 (권장)
3. GitHub 계정으로 로그인

## 📌 2단계: 프로젝트 Import

### 1. Vercel 대시보드 접속
👉 [**vercel.com/new**](https://vercel.com/new)

### 2. GitHub 저장소 연결
- **"Import Git Repository"** 섹션
- GitHub 계정이 연결되어 있지 않다면 **"Add GitHub Account"** 클릭
- 권한 승인

### 3. 저장소 선택
- `personal-brand-builder` 검색 또는 선택
- **"Import"** 클릭

## 📌 3단계: 프로젝트 설정

### 기본 설정 (자동 감지됨):
```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 환경 변수 추가:
| Name | Value |
|------|-------|
| NEXT_PUBLIC_APP_NAME | Personal Brand Builder - 희희락락 |

### 배포 설정:
- **"Deploy"** 버튼 클릭
- 약 2-3분 대기

## 📌 4단계: 배포 완료!

### 성공 화면에서:
- ✅ **라이브 URL** 제공됨 (예: `personal-brand-builder.vercel.app`)
- ✅ **Visit** 버튼으로 사이트 확인
- ✅ **Dashboard** 에서 관리

## 🎯 배포 후 확인사항

### 1. 사이트 접속 테스트
- [ ] 홈페이지 로딩 확인
- [ ] "희희락락" 타이틀 표시
- [ ] 반응형 디자인 확인 (모바일)
- [ ] 버튼 클릭 동작 확인

### 2. 빌드 상태 확인
- Vercel Dashboard → Project → Deployments
- 녹색 체크 표시 확인

### 3. 자동 배포 설정 확인
- GitHub에 푸시할 때마다 자동 재배포
- Pull Request 시 프리뷰 배포

## 🌟 추가 설정 (선택사항)

### 커스텀 도메인 연결:
1. Settings → Domains
2. Add Domain
3. DNS 설정 안내 따르기

### 성능 모니터링:
- Analytics 탭에서 실시간 방문자 확인
- Speed Insights로 성능 측정

### 환경 변수 추가:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics
```

## 🔧 문제 해결

### 빌드 실패 시:
1. 로컬에서 `npm run build` 테스트
2. node_modules 삭제 후 재설치
3. package-lock.json 확인

### 404 오류:
- Root Directory 설정 확인
- Build Output 확인

## 🎉 축하합니다!

귀하의 **희희락락** 사이트가 이제 전 세계에서 접속 가능합니다!

### 공유 링크:
```
https://[your-project-name].vercel.app
```

### 다음 단계:
1. 사이트 커스터마이징
2. 이미지 추가 (사진 폴더 활용)
3. SEO 최적화
4. 애널리틱스 설정

---

💡 **팁**: Vercel은 매월 무료로 충분한 리소스를 제공합니다!
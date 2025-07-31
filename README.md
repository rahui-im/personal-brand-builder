# 🎨 Personal Brand Builder - 희희락락

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</div>

<div align="center">
  <h3>🚀 드래그 앤 드롭으로 만드는 퍼스널 브랜딩 웹사이트</h3>
  <p>코딩 없이 • 반응형 디자인 • 한국형 테마 "희희락락"</p>
</div>

---

## 🚀 주요 기능

### ✨ 핵심 기능
- **드래그 앤 드롭 인터페이스**: 직관적인 컴포넌트 추가 및 편집
- **실시간 미리보기**: 변경사항을 즉시 확인
- **반응형 디자인**: PC, 태블릿, 모바일 모든 디바이스 지원
- **컴포넌트 라이브러리**: Hero, About, Portfolio, Contact 등 다양한 컴포넌트
- **속성 편집 패널**: 텍스트, 색상, 레이아웃 실시간 편집

### 🎨 디자인 시스템
- **모던한 UI**: Tailwind CSS와 shadcn/ui 기반
- **일관된 디자인**: 통일된 색상 팔레트와 타이포그래피
- **접근성**: WCAG 2.1 AA 준수

### 💾 데이터 관리
- **자동 저장**: 5초마다 자동으로 변경사항 저장
- **실행 취소/다시 실행**: 작업 히스토리 관리
- **로컬 스토리지**: 브라우저에 데이터 안전 저장

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit
- **Forms**: React Hook Form + Zod

### Development Tools
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd personal-brand-builder
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 브라우저에서 확인
```
http://localhost:3000
```

## 🎯 사용법

### 1. 홈페이지 방문
- 메인 페이지에서 "무료로 시작하기" 버튼 클릭
- 또는 "템플릿 보기"로 미리 만들어진 템플릿 선택

### 2. 빌더 사용
- **왼쪽 사이드바**: 컴포넌트 라이브러리
  - 원하는 컴포넌트를 드래그하여 캔버스에 추가
  - 카테고리별 필터링 및 검색 기능

- **중앙 캔버스**: 페이지 편집 영역
  - 추가된 컴포넌트들이 순서대로 표시
  - 컴포넌트 클릭으로 선택
  - 드래그로 순서 변경 가능

- **오른쪽 패널**: 속성 편집
  - 선택된 컴포넌트의 속성 편집
  - 콘텐츠, 스타일, 레이아웃 탭으로 구분

### 3. 미리보기 및 저장
- **미리보기**: 상단 헤더의 "미리보기" 버튼으로 실제 웹사이트 확인
- **저장**: 자동 저장되며, 수동 저장도 가능
- **실행 취소**: Ctrl+Z 또는 헤더의 실행 취소 버튼

## 📁 프로젝트 구조

```
personal-brand-builder/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 홈페이지
│   │   ├── builder/           # 빌더 페이지
│   │   ├── preview/           # 미리보기 페이지
│   │   └── templates/         # 템플릿 갤러리
│   ├── components/
│   │   ├── builder/           # 빌더 관련 컴포넌트
│   │   │   ├── BuilderHeader.tsx
│   │   │   ├── ComponentLibrary.tsx
│   │   │   ├── Canvas.tsx
│   │   │   ├── PropertyPanel.tsx
│   │   │   └── ComponentRenderer.tsx
│   │   └── ui/               # shadcn/ui 컴포넌트
│   └── lib/
│       └── store/
│           └── builder.store.ts  # Zustand 스토어
├── public/                   # 정적 파일
└── package.json
```

## 🎨 컴포넌트 라이브러리

### 레이아웃 컴포넌트
- **Hero Section**: 메인 타이틀과 CTA 버튼
- **Footer**: 푸터 정보

### 콘텐츠 컴포넌트
- **About Me**: 자기소개 섹션
- **Portfolio**: 프로젝트 갤러리
- **Skills**: 기술 스택 및 능력
- **Testimonials**: 고객 후기 캐러셀

### 폼 컴포넌트
- **Contact Form**: 연락처 폼

## 🔧 개발 가이드

### 새로운 컴포넌트 추가
1. `ComponentRenderer.tsx`에 새 컴포넌트 함수 추가
2. `ComponentLibrary.tsx`에 컴포넌트 정보 추가
3. `PropertyPanel.tsx`에 속성 편집 옵션 추가
4. `builder.store.ts`의 Component 타입에 추가

### 스타일 커스터마이징
- Tailwind CSS 클래스 사용
- `globals.css`에서 전역 스타일 정의
- 컴포넌트별 인라인 스타일 지원

## 🚀 배포

### Vercel 배포 (권장)
```bash
npm run build
vercel --prod
```

### 환경 변수
```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📊 성능 최적화

- **코드 스플리팅**: 동적 임포트로 번들 크기 최적화
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **메모이제이션**: React.memo로 불필요한 리렌더링 방지
- **가상화**: 대용량 리스트에 가상 스크롤 적용

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

- **이슈 리포트**: GitHub Issues
- **문의**: [이메일 주소]
- **문서**: [문서 링크]

---

**Personal Brand Builder** - 누구나 10분 안에 전문적인 퍼스널 브랜딩 웹사이트를 만들 수 있는 가장 직관적인 빌더

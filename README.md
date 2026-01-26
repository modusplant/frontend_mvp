# 🌱 ModusPlant - 식물 커뮤니티 정보 제공 플랫폼

> **식물을 좋아하는 사람들을 위한 커뮤니티**  
> 식물 관련 정보를 공유하고, 경험을 나누며, 함께 성장하는 공간

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-5-purple?style=flat-square)
![React Query](https://img.shields.io/badge/React%20Query-5-FF4154?style=flat-square&logo=react-query)

---

## 🎯 프로젝트 개요

**ModusPlant**는 식물을 사랑하는 사람들이 모여 정보를 공유하고 커뮤니티를 형성하는 플랫폼입니다.

- 🔐 **회원 인증**: AccessToken/RefreshToken 기반 보안 인증
- 📝 **게시글 작성**: 커뮤니티 콘텐츠 작성
- 💬 **댓글 시스템**: 계층형 댓글로 활발한 토론 유도
- 🔖 **북마크 & 좋아요**: 관심 콘텐츠 저장 및 추천
- 📱 **반응형 디자인**: PC/Tablet/Mobile 모두 최적화 (Desktop First)
- ⚡ **SEO 최적화**: 동적 메타데이터, robots.txt, sitemap.xml

---

## 🚀 Quick Start

### 필수 요구사항

- Node.js 18+
- pnpm 8+

### 설치 및 실행

```bash
# 1. 의존성 설치
pnpm install

# 2. 개발 서버 실행
pnpm dev

# 3. 브라우저에서 열기
# http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

---

## 📦 Tech Stack

### Core

- **Framework**: [Next.js 16](https://nextjs.org) - App Router 기반 SSR/SSG
- **Language**: [TypeScript 5](https://www.typescriptlang.org) - 타입 안전성
- **Runtime**: Node.js 18+

### Styling

- **CSS Framework**: [Tailwind CSS 4](https://tailwindcss.com) - 유틸리티 우선 CSS
- **Icons**: [lucide-react](https://lucide.dev) - 일관된 아이콘 시스템

### State Management & Data Fetching

- **State**: [Zustand 5](https://github.com/pmndrs/zustand) - 가벼운 전역 상태 관리
- **Server State**: [TanStack React Query 5](https://tanstack.com/query) - 비동기 데이터 페칭 & 캐싱
- **HTTP Client**: Axios - RESTful API 호출

### Form & Validation

- **Form**: [React Hook Form 7](https://react-hook-form.com) - 성능 최적화된 폼 관리
- **Validation**: [Zod 4](https://zod.dev) - 타입 안전 스키마 검증

### Development

- **Linter**: [ESLint 9](https://eslint.org) - 코드 품질 관리
- **Formatter**: [Prettier 3](https://prettier.io) - 코드 포맷팅
- **Package Manager**: [pnpm](https://pnpm.io) - 빠르고 효율적인 패키지 관리
- **CSS Post-processor**: PostCSS 4 - Tailwind CSS 처리

---

## 🗂️ 프로젝트 구조

```
modusplant/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 홈페이지 (메인, 게시글 목록)
│   ├── layout.tsx                # 루트 레이아웃
│   ├── not-found.tsx             # 404 페이지
│   ├── globals.css               # 전역 스타일
│   ├── favicon.ico
│   │
│   ├── (auth)/                   # 인증 레이아웃 그룹
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── signup/
│   │   └── reset-password/
│   │
│   ├── community/                # 커뮤니티 라우트
│   │   ├── [id]/page.tsx         # 게시글 상세 페이지
│   │   └── write/                # 게시글 작성 페이지
│   │
│   ├── mypage/                   # 마이페이지
│   │   ├── page.tsx              # 프로필 (기본)
│   │   ├── layout.tsx            # 마이페이지 레이아웃
│   │   ├── account/              # 계정 설정
│   │   ├── posts/                # 내 게시글
│   │   ├── comments/             # 내 댓글
│   │   ├── likes/                # 좋아요한 게시글
│   │   ├── bookmarks/            # 북마크한 게시글
│   │   ├── profile/              # 프로필 관리
│   │   └── recent/               # 최근본글
│   │
│   ├── reset-password/           # 비밀번호 재설정
│   │   └── page.tsx
│   │
│   ├── robots.ts                 # SEO - robots.txt 동적 생성
│   └── sitemap.ts                # SEO - sitemap.xml 동적 생성
│
├── components/                   # React 컴포넌트 (도메인별 구성)
│   ├── _common/                  # 공통 컴포넌트
│   │   ├── badge.tsx             # 배지 컴포넌트
│   │   ├── button.tsx            # 버튼 컴포넌트
│   │   ├── checkbox.tsx          # 체크박스
│   │   ├── emptyState.tsx        # 빈 상태 UI
│   │   ├── input.tsx             # 입력 필드
│   │   ├── postCard.tsx          # 게시글 카드 (재사용)
│   │   ├── profileImage.tsx      # 프로필 이미지
│   │   ├── primaryCategoryFilter.tsx    # 주 카테고리 필터
│   │   ├── secondaryCategoryFilter.tsx  # 부 카테고리 필터
│   │   └── modal/
│   │
│   ├── _layout/                  # 레이아웃 컴포넌트
│   │   ├── authGuard.tsx         # 인증 보호 레이아웃
│   │   ├── authInitializer.tsx   # 인증 초기화
│   │   ├── blurOverlay.tsx       # 블러 오버레이
│   │   ├── conditionalLayout.tsx # 조건부 레이아웃
│   │   ├── footer.tsx            # 푸터
│   │   ├── header.tsx            # 헤더
│   │   ├── modalProvider.tsx     # 모달 관리자
│   │   └── queryProvider.tsx     # React Query 설정
│   │
│   ├── auth/                     # 인증 관련 컴포넌트
│   │   ├── loginForm.tsx
│   │   ├── resetPassword/
│   │   └── signup/
│   │
│   ├── comment/                  # 댓글 시스템
│   │   ├── commentInput.tsx      # 댓글 입력
│   │   ├── commentItem.tsx       # 댓글 아이템
│   │   ├── commentList.tsx       # 댓글 목록
│   │   └── commentSection.tsx    # 댓글 섹션
│   │
│   ├── community/                # 커뮤니티 페이지 컴포넌트
│   │   ├── detail/               # 상세 페이지 컴포넌트
│   │   └── write/                # 작성 페이지 컴포넌트
│   │
│   ├── home/                     # 홈페이지 컴포넌트
│   │   ├── carouselControls.tsx  # 캐러셀 제어
│   │   ├── errorState.tsx        # 에러 상태
│   │   ├── heroBanner.tsx        # 히어로 배너
│   │   ├── heroBannerContent.tsx # 배너 컨텐츠
│   │   ├── homeEmptyState.tsx    # 홈 빈 상태
│   │   ├── loadingState.tsx      # 로딩 상태
│   │   ├── postList.tsx          # 게시글 목록
│   │   └── scrollToTop.tsx       # 상단 스크롤 버튼
│   │
│   └── mypage/                   # 마이페이지 컴포넌트
│       ├── sidebar.tsx           # 사이드바
│       ├── sidebarDesktop.tsx    # 데스크톱 사이드바
│       ├── sidebarMobile.tsx     # 모바일 사이드바
│       ├── account/              # 계정 설정 컴포넌트
│       ├── bookmarks/            # 북마크 컴포넌트
│       ├── comments/             # 댓글 컴포넌트
│       ├── common/               # 마이페이지 공통 컴포넌트
│       ├── likes/                # 좋아요 컴포넌트
│       ├── posts/                # 게시글 컴포넌트
│       ├── profile/              # 프로필 컴포넌트
│       └── recent/               # 최근본글 컴포넌트
│
├── lib/                          # 유틸리티 & 비즈니스 로직
│   ├── api/                      # API 호출 레이어
│   │   ├── client/               # 클라이언트 API (auth, post, comment, member)
│   │   ├── server/               # 서버 SSR API
│   │   └── instances/            # Axios 인스턴스 설정
│   │
│   ├── constants/                # 상수 정의
│   │   ├── apiInstance.ts
│   │   ├── auth.ts               # 인증 관련 상수
│   │   ├── categories.ts         # 카테고리 정의
│   │   ├── endpoints.ts          # API 엔드포인트
│   │   ├── mypage.ts             # 마이페이지 상수
│   │   ├── schema.ts             # Zod 검증 스키마
│   │   └── terms.ts              # 약관
│   │
│   ├── data/                     # 더미 데이터
│   │   ├── postDetail.ts
│   │   └── posts.ts
│   │
│   ├── hooks/                    # 커스텀 React Hooks (도메인별)
│   │   ├── auth/                 # 인증 훅 (useLogin, useSignup 등)
│   │   ├── category/             # 카테고리 훅
│   │   ├── comment/              # 댓글 훅
│   │   ├── common/               # 공통 훅
│   │   ├── community/            # 게시글 훅
│   │   ├── home/                 # 홈페이지 훅
│   │   └── mypage/               # 마이페이지 훅
│   │
│   ├── metadata/                 # SEO 메타데이터 관리
│   │   ├── helpers.ts            # 메타데이터 생성 헬퍼
│   │   ├── community.ts          # 커뮤니티 메타데이터
│   │   ├── home.ts               # 홈 메타데이터
│   │   ├── layout.ts             # 레이아웃 메타데이터
│   │   └── mypage.ts             # 마이페이지 메타데이터
│   │
│   ├── store/                    # Zustand 전역 상태
│   │   ├── authStore.ts          # 인증 상태 관리
│   │   └── modalStore.ts         # 모달 상태 관리
│   │
│   ├── types/                    # TypeScript 타입 정의
│   │   ├── auth.ts               # 인증 타입
│   │   ├── comment.ts            # 댓글 타입
│   │   ├── common.ts             # 공통 타입
│   │   ├── member.ts             # 멤버 타입
│   │   └── post.ts               # 게시글 타입
│   │
│   └── utils/                    # 유틸 함수
│       ├── category.ts           # 카테고리 처리
│       ├── cookies.ts            # 쿠키 관리
│       ├── formatTime.ts         # 시간 포맷팅
│       ├── getInitialAuthState.ts # 초기 인증 상태
│       ├── parseComments.ts      # 댓글 파싱
│       ├── post.ts               # 게시글 처리
│       ├── postFormData.ts       # 게시글 폼 데이터
│       ├── tailwindHelper.ts     # Tailwind 헬퍼
│       ├── auth/                 # 인증 유틸 함수
│       └── cookies/              # 쿠키 유틸 함수
│
├── public/                       # 정적 자산
│   ├── banner/                   # 배너 이미지
│   ├── icon/                     # 아이콘
│   ├── logo_favicon/             # 로고 & 파비콘
│   ├── fonts/                    # 커스텀 폰트
│   ├── post/                     # 게시글 이미지
│   └── README.md
│
├── docs/                         # 프로젝트 문서
│   ├── api-endpoints-refactoring.md
│   ├── api-integration.md
│   ├── architecture.md
│   └── completed-features.md
│
├── .github/                      # GitHub 설정
│   ├── instructions/             # Copilot 지시사항
│   └── workflows/                # GitHub Actions
│
├── .vscode/                      # VS Code 설정
├── .env.local                    # 로컬 환경 변수
├── .env.production.local         # 프로덕션 환경 변수
├── .prettierrc                   # Prettier 설정
├── .dependency-cruiser.js        # 의존성 분석 설정
├── next.config.ts                # Next.js 설정
├── tsconfig.json                 # TypeScript 설정
├── tailwind.config.ts            # Tailwind CSS 설정
├── postcss.config.mjs            # PostCSS 설정
├── eslint.config.mjs             # ESLint 설정
├── proxy.ts                      # API 프록시 설정
├── package.json                  # 프로젝트 의존성
├── pnpm-lock.yaml                # pnpm 락 파일
└── README.md                     # 프로젝트 README
```

---

## ✨ 주요 기능

### 🔐 인증 시스템

- **로그인/회원가입**: 이메일 기반 인증
- **토큰 관리**:
  - AccessToken (30분, httpOnly)
  - RefreshToken (7일)
  - RememberMe 자동 로그인
- **보안**: CORS, CSRF 방어

### 📄 게시글 (Community)

- **작성**: 마크다운 지원 풍부한 컨텐츠
- **카테고리**: 일상, Q&A, 팁 등 다양한 카테고리
- **상호작용**:
  - 좋아요/북마크 (낙관적 업데이트)
  - 댓글 시스템 (계층형 구조)
  - 조회수 추적
- **필터링**: 주 카테고리, 부 카테고리별 필터

### 💬 댓글 시스템

- **계층형 구조**: 댓글과 대댓글
- **CRUD 작업**: 전체 댓글 관리
- **상호작용**: 댓글 좋아요
- **실시간 업데이트**: React Query 기반

### 👤 마이페이지

- **프로필 관리**: 프로필 이미지, 소개 수정
- **계정 설정**: 비밀번호 변경, 회원탈퇴
- **나의 활동**:
  - 내 게시글 목록
  - 내 댓글 목록
  - 좋아요한 게시글
  - 북마크한 게시글
  - 최근 본 게시글
- **반응형**: 모바일/태블릿/데스크톱 최적화

### ⚡ SEO & 성능

- **메타데이터**: OG, Twitter, 기본 메타 자동 설정
- **동적 생성**: robots.txt, sitemap.xml
- **서버 컴포넌트**: 초기 데이터 서버 페칭
- **캐싱**: React Query 기반 스마트 캐싱

---

## 🔄 주요 패턴 & 컨벤션

### API 호출 패턴

```typescript
import { POST_ENDPOINTS } from "@/lib/constants/endpoints";
import { clientApiInstance } from "@/lib/api/instances/clientInstance";

// GET 요청
const post = await clientApiInstance.get<PostDetail>(
  POST_ENDPOINTS.POST_DETAIL(postId)
);

// POST 요청 (JSON)
const response = await clientApiInstance.post<Response>(AUTH_ENDPOINTS.LOGIN, {
  email,
  password,
});

// POST 요청 (FormData)
const response = await clientApiInstance.post<Response>(
  endpoint,
  formData // 자동으로 FormData로 감지
);

// 옵션 지정
const response = await clientApiInstance.post(endpoint, data, {
  skipAuth: true, // 토큰 불필요
  enableCache: true, // 캐싱 활성화
});
```

### 커스텀 Hook 패턴

```typescript
// 쿼리 훅 (데이터 페칭)
const { data, isLoading, error } = usePostsQuery();

// 뮤테이션 훅 (데이터 변경)
const { mutate: createPost, isPending } = useCreatePostMutation();

// 사용
const handleCreate = async (formData) => {
  createPost(formData, {
    onSuccess: () => {
      console.log("게시글 작성 완료");
    },
  });
};
```

### 상태 관리 패턴

```typescript
// Zustand (전역 상태)
import { useAuthStore } from "@/lib/store/authStore";

const { user, isLoggedIn, logout } = useAuthStore();

// React Query (서버 상태)
const { data: posts } = useQuery({
  queryKey: ["posts"],
  queryFn: () => clientApiInstance.get(POST_ENDPOINTS.POSTS),
});
```

### 폼 검증 패턴

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/constants/schema";

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(loginSchema),
});
```

---

## 🎨 개발 가이드

### 코드 스타일

- **Prettier**: 자동 포맷팅 적용
- **ESLint**: 코드 품질 검사
- **TypeScript**: 엄격한 타입 체킹

### 컴포넌트 작성 규칙

1. **서버/클라이언트 컴포넌트 명확히 구분**

   ```typescript
   // 서버 컴포넌트 (기본)
   export default async function ServerComponent() {}

   // 클라이언트 컴포넌트
   ("use client");
   export default function ClientComponent() {}
   ```

2. **상수 사용**
   - 엔드포인트: `lib/constants/endpoints.ts`
   - 카테고리: `lib/constants/categories.ts`
   - 스키마: `lib/constants/schema.ts`

3. **Tailwind 클래스**
   - `clsx` / `tailwind-merge` 사용
   - 반응형: `mobile-first` 접근 (sm:, md:, lg:)

### 타입 정의

- `lib/types/*.ts`에서 타입 정의
- API 응답 타입과 UI 타입 분리
- 재사용 가능한 타입 `lib/types/common.ts`에 정의

## 📝 라이선스

이 프로젝트는 개인 포트폴리오 프로젝트입니다.

## 👨‍💼 개발자

[![GitHub](https://img.shields.io/badge/GitHub-deokjin25-181717?style=flat-square&logo=github)](https://github.com/deokjin25)

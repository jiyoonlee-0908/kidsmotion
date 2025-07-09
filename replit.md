# KidsMotion - Scientific Children's Fitness Analysis System

## Overview

KidsMotion is a comprehensive web application that provides scientific measurement and AI-powered analysis of children's physical fitness capabilities. The system uses smart cycling equipment to measure various fitness parameters including explosive power, strength, muscle endurance, and cardiovascular endurance, then generates personalized exercise recommendations and professional reports.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **PWA**: Progressive Web App with service worker for offline capabilities

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Design**: RESTful endpoints with type-safe schema validation

### Build System
- **Bundler**: Vite for development and production builds
- **Development**: Hot module replacement with Vite dev server
- **Production**: Static assets served by Express
- **TypeScript**: Strict type checking across client and server

## Key Components

### Data Collection
- **Smart Cycling Equipment**: Real-time power measurement (5s, 15s, 30s, 60s intervals)
- **Biometric Data**: Heart rate monitoring, left/right balance tracking
- **User Information**: Age, gender, height, weight, school affiliation

### Analysis Engine
- **Percentile Calculation**: Age and gender-specific fitness standards
- **Relative Power Calculation**: Using W/kg^0.67 formula for fair comparison
- **Balance Assessment**: Left/right power distribution analysis
- **BMI and Growth Tracking**: Health indicators and trend analysis

### AI Integration
- **OpenAI GPT-4**: Generates personalized fitness analysis reports
- **Analysis Components**: Core insights, balance commentary, exercise explanations
- **Recommendations**: Tailored improvement suggestions based on weak areas

### Report Generation
- **PDF Export**: Professional reports with charts and analysis
- **QR Code Sharing**: Easy access to results via mobile devices
- **Print Optimization**: Formatted for standard A4 printing
- **Mobile Responsive**: Optimized viewing across all devices

## Data Flow

1. **Data Input**: User enters student information and measurement results
2. **Validation**: Client and server-side validation using Zod schemas
3. **Storage**: Measurement data stored in PostgreSQL with Drizzle ORM
4. **Analysis**: Server calculates percentiles, grades, and relative power metrics
5. **AI Processing**: OpenAI generates personalized fitness commentary
6. **Presentation**: Results displayed with interactive charts and visualizations
7. **Export**: Users can generate PDF reports or share via QR codes

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **AI Service**: OpenAI API for analysis generation
- **UI Components**: Radix UI primitives for accessibility
- **Charting**: Recharts for responsive data visualization

### Development Tools
- **Build**: Vite with TypeScript support
- **ORM**: Drizzle Kit for database migrations
- **Validation**: Zod for type-safe schema validation
- **Testing**: Built-in Replit development environment

### Optional Integrations
- **PWA Features**: Service worker for offline functionality
- **Image Generation**: DALL-E integration for system visualization
- **Mobile Optimization**: Responsive design with touch-friendly interfaces

## Deployment Strategy

### Production Environment
- **Platform**: Replit autoscale deployment
- **Build Process**: Vite production build with Express server bundle
- **Database**: Neon PostgreSQL with connection pooling
- **Environment Variables**: Secure API key and database URL management

### Development Workflow
- **Local Development**: Vite dev server with hot reloading
- **Database Migrations**: Drizzle Kit for schema management
- **Type Safety**: Shared TypeScript schemas between client/server
- **Code Quality**: ESLint and TypeScript strict mode

### Scalability Considerations
- **Database**: Serverless PostgreSQL auto-scales with demand
- **Frontend**: Static assets served efficiently
- **API**: Stateless design for horizontal scaling
- **Caching**: Browser caching for static assets and API responses

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- July 9, 2025: 중복 사용자 문제 완전 해결 및 4개 필드 기준 중복 제거 시스템 구축
  - 웹앱 중복 검색 문제 완전 해결: 김철수 3개→1개, 박시아 2개→1개 
  - 4개 필드 기준 중복 제거: 이름+생년월일+기관+측정일 조합으로 고유 식별
  - 동명이인 구분 기능: 다른 기관, 생년월일, 측정일 시 "이름 (생년월일 / 기관 / 측정일)" 형태로 표시
  - API 엔드포인트 모두 업데이트: `/api/supabase/search-user/:name` 중복 제거 로직 적용
  - 실시간 테스트 검증: 웹앱에서 김철수/박시아 검색 시 단일 결과 정상 반환
  - 하루 1회 측정 제한 대비: 같은 날 여러 측정 시 최신 데이터만 유지
  - HTML 스냅샷 시스템 준비 완료: fitness_report_snapshots 테이블 및 API 완성
  - 키/몸무게 자동 매핑 및 실시간 저장 기능 모든 검증 완료

- January 9, 2025: 백분위 계산 알고리즘 완전 개편
  - 연령별 allometric scaling 적용: ≤9세(0.75), 10-13세(0.72), ≥14세(0.67)
  - 5등급 시스템 도입: P3, P15, P50, P85, P97 기준점 사용
  - 새로운 선형보간 공식으로 정밀도 향상
  - 등급 체계: 1등급(≥97% 매우우수), 2등급(85-96% 우수), 3등급(15-84% 보통), 4등급(3-14% 부족), 5등급(<3% 매우부족)
  - 전체 시스템 적용: server/percentile.ts, routes.ts, client fitness-calculations.ts, build-wattbike-cutoffs.ts

- December 30, 2025: 전체 사이트를 고정 PC 레이아웃으로 변경 완료
  - 투자자 피드백 반영: 모바일 반응형 디자인으로 인한 가독성 문제 해결
  - viewport를 1200px 고정으로 설정, 사용자가 직접 확대/축소하여 보기
  - 모든 페이지의 반응형 클래스(sm:, md:, lg:, xl:) 제거
  - PC 최적화된 고정 그리드 및 타이포그래피 적용
  - 일관된 1200px 컨테이너 너비로 모든 기기에서 동일한 레이아웃 제공

- June 27, 2025: 전체 사이트 레이아웃 및 심박수 측정 개선 완료
  - IR 자료 페이지: 모든 화면에서 2열/3열 그리드 고정
  - 홈 페이지: 4열 체력지표, 3열 서비스 섹션 고정, 메뉴 여백 균등화
  - 파일럿 테스트, 정부 정책 섹션: 1x2 배열 고정
  - 심박수 측정: 필수값에서 선택사항으로 변경, 미입력시 "기록없음" 표시
  - 모바일 최적화: 반응형 텍스트와 여백으로 모든 화면에서 깔끔한 배치

- June 27, 2025: 커스텀 도메인 연결 완료
  - kidsmotion.bike 도메인 구매 및 Cloudflare 설정
  - Replit Autoscale Deployment와 연결
  - SSL 인증서 발급 대기 중 (30분 내 완료 예정)
  - 향후 확장 계획: silvermotion.bike, motion.bike (통합 브랜드 사이트)

- June 27, 2025: 팀 구성 섹션 디자인 개선
  - "핵심 역량 기반 팀 구성"으로 제목 변경
  - 대표자/팀원/파트너 3단 구성으로 단순화
  - 통일된 디자인 시스템 적용 (rounded-3xl, shadow-lg)
  - MVP 개발 역량과 30년 엘리트 경력 강조
  - 하드웨어 파트너십 명확화

- June 21, 2025: IR Materials 페이지 고급 투자자용 완전 재구성
  - 실제 데이터 기반으로 정확성 확보 (첨부파일 MotionBike 정보 반영)
  - 좌우 대칭 레이아웃으로 문제-해결 구조 명확화
  - 스크롤 애니메이션 완전 제거 (투자자 즉시 정보 파악)
  - 통일된 디자인 시스템: rounded-3xl, 일관된 패딩, 색상 체계
  - "부모의 걱정을 데이터로 바꾸는 팀" 메인 메시지로 차별화

- June 21, 2025: Supabase 자동 입력 기능 완성
  - 이름 입력 시 KidsMotion 앱 데이터 자동 조회
  - 한국 시간대(Asia/Seoul) 적용으로 측정일 정확성 확보  
  - 완료된 테스트가 없어도 기본 정보(이름, 성별, 생년월일, 소속) 자동 입력
  - 가민 데이터 없을 시 수기 입력 가능하도록 null 값 처리
  - 데이터베이스 필드 매핑 수정(camelCase → snake_case)

## Changelog

Changelog:
- June 17, 2025. Initial setup
# Palantir 생태계 파트너 분석 사이트

## 프로젝트 개요

해외에서 Palantir Foundry/AIP 기반 AX(Analytics Transformation) 프로젝트를 서비스하는 10개 선도 회사의 비즈니스 모델, 솔루션, 강점을 비교 분석하는 웹사이트입니다.

### 핵심 가치

- **팔란티어식 실행방식의 서비스화**: 단순히 팔란티어 소프트웨어를 파는 것이 아니라, FDE(Forward Deployed Engineer) 방식의 현장 밀착형 실행 모델을 서비스화한 회사들의 비즈니스 전략 분석
- **4가지 평가 기준**: Foundry/AIP 경험, 온톨로지 설계, FDE 방식, 실행 구현력
- **대표님 비즈니스 모델 벤치마킹**: Forward-Deployed AX Consulting 포지셔닝의 해외 사례 학습

---

## 프로젝트 구조

```
.
├── index.html                 # 메인 랜딩 페이지 (회사 목록 + 필터)
├── README.md                  # 이 파일
├── data/
│   └── companies.json         # 10개 회사 상세 정보 (JSON)
├── pages/
│   ├── company-template.html  # 회사 상세 페이지 템플릿
│   ├── northslope.html
│   ├── 10x-partners.html
│   ├── fourth-age.html
│   ├── unit8.html
│   ├── spr.html
│   ├── rackspace.html
│   ├── accenture-federal.html
│   ├── pvm.html
│   ├── bigbear.html
│   └── gallatin.html
└── assets/
    ├── css/
    │   └── style.css          # 통합 스타일시트
    └── js/
        ├── script.js          # 메인 페이지 로직 (필터링, 렌더링)
        └── detail.js          # 상세 페이지 로직 (동적 콘텐츠 로드)
```

---

## 10개 회사 분류

### Priority 1 (최우선 벤치마킹 대상 - 4개)

1. **Northslope Technologies** 
   - 전직 Palantir 인력 기반, 공식 서비스 파트너
   - 가장 직접적인 벤치마킹 대상

2. **10x Partners**
   - ex-Palantirian engineers 기반
   - "몇 주 안에 운영 배포"의 생산성 메시지

3. **Fourth Age**
   - FDE 방식을 서비스 모델로 전면화
   - 대표님 비즈니스 모델과 가장 유사

4. **Unit8**
   - 유럽형 데이터·AI 컨설팅 + Palantir
   - 산업별 솔루션 패키지 설계에 참고

### Priority 2 (2차 참고 대상 - 4개)

5. **SPR** - 정부급 보안 데이터 거버넌스 전문
6. **Rackspace Technology** - Managed AX Service 모델
7. **Accenture Federal Services** - 공공기관 AI 도입
8. **PVM Inc.** - 공공·정보기관 장기 운영 파트너

### Priority 3 (산업별 솔루션 확장 참고 - 2개)

9. **BigBear.ai** - Foundry 위에 산업별 AI 제품 구축
10. **Gallatin AI** - Ontology SDK 기반 외부 앱 통합

---

## 주요 기능

### 메인 페이지 (`index.html`)

- **통합 검색**: 회사명, 산업, 서비스, 솔루션으로 실시간 검색
- **우선순위별 필터링**: "모두", "Priority 1", "Priority 2", "Priority 3"
- **회사 카드 그리드**: 각 회사의 핵심 정보 미리보기
- **빠른 회사 이동**: 10개 회사 모두를 한눈에 보고 바로 이동 가능
- **헤더 드롭다운 메뉴**: 어디서나 "📋 회사 목록" 드롭다운으로 10개 회사 접근
- **분석 프레임워크**: 평가 기준 및 추천 포지셔닝 설명

### 회사 상세 페이지 (`pages/*.html`)

- **회사 개요**: 이름, 유형, 태그라인
- **공식 웹사이트 링크**
- **헤더 네비게이션**: 
  - "← 목록으로" 버튼 (메인으로 이동)
  - "📋 회사 목록" 드롭다운 (10개 회사 중 하나로 바로 이동)
- **8가지 상세 섹션**:
  1. **회사 소개** — 핵심 비즈니스 설명
  2. **제공 솔루션 & 서비스** — 주요 서비스 목록 (5-6개)
  3. **핵심 강점** — 경쟁 우위 포인트
  4. **차별화 포인트** — 시장에서의 포지셔닝
  5. **주요 대상 시장** — 타겟 고객군
  6. **참고 가치** — 대표님 비즈니스에의 구체적 시사점
  7. **성공 사례 & 컨설팅 프로젝트** ⭐ NEW
     - 실제 수행한 프로젝트 2-4개
     - 각 사례별 도전과제, 솔루션, 결과, 기간
     - 산업별, 규모별 다양한 사례
  8. **관련 자료 & 참고 문서** ⭐ NEW
     - Whitepaper, Technical Guide, Case Study, Blog, Webinar 등
     - 공개되어 있는 회사의 자료와 링크
     - 깊이 있는 학습을 위한 참고자료
  9. **같은 Priority 그룹의 다른 회사** ⭐ NEW
     - 같은 우선순위 그룹에 속한 다른 회사들로 쉽게 이동
     - 비교 분석을 위한 빠른 네비게이션

---

## 기술 스택

| 계층 | 기술 |
|------|------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Data** | JSON (정적 데이터) |
| **Design** | CSS Grid + Flexbox, Responsive Design |
| **No Build Tool** | 순수 정적 사이트 (프론트엔드 빌드 불필요) |

---

## 로컬 실행 방법

### 1. 간단한 HTTP 서버 시작 (Python)

```bash
# Python 3
python -m http.server 8000

# 또는 Python 2
python -m SimpleHTTPServer 8000
```

### 2. 또는 Node.js http-server

```bash
npm install -g http-server
http-server
```

### 3. 브라우저에서 열기

```
http://localhost:8000
```

---

## 배포 방법

### Vercel (권장)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 배포
vercel

# 3. 프로젝트 확인
vercel --prod
```

### GitHub Pages

1. 이 저장소를 GitHub에 푸시
2. Settings → Pages → Source = main branch
3. `https://username.github.io/repo-name/` 에서 접근

---

## 데이터 구조 (`data/companies.json`)

```json
{
  "id": 1,
  "name": "Company Name",
  "slug": "company-slug",
  "type": "Company Type",
  "website": "https://...",
  "tagline": "...",
  "whatTheyDo": "...",
  "solutions": ["...", "..."],
  "strengths": ["...", "..."],
  "differentiation": "...",
  "targetMarket": "...",
  "priority": 1,
  "relevanceToSB": "...",
  "caseStudies": [
    {
      "title": "프로젝트명",
      "industry": "산업",
      "challenge": "도전과제",
      "solution": "솔루션",
      "result": "결과 및 성과",
      "duration": "기간 (예: 12개월)"
    }
  ],
  "resources": [
    {
      "title": "자료명",
      "type": "Whitepaper|Case Study|Blog|Webinar|Technical Guide|Video",
      "url": "https://...",
      "description": "자료에 대한 간단한 설명"
    }
  ]
}
```

### 필드 설명

| 필드 | 설명 | 예시 |
|------|------|------|
| `caseStudies` | 회사가 수행한 실제 성공 사례 (배열) | 2-4개 프로젝트 |
| `resources` | 공개된 자료 및 참고 문서 링크 (배열) | 3-5개 자료 |
| case study 구조 | 도전과제 → 솔루션 → 결과의 3단계 스토리 | 비즈니스 임팩트 중심 |
| resource type | 자료의 종류 | Blog, Whitepaper, Case Study 등 |

---

## 수정 및 확장 가이드

### 새로운 회사 추가

1. **`data/companies.json` 편집**: 회사 정보 객체 추가
   ```json
   {
     "id": 11,
     "name": "...",
     "slug": "company-slug",
     // ... 기본 필드들
     "caseStudies": [ ... ],  // 필수
     "resources": [ ... ]      // 필수
   }
   ```

2. **HTML 페이지 생성**: `company-template.html` 복사 → `pages/company-slug.html`로 저장

3. **자동 업데이트**
   - 메인 페이지 필터 자동 갱신
   - 회사 카드 자동 생성
   - 네비게이션 자동 연결

### 성공 사례 & 자료 추가 팁

**성공 사례 작성**:
- **도전과제**: "레거시 시스템의 데이터 사일로 문제 해결 필요"
- **솔루션**: "Foundry를 도입하여 모든 데이터 소스를 통합"
- **결과**: "데이터 통합 시간 80% 단축, 리스크 감지 정확도 95%"

**자료 링크 추가**:
- 회사 웹사이트의 Resources/Blog/Case Studies 페이지 검색
- 공개된 Whitepaper, 기술 가이드 확인
- 회사 유튜브, 팟캐스트 등의 미디어 링크

### 스타일 수정

- `assets/css/style.css` 수정
- CSS 변수 (`:root`) 사용으로 색상·간격 일괄 변경 가능

### 메인 페이지 콘텐츠 수정

- `index.html` 직접 수정

---

## 성능 특징

| 항목 | 성능 |
|------|------|
| **첫 로딩 시간** | < 500ms |
| **파일 크기** | HTML ~10KB, CSS ~15KB, JS ~5KB, JSON ~20KB |
| **의존성** | 0 (외부 라이브러리 불필요) |
| **브라우저 지원** | 모던 브라우저 (Chrome, Safari, Firefox, Edge) |

---

## 대표님 비즈니스 적용

### 추천 포지셔닝

**Forward-Deployed AX Consulting**

- Palantir의 FDE 문화를 직접 표현
- 컨설팅, 교육, 플랫폼, 온톨로지, VCOS, 실행 역량 모두 포함
- 해외 투자자·파트너에게 직관적

### 사업 모델 구조

```
┌─────────────────────────────────────┐
│  Forward-Deployed AX Consulting     │
├─────────────────────────────────────┤
│ 1️⃣ AX Ontology 설계                │
│    - 업무/데이터/의사결정 구조 모델링 │
├─────────────────────────────────────┤
│ 2️⃣ AX Platform 구축                │
│    - VCOS, 온톨로지 엔진            │
├─────────────────────────────────────┤
│ 3️⃣ 산업별 앱 개발                 │
│    - AX Dental, AX Election, etc   │
├─────────────────────────────────────┤
│ 4️⃣ 현장 실행 (FDE)                │
│    - 고객사 상주, 변화 주도         │
└─────────────────────────────────────┘
```

---

## 라이선스

© 2026 SB Consulting. AX Ecosystem Partner Analysis.

---

## 지원 및 피드백

이 분석 자료는 대표님의 "Forward-Deployed AX Consulting" 포지셔닝 수립을 위해 준비되었습니다.

질문이나 추가 자료 필요 시 연락주세요.

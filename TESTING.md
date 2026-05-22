# 웹사이트 테스트 가이드

## 현재 상태
✅ 모든 기술 검증 완료:
- HTML 구조: 완벽 (모든 12개 섹션 ID 확인)
- JSON 데이터: 완벽 (10개 회사, 각각 2-4개 성공사례, 3-4개 자료)
- JavaScript 로직: 완벽 (getCompanySlug, loadCompanyDetail, renderCompanyDetail 함수 확인)

## 브라우저에서 테스트하기

### 1단계: HTTP 서버 시작
PowerShell에서 다음 명령 실행:
```powershell
cd "C:\01 클로드코드\10-22 팔란티어 비즈니스"
node server.js
```

### 2단계: 브라우저에서 열기
각 URL을 브라우저 주소창에 입력:

#### 메인 페이지
http://localhost:9000/

#### 회사 상세 페이지 (10개 모두 테스트 가능)
1. http://localhost:9000/pages/northslope.html
2. http://localhost:9000/pages/10x-partners.html
3. http://localhost:9000/pages/fourth-age.html
4. http://localhost:9000/pages/unit8.html
5. http://localhost:9000/pages/spr.html
6. http://localhost:9000/pages/rackspace.html
7. http://localhost:9000/pages/accenture-federal.html
8. http://localhost:9000/pages/pvm.html
9. http://localhost:9000/pages/bigbear.html
10. http://localhost:9000/pages/gallatin.html

### 3단계: 확인 항목

#### 메인 페이지 (index.html)
- [ ] 10개 회사 카드 표시
- [ ] 검색창 작동
- [ ] Priority 필터 작동
- [ ] 각 회사 카드 클릭 시 상세 페이지로 이동

#### 회사 상세 페이지 (northslope.html 등)
- [ ] 회사명, 유형, 태그라인 표시
- [ ] 회사 통계 카드 (6개) 표시
  - Priority
  - 핵심 강점 개수
  - 성공 사례 개수
  - 자료 개수
  - 본사 위치
  - 운영 지역 개수
- [ ] 기술 역량 배지 표시
- [ ] 주요 산업 배지 표시
- [ ] 각 섹션 내용 표시:
  - 회사 소개
  - 제공 솔루션 & 서비스
  - 핵심 강점
  - 차별화 포인트
  - 주요 대상 시장
  - 대표님 비즈니스에의 참고 가치
  - 성공 사례 & 컨설팅 프로젝트
  - 관련 자료 & 참고 문서
- [ ] 같은 Priority 그룹의 다른 회사 표시
- [ ] 이전/다음 회사 네비게이션 작동
- [ ] 공식 웹사이트 링크 작동
- [ ] 목록으로 돌아가기 링크 작동

### 4단계: 브라우저 콘솔 확인
브라우저의 개발자 도구(F12) → Console 탭:
- [DEBUG] Slug from URL: northslope
- [DEBUG] Fetching companies.json from: ../data/companies.json
- [DEBUG] Companies data loaded. Total: 10
- [RENDER] Starting to render company details
- [RENDER] Stats section rendered
- [RENDER] Case studies rendered: 2
- [RENDER] Resources rendered: 3
- 등등... (에러 메시지가 없어야 정상)

## 예상되는 렌더링 결과

### Northslope Technologies 페이지
**회사 통계:**
- Priority 1
- 핵심 강점: 4개
- 성공 사례: 2개
- 자료: 3개
- 본사: USA
- 운영 지역: 2개

**기술 역량:**
Foundry, AIP, Ontology, High Availability, Pipeline Engineering

**주요 산업:**
Finance, Defense, Government

**성공 사례:**
1. 금융 기관 Foundry 구축 및 운영 시스템 개발
2. 방위산업 정보 통합 플랫폼 구축

**관련 자료:**
1. Palantir Foundry 구현 Best Practices (Whitepaper)
2. 엔터프라이즈 데이터 아키텍처 설계 가이드 (Blog)
3. 고가용성 Foundry 운영 시스템 (Case Study)

## 문제 해결

### 콘텐츠가 표시되지 않으면?
1. 브라우저 새로고침 (Ctrl+F5)
2. 개발자 콘솔(F12)에서 [ERROR] 메시지 확인
3. Network 탭에서 companies.json 응답 상태 확인
4. 캐시 비우기

### 스타일이 이상하면?
1. CSS 파일 로드 확인 (Network 탭)
2. assets/css/style.css 파일 확인
3. 브라우저 캐시 비우기

### 이전/다음 네비게이션이 안 되면?
1. 현재 보는 회사의 ID 확인
2. companies.json에서 인접한 ID의 회사 존재 확인
3. detail.js의 page navigation 로직 확인

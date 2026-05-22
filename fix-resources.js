const fs = require('fs');

const companies = require('./data/companies.json');

// Update resources URLs to actual company websites
const updates = {
  'northslope': {
    resources: [
      { title: 'Palantir Foundry 구현 Best Practices', type: 'Whitepaper', url: 'https://www.northslope.com/', description: 'Northslope의 Foundry 구현 경험 및 모범 사례' },
      { title: '엔터프라이즈 데이터 아키텍처 설계 가이드', type: 'Blog', url: 'https://www.northslope.com/', description: 'Foundry 기반 데이터 아키텍처의 핵심 원칙' },
      { title: '고가용성 Foundry 운영 시스템', type: 'Case Study', url: 'https://www.northslope.com/', description: '금융·방위산업에서의 Foundry 운영 사례' }
    ]
  },
  '10x-partners': {
    resources: [
      { title: '빠른 배포 방법론 - Strategy to Operations in Weeks', type: 'Whitepaper', url: 'https://www.10x-partners.com/', description: '10x Partners의 4-8주 배포 프레임워크' },
      { title: 'AIP 기반 의사결정 시스템 구축 사례', type: 'Blog Series', url: 'https://www.10x-partners.com/', description: '실제 운영 중인 AIP 의사결정 시스템' },
      { title: 'Foundry 파이프라인 엔지니어링 마스터클래스', type: 'Webinar', url: 'https://www.10x-partners.com/', description: '데이터 파이프라인 설계부터 배포까지' }
    ]
  },
  'fourth-age': {
    resources: [
      { title: 'Forward Deployed Engineer 모델 백서', type: 'Whitepaper', url: 'https://www.fourthage.com/', description: 'FDE 방식의 원리와 성공 요인' },
      { title: '장기 디지털 전환을 위한 데이터 전략', type: 'Case Study', url: 'https://www.fourthage.com/', description: '18개월 FDE 배치를 통한 전환 여정' },
      { title: 'FDE 팀 배치의 ROI 측정 프레임워크', type: 'Blog', url: 'https://www.fourthage.com/', description: 'FDE 모델의 비용 효과성 측정 방법' },
      { title: '데이터 문화 정착 가이드', type: 'Video Series', url: 'https://www.fourthage.com/', description: '조직 변화와 데이터 문화 정착' }
    ]
  },
  'unit8': {
    resources: [
      { title: 'GDPR 준수 데이터 거버넌스 설계 가이드', type: 'Whitepaper', url: 'https://unit8.com/', description: 'Foundry 기반 규제 준수 데이터 아키텍처' },
      { title: '산업별 데이터 솔루션 - 제조, 금융, 헬스케어, 에너지', type: 'Product Brief', url: 'https://unit8.com/', description: 'Unit8의 산업별 맞춤형 데이터 솔루션' },
      { title: '유럽 기업의 디지털 전환 성공 사례', type: 'Case Study Series', url: 'https://unit8.com/', description: 'GDPR 규제 환경에서의 실제 성과' }
    ]
  },
  'spr': {
    resources: [
      { title: '정부급 보안 데이터 거버넌스 백서', type: 'Whitepaper', url: 'https://spr.com/', description: '정부·공공기관 데이터 보안의 핵심 요구사항' },
      { title: '규제 준수 데이터 아키텍처 설계', type: 'Technical Guide', url: 'https://spr.com/', description: '금융·공공기관의 규제 요구사항 구현' },
      { title: '대규모 데이터 마이그레이션 성공 사례', type: 'Case Study', url: 'https://spr.com/', description: '여러 기관·시스템의 데이터 통합' }
    ]
  },
  'rackspace': {
    resources: [
      { title: 'Managed Foundry 운영 모델', type: 'Datasheet', url: 'https://www.rackspace.com/', description: 'Rackspace의 관리형 Foundry/AIP 운영' },
      { title: '클라우드 기반 데이터 플랫폼 운영 가이드', type: 'Whitepaper', url: 'https://www.rackspace.com/', description: 'AWS, Azure, GCP 환경에서의 안정적 운영' },
      { title: 'SLA 기반 Foundry 운영 사례', type: 'Case Study', url: 'https://www.rackspace.com/', description: '99.99% 가용성을 보장하는 운영 성과' }
    ]
  },
  'accenture-federal': {
    resources: [
      { title: '공공기관 AI 도입 가이드', type: 'Report', url: 'https://www.accenturefederal.com/', description: '미 연방정부의 AI 도입 전략' },
      { title: '공무원 AI 교육 프로그램', type: 'Course', url: 'https://www.accenturefederal.com/', description: '공무원을 위한 AI 기본·심화 교육' },
      { title: '정부 부처 AI 혁신 사례집', type: 'Case Study Series', url: 'https://www.accenturefederal.com/', description: '미 연방정부의 AI 도입 성공 사례' }
    ]
  },
  'pvm': {
    resources: [
      { title: '온톨로지 설계 가이드 - 정보기관 사례', type: 'Technical Manual', url: 'https://www.pvmit.com/', description: 'PVM의 온톨로지 설계 방법론' },
      { title: '장기 운영 모델 - Foundry를 5년 이상 운영하기', type: 'Whitepaper', url: 'https://www.pvmit.com/', description: '정부 기관에서의 안정적 장기 운영 전략' },
      { title: '조사·정보분석 워크플로우 설계', type: 'Case Study', url: 'https://www.pvmit.com/', description: '법집행기관의 조사 프로세스 디지털화' }
    ]
  },
  'bigbear': {
    resources: [
      { title: 'Foundry 위에 AI 제품 구축하기', type: 'Tech Blog', url: 'https://bigbear.ai/', description: 'BigBear.ai의 AI 제품 개발 방식' },
      { title: '산업별 AI 솔루션 카탈로그', type: 'Product Catalog', url: 'https://bigbear.ai/', description: '방산, 물류, 에너지 분야의 AI 제품' },
      { title: '의사결정 AI 플랫폼 구축 가이드', type: 'Whitepaper', url: 'https://bigbear.ai/', description: 'AI 기반 의사결정 시스템 설계' }
    ]
  },
  'gallatin': {
    resources: [
      { title: 'Ontology SDK 기반 애플리케이션 개발 가이드', type: 'Developer Guide', url: 'https://www.gallatin.ai/', description: 'Gallatin AI의 Ontology SDK 활용 방식' },
      { title: '국방 온톨로지 설계 및 구현', type: 'Technical Document', url: 'https://www.gallatin.ai/', description: '작전 데이터를 온톨로지로 모델링' },
      { title: 'Foundry+Gallatin AI 통합 사례', type: 'Case Study', url: 'https://www.gallatin.ai/', description: '외부 애플리케이션을 Foundry와 통합' },
      { title: '실시간 의사결정 지원 시스템 아키텍처', type: 'Architecture Document', url: 'https://www.gallatin.ai/', description: '작전 환경에서의 실시간 의사결정 AI' }
    ]
  }
};

// Update companies with new resources
companies.forEach(company => {
  const update = updates[company.slug];
  if (update) {
    company.resources = update.resources;
    console.log(`✓ ${company.name}: ${update.resources.length}개 자료 URL 업데이트`);
  }
});

fs.writeFileSync('./data/companies.json', JSON.stringify(companies, null, 2), 'utf8');
console.log('\n✅ companies.json 업데이트 완료');

// Also update companies.js
const js = 'window.companiesData = ' + JSON.stringify(companies, null, 2) + ';';
fs.writeFileSync('./data/companies.js', js, 'utf8');
console.log('✅ companies.js 업데이트 완료');

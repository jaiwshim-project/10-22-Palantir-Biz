const fs = require('fs');
const companies = require('./data/companies.json');

// Real resources found through web search
const realResources = {
  'northslope': [
    { title: 'Vanguard Elite Partner Recognition', type: 'News', url: 'https://www.businesswire.com/news/home/20251204291274/en/Northslope-Signs-Large-Scale-Expansion-for-Deployment-of-Palantir-AI-FDE-and-Demonstrates-Accelerated-Growth-Palantir-Recognizes-Northslope-as-the-First-Partner-of-the-Vanguard-Elite', description: 'Palantir 공식 파트너 Elite 등급 인정' },
    { title: 'Privacy and Governance Whitepaper', type: 'Whitepaper', url: 'https://www.palantir.com/assets/xrfr7uokpv1b/6pey1VnYHULqeggNbPKqP0/9f577de3e3dfb9fc031bd75dc7526517/Palantir_Privacy_and_Governance_Whitepaper__1_.pdf', description: 'Palantir의 데이터 프라이버시 및 거버넌스 전략' },
    { title: 'Operational Complexity Whitepaper', type: 'Whitepaper', url: 'https://www.palantir.com/assets/xrfr7uokpv1b/5plfYze5aVCisYHuvLhDZ2/c6713af4b4c5fff5a73b5e1683302898/Palantir_Operational_Complexity_Whitepaper_FINAL.pdf', description: 'Foundry로 운영 복잡성 극복' }
  ],
  '10x-partners': [
    { title: '10x Partners About Page', type: 'Profile', url: 'https://10x-partners.com/about', description: 'ex-Palantirians 팀 구성 및 핵심 역량' },
    { title: 'How Palantir Enables Rapid Development', type: 'Blog', url: 'https://blog.palantir.com/how-palantir-enables-a-secure-rapid-software-development-environment-2f918b021568', description: 'Palantir 블로그 - 빠른 배포 방식' },
    { title: 'Privacy and Governance Whitepaper', type: 'Whitepaper', url: 'https://www.palantir.com/assets/xrfr7uokpv1b/6pey1VnYHULqeggNbPKqP0/9f577de3e3dfb9fc031bd75dc7526517/Palantir_Privacy_and_Governance_Whitepaper__1_.pdf', description: 'Palantir의 거버넌스 전략' }
  ],
  'fourth-age': [
    { title: 'What is a Forward Deployed Engineer?', type: 'Blog', url: 'https://fourthage.substack.com/p/what-is-a-forward-deployed-engineer', description: 'FDE 개념과 Fourth Age의 접근 방식' },
    { title: 'How to Build an FDE Team', type: 'Blog', url: 'https://fourthage.substack.com/p/how-to-build-an-fde-team', description: 'FDE 팀 구성 및 운영 전략' },
    { title: 'FDE Academy - Skills & Career', type: 'Educational Resource', url: 'https://fde.academy/', description: 'Forward Deployed Engineer 역할 및 교육' },
    { title: 'Privacy and Governance Whitepaper', type: 'Whitepaper', url: 'https://www.palantir.com/assets/xrfr7uokpv1b/6pey1VnYHULqeggNbPKqP0/9f577de3e3dfb9fc031bd75dc7526517/Palantir_Privacy_and_Governance_Whitepaper__1_.pdf', description: 'Palantir 거버넌스 가이드' }
  ],
  'unit8': [
    { title: 'Palantir Foundry Case Studies by Unit8', type: 'Case Study Series', url: 'https://unit8.com/resources/palantir-foundry-case-studies-by-unit8/', description: '65개+ 실제 Foundry 구현 사례' },
    { title: 'Palantir Foundry 101', type: 'Guide', url: 'https://unit8.com/resources/palantir-foundry-101-2/', description: 'Foundry 입문자를 위한 기초 가이드' },
    { title: 'Unit8 Palantir Services', type: 'Service Profile', url: 'https://unit8.com/services/palantir-foundry-services/', description: 'Unit8의 Foundry 전문 서비스' }
  ],
  'spr': [
    { title: 'Palantir Security Overview', type: 'Technical Guide', url: 'https://www.palantir.com/docs/foundry/security/overview', description: 'FedRAMP 및 연방 보안 표준' },
    { title: 'Privacy and Governance Whitepaper', type: 'Whitepaper', url: 'https://www.palantir.com/assets/xrfr7uokpv1b/6pey1VnYHULqeggNbPKqP0/9f577de3e3dfb9fc031bd75dc7526517/Palantir_Privacy_and_Governance_Whitepaper__1_.pdf', description: '정부급 데이터 거버넌스' },
    { title: 'SPR Company Profile', type: 'Profile', url: 'https://www.spr.com/', description: 'SPR의 정부급 보안 역량' }
  ],
  'rackspace': [
    { title: 'Rackspace & Palantir Partnership', type: 'Partnership Announcement', url: 'https://www.rackspace.com/newsroom/strategic-partnership-palantir', description: 'Foundry/AIP 관리형 운영 서비스' },
    { title: 'Rackspace IR Release', type: 'Official Release', url: 'https://ir.rackspace.com/news-releases/news-release-details/rackspace-and-palantir-partner-run-foundry-and-aip-production', description: '프로덕션급 Foundry 관리형 운영' },
    { title: 'Privacy and Governance Whitepaper', type: 'Whitepaper', url: 'https://www.palantir.com/assets/xrfr7uokpv1b/6pey1VnYHULqeggNbPKqP0/9f577de3e3dfb9fc031bd75dc7526517/Palantir_Privacy_and_Governance_Whitepaper__1_.pdf', description: '클라우드 거버넌스 가이드' }
  ],
  'accenture-federal': [
    { title: 'Accenture & Palantir Strategic Partnership', type: 'Partnership Announcement', url: 'https://newsroom.accenture.com/news/2025/palantir-and-accenture-federal-services-join-forces-to-help-federal-government-agencies-reinvent-operations-with-ai', description: '미 연방정부 AI 현대화 파트너십' },
    { title: 'Accenture + Palantir Services', type: 'Service Profile', url: 'https://www.accenture.com/us-en/services/ecosystem-partners/palantir', description: 'Accenture Federal의 Palantir 역량' },
    { title: 'Privacy and Governance Whitepaper', type: 'Whitepaper', url: 'https://www.palantir.com/assets/xrfr7uokpv1b/6pey1VnYHULqeggNbPKqP0/9f577de3e3dfb9fc031bd75dc7526517/Palantir_Privacy_and_Governance_Whitepaper__1_.pdf', description: '공공기관 거버넌스' }
  ],
  'pvm': [
    { title: 'Understanding the Palantir Ontology', type: 'Blog', url: 'https://blog.pvmit.com/pvm-blog/palantir-ontology', description: 'Palantir 온톨로지 개념 설명' },
    { title: 'PVM Foundry Services', type: 'Service Profile', url: 'https://www.pvmit.com/services/palantir-foundry-services', description: 'PVM의 Foundry 구현 및 운영' },
    { title: 'POL-INTEL: Law Enforcement Ontology', type: 'Academic Case Study', url: 'https://www.tandfonline.com/doi/full/10.1080/1369118X.2024.2410255', description: '덴마크 경찰청의 Palantir 온톨로지 실제 운영 사례' }
  ],
  'bigbear': [
    { title: 'BigBear.ai & Palantir Partnership', type: 'Partnership Announcement', url: 'https://bigbear.ai/newsroom/bigbear-ai-and-palantir-announce-strategic-partnership-combining-ai-powered-products-with-next-generation-operating-platform/', description: 'AI 제품과 Foundry 통합' },
    { title: 'BigBear.ai Solutions', type: 'Product Catalog', url: 'https://bigbear.ai/solutions/', description: '의사결정 AI 솔루션' },
    { title: 'About BigBear.ai', type: 'Company Profile', url: 'https://bigbear.ai/about/', description: 'BigBear.ai의 기술 및 미션' }
  ],
  'gallatin': [
    { title: 'Gallatin AI Platform', type: 'Product Brief', url: 'https://www.gallatin.ai/', description: '국방 작전 지원 AI 플랫폼' },
    { title: 'Palantir Security Overview', type: 'Technical Guide', url: 'https://www.palantir.com/docs/foundry/security/overview', description: 'Foundry 보안 & 온톨로지 아키텍처' },
    { title: 'Privacy and Governance Whitepaper', type: 'Whitepaper', url: 'https://www.palantir.com/assets/xrfr7uokpv1b/6pey1VnYHULqeggNbPKqP0/9f577de3e3dfb9fc031bd75dc7526517/Palantir_Privacy_and_Governance_Whitepaper__1_.pdf', description: 'Palantir 보안 및 거버넌스' }
  ]
};

companies.forEach(company => {
  if (realResources[company.slug]) {
    company.resources = realResources[company.slug];
  }
});

fs.writeFileSync('./data/companies.json', JSON.stringify(companies, null, 2), 'utf8');
const js = 'window.companiesData = ' + JSON.stringify(companies, null, 2) + ';';
fs.writeFileSync('./data/companies.js', js, 'utf8');

console.log('✅ 모든 회사 자료 링크를 실제 URL로 업데이트 완료!\n');
companies.forEach(c => {
  console.log(`${c.name}: ${c.resources.length}개 자료`);
});

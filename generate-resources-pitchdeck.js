const fs = require('fs');
const companies = JSON.parse(fs.readFileSync('./data/companies.json', 'utf8'));

// 모든 자료 추출
const resources = [];
companies.forEach(company => {
  company.resources.forEach((resource, idx) => {
    resources.push({
      companyId: company.id,
      companyName: company.name,
      companySlug: company.slug,
      resourceIdx: idx + 1,
      resourceTitle: resource.title,
      resourceType: resource.type,
      resourceDescription: resource.description,
      resourceUrl: resource.url,
      companyType: company.type,
      companyTagline: company.tagline,
      companyWhatTheyDo: company.whatTheyDo,
      companySolutions: company.solutions || [],
      companyStrengths: company.strengths || [],
      companyDifferentiation: company.differentiation,
      companySkills: company.skills || [],
      companyIndustries: company.industries || [],
      caseStudies: company.caseStudies || []
    });
  });
});

// 10장짜리 슬라이드 생성
function generateSlides(resource) {
  const typeDescriptions = {
    'News': '산업 뉴스 및 공식 발표',
    'Whitepaper': '깊이 있는 기술 문서',
    'Blog': '실무 기반의 인사이트',
    'Profile': '조직 및 역량 소개',
    'Case Study Series': '실제 구현 사례',
    'Guide': '입문자 가이드',
    'Service Profile': '서비스 제공 능력',
    'Partnership Announcement': '전략적 파트너십',
    'Educational Resource': '교육 및 학습 자료',
    'Product Brief': '제품 소개',
    'Product Catalog': '제품 카탈로그',
    'Company Profile': '회사 소개',
    'Academic Case Study': '학술 기반 사례',
    'Official Release': '공식 발표문',
    'Technical Guide': '기술 가이드'
  };

  const slides = [];

  // Slide 1: 자료 정보
  slides.push(`<div class="slide-container" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"><div class="slide-content"><h1>${resource.resourceTitle}</h1><p class="subtitle">${resource.companyName}</p><div style="margin-top: 3rem; display: flex; gap: 2rem; flex-wrap: wrap;"><div><strong>유형:</strong> ${resource.resourceType}</div><div><strong>출처:</strong> ${resource.companyName}</div></div><p style="margin-top: 2rem; font-size: 1.2rem; opacity: 0.9;">${resource.resourceDescription}</p></div></div>`);

  // Slide 2: 회사 개요
  slides.push(`<div class="slide-container" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"><div class="slide-content"><h2>${resource.companyName}</h2><p class="subtitle">${resource.companyTagline}</p><h3 style="color: white; margin-top: 2rem;">회사 개요</h3><p style="color: rgba(255,255,255,0.95);">${resource.companyWhatTheyDo}</p><h3 style="color: white; margin-top: 2rem;">핵심 강점</h3><ul style="color: rgba(255,255,255,0.95);">${resource.companyStrengths.slice(0, 3).map(s => `<li>${s}</li>`).join('')}</ul></div></div>`);

  // Slide 3: 자료 핵심 내용
  slides.push(`<div class="slide-container" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);"><div class="slide-content"><h2>이 자료의 핵심</h2><p class="subtitle">${resource.resourceTitle}</p><h3 style="color: white; margin-top: 2rem;">자료 유형: ${resource.resourceType}</h3><p style="color: rgba(255,255,255,0.95);">${typeDescriptions[resource.resourceType] || '핵심 문서'}</p><h3 style="color: white; margin-top: 2rem;">주요 내용</h3><ul style="color: rgba(255,255,255,0.95);"><li>${resource.resourceDescription}</li><li>${resource.companyName}의 ${resource.resourceType.toLowerCase()} 자료</li><li>Palantir Foundry/AIP 기반 비즈니스 모델 이해</li></ul></div></div>`);

  // Slide 4: 자료 타입별 인사이트
  slides.push(`<div class="slide-container" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: #333;"><div class="slide-content"><h2 style="color: #333;">자료 타입별 가치</h2><p class="subtitle" style="color: #555;">${resource.resourceType}</p><h3 style="color: #333; margin-top: 2rem;">이 자료로부터 배울 수 있는 것</h3><ul style="color: #2a2a2a;"><li><strong>기술:</strong> ${resource.companySkills.slice(0, 2).join(', ')}</li><li><strong>산업:</strong> ${resource.companyIndustries.join(', ')}</li><li><strong>차별화:</strong> ${resource.companyDifferentiation}</li></ul><h3 style="color: #333; margin-top: 2rem;">핵심 메시지</h3><p style="color: #2a2a2a; font-size: 1.2rem; font-weight: 600;">"${resource.companyName}의 ${resource.resourceType}로부터 우리는 Palantir 방식의 실행 방법론을 배운다"</p></div></div>`);

  // Slide 5: 실제 사례 활용
  const caseStudySlide = resource.caseStudies.length > 0
    ? `<h3 style="color: #333; margin-top: 2rem;">${resource.caseStudies[0].title}</h3><p style="color: #2a2a2a;"><strong>산업:</strong> ${resource.caseStudies[0].industry}</p><p style="color: #2a2a2a;"><strong>기간:</strong> ${resource.caseStudies[0].duration}</p><h4 style="color: #333; margin-top: 1rem;">결과</h4><p style="color: #2a2a2a;">${resource.caseStudies[0].result}</p>`
    : `<p style="color: #2a2a2a;">이 자료가 다루는 산업 영역에서의 실제 구현 사례를 통해 이론을 실무에 적용하는 방법을 학습할 수 있습니다.</p>`;

  slides.push(`<div class="slide-container" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333;"><div class="slide-content"><h2 style="color: #333;">실제 적용 사례</h2>${caseStudySlide}</div></div>`);

  // Slide 6: 대표님 비즈니스 적용
  slides.push(`<div class="slide-container" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"><div class="slide-content"><h2>SB 비즈니스 적용 가치</h2><p class="subtitle">Forward-Deployed AX Consulting</p><div style="background: rgba(255,255,255,0.12); padding: 1.5rem; border-radius: 10px; margin-top: 2rem; border-left: 4px solid #d4af37;"><h3 style="color: white;">어떻게 활용할 수 있는가?</h3><ul style="color: rgba(255,255,255,0.95); margin-top: 1rem;"><li>${resource.companyName}의 접근 방식을 한국형 AX 모델로 재해석</li><li>${resource.resourceType} 형태의 자료 생성 전략 수립</li><li>고객 제안서 및 교육 자료로 재활용 가능</li><li>산업별 AX 솔루션 개발 시 참고 모델</li></ul></div></div></div>`);

  // Slide 7: 기술 스택
  slides.push(`<div class="slide-container" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"><div class="slide-content"><h2>기술 스택 & 역량</h2><p class="subtitle">${resource.companyName}의 핵심 역량</p><h3 style="color: white; margin-top: 2rem;">주요 기술</h3><div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">${resource.companySkills.map(skill => `<div style="background: rgba(255,255,255,0.2); padding: 0.5rem 1rem; border-radius: 20px; color: white; font-weight: 600;">${skill}</div>`).join('')}</div><h3 style="color: white; margin-top: 2rem;">산업별 적용</h3><div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">${resource.companyIndustries.map(ind => `<div style="background: rgba(255,255,255,0.15); padding: 0.5rem 1rem; border-radius: 5px; color: rgba(255,255,255,0.95);">${ind}</div>`).join('')}</div></div></div>`);

  // Slide 8: 경쟁 포지셔닝
  slides.push(`<div class="slide-container" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: #333;"><div class="slide-content"><h2 style="color: #333;">시장 포지셔닝</h2><h3 style="color: #333; margin-top: 2rem;">차별화 포인트</h3><div style="background: rgba(255,255,255,0.3); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #fa709a;"><p style="color: #1a1a1a; font-size: 1.2rem;">${resource.companyDifferentiation}</p></div><h3 style="color: #333; margin-top: 2rem;">SB와의 비교</h3><ul style="color: #2a2a2a;"><li><strong>유사점:</strong> Palantir 기반 AX 솔루션 제공</li><li><strong>차별점:</strong> 한국형 산업별 맞춤형 접근</li><li><strong>경쟁력:</strong> FDE 문화 + 온톨로지 설계 + 실행 속도</li></ul></div></div>`);

  // Slide 9: 성과 메트릭
  const metricsSlide = resource.caseStudies.length > 0
    ? `<h3 style="color: #333; margin-top: 2rem;">핵심 성과</h3><ul style="color: #2a2a2a;">${resource.caseStudies.slice(0, 2).map(cs => `<li><strong>${cs.title}:</strong> ${cs.result}</li>`).join('')}</ul>`
    : `<h3 style="color: #333; margin-top: 2rem;">이 자료의 가치</h3><ul style="color: #2a2a2a;"><li>Palantir 기반 비즈니스 모델의 검증된 접근 방식</li><li>실제 구현 경험에서 나온 베스트 프랙티스</li><li>한국 시장 적용을 위한 벤치마킹 포인트</li></ul>`;

  slides.push(`<div class="slide-container" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333;"><div class="slide-content"><h2 style="color: #333;">성과 & 메트릭</h2><p class="subtitle" style="color: #555;">${resource.companyName}의 증명된 성과</p>${metricsSlide}</div></div>`);

  // Slide 10: 다음 액션
  slides.push(`<div class="slide-container" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"><div class="slide-content"><h2>다음 단계</h2><p class="subtitle">이 자료로부터 배운 것을 실행으로</p><h3 style="color: white; margin-top: 2rem;">즉시 액션</h3><ul style="color: rgba(255,255,255,0.95);"><li>원본 자료 정독 및 분석</li><li>${resource.companyName}의 접근 방식 이해</li><li>한국 시장 맥락에서 재해석</li></ul><h3 style="color: white; margin-top: 2rem;">중기 계획</h3><ul style="color: rgba(255,255,255,0.95);"><li>고객 제안서에 사례 활용</li><li>내부 교육 자료 개발</li><li>산업별 AX 솔루션 설계</li></ul><div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 2rem; border-left: 3px solid #d4af37;"><p style="color: #d4af37;">원본 자료 링크: <a href="${resource.resourceUrl}" target="_blank" style="color: #d4af37; text-decoration: underline;">자료 보기</a></p></div></div></div>`);

  return slides;
}

// 모든 슬라이드 생성
let allSlides = [];
resources.forEach((resource) => {
  const slides = generateSlides(resource);
  allSlides = allSlides.concat(slides);
});

console.log(`총 ${allSlides.length}개 슬라이드 생성 완료 (${resources.length}개 자료 × 10장)`);

// HTML 작성
const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>자료별 분석 피치덱 - Palantir Ecosystem</title>
  <style>
    :root {
      --primary: #5642a6;
      --accent: #d4af37;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; }
    .slide-container { display: none; width: 100%; height: 100vh; padding: 4rem; color: white; position: relative; overflow-y: auto; }
    .slide-container.active { display: flex; flex-direction: column; justify-content: center; }
    .slide-content { max-width: 1200px; margin: 0 auto; width: 100%; }
    h1 { font-size: 3.5rem; margin-bottom: 1rem; font-weight: 700; opacity: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.15); }
    h2 { font-size: 2.8rem; margin-bottom: 1.5rem; font-weight: 700; opacity: 0.98; text-shadow: 0 2px 4px rgba(0,0,0,0.12); }
    h3 { font-size: 1.8rem; margin: 1rem 0 0.5rem; font-weight: 600; opacity: 0.97; }
    h4 { font-weight: 600; opacity: 0.98; }
    p { font-size: 1.3rem; line-height: 1.8; margin-bottom: 1rem; opacity: 0.95; }
    ul { margin: 1rem 0 1rem 2rem; }
    li { font-size: 1.2rem; line-height: 1.7; margin-bottom: 0.8rem; opacity: 0.95; }
    .subtitle { font-size: 1.5rem; opacity: 0.96; margin-bottom: 2rem; }
    .controls { position: fixed; bottom: 2rem; right: 2rem; gap: 1rem; display: flex; z-index: 100; }
    button { padding: 0.8rem 1.5rem; font-size: 1rem; border: none; border-radius: 8px; background: white; color: var(--primary); cursor: pointer; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    button:hover { background: #f8f8f8; transform: translateY(-2px); }
    .slide-number { position: fixed; bottom: 2rem; left: 2rem; font-size: 1.2rem; color: white; opacity: 0.9; font-weight: 600; }
  </style>
</head>
<body>

${allSlides.join('\n')}

<div class="slide-number"><span id="current-slide">1</span> / ${allSlides.length}</div>
<div class="controls">
  <button onclick="previousSlide()">← 이전</button>
  <button onclick="nextSlide()">다음 →</button>
  <button onclick="goToHome()">🏠 홈으로</button>
</div>

<script>
  let currentSlide = 1;

  function showSlide(n) {
    const slides = document.querySelectorAll('.slide-container');
    if (n > slides.length) currentSlide = slides.length;
    if (n < 1) currentSlide = 1;
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide - 1].classList.add('active');
    document.getElementById('current-slide').textContent = currentSlide;
  }

  function nextSlide() { currentSlide++; showSlide(currentSlide); }
  function previousSlide() { currentSlide--; showSlide(currentSlide); }
  function goToHome() { window.location.href = '../index.html'; }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
  });

  const params = new URLSearchParams(window.location.search);
  const slideParam = params.get('slide');
  if (slideParam && !isNaN(slideParam)) {
    currentSlide = parseInt(slideParam);
  }

  showSlide(currentSlide);
</script>
</body>
</html>`;

fs.writeFileSync('./resources-analysis.html', html, 'utf8');
console.log('✅ resources-analysis.html 생성 완료');
console.log(`   - ${resources.length}개 자료`);
console.log(`   - ${allSlides.length}개 슬라이드`);

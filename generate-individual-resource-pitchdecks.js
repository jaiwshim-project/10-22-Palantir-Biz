const fs = require('fs');
const path = require('path');
const companies = require('./data/companies.json');

// Helper to sanitize filename from resource title
function sanitizeFilename(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 40);
}

// Generate 10 slides of content for a resource
function generateResourceSlides(company, resource, resourceIndex) {
  const slides = [
    // Slide 1: Resource Title & Overview
    `
    <div class="slide slide-1">
      <div class="slide-content">
        <h1>${resource.title}</h1>
        <p class="slide-subtitle">${company.name}</p>
        <div class="slide-meta">
          <span class="badge">${resource.type}</span>
          <span class="badge">${company.type}</span>
        </div>
        <p class="slide-description" style="margin-top: 2rem; font-size: 1.1rem; color: rgba(255,255,255,0.9);">
          ${resource.description}
        </p>
      </div>
    </div>
    `,
    // Slide 2: Company Overview
    `
    <div class="slide slide-2">
      <div class="slide-content">
        <h2>${company.name} - 회사 개요</h2>
        <div class="two-column">
          <div>
            <h4>📊 기본 정보</h4>
            <ul>
              <li><strong>타입:</strong> ${company.type}</li>
              <li><strong>본사:</strong> ${company.company_info.headquarters}</li>
              <li><strong>설립:</strong> ${company.company_info.founded}</li>
              <li><strong>규모:</strong> ${company.company_info.employees}</li>
              <li><strong>운영 지역:</strong> ${company.company_info.regions.join(', ')}</li>
            </ul>
          </div>
          <div>
            <h4>🎯 핵심 강점</h4>
            <ul>
              ${company.strengths.slice(0, 4).map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
        </div>
        <p style="margin-top: 2rem; color: rgba(255,255,255,0.85);">
          <strong>Priority:</strong> ${company.priority === 1 ? '⭐ 최우선 벤치마킹 대상' : company.priority === 2 ? '⭐⭐ 중요 참고' : '⭐⭐⭐ 미래 전략'}
        </p>
      </div>
    </div>
    `,
    // Slide 3: Resource Deep Dive
    `
    <div class="slide slide-3">
      <div class="slide-content">
        <h2>📚 자료의 핵심 가치</h2>
        <div class="highlight-box" style="background: rgba(212, 175, 55, 0.1); border: 2px solid #d4af37;">
          <h4>🔍 이 자료에서 배울 점</h4>
          <ul style="font-size: 1.1rem; line-height: 1.8;">
            <li>${company.name}의 ${resource.type} 형태로 공개된 ${resource.title}</li>
            <li>${company.strengths[0]}</li>
            <li>${company.solutions[0]} 관련 인사이트</li>
            <li>Palantir 생태계에서의 역할과 포지셔닝</li>
            <li>실제 구현 사례와 lessons learned</li>
          </ul>
        </div>
      </div>
    </div>
    `,
    // Slide 4: Insights from This Resource
    `
    <div class="slide slide-4">
      <div class="slide-content">
        <h2>💡 이 자료가 주는 전략적 인사이트</h2>
        <div class="cards-grid">
          <div class="card">
            <h4>🎯 비즈니스 모델</h4>
            <p>${company.differentiation}</p>
          </div>
          <div class="card">
            <h4>🔧 기술 방향</h4>
            <p>${company.skills.slice(0, 3).join(' → ')}</p>
          </div>
          <div class="card">
            <h4>📈 시장 포지셔닝</h4>
            <p>Target: ${company.targetMarket}</p>
          </div>
          <div class="card">
            <h4>🌍 산업 범위</h4>
            <p>${company.industries.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
    `,
    // Slide 5: Real Application Cases
    `
    <div class="slide slide-5">
      <div class="slide-content">
        <h2>✅ 이 전략이 작동한 실제 사례</h2>
        ${company.caseStudies.slice(0, 1).map(cs => `
          <div class="case-study-box">
            <h4>📌 ${cs.title}</h4>
            <div class="case-detail">
              <p><strong>산업:</strong> ${cs.industry}</p>
              <p><strong>도전 과제:</strong> ${cs.challenge}</p>
              <p><strong>솔루션:</strong> ${cs.solution.substring(0, 150)}...</p>
              <p><strong>결과:</strong> ${cs.result}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    `,
    // Slide 6: Business Application Value for SB
    `
    <div class="slide slide-6">
      <div class="slide-content">
        <h2>💰 대표님 비즈니스에의 가치</h2>
        <div class="highlight-box" style="background: linear-gradient(135deg, rgba(86, 66, 166, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%); border: 2px solid var(--primary);">
          <h4 style="color: #d4af37;">🎁 직접 활용 가능한 인사이트</h4>
          <ul style="font-size: 1rem; line-height: 1.7;">
            <li><strong>비즈니스 구조:</strong> ${company.differentiation.substring(0, 80)}...</li>
            <li><strong>고객 확대:</strong> ${company.targetMarket} 대상 접근 전략</li>
            <li><strong>서비스 모델:</strong> ${company.solutions[0]} 방식 벤치마킹</li>
            <li><strong>ROI 메시지:</strong> ${company.strengths[1]}</li>
            <li><strong>참고 가치:</strong> ${company.relevanceToSB}</li>
          </ul>
        </div>
      </div>
    </div>
    `,
    // Slide 7: Technology & Skills Demonstrated
    `
    <div class="slide slide-7">
      <div class="slide-content">
        <h2>🔧 기술 역량 & 스킬 매핑</h2>
        <div class="two-column">
          <div>
            <h4>핵심 기술</h4>
            <div class="skills-grid">
              ${company.skills.map(skill => `
                <span class="skill-tag">${skill}</span>
              `).join('')}
            </div>
          </div>
          <div>
            <h4>적용 산업</h4>
            <div class="skills-grid">
              ${company.industries.map(industry => `
                <span class="industry-tag">${industry}</span>
              `).join('')}
            </div>
          </div>
        </div>
        <p style="margin-top: 1.5rem; color: rgba(255,255,255,0.85);">
          이 기술 스택은 <strong>AX Ontology OS</strong> 개발에 직접 참고할 수 있는 기술 조합입니다.
        </p>
      </div>
    </div>
    `,
    // Slide 8: Market Positioning
    `
    <div class="slide slide-8">
      <div class="slide-content">
        <h2>🎯 시장 포지셔닝 & 경쟁 배치</h2>
        <div class="positioning-box">
          <h4>${company.name}의 위치</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1.5rem;">
            <div>
              <p><strong>Target Market</strong></p>
              <p style="font-size: 1.1rem; color: #d4af37;">${company.targetMarket}</p>
            </div>
            <div>
              <p><strong>Differentiation</strong></p>
              <p style="font-size: 1rem;">${company.differentiation}</p>
            </div>
          </div>
          <p style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(212, 175, 55, 0.3); color: rgba(255,255,255,0.85);">
            <strong>한국 시장 포지셔닝:</strong> 대표님의 AX 플랫폼은 이들의 강점을 통합하면서도 한국 맞춤형 산업 솔루션에 집중할 수 있음.
          </p>
        </div>
      </div>
    </div>
    `,
    // Slide 9: Key Achievements & Metrics
    `
    <div class="slide slide-9">
      <div class="slide-content">
        <h2>📊 주요 성과 & 메트릭</h2>
        ${company.caseStudies.map((cs, idx) => `
          <div class="metric-box">
            <h4>${idx + 1}. ${cs.title}</h4>
            <div class="metrics">
              <div class="metric">
                <span class="metric-value">${cs.result.split(',')[0]}</span>
              </div>
            </div>
            <p style="margin-top: 0.5rem; font-size: 0.95rem; color: rgba(255,255,255,0.8);">
              ${cs.result}
            </p>
          </div>
        `).join('')}
      </div>
    </div>
    `,
    // Slide 10: Next Action Steps
    `
    <div class="slide slide-10 final-slide">
      <div class="slide-content" style="text-align: center;">
        <h2>🚀 다음 액션 스텝</h2>
        <div class="action-steps">
          <div class="action-step">
            <h4>1️⃣ Deep Dive</h4>
            <p>원본 자료 읽기:<br><a href="${resource.url}" target="_blank" style="color: #d4af37; text-decoration: underline;">${resource.title}</a></p>
          </div>
          <div class="action-step">
            <h4>2️⃣ Analysis</h4>
            <p>${company.name}의<br>기술 방식 분석</p>
          </div>
          <div class="action-step">
            <h4>3️⃣ Adaptation</h4>
            <p>AX 플랫폼에<br>적용 전략 수립</p>
          </div>
          <div class="action-step">
            <h4>4️⃣ Pitch</h4>
            <p>고객 제안서에<br>사례 활용</p>
          </div>
        </div>
        <p style="margin-top: 3rem; color: rgba(212, 175, 55, 0.9); font-size: 0.95rem;">
          ← 이전 회사 목록 | <a href="../index.html" style="color: #d4af37;">홈으로 돌아가기</a>
        </p>
      </div>
    </div>
    `
  ];

  return slides;
}

// Generate HTML for a resource pitchdeck
function generateResourcePitchdeckHTML(company, resource, resourceIndex) {
  const slides = generateResourceSlides(company, resource, resourceIndex);
  const filename = sanitizeFilename(resource.title);

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resource.title} - ${company.name}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary: #5642a6;
      --accent: #d4af37;
      --bg-base: #ffffff;
      --bg-surface: #fafafa;
      --bg-secondary: #f3f4f6;
      --bg-tertiary: #e5e7eb;
      --text-primary: rgba(0, 0, 0, 1);
      --text-secondary: rgba(0, 0, 0, 0.8);
      --text-tertiary: rgba(0, 0, 0, 0.6);
      --border: #d1d5db;
    }

    html, body {
      width: 100%;
      height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #ffffff;
      overflow: hidden;
    }

    .pitchdeck-container {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #0f3460 0%, #16213e 50%, #0f3460 100%);
    }

    .slides-viewer {
      flex: 1;
      display: flex;
      overflow: hidden;
      position: relative;
    }

    .slide {
      width: 100%;
      height: 100%;
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 4rem;
      background: linear-gradient(135deg, rgba(15, 52, 96, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%);
      position: absolute;
      top: 0;
      left: 0;
      animation: fadeIn 0.5s ease-in-out;
    }

    .slide.active {
      display: flex;
      z-index: 10;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .slide-content {
      max-width: 1000px;
      width: 100%;
      z-index: 2;
      position: relative;
    }

    .slide h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #d4af37 0%, #f0e68c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }

    .slide h2 {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #d4af37 0%, #f0e68c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .slide h3 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #d4af37;
    }

    .slide h4 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
      color: #f0e68c;
    }

    .slide-subtitle {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 1rem;
    }

    .slide-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%);
      border: 1px solid #d4af37;
      border-radius: 20px;
      font-size: 0.9rem;
      color: #f0e68c;
      font-weight: 500;
    }

    .slide-description {
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.7;
    }

    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 1rem;
    }

    .two-column > div {
      padding: 1.5rem;
      background: rgba(86, 66, 166, 0.1);
      border-left: 3px solid #d4af37;
      border-radius: 8px;
    }

    .two-column h4 {
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .two-column ul {
      list-style: none;
      padding: 0;
    }

    .two-column li {
      padding: 0.5rem 0;
      color: rgba(255, 255, 255, 0.85);
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
    }

    .two-column li:last-child {
      border-bottom: none;
    }

    .highlight-box {
      padding: 2rem;
      background: linear-gradient(135deg, rgba(86, 66, 166, 0.15) 0%, rgba(86, 66, 166, 0.05) 100%);
      border-left: 4px solid #d4af37;
      border-radius: 8px;
      margin: 1rem 0;
    }

    .highlight-box ul {
      list-style: none;
      padding: 0;
    }

    .highlight-box li {
      padding: 0.6rem 0;
      color: rgba(255, 255, 255, 0.9);
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin: 1rem 0;
    }

    .card {
      padding: 1.5rem;
      background: rgba(212, 175, 55, 0.08);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .card:hover {
      background: rgba(212, 175, 55, 0.12);
      border-color: #d4af37;
    }

    .card h4 {
      font-size: 1.2rem;
      margin-bottom: 0.8rem;
    }

    .card p {
      color: rgba(255, 255, 255, 0.85);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    .case-study-box {
      padding: 1.5rem;
      background: rgba(86, 66, 166, 0.1);
      border-left: 4px solid #d4af37;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .case-study-box h4 {
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .case-detail {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.8;
    }

    .case-detail p {
      margin-bottom: 0.8rem;
      font-size: 0.95rem;
    }

    .case-detail strong {
      color: #f0e68c;
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      margin: 1rem 0;
    }

    .skill-tag, .industry-tag {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%);
      border: 1px solid #d4af37;
      border-radius: 20px;
      font-size: 0.85rem;
      color: #f0e68c;
      font-weight: 500;
    }

    .positioning-box {
      padding: 2rem;
      background: linear-gradient(135deg, rgba(86, 66, 166, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);
      border: 2px solid #d4af37;
      border-radius: 8px;
    }

    .metric-box {
      padding: 1.5rem;
      background: rgba(212, 175, 55, 0.08);
      border-left: 4px solid #d4af37;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .metric-box h4 {
      margin-bottom: 0.8rem;
      font-size: 1.1rem;
    }

    .metrics {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
    }

    .metric {
      flex: 1;
      text-align: center;
      padding: 1rem;
      background: rgba(212, 175, 55, 0.1);
      border-radius: 8px;
    }

    .metric-value {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: #d4af37;
      margin-bottom: 0.5rem;
    }

    .action-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .action-step {
      padding: 1.5rem;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(86, 66, 166, 0.1) 100%);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 8px;
      text-align: center;
    }

    .action-step h4 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }

    .action-step p {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.6;
    }

    .final-slide {
      justify-content: flex-start;
      padding-top: 2rem;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(212, 175, 55, 0.2);
    }

    .controls button {
      padding: 0.6rem 1.5rem;
      background: linear-gradient(135deg, #5642a6 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .controls button:hover {
      background: linear-gradient(135deg, #764ba2 0%, #5642a6 100%);
      transform: translateY(-2px);
    }

    .slide-counter {
      color: rgba(255, 255, 255, 0.8);
      font-weight: 600;
      font-size: 1.1rem;
    }

    .home-link {
      color: #d4af37;
      text-decoration: none;
      font-weight: 600;
      padding: 0.6rem 1.5rem;
      border: 1px solid #d4af37;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .home-link:hover {
      background: rgba(212, 175, 55, 0.1);
    }

    @media (max-width: 768px) {
      .slide {
        padding: 2rem;
      }

      .slide h1 {
        font-size: 2.5rem;
      }

      .slide h2 {
        font-size: 2rem;
      }

      .two-column {
        grid-template-columns: 1fr;
      }

      .cards-grid {
        grid-template-columns: 1fr;
      }

      .action-steps {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .slide {
        padding: 1.5rem;
      }

      .slide h1 {
        font-size: 1.8rem;
      }

      .slide h2 {
        font-size: 1.5rem;
      }

      .action-steps {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="pitchdeck-container">
    <div class="slides-viewer">
      ${slides.join('')}
    </div>

    <div class="controls">
      <button onclick="previousSlide()">← 이전</button>
      <span class="slide-counter"><span id="current">1</span> / 10</span>
      <button onclick="nextSlide()">다음 →</button>
      <a href="../index.html" class="home-link">🏠 홈</a>
    </div>
  </div>

  <script>
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
      document.getElementById('current').textContent = index + 1;
    }

    function nextSlide() {
      currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
      showSlide(currentSlideIndex);
    }

    function previousSlide() {
      currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
      showSlide(currentSlideIndex);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') previousSlide();
    });

    // URL parameter navigation
    const urlParams = new URLSearchParams(window.location.search);
    const slideParam = urlParams.get('slide');
    if (slideParam) {
      currentSlideIndex = Math.max(0, Math.min(parseInt(slideParam) - 1, totalSlides - 1));
    }

    showSlide(currentSlideIndex);
  </script>
</body>
</html>`;

  return { filename, html };
}

// Main: Generate all 31 individual resource pitchdecks
const pitchdeckDir = './';
let generatedCount = 0;
const generatedFiles = [];

companies.forEach(company => {
  company.resources.forEach((resource, resourceIndex) => {
    const { filename, html } = generateResourcePitchdeckHTML(company, resource, resourceIndex);
    const filenameWithCompany = `${company.slug}-${filename}.html`;
    const filePath = path.join(pitchdeckDir, filenameWithCompany);

    fs.writeFileSync(filePath, html, 'utf8');
    generatedFiles.push(filenameWithCompany);
    generatedCount++;

    console.log(`✅ 생성됨: ${filenameWithCompany}`);
  });
});

console.log(`\n🎉 완료! 총 ${generatedCount}개의 자료별 개별 피치덱이 생성되었습니다.\n`);
console.log('생성된 파일:');
generatedFiles.forEach(f => console.log(`  - ${f}`));

// Create index file mapping all resources to their pitchdecks
const indexMapping = {};
companies.forEach(company => {
  indexMapping[company.slug] = company.resources.map((resource, idx) => {
    const filename = sanitizeFilename(resource.title);
    return {
      title: resource.title,
      file: `${company.slug}-${filename}.html`,
      type: resource.type
    };
  });
});

fs.writeFileSync(
  './data/resource-pitchdecks-map.json',
  JSON.stringify(indexMapping, null, 2),
  'utf8'
);

console.log('\n📋 리소스 피치덱 맵 생성됨: data/resource-pitchdecks-map.json');

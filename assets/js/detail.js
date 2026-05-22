// Get company slug from URL
function getCompanySlug() {
  const path = window.location.pathname;
  const slug = path.split('/').pop().replace('.html', '');
  return slug;
}

// Load and render company detail
async function loadCompanyDetail() {
  const slug = getCompanySlug();

  try {
    const response = await fetch('../data/companies.json');
    const companies = await response.json();
    const company = companies.find(c => c.slug === slug);

    if (!company) {
      document.body.innerHTML = '<div class="container"><h1>회사를 찾을 수 없습니다.</h1></div>';
      return;
    }

    renderCompanyDetail(company);
  } catch (error) {
    console.error('Error loading company:', error);
  }
}

// Render detail page
function renderCompanyDetail(company) {
  // Update title
  document.title = `${company.name} - Palantir Ecosystem Partner Analysis`;

  // Header
  const header = document.getElementById('detailHeader');
  header.innerHTML = `
    <h1>${company.name}</h1>
    <div class="type">${company.type}</div>
    <div class="tagline">"${company.tagline}"</div>
  `;

  // Website link
  const website = document.getElementById('website');
  website.href = company.website;
  website.textContent = company.website.replace('https://', '');

  // What They Do
  document.getElementById('whatTheyDo').innerHTML = `<p>${company.whatTheyDo}</p>`;

  // Solutions
  const solutionsHtml = company.solutions.map(s => `<li>${s}</li>`).join('');
  document.getElementById('solutions').innerHTML = `<ul>${solutionsHtml}</ul>`;

  // Strengths
  const strengthsHtml = company.strengths.map(s => `<li>${s}</li>`).join('');
  document.getElementById('strengths').innerHTML = `<ul>${strengthsHtml}</ul>`;

  // Differentiation
  document.getElementById('differentiation').innerHTML = `
    <div class="highlight-box">
      <h4>차별화 포인트</h4>
      <p>${company.differentiation}</p>
    </div>
  `;

  // Target Market
  document.getElementById('targetMarket').innerHTML = `<p>${company.targetMarket}</p>`;

  // Relevance to SB
  const relevanceBg = company.priority === 1 ? '#dbeafe' : company.priority === 2 ? '#fef3c7' : '#dbeafe';
  const relevanceBorder = company.priority === 1 ? '#3b82f6' : company.priority === 2 ? '#f59e0b' : '#3b82f6';

  document.getElementById('relevance').innerHTML = `
    <div class="highlight-box" style="border-color: ${relevanceBorder}; background-color: ${relevanceBg};">
      <h4>대표님 비즈니스에의 참고 가치 (Priority ${company.priority})</h4>
      <p>${company.relevanceToSB}</p>
    </div>
  `;

  // Case Studies
  const caseStudiesHtml = company.caseStudies.map((cs, idx) => `
    <div class="case-study-card">
      <h4>${idx + 1}. ${cs.title}</h4>
      <div class="case-study-meta">
        <span class="badge">${cs.industry}</span>
        <span class="badge duration">${cs.duration}</span>
      </div>
      <div class="case-study-content">
        <h5>🎯 과제</h5>
        <p>${cs.challenge}</p>
        <h5>✅ 솔루션</h5>
        <p>${cs.solution}</p>
        <h5>📊 결과</h5>
        <p>${cs.result}</p>
      </div>
    </div>
  `).join('');
  document.getElementById('caseStudies').innerHTML = caseStudiesHtml;

  // Resources
  const resourcesHtml = company.resources.map((res, idx) => `
    <div class="resource-card">
      <div class="resource-header">
        <span class="resource-type">${res.type}</span>
        <h4>${res.title}</h4>
      </div>
      <p class="resource-description">${res.description}</p>
      <a href="${res.url}" target="_blank" class="resource-link">→ 자료 보기</a>
    </div>
  `).join('');
  document.getElementById('resources').innerHTML = resourcesHtml;
}

// Load on page ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCompanyDetail);
} else {
  loadCompanyDetail();
}

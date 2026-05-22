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

  // Company Stats Section (NEW)
  const statsHtml = `
    <div class="company-stats-cards">
      <div class="stat-card">
        <div class="stat-icon">⭐</div>
        <div class="stat-value">Priority ${company.priority}</div>
        <div class="stat-label">우선순위</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-value">${company.strengths.length}</div>
        <div class="stat-label">핵심 강점</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-value">${company.caseStudies.length}</div>
        <div class="stat-label">성공 사례</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-value">${company.resources.length}</div>
        <div class="stat-label">자료</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏢</div>
        <div class="stat-value">${company.company_info.headquarters}</div>
        <div class="stat-label">본사</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🌍</div>
        <div class="stat-value">${company.company_info.regions.length}</div>
        <div class="stat-label">운영 지역</div>
      </div>
    </div>

    <div class="company-tech-skills">
      <h3>기술 역량</h3>
      <div class="skills-badges">
        ${company.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
      </div>
    </div>

    <div class="company-industries">
      <h3>주요 산업</h3>
      <div class="industry-badges">
        ${company.industries.map(industry => `<span class="industry-badge">${industry}</span>`).join('')}
      </div>
    </div>

    <div class="company-info-bar">
      <span>📍 ${company.company_info.headquarters}</span>
      <span>🏢 ${company.company_info.employees}</span>
      <span>📅 ${company.company_info.founded}</span>
    </div>
  `;
  document.getElementById('companyStats').innerHTML = statsHtml;

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

  // Related Companies (same priority group)
  const relatedCompanies = companies.filter(c => c.priority === company.priority && c.id !== company.id);
  const relatedHtml = `
    <div class="detail-section">
      <h2>🔗 같은 Priority 그룹의 다른 회사</h2>
      <div class="related-companies-grid">
        ${relatedCompanies.map(c => `
          <a href="./${c.slug}.html" class="related-company-card">
            <div class="related-company-badge">Priority ${c.priority}</div>
            <h4>${c.name}</h4>
            <p>${c.tagline}</p>
          </a>
        `).join('')}
      </div>
    </div>
  `;
  document.getElementById('relatedCompanies').innerHTML = relatedHtml;

  // Page Navigation (NEW) - Previous/Next buttons
  const prevCompany = companies.find(c => c.id === company.id - 1);
  const nextCompany = companies.find(c => c.id === company.id + 1);

  const pageNavHtml = `
    <div class="page-navigation">
      ${prevCompany ? `<a href="./${prevCompany.slug}.html" class="nav-btn prev-btn">← ${prevCompany.name}</a>` : '<span></span>'}
      <div class="page-indicator">
        <span class="current-page">${company.id}/10</span>
        <span class="page-progress">
          <div class="progress-bar" style="width: ${(company.id / 10) * 100}%"></div>
        </span>
      </div>
      ${nextCompany ? `<a href="./${nextCompany.slug}.html" class="nav-btn next-btn">${nextCompany.name} →</a>` : '<span></span>'}
    </div>
  `;

  // Insert page navigation after relatedCompanies
  const relatedSection = document.getElementById('relatedCompanies');
  relatedSection.insertAdjacentHTML('afterend', pageNavHtml);
}

// Load on page ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCompanyDetail);
} else {
  loadCompanyDetail();
}

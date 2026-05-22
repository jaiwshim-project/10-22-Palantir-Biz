// Get company slug from URL
function getCompanySlug() {
  const path = window.location.pathname;
  const slug = path.split('/').pop().replace('.html', '');
  console.log('[DEBUG] Slug from URL:', slug);
  return slug;
}

// Load and render company detail
function loadCompanyDetail() {
  const slug = getCompanySlug();
  console.log('[DEBUG] Starting to load company:', slug);

  try {
    // Use global companies data
    if (!window.companiesData) {
      throw new Error('companiesData not loaded');
    }

    const companies = window.companiesData;
    console.log('[DEBUG] Companies data loaded. Total:', companies.length);
    console.log('[DEBUG] Available slugs:', companies.map(c => c.slug).join(', '));

    // Find company
    const company = companies.find(c => c.slug === slug);
    console.log('[DEBUG] Company found:', !!company);

    if (!company) {
      console.error('[ERROR] Company not found for slug:', slug);
      document.body.innerHTML = `
        <div class="container" style="padding: 2rem; text-align: center;">
          <h1>회사를 찾을 수 없습니다</h1>
          <p>찾는 회사: ${slug}</p>
          <a href="../index.html" style="color: var(--accent); text-decoration: none;">← 목록으로 돌아가기</a>
        </div>
      `;
      return;
    }

    console.log('[DEBUG] Rendering company detail for:', company.name);
    renderCompanyDetail(company, companies);
  } catch (error) {
    console.error('[ERROR] Failed to load company:', error);
    document.body.innerHTML = `
      <div class="container" style="padding: 2rem; color: red;">
        <h1>오류 발생</h1>
        <p>${error.message}</p>
        <p>브라우저 콘솔을 확인하세요.</p>
        <a href="../index.html" style="color: var(--accent); text-decoration: none;">← 목록으로</a>
      </div>
    `;
  }
}

// Render detail page
function renderCompanyDetail(company, companies) {
  console.log('[RENDER] Starting to render company details');

  // Update title
  document.title = `${company.name} - Palantir Ecosystem Partner Analysis`;
  console.log('[RENDER] Title set');

  // Header
  const header = document.getElementById('detailHeader');
  if (!header) {
    console.error('[ERROR] detailHeader element not found');
    return;
  }
  header.innerHTML = `
    <h1>${company.name}</h1>
    <div class="type">${company.type}</div>
    <div class="tagline">"${company.tagline}"</div>
  `;
  console.log('[RENDER] Header rendered');

  // Website link
  const website = document.getElementById('website');
  if (website) {
    website.href = company.website;
    website.textContent = company.website.replace('https://', '');
  }
  console.log('[RENDER] Website link set');

  // Pitchdeck Button
  try {
    const pitchdeckSlideMap = {
      1: 4, 2: 5, 3: 6, 4: 7, 5: 9,
      6: 10, 7: 11, 8: 12, 9: 14, 10: 14
    };
    const pitchdeckSlide = pitchdeckSlideMap[company.id];
    const pitchdeckLink = document.createElement('div');
    pitchdeckLink.style.textAlign = 'center';
    pitchdeckLink.style.marginTop = '1.5rem';
    pitchdeckLink.innerHTML = `
      <a href="../palantir-ecosystem-analysis.html?slide=${pitchdeckSlide}"
         style="display: inline-block; padding: 0.8rem 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 1rem;">
        📊 피치덱에서 종합 분석 보기
      </a>
    `;
    website.parentElement.insertAdjacentElement('afterend', pitchdeckLink);
    console.log('[RENDER] Pitchdeck button added for slide', pitchdeckSlide);
  } catch (e) {
    console.error('[ERROR] Failed to add pitchdeck button:', e);
  }

  // Company Stats Section
  try {
    const statsSection = document.getElementById('companyStats');
    if (statsSection) {
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
      statsSection.innerHTML = statsHtml;
      console.log('[RENDER] Stats section rendered');
    }
  } catch (e) {
    console.error('[ERROR] Failed to render stats:', e);
  }

  // What They Do
  try {
    const whatTheyDoSection = document.getElementById('whatTheyDo');
    if (whatTheyDoSection) {
      whatTheyDoSection.innerHTML = `<p>${company.whatTheyDo}</p>`;
      console.log('[RENDER] whatTheyDo rendered');
    }
  } catch (e) {
    console.error('[ERROR] Failed to render whatTheyDo:', e);
  }

  // Solutions
  try {
    const solutionsSection = document.getElementById('solutions');
    if (solutionsSection) {
      const solutionsHtml = company.solutions.map(s => `<li>${s}</li>`).join('');
      solutionsSection.innerHTML = `<ul>${solutionsHtml}</ul>`;
      console.log('[RENDER] Solutions rendered:', company.solutions.length);
    }
  } catch (e) {
    console.error('[ERROR] Failed to render solutions:', e);
  }

  // Strengths
  try {
    const strengthsSection = document.getElementById('strengths');
    if (strengthsSection) {
      const strengthsHtml = company.strengths.map(s => `<li>${s}</li>`).join('');
      strengthsSection.innerHTML = `<ul>${strengthsHtml}</ul>`;
      console.log('[RENDER] Strengths rendered:', company.strengths.length);
    }
  } catch (e) {
    console.error('[ERROR] Failed to render strengths:', e);
  }

  // Differentiation
  try {
    const differentiationSection = document.getElementById('differentiation');
    if (differentiationSection) {
      differentiationSection.innerHTML = `
        <div class="highlight-box">
          <h4>차별화 포인트</h4>
          <p>${company.differentiation}</p>
        </div>
      `;
      console.log('[RENDER] Differentiation rendered');
    }
  } catch (e) {
    console.error('[ERROR] Failed to render differentiation:', e);
  }

  // Target Market
  try {
    const targetMarketSection = document.getElementById('targetMarket');
    if (targetMarketSection) {
      targetMarketSection.innerHTML = `<p>${company.targetMarket}</p>`;
      console.log('[RENDER] Target market rendered');
    }
  } catch (e) {
    console.error('[ERROR] Failed to render targetMarket:', e);
  }

  // Relevance to SB
  try {
    const relevanceSection = document.getElementById('relevance');
    if (relevanceSection) {
      const relevanceBg = company.priority === 1 ? '#dbeafe' : company.priority === 2 ? '#fef3c7' : '#dbeafe';
      const relevanceBorder = company.priority === 1 ? '#3b82f6' : company.priority === 2 ? '#f59e0b' : '#3b82f6';

      relevanceSection.innerHTML = `
        <div class="highlight-box" style="border-color: ${relevanceBorder}; background-color: ${relevanceBg};">
          <h4>대표님 비즈니스에의 참고 가치 (Priority ${company.priority})</h4>
          <p>${company.relevanceToSB}</p>
        </div>
      `;
      console.log('[RENDER] Relevance rendered');
    }
  } catch (e) {
    console.error('[ERROR] Failed to render relevance:', e);
  }

  // Case Studies
  try {
    const caseStudiesSection = document.getElementById('caseStudies');
    if (caseStudiesSection) {
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
      caseStudiesSection.innerHTML = caseStudiesHtml;
      console.log('[RENDER] Case studies rendered:', company.caseStudies.length);
    }
  } catch (e) {
    console.error('[ERROR] Failed to render caseStudies:', e);
  }

  // Resources with Pitchdeck Links
  try {
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
      const pitchdeckSlideMap = {
        1: 4, 2: 5, 3: 6, 4: 7, 5: 9,
        6: 10, 7: 11, 8: 12, 9: 14, 10: 14
      };
      const pitchdeckSlide = pitchdeckSlideMap[company.id];

      const resourcesHtml = company.resources.map((res, idx) => `
        <div class="resource-card">
          <div class="resource-header">
            <span class="resource-type">${res.type}</span>
            <h4>${res.title}</h4>
          </div>
          <p class="resource-description">${res.description}</p>
          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <a href="${res.url}" target="_blank" class="resource-link">→ 자료 보기</a>
            <a href="../palantir-ecosystem-analysis.html?slide=${pitchdeckSlide}"
               style="display: inline-block; padding: 0.6rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 0.9rem;">
              📊 피치덱
            </a>
          </div>
        </div>
      `).join('');
      resourcesSection.innerHTML = resourcesHtml;
      console.log('[RENDER] Resources rendered:', company.resources.length);
    }
  } catch (e) {
    console.error('[ERROR] Failed to render resources:', e);
  }

  // Related Companies
  try {
    const relatedSection = document.getElementById('relatedCompanies');
    if (relatedSection) {
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
      relatedSection.innerHTML = relatedHtml;
      console.log('[RENDER] Related companies rendered');
    }
  } catch (e) {
    console.error('[ERROR] Failed to render related companies:', e);
  }

  // Page Navigation
  try {
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

    const relatedSection = document.getElementById('relatedCompanies');
    if (relatedSection) {
      relatedSection.insertAdjacentHTML('afterend', pageNavHtml);
      console.log('[RENDER] Page navigation rendered');
    }
  } catch (e) {
    console.error('[ERROR] Failed to render page navigation:', e);
  }

  console.log('[RENDER] All sections completed');
}

// Load on page ready
console.log('[INIT] Page ready state:', document.readyState);
if (document.readyState === 'loading') {
  console.log('[INIT] Waiting for DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[INIT] DOMContentLoaded fired');
    loadCompanyDetail();
  });
} else {
  console.log('[INIT] DOM already loaded, calling loadCompanyDetail');
  loadCompanyDetail();
}

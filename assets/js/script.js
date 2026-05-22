// Load companies data
let companiesData = [];

async function loadCompanies() {
  try {
    const response = await fetch('./data/companies.json');
    companiesData = await response.json();
    renderCompanies(companiesData);
    initFilters();
  } catch (error) {
    console.error('Error loading companies:', error);
  }
}

// Render companies on main page
function renderCompanies(companies) {
  const grid = document.getElementById('companiesGrid');
  if (!grid) return;

  grid.innerHTML = companies.map(company => `
    <div class="company-card" data-priority="${company.priority}">
      <div class="company-header">
        <div class="priority-badge priority-${company.priority}">Priority ${company.priority}</div>
        <h3>${company.name}</h3>
        <div class="company-type">${company.type}</div>
        <div class="company-tagline">"${company.tagline}"</div>
      </div>
      <div class="company-body">
        <p class="company-description">${company.whatTheyDo}</p>
        <div class="strength-list">
          <strong>Key Strengths</strong>
          <ul>
            ${company.strengths.slice(0, 2).map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="company-footer">
        <a href="./pages/${company.slug}.html" class="view-btn">View Full Profile →</a>
      </div>
    </div>
  `).join('');
}

// Initialize filters
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const priority = this.dataset.priority;
      if (priority === 'all') {
        renderCompanies(companiesData);
      } else {
        const filtered = companiesData.filter(c => c.priority == priority);
        renderCompanies(filtered);
      }
    });
  });
}

// Load on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCompanies);
} else {
  loadCompanies();
}

// Utility: Find company by slug (for detail pages)
async function getCompanyBySlug(slug) {
  if (companiesData.length === 0) {
    const response = await fetch('../data/companies.json');
    companiesData = await response.json();
  }
  return companiesData.find(c => c.slug === slug);
}

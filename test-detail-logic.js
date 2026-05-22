// Simulate the detail.js logic for testing
const fs = require('fs');
const path = require('path');

// Load companies data
const companiesData = JSON.parse(fs.readFileSync('./data/companies.json', 'utf8'));

// Test 1: Check if all companies have slug values
console.log('=== Test 1: Company Slugs ===');
companiesData.forEach(c => {
  console.log(`✓ ${c.id}. ${c.name} → slug: "${c.slug}"`);
});

// Test 2: Check if findBySlug would work
console.log('\n=== Test 2: Finding Companies by Slug ===');
const testSlugs = ['northslope', '10x-partners', 'fourth-age'];
testSlugs.forEach(slug => {
  const found = companiesData.find(c => c.slug === slug);
  console.log(`${found ? '✓' : '✗'} Slug "${slug}" → ${found?.name || 'NOT FOUND'}`);
});

// Test 3: Check if all companies have required fields for rendering
console.log('\n=== Test 3: Required Rendering Fields ===');
const requiredFields = ['name', 'type', 'tagline', 'whatTheyDo', 'solutions', 'strengths', 
                        'differentiation', 'targetMarket', 'relevanceToSB', 'caseStudies', 'resources'];

companiesData.forEach(c => {
  const missing = requiredFields.filter(f => !c[f] || (Array.isArray(c[f]) && c[f].length === 0));
  if (missing.length > 0) {
    console.log(`✗ ${c.name}: Missing ${missing.join(', ')}`);
  } else {
    console.log(`✓ ${c.name}: All fields present`);
  }
});

// Test 4: Check case studies and resources structure
console.log('\n=== Test 4: Case Studies & Resources Structure ===');
companiesData.slice(0, 3).forEach(c => {
  console.log(`\n${c.name}:`);
  console.log(`  Case Studies: ${c.caseStudies.length}`);
  c.caseStudies.forEach((cs, i) => {
    console.log(`    ${i+1}. ${cs.title}`);
    console.log(`       Fields: ${Object.keys(cs).join(', ')}`);
  });
  console.log(`  Resources: ${c.resources.length}`);
  c.resources.forEach((r, i) => {
    console.log(`    ${i+1}. ${r.title} (${r.type})`);
  });
});

console.log('\n✅ All validation tests completed');

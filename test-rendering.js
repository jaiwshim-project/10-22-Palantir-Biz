const http = require('http');
const fs = require('fs');
const path = require('path');

// Test 1: Load companies.json via HTTP
console.log('=== Test 1: Loading companies.json ===');
http.get('http://localhost:9000/data/companies.json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const companies = JSON.parse(data);
      console.log(`✓ Loaded ${companies.length} companies`);
      console.log(`✓ First company: ${companies[0].name}`);
      console.log(`✓ First company has ${companies[0].caseStudies.length} case studies`);
      console.log(`✓ First company has ${companies[0].resources.length} resources`);
    } catch (e) {
      console.error('✗ Failed to parse JSON:', e.message);
    }
    
    // Test 2: Verify company page HTML has all IDs needed for JS
    console.log('\n=== Test 2: Checking HTML Structure ===');
    http.get('http://localhost:9000/pages/northslope.html', (res2) => {
      let pageHtml = '';
      res2.on('data', chunk => pageHtml += chunk);
      res2.on('end', () => {
        const elementIds = [
          'detailHeader', 'website', 'companyStats', 'whatTheyDo',
          'solutions', 'strengths', 'differentiation', 'targetMarket',
          'relevance', 'caseStudies', 'resources', 'relatedCompanies'
        ];
        
        let allPresent = true;
        elementIds.forEach(id => {
          const present = pageHtml.includes(`id="${id}"`);
          console.log(`${present ? '✓' : '✗'} ${id}: ${present ? 'present' : 'MISSING'}`);
          if (!present) allPresent = false;
        });
        
        // Test 3: Check if detail.js is being loaded
        console.log('\n=== Test 3: JavaScript Loading ===');
        const hasDetailJs = pageHtml.includes('detail.js');
        console.log(`${hasDetailJs ? '✓' : '✗'} detail.js script tag present`);
        
        // Test 4: Extract and validate detail.js code
        console.log('\n=== Test 4: detail.js Functions ===');
        http.get('http://localhost:9000/assets/js/detail.js', (res3) => {
          let jsCode = '';
          res3.on('data', chunk => jsCode += chunk);
          res3.on('end', () => {
            const functions = [
              { name: 'getCompanySlug', regex: /function getCompanySlug\(\)/ },
              { name: 'loadCompanyDetail', regex: /async function loadCompanyDetail\(\)/ },
              { name: 'renderCompanyDetail', regex: /function renderCompanyDetail\(company, companies\)/ },
              { name: 'DOMContentLoaded event', regex: /DOMContentLoaded/ }
            ];
            
            functions.forEach(fn => {
              const present = fn.regex.test(jsCode);
              console.log(`${present ? '✓' : '✗'} ${fn.name}: ${present ? 'present' : 'MISSING'}`);
            });
            
            console.log('\n✅ All structure tests completed');
          });
        });
      });
    });
  });
}).on('error', (e) => {
  console.error('✗ Failed to load companies.json:', e.message);
});

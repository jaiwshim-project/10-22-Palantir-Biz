// Test pages via HTTP
const http = require('http');

function testPage(port, pagePath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: port,
      path: pagePath,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function runTests() {
  console.log('Testing pages via HTTP on port 9000...\n');
  
  try {
    // Test main page
    console.log('=== Testing Main Page ===');
    const mainRes = await testPage(9000, '/index.html');
    console.log('Status:', mainRes.status);
    console.log('Has company cards:', mainRes.data.includes('company-card'));
    console.log('Has search input:', mainRes.data.includes('searchInput'));

    // Test company page
    console.log('\n=== Testing Company Page ===');
    const companyRes = await testPage(9000, '/pages/northslope.html');
    console.log('Status:', companyRes.status);
    console.log('Has detail container:', companyRes.data.includes('detail-container'));
    console.log('Has stats section:', companyRes.data.includes('companyStats'));
    console.log('Has case studies:', companyRes.data.includes('caseStudies'));
    console.log('Has resources:', companyRes.data.includes('resources'));
    console.log('Has detail.js script:', companyRes.data.includes('detail.js'));

    // Check if page structure is correct
    console.log('\n=== Page Structure Check ===');
    if (companyRes.data.includes('id="detailHeader"') && 
        companyRes.data.includes('id="companyStats"') &&
        companyRes.data.includes('id="caseStudies"') &&
        companyRes.data.includes('id="resources"')) {
      console.log('✓ All required elements present in HTML');
    } else {
      console.log('✗ Some elements missing from HTML');
    }

  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

runTests();

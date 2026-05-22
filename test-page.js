const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function testPage() {
  let browser;
  try {
    // Find Chrome executable
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

    if (!fs.existsSync(chromePath)) {
      console.error('Chrome not found at:', chromePath);
      process.exit(1);
    }

    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to the company page
    const url = 'http://localhost:9000/pages/northslope.html';
    console.log('Testing page:', url);

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    } catch (err) {
      console.error('Navigation error:', err.message);
      // Continue anyway to check what loaded
    }

    // Get page content
    const content = await page.content();

    // Check for key content
    const hasStats = content.includes('Priority 1');
    const hasSolutions = content.includes('제공 솔루션');
    const hasStrengths = content.includes('핵심 강점');
    const hasCaseStudies = content.includes('성공 사례');

    console.log('\n=== Page Content Check ===');
    console.log('Has Priority Stats:', hasStats);
    console.log('Has Solutions section:', hasSolutions);
    console.log('Has Strengths section:', hasStrengths);
    console.log('Has Case Studies:', hasCaseStudies);

    // Get console logs from the page
    page.on('console', msg => {
      console.log('PAGE LOG:', msg.text());
    });

    page.on('error', err => {
      console.log('PAGE ERROR:', err);
    });

    // Wait a bit for content to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get the actual rendered content
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('\n=== Rendered Text (first 500 chars) ===');
    console.log(bodyText.substring(0, 500));

    // Screenshot
    await page.screenshot({
      path: path.join('C:\\01 클로드코드\\10-22 팔란티어 비즈니스', 'test-screenshot.png'),
      fullPage: true
    });
    console.log('\nScreenshot saved to test-screenshot.png');

    await browser.close();
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    if (browser) await browser.close();
    process.exit(1);
  }
}

testPage();

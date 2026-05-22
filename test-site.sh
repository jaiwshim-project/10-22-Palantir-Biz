#!/bin/bash

echo "=== Palantir Ecosystem Partner Analysis Website Test ==="
echo ""

# Test 1: Check if index.html exists and contains expected content
echo "✓ Test 1: index.html structure"
if grep -q "Palantir 생태계 파트너 분석" index.html && \
   grep -q "companiesGrid" index.html && \
   grep -q "script.js" index.html; then
  echo "  PASS: index.html has required elements"
else
  echo "  FAIL: index.html missing required elements"
fi

# Test 2: Validate JSON structure
echo ""
echo "✓ Test 2: companies.json validity"
if python3 -m json.tool data/companies.json > /dev/null 2>&1; then
  COMPANY_COUNT=$(python3 -c "import json; print(len(json.load(open('data/companies.json'))))")
  echo "  PASS: Valid JSON with $COMPANY_COUNT companies"
else
  echo "  FAIL: Invalid JSON"
fi

# Test 3: Check all company pages exist
echo ""
echo "✓ Test 3: Company pages"
SLUGS=("northslope" "10x-partners" "fourth-age" "unit8" "spr" "rackspace" "accenture-federal" "pvm" "bigbear" "gallatin")
for slug in "${SLUGS[@]}"; do
  if [ -f "pages/$slug.html" ]; then
    echo "  ✓ $slug.html"
  else
    echo "  ✗ $slug.html MISSING"
  fi
done

# Test 4: Check CSS and JS files
echo ""
echo "✓ Test 4: Assets"
if [ -f "assets/css/style.css" ]; then echo "  ✓ style.css"; else echo "  ✗ style.css MISSING"; fi
if [ -f "assets/js/script.js" ]; then echo "  ✓ script.js"; else echo "  ✗ script.js MISSING"; fi
if [ -f "assets/js/detail.js" ]; then echo "  ✓ detail.js"; else echo "  ✗ detail.js MISSING"; fi

# Test 5: Check HTTP access
echo ""
echo "✓ Test 5: HTTP Server Access"
if curl -s http://localhost:8765/index.html | grep -q "Palantir 생태계 파트너 분석"; then
  echo "  PASS: index.html accessible and loads"
else
  echo "  FAIL: Could not access or verify index.html"
fi

echo ""
echo "=== All Tests Complete ==="

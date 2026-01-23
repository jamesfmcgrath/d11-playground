# Testing Guide for JFM Blog Theme

Comprehensive guide to testing the JFM Blog theme for accessibility, performance, visual regression, and code quality.

## Philosophy

**Testing is optional but recommended:**
- Theme works without testing tools
- Tests catch issues early
- CI runs automatically
- Local testing builds confidence

**We test what matters:**
- Accessibility (WCAG 2.2 AA compliance)
- Visual regression (no unintended layout changes)
- Performance (Core Web Vitals)
- Code quality (valid HTML/CSS)

## Quick Start

### Setup (One-time)

**1. Install Node.js** (if not already installed)
- Version 18+ required
- Download: https://nodejs.org/

**2. Install testing dependencies:**
```bash
cd /path/to/jfm_blog
npm install
```

**3. Start your Drupal site:**
```bash
# Your site must be running at http://localhost
# Adjust URLs in config files if using different domain
```

### Run All Tests

```bash
npm test
```

This runs:
- Accessibility tests (pa11y)
- HTML validation
- CSS validation (stylelint)

### Run Specific Tests

```bash
# Accessibility only
npm run test:accessibility

# Visual regression
npm run test:visual

# Performance
npm run test:performance

# HTML validation
npm run test:html

# CSS linting
npm run test:css
```

## Accessibility Testing

**Tool:** pa11y-ci with axe-core  
**Standard:** WCAG 2.2 AA  
**Config:** `.pa11yci`

### Running Tests

```bash
npm run test:accessibility
```

**What it checks:**
- Color contrast ratios
- Heading hierarchy
- ARIA attributes
- Alt text on images
- Form labels
- Keyboard navigation
- Focus indicators

### Configuration

Edit `.pa11yci` to:
- Add more URLs
- Change WCAG level
- Ignore specific issues
- Adjust timeouts

**Example:**
```json
{
  "urls": [
    "http://localhost/",
    "http://localhost/blog",
    "http://localhost/node/1",
    "http://localhost/contact"
  ]
}
```

### Common Issues and Fixes

**Issue: Color contrast failure**
```
Fix: Adjust colors in css/tokens.css
Check contrast ratio: https://webaim.org/resources/contrastchecker/
```

**Issue: Missing alt text**
```
Fix: Ensure images have alt attributes in templates
Required in component schemas
```

**Issue: Invalid ARIA**
```
Fix: Check ARIA landmarks match semantic HTML
Only use ARIA when semantic HTML insufficient
```

## Visual Regression Testing

**Tool:** BackstopJS  
**Config:** `backstop.json`

### First Time Setup

**Create reference screenshots:**
```bash
npm run test:visual:reference
```

This captures current state as the "correct" baseline.

### Running Tests

**After making changes:**
```bash
npm run test:visual
```

**What it does:**
- Captures new screenshots
- Compares to reference
- Shows differences visually
- Reports mismatch percentage

### Reviewing Results

**If tests fail:**
1. BackstopJS opens HTML report automatically
2. Review visual differences
3. Decide if changes are intentional

**If changes are correct:**
```bash
npm run test:visual:approve
```

**If changes are bugs:**
- Fix the CSS/markup
- Run tests again

### Configuration

Edit `backstop.json` to:
- Add more scenarios
- Change viewports
- Adjust mismatch threshold
- Test specific components

**Example: Add new scenario**
```json
{
  "label": "Contact Page",
  "url": "http://localhost/contact",
  "selectors": ["document"],
  "delay": 1000,
  "misMatchThreshold": 0.1
}
```

### Testing Specific Components

**Test a single component:**
```json
{
  "label": "Hero CTA Component",
  "url": "http://localhost/",
  "selectors": [".hero-cta"],
  "misMatchThreshold": 0.1
}
```

### Common Scenarios

**After CSS changes:**
1. Run visual tests
2. Review differences
3. Approve if intentional

**After component updates:**
1. Test component specifically
2. Test pages using component
3. Ensure no unintended changes

**Before deployment:**
1. Run full visual regression suite
2. All tests should pass
3. Approve any intentional changes

## Performance Testing

**Tool:** Lighthouse CI  
**Config:** `lighthouserc.js`

### Running Tests

```bash
npm run test:performance
```

**What it checks:**
- Core Web Vitals (LCP, CLS, TBT)
- Performance score
- Accessibility score
- Best practices score
- SEO score

### Target Scores

**Required:**
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 90+

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- TBT (Total Blocking Time): < 300ms

### Configuration

Edit `lighthouserc.js` to:
- Add more URLs
- Adjust thresholds
- Change device settings
- Modify assertions

### Improving Performance

**Common issues and fixes:**

**Slow LCP:**
- Optimize images (WebP, responsive images)
- Lazy load below-fold images
- Minimize CSS/JS
- Use system fonts

**High CLS:**
- Set aspect-ratio on images
- Reserve space for dynamic content
- Avoid layout shifts

**Long TBT:**
- Minimize JavaScript
- Defer non-critical scripts
- Remove unused code

## HTML Validation

**Tool:** html-validator  
**Script:** `scripts/validate-html.js`

### Running Tests

```bash
npm run test:html
```

**What it checks:**
- Valid HTML5 syntax
- Proper nesting
- Required attributes
- Semantic correctness

### Common Issues

**Unclosed tags:**
```html
<!-- Wrong -->
<div>Content

<!-- Right -->
<div>Content</div>
```

**Invalid attributes:**
```html
<!-- Wrong -->
<img src="image.jpg">

<!-- Right -->
<img src="image.jpg" alt="Description">
```

**Improper nesting:**
```html
<!-- Wrong -->
<p><div>Content</div></p>

<!-- Right -->
<div><p>Content</p></div>
```

## CSS Validation

**Tool:** Stylelint  
**Config:** `.stylelintrc.json`

### Running Tests

```bash
# Check for issues
npm run test:css

# Auto-fix issues
npm run lint:css
```

**What it checks:**
- Valid CSS syntax
- Consistent formatting
- BEM naming conventions
- Property order
- No duplicates

### Common Issues

**Invalid property:**
```css
/* Wrong */
.component {
  color: #zzzzzz;
}

/* Right */
.component {
  color: #333333;
}
```

**Inconsistent spacing:**
```css
/* Wrong */
.component{color:red;}

/* Right */
.component {
  color: red;
}
```

**Invalid BEM naming:**
```css
/* Wrong */
.componentName__Element { }

/* Right */
.component-name__element { }
```

## Testing in Cursor

### Before Making Changes

```bash
# Create reference screenshots
npm run test:visual:reference
```

### While Developing

**In Cursor, prompt:**
```
"Create article-card component and test it"
```

**Cursor can then run:**
```bash
npm run test:accessibility
npm run test:visual
```

### Cursor Testing Workflow

**1. Generate component**
```
Cursor: "Create new-component"
```

**2. Test accessibility**
```
Cursor: Run "npm run test:accessibility"
```

**3. Fix issues**
```
Cursor: "Fix color contrast in new-component"
```

**4. Visual check**
```
Cursor: Run "npm run test:visual"
```

**5. Approve if good**
```
Cursor: Run "npm run test:visual:approve"
```

### Example Cursor Prompts

```
"Create site-header component, then run accessibility tests"

"Fix any color contrast issues found in pa11y tests"

"Run visual regression tests and show me the differences"

"Optimize article-card component for performance, then run lighthouse"
```

## Continuous Integration

### GitHub Actions Workflow

**File:** `.github/workflows/test.yml`

**What it does:**
- Runs on every push/PR
- Tests accessibility
- Validates HTML/CSS
- Reports results

**Setting up:**
1. Create `.github/workflows/` directory
2. Add `test.yml` workflow file
3. Push to GitHub
4. Tests run automatically

### Local Testing Before Push

**Run full test suite:**
```bash
npm test
```

**If all pass:**
```bash
git add .
git commit -m "feat: Add new component"
git push
```

**If tests fail:**
- Fix issues
- Run tests again
- Commit when passing

## Testing Checklist

### Before Committing

- [ ] Run `npm test`
- [ ] All tests pass
- [ ] Visual regression approved
- [ ] No accessibility errors
- [ ] Performance scores meet targets

### Before Deploying

- [ ] Full test suite passes
- [ ] Visual regression checked
- [ ] Performance tested on staging
- [ ] Manual accessibility check
- [ ] Cross-browser testing

### After Deploying

- [ ] Run lighthouse on production
- [ ] Verify Core Web Vitals
- [ ] Spot check accessibility
- [ ] Test on real devices

## Troubleshooting

### Tests Not Running

**Check Node version:**
```bash
node --version  # Should be 18+
```

**Reinstall dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Drupal Site Not Accessible

**Verify site running:**
```bash
curl http://localhost
```

**Update URLs in config:**
- Edit `.pa11yci`
- Edit `backstop.json`
- Edit `lighthouserc.js`
- Edit `scripts/validate-html.js`

### Port Already in Use

**Change port in configs:**
```json
"url": "http://localhost:8080/"
```

### Tests Fail in CI But Pass Locally

**Common causes:**
- Different Node versions
- Missing dependencies
- Timeout issues
- Port conflicts

**Solutions:**
- Match Node versions
- Increase timeouts
- Check CI logs
- Run locally with `--ci` flag

## Advanced Testing

### Custom Test Scenarios

**Add to BackstopJS:**
```json
{
  "label": "Component Hover State",
  "url": "http://localhost/blog",
  "hoverSelector": ".article-card",
  "delay": 500
}
```

### Component-Specific Tests

**Test individual components:**
```bash
# Modify backstop.json to test single component
backstop test --filter="Article Card"
```

### Performance Budgets

**Set budgets in lighthouserc.js:**
```javascript
'resource-summary:script:size': ['error', {maxNumericValue: 50000}],
'resource-summary:stylesheet:size': ['error', {maxNumericValue: 20000}]
```

## Testing Philosophy

**Test what matters:**
- Accessibility is non-negotiable
- Performance impacts user experience
- Visual regression catches bugs
- Valid code prevents issues

**Test early and often:**
- Run tests during development
- Fix issues immediately
- Don't accumulate technical debt

**Keep tests simple:**
- Tests should be easy to run
- Clear pass/fail criteria
- Actionable error messages

**Trust but verify:**
- Automated tests catch most issues
- Manual testing still essential
- Real device testing critical

## Resources

**Accessibility:**
- WCAG 2.2: https://www.w3.org/WAI/WCAG22/quickref/
- WebAIM: https://webaim.org/
- pa11y: https://pa11y.org/

**Performance:**
- Web.dev: https://web.dev/
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Core Web Vitals: https://web.dev/vitals/

**Visual Testing:**
- BackstopJS: https://github.com/garris/BackstopJS
- Visual regression: https://www.browserstack.com/guide/visual-regression-testing

**Tools:**
- Stylelint: https://stylelint.io/
- HTML Validator: https://github.com/zrrrzzt/html-validator

## Next Steps

1. **Install dependencies** (`npm install`)
2. **Create reference screenshots** (`npm run test:visual:reference`)
3. **Run tests** (`npm test`)
4. **Fix any issues**
5. **Integrate into workflow**
6. **Set up CI** (optional)

---

**Testing ensures quality. Quality ensures trust. Trust enables adoption.**

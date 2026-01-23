# Testing Files Index

Complete list of all testing-related files and where to place them in your JFM Blog theme.

## Quick Setup

```bash
# 1. Copy all files to your theme directory
# 2. Install dependencies
npm install

# 3. Create reference screenshots
npm run test:visual:reference

# 4. Run tests
npm test
```

## Files and Directories

### Root Configuration Files

```
jfm_blog/
├── package.json                    # NPM dependencies and test scripts
├── .pa11yci                        # Accessibility testing configuration
├── backstop.json                   # Visual regression configuration
├── lighthouserc.js                 # Performance testing configuration
├── .stylelintrc.json              # CSS linting rules
└── .gitignore                      # Ignore test results and node_modules
```

**What they do:**
- `package.json` - Defines test dependencies (pa11y, backstop, lighthouse)
- `.pa11yci` - URLs to test for accessibility, WCAG standard settings
- `backstop.json` - Viewports, scenarios, and visual regression settings
- `lighthouserc.js` - Performance thresholds and Core Web Vitals targets
- `.stylelintrc.json` - CSS validation rules (BEM naming, formatting)
- `.gitignore` - Prevents committing test results and dependencies

### Scripts Directory

```
jfm_blog/
└── scripts/
    └── validate-html.js            # HTML validation script
```

**What it does:**
- Fetches HTML from running Drupal site
- Validates against WHATWG HTML standard
- Reports syntax errors and validation issues

**Make executable:**
```bash
chmod +x scripts/validate-html.js
```

### GitHub Actions Workflow

```
jfm_blog/
└── .github/
    └── workflows/
        └── test.yml                # CI/CD workflow for automated testing
```

**What it does:**
- Runs automatically on push/pull request
- Executes all tests in CI environment
- Posts results to GitHub Actions
- Uploads test reports as artifacts

**Triggers:**
- Push to main or develop branches
- Pull requests to main or develop
- Manual workflow dispatch

### Test Directories

```
jfm_blog/
├── tests/
│   └── visual/
│       ├── README.md               # Visual testing documentation
│       └── reference/
│           └── README.md           # Reference screenshots info
└── reports/
    └── README.md                   # Test reports documentation
```

**What they contain:**
- `tests/visual/reference/` - Baseline screenshots (commit to git)
- `tests/visual/test/` - Current screenshots (gitignored, generated)
- `tests/visual/html_report/` - Visual diff reports (gitignored)
- `reports/pa11y/` - Accessibility screenshots (gitignored)
- `reports/lighthouse/` - Performance reports (gitignored, optional)

**Note:** Only `reference/` should be committed. Others are generated.

### Documentation

```
jfm_blog/
└── TESTING.md                      # Complete testing guide
```

**What it covers:**
- Setup instructions
- How to run each test
- Understanding results
- Fixing common issues
- Cursor integration
- CI/CD setup

## File Placement Checklist

- [ ] Copy `package.json` to theme root
- [ ] Copy `.pa11yci` to theme root
- [ ] Copy `backstop.json` to theme root
- [ ] Copy `lighthouserc.js` to theme root
- [ ] Copy `.stylelintrc.json` to theme root
- [ ] Copy `.gitignore` to theme root (merge if exists)
- [ ] Copy `scripts/` directory to theme root
- [ ] Copy `.github/` directory to theme root
- [ ] Create `tests/visual/reference/` directory
- [ ] Create `reports/` directory
- [ ] Copy `TESTING.md` to theme root

## Initial Setup Commands

```bash
# Navigate to theme directory
cd /path/to/drupal/web/themes/custom/jfm_blog

# Install testing dependencies
npm install

# Verify installation
npm run test:css --version

# Create visual regression baseline
npm run test:visual:reference

# Run full test suite (requires running Drupal site)
npm test
```

## Directory Structure After Setup

```
jfm_blog/
├── .cursorrules                    # Cursor AI context
├── .github/
│   └── workflows/
│       └── test.yml                # CI workflow
├── .gitignore                      # Git ignore rules
├── .pa11yci                        # Accessibility config
├── .stylelintrc.json              # CSS lint config
├── ARCHITECTURE.md                 # Architecture docs
├── COMPONENTS.md                   # Component catalog
├── CONTRIBUTING.md                 # Contribution guide
├── QUICK-START.md                  # Quick reference
├── README.md                       # User documentation
├── TESTING.md                      # Testing guide
├── backstop.json                   # Visual regression config
├── components/                     # SDC components
│   ├── article-card/
│   ├── article-full/
│   ├── hero-cta/
│   ├── site-footer/
│   └── site-header/
├── config/
│   └── install/                   # Drupal config
├── css/
│   ├── global.css
│   └── tokens.css
├── js/
│   └── theme.js
├── jfm_blog.info.yml              # Theme metadata
├── jfm_blog.libraries.yml         # Asset libraries
├── jfm_blog.theme                 # Theme functions
├── lighthouserc.js                # Performance config
├── node_modules/                  # NPM packages (gitignored)
├── package-lock.json              # Dependency lock (gitignored)
├── package.json                   # NPM config
├── reports/                       # Test reports (gitignored)
│   ├── README.md
│   └── pa11y/
├── scripts/
│   └── validate-html.js           # HTML validator
├── templates/
│   ├── html.html.twig
│   ├── node/
│   ├── page.html.twig
│   └── views/
└── tests/                         # Test files
    └── visual/
        ├── README.md
        └── reference/             # Baseline screenshots
            └── README.md
```

## What Gets Committed to Git

**Commit these:**
- ✅ All configuration files (package.json, .pa11yci, etc.)
- ✅ Scripts directory
- ✅ .github/workflows directory
- ✅ tests/visual/reference/ (baseline screenshots)
- ✅ All documentation (TESTING.md, etc.)

**Don't commit these (in .gitignore):**
- ❌ node_modules/
- ❌ package-lock.json (optional, depends on preference)
- ❌ tests/visual/test/
- ❌ tests/visual/html_report/
- ❌ tests/visual/ci_report/
- ❌ reports/
- ❌ .lighthouseci/

## NPM Scripts Reference

```bash
# Run all tests
npm test

# Individual test suites
npm run test:accessibility    # pa11y (WCAG 2.2 AA)
npm run test:visual          # BackstopJS (screenshots)
npm run test:performance     # Lighthouse (Core Web Vitals)
npm run test:html           # HTML validator
npm run test:css            # Stylelint

# Visual regression workflow
npm run test:visual:reference   # Create baseline
npm run test:visual:approve     # Approve changes

# CSS linting
npm run lint:css            # Check and auto-fix CSS
```

## Dependencies Installed

When you run `npm install`, these tools are installed:

**Accessibility:**
- pa11y-ci (automated WCAG testing)
- axe-core (accessibility engine)

**Visual Regression:**
- backstopjs (screenshot comparison)
- puppeteer (browser automation)

**Performance:**
- @lhci/cli (Lighthouse CI)

**Code Quality:**
- stylelint (CSS linting)
- stylelint-config-standard (CSS rules)
- html-validator (HTML validation)

**Total size:** ~500MB (mostly Chrome/Puppeteer)

## Troubleshooting

### Installation Issues

**Error: Cannot find module**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: Permission denied**
```bash
sudo npm install -g npm@latest
npm install
```

### Test Failures

**Tests can't reach http://localhost**
- Ensure Drupal site is running
- Check URLs in config files
- Try http://localhost:8080 if needed

**Visual tests always fail**
- Run `npm run test:visual:reference` first
- Create baseline screenshots before testing

**Accessibility tests fail on dev site**
- Normal for incomplete sites
- Focus on new components
- Fix issues incrementally

### CI Issues

**GitHub Actions failing**
- Check Node version matches (18+)
- Verify all config files present
- Review CI logs for details

## Next Steps

1. **Install dependencies:** `npm install`
2. **Create baselines:** `npm run test:visual:reference`
3. **Run initial tests:** `npm test`
4. **Fix any issues** found
5. **Integrate with Cursor** for AI-assisted testing
6. **Set up CI** by pushing .github/workflows/test.yml
7. **Test before every commit**

## Support

Questions or issues with testing?
- Check TESTING.md for detailed guide
- Review error messages carefully
- Ensure Drupal site is running
- Verify all files are in place

---

**Testing ensures quality. Quality enables confidence. Confidence drives excellence.**

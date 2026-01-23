# Visual Regression Test Results

This directory stores visual regression test results and reports.

## Directory Structure

```
visual/
├── reference/          # Baseline screenshots (committed to git)
├── test/              # Current test screenshots (gitignored)
├── html_report/       # Visual comparison report (gitignored)
├── ci_report/         # CI-friendly report (gitignored)
└── engine_scripts/    # Custom BackstopJS scripts (optional)
```

## Generated During Tests

When you run `npm run test:visual`, BackstopJS creates:

- **test/** - Screenshots of current state
- **html_report/** - Interactive HTML report showing differences
- **ci_report/** - JSON report for CI systems

These are automatically gitignored and regenerated on each test run.

## Viewing Results

After running tests, BackstopJS automatically opens the HTML report in your browser.

**Manual viewing:**
```bash
open tests/visual/html_report/index.html
```

**Report shows:**
- Side-by-side before/after comparison
- Difference overlay highlighting changes
- Mismatch percentage
- Pass/fail status per scenario

## Understanding Results

**Green (Pass):**
- No visual differences detected
- Or differences within threshold

**Red (Fail):**
- Visual differences exceed threshold
- Review to determine if intentional

**Mismatch Threshold:**
- Set in backstop.json (default 0.1%)
- Accounts for anti-aliasing differences
- Adjust per scenario if needed

## Workflow

1. Make changes to theme
2. Run `npm run test:visual`
3. Review HTML report
4. If changes are correct: `npm run test:visual:approve`
5. If changes are bugs: fix code and test again

## Tips

- Only reference/ directory should be committed to git
- Review all differences carefully before approving
- Use specific selectors to test individual components
- Consider different viewports (mobile, tablet, desktop)

## Configuration

Visual regression settings in `backstop.json`:
- URLs to test
- Viewports (mobile, tablet, desktop)
- Selectors (whole page or specific elements)
- Mismatch thresholds
- Delays and interactions

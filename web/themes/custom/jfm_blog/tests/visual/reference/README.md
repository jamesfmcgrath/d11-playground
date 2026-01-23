# Visual Regression Reference Screenshots

This directory stores baseline (reference) screenshots for visual regression testing.

## How It Works

1. **First time setup:**
   ```bash
   npm run test:visual:reference
   ```
   This captures the current state as the "correct" baseline.

2. **Testing changes:**
   ```bash
   npm run test:visual
   ```
   Compares current state to these reference screenshots.

3. **Approving changes:**
   ```bash
   npm run test:visual:approve
   ```
   Updates reference screenshots with current state.

## Directory Structure

After running reference command, you'll see:

```
reference/
├── jfm_blog_theme_Homepage_0_document_0_mobile.png
├── jfm_blog_theme_Homepage_0_document_1_tablet.png
├── jfm_blog_theme_Homepage_0_document_2_desktop.png
├── jfm_blog_theme_Blog_Listing_0_document_0_mobile.png
└── ... (more screenshots)
```

## When to Update

**Update reference screenshots when:**
- You intentionally change component styles
- You add new components
- You modify layouts
- You fix visual bugs

**Don't update when:**
- Tests fail unexpectedly (fix the bug first)
- Changes are temporary
- You're not sure why something changed

## Tips

- Reference screenshots should be committed to git
- They serve as visual documentation
- Large binary files - consider Git LFS for projects with many screenshots
- Review changes carefully before approving

## Troubleshooting

**Missing screenshots:**
Run `npm run test:visual:reference` to create them.

**Tests always fail:**
Your reference might be outdated. Review changes and approve if correct.

**Screenshots look wrong:**
Check viewport sizes in backstop.json configuration.

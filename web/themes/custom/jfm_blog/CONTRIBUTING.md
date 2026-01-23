# Contributing to JFM Blog Theme

Thank you for your interest in contributing to JFM Blog Theme! This document provides guidelines and best practices for extending, improving, or contributing to this theme.

## Philosophy

This theme is built as a **reference implementation** for modern Drupal 11 theming. Every contribution should:

- **Serve a clear purpose** - No features for the sake of features
- **Teach by example** - Code should be readable and educational
- **Stay simple** - Prefer clarity over cleverness
- **Maintain accessibility** - WCAG 2.2 AA minimum, always
- **Avoid dependencies** - Vanilla CSS/JS only, no external frameworks
- **Be well-documented** - Explain why, not just what

## What We're Looking For

### Welcome Contributions

✅ **Bug fixes**
- Accessibility issues
- Layout bugs
- Cross-browser inconsistencies
- Performance problems

✅ **Documentation improvements**
- Clearer explanations
- More examples
- Corrections and clarifications
- Translation of documentation

✅ **Accessibility enhancements**
- Better ARIA support
- Screen reader improvements
- Keyboard navigation refinements
- Color contrast improvements

✅ **Performance optimizations**
- Faster load times
- Smaller file sizes
- Better Core Web Vitals scores
- Image optimization

✅ **New components** (if they meet criteria)
- Solve common, reusable problems
- Follow established patterns
- Well-documented with examples
- Accessible and performant

### Not Accepting

❌ **External dependencies**
- CSS frameworks (Bootstrap, Tailwind, etc.)
- JavaScript libraries (jQuery, React, etc.)
- Build processes (Webpack, Gulp, etc.)
- Preprocessors (Sass, Less, etc.)

❌ **Over-engineering**
- Unnecessary abstractions
- Overly complex solutions
- Feature bloat
- Framework-like patterns

❌ **Breaking changes**
- Changes that break existing implementations
- API changes without migration path
- Removal of core features

❌ **Niche features**
- Highly specific use cases
- Features for a single site
- Experimental or unstable patterns

## Code Standards

### Drupal Coding Standards

Follow [Drupal Coding Standards](https://www.drupal.org/docs/develop/standards):

**PHP:**
```php
<?php

/**
 * @file
 * Theme functions for JFM Blog.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function jfm_blog_preprocess_node(&$variables) {
  // Code here.
}
```

**Twig:**
```twig
{#
/**
 * @file
 * Brief description of template.
 */
#}
<element class="class-name">
  {% if condition %}
    {{ content }}
  {% endif %}
</element>
```

### CSS Standards

**Structure:**
```css
/**
 * Component Name
 * Brief description of component and styling approach.
 */

/* Component base styles */
.component-name {
  /* Layout */
  display: grid;
  gap: var(--space-md);
  
  /* Visual */
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  
  /* Typography */
  font-size: var(--font-size-base);
  color: var(--color-text);
  
  /* Effects */
  transition: all var(--transition-base);
}

/* Element modifiers */
.component-name__element {
  /* Styles */
}

/* Responsive (mobile-first) */
@media (min-width: 768px) {
  .component-name {
    /* Tablet/desktop enhancements */
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .component-name {
    transition-duration: 0.01ms;
  }
}
```

**Requirements:**
- Use design tokens (no magic numbers)
- Mobile-first responsive
- BEM-style naming within components
- Logical properties (padding-inline vs padding-left)
- Support prefers-reduced-motion
- No !important (except reduced-motion override)

### JavaScript Standards

**Structure:**
```javascript
/**
 * @file
 * Brief description of functionality.
 */

(function () {
  'use strict';

  /**
   * Function description.
   * 
   * @param {Type} param - Parameter description.
   * @return {Type} Return value description.
   */
  function functionName(param) {
    // Implementation
  }

  /**
   * Initialize functionality.
   */
  function init() {
    // Feature detection
    if (!('querySelector' in document)) {
      return;
    }
    
    // Setup
    functionName();
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
```

**Requirements:**
- Vanilla JavaScript only (no jQuery or libraries)
- ES6+ features allowed
- IIFE pattern for scope isolation
- Feature detection before use
- Progressive enhancement
- Accessibility first (keyboard support)

## Component Development

### Creating a New Component

**1. Identify the need**
- Is this component reusable?
- Does it solve a common problem?
- Can it be implemented simply?

**2. Plan the API**
- What props does it need?
- What's required vs optional?
- How will it be used?

**3. Create component structure**
```bash
mkdir components/new-component
cd components/new-component
touch new-component.component.yml
touch new-component.twig
touch new-component.css
```

**4. Define schema**
```yaml
# new-component.component.yml
'$schema': 'https://git.drupalcode.org/project/drupal/-/raw/11.x/core/modules/sdc/src/metadata.schema.json'
name: New Component
status: stable
description: 'Clear description of component purpose.'
props:
  type: object
  required:
    - required_prop
  properties:
    required_prop:
      type: string
      title: Prop Title
      description: Clear explanation of what this prop does.
    optional_prop:
      type: string
      title: Optional Prop
libraryOverrides:
  css:
    component:
      new-component.css: {}
```

**5. Build template**
```twig
{# new-component.twig #}
{#
/**
 * @file
 * Component description.
 *
 * Available props:
 * - required_prop: Description
 * - optional_prop: Description
 */
#}
<element class="new-component">
  <h2 class="new-component__title">{{ required_prop }}</h2>
  
  {% if optional_prop %}
    <p class="new-component__text">{{ optional_prop }}</p>
  {% endif %}
</element>
```

**6. Style component**
```css
/* new-component.css */
/**
 * New Component
 * Brief description of styling approach.
 */

.new-component {
  padding: var(--space-md);
  background-color: var(--color-surface);
}

.new-component__title {
  font-size: var(--font-size-xl);
  margin-block-end: var(--space-sm);
}

/* Responsive */
@media (min-width: 768px) {
  .new-component {
    padding: var(--space-lg);
  }
}
```

**7. Test thoroughly**
- Keyboard navigation
- Screen reader compatibility
- Mobile responsiveness
- Color contrast
- Long content handling
- Missing optional props

**8. Document**
- Add entry to COMPONENTS.md
- Include usage examples
- Document all props
- Add customization tips

### Component Checklist

Before submitting a component:

**Functionality:**
- [ ] Component works with minimal props
- [ ] Component works with all props
- [ ] Handles missing optional props gracefully
- [ ] Handles long/short content appropriately

**Accessibility:**
- [ ] Uses semantic HTML
- [ ] Keyboard navigable
- [ ] Screen reader friendly
- [ ] ARIA labels where appropriate
- [ ] Color contrast WCAG AA compliant
- [ ] Focus indicators visible
- [ ] Supports prefers-reduced-motion

**Responsive:**
- [ ] Works on mobile (< 768px)
- [ ] Works on tablet (768px - 1023px)
- [ ] Works on desktop (≥ 1024px)
- [ ] No horizontal scroll
- [ ] Touch targets 44x44px minimum

**Code Quality:**
- [ ] Follows naming conventions
- [ ] Uses design tokens
- [ ] Well-commented
- [ ] No hard-coded values
- [ ] BEM-style CSS classes
- [ ] Mobile-first media queries

**Documentation:**
- [ ] Added to COMPONENTS.md
- [ ] Props documented
- [ ] Usage examples provided
- [ ] Customization tips included

## Testing Requirements

### Accessibility Testing

**Automated:**
1. Run WAVE browser extension
2. Run axe DevTools
3. Run Lighthouse accessibility audit
4. Check color contrast ratios

**Manual:**
1. Keyboard navigation (Tab, Enter, Escape)
2. Screen reader testing (NVDA or VoiceOver)
3. Zoom to 200% (no horizontal scroll)
4. High contrast mode
5. Reduced motion verification

### Browser Testing

**Required:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Mobile:**
- iOS Safari
- Android Chrome

### Performance Testing

**Metrics to check:**
- Lighthouse performance score
- Core Web Vitals (LCP, FID, CLS)
- File sizes (CSS < 50KB, JS < 50KB)
- Image optimization

## Submission Process

### For Bug Fixes

1. **Open an issue** describing the bug
2. **Fork the repository**
3. **Create a branch:** `fix/short-description`
4. **Make your changes**
5. **Test thoroughly**
6. **Commit with clear message:** `Fix: Description of what was fixed`
7. **Submit pull request**
8. **Reference issue** in PR description

### For New Features

1. **Open an issue** proposing the feature
2. **Discuss approach** before implementing
3. **Get approval** from maintainers
4. **Fork and branch:** `feature/short-description`
5. **Implement feature**
6. **Test exhaustively**
7. **Document completely**
8. **Submit PR** with detailed description

### For Documentation

1. **Fork and branch:** `docs/short-description`
2. **Make improvements**
3. **Check for accuracy**
4. **Submit PR**

## Commit Message Format

Use clear, descriptive commit messages:

```
Type: Brief description (50 chars or less)

Longer explanation if needed. Wrap at 72 characters. Explain what
changed and why, not how (code shows how).

Fixes #123
```

**Types:**
- `Fix:` Bug fixes
- `Feat:` New features
- `Docs:` Documentation changes
- `Style:` Code style changes (formatting, no logic changes)
- `Refactor:` Code refactoring
- `Test:` Adding or updating tests
- `Perf:` Performance improvements
- `A11y:` Accessibility improvements

**Examples:**
```
Fix: Correct focus indicator color contrast

The previous focus outline didn't meet WCAG AA standards. Changed
from blue to darker shade for sufficient contrast.

Fixes #42
```

```
Feat: Add author-bio component

New component for displaying author information on article pages.
Includes avatar, name, bio, and social links.

Includes tests and documentation.
```

## Code Review Process

All submissions go through code review:

**We check for:**
- Code quality and standards compliance
- Accessibility compliance
- Performance impact
- Documentation completeness
- Test coverage
- Browser compatibility

**Review may request:**
- Code changes
- Additional tests
- Documentation improvements
- Accessibility fixes

**Be patient and responsive:**
- Address feedback constructively
- Ask questions if unclear
- Iterate based on suggestions

## Getting Help

**Questions about contributing?**
- Open an issue with the question
- Check existing issues for answers
- Review documentation first

**Need clarification on standards?**
- Refer to ARCHITECTURE.md
- Check COMPONENTS.md for examples
- Look at existing code

**Stuck on implementation?**
- Describe what you've tried
- Share relevant code
- Ask specific questions

## Development Setup

### Prerequisites
- Drupal 11 installed
- Modern browser with DevTools
- Text editor (VS Code, Cursor recommended)

### Local Setup

1. **Clone or download theme**
```bash
cd /path/to/drupal/themes/custom
git clone [repository-url] jfm_blog
```

2. **Enable theme**
```bash
drush theme:enable jfm_blog
drush config:set system.theme default jfm_blog
```

3. **Clear cache**
```bash
drush cr
```

4. **Create sample content**
- Create Article content type with field_image
- Add sample articles
- Test components

### Development Workflow

1. **Make changes** in theme files
2. **Clear cache** (if needed)
```bash
drush cr
```
3. **Test in browser**
4. **Check accessibility**
5. **Test responsiveness**
6. **Repeat**

## Coding Tips

### Use Design Tokens

**Don't:**
```css
.component {
  padding: 24px;
  color: #333333;
  font-size: 18px;
}
```

**Do:**
```css
.component {
  padding: var(--space-md);
  color: var(--color-text);
  font-size: var(--font-size-lg);
}
```

### Write Semantic HTML

**Don't:**
```html
<div class="article-header">
  <div class="article-title">Title</div>
</div>
```

**Do:**
```html
<header class="article-header">
  <h1 class="article-title">Title</h1>
</header>
```

### Mobile-First CSS

**Don't:**
```css
.component {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .component {
    grid-template-columns: 1fr;
  }
}
```

**Do:**
```css
.component {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .component {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Comment Intentionally

**Don't:**
```css
/* Makes text blue */
.link {
  color: blue;
}
```

**Do:**
```css
/* 
 * Using accent color for links to maintain brand consistency
 * and provide sufficient contrast against white background
 */
.link {
  color: var(--color-link);
}
```

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md (if we create it)
- Credited in release notes
- Thanked in commit messages

## License

By contributing, you agree that your contributions will be licensed under the same GPL-2.0-or-later license as the project.

## Questions?

Open an issue with your question. We're here to help!

## Thank You

Thank you for helping make JFM Blog Theme better for everyone. Your contributions help the entire Drupal community learn and build better, more accessible websites.

**Journey before destination. Life before death.**

# JFM Blog Theme Architecture

## Overview

JFM Blog is a modern Drupal 11 theme built as a reference implementation for Single Directory Components (SDC) architecture. It demonstrates best practices for accessible, maintainable, and performant Drupal theming without external dependencies.

## Core Architectural Decisions

### Why No Base Theme?

**Decision:** Build from scratch without inheriting from Starterkit or Stable.

**Rationale:**

- Starterkit includes templates we don't need (creates clutter)
- Base themes add cognitive overhead for AI-assisted development
- Cleaner learning path for developers studying the code
- Full control over every template and style
- Easier to understand exactly what's happening

**Trade-off:** We implement a few base templates ourselves, but gain complete transparency.

### Why Single Directory Components?

**Decision:** Use Drupal's SDC system for all reusable UI elements.

**Rationale:**

- Self-contained components (template, styles, schema in one folder)
- Portable between projects
- Clear prop contracts via JSON Schema
- No CSS specificity wars (component-scoped styles)
- Better organization than scattered templates
- AI assistants excel at generating complete component directories

**Structure:**

```
components/component-name/
├── component-name.component.yml  # Schema and metadata
├── component-name.twig           # Template
└── component-name.css            # Styles
```

### Why Vanilla CSS/JS?

**Decision:** Zero external dependencies, modern vanilla web standards only.

**Rationale:**

- **Performance:** No framework bloat, tiny CSS/JS bundles
- **Longevity:** Native web standards outlast frameworks
- **Maintainability:** No build process to break, no dependencies to update
- **Learning:** Teaches fundamental web skills, not framework-specific patterns
- **AI-friendly:** Assistants understand native CSS/JS better than framework abstractions

**Modern features we use:**

- CSS Grid & Flexbox for layouts
- CSS Custom Properties for design tokens
- Logical properties (padding-inline vs padding-left)
- ES6+ JavaScript (const, arrow functions, template literals)
- Native lazy loading for images

### Why Design Tokens?

**Decision:** Centralized design system via CSS custom properties in tokens.css.

**Rationale:**

- Single source of truth for colors, spacing, typography
- Easy theme customization (edit one file)
- Semantic naming (--color-link vs hard-coded blue)
- Components reference tokens, not magic numbers
- Supports future dark mode via property override

**Token hierarchy:**

```
Primitive tokens → Semantic tokens → Component usage
--color-neutral-900 → --color-text → color: var(--color-text)
```

## File Structure Rationale

```
jfm_blog/
├── .cursorrules              # AI assistant context
├── ARCHITECTURE.md           # This file
├── COMPONENTS.md             # Component catalog
├── README.md                 # User documentation
├── jfm_blog.info.yml        # Theme metadata
├── jfm_blog.libraries.yml   # Asset loading
├── jfm_blog.theme           # PHP preprocessing
├── css/
│   ├── tokens.css           # Design system (loaded first)
│   └── global.css           # Base styles (loaded second)
├── js/
│   └── theme.js             # Minimal enhancements
├── templates/               # Base Drupal templates only
│   ├── html.html.twig      # HTML wrapper
│   ├── page.html.twig      # Page layout
│   ├── node/               # Node-specific templates
│   └── views/              # Views-specific templates
├── components/             # SDC components (reusable UI)
│   ├── site-header/
│   ├── site-footer/
│   ├── article-card/
│   ├── article-full/
│   └── hero-cta/
└── config/install/         # Exportable configuration
```

### Why This Structure?

**Separation of concerns:**

- **css/**: Global concerns only (tokens, reset, base typography)
- **components/**: Self-contained UI elements with scoped styles
- **templates/**: Drupal-specific wrappers that compose components
- **config/**: Exportable Views, content types, etc.

**Load order matters:**

1. `tokens.css` - Design system foundation
2. `global.css` - Base styles that reference tokens
3. Component CSS loaded automatically by SDC system

## Component Architecture

### Component Anatomy

Every SDC component consists of three required files:

**1. Schema (.component.yml)**

```yaml
name: Component Name
status: stable
description: Clear explanation of purpose
props:
  type: object
  required: [required_props]
  properties:
    prop_name:
      type: string
      title: Human-readable label
```

**Purpose:**

- Define data contract
- Document props for developers
- Enable validation
- Provide auto-complete in IDEs

**2. Template (.twig)**

```twig
{#
/**
 * @file
 * Component purpose and usage notes.
 */
#}
<semantic-element class="component-name">
  {% if optional_prop %}
    <!-- conditional content -->
  {% endif %}
</semantic-element>
```

**Purpose:**

- Semantic HTML structure
- Accessibility built-in
- Minimal logic (move complexity to preprocessing)

**3. Styles (.css)**

```css
/**
 * Component Name
 * Brief description of styling approach.
 */

.component-name {
  /* Uses tokens, not hard-coded values */
  padding: var(--space-md);
  color: var(--color-text);
}

/* Mobile-first responsive */
@media (min-width: 768px) {
  .component-name {
    /* Desktop enhancements */
  }
}
```

**Purpose:**

- Component-scoped styles (no global pollution)
- Uses design tokens for consistency
- Mobile-first responsive patterns

### Component Usage Pattern

**In node templates:**

```twig
{# templates/node/node--article--teaser.html.twig #}
{% include 'jfm_blog:article-card' with {
  image: content.field_image,
  title: label,
  url: url,
  summary: content.body,
  date: node.created.value
} %}
```

**Benefits:**

- Node template is thin (just data mapping)
- Component remains reusable (could use in blocks, views, etc.)
- Clear separation: template = data prep, component = presentation

## CSS Architecture

### Token-Based Design System

**Three-tier token hierarchy:**

**Tier 1: Primitive Tokens** (raw values)

```css
--color-neutral-900: hsl(0, 0%, 10%);
--space-md: 1.5rem;
--font-size-base: 1rem;
```

**Tier 2: Semantic Tokens** (purpose-mapped)

```css
--color-text: var(--color-neutral-900);
--button-padding: var(--space-md);
--body-font-size: var(--font-size-base);
```

**Tier 3: Component Usage** (implementation)

```css
.article-card__title {
  color: var(--color-text);
  padding: var(--button-padding);
  font-size: var(--body-font-size);
}
```

### Why This Approach?

**Flexibility:** Change primitive value once, updates everywhere.

**Semantics:** `--color-text` is clearer than `--color-neutral-900`.

**Theme-ability:** Override semantic tokens for variations (dark mode, brand themes).

### CSS Scoping Strategy

**Global CSS (css/global.css):**

- CSS reset
- Base typography
- Skip link
- Layout utilities
- Accessibility features (focus-visible)
- Reduced motion support

**Component CSS:**

- Scoped to component class
- No descendant selectors crossing component boundaries
- BEM naming within component
- No !important (except prefers-reduced-motion)

**Why this works:**

- No specificity battles
- Components can't break each other
- Easy to reason about styles
- Safe to delete components (styles go with them)

## JavaScript Architecture

### Progressive Enhancement Philosophy

**Core principle:** Site works without JavaScript, JS enhances experience.

**Implementation:**

- Forms submit without AJAX
- Navigation accessible without menu toggling
- Content readable without JS lazy-loading
- Links work (no JS-dependent routing)

**JS enhancements we provide:**

- Smooth scroll for anchor links
- Skip link focus management
- Mobile menu toggle (if needed)

### Vanilla JS Pattern

```javascript
(function () {
  "use strict";

  // Feature detection
  if (!("querySelector" in document)) {
    return; // Graceful degradation
  }

  function init() {
    // Setup event listeners
  }

  // DOM ready initialization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
```

**Why IIFE (Immediately Invoked Function Expression)?**

- Avoids global scope pollution
- Standard Drupal pattern
- Works without module bundlers

**Why feature detection?**

- Graceful degradation for old browsers
- Progressive enhancement pattern

## Accessibility Architecture

### WCAG 2.2 AA Compliance Strategy

**1. Semantic HTML First**

- Use proper elements (header, nav, main, article)
- ARIA only when semantic HTML insufficient
- Heading hierarchy (single h1, logical h2-h6)

**2. Keyboard Navigation**

- All interactive elements in tab order
- Focus-visible styles (2px outline, high contrast)
- Skip to main content link
- No keyboard traps

**3. Color & Contrast**

- 4.5:1 minimum for body text
- 3:1 minimum for large text and UI components
- Never rely on color alone for information
- Test in high contrast mode

**4. Screen Reader Support**

- Alt text required in component schemas
- ARIA labels on navigation
- ARIA landmarks (banner, navigation, main, contentinfo)
- Announce dynamic content changes (if we add AJAX)

**5. Motion & Animation**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Accessibility Testing Checklist

**Automated testing:**

- WAVE browser extension
- axe DevTools
- Lighthouse accessibility audit

**Manual testing:**

- Keyboard navigation (Tab, Enter, Escape)
- Screen reader (NVDA on Windows, VoiceOver on Mac)
- Zoom to 200% (no horizontal scroll)
- High contrast mode

**Per-component testing:**

- Focus indicator visible on all interactive elements
- Logical tab order
- Screen reader announces content correctly
- Works at mobile viewport

## Performance Architecture

### Core Web Vitals Targets

**LCP (Largest Contentful Paint):** < 2.5s

- Use system fonts (zero web font latency)
- Lazy-load below-fold images
- Inline critical CSS (or use single optimized file)

**FID (First Input Delay):** < 100ms

- Minimal JavaScript (< 50KB compressed)
- Defer non-critical JS
- No blocking third-party scripts

**CLS (Cumulative Layout Shift):** < 0.1

- Set aspect-ratio on images
- Reserve space for dynamic content
- No layout shifts after page load

### Asset Loading Strategy

**CSS:**

```yaml
# jfm_blog.libraries.yml
global:
  css:
    theme:
      css/tokens.css: {} # Loaded first
      css/global.css: {} # Loaded second
```

**Component CSS:**

- Automatically loaded by SDC system when component used
- Only loads CSS for components actually on page
- Scoped to component (no unused styles)

**JavaScript:**

```yaml
js:
  js/theme.js: {}
dependencies:
  - core/drupal # Ensures Drupal core loads first
```

**Why single CSS/JS files?**

- HTTP/2 makes multiple requests cheap
- But single files still simplest (no build process)
- Tiny files anyway (tokens ~2KB, global ~8KB, theme.js ~2KB)

### Image Strategy

**Responsive images:**

```twig
<img
  srcset="image-320.jpg 320w, image-640.jpg 640w"
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  decoding="async"
  alt="{{ alt_text }}"
>
```

**Drupal handles:**

- Image style generation (multiple sizes)
- WebP conversion (if configured)
- Lazy loading via core

**We provide:**

- Aspect-ratio CSS to prevent layout shift
- Alt text requirements in component schemas

## Responsive Design Architecture

### Mobile-First Approach

**Base styles target smallest screens:**

```css
.component {
  /* Mobile layout */
  display: block;
}

@media (min-width: 768px) {
  .component {
    /* Tablet enhancements */
    display: grid;
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop enhancements */
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Why mobile-first?**

- Forces prioritization (essential features first)
- Better performance on mobile (loads less)
- Progressive enhancement pattern
- Simpler mental model (enhance up, not reduce down)

### Breakpoint Strategy

**Two breakpoints:**

- **768px:** Tablet and up
- **1024px:** Desktop and up

**Why only two?**

- Simpler to maintain
- Fewer edge cases
- Mobile and desktop are the critical viewports
- Tablet inherits mobile with minor enhancements

### Layout Patterns

**Card grids:**

```css
.blog-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: single column */
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: two columns */
  }
}

@media (min-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: three columns */
  }
}
```

**Content width:**

```css
.article-full__container {
  max-width: var(--content-width); /* 800px for readability */
  margin-inline: auto;
  padding-inline: var(--space-md);
}
```

## Integration with Drupal

### Theme Hook Integration

**Minimal preprocessing:**

```php
function jfm_blog_preprocess_node(&$variables) {
  // Only add data not available in template
  $node = $variables['node'];
  $variables['reading_time'] = calculate_reading_time($node);
}
```

**Why minimal?**

- Logic in PHP is harder to see/maintain
- Template should handle most data mapping
- Preprocessing for computed values only

### Views Integration

**Views use components via custom templates:**

```twig
{# templates/views/views-view-unformatted--blog.html.twig #}
<div class="blog-grid">
  {% for row in rows %}
    {{ row.content }}
  {% endfor %}
</div>
```

**Node teaser view mode includes component:**

```twig
{# templates/node/node--article--teaser.html.twig #}
{% include 'jfm_blog:article-card' with { ... } %}
```

**Why this pattern?**

- Views outputs nodes
- Nodes include components
- Components remain reusable
- Clear separation of concerns

## Future Extensibility

### Adding New Components

**Process:**

1. Create component directory
2. Define schema in .component.yml
3. Build template with semantic HTML
4. Style using design tokens
5. Test accessibility
6. Document in COMPONENTS.md

**Components should be:**

- Self-contained (no dependencies on other components)
- Reusable (useful in multiple contexts)
- Accessible (WCAG 2.2 AA compliant)
- Documented (clear prop descriptions)

### Theme Customization Paths

**Easy customizations (edit tokens.css):**

- Colors
- Spacing scale
- Typography (fonts, sizes)
- Border radius
- Shadows

**Medium customizations (edit component CSS):**

- Component-specific styling
- Layout adjustments
- Hover effects

**Advanced customizations (add components):**

- New UI patterns
- Additional content types
- Custom layouts

### Sub-theming Strategy

**If you need variations:**

1. **Create sub-theme:**

```yaml
# my_subtheme.info.yml
name: My Subtheme
base theme: jfm_blog
```

2. **Override tokens:**

```css
/* my_subtheme/css/tokens-override.css */
:root {
  --color-accent-500: hsl(150, 70%, 50%); /* Green instead of blue */
}
```

3. **Extend or override components:**

```
my_subtheme/components/article-card/
└── article-card.css  /* Override just the styles */
```

## Design Decisions Summary

| Decision                | Why                                 | Trade-off                           |
| ----------------------- | ----------------------------------- | ----------------------------------- |
| No base theme           | Full control, clarity               | Implement base templates ourselves  |
| SDC architecture        | Self-contained, portable components | Requires Drupal 11+                 |
| Vanilla CSS/JS          | No dependencies, longevity          | Write more code vs. using framework |
| Design tokens           | Centralized theming, consistency    | One more concept to learn           |
| Mobile-first            | Better mobile performance           | Think mobile constraints first      |
| Single CSS file         | Simple, no build process            | Can't tree-shake unused styles      |
| Progressive enhancement | Works without JS                    | Can't rely on JS for core features  |
| WCAG 2.2 AA             | Accessible by default               | Extra testing required              |

## Learning Resources

**Drupal SDC:**

- https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components

**CSS Modern Features:**

- CSS Grid: https://css-tricks.com/snippets/css/complete-guide-grid/
- CSS Custom Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- Logical Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values

**Accessibility:**

- WCAG 2.2: https://www.w3.org/WAI/WCAG22/quickref/
- WebAIM: https://webaim.org/

**Drupal Theming:**

- https://www.drupal.org/docs/theming-drupal

## Version History

**1.0.0 (2025-01-23)**

- Initial architecture
- Six core components
- Design token system
- Accessibility foundation
- Zero dependencies

**Future considerations:**

- Dark mode support (via token overrides)
- Additional components as needed
- Performance optimizations
- Enhanced documentation

# JFM Blog Theme Quick Start Guide

Practical guide to get up and running with JFM Blog Theme quickly.

## Installation (5 minutes)

### 1. Place Theme in Drupal

```bash
# Navigate to themes directory
cd /path/to/drupal/web/themes/custom

# Download or clone theme
# (method depends on how you're distributing)
```

### 2. Enable Theme

**Via Drush:**

```bash
drush theme:enable jfm_blog
drush config:set system.theme default jfm_blog
drush cr
```

**Via UI:**

1. Navigate to: Appearance
2. Click "Install and set as default" for JFM Blog
3. Clear cache

### 3. Configure Blocks

**Place these blocks:**

1. **Header region:** System Branding block
2. **Footer region:** Footer block
3. **Hero region (optional):** Custom Hero CTA block

**Navigation:**
Structure > Block layout > Place blocks in regions

### 4. Create Content Type

**Article content type needs:**

- Title (default)
- Body (default, formatted text)
- Featured Image (image field)
- Tags (taxonomy reference to Tags vocabulary)

**Create if not exists:**

```bash
# Via Drush (if using config)
drush cim --partial --source=/path/to/theme/config/install

# Or create manually via UI
```

### 5. Test

1. Create sample article with image
2. Visit `/blog` to see listing
3. Click article to see full display
4. Check mobile responsiveness

## Common Tasks

### Adding a New Component

**In Cursor, type:**

```
Create a new component called author-bio with props: name, bio, avatar, social_links
```

**Cursor will generate:**

```
components/author-bio/
├── author-bio.component.yml
├── author-bio.twig
└── author-bio.css
```

**Then:**

1. Review generated files
2. Test component
3. Document in COMPONENTS.md

### Customizing Colors

**Edit `css/tokens.css`:**

```css
:root {
  /* Change accent color */
  --color-accent-500: hsl(150, 70%, 50%); /* Green instead of blue */

  /* Change text color */
  --color-text: hsl(0, 0%, 20%); /* Darker gray */
}
```

**Save and clear cache:**

```bash
drush cr
```

### Customizing Spacing

**Edit `css/tokens.css`:**

```css
:root {
  /* Make spacing tighter */
  --space-md: 1rem; /* Was 1.5rem */
  --space-lg: 1.5rem; /* Was 2rem */
}
```

### Customizing Typography

**Edit `css/tokens.css`:**

```css
:root {
  /* Use custom font */
  --font-base: 'Inter', system-ui, sans-serif;

  /* Increase base size */
  --font-size-base: 1.125rem; /* Was 1rem */
}
```

**If using web fonts, add to libraries.yml:**

```yaml
global:
  css:
    theme:
      https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap:
        type: external
        minified: true
      css/tokens.css: {}
      css/global.css: {}
```

### Adding Custom Block Type

**In Cursor, type:**

```
Create a custom block type for hero section that uses the hero-cta component
```

**Then configure via UI or config:**

1. Structure > Block layout > Custom block library
2. Add block type
3. Add fields
4. Create block template that uses component

### Modifying Existing Component

**Example: Change article-card hover effect**

**In Cursor, type:**

```
Modify article-card component to remove image zoom on hover
```

**Or manually edit:**

```css
/* components/article-card/article-card.css */

/* Remove or comment out: */
/*
.article-card:hover .article-card__image img {
  transform: scale(1.05);
}
*/
```

### Creating Custom View

1. **Create view** (Structure > Views > Add new view)
2. **Configure settings:**
   - Display: Page or Block
   - Format: Unformatted list
   - Row style: Rendered entity (Teaser)
3. **Save view**
4. **Create custom template** if needed

**In Views template, use blog-grid pattern:**

```twig
{# templates/views/views-view-unformatted--your-view.html.twig #}
<div class="blog-grid">
  {% for row in rows %}
    <div class="blog-grid__item">
      {{ row.content }}
    </div>
  {% endfor %}
</div>
```

## Cursor Workflows

### Quick Component Generation

**Prompt pattern:**

```
"Create [component-name] component with props: [prop-list]"
```

**Examples:**

```
"Create newsletter-signup component with props: heading, subheading, button_text"

"Create tag-list component with props: tags (array), show_count (boolean)"

"Create breadcrumbs component with props: items (array)"
```

### Modify Existing Component

**Prompt pattern:**

```
"Modify [component-name] to [change-description]"
```

**Examples:**

```
"Modify article-card to add reading time display"

"Modify site-header to make logo larger on desktop"

"Modify hero-cta to support background image"
```

### Create Template

**Prompt pattern:**

```
"Create [template-type] template that uses [component-name] component"
```

**Examples:**

```
"Create node--article template that uses article-full component"

"Create block--hero template that uses hero-cta component"

"Create views template for blog listing that uses article-card components"
```

### Style Adjustments

**Prompt pattern:**

```
"Update [component-name] styles to [change-description]"
```

**Examples:**

```
"Update article-card styles to use horizontal layout on desktop"

"Update site-header styles to have transparent background on homepage"

"Update hero-cta styles to use full-width background image"
```

## Debugging

### Component Not Showing

**Check:**

1. Component files exist in `components/component-name/`
2. Component name matches in all three files
3. Template includes component correctly: `{% include 'jfm_blog:component-name' %}`
4. Cache cleared: `drush cr`

### Styles Not Applying

**Check:**

1. CSS file listed in component.yml `libraryOverrides`
2. Cache cleared
3. Browser DevTools shows CSS loading
4. Selector specificity (use more specific selectors if needed)
5. Design tokens loaded (tokens.css before component CSS)

### Props Not Passing

**Check:**

1. Props defined in component.yml schema
2. Include statement passes correct props
3. Variable names match (snake_case in Twig)
4. Props available in context (`{{ kint(prop_name) }}` for debugging)

### Layout Issues

**Check:**

1. Mobile-first media queries
2. Container max-widths
3. Padding/margin values
4. Grid/flexbox properties
5. Browser DevTools computed styles

## Cheat Sheet

### Design Tokens Reference

**Colors:**

```css
--color-text           /* Main text color */
--color-text-muted     /* Secondary text color */
--color-background     /* Page background */
--color-surface        /* Card/component background */
--color-border         /* Border color */
--color-link           /* Link color */
--color-link-hover     /* Link hover color */
--color-accent-500     /* Primary accent */
```

**Spacing:**

```css
--space-xs    /* 8px */
--space-sm    /* 16px */
--space-md    /* 24px */
--space-lg    /* 32px */
--space-xl    /* 48px */
--space-2xl   /* 64px */
```

**Typography:**

```css
--font-base           /* System font stack */
--font-size-sm        /* 14px */
--font-size-base      /* 16px */
--font-size-lg        /* 18px */
--font-size-xl        /* 24px */
--font-size-2xl       /* 32px */
--font-size-3xl       /* 48px */
--line-height-tight   /* 1.2 */
--line-height-base    /* 1.6 */
--line-height-loose   /* 1.8 */
```

**Layout:**

```css
--content-width       /* 800px - Article max width */
--page-width          /* 1200px - Page max width */
--border-radius       /* 0.25rem */
```

**Effects:**

```css
--transition-base     /* 150ms ease-in-out */
--shadow-sm           /* Small shadow */
--shadow-md           /* Medium shadow */
```

### Common CSS Patterns

**Centering content:**

```css
.container {
  max-width: var(--content-width);
  margin-inline: auto;
  padding-inline: var(--space-md);
}
```

**Grid layout:**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
}
```

**Card component:**

```css
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--space-md);
}
```

**Button:**

```css
.button {
  display: inline-block;
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--color-accent-500);
  color: white;
  border-radius: var(--border-radius);
  transition: all var(--transition-base);
}

.button:hover {
  background-color: var(--color-accent-600);
}
```

**Responsive image:**

```css
.image-wrapper {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Component Include Patterns

**Basic include:**

```twig
{% include 'jfm_blog:component-name' with {
  prop: value
} %}
```

**Include with field:**

```twig
{% include 'jfm_blog:article-card' with {
  image: content.field_image,
  title: label
} %}
```

**Include with conditional:**

```twig
{% if content.field_hero %}
  {% include 'jfm_blog:hero-cta' with {
    heading: content.field_hero.0.heading
  } %}
{% endif %}
```

**Include in loop:**

```twig
{% for item in items %}
  {% include 'jfm_blog:article-card' with {
    title: item.title,
    url: item.url
  } %}
{% endfor %}
```

### Drush Commands

```bash
# Clear cache
drush cr

# Enable theme
drush theme:enable jfm_blog

# Set default theme
drush config:set system.theme default jfm_blog

# Export configuration
drush config:export

# Import configuration
drush config:import

# Generate sample content (if module installed)
drush devel-generate:content 10 --bundles=article
```

## Testing Checklist

Before deploying changes:

**Browser Testing:**

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari
- [ ] Android Chrome

**Responsive Testing:**

- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (≥ 1024px)

**Accessibility Testing:**

- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Color contrast passes
- [ ] Focus indicators visible
- [ ] WAVE scan passes
- [ ] Lighthouse accessibility 100

**Performance Testing:**

- [ ] Lighthouse performance > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

## Resources

**Documentation:**

- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
- [COMPONENTS.md](COMPONENTS.md) - Component catalog
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [README.md](README.md) - User documentation

**Drupal Resources:**

- [Single Directory Components](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components)
- [Theming Guide](https://www.drupal.org/docs/theming-drupal)
- [Twig Template Naming](https://www.drupal.org/docs/theming-drupal/twig-in-drupal/twig-template-naming-conventions)

**Web Standards:**

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

**Accessibility:**

- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## Getting Help

**Questions?**

1. Check documentation first
2. Search existing issues
3. Open new issue with details

**Found a bug?**

1. Verify it's reproducible
2. Check existing issues
3. Create detailed bug report

**Want to contribute?**

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Open issue to discuss
3. Submit pull request

## Next Steps

1. **Customize design tokens** to match your brand
2. **Create sample content** to test components
3. **Add new components** as needed
4. **Test accessibility** thoroughly
5. **Optimize performance** before launch
6. **Share your experience** with the community

## Tips for Success

**Keep it simple:**

- Don't add complexity unless needed
- Start with core components
- Add features incrementally

**Test early and often:**

- Test on real devices
- Use accessibility tools
- Check performance regularly

**Document as you go:**

- Comment your code
- Update COMPONENTS.md
- Keep README current

**Stay accessible:**

- Always test keyboard navigation
- Check color contrast
- Run automated scans

**Learn from the code:**

- Read existing components
- Follow established patterns
- Ask questions when unclear

---

**Ready to build something radiant? Let's go!**

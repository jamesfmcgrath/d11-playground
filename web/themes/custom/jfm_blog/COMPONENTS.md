# JFM Blog Theme Components

Complete catalog of all Single Directory Components (SDC) in the JFM Blog theme.

## Component Index

1. [site-header](#site-header) - Main site header with logo and navigation
2. [site-footer](#site-footer) - Simple copyright footer
3. [article-card](#article-card) - Blog post teaser for listings
4. [article-full](#article-full) - Full blog post display
5. [hero-cta](#hero-cta) - Optional homepage hero section

---

## site-header

**Purpose:** Main site header with logo/site name and primary navigation. Sticky on scroll.

**Location:** `components/site-header/`

**Files:**
- `site-header.component.yml` - Component schema
- `site-header.twig` - Template markup
- `site-header.css` - Component styles

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `site_name` | string | No | Site name text (displays if no logo) |
| `site_logo` | string | No | URL to logo image |
| `menu_items` | array | No | Array of menu item objects |

**menu_items structure:**
```yaml
menu_items:
  - title: "Home"
    url: "/"
  - title: "Blog"
    url: "/blog"
  - title: "Contact"
    url: "/contact"
```

### Usage Examples

**With logo and navigation:**
```twig
{% include 'jfm_blog:site-header' with {
  site_logo: '/themes/custom/jfm_blog/logo.svg',
  site_name: 'JFM Blog',
  menu_items: [
    { title: 'Home', url: '/' },
    { title: 'Blog', url: '/blog' },
    { title: 'About', url: '/about' },
    { title: 'Contact', url: '/contact' }
  ]
} %}
```

**With site name only (no logo):**
```twig
{% include 'jfm_blog:site-header' with {
  site_name: 'My Blog',
  menu_items: primary_menu_items
} %}
```

**In block template:**
```twig
{# templates/block/block--system-branding-block.html.twig #}
{% include 'jfm_blog:site-header' with {
  site_name: site_name,
  site_logo: site_logo,
  menu_items: [] {# Menu rendered separately #}
} %}
```

### Accessibility Features

- `role="banner"` on header element
- `role="navigation"` with `aria-label="Main navigation"` on nav
- Keyboard accessible menu items
- Focus-visible styles on all links
- Mobile menu collapsed by default (enhanced with JS if needed)

### Responsive Behavior

**Mobile (< 768px):**
- Logo/site name on left
- Navigation stacks below on separate row
- Full-width navigation links

**Tablet/Desktop (≥ 768px):**
- Logo/site name on left
- Horizontal navigation on right
- Same row layout

### Styling Notes

- Sticky positioning (stays visible on scroll)
- Background: `--color-surface` (white)
- Border bottom: `--color-border`
- Uses `--space-sm` and `--space-md` for spacing
- Logo height: 40px
- Link hover: `--color-link-hover`

### Customization Tips

**Change logo size:**
```css
/* In site-header.css or custom CSS */
.site-header__logo img {
  height: 60px; /* Default is 40px */
}
```

**Change sticky behavior:**
```css
.site-header {
  position: relative; /* Remove sticky */
}
```

**Add shadow on scroll:**
```javascript
// In theme.js
window.addEventListener('scroll', function() {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 0) {
    header.classList.add('site-header--scrolled');
  } else {
    header.classList.remove('site-header--scrolled');
  }
});
```

---

## site-footer

**Purpose:** Simple site footer with copyright text.

**Location:** `components/site-footer/`

**Files:**
- `site-footer.component.yml` - Component schema
- `site-footer.twig` - Template markup
- `site-footer.css` - Component styles

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `copyright` | string | No | Copyright text (defaults to current year) |

### Usage Examples

**Default (auto-generates copyright):**
```twig
{% include 'jfm_blog:site-footer' %}
{# Outputs: © 2025 All rights reserved. #}
```

**Custom copyright text:**
```twig
{% include 'jfm_blog:site-footer' with {
  copyright: '© 2025 JFM Digital Works. All rights reserved.'
} %}
```

**With additional footer content:**
```twig
<div class="footer-wrapper">
  {# Additional footer content here #}
  
  {% include 'jfm_blog:site-footer' with {
    copyright: site_copyright
  } %}
</div>
```

### Accessibility Features

- `role="contentinfo"` on footer element
- Centered text for easy scanning
- Sufficient color contrast (uses `--color-text-muted`)

### Responsive Behavior

**All viewports:**
- Centered text
- Consistent padding
- Full-width background

### Styling Notes

- Background: `--color-surface` (white)
- Border top: `--color-border`
- Text color: `--color-text-muted` (lighter gray)
- Font size: `--font-size-sm` (14px)
- Padding: `--space-lg` vertical

### Customization Tips

**Add footer links:**
```twig
{# Create custom footer template #}
<footer class="site-footer" role="contentinfo">
  <div class="site-footer__container">
    <nav class="site-footer__nav">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </nav>
    <p class="site-footer__copyright">
      {{ copyright }}
    </p>
  </div>
</footer>
```

**Change to dark footer:**
```css
.site-footer {
  background-color: var(--color-neutral-900);
  color: var(--color-neutral-50);
  border-block-start: none;
}
```

---

## article-card

**Purpose:** Blog post teaser card for use in listings, grids, and featured content areas.

**Location:** `components/article-card/`

**Files:**
- `article-card.component.yml` - Component schema
- `article-card.twig` - Template markup
- `article-card.css` - Component styles

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Article title |
| `url` | string | Yes | Article URL |
| `image` | object | No | Featured image render array |
| `summary` | string | No | Article excerpt/summary |
| `date` | string | No | Publication date (any format) |

### Usage Examples

**Full card with all props:**
```twig
{% include 'jfm_blog:article-card' with {
  image: content.field_image,
  title: 'How to Build Modern Drupal Themes',
  url: '/blog/modern-drupal-themes',
  summary: 'Learn how to build accessible, performant Drupal themes using Single Directory Components and modern CSS.',
  date: '2025-01-23'
} %}
```

**Minimal card (title and URL only):**
```twig
{% include 'jfm_blog:article-card' with {
  title: node.title.value,
  url: node_url
} %}
```

**In node teaser template:**
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

**In Views template:**
```twig
{# templates/views/views-view-unformatted--blog.html.twig #}
<div class="blog-grid">
  {% for row in rows %}
    <div class="blog-grid__item">
      {{ row.content }}
    </div>
  {% endfor %}
</div>
```

### Accessibility Features

- Semantic `<article>` element
- Title wrapped in `<h2>` (assumes listing context)
- Image link has `tabindex="-1"` (title link is primary)
- Image link has `aria-hidden="true"` (avoids duplicate announcements)
- Date uses proper `<time>` element with `datetime` attribute
- Extended clickable area (::after pseudo-element)

### Responsive Behavior

**All viewports:**
- Flex column layout
- Image maintains 16:9 aspect ratio
- Card fills available height (for equal-height grids)

**Hover/Focus:**
- Subtle box shadow
- Image scales slightly (1.05x)
- Smooth transitions

### Styling Notes

- Background: `--color-surface` (white card on colored background)
- Border: `--color-border`
- Border radius: `--border-radius`
- Padding: `--space-md`
- Gaps: `--space-sm`
- Transitions: `--transition-base`

### Customization Tips

**Horizontal layout (image on left):**
```css
@media (min-width: 768px) {
  .article-card--horizontal {
    flex-direction: row;
  }
  
  .article-card--horizontal .article-card__image {
    width: 40%;
    aspect-ratio: 1;
  }
  
  .article-card--horizontal .article-card__content {
    width: 60%;
  }
}
```

**Featured card styling:**
```css
.article-card--featured {
  border: 2px solid var(--color-accent-500);
  box-shadow: var(--shadow-md);
}
```

**Remove image zoom effect:**
```css
.article-card:hover .article-card__image img {
  transform: none; /* Remove scale(1.05) */
}
```

---

## article-full

**Purpose:** Full blog post display with featured image, metadata, content, and tags.

**Location:** `components/article-full/`

**Files:**
- `article-full.component.yml` - Component schema
- `article-full.twig` - Template markup
- `article-full.css` - Component styles

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Article title |
| `body` | string | Yes | Article content (HTML) |
| `featured_image` | object | No | Featured image render array |
| `date` | string | No | Publication date |
| `author` | string | No | Author name |
| `tags` | array | No | Array of tag objects |

**tags structure:**
```yaml
tags:
  - name: "Drupal"
    url: "/blog/tags/drupal"
  - name: "Theming"
    url: "/blog/tags/theming"
```

### Usage Examples

**Full article with all props:**
```twig
{% include 'jfm_blog:article-full' with {
  featured_image: content.field_image,
  title: 'Modern Drupal Theming',
  date: '2025-01-23',
  author: 'James Marks',
  body: content.body,
  tags: [
    { name: 'Drupal', url: '/blog/tags/drupal' },
    { name: 'Theming', url: '/blog/tags/theming' }
  ]
} %}
```

**Minimal article (title and body only):**
```twig
{% include 'jfm_blog:article-full' with {
  title: node.title.value,
  body: content.body
} %}
```

**In node template:**
```twig
{# templates/node/node--article.html.twig #}
{% include 'jfm_blog:article-full' with {
  featured_image: content.field_image,
  title: label,
  date: node.created.value,
  author: node.owner.entity.displayName,
  tags: content.field_tags,
  body: content.body
} %}
```

### Accessibility Features

- Semantic `<article>` element
- Title as `<h1>` (main page heading)
- Metadata in `<time>` element with proper datetime
- Tags in `<footer>` (article footer, not page footer)
- Optimal reading width (800px max)
- Large line height for readability (1.8)

### Responsive Behavior

**All viewports:**
- Featured image spans full width
- Content centered with max-width 800px
- Padding prevents edge-to-edge text

**Mobile optimizations:**
- Larger font size reduces (via clamp if used)
- Spacing adjusts proportionally

### Styling Notes

- Featured image: 21:9 aspect ratio (cinematic)
- Max content width: `--content-width` (800px)
- Font size: `--font-size-lg` (18px for readability)
- Line height: `--line-height-loose` (1.8)
- Metadata font size: `--font-size-sm`
- Tags: Pills with background color

**Body content styles:**
- H2/H3 get extra top margin for breathing room
- Images centered with margin
- Blockquotes have left border accent
- Code blocks styled (if added)

### Customization Tips

**Change featured image aspect ratio:**
```css
.article-full__image {
  aspect-ratio: 16 / 9; /* More standard ratio */
}
```

**Wider reading column:**
```css
.article-full__container {
  max-width: 1000px; /* Default is 800px */
}
```

**Add reading time:**
```twig
<div class="article-full__meta">
  {% if date %}
    <time datetime="{{ date|date('c') }}">{{ date|date('F j, Y') }}</time>
  {% endif %}
  
  {% if reading_time %}
    <span class="article-full__reading-time">{{ reading_time }} min read</span>
  {% endif %}
</div>
```

**Style tag pills differently:**
```css
.article-full__tag {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-accent-500);
}

.article-full__tag:hover {
  background-color: var(--color-accent-500);
  color: white;
  border-color: var(--color-accent-500);
}
```

---

## hero-cta

**Purpose:** Optional hero section with heading, subheading, and call-to-action buttons. Typically used on homepage.

**Location:** `components/hero-cta/`

**Files:**
- `hero-cta.component.yml` - Component schema
- `hero-cta.twig` - Template markup
- `hero-cta.css` - Component styles

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `heading` | string | Yes | Main heading text |
| `subheading` | string | No | Supporting text below heading |
| `primary_cta` | object | No | Primary button object |
| `secondary_cta` | object | No | Secondary button object |

**CTA object structure:**
```yaml
primary_cta:
  text: "Get Started"
  url: "/get-started"
  
secondary_cta:
  text: "Learn More"
  url: "/about"
```

### Usage Examples

**Full hero with both CTAs:**
```twig
{% include 'jfm_blog:hero-cta' with {
  heading: 'Modern, secure web solutions for a digital-first world',
  subheading: 'JFM Digital Works specializes in accessible, performant, and cloud-native digital experiences.',
  primary_cta: {
    text: 'Get In Touch',
    url: '#contact'
  },
  secondary_cta: {
    text: 'Our Services',
    url: '#services'
  }
} %}
```

**Simple hero (heading only):**
```twig
{% include 'jfm_blog:hero-cta' with {
  heading: 'Welcome to Our Blog'
} %}
```

**With single CTA:**
```twig
{% include 'jfm_blog:hero-cta' with {
  heading: 'Read Our Latest Posts',
  subheading: 'Insights on modern web development',
  primary_cta: {
    text: 'Browse Articles',
    url: '/blog'
  }
} %}
```

**In block:**
```twig
{# templates/block/block--hero-cta.html.twig #}
{% include 'jfm_blog:hero-cta' with {
  heading: content.field_heading[0].value,
  subheading: content.field_subheading[0].value,
  primary_cta: {
    text: content.field_primary_text[0].value,
    url: content.field_primary_link[0].uri
  }
} %}
```

### Accessibility Features

- Semantic `<section>` element
- Heading as `<h1>` or configurable heading level
- Buttons are actual `<a>` links (not `<button>` elements)
- Sufficient color contrast on buttons
- Touch-friendly button sizes (min 44x44px)

### Responsive Behavior

**Mobile (< 768px):**
- Centered text
- Stacked buttons (full width)
- Reduced heading size

**Desktop (≥ 768px):**
- Centered text
- Inline buttons with spacing
- Larger heading size

### Styling Notes

- Background: Gradient from `--color-background` to `--color-neutral-100`
- Text align: Center
- Max width: `--content-width`
- Padding: `--space-2xl` vertical
- Primary button: Solid `--color-accent-500` background
- Secondary button: Outlined, transparent background

**Button interactions:**
- Primary hover: Darker shade, slight lift, shadow
- Secondary hover: Fills with accent color
- Smooth transitions

### Customization Tips

**Change background:**
```css
.hero-cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-cta__heading,
.hero-cta__subheading {
  color: white;
}
```

**Left-aligned hero:**
```css
.hero-cta {
  text-align: left;
}

.hero-cta__actions {
  justify-content: flex-start;
}
```

**Add background image:**
```css
.hero-cta {
  background-image: url('/path/to/image.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  position: relative;
}

.hero-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  z-index: 0;
}

.hero-cta__container {
  position: relative;
  z-index: 1;
}
```

---

## Component Usage Patterns

### In Block Layouts

Place components in Drupal regions via Block Layout:

1. Navigate to: Structure > Block Layout
2. Place block in desired region (e.g., Header, Hero, Content)
3. Configure block to render component

**Example: Header block**
```twig
{# templates/block/block--system-branding-block.html.twig #}
{% include 'jfm_blog:site-header' with {
  site_name: site_name,
  site_logo: site_logo
} %}
```

### In Node Templates

Map node fields to component props:

```twig
{# templates/node/node--article.html.twig #}
{% include 'jfm_blog:article-full' with {
  featured_image: content.field_image,
  title: label,
  date: node.created.value,
  author: node.owner.entity.displayName,
  tags: content.field_tags,
  body: content.body
} %}
```

### In Views

Views templates compose components:

```twig
{# templates/views/views-view-unformatted--blog.html.twig #}
<div class="blog-grid">
  {% for row in rows %}
    <div class="blog-grid__item">
      {{ row.content }} {# Node teaser includes article-card #}
    </div>
  {% endfor %}
</div>
```

### In Custom Blocks

Create custom block types that use components:

```yaml
# config/install/block_content.type.hero.yml
langcode: en
status: true
id: hero
label: Hero
description: 'Hero section with heading and CTAs'
```

Then in block template:
```twig
{# templates/block/block-content--hero.html.twig #}
{% include 'jfm_blog:hero-cta' with {
  heading: content.field_heading[0].value,
  # ...map other fields
} %}
```

## Grid Layouts Using Components

### Blog Listing Grid

```twig
{# In views template or custom page #}
<div class="blog-grid">
  {% for article in articles %}
    {% include 'jfm_blog:article-card' with {
      image: article.image,
      title: article.title,
      url: article.url,
      summary: article.summary,
      date: article.date
    } %}
  {% endfor %}
</div>
```

**Corresponding CSS:**
```css
/* In global.css or custom CSS */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
  max-width: var(--page-width);
  margin-inline: auto;
}

@media (max-width: 767px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
```

## Testing Components

### Manual Testing Checklist

For each component, verify:

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces correctly
- [ ] Color contrast sufficient
- [ ] ARIA labels present where needed

**Responsive:**
- [ ] Works on mobile (< 768px)
- [ ] Works on tablet (768px - 1023px)
- [ ] Works on desktop (≥ 1024px)
- [ ] No horizontal scroll at any size
- [ ] Touch targets at least 44x44px

**Content:**
- [ ] Works with minimal props
- [ ] Works with all props
- [ ] Handles long text gracefully
- [ ] Handles missing optional props

**Performance:**
- [ ] Images lazy load
- [ ] No layout shift (CLS)
- [ ] Animations respect prefers-reduced-motion

### Component Isolation Testing

Test components in isolation using Storybook or simple HTML page:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/themes/custom/jfm_blog/css/tokens.css">
  <link rel="stylesheet" href="/themes/custom/jfm_blog/css/global.css">
  <link rel="stylesheet" href="/themes/custom/jfm_blog/components/article-card/article-card.css">
</head>
<body>
  <!-- Test component markup here -->
  <article class="article-card">
    <!-- Component HTML -->
  </article>
</body>
</html>
```

## Component Development Workflow

1. **Plan:** Define component purpose and required props
2. **Schema:** Create component.yml with prop definitions
3. **Template:** Build semantic HTML in .twig file
4. **Styles:** Style using design tokens in .css file
5. **Test:** Verify accessibility and responsiveness
6. **Document:** Add to this file with usage examples
7. **Integrate:** Use in node templates, blocks, or views

## Component Naming Conventions

**Component directory:** `kebab-case`
- `site-header`, `article-card`, `hero-cta`

**CSS classes:** `kebab-case` with BEM modifiers
- `.article-card`, `.article-card__title`, `.article-card--featured`

**Twig variables:** `snake_case`
- `site_name`, `featured_image`, `primary_cta`

**YAML keys:** `snake_case`
- `site_name`, `menu_items`, `primary_cta`

## Future Components

Potential components to add based on needs:

- **author-bio** - Author information card
- **comment-thread** - Comment display and form
- **search-form** - Search input component
- **breadcrumbs** - Breadcrumb navigation
- **pagination** - Page navigation component
- **tag-list** - Tag cloud or list
- **share-buttons** - Social sharing buttons
- **newsletter-signup** - Email subscription form
- **related-posts** - Related articles grid

Add components incrementally as needed. Each should:
- Solve a specific UI problem
- Be reusable across contexts
- Follow established patterns
- Include proper documentation

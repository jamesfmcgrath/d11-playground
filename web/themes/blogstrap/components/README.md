# Blogstrap Components

This theme uses Drupal 11 Single Directory Components (SDCs) for reusable UI elements. All components follow modern Drupal 11 standards with proper `.component.yml` metadata files.

## Theme Structure

- `templates/html.html.twig` - HTML document structure (DOCTYPE, HTML, HEAD, BODY)
- `templates/page.html.twig` - Page template that uses the layout component
- `components/` - Single Directory Components directory

## Available Components

### Layout
The main page layout component that wraps all page content.

**Usage:**
```twig
{% include '@blogstrap/layout/layout.twig' with {
  'site_name': site_name,
  'header_content': page.header,
  'menu_content': page.primary_menu,
  'content': page.content,
  'footer_content': page.footer,
  'copyright_year': 'now'|date('Y')
} %}
```

### Header
The site header component with logo, site name, and optional menu.

**Usage:**
```twig
{% include '@blogstrap/header/header.twig' with {
  'site_name': site_name,
  'site_slogan': site_slogan|default(''),
  'header_content': page.header,
  'menu_content': page.primary_menu,
  'menu_label': 'Primary menu'|t
} %}
```

### Footer
The site footer component with copyright information.

**Usage:**
```twig
{% include '@blogstrap/footer/footer.twig' with {
  'site_name': site_name,
  'footer_content': page.footer,
  'copyright_year': 'now'|date('Y')
} %}
```

### Menu
Navigation menu component.

**Usage:**
```twig
{% include '@blogstrap/menu/menu.twig' with {
  'menu_content': page.primary_menu,
  'menu_label': 'Primary menu'|t
} %}
```

### Card
Bootstrap card component for displaying content.

**Usage:**
```twig
{% include '@blogstrap/card/card.twig' with {
  'title': 'Card Title',
  'body': 'Card body content goes here.',
  'footer': 'Card footer content',
  'image': '/path/to/image.jpg',
  'image_alt': 'Image description',
  'link': '/path/to/page',
  'link_text': 'Read more',
  'classes': 'mb-4'
} %}
```

**Example:**
```twig
{% include '@blogstrap/card/card.twig' with {
  'title': 'Welcome to Our Site',
  'body': 'This is a test card component demonstrating the single directory component system.',
  'link': '/about',
  'link_text': 'Learn More',
  'classes': 'mb-4'
} %}
```

## Drupal 11 Standards

This theme follows Drupal 11 best practices:

- ✅ HTML/HEAD structure separated into `html.html.twig`
- ✅ Page content in `page.html.twig` (no HTML/HEAD/BODY tags)
- ✅ Single Directory Components with `.component.yml` metadata files
- ✅ Reusable layout component for page structure
- ✅ Component-based architecture for maintainability

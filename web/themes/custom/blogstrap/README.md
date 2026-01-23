# Blogstrap Theme

A custom Drupal 11 theme with Bootstrap 5.3.2 and Single Directory Components (SDC).

## Features

- **Bootstrap 5.3.2** via CDN
- **Single Directory Components (SDC)** for reusable component architecture
- **Webpack build system** for SCSS and JavaScript compilation
- **Three SDC components**: Card, Button, and Hero

## Installation

1. The theme is located at `web/themes/custom/blogstrap/`

2. Install dependencies:
   ```bash
   cd web/themes/custom/blogstrap
   npm install
   ```

3. Build assets:
   ```bash
   npm run build
   ```

4. Enable the theme in Drupal:
   - Navigate to `/admin/appearance`
   - Find "Blogstrap" and click "Install and set as default"

## Development

### Build Commands

- `npm run build` - Build production assets
- `npm run dev` - Build and watch for changes during development
- `npm start` - Alias for `npm run dev`

### Theme Structure

```
blogstrap/
├── components/          # SDC components
│   ├── card/
│   ├── button/
│   └── hero/
├── dist/               # Compiled assets (generated)
│   ├── css/
│   └── js/
├── js/                 # JavaScript source
├── src/                # SCSS source
│   └── scss/
├── blogstrap.info.yml  # Theme definition
├── blogstrap.libraries.yml
├── blogstrap.theme
├── package.json
└── webpack.config.js
```

## SDC Components

### Card Component
- **Props**: title, body, image (optional), image_position
- **Usage**: `{{ include('blogstrap:card', { title: 'Title', body: 'Content' }) }}`

### Button Component
- **Props**: text, url, style, size
- **Usage**: `{{ include('blogstrap:button', { text: 'Click me', url: '/path', style: 'primary' }) }}`

### Hero Component
- **Props**: heading, subheading, background_image (optional), overlay
- **Usage**: `{{ include('blogstrap:hero', { heading: 'Welcome', subheading: 'Subtitle' }) }}`

## Bootstrap Customization

To customize Bootstrap variables, edit `src/scss/main.scss` and uncomment/modify the variable overrides at the top of the file.

## Requirements

- Drupal 10 or 11
- Node.js and npm for build tooling

# BlogStrap

A simple blog theme using Bootstrap 5 for Drupal 11, based on the Bootstrap starter template.

## Features
- Responsive design with Bootstrap 5.
- Customizable regions including header, primary menu, content, sidebar left/right, and footer.
- Semantic HTML tags for better accessibility.
- Clean, centered layout matching Bootstrap starter template.

## Installation
1. Clone or download the repository.
2. Place the `blogstrap` folder in your Drupal themes directory.
3. Install dependencies: `npm install`
4. Build the CSS: `npm run build`
5. Enable the theme through the Drupal admin interface.

## Development

### Building CSS from SCSS

The theme uses SCSS for styling. To compile SCSS to CSS:

```bash
# One-time build (expanded format)
npm run build

# Build minified version
npm run build:min

# Watch mode (auto-compile on changes)
npm run watch
```

### File Structure
- `scss/style.scss` - Source SCSS file
- `css/style.css` - Compiled CSS file (generated)
- `css/bootstrap.min.css` - Bootstrap CSS (copied from node_modules)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

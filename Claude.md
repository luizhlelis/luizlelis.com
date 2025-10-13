# luizlelis.com - Repository Documentation

## Overview
Personal website for Luiz Lelis showcasing technical articles about software engineering, infrastructure, and DevOps. The site is deployed on AWS using S3 bucket with CloudFront CDN for global distribution.

## Technology Stack

### Frontend Framework
- **Vue 2.6.12** - Progressive JavaScript framework
- **Vuetify 2.5.8** - Material Design component framework
- **Vue Router 3.5.3** - Single page application routing
- **Vue Meta 2.4.0** - Dynamic meta tags management

### Build Tools
- **Vue CLI Service 4.5** - Standard tooling for Vue development
- **Babel** - JavaScript transpiler
- **Webpack** - Module bundler with compression plugin
- **ESLint** - Code quality and formatting

### Dependencies
- **markdown-it-vue** - Markdown rendering for articles
- **vue-youtube** - YouTube video embedding
- **p5.js** - Creative coding library
- **deepai** - AI integration (if used)

## Project Structure

```
.
├── public/
│   ├── index.html         # Main HTML template
│   └── articles.js        # Article content in markdown format
├── src/
│   ├── assets/           # Images, SVGs, and static files
│   ├── components/       # Vue components
│   │   ├── Home.vue      # Landing page
│   │   ├── Blog.vue      # Blog listing with pagination
│   │   ├── Videos.vue    # YouTube videos section
│   │   ├── Article.vue   # Individual article renderer
│   │   ├── Navigation.vue # Top navigation bar
│   │   ├── Footer.vue    # Site footer
│   │   ├── Badges.vue    # Professional badges/certifications
│   │   └── NotFound.vue  # 404 page
│   ├── plugins/
│   │   └── vuetify.js    # Vuetify configuration
│   ├── App.vue           # Root component
│   └── main.js           # Application entry point
├── package.json          # Dependencies and scripts
├── vue.config.js         # Vue CLI configuration
└── vetur.config.js       # Vetur IDE configuration
```

## Key Features

### 1. Article System
- Articles stored in `public/articles.js` as markdown strings
- Dynamic routing for each article defined in `main.js`
- SEO-optimized with unique meta tags per article
- Support for code highlighting and markdown formatting

### 2. Blog Pagination
- Articles divided into pages (3 articles per page)
- Circular pagination component
- Responsive card layout with hover effects

### 3. Video Section
- YouTube video integration using vue-youtube
- Currently displays 4 videos without pagination
- Responsive video card layout

### 4. Dark Mode
- Default dark theme enabled
- Theme-aware SVG borders and styling
- Consistent dark mode across all components

## Development Standards

### Git Commit Conventions
1. **Use Conventional Commits format**
   - Format: `<type>: <subject>`
   - Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`
   - Example: `feat: add pagination to videos section`

2. **Commit message rules**
   - Subject line must be under 50 characters
   - Use imperative mood ("add" not "added")
   - No period at the end of subject line
   - Body (if needed) wrapped at 72 characters

### Code Style Guidelines
1. **Vue Components**
   - Use single-file components (.vue)
   - Keep component logic minimal and focused
   - Props validation when applicable
   - Emit events for parent communication

2. **JavaScript**
   - Use ES6+ features
   - Consistent indentation (2 spaces)
   - Semicolons required
   - Single quotes for strings

3. **CSS/Styling**
   - Scoped styles in components when possible
   - Use Vuetify utility classes
   - Maintain responsive design principles
   - Mobile-first approach

### Article Writing Standards
1. **Markdown Format**
   - Use proper heading hierarchy (# > ## > ###)
   - Code blocks with language specification
   - Descriptive alt text for images
   - External links open in new tabs

2. **Content Guidelines**
   - Technical accuracy is paramount
   - Clear, concise explanations
   - Include code examples where relevant
   - Proper attribution for references

### Deployment Process
1. **Build Process**
   - Run `npm run build` to create production bundle
   - Assets are optimized and compressed
   - Legacy OpenSSL provider flag required for Node compatibility

2. **AWS Deployment**
   - Static files uploaded to S3 bucket
   - CloudFront invalidation for cache refresh
   - HTTPS enabled through CloudFront

## Available Scripts

```bash
# Development server with hot reload
npm run serve

# Production build
npm run build

# Lint and fix files
npm run lint
```

## Environment Configuration
- Node.js with OpenSSL legacy provider flag
- Vue CLI service for development
- Production optimizations via webpack

## Future Improvements
- Add pagination to videos section (currently planned)
- Implement search functionality for articles
- Add RSS feed for blog posts
- Improve SEO with structured data
- Add sitemap generation
- Implement article categories/tags
- Add reading time estimates
- Enable comments system

## Maintenance Notes
- Articles are manually added to `public/articles.js`
- Routes must be defined in `main.js` for new articles
- Images should be optimized (WebP format preferred)
- Regular dependency updates recommended
- Monitor CloudFront cache behavior

## Contact
Website: [luizlelis.com](https://luizlelis.com)
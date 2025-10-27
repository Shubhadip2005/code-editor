<div align="center">

# 🚀 Code Editor Pro

### Modern Web Development Environment in Your Browser

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Monaco Editor](https://img.shields.io/badge/Monaco%20Editor-4.7.0-0078D4?style=for-the-badge&logo=visualstudiocode&logoColor=white)](https://microsoft.github.io/monaco-editor/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**[Live Demo](https://codeeditor.com)** • **[Documentation](https://docs.codeeditor.com)** • **[Report Bug](https://github.com/Shubhadip2005/code-editor/issues)** • **[Request Feature](https://github.com/Shubhadip2005/code-editor/issues)**

| Editor Interface |
|:-----------------:|
|![Interface](/public/Code%20Editor%20Interface.png)|

*A powerful, feature-rich online code editor providing a complete development environment with real-time preview, professional templates, and VS Code-like editing experience.*

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Templates](#-templates)
- [Technology Stack](#-technology-stack)
- [Configuration](#-configuration)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)
- [Support](#-support)

---

## 🌟 Overview

**Code Editor Pro** is a sophisticated web-based code editor that brings the power of professional development tools directly to your browser. Built with React and powered by Monaco Editor (the same engine behind VS Code), it offers a seamless coding experience with real-time preview, intelligent code completion, and production-ready templates.

### Why Code Editor Pro?

- ⚡ **Zero Setup Required** - Start coding immediately, no installation needed
- 🎨 **Professional Templates** - Jumpstart projects with battle-tested templates
- 🔄 **Real-time Preview** - See changes instantly as you code
- 💡 **IntelliSense** - Smart code completion and suggestions
- 📱 **Mobile Optimized** - Code anywhere, on any device
- 🎯 **Production Ready** - Export and deploy your projects with one click

---

## ✨ Features

### 🖊️ Advanced Code Editing

<table>
<tr>
<td width="50%">

**Monaco Editor Integration**
- VS Code's powerful editor engine
- Syntax highlighting for HTML, CSS, JS
- IntelliSense and auto-completion
- Multi-cursor editing support
- Advanced find & replace functionality

</td>
<td width="50%">

**Developer Experience**
- Dark and light themes
- Customizable keyboard shortcuts
- Auto-save functionality
- Code folding and minimap
- Error detection and linting

</td>
</tr>
</table>

### 🎨 Professional Templates

| Template | Description | Key Features |
|----------|-------------|--------------|
| **Blank Canvas** | Clean starting point | Modern gradients, animations |
| **Landing Page** | Business website template | Sticky nav, hero section, responsive |
| **Contact Form** | Professional form template | Validation, progress indicators, accessible |
| **URL Decoder** | LZString utility tool | Compression/decompression, tabbed UI |

### 📊 Real-time Features

- **Live Preview** - Instant rendering of code changes in isolated iframe
- **Console Output** - Real-time JavaScript debugging and error tracking
- **Responsive Testing** - Preview across different viewport sizes
- **Auto-save** - Automatic save to local storage, never lose work

### 🎯 Export & Deployment

- Download projects as ZIP archives
- Deploy directly to hosting platforms
- Share via compressed URLs
- Export individual HTML, CSS, JS files

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** >= 16.0.0 ([Download](https://nodejs.org/))
- **npm** >= 7.0.0 or **yarn** >= 1.22.0

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Shubhadip2005/code-editor.git
   cd code-editor
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

---

## 📁 Project Structure

```
code-editor/
├── public/
│   ├── index.html              # HTML entry point
│   └── favicon.ico             # Application icon
│
├── src/
│   ├── components/
│   │   └── CodeEditor/         # Main editor component
│   │
│   ├── utils/
│   │   ├── LZString.js         # LZString compression utilities
│   │   └── TEMPLATES.js        # Template definitions
│   │
│   ├── App.js                  # Root application component
│   ├── index.js                # Application entry point
│   └── index.css               # Global styles
│
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies
├── tailwind.config.js          # Tailwind configuration
└── README.md                   # Project documentation
```

---

## 🎨 Templates

### 1. 🎨 Blank Canvas

A clean slate for your creativity, featuring:
- Modern gradient backgrounds
- Smooth animations
- Responsive grid layout
- Clean, semantic HTML

**Use Case:** Personal projects, prototypes, experiments

---

### 2. 🌐 Modern Landing Page

Professional business landing page with:
- **Sticky Navigation** - Smooth scroll and active states
- **Animated Hero Section** - Eye-catching entrance animations
- **Feature Grid** - Showcase your product benefits
- **Gradient Effects** - Modern, vibrant color schemes
- **Social Integration** - Connect with your audience

**Use Case:** Product launches, portfolios, business websites

---

### 3. 📧 Professional Contact Form

Fully-featured contact form including:
- **Real-time Validation** - Instant feedback on user input
- **Progress Indicators** - Visual submission feedback
- **Success/Error States** - Clear user communication
- **Accessibility** - WCAG 2.1 AA compliant
- **Mobile Responsive** - Perfect on all devices

**Use Case:** Contact pages, lead generation, support forms

---

### 4. 🔗 LZString URL Decoder

Powerful URL compression tool with:
- **Real-time Decoding** - Instant URL decompression
- **Tabbed Interface** - Organized code view
- **Copy to Clipboard** - One-click code copying
- **Error Handling** - Graceful failure management

**Use Case:** Sharing code snippets, URL shortening, code demos

---

## 🛠️ Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI library with concurrent features |
| **Monaco Editor** | 4.7.0 | VS Code's powerful editor engine |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |
| **Lucide React** | Latest | Beautiful, consistent icons |

### Development Tools

| Tool | Purpose |
|------|---------|
| **React Scripts** | Zero-config build setup |
| **Testing Library** | Component testing utilities |
| **ESLint** | Code quality and linting |
| **Prettier** | Code formatting |

### Browser Compatibility

| Browser | Minimum Version | Support |
|---------|----------------|---------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Opera | 76+ | ✅ Full Support |

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=https://api.yourbackend.com

# Firebase (Optional)
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

# Analytics (Optional)
REACT_APP_ANALYTICS_ID=your_google_analytics_id

# Feature Flags
REACT_APP_ENABLE_AUTOSAVE=true
REACT_APP_ENABLE_COLLABORATION=false
```

### Tailwind CSS Customization

Customize the design system in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
        },
        secondary: {
          500: '#764ba2',
          600: '#6b46c1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Monaco Editor Options

Configure editor settings in your component:

```javascript
const editorOptions = {
  fontSize: 14,
  fontFamily: 'Fira Code, monospace',
  minimap: { enabled: true },
  lineNumbers: 'on',
  roundedSelection: true,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
};
```

---

## 📖 Usage Guide

### Starting a New Project

1. **Select a Template**
   - Click the template picker button
   - Browse available templates
   - Click to load your chosen template

2. **Edit Your Code**
   - HTML, CSS, and JS tabs are available
   - Use keyboard shortcuts for efficiency
   - IntelliSense helps with auto-completion

3. **Preview Changes**
   - Watch real-time updates in the preview pane
   - Use responsive testing buttons
   - Debug with the integrated console

4. **Export Your Work**
   - Click the export button
   - Choose ZIP download or deployment option
   - Share via compressed URL

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Save current file |
| `Ctrl/Cmd + F` | Find in current file |
| `Ctrl/Cmd + H` | Find and replace |
| `Ctrl/Cmd + /` | Toggle comment |
| `Alt + Up/Down` | Move line up/down |
| `Ctrl/Cmd + D` | Select next occurrence |

### Using the URL Decoder

```javascript
// Example: Decoding a compressed URL
const compressedData = "N4IgdghgtgpiBcIAmB...";

// The decoder automatically:
// 1. Detects LZString compressed data
// 2. Decompresses the content
// 3. Separates HTML, CSS, and JavaScript
// 4. Displays in organized tabs
```

### Customizing Templates

```javascript
// Example: Modifying the landing page template
const customTheme = {
  primaryGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondaryGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  accentColor: '#38bdf8',
  fontFamily: "'Inter', sans-serif",
};

// Apply to your CSS
:root {
  --primary-gradient: ${customTheme.primaryGradient};
  --secondary-gradient: ${customTheme.secondaryGradient};
  --accent-color: ${customTheme.accentColor};
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Editor.test.js
```

### Writing Tests

```javascript
import { render, screen } from '@testing-library/react';
import CodeEditor from './components/CodeEditor';

test('renders code editor with default content', () => {
  render(<CodeEditor />);
  const editorElement = screen.getByRole('textbox');
  expect(editorElement).toBeInTheDocument();
});
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=build
```

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://Shubhadip2005.github.io/code-editor",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

### Docker

```dockerfile
# Dockerfile
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t code-editor.
docker run -p 80:80 code-editor
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help make Code Editor better.

### Development Process

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Shubhadip2005/code-editor.git
   cd code-editor
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests for new features

4. **Commit Your Changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Contribution Guidelines

- ✅ Follow React best practices and hooks conventions
- ✅ Use TypeScript for type safety (if adding new features)
- ✅ Write comprehensive tests for new functionality
- ✅ Update documentation for API changes
- ✅ Ensure responsive design on all devices
- ✅ Maintain accessibility standards (WCAG 2.1 AA)

### Code Style

We use ESLint and Prettier for consistent code formatting:

```bash
# Lint code
npm run lint

# Format code
npm run format
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Editor Not Loading

**Problem:** Monaco Editor fails to initialize

**Solutions:**
```bash
# Clear browser cache
Ctrl + Shift + Delete (Chrome/Firefox)

# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Preview Not Updating

**Problem:** Live preview doesn't reflect code changes

**Solutions:**
- Check browser console for JavaScript errors
- Verify all files are saved (auto-save enabled by default)
- Restart development server: `Ctrl + C`, then `npm start`
- Clear localStorage: `localStorage.clear()` in browser console

#### Build Failures

**Problem:** Production build fails

**Solutions:**
```bash
# Check Node.js version
node --version  # Should be >= 16.0.0

# Verify environment variables
cat .env

# Clean build
rm -rf build node_modules
npm install
npm run build
```

#### Performance Issues

**Problem:** Editor is slow or laggy

**Solutions:**
- Disable minimap in editor options
- Reduce file size (split large files)
- Close other browser tabs
- Update to latest browser version
- Disable browser extensions

### Getting Help

- 📚 [Documentation](https://docs.codeeditor.com)
- 💬 [GitHub Discussions](https://github.com/Shubhadip2005/code-editor/discussions)
- 🐛 [Report Issues](https://github.com/Shubhadip2005/code-editor/issues)
- 📧 [Email Support](mailto:shubhadipdas733@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for full details.

```
MIT License

Copyright (c) 2024 Code Editor Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 🙏 Acknowledgments

Special thanks to these amazing projects and their contributors:

- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** - Microsoft's powerful code editor
- **[React](https://reactjs.org/)** - Facebook's UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide](https://lucide.dev/)** - Beautiful open-source icon library
- **[LZ-String](https://github.com/pieroxy/lz-string)** - JavaScript compression library

---

## 📞 Support & Contact

<div align="center">

### Need Help?

| Resource | Link |
|----------|------|
| 📖 Documentation | [docs.codeeditorpro.com](https://docs.codeeditor.com) |
| 🐛 Bug Reports | [GitHub Issues](https://github.com/Shubhadip2005/code-editor/issues) |
| 💬 Discussions | [GitHub Discussions](https://github.com/Shubhadip2005/code-editor/discussions) |
| 📧 Email | [support@codeeditorpro.com](mailto:shubhadipdas733@gmail.com) |

</div>

---

## 🗺️ Roadmap

### Version 2.0 (Q1 2025)

- [ ] **TypeScript Support** - Full TypeScript editing and type checking
- [ ] **Collaborative Editing** - Real-time multi-user collaboration
- [ ] **Version Control** - Git integration for version management
- [ ] **Cloud Storage** - Save projects to the cloud
- [ ] **More Templates** - 10+ new professional templates

### Version 2.5 (Q2 2025)

- [ ] **Plugin System** - Extensible architecture for custom plugins
- [ ] **AI Code Completion** - GPT-powered code suggestions
- [ ] **Mobile App** - React Native iOS/Android apps
- [ ] **Team Workspaces** - Collaborative team environments
- [ ] **Advanced Debugging** - Breakpoints and step debugging

### Future Considerations

- WebAssembly support for compiled languages
- Terminal integration
- Database connections
- API testing tools
- Custom theme creator

---

<div align="center">

### 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Shubhadip2005/code-editor&type=Date)](https://star-history.com/#Shubhadip2005/code-editor&Date)

---

**Built with ❤️ for the developer community**

⭐ **[Star us on GitHub](https://github.com/Shubhadip2005/code-editor)** • 🐛 **[Report Bug](https://github.com/Shubhadip2005/code-editor/issues)** • 💡 **[Request Feature](https://github.com/Shubhadip2005/code-editor/issues)**

---

*Made with passion by developers, for developers*

</div>
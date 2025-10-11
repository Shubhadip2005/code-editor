import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Layout, Maximize2, Code2, Share2, Download, Trash2, Settings, Moon, Sun, Save, FolderOpen, Copy, Check, RefreshCw, Plus, X, Edit2, Calendar, Link2 } from 'lucide-react';
import Editor from '@monaco-editor/react';

// LZ String compression utilities (simplified implementation)
const LZString = {
  compressToEncodedURIComponent: (str) => {
    if (!str) return '';
    try {
      return btoa(encodeURIComponent(str)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch (e) {
      return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
  },
  decompressFromEncodedURIComponent: (str) => {
    if (!str) return '';
    try {
      str = str.replace(/-/g, '+').replace(/_/g, '/');
      const pad = str.length % 4;
      if (pad) str += '='.repeat(4 - pad);
      return decodeURIComponent(atob(str));
    } catch (e) {
      try {
        return atob(str);
      } catch (e2) {
        return '';
      }
    }
  }
};

const TEMPLATES = {
  blank: {
    name: 'Blank Canvas',
    description: 'Start from scratch',
    html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>Start building something amazing!</p>\n</body>\n</html>',
    css: 'body {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  margin: 0;\n  padding: 40px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  color: white;\n}\n\nh1 {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n  animation: fadeIn 0.6s ease-in;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(-20px); }\n  to { opacity: 1; transform: translateY(0); }\n}',
    js: '// Your JavaScript code here\nconsole.log("🚀 Welcome to your project!");\n\n// Example: Add interactivity\ndocument.querySelector("h1").addEventListener("click", () => {\n  alert("Hello from JavaScript!");\n});'
  },
  landing: {
    name: 'Modern Landing Page',
    description: 'Professional landing page template',
    html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Product Launch</title>\n</head>\n<body>\n  <nav class="navbar">\n    <div class="logo">✨ YourBrand</div>\n    <ul class="nav-links">\n      <li><a href="#features">Features</a></li>\n      <li><a href="#pricing">Pricing</a></li>\n      <li><a href="#contact" class="nav-cta">Get Started</a></li>\n    </ul>\n  </nav>\n  \n  <section class="hero">\n    <div class="hero-content">\n      <h1 class="hero-title">Build Something Amazing</h1>\n      <p class="hero-subtitle">The perfect solution for your next project. Fast, secure, and scalable.</p>\n      <button class="cta-btn">Start Free Trial</button>\n    </div>\n  </section>\n  \n  <section id="features" class="features">\n    <h2>Why Choose Us</h2>\n    <div class="feature-grid">\n      <div class="feature-card">\n        <div class="feature-icon">⚡</div>\n        <h3>Lightning Fast</h3>\n        <p>Optimized performance that delivers results in milliseconds</p>\n      </div>\n      <div class="feature-card">\n        <div class="feature-icon">🔒</div>\n        <h3>Secure by Default</h3>\n        <p>Bank-level encryption and security protocols</p>\n      </div>\n      <div class="feature-card">\n        <div class="feature-icon">📈</div>\n        <h3>Infinitely Scalable</h3>\n        <p>Grows seamlessly with your business needs</p>\n      </div>\n    </div>\n  </section>\n</body>\n</html>',
    css: '* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  overflow-x: hidden;\n}\n\n.navbar {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem 5%;\n  background: rgba(26, 26, 46, 0.95);\n  backdrop-filter: blur(10px);\n  color: white;\n  z-index: 1000;\n  box-shadow: 0 2px 20px rgba(0,0,0,0.1);\n}\n\n.logo {\n  font-size: 1.5rem;\n  font-weight: bold;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n\n.nav-links {\n  display: flex;\n  list-style: none;\n  gap: 2.5rem;\n  align-items: center;\n}\n\n.nav-links a {\n  color: white;\n  text-decoration: none;\n  transition: all 0.3s;\n  font-weight: 500;\n}\n\n.nav-links a:hover {\n  color: #4ecca3;\n  transform: translateY(-2px);\n}\n\n.nav-cta {\n  padding: 0.6rem 1.5rem;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-radius: 25px;\n  color: white !important;\n}\n\n.hero {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  position: relative;\n  overflow: hidden;\n}\n\n.hero::before {\n  content: "";\n  position: absolute;\n  width: 200%;\n  height: 200%;\n  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);\n  background-size: 50px 50px;\n  animation: drift 20s linear infinite;\n}\n\n@keyframes drift {\n  from { transform: translate(0, 0); }\n  to { transform: translate(50px, 50px); }\n}\n\n.hero-content {\n  text-align: center;\n  position: relative;\n  z-index: 1;\n  animation: fadeInUp 0.8s ease-out;\n}\n\n@keyframes fadeInUp {\n  from { opacity: 0; transform: translateY(30px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.hero-title {\n  font-size: 4rem;\n  margin-bottom: 1.5rem;\n  font-weight: 800;\n  line-height: 1.1;\n}\n\n.hero-subtitle {\n  font-size: 1.4rem;\n  margin-bottom: 2.5rem;\n  opacity: 0.95;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.cta-btn {\n  padding: 1.2rem 3rem;\n  font-size: 1.1rem;\n  background: white;\n  color: #667eea;\n  border: none;\n  border-radius: 50px;\n  cursor: pointer;\n  font-weight: 700;\n  transition: all 0.3s;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.2);\n}\n\n.cta-btn:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 15px 40px rgba(0,0,0,0.3);\n}\n\n.features {\n  padding: 6rem 5%;\n  background: #f8f9fa;\n}\n\n.features h2 {\n  text-align: center;\n  font-size: 3rem;\n  margin-bottom: 4rem;\n  color: #1a1a2e;\n  font-weight: 800;\n}\n\n.feature-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 2.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.feature-card {\n  background: white;\n  padding: 3rem 2rem;\n  border-radius: 20px;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.08);\n  transition: all 0.3s;\n  text-align: center;\n}\n\n.feature-card:hover {\n  transform: translateY(-10px);\n  box-shadow: 0 20px 50px rgba(0,0,0,0.15);\n}\n\n.feature-icon {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n}\n\n.feature-card h3 {\n  color: #667eea;\n  margin-bottom: 1rem;\n  font-size: 1.6rem;\n  font-weight: 700;\n}\n\n.feature-card p {\n  color: #666;\n  line-height: 1.6;\n  font-size: 1.05rem;\n}\n\n@media (max-width: 768px) {\n  .hero-title { font-size: 2.5rem; }\n  .hero-subtitle { font-size: 1.1rem; }\n  .nav-links { gap: 1.5rem; }\n}',
    js: 'document.querySelector(".cta-btn").addEventListener("click", () => {\n  console.log("🎉 User clicked CTA!");\n  alert("Welcome aboard! Let\'s get started.");\n});\n\n// Smooth scroll\ndocument.querySelectorAll(\'a[href^="#"]\').forEach(anchor => {\n  anchor.addEventListener("click", function(e) {\n    e.preventDefault();\n    const target = document.querySelector(this.getAttribute("href"));\n    if (target) target.scrollIntoView({ behavior: "smooth" });\n  });\n});\n\nconsole.log("✨ Landing page loaded!");'
  },
  portfolio: {
    name: 'Portfolio Page',
    description: 'Showcase your work',
    html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Portfolio</title>\n</head>\n<body>\n  <header>\n    <h1>John Doe</h1>\n    <p class="subtitle">Full Stack Developer & Designer</p>\n  </header>\n  \n  <section class="projects">\n    <h2>Featured Projects</h2>\n    <div class="project-grid">\n      <div class="project-card">\n        <div class="project-image">🎨</div>\n        <h3>Design System</h3>\n        <p>A comprehensive UI component library</p>\n      </div>\n      <div class="project-card">\n        <div class="project-image">🚀</div>\n        <h3>Web App</h3>\n        <p>Real-time collaboration platform</p>\n      </div>\n      <div class="project-card">\n        <div class="project-image">📱</div>\n        <h3>Mobile App</h3>\n        <p>iOS and Android application</p>\n      </div>\n    </div>\n  </section>\n</body>\n</html>',
    css: 'body {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  margin: 0;\n  padding: 0;\n  background: #0a0a0a;\n  color: white;\n}\n\nheader {\n  text-align: center;\n  padding: 100px 20px;\n  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);\n}\n\nheader h1 {\n  font-size: 4rem;\n  margin: 0;\n  font-weight: 900;\n}\n\n.subtitle {\n  font-size: 1.5rem;\n  opacity: 0.9;\n  margin-top: 1rem;\n}\n\n.projects {\n  padding: 80px 5%;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.projects h2 {\n  font-size: 2.5rem;\n  margin-bottom: 3rem;\n  text-align: center;\n}\n\n.project-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n}\n\n.project-card {\n  background: #1a1a1a;\n  padding: 2rem;\n  border-radius: 15px;\n  transition: transform 0.3s;\n  border: 1px solid #333;\n}\n\n.project-card:hover {\n  transform: translateY(-10px);\n  border-color: #3b82f6;\n}\n\n.project-image {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n}\n\n.project-card h3 {\n  color: #3b82f6;\n  font-size: 1.5rem;\n  margin-bottom: 0.5rem;\n}\n\n.project-card p {\n  color: #999;\n  line-height: 1.6;\n}',
    js: 'console.log("💼 Portfolio loaded!");\n\n// Add animation on scroll\nconst observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.style.opacity = "1";\n      entry.target.style.transform = "translateY(0)";\n    }\n  });\n});\n\ndocument.querySelectorAll(".project-card").forEach(card => {\n  card.style.opacity = "0";\n  card.style.transform = "translateY(20px)";\n  card.style.transition = "all 0.6s";\n  observer.observe(card);\n});'
  }
};

// Storage utilities for localStorage
const Storage = {
  // Save projects to localStorage
  saveProjects: (projects) => {
    try {
      localStorage.setItem('codeStudioProjects', JSON.stringify(projects));
      console.log(`💾 Saved ${projects.length} projects to localStorage`);
      return true;
    } catch (error) {
      console.error('Failed to save projects:', error);
      return false;
    }
  },

  // Load projects from localStorage
  loadProjects: () => {
    try {
      const stored = localStorage.getItem('codeStudioProjects');
      if (stored) {
        const projects = JSON.parse(stored);
        console.log(`📂 Loaded ${projects.length} projects from localStorage`);
        return projects;
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
    return [];
  },

  // Save current session (auto-save)
  saveCurrentSession: (html, css, js, projectName) => {
    try {
      const session = { html, css, js, projectName, timestamp: new Date().toISOString() };
      localStorage.setItem('codeStudioCurrentSession', JSON.stringify(session));
      console.log('💫 Auto-saved current session');
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  },

  // Load current session
  loadCurrentSession: () => {
    try {
      const stored = localStorage.getItem('codeStudioCurrentSession');
      if (stored) {
        const session = JSON.parse(stored);
        console.log('🔄 Loaded previous session');
        return session;
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    }
    return null;
  },

  // Clear all data (for debugging)
  clearAll: () => {
    localStorage.removeItem('codeStudioProjects');
    localStorage.removeItem('codeStudioCurrentSession');
    console.log('🧹 Cleared all stored data');
  }
};

export default function CodeEditor() {
  const [html, setHtml] = useState(TEMPLATES.blank.html);
  const [css, setCss] = useState(TEMPLATES.blank.css);
  const [js, setJs] = useState(TEMPLATES.blank.js);
  const [activeTab, setActiveTab] = useState('html');
  const [layout, setLayout] = useState('split');
  const [autoRun, setAutoRun] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedProjects, setSavedProjects] = useState([]);
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [currentProjectName, setCurrentProjectName] = useState('Untitled Project');
  const [shareUrl, setShareUrl] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  // Load projects and session from localStorage on mount
  useEffect(() => {
    const loadedProjects = Storage.loadProjects();
    setSavedProjects(loadedProjects);

    const session = Storage.loadCurrentSession();
    if (session) {
      setHtml(session.html);
      setCss(session.css);
      setJs(session.js);
      setCurrentProjectName(session.projectName);
      console.log('🔄 Restored previous session');
    }
  }, []);

  // Auto-save current session
  useEffect(() => {
    if (autoSaveEnabled) {
      const autoSaveTimeout = setTimeout(() => {
        Storage.saveCurrentSession(html, css, js, currentProjectName);
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(autoSaveTimeout);
    }
  }, [html, css, js, currentProjectName, autoSaveEnabled]);

  const handleEditorChange = (value) => {
    switch (activeTab) {
      case 'html': setHtml(value || ''); break;
      case 'css': setCss(value || ''); break;
      case 'js': setJs(value || ''); break;
      default: break;
    }
  };

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'html': return html;
      case 'css': return css;
      case 'js': return js;
      default: return '';
    }
  };

  const getLanguage = () => {
    switch (activeTab) {
      case 'html': return 'html';
      case 'css': return 'css';
      case 'js': return 'javascript';
      default: return 'html';
    }
  };

  const generateSrcDoc = useCallback(() => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${css}
          #__console__ {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #1e1e1e;
            color: #d4d4d4;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 13px;
            max-height: 0;
            overflow-y: auto;
            padding: 0;
            border-top: 1px solid #333;
            transition: max-height 0.3s, padding 0.3s;
            z-index: 99999;
          }
          #__console__.active {
            max-height: 250px;
            padding: 12px;
          }
          .__log__ { color: #4ec9b0; padding: 4px 0; }
          .__error__ { color: #f48771; padding: 4px 0; }
          .__warn__ { color: #dcdcaa; padding: 4px 0; }
          .__info__ { color: #9cdcfe; padding: 4px 0; }
        </style>
      </head>
      <body>
        ${html}
        <div id="__console__"></div>
        <script>
          (function() {
            const origLog = console.log;
            const origError = console.error;
            const origWarn = console.warn;
            const origInfo = console.info;
            const consoleDiv = document.getElementById('__console__');
            
            function addToConsole(level, args) {
              const line = document.createElement('div');
              line.className = '__' + level + '__';
              const time = new Date().toLocaleTimeString();
              line.textContent = '[' + time + '] ' + 
                args.map(arg => {
                  if (typeof arg === 'object') {
                    try { return JSON.stringify(arg, null, 2); }
                    catch(e) { return String(arg); }
                  }
                  return String(arg);
                }).join(' ');
              consoleDiv.appendChild(line);
              consoleDiv.classList.add('active');
              consoleDiv.scrollTop = consoleDiv.scrollHeight;
              
              window.parent.postMessage({
                type: 'console',
                level: level,
                data: args,
                timestamp: time
              }, '*');
            }
            
            console.log = function(...args) {
              addToConsole('log', args);
              origLog.apply(console, args);
            };
            
            console.error = function(...args) {
              addToConsole('error', args);
              origError.apply(console, args);
            };
            
            console.warn = function(...args) {
              addToConsole('warn', args);
              origWarn.apply(console, args);
            };
            
            console.info = function(...args) {
              addToConsole('info', args);
              origInfo.apply(console, args);
            };
            
            window.onerror = function(msg, url, line, col, error) {
              console.error('Error:', msg, 'at line', line + ':' + col);
              return false;
            };
            
            window.addEventListener('unhandledrejection', function(e) {
              console.error('Unhandled Promise Rejection:', e.reason);
            });
          })();
          
          try {
            ${js}
          } catch (error) {
            console.error('Execution error:', error.message);
          }
        </script>
      </body>
      </html>
    `;
  }, [html, css, js]);

  const runCode = useCallback(() => {
    setConsoleOutput([]);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = generateSrcDoc();
    }
  }, [generateSrcDoc]);

  useEffect(() => {
    if (autoRun) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        runCode();
      }, 800);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (iframeRef.current) {
        iframeRef.current.srcdoc = '';
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [html, css, js, autoRun, runCode]);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data.type === 'console') {
        setConsoleOutput(prev => [...prev.slice(-49), {
          level: e.data.level,
          data: e.data.data,
          timestamp: e.data.timestamp
        }]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const loadTemplate = (templateKey) => {
    if (!templateKey) return;
    const template = TEMPLATES[templateKey];
    setHtml(template.html);
    setCss(template.css);
    setJs(template.js);
    setCurrentProjectName(template.name);
    setConsoleOutput([]);
    // Clear iframe if autoRun is off
    if (!autoRun && iframeRef.current) {
      iframeRef.current.srcdoc = '';
    }
  };

  // Enhanced URL sharing with compression
  const shareCode = () => {
    try {
      const codeData = JSON.stringify({ 
        html, 
        css, 
        js, 
        name: currentProjectName,
        timestamp: new Date().toISOString()
      });
      
      const compressed = LZString.compressToEncodedURIComponent(codeData);
      const url = `${window.location.origin}${window.location.pathname}?code=${compressed}`;
      
      setShareUrl(url);
      setShowShareModal(true);
      
      navigator.clipboard.writeText(url);
      console.log(`🔗 Share URL created (${compressed.length} chars compressed from ${codeData.length} chars)`);
    } catch (e) {
      alert('Failed to generate share link');
      console.error(e);
    }
  };

  const downloadCode = () => {
    const content = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${currentProjectName}</title>
      <style>
    ${css}
      </style>
    </head>
    <body>
    ${html}
    <script>
    ${js}
    </script>
    </body>
    </html>`;
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProjectName.replace(/\s+/g, '-').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Enhanced project management with localStorage
  const saveProject = () => {
    const projectName = prompt('Enter project name:', currentProjectName);
    if (!projectName) return;
    
    const project = {
      id: Date.now().toString(),
      name: projectName,
      html,
      css,
      js,
      timestamp: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    setSavedProjects(prev => {
      const existingIndex = prev.findIndex(p => p.name === projectName);
      let updated;
      
      if (existingIndex >= 0) {
        updated = [...prev];
        updated[existingIndex] = project;
      } else {
        updated = [...prev, project];
      }
      
      // Save to localStorage
      Storage.saveProjects(updated);
      return updated;
    });
    
    setCurrentProjectName(projectName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    console.log(`💾 Project "${projectName}" saved to localStorage`);
  };

  const loadProjectById = (projectId) => {
    const project = savedProjects.find(p => p.id === projectId);
    if (project) {
      setHtml(project.html);
      setCss(project.css);
      setJs(project.js);
      setCurrentProjectName(project.name);
      setShowProjectManager(false);
      // Clear iframe if autoRun is off
      if (!autoRun && iframeRef.current) {
        iframeRef.current.srcdoc = '';
      }
      console.log(`📂 Loaded project: ${project.name}`);
    }
  };

  const deleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = savedProjects.filter(p => p.id !== projectId);
      setSavedProjects(updatedProjects);
      Storage.saveProjects(updatedProjects);
      console.log('🗑️ Project deleted from localStorage');
    }
  };

  const createNewProject = () => {
    if (window.confirm('Create new project? Unsaved changes will be lost.')) {
      setHtml(TEMPLATES.blank.html);
      setCss(TEMPLATES.blank.css);
      setJs(TEMPLATES.blank.js);
      setCurrentProjectName('Untitled Project');
      setConsoleOutput([]);
      // Clear iframe if autoRun is off
      if (!autoRun && iframeRef.current) {
        iframeRef.current.srcdoc = '';
      }
    }
  };

  const copyCode = () => {
    const code = activeTab === 'html' ? html : activeTab === 'css' ? css : js;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearConsole = () => {
    setConsoleOutput([]);
  };

  // Clear all data (for debugging/reset)
  const clearAllData = () => {
    if (window.confirm('Clear ALL saved projects and session data? This cannot be undone.')) {
      Storage.clearAll();
      setSavedProjects([]);
      setHtml(TEMPLATES.blank.html);
      setCss(TEMPLATES.blank.css);
      setJs(TEMPLATES.blank.js);
      setCurrentProjectName('Untitled Project');
      console.log('🧹 All data cleared');
    }
  };

  // Load shared code from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('code');
    if (codeParam) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(codeParam);
        const decoded = JSON.parse(decompressed);
        setHtml(decoded.html);
        setCss(decoded.css);
        setJs(decoded.js);
        if (decoded.name) setCurrentProjectName(decoded.name);
        console.log('🔗 Loaded shared project from URL');
      } catch (e) {
        console.error('Failed to load shared code:', e);
      }
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const headerBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const modalBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col`}>
      {/* Header */}
      <div className={`${headerBg} ${borderColor} border-b p-3 flex items-center justify-between flex-wrap gap-3 shadow-lg`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Code Studio Pro
            </h1>
          </div>
          
          <div className={`px-3 py-1 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} text-sm font-medium flex items-center gap-2`}>
            <Edit2 className="w-3 h-3" />
            {currentProjectName}
          </div>
          
          <select 
            className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            onChange={(e) => loadTemplate(e.target.value)}
            value=""
          >
            <option value="">📚 Templates</option>
            {Object.entries(TEMPLATES).map(([key, template]) => (
              <option key={key} value={key}>{template.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={createNewProject}
            className={`flex items-center gap-1.5 ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-3 py-2 rounded-lg text-sm font-medium transition`}
            title="New Project"
          >
            <Plus className="w-4 h-4" />
            New
          </button>

          <button
            onClick={saveProject}
            className={`flex items-center gap-1.5 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-3 py-2 rounded-lg text-sm font-medium transition`}
            title="Save Project"
          >
            <Save className="w-4 h-4" />
            Save
          </button>

          <button
            onClick={() => setShowProjectManager(true)}
            className={`flex items-center gap-1.5 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-3 py-2 rounded-lg text-sm font-medium transition relative`}
            title="Projects"
          >
            <FolderOpen className="w-4 h-4" />
            Projects
            {savedProjects.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {savedProjects.length}
              </span>
            )}
          </button>
          
          <label className="flex items-center gap-2 text-sm font-medium">
            <input 
              type="checkbox" 
              checked={autoRun} 
              onChange={(e) => setAutoRun(e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
            />
            Auto Run
          </label>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input 
              type="checkbox" 
              checked={autoSaveEnabled} 
              onChange={(e) => setAutoSaveEnabled(e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
            />
            Auto Save
          </label>
          
          <button
            onClick={runCode}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md"
          >
            <Play className="w-4 h-4" />
            Run
          </button>

          <div className={`flex items-center gap-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1`}>
            <button
              onClick={() => setLayout('split')}
              className={`p-2 rounded-lg transition ${layout === 'split' ? 'bg-blue-500 text-white' : 'hover:bg-gray-600'}`}
              title="Split View"
            >
              <Layout className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('preview')}
              className={`p-2 rounded-lg transition ${layout === 'preview' ? 'bg-blue-500 text-white' : 'hover:bg-gray-600'}`}
              title="Preview Only"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('editor')}
              className={`p-2 rounded-lg transition ${layout === 'editor' ? 'bg-blue-500 text-white' : 'hover:bg-gray-600'}`}
              title="Editor Only"
            >
              <Code2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={shareCode}
            className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} rounded-lg transition`}
            title="Share Code"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={downloadCode}
            className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} rounded-lg transition`}
            title="Download HTML"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} rounded-lg transition`}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} rounded-lg transition`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`${headerBg} ${borderColor} border-b p-4 flex items-center gap-6 flex-wrap`}>
          <label className="flex items-center gap-2 text-sm">
            Font Size:
            <input
              type="range"
              min="10"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-32"
            />
            <span className="font-mono">{fontSize}px</span>
          </label>
          
          <div className={`px-3 py-1 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} text-xs flex items-center gap-2`}>
            💾 {savedProjects.length} Projects Saved
          </div>

          <button
            onClick={clearAllData}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition"
            title="Clear All Data"
          >
            Clear All Data
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        {layout !== 'preview' && (
          <div className={`${layout === 'editor' ? 'flex-1' : 'w-1/2'} flex flex-col ${borderColor} border-r`}>
            {/* Tabs */}
            <div className={`flex ${headerBg} ${borderColor} border-b`}>
              {['html', 'css', 'js'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-semibold transition relative ${
                    activeTab === tab 
                      ? 'text-blue-500 bg-gradient-to-b from-transparent to-blue-500/10' 
                      : `${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-750' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                  }`}
                >
                  {tab.toUpperCase()}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                  )}
                </button>
              ))}
              
              <div className="ml-auto flex items-center gap-2 px-4">
                <button
                  onClick={copyCode}
                  className={`text-xs flex items-center gap-1 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  title="Copy Code"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* @monaco-editor/react */}
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={getLanguage()}
                value={getCurrentCode()}
                onChange={handleEditorChange}
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                options={{
                  fontSize: fontSize,
                  automaticLayout: true,
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  renderWhitespace: 'selection',
                  tabSize: 2,
                  insertSpaces: true,
                  formatOnPaste: true,
                  formatOnType: true,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                  folding: true,
                  bracketPairColorization: { enabled: true }
                }}
                loading={
                  <div className={`flex items-center justify-center h-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Loading Editor...</p>
                    </div>
                  </div>
                }
              />
            </div>

            {/* Console */}
            <div className={`h-48 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'} ${borderColor} border-t flex flex-col`}>
              <div className={`flex items-center justify-between px-4 py-2 ${headerBg} ${borderColor} border-b`}>
                <span className="text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Console ({consoleOutput.length})
                </span>
                <button
                  onClick={clearConsole}
                  className={`text-xs ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} flex items-center gap-1 transition`}
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              </div>
              <div className="flex-1 overflow-auto p-3 font-mono text-xs space-y-1">
                {consoleOutput.length === 0 ? (
                  <div className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} text-center py-8`}>
                    Console output will appear here...
                  </div>
                ) : (
                  consoleOutput.map((log, i) => (
                    <div
                      key={i}
                      className={`py-1 px-2 rounded ${
                        log.level === 'error' ? 'text-red-400 bg-red-500/10' :
                        log.level === 'warn' ? 'text-yellow-400 bg-yellow-500/10' :
                        log.level === 'info' ? 'text-blue-400 bg-blue-500/10' :
                        theme === 'dark' ? 'text-green-400 bg-green-500/10' : 'text-green-700 bg-green-100'
                      }`}
                    >
                      <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                        [{log.timestamp}]
                      </span>{' '}
                      {log.data.map(d => typeof d === 'object' ? JSON.stringify(d, null, 2) : String(d)).join(' ')}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Preview Panel */}
        {layout !== 'editor' && (
          <div className={`${layout === 'preview' ? 'flex-1' : 'flex-1'} bg-white relative`}>
            <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Preview
            </div>
            <button
              onClick={runCode}
              className="absolute top-2 right-2 z-10 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition"
              title="Refresh Preview"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <iframe
              ref={iframeRef}
              srcDoc={generateSrcDoc()}
              className="w-full h-full border-0"
              title="preview"
              sandbox="allow-scripts allow-modals allow-forms allow-same-origin allow-popups"
            />
          </div>
        )}
      </div>

      {/* Project Manager Modal */}
      {showProjectManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${modalBg} rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col`}>
            <div className={`${borderColor} border-b p-6 flex items-center justify-between`}>
              <div>
                <h2 className="text-2xl font-bold">My Projects</h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  {savedProjects.length} project{savedProjects.length !== 1 ? 's' : ''} saved in localStorage
                </p>
              </div>
              <button
                onClick={() => setShowProjectManager(false)}
                className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-lg transition`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {savedProjects.length === 0 ? (
                <div className="text-center py-12">
                  <FolderOpen className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                  <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    No saved projects yet
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                    Click "Save" to store your current project
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {savedProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-100 hover:bg-gray-200'} rounded-xl p-4 transition cursor-pointer group`}
                      onClick={() => loadProjectById(project.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(project.timestamp)}
                            </span>
                            <span>•</span>
                            <span>{project.html.length + project.css.length + project.js.length} chars</span>
                            <span>•</span>
                            <span className="text-green-400">💾 Saved</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project.id);
                          }}
                          className={`opacity-0 group-hover:opacity-100 p-2 ${theme === 'dark' ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-100 text-red-600'} rounded-lg transition`}
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${modalBg} rounded-2xl shadow-2xl max-w-2xl w-full p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Link2 className="w-6 h-6 text-blue-500" />
                Share Your Project
              </h2>
              <button
                onClick={() => setShowShareModal(false)}
                className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-lg transition`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4 mb-4`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                Share URL (compressed):
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className={`flex-1 ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} border rounded-lg px-3 py-2 text-sm font-mono`}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            
            <div className={`${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                ✨ URL automatically copied to clipboard! Share it with anyone to collaborate.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
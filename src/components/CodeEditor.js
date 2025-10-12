import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Layout, Maximize2, Code2, Share2, Download, Trash2, Settings, Moon, Sun, Save, FolderOpen, Copy, Check, RefreshCw, Plus, X, Calendar } from 'lucide-react';
import Editor from '@monaco-editor/react';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyBVAcIrrz6hjYKKeUwu7dSdKp3GChTblF0",
  authDomain: "code-editor-bba44.firebaseapp.com",
  projectId: "code-editor-bba44",
  storageBucket: "code-editor-bba44.firebasestorage.app",
  messagingSenderId: "1040435746811",
  appId: "1:1040435746811:web:4e1cf2ef2409c4832b1d5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

// Firebase Storage utilities
const FirebaseStorage = {
  // Save project to Firebase
  saveProject: async (project) => {
    try {
      const projectsRef = collection(db, 'projects');
      const docRef = await addDoc(projectsRef, {
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log(`💾 Project saved to Firebase with ID: ${docRef.id}`);
      return { ...project, id: docRef.id };
    } catch (error) {
      console.error('Failed to save project to Firebase:', error);
      throw error;
    }
  },

  // Update existing project in Firebase
  updateProject: async (projectId, project) => {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, {
        ...project,
        updatedAt: new Date().toISOString()
      });
      console.log(`📝 Project updated in Firebase: ${projectId}`);
      return { ...project, id: projectId };
    } catch (error) {
      console.error('Failed to update project in Firebase:', error);
      throw error;
    }
  },

  // Load all projects from Firebase
  loadProjects: async () => {
    try {
      const projectsRef = collection(db, 'projects');
      const q = query(projectsRef, orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      
      console.log(`📂 Loaded ${projects.length} projects from Firebase`);
      return projects;
    } catch (error) {
      console.error('Failed to load projects from Firebase:', error);
      return [];
    }
  },

  // Delete project from Firebase
  deleteProject: async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      console.log(`🗑️ Project deleted from Firebase: ${projectId}`);
      return true;
    } catch (error) {
      console.error('Failed to delete project from Firebase:', error);
      throw error;
    }
  },

  // Load project by ID from Firebase
  loadProjectById: async (projectId) => {
    try {
      // This would require a different approach with Firebase
      // For now, we'll load all projects and filter
      const projects = await FirebaseStorage.loadProjects();
      return projects.find(p => p.id === projectId);
    } catch (error) {
      console.error('Failed to load project from Firebase:', error);
      return null;
    }
  }
};

// Local Storage utilities (for session data only)
const LocalStorage = {
  // Save current session (auto-save)
  saveCurrentSession: (html, css, js, projectName) => {
    try {
      const session = { html, css, js, projectName, timestamp: new Date().toISOString() };
      localStorage.setItem('codeStudioCurrentSession', JSON.stringify(session));
      console.log('💫 Auto-saved current session to localStorage');
    } catch (error) {
      console.error('Failed to save session to localStorage:', error);
    }
  },

  // Load current session
  loadCurrentSession: () => {
    try {
      const stored = localStorage.getItem('codeStudioCurrentSession');
      if (stored) {
        const session = JSON.parse(stored);
        console.log('🔄 Loaded previous session from localStorage');
        return session;
      }
    } catch (error) {
      console.error('Failed to load session from localStorage:', error);
    }
    return null;
  },

  // Clear all local data
  clearAll: () => {
    localStorage.removeItem('codeStudioCurrentSession');
    console.log('🧹 Cleared all local session data');
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
  const [loading, setLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);
  const autoSaveTimeoutRef = useRef(null);

  // Load projects from Firebase and session from localStorage on mount
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Load projects from Firebase
        const firebaseProjects = await FirebaseStorage.loadProjects();
        setSavedProjects(firebaseProjects);

        // Load session from localStorage
        const session = LocalStorage.loadCurrentSession();
        if (session) {
          setHtml(session.html);
          setCss(session.css);
          setJs(session.js);
          setCurrentProjectName(session.projectName);
          console.log('🔄 Restored previous session');
        }
      } catch (error) {
        console.error('Failed to load initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Auto-save current session to localStorage
  useEffect(() => {
    if (autoSaveEnabled) {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        LocalStorage.saveCurrentSession(html, css, js, currentProjectName);
        setLastSaved(new Date().toLocaleTimeString());
      }, 2000);

      return () => {
        if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
      };
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
        </style>
      </head>
      <body>
        ${html}
        <script>
          // Override console methods to send messages to parent
          (function() {
            const origLog = console.log;
            const origError = console.error;
            const origWarn = console.warn;
            const origInfo = console.info;
            
            function sendToParent(level, args) {
              window.parent.postMessage({
                type: 'console',
                level: level,
                data: args,
                timestamp: new Date().toLocaleTimeString()
              }, '*');
            }
            
            console.log = function(...args) {
              sendToParent('log', args);
              origLog.apply(console, args);
            };
            
            console.error = function(...args) {
              sendToParent('error', args);
              origError.apply(console, args);
            };
            
            console.warn = function(...args) {
              sendToParent('warn', args);
              origWarn.apply(console, args);
            };
            
            console.info = function(...args) {
              sendToParent('info', args);
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
    setLastSaved(new Date().toLocaleTimeString());
    setConsoleOutput([]);
    if (!autoRun && iframeRef.current) {
      iframeRef.current.srcdoc = '';
    }
  };

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

  // Save project to Firebase
  const saveProject = async () => {
    const projectName = prompt('Enter project name:', currentProjectName);
    if (!projectName) return;
    
    const project = {
      name: projectName,
      html,
      css,
      js,
      timestamp: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    try {
      setLoading(true);
      let savedProject;
      
      // Check if project with same name exists
      const existingProject = savedProjects.find(p => p.name === projectName);
      
      if (existingProject) {
        // Update existing project
        savedProject = await FirebaseStorage.updateProject(existingProject.id, project);
        setSavedProjects(prev => prev.map(p => p.id === existingProject.id ? savedProject : p));
      } else {
        // Create new project
        savedProject = await FirebaseStorage.saveProject(project);
        setSavedProjects(prev => [...prev, savedProject]);
      }
      
      setCurrentProjectName(projectName);
      setLastSaved(new Date().toLocaleTimeString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log(`💾 Project "${projectName}" saved to Firebase`);
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadProjectById = async (projectId) => {
    try {
      setLoading(true);
      const project = await FirebaseStorage.loadProjectById(projectId);
      if (project) {
        setHtml(project.html);
        setCss(project.css);
        setJs(project.js);
        setCurrentProjectName(project.name);
        setLastSaved(new Date().toLocaleTimeString());
        setShowProjectManager(false);
        if (!autoRun && iframeRef.current) {
          iframeRef.current.srcdoc = '';
        }
        console.log(`📂 Loaded project from Firebase: ${project.name}`);
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      alert('Failed to load project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setLoading(true);
        await FirebaseStorage.deleteProject(projectId);
        const updatedProjects = savedProjects.filter(p => p.id !== projectId);
        setSavedProjects(updatedProjects);
        console.log('🗑️ Project deleted from Firebase');
      } catch (error) {
        console.error('Failed to delete project:', error);
        alert('Failed to delete project. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const createNewProject = () => {
    if (window.confirm('Create new project? Unsaved changes will be lost.')) {
      setHtml(TEMPLATES.blank.html);
      setCss(TEMPLATES.blank.css);
      setJs(TEMPLATES.blank.js);
      setCurrentProjectName('Untitled Project');
      setLastSaved(null);
      setConsoleOutput([]);
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

  const clearAllData = () => {
    if (window.confirm('Clear ALL saved projects and session data? This cannot be undone.')) {
      LocalStorage.clearAll();
      setSavedProjects([]);
      setHtml(TEMPLATES.blank.html);
      setCss(TEMPLATES.blank.css);
      setJs(TEMPLATES.blank.js);
      setCurrentProjectName('Untitled Project');
      setLastSaved(null);
      console.log('🧹 All local data cleared');
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
        setLastSaved(new Date().toLocaleTimeString());
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

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-blue-500" />
              <h1 className="text-xl font-bold">CodeStudio</h1>
            </div>
            <div className="text-sm opacity-70">
              {currentProjectName}
              {lastSaved && (
                <span className="ml-2 text-xs text-green-500">
                  • Auto-saved: {lastSaved}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Font Size:</label>
              <select 
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className={`px-2 py-1 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                {[12, 14, 16, 18, 20].map(size => (
                  <option key={size} value={size}>{size}px</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoRun"
                checked={autoRun}
                onChange={(e) => setAutoRun(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="autoRun" className="text-sm font-medium">Auto-run</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoSave"
                checked={autoSaveEnabled}
                onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="autoSave" className="text-sm font-medium">Auto-save session</label>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col h-[calc(100vh-73px)]">
        {/* Toolbar */}
        <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <select 
                onChange={(e) => loadTemplate(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} text-sm font-medium`}
              >
                <option value="">📁 Templates</option>
                {Object.entries(TEMPLATES).map(([key, template]) => (
                  <option key={key} value={key}>{template.name}</option>
                ))}
              </select>
              
              <select 
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} text-sm font-medium`}
              >
                <option value="split">Split View</option>
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
              
              <button
                onClick={createNewProject}
                className={`px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors text-sm font-medium flex items-center space-x-2`}
              >
                <Plus className="w-4 h-4" />
                <span>New</span>
              </button>
              
              <button
                onClick={() => setShowProjectManager(true)}
                className={`px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors text-sm font-medium flex items-center space-x-2`}
              >
                <FolderOpen className="w-4 h-4" />
                <span>Projects</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={saveProject}
                disabled={loading}
                className={`px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium flex items-center space-x-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save</span>
              </button>
              
              <button
                onClick={copyCode}
                className={`px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors text-sm font-medium flex items-center space-x-2`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              
              <button
                onClick={shareCode}
                className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors text-sm font-medium flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              
              <button
                onClick={downloadCode}
                className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors text-sm font-medium flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              
              {!autoRun && (
                <button
                  onClick={runCode}
                  className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors text-sm font-medium flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Run</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Editor and Preview */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Tabs */}
          <div className={`flex-1 flex flex-col ${layout === 'split' ? 'w-1/2' : layout === 'vertical' ? 'w-full' : 'w-1/2'} ${layout === 'horizontal' ? 'h-1/2' : 'h-full'}`}>
            <div className={`flex border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              {['html', 'css', 'js'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab 
                      ? theme === 'dark' 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-white text-gray-900'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.toUpperCase()}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex-1 relative" key={`editor-${showSettings}`}>
              <Editor
                height="100%"
                language={getLanguage()}
                value={getCurrentCode()}
                onChange={handleEditorChange}
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                options={{
                  fontSize,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  folding: true,
                  lineNumbersMinChars: 3,
                  scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto'
                  }
                }}
              />
            </div>
          </div>

          {/* Preview */}
          <div className={`flex-1 flex flex-col ${layout === 'split' ? 'w-1/2' : layout === 'vertical' ? 'w-full' : 'w-1/2'} ${layout === 'horizontal' ? 'h-1/2' : 'h-full'} border-l ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`flex items-center justify-between px-6 py-3 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-2">
                <Layout className="w-4 h-4" />
                <span className="text-sm font-medium">Preview</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearConsole}
                  className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                  title="Clear console"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => iframeRef.current?.requestFullscreen?.()}
                  className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <iframe
                ref={iframeRef}
                title="preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups"
                srcDoc={autoRun ? generateSrcDoc() : ''}
              />
            </div>
            
            {/* Console */}
            <div className={`border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'} max-h-32 overflow-y-auto`}>
              <div className="px-4 py-2 text-sm font-medium flex items-center justify-between">
                <span>Console</span>
                <span className="text-xs opacity-70">{consoleOutput.length} messages</span>
              </div>
              <div className="px-4 pb-2 font-mono text-sm">
                {consoleOutput.map((log, index) => (
                  <div
                    key={index}
                    className={`py-1 border-l-2 pl-2 ${
                      log.level === 'error' 
                        ? 'border-red-500 text-red-400' 
                        : log.level === 'warn'
                        ? 'border-yellow-500 text-yellow-400'
                        : log.level === 'info'
                        ? 'border-blue-500 text-blue-400'
                        : 'border-green-500 text-green-400'
                    }`}
                  >
                    <span className="opacity-70 text-xs">[{log.timestamp}]</span> {log.data.map(arg => 
                      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ')}
                  </div>
                ))}
                {consoleOutput.length === 0 && (
                  <div className="py-2 text-center text-gray-500 text-sm">
                    No console messages
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Manager Modal */}
      {showProjectManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
              <h2 className="text-xl font-bold">Project Manager</h2>
              <button
                onClick={() => setShowProjectManager(false)}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {savedProjects.length === 0 ? (
                <div className="text-center py-12">
                  <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No projects saved</h3>
                  <p className="text-gray-500">Your saved projects will appear here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} hover:shadow-lg transition-all`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium truncate flex-1">{project.name}</h3>
                        <div className="flex space-x-1 ml-2">
                          <button
                            onClick={() => loadProjectById(project.id)}
                            className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`}
                            title="Load project"
                          >
                            <FolderOpen className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`}
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(project.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                          HTML
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                          CSS
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                          JS
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className={`px-6 py-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex justify-between`}>
              <button
                onClick={clearAllData}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear All Data
              </button>
              <button
                onClick={() => setShowProjectManager(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg w-full max-w-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
              <h2 className="text-xl font-bold">Share Project</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="mb-4 text-sm opacity-70">Share this URL to collaborate:</p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className={`flex-1 px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} text-sm`}
                />
                <button
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex items-center space-x-3`}>
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
            <span className="font-medium">Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
}
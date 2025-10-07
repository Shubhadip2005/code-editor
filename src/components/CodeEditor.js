import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Layout, Maximize2, Code2, Share2, Download, Trash2, Settings, Moon, Sun, Save, FolderOpen, Copy, Check } from 'lucide-react';

const TEMPLATES = {
  blank: {
    name: 'Blank Canvas',
    html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>Start building something amazing!</p>\n</body>\n</html>',
    css: 'body {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  margin: 0;\n  padding: 40px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  color: white;\n}\n\nh1 {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n  animation: fadeIn 0.6s ease-in;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(-20px); }\n  to { opacity: 1; transform: translateY(0); }\n}',
    js: '// Your JavaScript code here\nconsole.log("🚀 Welcome to your project!");\n\n// Example: Add interactivity\ndocument.querySelector("h1").addEventListener("click", () => {\n  alert("Hello from JavaScript!");\n});'
  },
  landing: {
    name: 'Modern Landing Page',
    html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Product Launch</title>\n</head>\n<body>\n  <nav class="navbar">\n    <div class="logo">✨ YourBrand</div>\n    <ul class="nav-links">\n      <li><a href="#features">Features</a></li>\n      <li><a href="#pricing">Pricing</a></li>\n      <li><a href="#contact" class="nav-cta">Get Started</a></li>\n    </ul>\n  </nav>\n  \n  <section class="hero">\n    <div class="hero-content">\n      <h1 class="hero-title">Build Something Amazing</h1>\n      <p class="hero-subtitle">The perfect solution for your next project. Fast, secure, and scalable.</p>\n      <button class="cta-btn">Start Free Trial</button>\n    </div>\n  </section>\n  \n  <section id="features" class="features">\n    <h2>Why Choose Us</h2>\n    <div class="feature-grid">\n      <div class="feature-card">\n        <div class="feature-icon">⚡</div>\n        <h3>Lightning Fast</h3>\n        <p>Optimized performance that delivers results in milliseconds</p>\n      </div>\n      <div class="feature-card">\n        <div class="feature-icon">🔒</div>\n        <h3>Secure by Default</h3>\n        <p>Bank-level encryption and security protocols</p>\n      </div>\n      <div class="feature-card">\n        <div class="feature-icon">📈</div>\n        <h3>Infinitely Scalable</h3>\n        <p>Grows seamlessly with your business needs</p>\n      </div>\n    </div>\n  </section>\n</body>\n</html>',
    css: '* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  overflow-x: hidden;\n}\n\n.navbar {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem 5%;\n  background: rgba(26, 26, 46, 0.95);\n  backdrop-filter: blur(10px);\n  color: white;\n  z-index: 1000;\n  box-shadow: 0 2px 20px rgba(0,0,0,0.1);\n}\n\n.logo {\n  font-size: 1.5rem;\n  font-weight: bold;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.nav-links {\n  display: flex;\n  list-style: none;\n  gap: 2.5rem;\n  align-items: center;\n}\n\n.nav-links a {\n  color: white;\n  text-decoration: none;\n  transition: all 0.3s;\n  font-weight: 500;\n}\n\n.nav-links a:hover {\n  color: #4ecca3;\n  transform: translateY(-2px);\n}\n\n.nav-cta {\n  padding: 0.6rem 1.5rem;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-radius: 25px;\n  color: white !important;\n}\n\n.hero {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  position: relative;\n  overflow: hidden;\n}\n\n.hero::before {\n  content: "";\n  position: absolute;\n  width: 200%;\n  height: 200%;\n  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);\n  background-size: 50px 50px;\n  animation: drift 20s linear infinite;\n}\n\n@keyframes drift {\n  from { transform: translate(0, 0); }\n  to { transform: translate(50px, 50px); }\n}\n\n.hero-content {\n  text-align: center;\n  position: relative;\n  z-index: 1;\n  animation: fadeInUp 0.8s ease-out;\n}\n\n@keyframes fadeInUp {\n  from { opacity: 0; transform: translateY(30px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.hero-title {\n  font-size: 4rem;\n  margin-bottom: 1.5rem;\n  font-weight: 800;\n  line-height: 1.1;\n}\n\n.hero-subtitle {\n  font-size: 1.4rem;\n  margin-bottom: 2.5rem;\n  opacity: 0.95;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.cta-btn {\n  padding: 1.2rem 3rem;\n  font-size: 1.1rem;\n  background: white;\n  color: #667eea;\n  border: none;\n  border-radius: 50px;\n  cursor: pointer;\n  font-weight: 700;\n  transition: all 0.3s;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.2);\n}\n\n.cta-btn:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 15px 40px rgba(0,0,0,0.3);\n}\n\n.cta-btn:active {\n  transform: translateY(-1px);\n}\n\n.features {\n  padding: 6rem 5%;\n  background: #f8f9fa;\n}\n\n.features h2 {\n  text-align: center;\n  font-size: 3rem;\n  margin-bottom: 4rem;\n  color: #1a1a2e;\n  font-weight: 800;\n}\n\n.feature-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 2.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.feature-card {\n  background: white;\n  padding: 3rem 2rem;\n  border-radius: 20px;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.08);\n  transition: all 0.3s;\n  text-align: center;\n}\n\n.feature-card:hover {\n  transform: translateY(-10px);\n  box-shadow: 0 20px 50px rgba(0,0,0,0.15);\n}\n\n.feature-icon {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n}\n\n.feature-card h3 {\n  color: #667eea;\n  margin-bottom: 1rem;\n  font-size: 1.6rem;\n  font-weight: 700;\n}\n\n.feature-card p {\n  color: #666;\n  line-height: 1.6;\n  font-size: 1.05rem;\n}\n\n@media (max-width: 768px) {\n  .hero-title { font-size: 2.5rem; }\n  .hero-subtitle { font-size: 1.1rem; }\n  .nav-links { gap: 1.5rem; }\n}',
    js: 'document.querySelector(".cta-btn").addEventListener("click", () => {\n  console.log("🎉 User clicked CTA!");\n  alert("Welcome aboard! Let\'s get started.");\n});\n\n// Smooth scroll for navigation\ndocument.querySelectorAll(\'a[href^="#"]\').forEach(anchor => {\n  anchor.addEventListener("click", function(e) {\n    e.preventDefault();\n    const target = document.querySelector(this.getAttribute("href"));\n    if (target) {\n      target.scrollIntoView({ behavior: "smooth", block: "start" });\n    }\n  });\n});\n\n// Navbar background on scroll\nwindow.addEventListener("scroll", () => {\n  const navbar = document.querySelector(".navbar");\n  if (window.scrollY > 50) {\n    navbar.style.background = "rgba(26, 26, 46, 0.98)";\n  } else {\n    navbar.style.background = "rgba(26, 26, 46, 0.95)";\n  }\n});\n\nconsole.log("✨ Landing page loaded successfully!");'
  },
  interactive: {
    name: 'Interactive Dashboard',
    html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Interactive Demo</title>\n</head>\n<body>\n  <div class="container">\n    <h1>🎨 Interactive Design Studio</h1>\n    <p class="subtitle">Customize your design in real-time</p>\n    \n    <div class="controls">\n      <div class="control-group">\n        <label>Text Color\n          <input type="color" id="colorPicker" value="#667eea">\n        </label>\n      </div>\n      \n      <div class="control-group">\n        <label>Background\n          <input type="color" id="bgPicker" value="#f0f4ff">\n        </label>\n      </div>\n      \n      <div class="control-group">\n        <label>Font Size: <span id="sizeValue">36px</span>\n          <input type="range" id="fontSize" min="16" max="80" value="36">\n        </label>\n      </div>\n      \n      <div class="control-group">\n        <label>Border Radius: <span id="radiusValue">20px</span>\n          <input type="range" id="borderRadius" min="0" max="50" value="20">\n        </label>\n      </div>\n      \n      <input type="text" id="textInput" placeholder="Type your message..." value="Hello, Design!">\n    </div>\n    \n    <div id="display" class="display">Hello, Design!</div>\n    \n    <div class="button-group">\n      <button id="resetBtn" class="btn btn-primary">Reset All</button>\n      <button id="randomBtn" class="btn btn-secondary">Random Style</button>\n    </div>\n  </div>\n</body>\n</html>',
    css: 'body {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  margin: 0;\n  padding: 0;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.container {\n  background: white;\n  padding: 3rem;\n  border-radius: 30px;\n  box-shadow: 0 30px 80px rgba(0,0,0,0.3);\n  max-width: 700px;\n  width: 90%;\n  animation: slideUp 0.5s ease-out;\n}\n\n@keyframes slideUp {\n  from { opacity: 0; transform: translateY(30px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\nh1 {\n  text-align: center;\n  color: #1a1a2e;\n  margin-bottom: 0.5rem;\n  font-size: 2.5rem;\n  font-weight: 800;\n}\n\n.subtitle {\n  text-align: center;\n  color: #666;\n  margin-bottom: 2.5rem;\n  font-size: 1.1rem;\n}\n\n.controls {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  margin-bottom: 2.5rem;\n}\n\n.control-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\nlabel {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-weight: 600;\n  color: #333;\n  gap: 1rem;\n}\n\ninput[type="color"] {\n  width: 70px;\n  height: 45px;\n  border: 3px solid #e0e0e0;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\ninput[type="color"]:hover {\n  border-color: #667eea;\n  transform: scale(1.05);\n}\n\ninput[type="range"] {\n  flex: 1;\n  cursor: pointer;\n  height: 6px;\n  border-radius: 3px;\n  background: linear-gradient(to right, #667eea, #764ba2);\n}\n\ninput[type="text"] {\n  padding: 1rem;\n  border: 3px solid #e0e0e0;\n  border-radius: 12px;\n  font-size: 1.1rem;\n  transition: all 0.3s;\n  font-weight: 500;\n}\n\ninput[type="text"]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\n}\n\n.display {\n  background: #f0f4ff;\n  padding: 3rem;\n  border-radius: 20px;\n  text-align: center;\n  font-weight: 700;\n  color: #667eea;\n  font-size: 36px;\n  min-height: 120px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 2rem;\n  transition: all 0.3s ease;\n  box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);\n}\n\n.button-group {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n\n.btn {\n  padding: 1rem;\n  border: none;\n  border-radius: 12px;\n  font-size: 1rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.3s;\n  box-shadow: 0 4px 15px rgba(0,0,0,0.1);\n}\n\n.btn-primary {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n}\n\n.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n\n.btn-secondary {\n  background: white;\n  color: #667eea;\n  border: 3px solid #667eea;\n}\n\n.btn-secondary:hover {\n  background: #667eea;\n  color: white;\n  transform: translateY(-2px);\n}\n\n.btn:active {\n  transform: translateY(0);\n}',
    js: 'const colorPicker = document.getElementById("colorPicker");\nconst bgPicker = document.getElementById("bgPicker");\nconst fontSize = document.getElementById("fontSize");\nconst borderRadius = document.getElementById("borderRadius");\nconst sizeValue = document.getElementById("sizeValue");\nconst radiusValue = document.getElementById("radiusValue");\nconst textInput = document.getElementById("textInput");\nconst display = document.getElementById("display");\nconst resetBtn = document.getElementById("resetBtn");\nconst randomBtn = document.getElementById("randomBtn");\n\ncolorPicker.addEventListener("input", (e) => {\n  display.style.color = e.target.value;\n  console.log("Color changed to:", e.target.value);\n});\n\nbgPicker.addEventListener("input", (e) => {\n  display.style.background = e.target.value;\n});\n\nfontSize.addEventListener("input", (e) => {\n  const size = e.target.value;\n  display.style.fontSize = size + "px";\n  sizeValue.textContent = size + "px";\n});\n\nborderRadius.addEventListener("input", (e) => {\n  const radius = e.target.value;\n  display.style.borderRadius = radius + "px";\n  radiusValue.textContent = radius + "px";\n});\n\ntextInput.addEventListener("input", (e) => {\n  display.textContent = e.target.value || "Type something...";\n});\n\nresetBtn.addEventListener("click", () => {\n  colorPicker.value = "#667eea";\n  bgPicker.value = "#f0f4ff";\n  fontSize.value = "36";\n  borderRadius.value = "20";\n  textInput.value = "Hello, Design!";\n  \n  display.style.color = "#667eea";\n  display.style.background = "#f0f4ff";\n  display.style.fontSize = "36px";\n  display.style.borderRadius = "20px";\n  display.textContent = "Hello, Design!";\n  \n  sizeValue.textContent = "36px";\n  radiusValue.textContent = "20px";\n  \n  console.log("✨ Reset to defaults");\n});\n\nrandomBtn.addEventListener("click", () => {\n  const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);\n  const randomBg = "#" + Math.floor(Math.random()*16777215).toString(16);\n  const randomSize = Math.floor(Math.random() * 48) + 24;\n  const randomRadius = Math.floor(Math.random() * 40);\n  \n  colorPicker.value = randomColor;\n  bgPicker.value = randomBg;\n  fontSize.value = randomSize;\n  borderRadius.value = randomRadius;\n  \n  display.style.color = randomColor;\n  display.style.background = randomBg;\n  display.style.fontSize = randomSize + "px";\n  display.style.borderRadius = randomRadius + "px";\n  \n  sizeValue.textContent = randomSize + "px";\n  radiusValue.textContent = randomRadius + "px";\n  \n  console.log("🎲 Random style applied!");\n});\n\nconsole.log("🎨 Interactive studio ready!");'
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
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

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
    setConsoleOutput([]);
  };

  const shareCode = () => {
    try {
      const codeData = btoa(encodeURIComponent(JSON.stringify({ html, css, js })));
      const url = `${window.location.origin}${window.location.pathname}?code=${codeData}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      alert('Failed to generate share link');
    }
  };

  const downloadCode = () => {
    const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
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
    a.download = 'project.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveProject = () => {
    const projectName = prompt('Enter project name:');
    if (!projectName) return;
    
    const project = {
      name: projectName,
      html,
      css,
      js,
      timestamp: new Date().toISOString()
    };
    
    setSavedProjects(prev => [...prev, project]);
    alert(`Project "${projectName}" saved!`);
  };

  const loadProject = () => {
    if (savedProjects.length === 0) {
      alert('No saved projects');
      return;
    }
    
    const names = savedProjects.map((p, i) => `${i + 1}. ${p.name}`).join('\n');
    const choice = prompt(`Select project:\n${names}\n\nEnter number:`);
    
    if (choice) {
      const index = parseInt(choice) - 1;
      if (savedProjects[index]) {
        const project = savedProjects[index];
        setHtml(project.html);
        setCss(project.css);
        setJs(project.js);
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

  const formatCode = () => {
    let code = activeTab === 'html' ? html : activeTab === 'css' ? css : js;
    try {
      if (activeTab === 'css') {
        code = code.replace(/\{/g, ' {\n  ').replace(/;/g, ';\n  ').replace(/\}/g, '\n}');
      }
      if (activeTab === 'html') setHtml(code);
      else if (activeTab === 'css') setCss(code);
      else setJs(code);
    } catch (e) {
      console.error('Format failed');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('code');
    if (codeParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(codeParam)));
        setHtml(decoded.html);
        setCss(decoded.css);
        setJs(decoded.js);
      } catch (e) {
        console.error('Failed to load shared code');
      }
    }
  }, []);

  const getCode = () => {
    switch (activeTab) {
      case 'html': return html;
      case 'css': return css;
      case 'js': return js;
      default: return '';
    }
  };

  const setCode = (value) => {
    switch (activeTab) {
      case 'html': setHtml(value); break;
      case 'css': setCss(value); break;
      case 'js': setJs(value); break;
      default: console.warn(`Unexpected tab: ${activeTab}`); break;
    }
  };

  const editorBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const editorText = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const headerBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col`}>
      {/* Header */}
      <div className={`${headerBg} ${borderColor} border-b p-3 flex items-center justify-between flex-wrap gap-3 shadow-lg`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Code Studio
            </h1>
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
            onClick={saveProject}
            className={`flex items-center gap-1.5 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-3 py-2 rounded-lg text-sm font-medium transition`}
            title="Save Project"
          >
            <Save className="w-4 h-4" />
            Save
          </button>

          <button
            onClick={loadProject}
            className={`flex items-center gap-1.5 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-3 py-2 rounded-lg text-sm font-medium transition`}
            title="Load Project"
          >
            <FolderOpen className="w-4 h-4" />
            Load
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
          
          <button
            onClick={runCode}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md"
          >
            <Play className="w-4 h-4" />
            Run Code
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
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
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
        <div className={`${headerBg} ${borderColor} border-b p-4 flex items-center gap-6`}>
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
                <button
                  onClick={formatCode}
                  className={`text-xs ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  title="Format Code"
                >
                  Format
                </button>
              </div>
            </div>

            {/* Code Area */}
            <textarea
              value={getCode()}
              onChange={(e) => setCode(e.target.value)}
              className={`flex-1 ${editorBg} ${editorText} font-mono p-4 resize-none focus:outline-none leading-relaxed`}
              style={{ fontSize: `${fontSize}px`, tabSize: 2 }}
              spellCheck="false"
              placeholder={`Enter your ${activeTab.toUpperCase()} code here...`}
            />

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
            <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-mono">
              Live Preview
            </div>
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
    </div>
  );
}
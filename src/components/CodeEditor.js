import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Layout, Maximize2, Code2, Share2, Download, Trash2, Settings, Moon, Sun, Save, FolderOpen, Copy, Check, RefreshCw, Plus, X, Calendar } from 'lucide-react';
import Editor from '@monaco-editor/react';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// LZ String compression utilities (actual LZ algorithm)
const LZString = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
  
  compressToEncodedURIComponent: function(input) {
    if (input == null) return "";
    return this._compress(input, 6, function(a) {
      return LZString._keyStr.charAt(a);
    });
  },

  decompressFromEncodedURIComponent: function(input) {
    if (input == null) return "";
    if (input === "") return null;
    input = input.replace(/ /g, "+");
    return this._decompress(input.length, 32, function(index) {
      return LZString._keyStr.indexOf(input.charAt(index));
    });
  },

  _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
    if (uncompressed == null) return "";
    let i, value;
    const context_dictionary = {};
    const context_dictionaryToCreate = {};
    let context_c = "";
    let context_wc = "";
    let context_w = "";
    let context_enlargeIn = 2;
    let context_dictSize = 3;
    let context_numBits = 2;
    const context_data = [];
    let context_data_val = 0;
    let context_data_position = 0;

    for (let ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed.charAt(ii);
      if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }

      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
          if (context_w.charCodeAt(0) < 256) {
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position === bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 8; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position === bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position === bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 16; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position === bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn === 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | (value & 1);
            if (context_data_position === bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn === 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }

    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
        if (context_w.charCodeAt(0) < 256) {
          for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position === bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i = 0; i < 8; i++) {
            context_data_val = (context_data_val << 1) | (value & 1);
            if (context_data_position === bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position === bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i = 0; i < 16; i++) {
            context_data_val = (context_data_val << 1) | (value & 1);
            if (context_data_position === bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn === 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i = 0; i < context_numBits; i++) {
          context_data_val = (context_data_val << 1) | (value & 1);
          if (context_data_position === bitsPerChar - 1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }
      }
      context_enlargeIn--;
      if (context_enlargeIn === 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }

    value = 2;
    for (i = 0; i < context_numBits; i++) {
      context_data_val = (context_data_val << 1) | (value & 1);
      if (context_data_position === bitsPerChar - 1) {
        context_data_position = 0;
        context_data.push(getCharFromInt(context_data_val));
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }

    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position === bitsPerChar - 1) {
        context_data.push(getCharFromInt(context_data_val));
        break;
      } else context_data_position++;
    }
    return context_data.join('');
  },

  _decompress: function(length, resetValue, getNextValue) {
    const dictionary = [];
    let enlargeIn = 4;
    let dictSize = 4;
    let numBits = 3;
    let entry = "";
    const result = [];
    let i;
    let w;
    let bits, resb, maxpower, power;
    let c;
    const data = { val: getNextValue(0), position: resetValue, index: 1 };

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }

    bits = 0;
    maxpower = Math.pow(2, 2);
    power = 1;
    while (power !== maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position === 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }
      bits |= (resb > 0 ? 1 : 0) * power;
      power <<= 1;
    }

    switch (bits) {
      case 0:
        bits = 0;
        maxpower = Math.pow(2, 8);
        power = 1;
        while (power !== maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position === 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }
        c = String.fromCharCode(bits);
        break;
      case 1:
        bits = 0;
        maxpower = Math.pow(2, 16);
        power = 1;
        while (power !== maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position === 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }
        c = String.fromCharCode(bits);
        break;
      case 2:
        return "";
    }
    dictionary[3] = c;
    w = c;
    result.push(c);
    while (true) {
      if (data.index > length) {
        return "";
      }

      bits = 0;
      maxpower = Math.pow(2, numBits);
      power = 1;
      while (power !== maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position === 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2, 8);
          power = 1;
          while (power !== maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position === 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = String.fromCharCode(bits);
          c = dictSize - 1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2, 16);
          power = 1;
          while (power !== maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position === 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = String.fromCharCode(bits);
          c = dictSize - 1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
      }

      if (enlargeIn === 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result.push(entry);

      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;

      w = entry;

      if (enlargeIn === 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
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
  const [layout, setLayout] = useState('editorPreview');
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

  // Layout configuration
  const getLayoutClasses = () => {
    switch (layout) {
      case 'editorOnly':
        return {
          editor: 'w-full h-full',
          preview: 'hidden',
          console: 'hidden'
        };
      case 'editorConsole':
        return {
          editor: 'w-1/2 h-full',
          preview: 'hidden',
          console: 'w-1/2 h-full'
        };
      case 'fullPreview':
        return {
          editor: 'hidden',
          preview: 'w-full h-full',
          console: 'hidden'
        };
      case 'editorPreview':
      default:
        return {
          editor: 'w-1/2 h-full',
          preview: 'w-1/2 h-full',
          console: 'hidden'
        };
    }
  };

  const layoutClasses = getLayoutClasses();

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Top Bar */}
      <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">⚡ CodeStudio</h1>
          <div className="flex items-center space-x-2">
            <select 
              value={currentProjectName}
              onChange={(e) => {
                const selectedProject = savedProjects.find(p => p.name === e.target.value);
                if (selectedProject) {
                  loadProjectById(selectedProject.id);
                }
              }}
              className={`px-3 py-1 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <option value="Untitled Project">Untitled Project</option>
              {savedProjects.map((project) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
            <button
              onClick={createNewProject}
              className={`p-2 rounded hover:bg-opacity-80 transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              title="New Project"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {lastSaved && (
            <span className={`text-sm px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              💾 {lastSaved}
            </span>
          )}
          <button
            onClick={saveProject}
            disabled={loading}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'} ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500 text-white'}`}
          >
            <Save size={16} />
            <span>{loading ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className={`flex items-center justify-between p-3 border-b ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center space-x-4">
          {/* Layout Controls */}
          <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setLayout('editorPreview')}
              className={`p-2 rounded transition-colors ${
                layout === 'editorPreview' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
              title="Editor + Preview"
            >
              <Layout size={16} />
            </button>
            <button
              onClick={() => setLayout('editorOnly')}
              className={`p-2 rounded transition-colors ${
                layout === 'editorOnly' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
              title="Editor Only"
            >
              <Code2 size={16} />
            </button>
            <button
              onClick={() => setLayout('editorConsole')}
              className={`p-2 rounded transition-colors ${
                layout === 'editorConsole' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
              title="Editor + Console"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={() => setLayout('fullPreview')}
              className={`p-2 rounded transition-colors ${
                layout === 'fullPreview' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
              title="Full Preview"
            >
              <Play size={16} />
            </button>
          </div>

          {/* Template Selector */}
          <select 
            onChange={(e) => loadTemplate(e.target.value)}
            className={`px-3 py-1 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          >
            <option value="">Choose Template...</option>
            {Object.entries(TEMPLATES).map(([key, template]) => (
              <option key={key} value={key}>{template.name}</option>
            ))}
          </select>

          {/* Auto-run Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRun}
              onChange={(e) => setAutoRun(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Auto-run</span>
          </label>

          {!autoRun && (
            <button
              onClick={runCode}
              className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            >
              <Play size={14} />
              <span>Run</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={copyCode}
            className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={downloadCode}
            className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <Download size={14} />
            <span>Export</span>
          </button>

          <button
            onClick={shareCode}
            className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>

          <button
            onClick={() => setShowProjectManager(true)}
            className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <FolderOpen size={14} />
            <span>Projects</span>
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`p-4 border-b ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center space-x-6">
            <div>
              <label className="block text-sm font-medium mb-1">Font Size</label>
              <select 
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className={`px-3 py-1 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                {[12, 14, 16, 18, 20].map(size => (
                  <option key={size} value={size}>{size}px</option>
                ))}
              </select>
            </div>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSaveEnabled}
                onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Auto-save</span>
            </label>

            <button
              onClick={clearAllData}
              className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600 text-white'}`}
            >
              <Trash2 size={14} />
              <span>Clear All Data</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Section */}
        <div className={`flex flex-col ${layoutClasses.editor}`}>
          {/* Editor Tabs */}
          <div className={`flex border-b ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            {['html', 'css', 'js'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === tab 
                    ? theme === 'dark' 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-200 text-gray-900'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Monaco Editor */}
          <div className="flex-1">
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
                wordWrap: 'on',
                lineNumbers: 'on',
                folding: true,
                foldingHighlight: true,
                showFoldingControls: 'mouseover',
                matchBrackets: 'always',
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
          </div>
        </div>

        {/* Preview Section - Only show in layouts that include preview */}
        {(layout === 'editorPreview' || layout === 'fullPreview') && (
          <div className={`flex flex-col ${layoutClasses.preview} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`flex items-center justify-between p-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className="font-medium">Preview</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={runCode}
                  className={`p-1 rounded transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  title="Refresh Preview"
                >
                  <RefreshCw size={14} />
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
          </div>
        )}

        {/* Console Section - Only show in layouts that include console */}
        {(layout === 'editorConsole') && (
          <div className={`flex flex-col ${layoutClasses.console} ${theme === 'dark' ? 'bg-gray-800 border-l border-gray-700' : 'bg-white border-l border-gray-200'}`}>
            <div className={`flex items-center justify-between p-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className="font-medium">Console</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearConsole}
                  className={`p-1 rounded transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  title="Clear Console"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto font-mono text-sm">
              {consoleOutput.length === 0 ? (
                <div className={`p-4 text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Console output will appear here
                </div>
              ) : (
                consoleOutput.map((log, index) => (
                  <div
                    key={index}
                    className={`p-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} ${
                      log.level === 'error' ? 'text-red-400' :
                      log.level === 'warn' ? 'text-yellow-400' :
                      log.level === 'info' ? 'text-blue-400' :
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <span className={`text-xs mt-1 flex-shrink-0 ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {log.timestamp}
                      </span>
                      <span className="flex-1">
                        {log.data.map((item, i) => {
                          if (typeof item === 'object') {
                            return JSON.stringify(item, null, 2);
                          }
                          return String(item);
                        }).join(' ')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <div className={`flex items-center justify-between px-4 py-1 text-xs border-t ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'
      }`}>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <span>Lines:</span>
            <span className="font-mono">
              {getCurrentCode().split('\n').length}
            </span>
          </span>
          <span className="flex items-center space-x-1">
            <span>Chars:</span>
            <span className="font-mono">
              {getCurrentCode().length}
            </span>
          </span>
          <span className="flex items-center space-x-1">
            <span>Language:</span>
            <span className="font-mono uppercase">
              {getLanguage()}
            </span>
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className={`flex items-center space-x-1 ${autoRun ? 'text-green-400' : 'text-yellow-400'}`}>
            <span>Auto-run:</span>
            <span className="font-mono">
              {autoRun ? 'ON' : 'OFF'}
            </span>
          </span>
          <span className="flex items-center space-x-1">
            <span>Layout:</span>
            <span className="font-mono">
              {layout === 'editorPreview' ? 'Editor+Preview' : 
               layout === 'editorOnly' ? 'Editor Only' : 
               layout === 'editorConsole' ? 'Editor+Console' : 
               'Full Preview'}
            </span>
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <span>CodeStudio</span>
          <span className="text-gray-500">•</span>
          <span>v1.0</span>
        </div>
      </div>

      {/* Project Manager Modal */}
      {showProjectManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-4/5 h-4/5 rounded-lg p-6 flex flex-col ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Project Manager</h2>
              <button
                onClick={() => setShowProjectManager(false)}
                className={`p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto">
              {savedProjects.length === 0 ? (
                <div className={`text-center p-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  No projects saved yet
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
                    >
                      <h3 className="font-bold mb-2">{project.name}</h3>
                      <div className={`text-xs mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>Updated {formatDate(project.updatedAt)}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => loadProjectById(project.id)}
                          className={`flex-1 py-1 px-2 rounded text-sm transition-colors ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className={`py-1 px-2 rounded text-sm transition-colors ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                        >
                          Delete
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-1/2 rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-4">Share Your Project</h2>
            <p className="mb-4">Copy the link below to share your project:</p>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className={`flex-1 px-3 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`px-4 py-2 rounded transition-colors ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className={`w-full py-2 rounded transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
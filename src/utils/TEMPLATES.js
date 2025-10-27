export const TEMPLATES = {
  blank: {
    name: `Blank Canvas`,
    description: `Start from scratch`,
    html: 
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Start building something amazing!</p>
</body>
</html>`,
    css: 
`body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}`,
    js: 
`// Your JavaScript code here
console.log("🚀 Welcome to your project!");

// Example: Add interactivity
document.querySelector("h1").addEventListener("click", () => {
  alert("Hello from JavaScript!");
});`
  },
  landing: {
    name: `Modern Landing Page`,
    description: `Professional landing page template`,
    html: 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NeoTech - Future of Innovation</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="nav-wrapper">
                <div class="logo">
                    <h2>NeoTech</h2>
                    <span class="logo-dot"></span>
                </div>
                
                <!-- Mobile Menu Toggle -->
                <input type="checkbox" id="menu-toggle" class="menu-toggle">
                <label for="menu-toggle" class="hamburger">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </label>
                
                <nav class="nav">
                    <ul class="nav-links">
                        <li><a href="#home" class="nav-link">Home</a></li>
                        <li><a href="#about" class="nav-link">About</a></li>
                        <li><a href="#services" class="nav-link">Services</a></li>
                        <li><a href="#portfolio" class="nav-link">Portfolio</a></li>
                        <li><a href="#contact" class="nav-link">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-bg">
            <div class="hero-particles">
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
            </div>
        </div>
        
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge">
                    <span>🚀 Welcome to the Future</span>
                </div>
                
                <h1 class="hero-title">
                    <span class="title-line">Transform Your</span>
                    <span class="title-line gradient-text">Digital Vision</span>
                    <span class="title-line">Into Reality</span>
                </h1>
                
                <p class="hero-description">
                    Cutting-edge solutions that push boundaries and redefine possibilities. 
                    We craft exceptional digital experiences that inspire, engage, and deliver 
                    measurable results for forward-thinking businesses.
                </p>
                
                <div class="hero-buttons">
                    <a href="#contact" class="btn btn-primary">
                        <span>Start Your Journey</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                    <a href="#about" class="btn btn-secondary">
                        <span>Discover More</span>
                        <i class="fas fa-play"></i>
                    </a>
                </div>
                
                <div class="hero-stats">
                    <div class="stat">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">Projects Delivered</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">98%</div>
                        <div class="stat-label">Client Satisfaction</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">24/7</div>
                        <div class="stat-label">Support Available</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="scroll-indicator">
            <div class="scroll-arrow"></div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-waves">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
        </div>
        
        <div class="container">
            <div class="footer-content">
                <div class="footer-section footer-main">
                    <div class="footer-logo">
                        <h3>NeoTech</h3>
                        <span class="logo-dot"></span>
                    </div>
                    <p class="footer-desc">
                        Pioneering the future of digital innovation with cutting-edge 
                        technology solutions that transform businesses worldwide.
                    </p>
                    <div class="footer-awards">
                        <span class="award">🏆 Best Innovation 2024</span>
                        <span class="award">⭐ Top Rated Agency</span>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#services">Our Services</a></li>
                        <li><a href="#portfolio">Portfolio</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#careers">Careers</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul class="footer-links">
                        <li><a href="#web-dev">Web Development</a></li>
                        <li><a href="#mobile-app">Mobile Apps</a></li>
                        <li><a href="#ai-ml">AI & Machine Learning</a></li>
                        <li><a href="#cloud">Cloud Solutions</a></li>
                        <li><a href="#consulting">Consulting</a></li>
                        <li><a href="#support">24/7 Support</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Connect With Us</h4>
                    <div class="social-links">
                        <a href="#" class="social-link facebook" title="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-link twitter" title="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-link linkedin" title="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" class="social-link instagram" title="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="social-link youtube" title="YouTube">
                            <i class="fab fa-youtube"></i>
                        </a>
                        <a href="#" class="social-link github" title="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                    
                    <div class="contact-info">
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>shubhadipdas733.com</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>9432351677</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Kolkata, India</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p>&copy; 2025 NeoTech. All rights reserved.</p>
                    <div class="footer-bottom-links">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                        <a href="#cookies">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</body>
</html> `,
    css: 
`:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --dark-gradient: linear-gradient(135deg, #232526 0%, #414345 100%);
    --text-dark: #2c3e50;
    --text-light: #7f8c8d;
    --white: #ffffff;
    --shadow-light: 0 5px 20px rgba(0,0,0,0.1);
    --shadow-medium: 0 10px 40px rgba(0,0,0,0.15);
    --shadow-heavy: 0 20px 60px rgba(0,0,0,0.2);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --border-radius: 12px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    overflow-x: hidden;
    scroll-behavior: smooth;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Header Styles */
.header {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 1000;
    transition: var(--transition);
}

.nav-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    position: relative;
}

.logo {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.logo h2 {
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: -0.02em;
}

.logo-dot {
    width: 8px;
    height: 8px;
    background: var(--secondary-gradient);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
}

.menu-toggle {
    display: none;
}

.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 0.5rem;
}

.hamburger-line {
    width: 25px;
    height: 3px;
    background: var(--text-dark);
    margin: 3px 0;
    transition: var(--transition);
    border-radius: 2px;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2.5rem;
    align-items: center;
}

.nav-link {
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 500;
    font-size: 0.95rem;
    position: relative;
    transition: var(--transition);
    padding: 0.5rem 0;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-gradient);
    transition: width 0.3s ease;
}

.nav-link:hover {
    color: #667eea;
}

.nav-link:hover::after {
    width: 100%;
}

/* Hero Section */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.hero-particles {
    position: absolute;
    width: 100%;
    height: 100%;
}

.particle {
    position: absolute;
    background: var(--primary-gradient);
    border-radius: 50%;
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
}

.particle:nth-child(1) {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.particle:nth-child(2) {
    width: 120px;
    height: 120px;
    top: 60%;
    right: 10%;
    animation-delay: 2s;
}

.particle:nth-child(3) {
    width: 60px;
    height: 60px;
    top: 40%;
    left: 60%;
    animation-delay: 4s;
}

.particle:nth-child(4) {
    width: 40px;
    height: 40px;
    top: 80%;
    left: 30%;
    animation-delay: 1s;
}

.particle:nth-child(5) {
    width: 100px;
    height: 100px;
    top: 10%;
    right: 30%;
    animation-delay: 3s;
}

.particle:nth-child(6) {
    width: 70px;
    height: 70px;
    top: 70%;
    right: 50%;
    animation-delay: 5s;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(120deg); }
    66% { transform: translateY(20px) rotate(240deg); }
}

.hero-content {
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
}

.hero-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-light);
    animation: slideInDown 0.8s ease-out 0.3s both;
}

@keyframes slideInDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
}

.title-line {
    display: block;
    animation: slideInLeft 0.8s ease-out both;
}

.title-line:nth-child(2) { animation-delay: 0.2s; }
.title-line:nth-child(3) { animation-delay: 0.4s; }

@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
}

.gradient-text {
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
}

.hero-description {
    font-size: 1.25rem;
    color: var(--text-light);
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    animation: fadeIn 1s ease-out 0.6s both;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.hero-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 4rem;
    animation: slideInUp 0.8s ease-out 0.8s both;
}

@keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: var(--border-radius);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    border: 2px solid transparent;
}

.btn-primary {
    background: var(--primary-gradient);
    color: var(--white);
    box-shadow: var(--shadow-medium);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-heavy);
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.9);
    color: var(--text-dark);
    border: 2px solid rgba(102, 126, 234, 0.2);
    backdrop-filter: blur(10px);
}

.btn-secondary:hover {
    background: var(--primary-gradient);
    color: var(--white);
    transform: translateY(-3px);
    box-shadow: var(--shadow-medium);
}

.hero-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
    animation: fadeInUp 1s ease-out 1s both;
}

.stat {
    text-align: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-light);
    transition: var(--transition);
}

.stat:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
}

.stat-number {
    font-size: 2rem;
    font-weight: 800;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-light);
    font-weight: 500;
}

.scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 2s infinite;
}

.scroll-arrow {
    width: 2px;
    height: 40px;
    background: var(--primary-gradient);
    position: relative;
    border-radius: 2px;
}

.scroll-arrow::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: -3px;
    width: 8px;
    height: 8px;
    border-bottom: 2px solid #667eea;
    border-right: 2px solid #667eea;
    transform: rotate(45deg);
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
    40% { transform: translateX(-50%) translateY(-10px); }
    60% { transform: translateX(-50%) translateY(-5px); }
}

/* Footer Styles */
.footer {
    background: var(--dark-gradient);
    color: var(--white);
    position: relative;
    overflow: hidden;
}

.footer-waves {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
}

.footer-waves svg {
    width: 100%;
    height: 100%;
    fill: var(--white);
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 3rem;
    padding: 6rem 0 3rem;
    position: relative;
    z-index: 1;
}

.footer-main .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.footer-main h3 {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 1.8rem;
    font-weight: 800;
}

.footer-desc {
    color: #bdc3c7;
    margin-bottom: 2rem;
    line-height: 1.7;
}

.footer-awards {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.award {
    font-size: 0.9rem;
    color: #f39c12;
    font-weight: 500;
}

.footer-section h4 {
    color: var(--white);
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    position: relative;
}

.footer-section h4::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 30px;
    height: 2px;
    background: var(--primary-gradient);
}

.footer-links {
    list-style: none;
}

.footer-links li {
    margin-bottom: 0.75rem;
}

.footer-links a {
    color: #bdc3c7;
    text-decoration: none;
    transition: var(--transition);
    font-size: 0.95rem;
}

.footer-links a:hover {
    color: #667eea;
    transform: translateX(5px);
}

.social-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--white);
    transition: var(--transition);
    font-size: 1.1rem;
}

.social-link.facebook { background: #3b5998; }
.social-link.twitter { background: #1da1f2; }
.social-link.linkedin { background: #0077b5; }
.social-link.instagram { background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); }
.social-link.youtube { background: #ff0000; }
.social-link.github { background: #333; }

.social-link:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: var(--shadow-medium);
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #bdc3c7;
    font-size: 0.95rem;
}

.contact-item i {
    color: #667eea;
    width: 16px;
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem 0;
}

.footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.footer-bottom-links {
    display: flex;
    gap: 2rem;
}

.footer-bottom-links a {
    color: #bdc3c7;
    text-decoration: none;
    font-size: 0.9rem;
    transition: var(--transition);
}

.footer-bottom-links a:hover {
    color: #667eea;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .footer-content {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
}

@media (max-width: 768px) {
    .hamburger {
        display: flex;
    }

    .nav {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100vh;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: left 0.3s ease;
        z-index: 999;
    }

    .menu-toggle:checked + .hamburger + .nav {
        left: 0;
    }

    .menu-toggle:checked + .hamburger .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }

    .menu-toggle:checked + .hamburger .hamburger-line:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle:checked + .hamburger .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }

    .nav-links {
        flex-direction: column;
        gap: 3rem;
    }

    .nav-link {
        font-size: 1.5rem;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .hero-description {
        font-size: 1.1rem;
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }

    .btn {
        width: 250px;
        justify-content: center;
    }

    .hero-stats {
        gap: 1.5rem;
    }

    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 3rem;
    }

    .social-links {
        justify-content: center;
    }

    .footer-bottom-content {
        text-align: center;
        flex-direction: column;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 1rem;
    }

    .hero-title {
        font-size: 2rem;
    }

    .hero-description {
        font-size: 1rem;
    }

    .hero-stats {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .stat {
        width: 100%;
        max-width: 200px;
    }
}

/* Enhanced Hover Effects */
.nav-link, .footer-links a, .social-link, .btn {
    position: relative;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
}

.btn:hover::before {
    left: 100%;
}

/* Additional CSS Animations and Effects */
@keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
}

.hero-badge {
    background: linear-gradient(90deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,1) 50px, rgba(255,255,255,0.9) 100px);
    background-size: 200px 100%;
    animation: shimmer 3s infinite, slideInDown 0.8s ease-out 0.3s both;
}

/* Floating Animation for Stats */
.stat:nth-child(1) { animation-delay: 1s; }
.stat:nth-child(2) { animation-delay: 1.2s; }
.stat:nth-child(3) { animation-delay: 1.4s; }

.stat {
    animation: fadeInUp 1s ease-out both, float-subtle 4s ease-in-out infinite;
}

@keyframes float-subtle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
}

/* Enhanced Button Interactions */
.btn-primary {
    background-size: 200% 100%;
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #667eea 50%, #764ba2 75%, #667eea 100%);
    transition: background-position 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-primary:hover {
    background-position: 100% 0;
}

/* Scroll Enhancements */
.scroll-indicator {
    cursor: pointer;
}

.scroll-indicator:hover .scroll-arrow {
    animation: bounce 1s infinite, pulse 2s infinite;
}

/* Footer Wave Animation */
.footer-waves svg path {
    animation: wave 10s ease-in-out infinite;
    transform-origin: center;
}

@keyframes wave {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(1.1); }
}

/* Enhanced Social Link Hover Effects */
.social-link {
    position: relative;
    overflow: hidden;
}

.social-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.3s ease;
}

.social-link:hover::before {
    left: 100%;
}

/* Particle Movement Enhancement */
.particle:nth-child(odd) {
    animation-direction: alternate;
}

.particle:nth-child(even) {
    animation-direction: alternate-reverse;
}

/* Additional Responsive Enhancements */
@media (max-width: 1200px) {
    .hero-title {
        font-size: 3rem;
    }
}

@media (max-width: 992px) {
    .hero-title {
        font-size: 2.8rem;
    }
    
    .hero-stats {
        justify-content: space-around;
    }
}

@media (max-width: 576px) {
    .hero-badge {
        font-size: 0.8rem;
        padding: 0.6rem 1.2rem;
    }
    
    .btn {
        padding: 0.9rem 1.5rem;
        font-size: 0.95rem;
    }
    
    .social-links {
        grid-template-columns: repeat(2, 1fr);
        max-width: 200px;
        margin: 0 auto 2rem;
    }
}

/* Accessibility Enhancements */
.btn:focus,
.nav-link:focus,
.social-link:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .header {
        background: rgba(255, 255, 255, 1);
        border-bottom: 2px solid #000;
    }
    
    .btn-primary {
        background: #000;
        color: #fff;
        border: 2px solid #fff;
    }
    
    .btn-secondary {
        background: #fff;
        color: #000;
        border: 2px solid #000;
    }
}

/* Print Styles */
@media print {
    .header,
    .scroll-indicator,
    .hero-particles {
        display: none;
    }
    
    .hero {
        min-height: auto;
        padding: 2rem 0;
    }
    
    .footer {
        background: #fff;
        color: #000;
    }
}`,
    js: ``
  },
  lzstring_decoder: {
    name: `LZString URL Decoder`,
    description: `decode the LZString URL`,
    html: 
`<!DOCTYPE html>
<html>
<head>
    <title>URL Code Extractor</title>
</head>
<body>
    <h1>🔗 Code Editor URL Decoder</h1>
    
    <input type="text" id="urlInput" placeholder="Paste your share URL here" style="width: 80%; padding: 10px;">
    <button onclick="decodeURL()">Decode URL</button>
    <button onclick="clearAll()">Clear</button>
    
    <div id="loading" class="loading" style="display: none;">🔄 Decoding URL...</div>
    <div id="error" class="error" style="display: none;"></div>
    
    <div id="results" style="display: none;">
        <div class="project-info">
            <h3>📁 Project: <span id="projectName">Untitled</span></h3>
            <p>Last saved: <span id="projectTimestamp">Unknown</span></p>
        </div>
        
        <div class="tab-buttons">
            <button onclick="showTab('html')" class="active">HTML</button>
            <button onclick="showTab('css')">CSS</button>
            <button onclick="showTab('js')">JavaScript</button>
        </div>
        
        <div id="html" class="tab active">
            <h4>HTML Code:</h4>
            <textarea id="htmlCode"></textarea>
            <button onclick="copyCode('htmlCode')">Copy HTML</button>
        </div>
        
        <div id="css" class="tab">
            <h4>CSS Code:</h4>
            <textarea id="cssCode"></textarea>
            <button onclick="copyCode('cssCode')">Copy CSS</button>
        </div>
        
        <div id="js" class="tab">
            <h4>JavaScript Code:</h4>
            <textarea id="jsCode"></textarea>
            <button onclick="copyCode('jsCode')">Copy JavaScript</button>
        </div>
    </div>
</body>
</html>`,
    css: 
`body { font-family: Arial, sans-serif; margin: 40px; }
textarea { width: 100%; height: 200px; margin: 10px 0; font-family: monospace; }
button { padding: 10px 20px; margin: 5px; cursor: pointer; }
.tab { display: none; }
.active { display: block; }
.tab-buttons { margin: 20px 0; }
.tab-buttons button { background: #f0f0f0; border: 1px solid #ccc; }
.tab-buttons button.active { background: #007acc; color: white; }
.project-info { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
.error { color: red; }
.loading { color: blue; }`,
    js:
`const LZString = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
    
    decompressFromEncodedURIComponent: function(input) {
        if (input == null) return "";
        if (input == "") return null;
        input = input.replace(/ /g, "+");
        return this._decompress(input.length, 32, function(index) {
            return LZString._keyStr.indexOf(input.charAt(index));
        });
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
        while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
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
                while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
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
                while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
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
            while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
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
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
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
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
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

            if (enlargeIn == 0) {
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

            if (enlargeIn == 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
            }
        }
    }
};

function decodeURL() {
    const url = document.getElementById('urlInput').value.trim();
    if (!url) {
        showError('Please enter a URL');
        return;
    }
    
    try {
        showLoading();
        hideError();
        hideResults();

        const urlParams = new URLSearchParams(new URL(url).search);
        const compressedCode = urlParams.get('code');
        
        if (!compressedCode) {
            showError('No code parameter found in URL');
            hideLoading();
            return;
        }
        
        // Use the actual LZString decompression
        const decompressed = LZString.decompressFromEncodedURIComponent(compressedCode);
        
        if (!decompressed) {
            showError('Failed to decompress the code');
            hideLoading();
            return;
        }
        
        const projectData = JSON.parse(decompressed);
        
        // Display results
        document.getElementById('htmlCode').value = projectData.html || '';
        document.getElementById('cssCode').value = projectData.css || '';
        document.getElementById('jsCode').value = projectData.js || '';
        document.getElementById('projectName').textContent = projectData.name || 'Untitled Project';
        document.getElementById('projectTimestamp').textContent = projectData.timestamp ? new Date(projectData.timestamp).toLocaleString() : 'Unknown';
        
        hideLoading();
        showResults();
        
        console.log('✅ Successfully decoded project:', projectData.name);
        
    } catch (error) {
        hideLoading();
        showError('Error decoding URL: ' + error.message);
        console.error('Decoding error:', error);
    }
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    // Remove active class from all buttons
    document.querySelectorAll('.tab-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    // Show selected tab and activate button
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function copyCode(elementId) {
    const textarea = document.getElementById(elementId);
    textarea.select();
    document.execCommand('copy');
    alert('Code copied to clipboard!');
}

function clearAll() {
    document.getElementById('urlInput').value = '';
    document.getElementById('htmlCode').value = '';
    document.getElementById('cssCode').value = '';
    document.getElementById('jsCode').value = '';
    hideResults();
    hideError();
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    document.getElementById('error').style.display = 'none';
}

function showResults() {
    document.getElementById('results').style.display = 'block';
}

function hideResults() {
    document.getElementById('results').style.display = 'none';
}

// Auto-process if URL contains code parameter
window.addEventListener('load', function() {
    const currentUrlParams = new URLSearchParams(window.location.search);
    const currentCode = currentUrlParams.get('code');
    if (currentCode) {
        document.getElementById('urlInput').value = window.location.href;
        decodeURL();
    }
});`
  },
  contact_form:{
    name: `Contact Form`,
    description: `A Proffesional Contact Form`,
    html:
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Get In Touch</h1>
        <p class="subtitle">Fill out the form below and we'll get back to you soon.</p>
        
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>

        <div class="success-message" id="successMessage">
            <span>✓</span>
            <span>Thank you! Your message has been sent successfully.</span>
        </div>

        <form id="contactForm" novalidate>
            <div class="form-group">
                <label for="name">Name *</label>
                <div class="input-wrapper">
                    <input type="text" id="name" name="name" placeholder="Enter your full name" autocomplete="name">
                    <span class="validation-icon success">✓</span>
                    <span class="validation-icon error">✗</span>
                </div>
                <div class="error" id="nameError"></div>
            </div>

            <div class="form-group">
                <label for="email">Email *</label>
                <div class="input-wrapper">
                    <input type="email" id="email" name="email" placeholder="Enter your email address" autocomplete="email">
                    <span class="validation-icon success">✓</span>
                    <span class="validation-icon error">✗</span>
                </div>
                <div class="error" id="emailError"></div>
            </div>

            <div class="form-group">
                <label for="phone">Phone (Optional)</label>
                <div class="input-wrapper">
                    <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" autocomplete="tel">
                    <span class="validation-icon success">✓</span>
                    <span class="validation-icon error">✗</span>
                </div>
                <div class="error" id="phoneError"></div>
            </div>

            <div class="form-group">
                <label for="subject">Subject *</label>
                <div class="input-wrapper">
                    <select id="subject" name="subject">
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="business">Business Opportunity</option>
                        <option value="other">Other</option>
                    </select>
                    <span class="validation-icon success">✓</span>
                    <span class="validation-icon error">✗</span>
                </div>
                <div class="error" id="subjectError"></div>
            </div>

            <div class="form-group">
                <label for="message">Message *</label>
                <div class="input-wrapper">
                    <textarea id="message" name="message" placeholder="Type your message here..." maxlength="1000"></textarea>
                    <span class="validation-icon success">✓</span>
                    <span class="validation-icon error">✗</span>
                </div>
                <div class="char-count" id="charCount">0 / 1000 characters</div>
                <div class="error" id="messageError"></div>
            </div>

            <button type="submit">
                <span class="button-content">
                    <span class="spinner"></span>
                    <span class="button-text">Send Message</span>
                </span>
            </button>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>`,
    css:
`* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 100%;
    animation: slideIn 0.5s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

h1 {
    color: #333;
    margin-bottom: 10px;
    font-size: 28px;
}

.subtitle {
    color: #666;
    margin-bottom: 30px;
    font-size: 14px;
}

.form-group {
    margin-bottom: 25px;
    position: relative;
}

label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
    font-size: 14px;
}

.input-wrapper {
    position: relative;
}

input, textarea, select {
    width: 100%;
    padding: 12px 15px;
    padding-right: 40px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    transition: all 0.3s ease;
    background: white;
}

input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

textarea {
    resize: vertical;
    min-height: 120px;
}

.validation-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    display: none;
    pointer-events: none;
}

textarea + .validation-icon {
    top: 20px;
    transform: none;
}

.error {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 5px;
    display: none;
    animation: shake 0.3s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

.error.show {
    display: block;
}

input.invalid, textarea.invalid, select.invalid {
    border-color: #e74c3c;
    background: #fff5f5;
}

input.valid, textarea.valid, select.valid {
    border-color: #27ae60;
}

input.valid + .validation-icon.success,
textarea.valid + .validation-icon.success,
select.valid + .validation-icon.success {
    display: block;
    color: #27ae60;
}

input.invalid + .validation-icon.error,
textarea.invalid + .validation-icon.error,
select.invalid + .validation-icon.error {
    display: block;
    color: #e74c3c;
}

.char-count {
    font-size: 12px;
    color: #999;
    text-align: right;
    margin-top: 5px;
}

.char-count.warning {
    color: #f39c12;
}

.char-count.danger {
    color: #e74c3c;
}

button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

button:hover::before {
    width: 300px;
    height: 300px;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

button:active {
    transform: translateY(0);
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
}

.button-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    display: none;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

button.loading .spinner {
    display: block;
}

button.loading .button-text {
    display: none;
}

.success-message {
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    color: #155724;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: none;
    border: 1px solid #c3e6cb;
    animation: slideDown 0.5s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.success-message.show {
    display: flex;
    align-items: center;
    gap: 10px;
}

.progress-bar {
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    margin-bottom: 20px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    width: 0;
    transition: width 0.3s ease;
}

@media (max-width: 600px) {
    .container {
        padding: 30px 20px;
    }
    
    h1 {
        font-size: 24px;
    }
}`,
    js: 
`const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const subjectSelect = document.getElementById('subject');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');
const progressFill = document.getElementById('progressFill');
const charCount = document.getElementById('charCount');
const submitButton = form.querySelector('button[type="submit"]');

// Character counter for message
messageInput.addEventListener('input', function() {
    const length = this.value.length;
    charCount.textContent = \`\${length} / 1000 characters\`;
    
    if (length > 900) {
        charCount.classList.add('danger');
        charCount.classList.remove('warning');
    } else if (length > 800) {
        charCount.classList.add('warning');
        charCount.classList.remove('danger');
    } else {
        charCount.classList.remove('warning', 'danger');
    }
});

// Validation functions
function validateName(name) {
    const trimmed = name.trim();
    if (trimmed === '') {
        return { valid: false, message: 'Name is required' };
    }
    if (trimmed.length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters long' };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
        return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    return { valid: true, message: '' };
}

function validateEmail(email) {
    const trimmed = email.trim();
    if (trimmed === '') {
        return { valid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    return { valid: true, message: '' };
}

function validatePhone(phone) {
    const trimmed = phone.trim();
    if (trimmed === '') {
        return { valid: true, message: '' }; // Optional field
    }
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(trimmed) || trimmed.length < 10) {
        return { valid: false, message: 'Please enter a valid phone number' };
    }
    return { valid: true, message: '' };
}

function validateSubject(subject) {
    if (subject === '') {
        return { valid: false, message: 'Please select a subject' };
    }
    return { valid: true, message: '' };
}

function validateMessage(message) {
    const trimmed = message.trim();
    if (trimmed === '') {
        return { valid: false, message: 'Message is required' };
    }
    if (trimmed.length < 10) {
        return { valid: false, message: 'Message must be at least 10 characters long' };
    }
    if (trimmed.length > 1000) {
        return { valid: false, message: 'Message must not exceed 1000 characters' };
    }
    return { valid: true, message: '' };
}

// Show error message
function showError(input, errorElement, message) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Show success state
function showSuccess(input, errorElement) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    errorElement.classList.remove('show');
}

// Update progress bar
function updateProgress() {
    const fields = [nameInput, emailInput, subjectSelect, messageInput];
    let validCount = 0;

    fields.forEach(field => {
        if (field.classList.contains('valid')) {
            validCount++;
        }
    });

    const progress = (validCount / fields.length) * 100;
    progressFill.style.width = progress + '%';
}

// Real-time validation
nameInput.addEventListener('blur', function() {
    const result = validateName(this.value);
    if (!result.valid) {
        showError(this, document.getElementById('nameError'), result.message);
    } else {
        showSuccess(this, document.getElementById('nameError'));
    }
    updateProgress();
});

emailInput.addEventListener('blur', function() {
    const result = validateEmail(this.value);
    if (!result.valid) {
        showError(this, document.getElementById('emailError'), result.message);
    } else {
        showSuccess(this, document.getElementById('emailError'));
    }
    updateProgress();
});

phoneInput.addEventListener('blur', function() {
    const result = validatePhone(this.value);
    if (!result.valid) {
        showError(this, document.getElementById('phoneError'), result.message);
    } else if (this.value.trim() !== '') {
        showSuccess(this, document.getElementById('phoneError'));
    }
});

subjectSelect.addEventListener('change', function() {
    const result = validateSubject(this.value);
    if (!result.valid) {
        showError(this, document.getElementById('subjectError'), result.message);
    } else {
        showSuccess(this, document.getElementById('subjectError'));
    }
    updateProgress();
});

messageInput.addEventListener('blur', function() {
    const result = validateMessage(this.value);
    if (!result.valid) {
        showError(this, document.getElementById('messageError'), result.message);
    } else {
        showSuccess(this, document.getElementById('messageError'));
    }
    updateProgress();
});

// Clear validation on input
[nameInput, emailInput, phoneInput, subjectSelect, messageInput].forEach(input => {
    input.addEventListener('input', function() {
        if (this.classList.contains('invalid') || this.classList.contains('valid')) {
            this.classList.remove('invalid', 'valid');
            const errorElement = document.getElementById(this.id + 'Error');
            errorElement.classList.remove('show');
        }
    });
});

// Form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const nameResult = validateName(nameInput.value);
    const emailResult = validateEmail(emailInput.value);
    const phoneResult = validatePhone(phoneInput.value);
    const subjectResult = validateSubject(subjectSelect.value);
    const messageResult = validateMessage(messageInput.value);

    let isValid = true;

    if (!nameResult.valid) {
        showError(nameInput, document.getElementById('nameError'), nameResult.message);
        isValid = false;
    } else {
        showSuccess(nameInput, document.getElementById('nameError'));
    }

    if (!emailResult.valid) {
        showError(emailInput, document.getElementById('emailError'), emailResult.message);
        isValid = false;
    } else {
        showSuccess(emailInput, document.getElementById('emailError'));
    }

    if (!phoneResult.valid) {
        showError(phoneInput, document.getElementById('phoneError'), phoneResult.message);
        isValid = false;
    } else if (phoneInput.value.trim() !== '') {
        showSuccess(phoneInput, document.getElementById('phoneError'));
    }

    if (!subjectResult.valid) {
        showError(subjectSelect, document.getElementById('subjectError'), subjectResult.message);
        isValid = false;
    } else {
        showSuccess(subjectSelect, document.getElementById('subjectError'));
    }

    if (!messageResult.valid) {
        showError(messageInput, document.getElementById('messageError'), messageResult.message);
        isValid = false;
    } else {
        showSuccess(messageInput, document.getElementById('messageError'));
    }

    if (isValid) {
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        successMessage.classList.add('show');
        
        // Reset form
        form.reset();
        [nameInput, emailInput, phoneInput, subjectSelect, messageInput].forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        // Reset progress bar
        progressFill.style.width = '0%';
        charCount.textContent = '0 / 1000 characters';
        charCount.classList.remove('warning', 'danger');

        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        console.log('Form submitted:', {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            subject: subjectSelect.value,
            message: messageInput.value
        });
    } else {
        // Scroll to first error
        const firstError = form.querySelector('.invalid');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
});`
  }
    
};

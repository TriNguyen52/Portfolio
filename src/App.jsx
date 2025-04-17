import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import PageTransition from './components/PageTransition';
import BackgroundProvider from './components/BackgroundProvider';
import './App.css';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulate loading for smooth page transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle route change - reset scroll position and close mobile menu
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app">
      <BackgroundProvider>
        {/* Background elements */}
        <div className="grid-overlay"></div>
        <div className="noise"></div>
        
        {/* Loading screen */}
        {isLoading && (
          <div className="loading-screen">
            <div className="loading-icon">
              <span>TRI</span>
              <div className="loading-bar"></div>
            </div>
          </div>
        )}

        {/* Custom cursor */}
        <Cursor />
        
        {/* Header - modernized layout */}
        <header className="header">
          <div className="logo">
            <NavLink to="/" className="logo-link">TRI</NavLink>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          
          {/* Navigation */}
          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
              Home
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Projects
            </NavLink>
            <NavLink to="/resume" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Resume
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Contact
            </NavLink>
          </nav>
        </header>
        
        {/* Main content with page transitions */}
        <main className="main">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } />
              <Route path="/projects" element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              } />
              <Route path="/resume" element={
                <PageTransition>
                  <Resume />
                </PageTransition>
              } />
              <Route path="/contact" element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        
        {/* Footer */}
        <footer className="footer">
          <div className="container footer-container">
            <p>© {new Date().getFullYear()} TRI. All rights reserved.</p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </footer>
      </BackgroundProvider>
    </div>
  );
}

export default App;

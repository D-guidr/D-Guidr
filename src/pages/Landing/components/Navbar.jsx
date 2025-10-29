import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = (type) => {
    // Add blur effect to background
    const landingPage = document.querySelector('.landing-page');
    if (landingPage) {
      landingPage.style.filter = 'blur(5px)';
      landingPage.style.transition = 'filter 0.3s ease';
    }
    
    // Navigate to auth page
    setTimeout(() => {
      navigate(type === 'login' ? '/login' : '/signup');
    }, 300);
  };

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'D-Suite', href: '#d-suite' },
    { label: 'Community', href: '#community' },
    { label: 'Journey', href: '#overview' },
    { label: 'About Us', href: '#about us' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-brand">
          <img 
            src="/src/pages/Landing/assets/d-guider.png" 
            alt="D-Guidr" 
            className="brand-logo"
          />
          <span className="brand-text">Guidr</span>
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button 
            className="nav-btn login-btn"
            onClick={() => handleAuthClick('login')}
          >
            Sign in
          </button>
          <button 
            className="nav-btn join-btn"
            onClick={() => handleAuthClick('signup')}
          >
            Join now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`menu-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`menu-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`menu-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
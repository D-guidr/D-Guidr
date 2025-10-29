import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'D-Suite Tools', href: '#d-suite' },
        { name: 'Community', href: '#community' },
        { name: 'Success Stories', href: '#stats' },
        { name: 'Pricing', href: '#pricing' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'University Directory', href: '#universities' },
        { name: 'Visa Assistance', href: '#visa' },
        { name: 'Housing Help', href: '#housing' },
        { name: 'Job Board', href: '#jobs' },
        { name: 'Learning Center', href: '#learning' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'Contact Us', href: '#contact' },
        { name: 'FAQ', href: '#faq' },
        { name: '24/7 Support', href: '#support' },
        { name: 'Community Guidelines', href: '#guidelines' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Press Kit', href: '#press' },
        { name: 'Partners', href: '#partners' },
        { name: 'Blog', href: '#blog' }
      ]
    }
  ];

  // const socialLinks = [
  //   { name: 'LinkedIn', icon: '💼', href: '#linkedin' },
  //   { name: 'Twitter', icon: '🐦', href: '#twitter' },
  //   { name: 'Instagram', icon: '📷', href: '#instagram' },
  //   { name: 'YouTube', icon: '📺', href: '#youtube' },
  //   { name: 'Facebook', icon: '👥', href: '#facebook' }
  // ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'GDPR Compliance', href: '#gdpr' },
    { name: 'User Agreement', href: '#agreement' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <img 
                  src="/src/pages/Landing/assets/d-guider.png" 
                  alt="D-Guidr" 
                  className="logo-img"
                />
                <span className="logo-text">Guidr</span>
              </div>
              <p className="brand-description">
                Your complete companion for studying and building a career in Germany. 
                Join Europe's largest student community today.
              </p>
              
              {/* <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-link"
                    aria-label={social.name}
                  >
                    <span className="social-icon">{social.icon}</span>
                  </a>
                ))}
              </div> */}
            </div>

            <div className="footer-links-grid">
              {footerSections.map((section, index) => (
                <div key={index} className="footer-column">
                  <h4 className="column-title">{section.title}</h4>
                  <ul className="column-links">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href} className="footer-link">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-newsletter">
            <div className="newsletter-content">
              <div className="newsletter-image">
                <img src="/src/pages/Landing/assets/Hello.png" alt="Stay Updated" />
              </div>
              <div className="newsletter-text">
                <h4 className="newsletter-title">Stay Updated</h4>
                <p className="newsletter-subtitle">
                  Get the latest tips and updates for your German journey
                </p>
                
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="newsletter-input"
                  />
                  <button className="newsletter-btn">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            
            <div className="newsletter-features">
              <div className="feature">
                <span className="feature-icon">🚀</span>
                <span className="feature-text">Weekly insights</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💫</span>
                <span className="feature-text">No spam ever</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">Exclusive content</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <div className="legal-links">
              {legalLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <a href={link.href} className="legal-link">
                    {link.name}
                  </a>
                  {index < legalLinks.length - 1 && <span className="separator">•</span>}
                </React.Fragment>
              ))}
            </div>
            
            <div className="copyright">
              &copy; {currentYear} D-Guidr. All rights reserved. | Made with ❤️ for International Students
            </div>
          </div>

          {/* <div className="footer-badges">
            <div className="badge">
              <div className="badge-image">
                <img src="/src/pages/Landing/assets/cloud_sync.jpg" alt="Secure Platform" />
              </div>
              <span className="badge-text">Secure Platform</span>
            </div>
            <div className="badge">
              <div className="badge-image">
                <img src="/src/pages/Landing/assets/friends.jpg" alt="Global Community" />
              </div>
              <span className="badge-text">Global Community</span>
            </div>
            <div className="badge">
              <div className="badge-image">
                <img src="/src/pages/Landing/assets/learning.jpg" alt="Top Rated" />
              </div>
              <span className="badge-text">4.9/5 Rating</span>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useEffect, useState } from 'react';
//import { useAuth } from '../contexts/AuthContext';
import './HeroSection.css';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  //const { openAuthModal } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '350+', label: 'German Universities' },
    { number: '50K+', label: 'Active Students' },
    { number: '98%', label: 'Visa Success' }
  ];

  return (
    <section className="hero-section">
      <div className="hero-background">
        <img 
          src="/src/pages/Landing/assets/cloud_sync.jpg" 
          alt="D-Guidr Platform" 
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className={`hero-text ${isVisible ? 'visible' : ''}`}>
            {/* <div className="hero-badge">
              <span>D-Guidr</span>
            </div> */}
            
            <h1 className="hero-title">
              Your Complete Journey to
              <span className="gradient-text"> Germany</span>
              <br />
              Starts Here
            </h1>
            
            <p className="hero-subtitle">
              From university selection to career success – everything international students 
              need in one powerful platform. Join Europe's largest student community today.
            </p>

            <div className="hero-actions">
              <button 
                className="hero-btn primary"
                onClick={() => openAuthModal('signup')}
              >
                Start Free Journey
              </button>
              <button className="hero-btn secondary">
                Watch Demo Video
              </button>
            </div>

            {/* <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>

          <div className={`hero-visual ${isVisible ? 'visible' : ''}`}>
            <div className="visual-showcase">
              <div className="main-visual">
                <img 
                  src="/src/pages/Landing/assets/learning.jpg" 
                  alt="Learning Platform"
                  className="showcase-image main-image"
                />
              </div>
              
              <div className="side-visuals">
                <div className="side-image-container">
                  <img 
                    src="/src/pages/Landing/assets/friends.jpg" 
                    alt="Student Community"
                    className="showcase-image side-image"
                  />
                  <div className="image-label">Student Network</div>
                </div>
                
                <div className="side-image-container">
                  <img 
                    src="/src/pages/Landing/assets/travel.jpg" 
                    alt="Travel Experience"
                    className="showcase-image side-image"
                  />
                  <div className="image-label">Travel Support</div>
                </div>
                
                <div className="side-image-container">
                  <img 
                    src="/src/pages/Landing/assets/human (2).jpg" 
                    alt="Career Guidance"
                    className="showcase-image side-image"
                  />
                  <div className="image-label">Career Help</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default HeroSection;
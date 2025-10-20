import React, { useState } from 'react';
import './DSuiteSection.css';

const DSuiteSection = () => {
  const [activeModule, setActiveModule] = useState(0);

  const modules = [
    {
      number: 1,
      title: 'UniFinder Pro',
      description: 'AI-powered university selection with success probability calculator and SOP analyzer.',
      features: ['AI Matching Algorithm', 'Success Probability', 'SOP Analyzer', 'Real-time Updates'],
      image: '/src/pages/Landing/assets/learning.jpg',
      previewImage: '/src/pages/Landing/assets/cloud_sync.jpg',
      color: '#0073b1'
    },
    {
      number: 2,
      title: 'VisaMaster',
      description: 'Smart document checks, appointment tracking, and personalized visa checklists.',
      features: ['Document Verification', 'Appointment Scheduler', 'Checklist Manager', 'Status Tracking'],
      image: '/src/pages/Landing/assets/travel.jpg',
      previewImage: '/src/pages/Landing/assets/friends.jpg',
      color: '#00a0dc'
    },
    {
      number: 3,
      title: 'BlockAccount Manager',
      description: 'Compare providers, guided applications, and status tracking for blocked accounts.',
      features: ['Provider Comparison', 'Guided Setup', 'Status Tracking', 'Document Storage'],
      image: '/src/pages/Landing/assets/cloud_sync.jpg',
      previewImage: '/src/pages/Landing/assets/learning.jpg',
      color: '#0073b1'
    },
    {
      number: 4,
      title: 'ConnectGermany',
      description: 'Smart buddy-matching with verified students and city-based forums.',
      features: ['AI Matching', 'Verified Profiles', 'City Groups', 'Event Calendar'],
      image: '/src/pages/Landing/assets/friends.jpg',
      previewImage: '/src/pages/Landing/assets/travel.jpg',
      color: '#00a0dc'
    },
    {
      number: 5,
      title: 'HomeFind Germany',
      description: 'Aggregated housing search with virtual tours and verified landlord reviews.',
      features: ['Aggregated Listings', 'Virtual Tours', 'Landlord Verification', 'Contract Support'],
      image: '/src/pages/Landing/assets/human (2).jpg',
      previewImage: '/src/pages/Landing/assets/Hello.png',
      color: '#0073b1'
    },
    {
      number: 6,
      title: 'CareerBridge',
      description: 'Job board for students with German CV builder and interview support.',
      features: ['Job Board', 'CV Builder', 'Interview Prep', 'Work Hour Tracker'],
      image: '/src/pages/Landing/assets/Hello.png',
      previewImage: '/src/pages/Landing/assets/human (2).jpg',
      color: '#00a0dc'
    },
    {
      number: 7,
      title: 'Language Companion',
      description: 'Interactive German learning with voice recognition and cultural insights.',
      features: ['Voice Recognition', 'Cultural Lessons', 'Progress Tracking', 'Native Speaker Sessions'],
      image: '/src/pages/Landing/assets/learning.jpg',
      previewImage: '/src/pages/Landing/assets/cloud_sync.jpg',
      color: '#0073b1'
    },
    {
      number: 8,
      title: 'Health Connect',
      description: 'German health insurance comparison and doctor appointment booking.',
      features: ['Insurance Comparison', 'Doctor Finder', 'Appointment Booking', 'Emergency Support'],
      image: '/src/pages/Landing/assets/travel.jpg',
      previewImage: '/src/pages/Landing/assets/friends.jpg',
      color: '#00a0dc'
    },
    {
      number: 9,
      title: 'Alumni Network',
      description: 'Connect with successful alumni for mentorship and career guidance.',
      features: ['Mentor Matching', 'Career Guidance', 'Success Stories', 'Networking Events'],
      image: '/src/pages/Landing/assets/friends.jpg',
      previewImage: '/src/pages/Landing/assets/learning.jpg',
      color: '#0073b1'
    }
  ];

  return (
    <section id="d-suite" className="dsuite-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">D-Suite: Your Complete Toolkit</h2>
          <p className="section-subtitle">
            9 powerful modules designed to cover every aspect of your German journey
          </p>
        </div>

        <div className="dsuite-content">
          <div className="modules-sidebar">
            <div className="modules-grid">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className={`module-card interactive-card ${activeModule === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveModule(index)}
                  onClick={() => setActiveModule(index)}
                  style={{ '--module-color': module.color }}
                >
                  <div className="module-image">
                    <img src={module.image} alt={module.title} />
                  </div>
                  
                  <div className="module-content">
                    <div className="module-header">
                      <div className="module-number">{module.number}</div>
                      <h3 className="module-title">{module.title}</h3>
                    </div>
                    
                    <p className="module-description">{module.description}</p>
                    
                    <div className="module-features">
                      {module.features.slice(0, 2).map((feature, featureIndex) => (
                        <span key={featureIndex} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                      {module.features.length > 2 && (
                        <span className="feature-tag more">+{module.features.length - 2} more</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="module-hover-indicator"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="module-preview">
            <div className="preview-background">
              <img 
                src={modules[activeModule].previewImage} 
                alt={modules[activeModule].title}
                className="preview-bg-image"
              />
              <div className="preview-overlay"></div>
            </div>
            
            <div className="preview-content">
              <div className="preview-header">
                <div className="preview-badge">Module {modules[activeModule].number}</div>
                <h3 className="preview-title">{modules[activeModule].title}</h3>
              </div>
              
              <p className="preview-description">{modules[activeModule].description}</p>
              
              <div className="preview-features">
                <h4>Key Features:</h4>
                <div className="features-grid">
                  {modules[activeModule].features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature-item">
                      <span className="feature-check">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="preview-actions">
                <button className="preview-btn primary" style={{ background: modules[activeModule].color }}>
                  Try This Module
                </button>
                <button className="preview-btn secondary">
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="dsuite-cta">
          {/* <div className="cta-content">
            <h3>Ready to Access All 9 Modules?</h3>
            <p>Get complete access to the entire D-Suite toolkit and transform your German journey</p>
            <button className="cta-button">Start Free Trial</button>
          </div> */}
          {/* <div className="cta-visual">
            <div className="modules-showcase">
              {modules.slice(0, 9).map((module, index) => (
                <div key={index} className="showcase-module">
                  <img src={module.image} alt={module.title} />
                  <span>Module {module.number}</span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default DSuiteSection;
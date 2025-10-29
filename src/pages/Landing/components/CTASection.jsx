import React, { useEffect, useState } from 'react';
//import { useAuth } from '../contexts/AuthContext';
import './CTASection.css';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  //const { openAuthModal } = useAuth();

  useEffect(() => {
    // Animation will be handled entirely by CSS
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setSubmitStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({ 
        type: 'success', 
        message: '🎉 Welcome aboard! Check your email for next steps.' 
      });
      setEmail('');
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    { text: '7-day free trial' },
    { text: 'All D-Suite modules' },
    { text: 'Full community access' },
    { text: 'Personalized guidance' }
  ];

  return (
    <section className="cta-section section-padding">
      <div className="container">
        {/* Continuous Flight Animation (now inside container to be relative) */}
        <div className="flight-container">
          
         
          
        </div>

        <div className="cta-content">
          <div className="cta-text">
            <h2 className="cta-title">
              Ready to Start Your
              <span className="gradient-text"> German Journey</span>?
            </h2>
            <p className="cta-subtitle">
              Join thousands of students already succeeding with D-Guidr. 
              Get everything you need for your German education adventure in one place.
            </p>

            <div className="cta-features">
              {features.map((feature, index) => (
                <div key={index} className="feature">
                  <span className="feature-check">✓</span>
                  <span className="feature-text">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="cta-buttons">
              <button 
                className="cta-btn primary"
                onClick={() => openAuthModal('signup')}
              >
                Start Free Trial
              </button>
              <button className="cta-btn secondary">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
import React, { useEffect, useRef, useState } from 'react';
import './ProductOverview.css';

const ProductOverview = () => {
  const [activeStep, setActiveStep] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const journeySteps = [
    {
      step: 1,
      title: 'Dream & Discover',
      description: 'Explore 350+ German universities with AI-powered recommendations',
      image: '/src/pages/Landing/assets/learning.jpg',
      color: '#0073b1'
    },
    {
      step: 2,
      title: 'Plan & Prepare',
      description: 'Get complete visa guidance and document support',
      image: '/src/pages/Landing/assets/travel.jpg',
      color: '#00a0dc'
    },
    {
      step: 3,
      title: 'Connect & Network',
      description: 'Join 50K+ students in city-based communities',
      image: '/src/pages/Landing/assets/friends.jpg',
      color: '#0073b1'
    },
    {
      step: 4,
      title: 'Succeed & Thrive',
      description: 'Launch your career with German companies',
      image: '/src/pages/Landing/assets/human (2).jpg',
      color: '#00a0dc'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % journeySteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = journeySteps[activeStep].color;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.color = journeySteps[activeStep].color;
        particle.update();
        particle.draw();
      });

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = journeySteps[activeStep].color;
            ctx.globalAlpha = 0.2;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeStep]);

  return (
    <section id="overview" className="product-overview section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title"> Your Journey to Germany Starts Here</h2>
          <p className="section-subtitle">
            From dream to reality - we guide you every step of the way
          </p>
        </div>

        <div className="overview-content">
          <div className="journey-steps">
            {journeySteps.map((step, index) => (
              <div
                key={index}
                className={`journey-step ${activeStep === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(index)}
                style={{ '--step-color': step.color }}
              >
                <div className="step-indicator">
                  <div className="step-number">{step.step}</div>
                  <div className="step-line"></div>
                </div>
                
                <div className="step-content">
                  <div className="step-image">
                    <img src={step.image} alt={step.title} />
                  </div>
                  
                  <div className="step-text">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="animation-container">
            <canvas ref={canvasRef} className="background-animation"></canvas>
            
            {/* <div className="floating-elements">
              <div className="floating-element element-1">
                <span>🎓</span>
                <span>350+ Universities</span>
              </div>
              <div className="floating-element element-2">
                <span>👥</span>
                <span>50K+ Students</span>
              </div>
              <div className="floating-element element-3">
                <span>📈</span>
                <span>98% Success</span>
              </div>
              <div className="floating-element element-4">
                <span>🌍</span>
                <span>24/7 Support</span>
              </div>
            </div> */}

            <div className="central-message">
              <h3>Transform Your Future</h3>
              <p>Join thousands of successful students in Germany</p>
            </div>
          </div>
        </div>

        {/* <div className="journey-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${((activeStep + 1) / journeySteps.length) * 100}%`,
                background: journeySteps[activeStep].color
              }}
            ></div>
          </div>
          <div className="progress-text">
            Step {activeStep + 1} of {journeySteps.length}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ProductOverview;
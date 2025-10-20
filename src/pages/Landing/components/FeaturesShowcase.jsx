import React, { useEffect, useState } from 'react';
import './FeaturesShowcase.css';

const FeaturesShowcase = () => {
  const [animationStage, setAnimationStage] = useState('scattered');

  useEffect(() => {
    const stages = ['scattered', 'collected', 'blasted'];
    let currentStageIndex = 0;

    const cycleAnimation = () => {
      setAnimationStage(stages[currentStageIndex]);
      currentStageIndex = (currentStageIndex + 1) % stages.length;
    };

    // Initial delay then start cycling
    const initialTimer = setTimeout(() => {
      cycleAnimation();
      // Set up continuous cycling every 4 seconds
      const interval = setInterval(cycleAnimation, 4000);
      return () => clearInterval(interval);
    }, 1000);

    return () => {
      clearTimeout(initialTimer);
    };
  }, []);

  const features = [
  ];

  return (
    <section id="features" className="features-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Everything You <span className="gradient-text"> Need</span>, All in <span className="gradient-text"> One </span> Place</h2>
          <p className="section-subtitle">
            Navigate your  German education journey with confidence using our comprehensive toolkit
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
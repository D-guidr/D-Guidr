import React from 'react';
import './CommunitySection.css';

const CommunitySection = () => {
  const communityFeatures = [
    {
      title: 'Student Networks',
      description: 'Join city-specific groups and connect with students in your target universities across Germany.',
      features: ['Berlin Student Hub', 'Munich Tech Community', 'Business Network'],
      members: '10K+',
      image: '/src/pages/Landing/assets/friends.jpg',
      color: '#0073b1'
    },
    {
      title: 'Alumni Mentors',
      description: 'Get guidance from successful alumni who have walked the same path and can share valuable insights.',
      features: ['1-on-1 Mentorship', 'Career Guidance', 'University Tips'],
      members: '2K+',
      image: '/src/pages/Landing/assets/learning.jpg',
      color: '#00a0dc'
    },
    {
      title: 'Discussion Forums',
      description: 'Participate in active discussions about visas, accommodations, jobs, and life in Germany.',
      features: ['Q&A with Experts', 'Experience Sharing', 'Problem Solving'],
      members: '50K+',
      image: '/src/pages/Landing/assets/travel.jpg',
      color: '#0073b1'
    },
    {
      title: 'Events & Meetups',
      description: 'Join virtual and physical events, webinars, and networking sessions with the community.',
      features: ['Weekly Webinars', 'City Meetups', 'Career Fairs'],
      members: '1K+',
      image: '/src/pages/Landing/assets/cloud_sync.jpg',
      color: '#00a0dc'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Masters Student, TU Munich',
      image: '/src/pages/Landing/assets/human (2).jpg',
      content: 'D-Guidr helped me navigate the entire process from university selection to finding accommodation. The community support is incredible!',
      rating: 5
    },
    {
      name: 'Rahul Kumar',
      role: 'Software Engineer, Berlin',
      image: '/src/pages/Landing/assets/Hello.png',
      content: 'The D-Buddies network connected me with amazing people in Berlin. Found my apartment and first job through the platform!',
      rating: 5
    },
    {
      name: 'Ananya Patel',
      role: 'PhD Candidate, Heidelberg',
      image: '/src/pages/Landing/assets/friends.jpg',
      content: 'As an international student, the visa guidance and document support saved me months of confusion. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <section id="community" className="community-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Join Our Thriving Community</h2>
          <p className="section-subtitle">
            Connect with students, alumni, and experts across Germany in our vibrant community
          </p>
        </div>

        <div className="community-grid">
          {communityFeatures.map((feature, index) => (
            <div 
              key={index}
              className="community-card interactive-card"
              style={{ '--feature-color': feature.color }}
            >
              <div className="community-image">
                <img src={feature.image} alt={feature.title} />
                <div className="member-count">
                  <span className="count">{feature.members}</span>
                  <span className="label">Members</span>
                </div>
              </div>
              
              <div className="community-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                <div className="feature-list">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="feature-item">
                      <span className="bullet" style={{ background: feature.color }}></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button className="join-community-btn" style={{ background: feature.color }}>
                  Join Community
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-section">
          <h3 className="testimonials-title">Success Stories</h3>
          <p className="testimonials-subtitle">
            Hear from students who transformed their German journey with D-Guidr
          </p>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card interactive-card">
                <div className="testimonial-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                
                <div className="testimonial-content">
                  <div className="stars">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">"{testimonial.content}"</p>
                  
                  <div className="testimonial-author">
                    <div className="author-info">
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-role">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="community-stats">
          <div className="community-stat">
            <div className="stat-image">
              <img src="/src/pages/Landing/assets/learning.jpg" alt="Community Members" />
            </div>
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Active Community Members</div>
          </div>
          <div className="community-stat">
            <div className="stat-image">
              <img src="/src/pages/Landing/assets/travel.jpg" alt="Cities" />
            </div>
            <div className="stat-number">100+</div>
            <div className="stat-label">Cities Across Germany</div>
          </div>
          <div className="community-stat">
            <div className="stat-image">
              <img src="/src/pages/Landing/assets/cloud_sync.jpg" alt="Support" />
            </div>
            <div className="stat-number">24/7</div>
            <div className="stat-label">Active Discussions</div>
          </div>
          <div className="community-stat">
            <div className="stat-image">
              <img src="/src/pages/Landing/assets/friends.jpg" alt="Events" />
            </div>
            <div className="stat-number">500+</div>
            <div className="stat-label">Monthly Events</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
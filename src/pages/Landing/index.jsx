import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-gradient">D-Guidr</span>
          </h1>
          <p className="hero-subtitle">
            Connect with professionals, discover opportunities, and grow your career.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card">💼</div>
          <div className="floating-card">👥</div>
          <div className="floating-card">🚀</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose D-Guidr?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>Network</h3>
              <p>Connect with professionals in your industry</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Opportunities</h3>
              <p>Discover job opportunities and career growth</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Growth</h3>
              <p>Learn and grow with industry insights</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
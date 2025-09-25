import React from 'react'
import './Widgets.css'

const Widgets = () => {
  const newsItems = [
    {
      title: 'Tech Industry Trends 2024',
      source: 'Tech News • 2h ago',
      trending: true
    },
    {
      title: 'Remote Work Best Practices',
      source: 'Productivity • 4h ago'
    },
    {
      title: 'AI Revolution in Development',
      source: 'AI Today • 6h ago',
      trending: true
    }
  ]

  const suggestedUsers = [
    {
      name: 'Alex Johnson',
      title: 'Senior Product Designer',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=667eea&color=fff',
      mutual: 12
    },
    {
      name: 'Maria Garcia',
      title: 'Tech Lead at Startup',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=ff7e5f&color=fff',
      mutual: 8
    },
    {
      name: 'David Kim',
      title: 'Full Stack Developer',
      avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=4CAF50&color=fff',
      mutual: 5
    }
  ]

  const courses = [
    {
      title: 'Advanced React Patterns',
      provider: 'LinkedIn Learning',
      progress: 75
    },
    {
      title: 'Cloud Architecture',
      provider: 'Coursera',
      progress: 30
    },
    {
      title: 'Leadership Skills',
      provider: 'Udemy',
      progress: 100
    }
  ]

  return (
    <div className="widgets">
      {/* News & Updates */}
      <div className="widget-card">
        <div className="widget-header">
          <h3>LinkedIn News</h3>
          <span className="info-icon">ℹ️</span>
        </div>
        <div className="news-list">
          {newsItems.map((news, index) => (
            <div key={index} className="news-item">
              <div className="news-bullet"></div>
              <div className="news-content">
                <span className="news-title">{news.title}</span>
                <span className="news-source">{news.source}</span>
                {news.trending && <span className="trending-badge">Trending</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Connections */}
      <div className="widget-card">
        <div className="widget-header">
          <h3>People you may know</h3>
        </div>
        <div className="suggestions-list">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="suggestion-item">
              <img src={user.avatar} alt={user.name} className="suggestion-avatar" />
              <div className="suggestion-info">
                <span className="suggestion-name">{user.name}</span>
                <span className="suggestion-title">{user.title}</span>
                <span className="suggestion-mutual">{user.mutual} mutual connections</span>
              </div>
              <button className="connect-button">Connect</button>
            </div>
          ))}
        </div>
        <div className="widget-footer">
          <button className="see-all-button">See all</button>
        </div>
      </div>

      {/* Learning Recommendations */}
      <div className="widget-card">
        <div className="widget-header">
          <h3>Recommended learning</h3>
        </div>
        <div className="courses-list">
          {courses.map((course, index) => (
            <div key={index} className="course-item">
              <div className="course-info">
                <span className="course-title">{course.title}</span>
                <span className="course-provider">{course.provider}</span>
              </div>
              <div className="course-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{course.progress}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="widget-footer">
          <button className="see-all-button">Show all</button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="widget-footer-links">
        <div className="footer-links">
          <a href="#" className="footer-link">About</a>
          <a href="#" className="footer-link">Accessibility</a>
          <a href="#" className="footer-link">Help Center</a>
          <a href="#" className="footer-link">Privacy & Terms</a>
          <a href="#" className="footer-link">Ad Choices</a>
          <a href="#" className="footer-link">Advertising</a>
          <a href="#" className="footer-link">Business Services</a>
        </div>
        <div className="copyright">
          <span>D-Guidr Clone © 2024</span>
        </div>
      </div>
    </div>
  )
}

export default Widgets
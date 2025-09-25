import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './Sidebar.css'

const Sidebar = () => {
  const { user } = useAuth()

  const recentHashtags = [
    '#javascript', '#reactjs', '#webdevelopment', '#career', '#tech'
  ]

  const groups = [
    { name: 'React Developers', members: '245k' },
    { name: 'JavaScript Enthusiasts', members: '180k' },
    { name: 'Startup Founders', members: '95k' }
  ]

  return (
    <div className="sidebar">
      {/* Profile Card */}
      <div className="sidebar-card profile-card">
        <div className="card-background"></div>
        <div className="card-content">
          <img 
            src={user?.user_metadata?.avatar || 'https://ui-avatars.com/api/?name=User&background=667eea&color=fff'} 
            alt="Profile" 
            className="profile-avatar"
          />
          <h3 className="profile-name">
            {user?.user_metadata?.fullName || user?.user_metadata?.firstName || user?.email}
          </h3>
          <p className="profile-title">
            {user?.user_metadata?.title || 'Member at D-Guidr'}
          </p>
        </div>
        
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-label">Who viewed your profile</span>
            <span className="stat-value">128</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Connections</span>
            <span className="stat-value">1,245</span>
            <span className="stat-subtext">Grow your network</span>
          </div>
        </div>
        
        <div className="premium-promo">
          <span className="premium-icon">💎</span>
          <span>Access exclusive tools & insights</span>
        </div>
      </div>

      {/* Recent Hashtags */}
      <div className="sidebar-card">
        <div className="card-header">
          <h3>Recent Hashtags</h3>
        </div>
        <div className="hashtags-list">
          {recentHashtags.map((hashtag, index) => (
            <div key={index} className="hashtag-item">
              <span className="hashtag">#{hashtag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Groups */}
      <div className="sidebar-card">
        <div className="card-header">
          <h3>Groups you may like</h3>
        </div>
        <div className="groups-list">
          {groups.map((group, index) => (
            <div key={index} className="group-item">
              <div className="group-info">
                <span className="group-name">{group.name}</span>
                <span className="group-members">{group.members} members</span>
              </div>
              <button className="join-button">Join</button>
            </div>
          ))}
        </div>
        <div className="card-footer">
          <button className="see-all-button">See all</button>
        </div>
      </div>

      {/* Events */}
      <div className="sidebar-card">
        <div className="card-header">
          <h3>Upcoming Events</h3>
        </div>
        <div className="events-list">
          <div className="event-item">
            <div className="event-date">
              <span className="event-day">15</span>
              <span className="event-month">DEC</span>
            </div>
            <div className="event-details">
              <span className="event-title">React Conference 2024</span>
              <span className="event-time">Online • 10:00 AM</span>
            </div>
          </div>
          <div className="event-item">
            <div className="event-date">
              <span className="event-day">20</span>
              <span className="event-month">DEC</span>
            </div>
            <div className="event-details">
              <span className="event-title">Tech Networking Meetup</span>
              <span className="event-time">San Francisco • 6:00 PM</span>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="see-all-button">See all events</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
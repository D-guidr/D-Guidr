import React, { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './CreatePost.css'

const CreatePost = ({ onPostCreate }) => {
  const [content, setContent] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const { user } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim()) {
      onPostCreate(content)
      setContent('')
      setIsExpanded(false)
    }
  }

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const handleCancel = () => {
    setContent('')
    setIsExpanded(false)
  }

  return (
    <div className="create-post-card">
      <div className="create-post-header">
        <img 
          src={user?.user_metadata?.avatar || 'https://ui-avatars.com/api/?name=User&background=667eea&color=fff'} 
          alt="Your avatar" 
          className="user-avatar"
        />
        <div className="post-input-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Start a post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              className="post-input"
            />
            {isExpanded && (
              <div className="post-actions-expanded">
                <div className="action-buttons">
                  <button type="button" className="action-btn">
                    <span className="action-icon">📷</span>
                    <span>Photo</span>
                  </button>
                  <button type="button" className="action-btn">
                    <span className="action-icon">🎥</span>
                    <span>Video</span>
                  </button>
                  <button type="button" className="action-btn">
                    <span className="action-icon">📄</span>
                    <span>Document</span>
                  </button>
                </div>
                <div className="submit-buttons">
                  <button type="button" onClick={handleCancel} className="cancel-button">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="post-button"
                    disabled={!content.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      
      {!isExpanded && (
        <div className="post-options">
          <button className="option-btn">
            <span className="option-icon">📷</span>
            <span>Photo</span>
          </button>
          <button className="option-btn">
            <span className="option-icon">🎥</span>
            <span>Video</span>
          </button>
          <button className="option-btn">
            <span className="option-icon">📄</span>
            <span>Document</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default CreatePost
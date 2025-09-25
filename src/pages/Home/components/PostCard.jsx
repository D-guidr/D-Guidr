import React, { useState } from 'react'
import './PostCard.css'

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike(post.id)
  }

  const handleCommentClick = () => {
    setShowComments(!showComments)
    onComment(post.id)
  }

  const handleShareClick = () => {
    onShare(post.id)
  }

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
        <div className="post-user-info">
          <h4 className="user-name">{post.user.name}</h4>
          <p className="user-title">{post.user.title}</p>
          <span className="post-time">{post.timestamp}</span>
        </div>
        <button className="post-options-btn">⋯</button>
      </div>
      
      {/* Post Content */}
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      {/* Post Stats */}
      <div className="post-stats">
        <div className="stats-left">
          <span className="likes-count">{post.likes} likes</span>
          <span className="comments-count">{post.comments} comments</span>
          <span className="shares-count">{post.shares} shares</span>
        </div>
      </div>
      
      {/* Post Actions */}
      <div className="post-actions">
        <button 
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="action-icon">👍</span>
          <span>Like</span>
        </button>
        <button className="action-btn" onClick={handleCommentClick}>
          <span className="action-icon">💬</span>
          <span>Comment</span>
        </button>
        <button className="action-btn" onClick={handleShareClick}>
          <span className="action-icon">🔄</span>
          <span>Share</span>
        </button>
        <button className="action-btn">
          <span className="action-icon">📤</span>
          <span>Send</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          <div className="comment-input">
            <img 
              src="https://ui-avatars.com/api/?name=You&background=667eea&color=fff" 
              alt="Your avatar" 
              className="comment-avatar"
            />
            <input 
              type="text" 
              placeholder="Add a comment..." 
              className="comment-input-field"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard
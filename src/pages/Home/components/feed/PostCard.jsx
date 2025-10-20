// src/pages/Home/components/feed/PostCard.jsx
import { useState } from 'react';
import { Card } from '../../../../components/common/Card';
import { Avatar } from '../../../../components/common/Avatar';
import { Button } from '../../../../components/common/Button';
import { Badge } from '../../../../components/common/Badge';
import { useAuth } from '../../../../hooks/useAuth';
import { useApi } from '../../../../hooks/useApi';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, CheckCircle, Heart, Bookmark } from 'lucide-react';
import './PostCard.css';

export function PostCard({ post, onUpdate }) {
  const { user } = useAuth();
  const { post: apiPost, put } = useApi();
  const [isLiked, setIsLiked] = useState(post.user_has_liked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.user_has_bookmarked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await apiPost(`/api/posts/${post.id}/unlike`);
        setLikesCount(prev => prev - 1);
      } else {
        await apiPost(`/api/posts/${post.id}/like`);
        setLikesCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
      onUpdate?.(post.id, { 
        user_has_liked: !isLiked,
        likes_count: isLiked ? likesCount - 1 : likesCount + 1
      });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await apiPost(`/api/posts/${post.id}/unbookmark`);
      } else {
        await apiPost(`/api/posts/${post.id}/bookmark`);
      }
      setIsBookmarked(!isBookmarked);
      onUpdate?.(post.id, { user_has_bookmarked: !isBookmarked });
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const comment = await apiPost(`/api/posts/${post.id}/comments`, {
        content: newComment
      });

      setComments(prev => [comment, ...prev]);
      setNewComment('');
      onUpdate?.(post.id, { 
        comments_count: (post.comments_count || 0) + 1 
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Post by ${post.user?.name}`,
          text: post.content,
          url: `${window.location.origin}/post/${post.id}`
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${window.location.origin}/post/${post.id}`
        );
        // Show toast notification
        console.log('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postTime) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return postTime.toLocaleDateString();
  };

  const isAuthor = user?.id === post.user_id;

  return (
    <Card className="post-card">
      {/* Author Info */}
      <div className="post-header">
        <div className="post-author">
          <Avatar 
            src={post.user?.avatar_url} 
            fallback={post.user?.name?.charAt(0) || 'U'}
            size="medium"
          />
          <div className="author-info">
            <div className="author-name">
              <span>{post.user?.name}</span>
              {post.user?.is_verified && (
                <CheckCircle className="verified-badge" />
              )}
            </div>
            <p className="author-title">{post.user?.title}</p>
            <p className="post-time">{formatTime(post.created_at)}</p>
          </div>
        </div>
        
        <div className="post-actions">
          <Button 
            variant="ghost" 
            size="sm" 
            className="more-actions"
            onClick={handleBookmark}
          >
            <Bookmark 
              className={`bookmark-icon ${isBookmarked ? 'bookmarked' : ''}`} 
            />
          </Button>
          <Button variant="ghost" size="sm" className="more-actions">
            <MoreHorizontal className="more-icon" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="post-content">
        <p className="post-text">{post.content}</p>
        
        {post.image_url && (
          <div className="post-image">
            <img src={post.image_url} alt="Post content" />
          </div>
        )}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="post-tag">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Post Type Badge */}
      {post.type && post.type !== 'thought' && (
        <div className="post-type-badge">
          <Badge variant={post.type === 'news' ? 'default' : 'outline'}>
            {post.type === 'news' ? '📰 News' : 
             post.type === 'question' ? '❓ Question' :
             post.type === 'event' ? '📅 Event' : '💭 Thought'}
          </Badge>
        </div>
      )}

      {/* Engagement Stats */}
      <div className="post-stats">
        <div className="stat-item">
          <span>{likesCount} likes</span>
        </div>
        <div className="stat-actions">
          <span>{post.comments_count || 0} comments</span>
          <span>{post.shares_count || 0} shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="post-actions-bar">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`action-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? (
            <Heart className="action-icon filled" />
          ) : (
            <ThumbsUp className="action-icon" />
          )}
          <span className="action-label">Like</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="action-button"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="action-icon" />
          <span className="action-label">Comment</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="action-button"
          onClick={handleShare}
        >
          <Share2 className="action-icon" />
          <span className="action-label">Share</span>
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <Avatar 
                  src={comment.user?.avatar_url}
                  fallback={comment.user?.name?.charAt(0)}
                  size="small"
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.user?.name}</span>
                    <span className="comment-time">
                      {formatTime(comment.created_at)}
                    </span>
                  </div>
                  <p className="comment-text">{comment.content}</p>
                </div>
              </div>
            ))}
            
            {comments.length === 0 && (
              <div className="no-comments">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>

          {/* Add Comment */}
          <div className="add-comment">
            <Avatar 
              src={user?.avatar_url}
              fallback={user?.name?.charAt(0) || 'U'}
              size="small"
            />
            <div className="comment-input-container">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                className="comment-input"
                disabled={isSubmitting}
              />
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim() || isSubmitting}
                className="comment-submit"
              >
                {isSubmitting ? '...' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
// src/pages/Home/components/news/NewsCard.jsx
import { useState } from 'react';
import { Card } from '../../../../components/common/Card';
import { Badge } from '../../../../components/common/Badge';
import { useApi } from '../../../../hooks/useApi';
import { Clock, Bookmark, Share2, ExternalLink } from 'lucide-react';
import './NewsCard1.css';

export function NewsCard({ news }) {
  const { post } = useApi();
  const [isBookmarked, setIsBookmarked] = useState(news.user_has_bookmarked || false);
  const [imageError, setImageError] = useState(false);

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await post(`/api/news/${news.id}/unbookmark`);
      } else {
        await post(`/api/news/${news.id}/bookmark`);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: news.title,
          text: news.summary,
          url: news.source_url || `${window.location.origin}/news/${news.id}`
        });
      } else {
        await navigator.clipboard.writeText(
          news.source_url || `${window.location.origin}/news/${news.id}`
        );
        console.log('News link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing news:', error);
    }
  };

  const handleReadMore = () => {
    if (news.source_url) {
      window.open(news.source_url, '_blank', 'noopener,noreferrer');
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const newsTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - newsTime) / 1000);
    
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return newsTime.toLocaleDateString();
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Immigration': 'blue',
      'Career': 'green',
      'Culture': 'purple',
      'Education': 'orange',
      'Housing': 'red',
      'Finance': 'emerald',
      'Technology': 'indigo'
    };
    return colors[category] || 'gray';
  };

  return (
    <Card className="news-card">
      <div className="news-content">
        <div className="news-image-container">
          {!imageError && news.image_url ? (
            <img 
              src={news.image_url} 
              alt={news.title}
              className="news-image"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="news-image-placeholder">
              <span>📰</span>
            </div>
          )}
        </div>
        
        <div className="news-details">
          <div className="news-header">
            <Badge 
              variant="secondary" 
              className={`news-category category-${getCategoryColor(news.category)}`}
            >
              {news.category}
            </Badge>
            
            <div className="news-actions">
              <button 
                className={`news-action-button ${isBookmarked ? 'bookmarked' : ''}`}
                onClick={handleBookmark}
                title="Bookmark"
              >
                <Bookmark className="news-action-icon" />
              </button>
              <button 
                className="news-action-button"
                onClick={handleShare}
                title="Share"
              >
                <Share2 className="news-action-icon" />
              </button>
            </div>
          </div>

          <h4 className="news-title" onClick={handleReadMore}>
            {news.title}
          </h4>
          
          <p className="news-summary">{news.summary}</p>
          
          <div className="news-footer">
            <div className="news-time">
              <Clock className="time-icon" />
              <span>{formatTime(news.published_at || news.created_at)}</span>
            </div>
            
            {news.source_url && (
              <button 
                className="read-more-button"
                onClick={handleReadMore}
              >
                Read More
                <ExternalLink className="external-icon" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
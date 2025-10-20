// src/pages/Home/components/feed/MainFeed.jsx
import { useState, useEffect } from 'react';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { NewsCard } from '../news/NewsCard';
import { DSuiteHighlights } from '../dsuite/DSuiteHighlights';
import { LanguageChallenge } from '../language/LanguageChallenge';
import { Tabs } from '../../../../components/common/Tabs';
import { useApi } from '../../../../hooks/useApi';
import { useAuth } from '../../../../hooks/useAuth';
import './MainFeed.css';

export function MainFeed({ userData }) {
  const { get } = useApi();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [posts, setPosts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [postsData, newsData] = await Promise.all([
        get('/api/posts?page=1&limit=10'),
        get('/api/news?limit=5')
      ]);
      
      setPosts(postsData.posts || []);
      setNews(newsData.news || []);
      setHasMore(postsData.hasMore);
    } catch (error) {
      console.error('Error loading feed data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const postsData = await get(`/api/posts?page=${nextPage}&limit=10`);
      
      setPosts(prev => [...prev, ...(postsData.posts || [])]);
      setHasMore(postsData.hasMore);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handlePostUpdate = (postId, updates) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    switch (activeTab) {
      case 'news':
        return post.type === 'news';
      case 'following':
        return post.user?.is_following || post.user_id === user?.id;
      default:
        return true;
    }
  });

  const tabs = [
    { value: 'all', label: 'All Posts' },
    { value: 'news', label: 'News' },
    { value: 'following', label: 'Following' }
  ];

  if (loading && posts.length === 0) {
    return (
      <div className="main-feed">
        <div className="feed-loading">
          <div className="loading-spinner">Loading your feed...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-feed">
      <div className="feed-content">
        {/* Create Post */}
        <CreatePost onPostCreated={handlePostCreated} />

        {/* D-Suite Highlights */}
        <DSuiteHighlights userData={userData} />

        {/* Language Challenge Banner */}
        <LanguageChallenge userData={userData} />

        {/* Feed Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="feed-tabs"
        >
          <Tabs.List className="tabs-list">
            {tabs.map(tab => (
              <Tabs.Trigger 
                key={tab.value} 
                value={tab.value}
                className="tab-trigger"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          
          <Tabs.Content value="all" className="tab-content">
            <FeedContent 
              posts={filteredPosts}
              news={news}
              onPostUpdate={handlePostUpdate}
              onLoadMore={loadMorePosts}
              hasMore={hasMore}
              loading={loading}
            />
          </Tabs.Content>
          
          <Tabs.Content value="news" className="tab-content">
            <div className="news-feed">
              {news.map(item => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </Tabs.Content>
          
          <Tabs.Content value="following" className="tab-content">
            <FeedContent 
              posts={filteredPosts}
              onPostUpdate={handlePostUpdate}
              onLoadMore={loadMorePosts}
              hasMore={hasMore}
              loading={loading}
              showNews={false}
            />
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
}

function FeedContent({ posts, news = [], onPostUpdate, onLoadMore, hasMore, loading, showNews = true }) {
  return (
    <div className="feed-content-container">
      {posts.length === 0 ? (
        <div className="empty-feed">
          <div className="empty-icon">📝</div>
          <h3>No posts yet</h3>
          <p>Be the first to share something with the community!</p>
        </div>
      ) : (
        <>
          <div className="posts-list">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post}
                onUpdate={onPostUpdate}
              />
            ))}
          </div>

          {showNews && news.length > 0 && (
            <div className="news-section">
              <h3 className="section-title">Latest News</h3>
              <div className="news-list">
                {news.slice(0, 2).map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>
          )}

          {hasMore && (
            <div className="load-more-container">
              <button 
                onClick={onLoadMore}
                disabled={loading}
                className="load-more-button"
              >
                {loading ? 'Loading...' : 'Load More Posts'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
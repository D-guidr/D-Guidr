import React, { useState } from 'react'
import CreatePost from './CreatePost'
import PostCard from './PostCard'
import './Feed.css'

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        title: 'Software Engineer at Tech Corp',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff'
      },
      content: 'Just launched an amazing new project! So excited to share this with everyone. The team worked incredibly hard and the results speak for themselves.',
      timestamp: '2h ago',
      likes: 24,
      comments: 5,
      shares: 2,
      type: 'text'
    },
    {
      id: 2,
      user: {
        name: 'Sarah Wilson',
        title: 'Product Manager at Startup',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=ff7e5f&color=fff'
      },
      content: 'Looking for frontend developers with React experience. We\'re building something revolutionary in the fintech space. DM me if interested!',
      timestamp: '4h ago',
      likes: 42,
      comments: 12,
      shares: 8,
      type: 'text'
    },
    {
      id: 3,
      user: {
        name: 'Mike Chen',
        title: 'Senior Developer at CloudTech',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=4CAF50&color=fff'
      },
      content: 'Just completed my AWS Solutions Architect certification! 🎉 Huge shoutout to everyone who supported me through this journey.',
      timestamp: '6h ago',
      likes: 89,
      comments: 23,
      shares: 15,
      type: 'text'
    }
  ])

  const addPost = (content) => {
    const newPost = {
      id: posts.length + 1,
      user: {
        name: 'You',
        title: 'Member at D-Guidr',
        avatar: 'https://ui-avatars.com/api/?name=You&background=667eea&color=fff'
      },
      content,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      type: 'text'
    }
    setPosts([newPost, ...posts])
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1, liked: true }
        : post
    ))
  }

  const handleComment = (postId) => {
    // This would open a comment modal in a real app
    console.log('Comment on post:', postId)
  }

  const handleShare = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ))
  }

  return (
    <div className="feed">
      {/* Create Post Component */}
      <CreatePost onPostCreate={addPost} />
      
      {/* Posts Feed */}
      <div className="posts-container">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="load-more-container">
        <button className="load-more-button">
          Load more posts
        </button>
      </div>
    </div>
  )
}

export default Feed
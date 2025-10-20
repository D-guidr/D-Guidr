// src/pages/Home/components/feed/CreatePost.jsx
import { useState } from 'react';
import { Card } from '../../../../components/common/Card';
import { Avatar } from '../../../../components/common/Avatar';
import { Button } from '../../../../components/common/Button';
import { useAuth } from '../../../../hooks/useAuth';
import { useApi } from '../../../../hooks/useApi';
import { Image, Video, Calendar, HelpCircle, Lightbulb } from 'lucide-react';
import './CreatePost.css';

export function CreatePost({ onPostCreated }) {
  const { user } = useAuth();
  const { post } = useApi();
  const [isCreating, setIsCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState('thought');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;

    setIsCreating(true);
    try {
      const newPost = {
        content: postContent,
        type: postType,
        image_url: selectedImage,
        user_id: user.id,
        tags: extractTags(postContent)
      };

      const createdPost = await post('/api/posts', newPost);
      onPostCreated?.(createdPost);
      setPostContent('');
      setSelectedImage(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const extractTags = (content) => {
    const tagRegex = /#(\w+)/g;
    const tags = [];
    let match;
    while ((match = tagRegex.exec(content)) !== null) {
      tags.push(match[1]);
    }
    return tags;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you'd upload to cloud storage and get URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const postTypes = [
    { type: 'photo', icon: Image, label: 'Photo', color: 'blue' },
    { type: 'video', icon: Video, label: 'Video', color: 'green' },
    { type: 'event', icon: Calendar, label: 'Event', color: 'orange' },
    { type: 'question', icon: HelpCircle, label: 'Question', color: 'purple' },
    { type: 'thought', icon: Lightbulb, label: 'Thought', color: 'yellow' }
  ];

  return (
    <>
      <Card className="create-post-card">
        <div className="create-post-header">
          <Avatar 
            src={user?.avatar_url} 
            fallback={user?.name?.charAt(0) || 'U'} 
            size="medium"
          />
          <button 
            className="create-post-trigger"
            onClick={() => setShowModal(true)}
          >
            Share your thoughts or ask...
          </button>
        </div>

        <div className="create-post-separator"></div>

        <div className="create-post-actions">
          {postTypes.map(({ type, icon: Icon, label, color }) => (
            <Button
              key={type}
              variant="ghost"
              size="sm"
              className={`post-type-button post-type-${color}`}
              onClick={() => {
                setPostType(type);
                setShowModal(true);
              }}
            >
              <Icon className={`post-type-icon icon-${color}`} />
              <span className="post-type-label">{label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {showModal && (
        <div className="create-post-modal-overlay">
          <div className="create-post-modal">
            <div className="modal-header">
              <h3>Create Post</h3>
              <button onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="post-author">
                <Avatar 
                  src={user?.avatar_url} 
                  fallback={user?.name?.charAt(0) || 'U'}
                  size="medium"
                />
                <div>
                  <div className="author-name">{user?.name}</div>
                  <div className="post-type-badge">{postType}</div>
                </div>
              </div>

              <textarea
                className="post-textarea"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows="4"
              />

              {selectedImage && (
                <div className="post-image-preview">
                  <img src={selectedImage} alt="Post preview" />
                  <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
              )}

              <div className="modal-actions">
                <div className="action-buttons">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="image-upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-upload" className="action-button">
                    <Image className="w-4 h-4" />
                    Photo
                  </label>
                  
                  <select 
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    className="post-type-select"
                  >
                    {postTypes.map(({ type, label }) => (
                      <option key={type} value={type}>{label}</option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={handleCreatePost}
                  disabled={!postContent.trim() || isCreating}
                  className="post-submit-button"
                >
                  {isCreating ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
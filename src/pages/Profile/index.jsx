// src/components/profile/MobileProfileView.jsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Avatar } from '../../components/common/Avatar';
import { Progress } from '../../components/common/Progress';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useApi } from '../../hooks/useApi';
import { 
  GraduationCap, 
  FileText, 
  Building2, 
  Users, 
  Home as HomeIcon, 
  Briefcase, 
  Wallet, 
  Languages, 
  ShoppingBag,
  TrendingUp,
  Bookmark,
  Settings,
  Share2,
  Edit,
  Mail,
  MapPin,
  Calendar,
  Target,
  Award,
  Star,
  Zap,
  Clock
} from 'lucide-react';
import './index.css';

export function Profile({ userData: propUserData }) {
  const { user } = useAuth();
  const { get, post } = useApi();
  const [userData, setUserData] = useState(propUserData);
  const [journeyProgress, setJourneyProgress] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!propUserData) {
      loadProfileData();
    } else {
      setLoading(false);
    }
  }, [propUserData]);

  const loadProfileData = async () => {
    try {
      const [profileData, progressData, activityData, statsData] = await Promise.all([
        get('/api/user/profile'),
        get('/api/user/journey-progress'),
        get('/api/user/recent-activity?limit=5'),
        get('/api/user/stats')
      ]);

      setUserData(profileData);
      setJourneyProgress(progressData);
      setRecentActivity(activityData.activities || []);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading profile data:', error);
      setUserData(getDefaultUserData());
      setJourneyProgress(getDefaultProgress());
      setRecentActivity(getDefaultActivity());
      setStats(getDefaultStats());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultUserData = () => ({
    name: user?.name || 'Arjun Patel',
    title: 'MS in Computer Science',
    status: 'TU Munich (Applying)',
    profile_views: 142,
    buddies_count: 89,
    avatar_url: user?.avatar_url,
    email: user?.email || 'arjun.patel@example.com',
    location: 'Munich, Germany',
    join_date: '2024-01-15',
    bio: 'Passionate about technology and currently preparing for my Masters in Germany. Love connecting with fellow students!',
    cover_photo: null
  });

  const getDefaultProgress = () => ({
    german_level: { level: 'B1', progress: 65 },
    application: { progress: 40 },
    visa: { progress: 15 },
    milestones_achieved: 3
  });

  const getDefaultActivity = () => [
    {
      id: 1,
      type: 'application',
      title: 'Applied to TU Munich',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      color: 'blue'
    },
    {
      id: 2,
      type: 'language',
      title: 'Completed B1 Module 3',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      color: 'green'
    },
    {
      id: 3,
      type: 'community',
      title: 'Joined Tech Networking Group',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      color: 'purple'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Earned German Learner Badge',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      color: 'orange'
    }
  ];

  const getDefaultStats = () => ({
    posts_count: 24,
    connections_count: 89,
    groups_joined: 12,
    events_attended: 8,
    lessons_completed: 45,
    streak_days: 7
  });

  const dsuitModules = [
    { icon: GraduationCap, name: "UniFinder Pro", color: "text-blue-600", path: "/dsuite/unifinder" },
    { icon: FileText, name: "VisaMaster", color: "text-green-600", path: "/dsuite/visamaster" },
    { icon: Building2, name: "BlockAccount Manager", color: "text-purple-600", path: "/dsuite/blockaccount" },
    { icon: Users, name: "ConnectGermany", color: "text-pink-600", path: "/dsuite/connect" },
    { icon: HomeIcon, name: "HomeFind Germany", color: "text-orange-600", path: "/dsuite/homefind" },
    { icon: Briefcase, name: "CareerBridge Germany", color: "text-indigo-600", path: "/dsuite/careerbridge" },
    { icon: Wallet, name: "FinanceManager", color: "text-emerald-600", path: "/dsuite/finance" },
    { icon: Languages, name: "DeutschMaster", color: "text-red-600", path: "/dsuite/deutschmaster" },
    { icon: ShoppingBag, name: "IndiaMart", color: "text-yellow-600", path: "/dsuite/indiamart" },
  ];

  const handleShareProfile = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${userData?.name}'s Profile - D-Guidr`,
          text: `Check out ${userData?.name}'s profile on D-Guidr`,
          url: `${window.location.origin}/profile/${user?.id}`
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/profile/${user?.id}`);
        // Show toast notification
        console.log('Profile link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInDays = Math.floor((now - activityTime) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return activityTime.toLocaleDateString();
  };

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getActivityIcon = (type) => {
    const icons = {
      application: '📝',
      language: '🇩🇪',
      community: '👥',
      achievement: '🏆',
      job: '💼',
      housing: '🏠'
    };
    return icons[type] || '📌';
  };

  if (loading) {
    return (
      <div className="mobile-profile-view loading">
        <div className="skeleton-profile">
          <div className="skeleton-cover"></div>
          <div className="skeleton-avatar"></div>
          <div className="skeleton-content">
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
            <div className="skeleton-stats"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-profile-view">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="cover-photo">
          {userData?.cover_photo ? (
            <img src={userData.cover_photo} alt="Cover" />
          ) : (
            <div className="cover-placeholder"></div>
          )}
          <div className="header-actions">
            <Button 
              size="sm" 
              variant="ghost" 
              className="edit-button"
              onClick={() => window.location.href = '/profile/edit'}
            >
              <Edit className="button-icon" />
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="share-button"
              onClick={handleShareProfile}
            >
              <Share2 className="button-icon" />
              Share
            </Button>
          </div>
        </div>

        <div className="profile-info">
          <Avatar 
            src={userData?.avatar_url} 
            fallback={userData?.name?.charAt(0) || 'U'}
            size="xlarge"
            className="profile-avatar"
          />
          
          <div className="profile-details">
            <h1 className="profile-name">{userData?.name}</h1>
            <p className="profile-title">{userData?.title}</p>
            <p className="profile-status">{userData?.status}</p>
            
            <div className="profile-meta">
              <div className="meta-item">
                <Mail className="meta-icon" />
                <span>{userData?.email}</span>
              </div>
              <div className="meta-item">
                <MapPin className="meta-icon" />
                <span>{userData?.location}</span>
              </div>
              <div className="meta-item">
                <Calendar className="meta-icon" />
                <span>Joined {formatJoinDate(userData?.join_date)}</span>
              </div>
            </div>

            {userData?.bio && (
              <p className="profile-bio">{userData.bio}</p>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{userData?.profile_views || 0}</span>
            <span className="stat-label">Profile Views</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userData?.buddies_count || 0}</span>
            <span className="stat-label">D-Buddies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats?.posts_count || 0}</span>
            <span className="stat-label">Posts</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          Progress
        </button>
        <button 
          className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            {/* Journey Progress */}
            <Card className="progress-card">
              <div className="card-header">
                <h3 className="card-title">
                  <TrendingUp className="title-icon" />
                  Your Journey Progress
                </h3>
              </div>
              
              <div className="progress-list">
                <div className="progress-item">
                  <div className="progress-info">
                    <span className="progress-label">German Level</span>
                    <span className="progress-value">
                      {journeyProgress.german_level?.level} - {journeyProgress.german_level?.progress}%
                    </span>
                  </div>
                  <Progress value={journeyProgress.german_level?.progress || 0} className="progress-bar" />
                </div>
                
                <div className="progress-item">
                  <div className="progress-info">
                    <span className="progress-label">Application</span>
                    <span className="progress-value">{journeyProgress.application?.progress}%</span>
                  </div>
                  <Progress value={journeyProgress.application?.progress || 0} className="progress-bar" />
                </div>
                
                <div className="progress-item">
                  <div className="progress-info">
                    <span className="progress-label">Visa Process</span>
                    <span className="progress-value">{journeyProgress.visa?.progress}%</span>
                  </div>
                  <Progress value={journeyProgress.visa?.progress || 0} className="progress-bar" />
                </div>
              </div>
              
              <div className="milestones-section">
                <Badge variant="secondary" className="milestones-badge">
                  <Target className="badge-icon" />
                  {journeyProgress.milestones_achieved || 0} Milestones Achieved
                </Badge>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="stats-card">
              <h3 className="card-title">This Week</h3>
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-icon">📚</div>
                  <div className="stat-info">
                    <span className="stat-number">{stats?.lessons_completed || 0}</span>
                    <span className="stat-label">Lessons</span>
                  </div>
                </div>
                <div className="stat-box">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <span className="stat-number">{stats?.connections_count || 0}</span>
                    <span className="stat-label">Connections</span>
                  </div>
                </div>
                <div className="stat-box">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-info">
                    <span className="stat-number">{stats?.streak_days || 0}</span>
                    <span className="stat-label">Day Streak</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* D-Suite Quick Access */}
            <Card className="dsuite-card">
              <div className="card-header">
                <h3 className="card-title">D-Suite Modules</h3>
                <TrendingUp className="header-icon" />
              </div>
              <div className="modules-list">
                {dsuitModules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <button
                      key={module.name}
                      className="module-item"
                      onClick={() => window.location.href = module.path}
                    >
                      <Icon className={`module-icon ${module.color}`} />
                      <span className="module-name">{module.name}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="progress-tab">
            <Card className="detailed-progress-card">
              <h3 className="card-title">Detailed Progress</h3>
              
              <div className="progress-category">
                <h4 className="category-title">German Learning</h4>
                <div className="category-progress">
                  <Progress value={journeyProgress.german_level?.progress || 0} className="category-bar" />
                  <span className="category-level">{journeyProgress.german_level?.level}</span>
                </div>
                <div className="category-stats">
                  <div className="category-stat">
                    <Zap className="stat-icon" />
                    <span>{stats?.streak_days || 0} day streak</span>
                  </div>
                  <div className="category-stat">
                    <Award className="stat-icon" />
                    <span>{stats?.lessons_completed || 0} lessons</span>
                  </div>
                </div>
              </div>

              <div className="progress-category">
                <h4 className="category-title">University Applications</h4>
                <div className="category-progress">
                  <Progress value={journeyProgress.application?.progress || 0} className="category-bar" />
                  <span className="category-level">{journeyProgress.application?.progress}%</span>
                </div>
                <div className="category-stats">
                  <div className="category-stat">
                    <GraduationCap className="stat-icon" />
                    <span>3 applications submitted</span>
                  </div>
                  <div className="category-stat">
                    <Clock className="stat-icon" />
                    <span>2 responses pending</span>
                  </div>
                </div>
              </div>

              <div className="progress-category">
                <h4 className="category-title">Visa Process</h4>
                <div className="category-progress">
                  <Progress value={journeyProgress.visa?.progress || 0} className="category-bar" />
                  <span className="category-level">{journeyProgress.visa?.progress}%</span>
                </div>
                <div className="category-stats">
                  <div className="category-stat">
                    <FileText className="stat-icon" />
                    <span>Documents collected</span>
                  </div>
                  <div className="category-stat">
                    <Calendar className="stat-icon" />
                    <span>Appointment scheduled</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="achievements-card">
              <h3 className="card-title">Achievements</h3>
              <div className="achievements-grid">
                <div className="achievement-item">
                  <div className="achievement-icon">🇩🇪</div>
                  <div className="achievement-info">
                    <span className="achievement-name">German Beginner</span>
                    <span className="achievement-desc">Complete A1 level</span>
                  </div>
                  <Badge variant="secondary" className="achievement-badge">
                    Earned
                  </Badge>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon">🎓</div>
                  <div className="achievement-info">
                    <span className="achievement-name">First Application</span>
                    <span className="achievement-desc">Submit first university application</span>
                  </div>
                  <Badge variant="secondary" className="achievement-badge">
                    Earned
                  </Badge>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon">👥</div>
                  <div className="achievement-info">
                    <span className="achievement-name">Social Butterfly</span>
                    <span className="achievement-desc">Connect with 50+ D-Buddies</span>
                  </div>
                  <Badge variant="outline" className="achievement-badge">
                    In Progress
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-tab">
            <Card className="activity-card">
              <h3 className="card-title">Recent Activity</h3>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-indicator">
                      <div className={`activity-dot bg-${activity.color}-600`}></div>
                    </div>
                    <div className="activity-content">
                      <p className="activity-title">{activity.title}</p>
                      <p className="activity-time">{formatTime(activity.timestamp)}</p>
                    </div>
                    <div className="activity-type">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                ))}
                
                {recentActivity.length === 0 && (
                  <div className="no-activity">
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="settings-card">
              <button 
                className="settings-button"
                onClick={() => window.location.href = '/settings'}
              >
                <Settings className="settings-icon" />
                <span>Settings & Privacy</span>
              </button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
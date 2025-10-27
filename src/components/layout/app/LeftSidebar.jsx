// src/components/layout/LeftSidebar.jsx
import { useState, useEffect } from 'react';
import { Card } from '../../common/Card';
import { Avatar } from '../../common/Avatar';
import { Progress } from '../../common/Progress';
import { Badge } from '../../common/Badge';
import { useAuth } from '../../../hooks/useAuth';
import { useApi } from '../../../hooks/useApi';
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
  Calendar,
  Target
} from 'lucide-react';
import './LeftSidebar.css';

export function LeftSidebar({ userData }) {
  const { user } = useAuth();
  const { get } = useApi();
  const [journeyProgress, setJourneyProgress] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSidebarData();
  }, []);

  const loadSidebarData = async () => {
    try {
      const [progressData, activityData] = await Promise.all([
        get('/api/user/journey-progress'),
        get('/api/user/recent-activity?limit=3')
      ]);

      setJourneyProgress(progressData);
      setRecentActivity(activityData.activities || []);
    } catch (error) {
      console.error('Error loading sidebar data:', error);
      setJourneyProgress(getDefaultProgress());
      setRecentActivity(getDefaultActivity());
    } finally {
      setLoading(false);
    }
  };

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
    }
  ];

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
      <div className="left-sidebar">
        <div className="sidebar-loading">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="left-sidebar">
      <div className="sidebar-content">
        {/* Profile Card */}
        <Card className="profile-card">
          <div className="profile-banner"></div>
          <div className="profile-content">
            <Avatar 
              src={user?.avatar_url} 
              fallback={user?.name?.charAt(0) || 'U'}
              size="large"
              className="profile-avatar"
            />
            <h3 className="profile-name">{user?.name || 'User'}</h3>
            <p className="profile-title">{userData?.title || 'Student'}</p>
            <p className="profile-status">{userData?.status || 'Planning to study in Germany'}</p>
          </div>
          
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-label">Profile Views</span>
              <span className="stat-value">{userData?.profile_views || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">D-Buddies</span>
              <span className="stat-value">{userData?.buddies_count || 0}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button 
              className="action-button"
              onClick={() => window.location.href = '/my-items'}
            >
              <Bookmark className="action-icon" />
              <span>My Items</span>
            </button>
          </div>
        </Card>

        {/* Journey Progress */}
        <Card className="progress-card">
          <h3 className="card-title">Your Journey Progress</h3>
          <div className="progress-list">
            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">German Level</span>
                <span className="progress-value">
                  {journeyProgress.german_level?.level} - {journeyProgress.german_level?.progress}%
                </span>
              </div>
              <Progress value={journeyProgress.german_level?.progress || 0} className="progress-bar" />
            </div>
            
            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Application</span>
                <span className="progress-value">{journeyProgress.application?.progress}%</span>
              </div>
              <Progress value={journeyProgress.application?.progress || 0} className="progress-bar" />
            </div>
            
            <div className="progress-item">
              <div className="progress-header">
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

        {/* D-Suite Quick Access */}
        <Card className="dsuite-card">
          <div className="card-header">
            <h3 className="card-title">D-Suite</h3>
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

        {/* Recent Activity */}
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

        {/* Quick Stats */}
        <Card className="stats-card">
          <h3 className="card-title">This Week</h3>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-icon">📚</div>
              <div className="stat-info">
                <span className="stat-number">5</span>
                <span className="stat-label">Lessons</span>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <span className="stat-number">3</span>
                <span className="stat-label">Connections</span>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <span className="stat-number">2</span>
                <span className="stat-label">Goals</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
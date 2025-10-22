// src/components/layout/app/MobileSidebar.jsx
import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../../components/common/Sheet';
import { Button } from '../../../components/common/Button';
import { Avatar } from '../../../components/common/Avatar';
import { Progress } from '../../../components/common/Progress';
import { Badge } from '../../../components/common/Badge';
import { Separator } from '../../../components/common/Separator';
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
  Settings,
  LogOut,
  MessageCircle,
  Gamepad2,
  Calendar,
  Newspaper,
  User,
  Target,
  Star,
  Zap
} from 'lucide-react';
import './MobileSidebar1.css';

export function MobileSidebar({ trigger }) {
  const { user, logout } = useAuth();
  const { get } = useApi();
  const [userData, setUserData] = useState(null);
  const [journeyProgress, setJourneyProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSidebarData();
  }, []);

  const loadSidebarData = async () => {
    try {
      const [userData, progressData] = await Promise.all([
        get('/api/user/profile'),
        get('/api/user/journey-progress')
      ]);

      setUserData(userData);
      setJourneyProgress(progressData);
    } catch (error) {
      console.error('Error loading mobile sidebar data:', error);
      setUserData(getDefaultUserData());
      setJourneyProgress(getDefaultProgress());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultUserData = () => ({
    name: user?.name || 'User',
    title: 'MS in Computer Science',
    status: 'TU Munich (Applying)',
    profile_views: 142,
    buddies_count: 89,
    avatar_url: user?.avatar_url
  });

  const getDefaultProgress = () => ({
    german_level: { level: 'B1', progress: 65 },
    application: { progress: 40 },
    visa: { progress: 15 },
    milestones_achieved: 3
  });

  const dsuitModules = [
    { 
      icon: GraduationCap, 
      name: "UniFinder Pro", 
      color: "text-blue-600",
      path: "/dsuite/unifinder",
      description: "University admissions"
    },
    { 
      icon: FileText, 
      name: "VisaMaster", 
      color: "text-green-600",
      path: "/dsuite/visamaster",
      description: "Visa application"
    },
    { 
      icon: Building2, 
      name: "BlockAccount Manager", 
      color: "text-purple-600",
      path: "/dsuite/blockaccount",
      description: "Financial requirements"
    },
    { 
      icon: Users, 
      name: "ConnectGermany", 
      color: "text-pink-600",
      path: "/dsuite/connect",
      description: "Social networking"
    },
    { 
      icon: HomeIcon, 
      name: "HomeFind Germany", 
      color: "text-orange-600",
      path: "/dsuite/homefind",
      description: "Housing search"
    },
    { 
      icon: Briefcase, 
      name: "CareerBridge Germany", 
      color: "text-indigo-600",
      path: "/dsuite/careerbridge",
      description: "Job opportunities"
    },
    { 
      icon: Wallet, 
      name: "FinanceManager", 
      color: "text-emerald-600",
      path: "/dsuite/finance",
      description: "Financial planning"
    },
    { 
      icon: Languages, 
      name: "DeutschMaster", 
      color: "text-red-600",
      path: "/dsuite/deutschmaster",
      description: "German learning"
    },
    { 
      icon: ShoppingBag, 
      name: "IndiaMart", 
      color: "text-yellow-600",
      path: "/dsuite/indiamart",
      description: "Indian groceries"
    },
  ];

  const quickActions = [
    { icon: Newspaper, name: "News", path: "/news", color: "text-blue-600" },
    { icon: MessageCircle, name: "Language Chat Rooms", path: "/chat", color: "text-green-600" },
    { icon: Gamepad2, name: "Language Games", path: "/games", color: "text-purple-600" },
    { icon: Briefcase, name: "Jobs", path: "/jobs", color: "text-orange-600" },
    { icon: Users, name: "Groups & Communities", path: "/groups", color: "text-pink-600" },
    { icon: Calendar, name: "Events", path: "/events", color: "text-red-600" },
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const getAchievementLevel = (milestones) => {
    if (milestones >= 10) return { level: "Expert", color: "text-purple-600", icon: "🏆" };
    if (milestones >= 5) return { level: "Advanced", color: "text-green-600", icon: "⭐" };
    if (milestones >= 3) return { level: "Intermediate", color: "text-blue-600", icon: "🎯" };
    return { level: "Beginner", color: "text-gray-600", icon: "🌱" };
  };

  if (loading) {
    return (
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0 overflow-y-auto">
          <div className="sidebar-loading">
            <div className="skeleton-header"></div>
            <div className="skeleton-content">
              <div className="skeleton-item"></div>
              <div className="skeleton-item"></div>
              <div className="skeleton-item"></div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const achievement = getAchievementLevel(journeyProgress.milestones_achieved || 0);

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left" className="mobile-sidebar-content">
        <SheetHeader className="sidebar-header">
          <div className="logo-section">
            <div className="logo-icon">
              <span>D</span>
            </div>
            <SheetTitle className="app-title">D-Guidr</SheetTitle>
          </div>
        </SheetHeader>

        <div className="sidebar-body">
          {/* Profile Card */}
          <div className="profile-section">
            <div className="profile-header">
              <Avatar 
                src={userData?.avatar_url} 
                fallback={userData?.name?.charAt(0) || 'U'}
                size="large"
                className="profile-avatar"
              />
              <div className="profile-info">
                <h3 className="profile-name">{userData?.name}</h3>
                <p className="profile-title">{userData?.title}</p>
                <p className="profile-status">{userData?.status}</p>
              </div>
            </div>
            
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-label">Profile Views</span>
                <span className="stat-value">{userData?.profile_views || 0}</span>
              </div>
              <div className="stat">
                <span className="stat-label">D-Buddies</span>
                <span className="stat-value">{userData?.buddies_count || 0}</span>
              </div>
            </div>

            <div className="achievement-badge">
              <span className="achievement-icon">{achievement.icon}</span>
              <span className={`achievement-level ${achievement.color}`}>
                {achievement.level} Explorer
              </span>
            </div>
          </div>

          <Separator className="sidebar-separator" />

          {/* Journey Progress */}
          <div className="progress-section">
            <h4 className="section-title">
              <TrendingUp className="section-icon" />
              Your Journey Progress
            </h4>
            
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

            <Badge variant="secondary" className="milestones-badge">
              <Target className="badge-icon" />
              {journeyProgress.milestones_achieved || 0} Milestones Achieved
            </Badge>
          </div>

          <Separator className="sidebar-separator" />

          {/* D-Suite Modules */}
          <div className="modules-section">
            <h4 className="section-title">
              <TrendingUp className="section-icon" />
              D-Suite Modules
            </h4>
            
            <div className="modules-grid">
              {dsuitModules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.name}
                    className="module-card"
                    onClick={() => handleNavigation(module.path)}
                  >
                    <div className={`module-icon-container ${module.color.replace('text-', 'bg-')}50`}>
                      <Icon className={`module-icon ${module.color}`} />
                    </div>
                    <div className="module-info">
                      <span className="module-name">{module.name}</span>
                      <span className="module-description">{module.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator className="sidebar-separator" />

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h4 className="section-title">Quick Access</h4>
            <div className="quick-actions-list">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.name}
                    className="quick-action-item"
                    onClick={() => handleNavigation(action.path)}
                  >
                    <Icon className={`action-icon ${action.color}`} />
                    <span className="action-name">{action.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator className="sidebar-separator" />

          {/* Account Actions */}
          <div className="account-section">
            <button 
              className="account-item"
              onClick={() => handleNavigation('/my-items')}
            >
              <Bookmark className="account-icon" />
              <span>My Items</span>
            </button>
            
            <button 
              className="account-item"
              onClick={() => handleNavigation('/profile')}
            >
              <User className="account-icon" />
              <span>My Profile</span>
            </button>
            
            <button 
              className="account-item"
              onClick={() => handleNavigation('/settings')}
            >
              <Settings className="account-icon" />
              <span>Settings</span>
            </button>
            
            <button 
              className="account-item logout-item"
              onClick={handleLogout}
            >
              <LogOut className="account-icon" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* App Version */}
          <div className="app-version">
            <span className="version-text">D-Guidr v1.0.0</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
// src/pages/Home/components/dsuite/DSuiteHighlights.jsx
import { useState, useEffect } from 'react';
import { AppLayout } from '../../../../components/layout/app/AppLayout';
import { Card } from '../../../../components/common/Card';
import { Button } from '../../../../components/common/Button';
import { useApi } from '../../../../hooks/useApi';
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
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import './DSuiteHighlights1.css';

export function DSuiteHighlights({ userData }) {
  const { get } = useApi();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModuleHighlights();
  }, []);

  const loadModuleHighlights = async () => {
    try {
      const data = await get('/api/dsuite/highlights');
      setModules(data.modules || getDefaultModules());
    } catch (error) {
      console.error('Error loading D-Suite highlights:', error);
      setModules(getDefaultModules());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultModules = () => [
    { 
      id: 'unifinder',
      icon: GraduationCap, 
      name: "UniFinder", 
      description: "University matches",
      color: "blue",
      progress: 65,
      action: "Review matches",
      status: "active",
      updatedAt: new Date().toISOString()
    },
    { 
      id: 'visamaster',
      icon: FileText, 
      name: "VisaMaster", 
      description: "Visa application",
      color: "green",
      progress: 30,
      action: "Submit docs",
      status: "pending",
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    { 
      id: 'careerbridge',
      icon: Briefcase, 
      name: "CareerBridge", 
      description: "Job opportunities",
      color: "indigo",
      progress: 0,
      action: "Explore jobs",
      status: "new",
      count: 12
    },
    { 
      id: 'deutschmaster',
      icon: Languages, 
      name: "DeutschMaster", 
      description: "Language learning",
      color: "red",
      progress: 45,
      action: "Continue lesson",
      status: "active",
      streak: 7
    }
  ];

  const getStatusBadge = (module) => {
    switch (module.status) {
      case 'active':
        return <span className="status-badge active">Active</span>;
      case 'pending':
        return <span className="status-badge pending">Action Needed</span>;
      case 'new':
        return <span className="status-badge new">New</span>;
      case 'completed':
        return <span className="status-badge completed">Completed</span>;
      default:
        return null;
    }
  };

  const getHighlightText = (module) => {
    if (module.streak) {
      return `🔥 ${module.streak} day streak`;
    }
    if (module.deadline) {
      const daysLeft = Math.ceil((new Date(module.deadline) - new Date()) / (1000 * 60 * 60 * 24));
      return `⏰ ${daysLeft} days left`;
    }
    if (module.count) {
      return `🎯 ${module.count} new opportunities`;
    }
    if (module.progress > 0) {
      return `📈 ${module.progress}% complete`;
    }
    return "🚀 Get started";
  };

  const handleModuleClick = (moduleId) => {
    // Navigate to the specific module
    window.location.href = `/dsuite/${moduleId}`;
  };

  const getModuleIcon = (icon, color) => {
    const IconComponent = icon;
    return <IconComponent className={`module-icon ${color}`} />;
  };

  if (loading) {
    return (
      <Card className="dsuite-highlights loading">
        <div className="skeleton-header"></div>
        <div className="skeleton-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-module"></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <card className="dsuite-highlights">
      <div className="highlights-header">
        <div className="header-left">
          <TrendingUp className="header-icon" />
          <h3>Quick Actions - D-Suite</h3>
        </div>
        <Button 
          variant="link" 
          size="sm" 
          className="view-all-button"
          onClick={() => window.location.href = '/dsuite'}
        >
          View All
          <ArrowRight className="arrow-icon" />
        </Button>
      </div>
      
      <div className="modules-grid">
        {modules.map((module) => (
          <button
            key={module.id}
            className={`module-card ${module.status}`}
            onClick={() => handleModuleClick(module.id)}
          >
            <div className="module-header">
              <div className={`module-avatar bg-${module.color}-50`}>
                {getModuleIcon(module.icon, `text-${module.color}-600`)}
              </div>
              {getStatusBadge(module)}
            </div>

            <div className="module-content">
              <div className="module-title-section">
                <span className="module-name">{module.name}</span>
                <p className="module-description">{module.description}</p>
              </div>
              
              <div className="module-highlight">
                {getHighlightText(module)}
              </div>

              {module.progress > 0 && (
                <div className="module-progress">
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill bg-${module.color}-600`}
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{module.progress}%</span>
                </div>
              )}
            </div>

            <div className="module-action">
              <span className="action-text">{module.action}</span>
              <ArrowRight className="action-arrow" />
            </div>
          </button>
        ))}
      </div>
    </card>
  );
}
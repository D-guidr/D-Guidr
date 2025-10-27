// // src/components/layout/MobileBottomNav.jsx
// import { useState, useEffect } from 'react';
// import { Home, Users, PlusCircle, Grid3x3, Bell, MessageSquare, LanguagesIcon } from 'lucide-react';
// import { Button } from '../../common/Button';
// import { Badge } from '../../common/Badge';
// import { Avatar } from '../../common/Avatar';
// import { useAuth } from '../../../hooks/useAuth';
// import { useApi } from '../../../hooks/useApi';
// import './MobileBottomNav.css';

// export function MobileBottomNav({ activeTab = "home", onTabChange }) {
//   const { user } = useAuth();
//   const { get } = useApi();
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [messageCount, setMessageCount] = useState(0);

//   useEffect(() => {
//     loadCounts();
//   }, []);

//   const loadCounts = async () => {
//     try {
//       const [notifications, messages] = await Promise.all([
//         get('/api/notifications/unread-count'),
//         get('/api/messages/unread-count')
//       ]);
//       setNotificationCount(notifications.count || 0);
//       setMessageCount(messages.count || 0);
//     } catch (error) {
//       console.error('Error loading counts:', error);
//     }
//   };

//   const navItems = [
//     { 
//       id: "home", 
//       icon: Home, 
//       label: "Home",
//       badge: 0
//     },
//     { 
//       id: "buddies", 
//       icon: Users, 
//       label: "D-Buddies",
//       badge: 0
//     },
//     { 
//       id: "create", 
//       icon: PlusCircle, 
//       label: "Create", 
//       isHighlight: true 
//     },
//     { 
//       id: "dsuite", 
//       icon: Grid3x3, 
//       label: "D-Suite",
//       badge: 0
//     },
//     { 
//       id: "language", 
//       icon: "LanguagesIcon",
//       label: "Spra", 
//       isSpra: true,
//       badge: 0
//     },
//   ];

//   const handleTabClick = (tabId) => {
//     if (tabId === 'create') {
//       // Open create post modal or navigate to create page
//       window.location.href = '/create';
//     if (tabId === 'language') return setShowLanguageMenu((s) => !s);
//       setShowLanguageMenu(false);
//     } else {
//       onTabChange?.(tabId);
//     }
//   };

//   return (
//     <div className="mobile-bottom-nav">
//       <nav className="nav-container">
//         {navItems.map((item) => {
//           const isActive = activeTab === item.id;
          
//           if (item.isHighlight) {
//             const Icon = item.icon;
//             return (
//               <Button
//                 key={item.id}
//                 onClick={() => handleTabClick(item.id)}
//                 variant="ghost"
//                 size="sm"
//                 className="nav-item highlight-item"
//               >
//                 <div className="highlight-background">
//                   <Icon className="highlight-icon" />
//                 </div>
//                 <span className="nav-label">{item.label}</span>
//               </Button>
//             );
//           }

//           if (item.isSpra) {
//             return (
//               <Button
//                 key={item.id}
//                 onClick={() => handleTabClick(item.id)}
//                 variant="ghost"
//                 size="sm"
//                 className={`nav-item ${isActive ? 'active' : ''}`}
//               >
//                 <div className="profile-avatar-wrapper">
//                   <Avatar 
//                     src={user?.avatar_url} 
//                     fallback={user?.name?.charAt(0) || 'U'}
//                     size="xsmall"
//                   />
//                   {item.badge > 0 && (
//                     <Badge className="nav-badge">
//                       {item.badge > 9 ? '9+' : item.badge}
//                     </Badge>
//                   )}
//                 </div>
//                 <span className="nav-label">{item.label}</span>
//               </Button>
//             );
//           }

//           const Icon = item.icon;
//           return (
//             <Button
//               key={item.id}
//               onClick={() => handleTabClick(item.id)}
//               variant="ghost"
//               size="sm"
//               className={`nav-item ${isActive ? 'active' : ''}`}
//             >
//               <div className="icon-wrapper">
//                 <Icon className="nav-icon" />
//                 {item.badge > 0 && (
//                   <Badge className="nav-badge">
//                     {item.badge > 9 ? '9+' : item.badge}
//                   </Badge>
//                 )}
//               </div>
//               <span className="nav-label">{item.label}</span>
//             </Button>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }

// src/components/layout/MobileBottomNav.jsx
import { useState, useEffect } from 'react';
import {
  Home,
  Users,
  PlusCircle,
  Grid3x3,
  MessageCircle,
  Gamepad2,
  Mic,
  Languages, // ✅ use Languages (not "LanguagesIcon")
} from 'lucide-react';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { useApi } from '../../../hooks/useApi';
import './MobileBottomNav.css';

export function MobileBottomNav({ activeTab = 'home', onTabChange }) {
  const { get } = useApi();
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false); // ✅ missing state

  useEffect(() => {
    (async () => {
      try {
        const [notifications, messages] = await Promise.all([
          get('/api/notifications/unread-count'),
          get('/api/messages/unread-count'),
        ]);
        setNotificationCount(notifications.count || 0);
        setMessageCount(messages.count || 0);
      } catch (error) {
        console.error('Error loading counts:', error);
      }
    })();
  }, [get]);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', badge: 0 },
    { id: 'buddies', icon: Users, label: 'D-Buddies', badge: 0 },
    { id: 'create', icon: PlusCircle, label: 'Create', isHighlight: true },
    { id: 'dsuite', icon: Grid3x3, label: 'D-Suite', badge: 0 },
    // Replaces "Me" with Language hub
    { id: 'language', icon: Languages, label: 'Spra', badge: 0 },
  ];

  const go = (path) => {
    setShowLanguageMenu(false);
    window.location.href = path;
  };

  const handleTabClick = (tabId) => {
    if (tabId === 'create') {
      window.location.href = '/create';
      return;
    }
    if (tabId === 'language') {
      setShowLanguageMenu((s) => !s);
      return;
    }
    setShowLanguageMenu(false);
    onTabChange?.(tabId);
  };

  return (
    <>
      {/* Overlay to close flyout on outside tap */}
      {showLanguageMenu && (
        <div className="mbn-overlay" onClick={() => setShowLanguageMenu(false)} />
      )}

      <div className="mobile-bottom-nav">
        <nav className="nav-container">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            if (item.isHighlight) {
              return (
                <Button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  variant="ghost"
                  size="sm"
                  className="nav-item highlight-item"
                >
                  <div className="highlight-background">
                    <Icon className="highlight-icon" />
                  </div>
                  <span className="nav-label">{item.label}</span>
                </Button>
              );
            }

            return (
              <Button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                variant="ghost"
                size="sm"
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="icon-wrapper">
                  <Icon className="nav-icon" />
                  {item.badge > 0 && (
                    <Badge className="nav-badge">{item.badge > 9 ? '9+' : item.badge}</Badge>
                  )}
                </div>
                <span className="nav-label">{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Language Hub flyout */}
        <div className={`language-flyout ${showLanguageMenu ? 'open' : ''}`}>
          <button className="language-item" onClick={() => go('/language/ai')}>
            <Mic className="language-icon" />
            <span>Conversation AI</span>
          </button>
          <button className="language-item" onClick={() => go('/chat')}>
            <MessageCircle className="language-icon" />
            <span>Chat Rooms (A1–B1)</span>
          </button>
          <button className="language-item" onClick={() => go('/games')}>
            <Gamepad2 className="language-icon" />
            <span>Learning Games</span>
          </button>
        </div>
      </div>
    </>
  );
}

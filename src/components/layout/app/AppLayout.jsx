// // src/components/layout/app/AppLayout.jsx
// import { useState } from 'react';
// import { TopNavigation } from './TopNavigation';
// import { LeftSidebar } from './LeftSidebar';
// import { RightSidebar } from './RightSidebar';
// import { MobileBottomNav } from './MobileBottomNav';
// import { MobileProfileView } from '../../profile/MobileProfileView';
// import { useAuth } from '../../../hooks/useAuth';
// import { useUser } from '../../../hooks/useUser';
// import './AppLayout1.css';

// export function AppLayout({ children, defaultTab = "home" }) {
//   const { user } = useAuth();
//   const { userData, loading } = useUser();
//   const [activeTab, setActiveTab] = useState(defaultTab);

//   if (loading) {
//     return (
//       <div className="app-layout-loading">
//         <div className="loading-spinner">
//           <div className="spinner"></div>
//           <p>Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   const renderContent = () => {
//     // On mobile, show profile view when profile tab is active
//     if (activeTab === "profile") {
//       return (
//         <>
//           <div className="md:hidden">
//             <MobileProfileView userData={userData} />
//           </div>
//           <div className="hidden md:block">
//             {children}
//           </div>
//         </>
//       );
//     }

//     // For other tabs, show the main content
//     return children;
//   };

//   return (
//     <div className="app-layout">
//       <TopNavigation />
      
//       <div className="app-layout-container">
//         <div className="app-layout-grid">
//           {/* Left Sidebar - Hidden on mobile */}
//           <div className="app-left-sidebar">
//             <LeftSidebar userData={userData} />
//           </div>
          
//           {/* Main Content Area */}
//           <div className="app-main-content">
//             {renderContent()}
//           </div>
          
//           {/* Right Sidebar - Hidden on mobile and tablet */}
//           <div className="app-right-sidebar">
//             <RightSidebar userData={userData} />
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       <MobileBottomNav 
//         activeTab={activeTab}
//         onTabChange={setActiveTab}
//       />
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { TopNavigation } from './TopNavigation';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileProfileView } from '../../profile/MobileProfileView';
import { useAuth } from '../../../hooks/useAuth';
import { useUser } from '../../../hooks/useUser';
//import './AppLayout1.css';

export function AppLayout({ children, defaultTab = "home" }) {
  const { user } = useAuth();
  const { userData, loading } = useUser();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isMobile, setIsMobile] = useState(false);

  // Simple mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (loading) {
    return (
      <div className="app-layout-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Simple content rendering logic - FIXED VARIABLE NAME
  const renderContent = () => {
    if (isMobile && activeTab === 'profile') {
      return <MobileProfileView userData={userData} />;
    }
    return children;
  };

  return (
    <div className={`app-layout ${isMobile ? 'mobile' : 'desktop'}`}>
      <TopNavigation />
      
      <div className="app-layout-container">
        <div className="app-layout-grid">
          {/* Left Sidebar - Hidden on mobile */}
          {!isMobile && (
            <div className="app-left-sidebar">
              <LeftSidebar userData={userData} />
            </div>
          )}
          
          {/* Main Content Area */}
          <div className="app-main-content">
            {renderContent()} {/* FIXED: Using the function directly */}
          </div>
          
          {/* Right Sidebar - Hidden on mobile */}
          {!isMobile && (
            <div className="app-right-sidebar">
              <RightSidebar userData={userData} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only on mobile */}
      {isMobile && (
        <MobileBottomNav 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
    </div>
  );
}
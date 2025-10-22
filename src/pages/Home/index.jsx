// // // src/pages/Home/index.jsx
// // import { useState, useEffect } from 'react';
// // import { AppLayout } from '../../../components/layout/app/AppLayout';
// // import { TopNavigation } from '../../components/layout/app/TopNavigation';
// // import { LeftSidebar } from '../../components/layout/app/LeftSidebar';
// // import { MainFeed } from './components/feed/MainFeed';
// // import { RightSidebar } from '../../components/layout/app/RightSidebar';
// // import { MobileBottomNav } from '../../components/layout/app/MobileBottomNav';
// // import { MobileProfileView } from '../../components/profile/MobileProfileView';
// // import { useAuth } from '../../hooks/useAuth';
// // import { useUser } from '../../hooks/useUser';
// // import { AuthCallback } from '../AuthCallback';
// // import './index.css';

// // export default function HomePage() {
// //   const [activeTab, setActiveTab] = useState("home");
// //   const { user } = useAuth();
// //   const { userData, loading } = useUser();

// //   useEffect(() => {
// //     // Track page view
// //     console.log('Home page loaded for user:', user?.email);
// //   }, [user]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="loading-spinner">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="home-page min-h-screen bg-gray-50 pb-20 md:pb-6">
// //       <TopNavigation />
      
// //       <div className="home-container max-w-[1400px] mx-auto px-3 md:px-4 py-3 md:py-6">
// //         <div className="home-grid grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
// //           {/* Left Sidebar - Hidden on mobile */}
// //           <div className="left-sidebar hidden md:block md:col-span-3">
// //             <LeftSidebar userData={userData} />
// //           </div>
          
// //           {/* Main Content Area */}
// //           <div className="main-content col-span-1 md:col-span-6">
// //             {activeTab === "profile" ? (
// //               <div className="mobile-profile md:hidden">
// //                 <MobileProfileView userData={userData} />
// //               </div>
// //             ) : null}
            
// //             <div className={activeTab === "profile" ? "hidden md:block" : ""}>
// //               <MainFeed userData={userData} />
// //             </div>
// //           </div>
          
// //           {/* Right Sidebar - Hidden on mobile and tablet */}
// //           <div className="right-sidebar hidden lg:block lg:col-span-3">
// //             <RightSidebar userData={userData} />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Bottom Navigation */}
// //       <MobileBottomNav 
// //         activeTab={activeTab}
// //         onTabChange={setActiveTab}
// //       />
// //     </div>
// //   );
// // }

// src/pages/Home/index.jsx
import { AppLayout } from '../../components/layout/app/AppLayout';
import { MainFeed } from './components/feed/MainFeed';
import './index.css';

export default function HomePage() {
  return (
    <AppLayout defaultTab="home">
      <MainFeed />
    </AppLayout>
  );
}


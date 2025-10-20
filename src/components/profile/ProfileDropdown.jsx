// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import './ProfileDropdown.css';

// const ProfileDropdown = ({ isOpen, onClose }) => {
//   const { user, signOut } = useAuth();

//   /**
//    * Handle user logout
//    * - Signs out from Supabase
//    * - Redirects to landing page
//    * - Handles errors gracefully
//    */
//   const handleLogout = async () => {
//     try {
//       console.log('Logging out user...')
//       await signOut()
//       navigate(ROUTES.LANDING, { replace: true })
//     } catch (error) {
//       console.error('Logout error:', error)
//       // You could show a toast notification here
//     }
//   };

//     /**
//    * Check if a nav link is active
//    * - Highlights the current page in navigation
//    */
//   const isActiveLink = (path) => {
//     return location.pathname === path ? 'nav-link active' : 'nav-link'
//   }

//   if (!isOpen) return null;

//   const userProfile = {
//     name: user?.user_metadata?.firstName || user?.email?.split('@')[0],
//     email: user?.email,
//     location: "Berlin, Germany",
//     status: "Language Enthusiast"
//   };

//   const menuItems = [
//     {
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//           <circle cx="12" cy="7" r="4"/>
//         </svg>
//       ),
//       label: 'View Profile',
//       path: '/profile'
//     },
//     {
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <circle cx="12" cy="12" r="3"/>
//           <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
//         </svg>
//       ),
//       label: 'Settings & Privacy',
//       path: '/settings'
//     },
//     {
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//         </svg>
//       ),
//       label: 'My Content',
//       path: '/my-content'
//     },
//     {
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <circle cx="12" cy="12" r="10"/>
//           <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
//           <line x1="12" y1="17" x2="12" y2="17"/>
//         </svg>
//       ),
//       label: 'Help & Support',
//       path: '/help'
//     }
//   ];

//   return (
//     <div className="profile-dropdown-overlay" onClick={onClose}>
//       <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
//         {/* Header with Close Button */}
//         <div className="profile-dropdown-header">
//           <h3>Account</h3>
//           <button className="close-button" onClick={onClose}>
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <line x1="18" y1="6" x2="6" y2="18"/>
//               <line x1="6" y1="6" x2="18" y2="18"/>
//             </svg>
//           </button>
//         </div>

//         {/* Profile Section */}
//         <div className="profile-section">
//           <div className="profile-avatar-container">
//             <img 
//               src={user?.user_metadata?.avatar || '/assets/images/profile-placeholders/default.png'} 
//               alt="Profile" 
//               className="profile-avatar-large"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//                 e.target.nextSibling.style.display = 'flex';
//               }}
//             />
//             <div className="avatar-fallback-large">
//               {userProfile.name?.charAt(0)?.toUpperCase() || 'U'}
//             </div>
//           </div>
          
//           <div className="profile-info">
//             <h2 className="profile-name">{userProfile.name}</h2>
//             <p className="profile-email">{userProfile.email}</p>
//             <div className="profile-details">
//               <span className="profile-location">{userProfile.location}</span>
//               <span className="profile-status">{userProfile.status}</span>
//             </div>
//           </div>
//         </div>

//         {/* Menu Items */}
//         <div className="profile-menu">
//           {menuItems.map((item, index) => (
//             <Link 
//               key={index}
//               to={item.path} 
//               className="profile-menu-item"
//               onClick={onClose}
//             >
//               <div className="menu-item-icon">
//                 {item.icon}
//               </div>
//               <span className="menu-item-label">{item.label}</span>
//               <div className="menu-item-arrow">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <polyline points="9 18 15 12 9 6"/>
//                 </svg>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Logout Section */}
//         <div className="profile-footer">
//           <button onClick={handleLogout} className="logout-button" title="Sign Out">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//               <polyline points="16 17 21 12 16 7"/>
//               <line x1="21" y1="12" x2="9" y2="12"/>
//             </svg>
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDropdown;
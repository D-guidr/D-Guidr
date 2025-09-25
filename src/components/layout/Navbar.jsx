import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useRoutes } from '../../routes'
import './Navbar.css'

/**
 * Navbar Component
 * - Main navigation for authenticated users
 * - Shows user info and logout button
 * - Responsive mobile menu
 */
const Navbar = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ROUTES = useRoutes()

  /**
   * Handle user logout
   * - Signs out from Supabase
   * - Redirects to landing page
   * - Handles errors gracefully
   */
  const handleLogout = async () => {
    try {
      console.log('Logging out user...')
      await signOut()
      navigate(ROUTES.LANDING, { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
      // You could show a toast notification here
    }
  }

  /**
   * Check if a nav link is active
   * - Highlights the current page in navigation
   */
  const isActiveLink = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link'
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="navbar-brand">
          <span className="logo-text">D-Guidr</span>
        </Link>

        {/* Navigation Links - Only show when user is authenticated */}
        {user && (
          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to={ROUTES.HOME} className={isActiveLink(ROUTES.HOME)}>
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </Link>
            
            <Link to={ROUTES.NETWORK} className={isActiveLink(ROUTES.NETWORK)}>
              <span className="nav-icon">👥</span>
              <span className="nav-text">My Network</span>
            </Link>
            
            <Link to={ROUTES.JOBS} className={isActiveLink(ROUTES.JOBS)}>
              <span className="nav-icon">💼</span>
              <span className="nav-text">Jobs</span>
            </Link>
            
            <Link to={ROUTES.MESSAGING} className={isActiveLink(ROUTES.MESSAGING)}>
              <span className="nav-icon">💬</span>
              <span className="nav-text">Messaging</span>
            </Link>
            
            <Link to={ROUTES.NOTIFICATIONS} className={isActiveLink(ROUTES.NOTIFICATIONS)}>
              <span className="nav-icon">🔔</span>
              <span className="nav-text">Notifications</span>
            </Link>
          </div>
        )}

        {/* User Menu - Only show when user is authenticated */}
        {user && (
          <div className="navbar-user">
            <div className="user-info">
              <img 
                src={user?.user_metadata?.avatar || 'https://ui-avatars.com/api/?name=User&background=667eea&color=fff'} 
                alt="Profile" 
                className="user-avatar"
              />
              <span className="user-name">
                {user?.user_metadata?.firstName || user?.email?.split('@')[0]}
              </span>
            </div>
            
            <button onClick={handleLogout} className="logout-btn" title="Logout">
              Logout
            </button>

            {/* Mobile menu button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
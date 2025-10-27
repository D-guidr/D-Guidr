import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Home,
  Users,
  Briefcase,
  Calendar,
  MessageSquare,
  Bell,
  Grid3x3
} from 'lucide-react'
import { Avatar } from '../../common/Avatar'
import { Button } from '../../common/Button'
import { Input } from '../../common/Input'
import { Badge } from '../../common/Badge'
import { DropdownMenu } from '../../common/DropdownMenu'
import { MobileSidebar } from './MobileSidebar'
import { useAuth } from '../../../contexts/AuthContext'
import { useApi } from '../../../hooks/useApi'
import { useDebounce } from '../../../hooks/useDebounce'
import { ROUTES } from '../../../routes/RouteConfig'
import './TopNavigation.css'

export function TopNavigation() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { get } = useApi()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const [messageCount, setMessageCount] = useState(0)
  const [isSearching, setIsSearching] = useState(false)

  const debouncedSearch = useDebounce(searchQuery, 300)

  // Load notifications and messages
  useEffect(() => {
    loadNotificationCount()
    loadMessageCount()
  }, [])

  // Handle search debounce
  useEffect(() => {
    if (debouncedSearch) {
      performSearch(debouncedSearch)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [debouncedSearch])

  const performSearch = async (query) => {
    if (!query.trim()) return
    setIsSearching(true)
    try {
      const results = await get(`/api/search?q=${encodeURIComponent(query)}&limit=5`)
      setSearchResults(results)
      setShowSearchResults(true)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const loadNotificationCount = async () => {
    try {
      const data = await get('/api/notifications/unread-count')
      setNotificationCount(data.count || 0)
    } catch (error) {
      console.error('Error loading notification count:', error)
    }
  }

  const loadMessageCount = async () => {
    try {
      const data = await get('/api/messages/unread-count')
      setMessageCount(data.count || 0)
    } catch (error) {
      console.error('Error loading message count:', error)
    }
  }

  const handleSearchChange = (e) => setSearchQuery(e.target.value)
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleSearchResultClick = (result) => {
    setShowSearchResults(false)
    setSearchQuery('')
    if (result.type === 'user') navigate(`/profile/${result.id}`)
    else if (result.type === 'university') navigate(`/dsuite/unifinder/${result.id}`)
    else if (result.type === 'job') navigate(`/dsuite/careerbridge/${result.id}`)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      navigate(ROUTES.LANDING, { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const dsuiteModules = [
    { name: 'UniFinder Pro', path: '/dsuite/unifinder', icon: '🎓' },
    { name: 'VisaMaster', path: '/dsuite/visamaster', icon: '📋' },
    { name: 'BlockAccount Manager', path: '/dsuite/blockaccount', icon: '🏦' },
    { name: 'ConnectGermany', path: '/dsuite/connect', icon: '🤝' },
    { name: 'HomeFind Germany', path: '/dsuite/homefind', icon: '🏠' },
    { name: 'CareerBridge Germany', path: '/dsuite/careerbridge', icon: '💼' },
    { name: 'FinanceManager', path: '/dsuite/finance', icon: '💰' },
    { name: 'DeutschMaster', path: '/dsuite/deutschmaster', icon: '🇩🇪' },
    { name: 'IndiaMart', path: '/dsuite/indiamart', icon: '🛒' }
  ]

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'buddies', icon: Users, label: 'D-Buddies', path: '/buddies' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { id: 'events', icon: Calendar, label: 'Events', path: '/events' }
  ]

  return (
    <header className="top-navigation">
      <div className="nav-container">
        <div className="nav-content">
          {/* Left Section */}
          <div className="nav-left">
            {/* Mobile Sidebar */}
            <div className="mobile-logo">
              <MobileSidebar
                trigger={
                  <button className="logo-button" aria-label="Open Menu">
                    <div className="logo-icon">
                      <span>D</span>
                    </div>
                  </button>
                }
              />
            </div>

            {/* Desktop Logo */}
            <div className="desktop-logo">
              <a href="/home" className="logo-link">
                <div className="logo-icon">
                  <span>D</span>
                </div>
                <span className="logo-text">D-Guidr</span>
              </a>
            </div>

            {/* Shared Search Bar */}
            <div className="search-wrapper">
              <div className="search-container">
                <Search className="search-icon" />
                <form onSubmit={handleSearchSubmit}>
                  <Input
                    type="text"
                    placeholder="Search D-Buddies, Universities, Jobs, Events..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                  />
                </form>
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <>
                  <div className="search-overlay" onClick={() => setShowSearchResults(false)} />
                  <div className="search-results-dropdown">
                    {isSearching ? (
                      <div className="search-loading">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.map((result) => (
                          <button
                            key={`${result.type}-${result.id}`}
                            className="search-result-item"
                            onClick={() => handleSearchResultClick(result)}
                          >
                            <div className="result-icon">
                              {result.type === 'user' && '👤'}
                              {result.type === 'university' && '🎓'}
                              {result.type === 'job' && '💼'}
                              {result.type === 'post' && '📝'}
                              {result.type === 'event' && '📅'}
                            </div>
                            <div className="result-content">
                              <div className="result-title">{result.title}</div>
                              <div className="result-subtitle">{result.subtitle}</div>
                            </div>
                          </button>
                        ))}
                        <div className="search-footer">
                          <a
                            href={`/search?q=${encodeURIComponent(searchQuery)}`}
                            className="view-all-link"
                          >
                            View all results
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="no-results">No results found</div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Section */}
          <nav className="desktop-nav">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className="nav-button"
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </Button>
              )
            })}

            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button variant="ghost" size="sm" className="nav-button">
                  <Grid3x3 className="nav-icon" />
                  <span className="nav-label">D-Suite</span>
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end" className="dsuite-dropdown">
                <DropdownMenu.Label>D-Suite Modules</DropdownMenu.Label>
                <DropdownMenu.Separator />
                {dsuiteModules.map((module) => (
                  <DropdownMenu.Item
                    key={module.name}
                    onClick={() => navigate(module.path)}
                    className="dsuite-item"
                  >
                    <span className="module-icon">{module.icon}</span>
                    {module.name}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu>

            {/* Messages */}
            <Button
              variant="ghost"
              size="sm"
              className="nav-button"
              onClick={() => navigate('/messages')}
              aria-label="Messages"
            >
              <MessageSquare className="nav-icon" />
              <span className="nav-label">Messages</span>
              {messageCount > 0 && (
                <Badge className="nav-badge">{messageCount}</Badge>
              )}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="nav-button"
              onClick={() => navigate('/notifications')}
              aria-label="Notifications"
            >
              <Bell className="nav-icon" />
              <span className="nav-label">Alerts</span>
              {notificationCount > 0 && (
                <Badge className="nav-badge">{notificationCount}</Badge>
              )}
            </Button>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button variant="ghost" size="sm" className="profile-button" aria-label="User Menu">
                  <Avatar
                    src={user?.avatar_url}
                    fallback={(user?.name?.[0] || 'U').toUpperCase()}
                    size="medium"
                  />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end" className="profile-dropdown">
                <DropdownMenu.Label>My Account</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => navigate('/settings')}>
                  Settings
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => navigate('/achievements')}>
                  Achievements
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => navigate('/progress')}>
                  Application Progress
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={handleLogout} className="logout-item">
                  Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}

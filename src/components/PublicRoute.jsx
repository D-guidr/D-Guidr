import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../routes/RouteConfig'
import LoadingSpinner from './ui/LoadingSpinner'

/**
 * PublicRoute component - redirects to home if user is already authenticated
 * Used for login/signup pages that should not be accessible when logged in
 */
export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // If user is authenticated and tries to access public route, redirect to home
    if (!loading && user) {
      // Get the intended destination from location state or default to home
      const from = location.state?.from?.pathname || ROUTES.HOME
      navigate(from, { replace: true })
    }
  }, [user, loading, navigate, location])

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner text="Checking authentication..." />
  }

  // If user is authenticated, don't render the public route content
  if (user) {
    return <LoadingSpinner text="Redirecting..." />
  }

  // User is not authenticated, render the public route content
  return children
}

export default PublicRoute
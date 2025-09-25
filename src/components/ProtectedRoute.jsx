// import React from 'react'
// import { Navigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'
// import LoadingSpinner from './ui/LoadingSpinner'

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth()
//   const location = useLocation()

//   if (loading) {
//     return <LoadingSpinner />
//   }

//   if (!user) {
//     // Redirect to login page with return url
//     return <Navigate to="/login" state={{ from: location }} replace />
//   }

//   return children
// }

// export const PublicRoute = ({ children }) => {
//   const { user, loading } = useAuth()

//   if (loading) {
//     return <LoadingSpinner />
//   }

//   if (user) {
//     return <Navigate to="/home" replace />
//   }

//   return children
// }

// export default ProtectedRoute


import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../routes/RouteConfig'
import LoadingSpinner from './ui/LoadingSpinner'
import PublicRoute from '/src/components/PublicRoute.jsx'


/**
 * ProtectedRoute component - redirects to login if user is not authenticated
 * Used for pages that require authentication
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      navigate(ROUTES.LOGIN, { 
        replace: true,
        state: { from: location } // Save the current location to redirect back after login
      })
    }
  }, [user, loading, navigate, location])

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner text="Checking authentication..." />
  }

  // If no user, don't render protected content (will redirect)
  if (!user) {
    return <LoadingSpinner text="Redirecting to login..." />
  }

  // User is authenticated, render the protected content
  return children
}

// Export PublicRoute as well for convenience
export { PublicRoute } from './PublicRoute.jsx'

export default ProtectedRoute
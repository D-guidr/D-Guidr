import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './RouteConfig'
import Layout from '../components/layout/Layout'
import ProtectedRoute from '../components/ProtectedRoute'
import PublicRoute from '../components/PublicRoute'
import LoadingSpinner from '../components/ui/LoadingSpinner'

// Import pages directly (no lazy loading for better performance)
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import AuthCallback from '../pages/AuthCallback'

// Loading component for routes
const RouteLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="large" text="Loading..." />
  </div>
)

/**
 * Main router configuration
 * Using direct imports instead of lazy loading for better performance
 * Lazy loading can actually slow down small to medium apps
 */
export const router = createBrowserRouter([
  {
    path: ROUTES.LANDING,
    element: (
      <PublicRoute>
        <Landing />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.SIGNUP,
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.AUTH_CALLBACK,
    element: <AuthCallback />,
  },
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <Layout>
          <Home />
        </Layout>
      </ProtectedRoute>
    ),
  },
  // Add your other routes here (they'll be accessible but show "Coming Soon")
  {
    path: ROUTES.NETWORK,
    element: (
      <ProtectedRoute>
        <Layout>
          <div className="min-h-screen flex items-center justify-content: center;">
            <h1>My Network - Coming Soon</h1>
          </div>
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.JOBS,
    element: (
      <ProtectedRoute>
        <Layout>
          <div className="min-h-screen flex items-center justify-center">
            <h1>Jobs - Coming Soon</h1>
          </div>
        </Layout>
      </ProtectedRoute>
    ),
  },
  // 404 catch-all route
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl">Page not found</p>
        </div>
      </div>
    ),
  },
])

/**
 * Hook to use routes throughout the app
 * Provides autocomplete and prevents typos
 */
export const useRoutes = () => {
  return ROUTES
}
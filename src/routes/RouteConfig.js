// Route configuration constants - makes it easy to manage all routes in one place
export const ROUTES = {
  PROFILE: '/profile',
  HOME: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LANDING: '/',
  AUTH_CALLBACK: '/auth/callback'
//   NETWORK: '/network',
//   JOBS: '/jobs',
//   MESSAGING: '/messaging',
//   NOTIFICATIONS: '/notifications'
}

// Route protection types
export const ROUTE_TYPES = {
  PUBLIC: 'public',     // Accessible without authentication
  PROTECTED: 'protected', // Requires authentication
  AUTH: 'auth'          // Authentication related routes
}
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import { ROUTES } from '../../routes/RouteConfig'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import './index.css'

/**
 * AuthCallback page - handles OAuth redirects from providers like Google
 * This page is shown briefly while Supabase processes the authentication callback
 */
export const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash that Supabase creates
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Authentication error:', error)
          navigate(`${ROUTES.LOGIN}?error=auth_failed`, { replace: true })
          return
        }

        if (session) {
          // Successful authentication - redirect to home or intended destination
          const from = new URLSearchParams(window.location.search).get('from') || ROUTES.HOME
          navigate(from, { replace: true })
        } else {
          // No session found - redirect to login
          navigate(`${ROUTES.LOGIN}?error=no_session`, { replace: true })
        }
      } catch (error) {
        console.error('Callback processing error:', error)
        navigate(`${ROUTES.LOGIN}?error=unknown`, { replace: true })
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="auth-callback-page">
      <div className="auth-callback-content">
        <LoadingSpinner size="large" text="Completing authentication..." />
        <p className="auth-callback-help">
          Please wait while we secure your login...
        </p>
      </div>
    </div>
  )
}

export default AuthCallback
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { supabase } from '../../../supabaseClient'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import './LoginForm.css'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(formData.email, formData.password)
      if (error) {
        setError(error.message)
      } else {
        navigate('/home')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError('')

    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError(error.message)
      }
      // The redirect will happen automatically via Supabase
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.')
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    setError('')
    
    try {
      // First try to sign in with demo account
      const { error } = await signIn('demo@dguidr.com', 'demopassword123')
      
      if (error) {
        // If demo account doesn't exist, create it and then sign in
        await handleCreateDemoAccount()
      } else {
        navigate('/home')
      }
    } catch (err) {
      setError('Demo login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDemoAccount = async () => {
    try {
      // Create demo account
      const { data, error } = await supabase.auth.signUp({
        email: 'demo@dguidr.com',
        password: 'demopassword123',
        options: {
          data: {
            firstName: 'Demo',
            lastName: 'User',
            fullName: 'Demo User',
            title: 'Software Developer',
            avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=667eea&color=fff',
            isDemo: true
          }
        }
      })

      if (error) throw error

      if (data.user) {
        // Sign in with the newly created demo account
        const { error: signInError } = await signIn('demo@dguidr.com', 'demopassword123')
        if (signInError) throw signInError
        navigate('/home')
      }
    } catch (err) {
      setError('Failed to create demo account. Please try signing up manually.')
    }
  }

  return (
    <div className="login-form-container">
      {/* Header */}
      <div className="login-header">
        <div className="logo">
          <span className="logo-text">D-Guidr</span>
        </div>
        <h1 className="login-title">Sign in</h1>
        <p className="login-subtitle">Stay updated on your professional world</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-input"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-input"
            required
            disabled={loading}
          />
        </div>

        <Link to="/forgot-password" className="forgot-password-link">
          Forgot password?
        </Link>

        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner size="small" text="Signing in..." />
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      {/* Separator */}
      <div className="separator">
        <span>or</span>
      </div>

      {/* Demo Login */}
      <button 
        onClick={handleDemoLogin}
        className="demo-login-button"
        disabled={loading || googleLoading}
      >
        {loading ? (
          <LoadingSpinner size="small" text="Setting up demo..." />
        ) : (
          <>
            <span className="demo-icon">🚀</span>
            Try Demo Account
          </>
        )}
      </button>

      {/* Google Login */}
      <button 
        onClick={handleGoogleLogin}
        className="google-login-button"
        disabled={loading || googleLoading}
      >
        {googleLoading ? (
          <LoadingSpinner size="small" text="Connecting..." />
        ) : (
          <>
            <svg className="google-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </>
        )}
      </button>

      {/* Sign Up Link */}
      <div className="signup-prompt">
        <p>New to D-Guidr? <Link to="/signup" className="signup-link">Join now</Link></p>
      </div>

      {/* Demo Account Info */}
      <div className="demo-info">
        <p className="demo-info-text">
          <strong>Demo Account:</strong> demo@dguidr.com / demopassword123
        </p>
      </div>
    </div>
  )
}

export default LoginForm
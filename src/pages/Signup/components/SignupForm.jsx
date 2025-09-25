import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import './SignupForm.css'

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const nextStep = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Please enter your first and last name')
      return
    }
    setStep(2)
    setError('')
  }

  const prevStep = () => {
    setStep(1)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await signUp(
        formData.email, 
        formData.password, 
        {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          avatar: `https://ui-avatars.com/api/?name=${formData.firstName.trim()}+${formData.lastName.trim()}&background=667eea&color=fff`
        }
      )

      if (error) {
        setError(error.message)
      } else if (data.user) {
        // Show success message and redirect to login
        alert('Account created successfully! Please check your email to verify your account.')
        navigate('/login')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setGoogleLoading(true)
    setError('')

    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError(error.message)
      }
      // The redirect will happen automatically via Supabase
    } catch (err) {
      setError('Failed to sign up with Google. Please try again.')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="signup-form-container">
      {/* Header */}
      <div className="signup-header">
        <div className="logo">
          <span className="logo-text">D-Guidr</span>
        </div>
        <h1 className="signup-title">Make the most of your professional life</h1>
        {step === 1 && (
          <p className="signup-subtitle">Join D-Guidr to connect with professionals worldwide</p>
        )}
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Basic Info</span>
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Account Setup</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {/* Google Signup Button - Always visible */}
      <button 
        onClick={handleGoogleSignup}
        className="google-signup-button"
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

      {/* Separator */}
      <div className="separator">
        <span>or</span>
      </div>

      {/* Multi-step Form */}
      <form onSubmit={handleSubmit} className="signup-form">
        {step === 1 && (
          <div className="form-step">
            <div className="name-fields">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type="button" 
              onClick={nextStep}
              className="next-button"
              disabled={loading || !formData.firstName.trim() || !formData.lastName.trim()}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
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
                placeholder="Password (6+ characters)"
                className="form-input"
                required
                disabled={loading}
                minLength="6"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div className="terms-agreement">
              <p>
                By clicking Agree & Join, you agree to the D-Guidr{' '}
                <a href="#" className="terms-link">User Agreement</a>,{' '}
                <a href="#" className="terms-link">Privacy Policy</a>, and{' '}
                <a href="#" className="terms-link">Cookie Policy</a>.
              </p>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={prevStep}
                className="back-button"
                disabled={loading}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="signup-button"
                disabled={loading}
              >
                {loading ? (
                  <LoadingSpinner size="small" text="Creating account..." />
                ) : (
                  'Agree & Join'
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Sign In Link */}
      <div className="signin-prompt">
        <p>Already on D-Guidr? <Link to="/login" className="signin-link">Sign in</Link></p>
      </div>
    </div>
  )
}

export default SignupForm
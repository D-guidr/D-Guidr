import React from 'react'
import SignupForm from './components/SignupForm'
import { PublicRoute } from '../../components/ProtectedRoute'
import './index.css'

const Signup = () => {
  return (
    <PublicRoute>
      <div className="signup-page">
        <div className="signup-container">
          <SignupForm />
        </div>
      </div>
    </PublicRoute>
  )
}

export default Signup
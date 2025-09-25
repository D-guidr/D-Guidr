import React from 'react'
import LoginForm from './components/LoginForm'
import { PublicRoute } from '../../components/ProtectedRoute'
//import { ProtectedRoute } from '../../components/ProtectedRoute'
import './index.css'

const Login = () => {
  return (
    <PublicRoute>
      <div className="login-page">
        <div className="login-container">
          <LoginForm />
        </div>
      </div>
    </PublicRoute>
  )
}

export default Login
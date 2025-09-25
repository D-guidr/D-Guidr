import React from 'react'
import ProtectedRoute from '/src/components/ProtectedRoute'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar'
import Widgets from './components/Widgets'
import './index.css'

const Home = () => {
  return (
    <ProtectedRoute>
      <div className="home-page">
        <div className="home-container">
          {/* Left Sidebar */}
          <aside className="home-sidebar">
            <Sidebar />
          </aside>

          {/* Main Feed */}
          <main className="home-feed">
            <Feed />
          </main>

          {/* Right Widgets */}
          <aside className="home-widgets">
            <Widgets />
          </aside>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Home
// import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Landing from './pages/Landing';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Home from './pages/Home';
// // import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import { supabase } from "./supabaseClient";


// export default function App() {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setSession(data.session);
//       setLoading(false);
//     });

//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session);
//         setLoading(false);
//       }
//     );

//     return () => authListener.subscription?.unsubscribe();
//   }, []);

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Landing  />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/home" element={<Home />} />
//         {/* session={session} */}

//       </Routes>
//     </>
//   );
// }

//2 nd way

// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider } from './contexts/AuthContext'
// import ProtectedRoute, { PublicRoute } from './components/ProtectedRoute'
// import Layout from './components/layout/Layout'

// // Pages
// import Landing from './pages/Landing'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import Home from './pages/Home'

// import './App.css'

// function App() {
//   return (
//     <AuthProvider>
//       <div className="App">
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={
//             <PublicRoute>
//               <Landing />
//             </PublicRoute>
//           } />
          
//           <Route path="/login" element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           } />
          
//           <Route path="/signup" element={
//             <PublicRoute>
//               <Signup />
//             </PublicRoute>
//           } />

//           {/* Protected routes with layout */}
//           <Route path="/home" element={
//             <ProtectedRoute>
//               <Layout>
//                 <Home />
//               </Layout>
//             </ProtectedRoute>
//           } />

//           {/* Catch all route */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//     </AuthProvider>
//   )
// }

// export default App

// 3rd way

import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { router } from './routes'
import './App.css'

/**
 * Main App component - now clean and focused on providing context
 * All routing logic is moved to the routes folder
 */
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  )
}

export default App
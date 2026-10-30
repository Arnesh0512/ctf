import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import History from './pages/History';
import Exhibits from './pages/Exhibits';
import Tourism from './pages/Tourism';
import Vault from './pages/Vault';
import { getUserSession, clearAuth } from './auth';

function AppLayout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900">
      {/* Decorative ambient background warm lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-yellow-100/40 rounded-full blur-3xl"></div>
      </div>

      <Navbar user={user} onLogout={onLogout} />

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const session = getUserSession();
    if (session?.username) {
      setUser(session);
    } else {
      setUser(null);
    }
    setAuthChecked(true);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    clearAuth();
    setUser(null);
  };

  const handleUserUpdate = (updated) => {
    setUser(updated);
    localStorage.setItem('royal_user', JSON.stringify(updated));
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isLoggedIn = !!user?.username;

  return (
    <BrowserRouter>
      <Routes>
        {/* Root Route /: checks if loggedin prompts to /home if not prompts to /login */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Login Page /login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* /home */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <AppLayout user={user} onLogout={handleLogout}>
                <Home />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* /history */}
        <Route
          path="/history"
          element={
            isLoggedIn ? (
              <AppLayout user={user} onLogout={handleLogout}>
                <History />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* /exhibits */}
        <Route
          path="/exhibits"
          element={
            isLoggedIn ? (
              <AppLayout user={user} onLogout={handleLogout}>
                <Exhibits />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* /tourism */}
        <Route
          path="/tourism"
          element={
            isLoggedIn ? (
              <AppLayout user={user} onLogout={handleLogout}>
                <Tourism />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* /vault */}
        <Route
          path="/vault"
          element={
            isLoggedIn ? (
              <AppLayout user={user} onLogout={handleLogout}>
                <Vault user={user} onUserUpdate={handleUserUpdate} />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

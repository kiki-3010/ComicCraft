import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateComicPage from './pages/CreateComicPage';
import MyComicsPage from './pages/MyComicsPage';
import ComicViewerPage from './pages/ComicViewerPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* Public Routes */}
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="create-comic"
                element={
                  <ProtectedRoute>
                    <CreateComicPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="comics"
                element={
                  <ProtectedRoute>
                    <MyComicsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="comic/:id"
                element={
                  <ProtectedRoute>
                    <ComicViewerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="comic/:id/edit"
                element={
                  <ProtectedRoute>
                    <CreateComicPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* 404 Routes */}
              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

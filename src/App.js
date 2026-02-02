import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThinkingProvider } from './contexts/ThinkingContext';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';

// Student Pages
import { StudentDashboardPage } from './pages/student/DashboardPage';
import { ReasoningLogPage } from './pages/student/ReasoningLogPage';
import { ThinkingWorkspacePage } from './pages/student/ThinkingWorkspacePage';
import { SpeakingPracticePage } from './pages/student/SpeakingPracticePage';
import { MyProgressPage } from './pages/student/MyProgressPage';
import { CuriosityMapPage } from './pages/student/CuriosityMapPage';
import { ArtifactBuilderPage } from './pages/student/ArtifactBuilderPage';
import { ReflectionLogPage } from './pages/student/ReflectionLogPage';
import { MyVisionPage } from './pages/student/MyVisionPage';

// Teacher Pages
import { TeacherDashboardPage } from './pages/teacher/DashboardPage';
import { ClassInsightsPage } from './pages/teacher/ClassInsightsPage';
import { ArtifactReviewPage } from './pages/teacher/ArtifactReviewPage';
import { TeacherPlanPage } from './pages/teacher/PlanPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/DashboardPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { ParentSummariesPage } from './pages/admin/ParentSummariesPage';

// Parent Pages
import { ParentDashboardPage } from './pages/parent/DashboardPage';
import { ParentResourcesPage } from './pages/parent/ResourcesPage';

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><StudentDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/reasoning" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><ReasoningLogPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/workspace" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><ThinkingWorkspacePage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/speaking" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><SpeakingPracticePage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/progress" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><MyProgressPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/map" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><CuriosityMapPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/artifacts" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><ArtifactBuilderPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/reflections" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><ReflectionLogPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/vision" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><MyVisionPage /></AppLayout>
        </ProtectedRoute>
      } />

      {/* Teacher Routes */}
      <Route path="/teacher" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <AppLayout><TeacherDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/class" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <AppLayout><ClassInsightsPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/artifacts" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <AppLayout><ArtifactReviewPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/plans" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <AppLayout><TeacherPlanPage /></AppLayout>
        </ProtectedRoute>
      } />

      {/* Parent Routes */}
      <Route path="/parent" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <AppLayout><ParentDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/resources" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <AppLayout><ParentResourcesPage /></AppLayout>
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AppLayout><AdminDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AppLayout><ReportsPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/parents" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AppLayout><ParentSummariesPage /></AppLayout>
        </ProtectedRoute>
      } />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThinkingProvider>
          <AppRoutes />
        </ThinkingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
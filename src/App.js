
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

      {/* Creator Routes */}
      <Route path="/creator" element={
        <ProtectedRoute allowedRoles={['creator']}>
          <AppLayout><CreatorDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/creator/studio" element={
        <ProtectedRoute allowedRoles={['creator']}>
          <AppLayout><ContentStudioPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/creator/content" element={
        <ProtectedRoute allowedRoles={['creator']}>
          <AppLayout><MyContentPage /></AppLayout>
        </ProtectedRoute>
      } />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (

  );
}

export default App;
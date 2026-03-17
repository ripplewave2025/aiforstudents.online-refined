import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { canManagePipeline, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fb] flex items-center justify-center px-6">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm px-8 py-10 text-center max-w-md">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-slate-900 mb-2">Loading pipeline</h1>
          <p className="text-slate-500">
            Checking your operator session and workspace access.
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!canManagePipeline) {
    return <Navigate to="/" replace />;
  }

  return children;
};

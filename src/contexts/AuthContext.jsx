import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, isSupabaseConfigured, supabase } from '../lib/supabase';

const AuthContext = createContext(null);

const MOCK_USERS = {
  operator: {
    id: 'operator-demo-1',
    name: 'Pipeline Operator',
    email: 'demo@operator',
    role: 'operator',
    phone: '+91 98765 43210',
  },
  admin: {
    id: 'admin-demo-1',
    name: 'Program Admin',
    email: 'demo@admin',
    role: 'admin',
    phone: '+91 90000 00000',
  },
};

const normalizeProfile = (profileRecord, fallbackUser = null) => {
  if (!profileRecord && !fallbackUser) {
    return null;
  }

  return {
    ...fallbackUser,
    ...profileRecord,
    id: profileRecord?.id || fallbackUser?.id || null,
    email: profileRecord?.email || fallbackUser?.email || '',
    role: profileRecord?.role || fallbackUser?.user_metadata?.role || fallbackUser?.role || 'operator',
    name:
      profileRecord?.name ||
      profileRecord?.full_name ||
      fallbackUser?.user_metadata?.full_name ||
      fallbackUser?.user_metadata?.name ||
      fallbackUser?.email ||
      'Operator',
  };
};

const getDemoUserFromEmail = (email = '') => {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.includes('admin')) {
    return MOCK_USERS.admin;
  }

  if (normalizedEmail.includes('operator') || normalizedEmail.includes('demo@')) {
    return MOCK_USERS.operator;
  }

  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      if (!isSupabaseConfigured || !supabase) {
        const savedUser = localStorage.getItem('ais_pipeline_user');
        if (savedUser && isMounted) {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setProfile(parsed);
        }
        if (isMounted) {
          setLoading(false);
        }
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        const profileData = await db.getProfile(session.user.id);
        if (isMounted) {
          setProfile(normalizeProfile(profileData, session.user));
        }
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    loadSession();

    if (!isSupabaseConfigured || !supabase) {
      return () => {
        isMounted = false;
      };
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        const profileData = await db.getProfile(session.user.id);
        if (isMounted) {
          setProfile(normalizeProfile(profileData, session.user));
        }
      } else {
        setUser(null);
        setProfile(null);
      }

      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loginDemo = (email) => {
    const foundUser = getDemoUserFromEmail(email);

    if (!foundUser) {
      return {
        success: false,
        error: 'Use demo@operator or demo@admin for local testing.',
      };
    }

    setUser(foundUser);
    setProfile(foundUser);
    localStorage.setItem('ais_pipeline_user', JSON.stringify(foundUser));

    return { success: true, user: foundUser };
  };

  const login = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      return loginDemo(email);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (email.toLowerCase().includes('demo@')) {
        return loginDemo(email);
      }

      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }

    setUser(null);
    setProfile(null);
    localStorage.removeItem('ais_pipeline_user');
  };

  const updateProfile = async (updates) => {
    if (isSupabaseConfigured && user?.id) {
      const updatedProfile = await db.updateProfile(user.id, updates);
      if (updatedProfile) {
        setProfile(normalizeProfile(updatedProfile, user));
      }
      return updatedProfile;
    }

    const merged = { ...(profile || user), ...updates };
    setProfile(merged);
    setUser(merged);
    localStorage.setItem('ais_pipeline_user', JSON.stringify(merged));
    return merged;
  };

  const resolvedProfile = profile || user;

  const value = {
    user,
    profile: resolvedProfile,
    loading,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: resolvedProfile?.role === 'admin',
    isOperator: resolvedProfile?.role === 'operator',
    canManagePipeline: ['admin', 'operator'].includes(resolvedProfile?.role),
    isSupabaseConfigured,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export default AuthContext;

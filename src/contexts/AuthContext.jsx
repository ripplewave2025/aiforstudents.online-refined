import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, db } from '../lib/supabase';

const AuthContext = createContext(null);

// Mock users for offline/demo mode
const MOCK_USERS = {
    students: [
        { id: 's1', name: 'Tenzin Dorji', email: 'tenzin@school.edu', role: 'student', class: '8A' },
        { id: 's2', name: 'Pemba Sherpa', email: 'pemba@school.edu', role: 'student', class: '8A' },
        { id: 's3', name: 'Karma Lhamu', email: 'karma@school.edu', role: 'student', class: '8A' },
    ],
    teachers: [
        { id: 't1', name: 'Dr. Sonam Bhutia', email: 'sonam@school.edu', role: 'teacher', classes: ['8A', '8B'] },
    ],
    parents: [
        { id: 'p1', name: 'Mr. Dorji', email: 'parent@school.edu', role: 'parent', linkedStudents: ['s1'] },
        { id: 'p2', name: 'Mrs. Sherpa', email: 'sherpa.parent@school.edu', role: 'parent', linkedStudents: ['s2'] },
    ],
    admins: [
        { id: 'a1', name: 'Principal Rinchen', email: 'admin@school.edu', role: 'admin' },
    ],
    creators: [
        { id: 'c1', name: 'Ms. Priya Sharma', email: 'creator@school.edu', role: 'creator', expertise: ['Mathematics', 'Science'], bio: 'Passionate educator with 10 years of experience' },
        { id: 'c2', name: 'Mr. Rajesh Kumar', email: 'rajesh.creator@school.edu', role: 'creator', expertise: ['English', 'Social Studies'], bio: 'Making learning fun and engaging' },
    ]
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(isSupabaseConfigured);

    useEffect(() => {
        if (isSupabaseConfigured && supabase) {
            // Check existing Supabase session
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session?.user) {
                    setUser(session.user);
                    loadProfile(session.user.id);
                }
                setLoading(false);
            });

            // Listen for auth changes
            const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
                if (session?.user) {
                    setUser(session.user);
                    loadProfile(session.user.id);
                } else {
                    setUser(null);
                    setProfile(null);
                }
            });

            return () => subscription.unsubscribe();
        } else {
            // Offline mode: check localStorage
            const savedUser = localStorage.getItem('ct_user');
            if (savedUser) {
                const parsed = JSON.parse(savedUser);
                setUser(parsed);
                setProfile(parsed);
            }
            setLoading(false);
        }
    }, []);

    const loadProfile = async (userId) => {
        const profileData = await db.getProfile(userId);
        setProfile(profileData);
    };

    // Login function - works with both Supabase and offline mode
    const login = async (email, password, role) => {
        if (isSupabaseConfigured && supabase) {
            // Supabase auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                // If real login fails, check if it's a demo request
                if (email.includes('demo@')) {
                    return loginDemo(email, role);
                }
                return { success: false, error: error.message };
            }

            return { success: true, user: data.user };
        } else {
            // Offline mode
            return loginDemo(email, role);
        }
    };

    // Demo login for offline mode
    const loginDemo = (email, role) => {
        let foundUser = null;

        if (role === 'student') {
            foundUser = MOCK_USERS.students.find(u => u.email === email);
        } else if (role === 'teacher') {
            foundUser = MOCK_USERS.teachers.find(u => u.email === email);
        } else if (role === 'parent') {
            foundUser = MOCK_USERS.parents.find(u => u.email === email);
        } else if (role === 'admin') {
            foundUser = MOCK_USERS.admins.find(u => u.email === email);
        } else if (role === 'creator') {
            foundUser = MOCK_USERS.creators.find(u => u.email === email);
        }

        // Allow demo login with any email containing the role
        if (!foundUser && email.includes(role)) {
            foundUser = {
                id: `demo_${Date.now()}`,
                name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
                email,
                role,
                class: role === 'student' ? '8A' : undefined,
                classes: role === 'teacher' ? ['8A'] : undefined,
                expertise: role === 'creator' ? ['General'] : undefined
            };
        }

        if (foundUser) {
            setUser(foundUser);
            setProfile(foundUser);
            localStorage.setItem('ct_user', JSON.stringify(foundUser));
            return { success: true, user: foundUser };
        }

        return { success: false, error: 'Invalid credentials. Use demo email like "demo@student" for testing.' };
    };

    // Signup function
    const signup = async (email, password, name, role) => {
        if (isSupabaseConfigured && supabase) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name, role }
                }
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true, user: data.user };
        } else {
            // For offline mode, just do demo login
            return loginDemo(email, role);
        }
    };

    const logout = async () => {
        if (isSupabaseConfigured && supabase) {
            await supabase.auth.signOut();
        }
        setUser(null);
        setProfile(null);
        localStorage.removeItem('ct_user');
    };

    // Update profile
    const updateProfile = async (updates) => {
        if (isSupabaseConfigured && user?.id) {
            const updated = await db.updateProfile(user.id, updates);
            if (updated) setProfile(updated);
            return updated;
        } else {
            // Offline mode
            const newProfile = { ...profile, ...updates };
            setProfile(newProfile);
            localStorage.setItem('ct_user', JSON.stringify(newProfile));
            return newProfile;
        }
    };

    const value = {
        user,
        profile: profile || user, // Fallback to user for offline mode
        loading,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isStudent: (profile || user)?.role === 'student',
        isTeacher: (profile || user)?.role === 'teacher',
        isParent: (profile || user)?.role === 'parent',
        isAdmin: (profile || user)?.role === 'admin',
        isCreator: (profile || user)?.role === 'creator',
        isOnline,
        isSupabaseConfigured
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;

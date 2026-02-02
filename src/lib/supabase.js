import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create client only if configured
export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Helper to check if we're in offline/demo mode
export const isOfflineMode = !isSupabaseConfigured;

// Database helpers
export const db = {
    // Profiles
    async getProfile(userId) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) console.error('Error fetching profile:', error);
        return data;
    },

    async updateProfile(userId, updates) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('profiles')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', userId)
            .select()
            .single();
        if (error) console.error('Error updating profile:', error);
        return data;
    },

    // Interests
    async getInterests(userId) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('interests')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) console.error('Error fetching interests:', error);
        return data || [];
    },

    async addInterest(userId, interest) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('interests')
            .insert({ user_id: userId, ...interest })
            .select()
            .single();
        if (error) console.error('Error adding interest:', error);
        return data;
    },

    async removeInterest(interestId) {
        if (!supabase) return;
        const { error } = await supabase
            .from('interests')
            .delete()
            .eq('id', interestId);
        if (error) console.error('Error removing interest:', error);
    },

    // Goals
    async getGoals(userId) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) console.error('Error fetching goals:', error);
        return data || [];
    },

    async addGoal(userId, text) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('goals')
            .insert({ user_id: userId, text })
            .select()
            .single();
        if (error) console.error('Error adding goal:', error);
        return data;
    },

    async updateGoal(goalId, updates) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('goals')
            .update(updates)
            .eq('id', goalId)
            .select()
            .single();
        if (error) console.error('Error updating goal:', error);
        return data;
    },

    async deleteGoal(goalId) {
        if (!supabase) return;
        const { error } = await supabase
            .from('goals')
            .delete()
            .eq('id', goalId);
        if (error) console.error('Error deleting goal:', error);
    },

    // Reasoning Sessions
    async getSessions(userId) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('reasoning_sessions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) console.error('Error fetching sessions:', error);
        return data || [];
    },

    async createSession(userId, session) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('reasoning_sessions')
            .insert({ user_id: userId, ...session })
            .select()
            .single();
        if (error) console.error('Error creating session:', error);
        return data;
    },

    async updateSession(sessionId, updates) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('reasoning_sessions')
            .update(updates)
            .eq('id', sessionId)
            .select()
            .single();
        if (error) console.error('Error updating session:', error);
        return data;
    },

    // Reflections
    async getReflections(userId) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('reflections')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) console.error('Error fetching reflections:', error);
        return data || [];
    },

    async addReflection(userId, reflection) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('reflections')
            .insert({ user_id: userId, ...reflection })
            .select()
            .single();
        if (error) console.error('Error adding reflection:', error);
        return data;
    },

    // Artifacts
    async getArtifacts(userId) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('artifacts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) console.error('Error fetching artifacts:', error);
        return data || [];
    },

    async createArtifact(userId, artifact) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('artifacts')
            .insert({ user_id: userId, ...artifact })
            .select()
            .single();
        if (error) console.error('Error creating artifact:', error);
        return data;
    },

    async updateArtifact(artifactId, updates) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('artifacts')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', artifactId)
            .select()
            .single();
        if (error) console.error('Error updating artifact:', error);
        return data;
    },

    // Teacher: Get all students' sessions (for class insights)
    async getAllSessions() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('reasoning_sessions')
            .select('*, profiles(name, class)')
            .order('created_at', { ascending: false })
            .limit(100);
        if (error) console.error('Error fetching all sessions:', error);
        return data || [];
    },

    // Teacher: Get all artifacts for review
    async getAllArtifacts() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('artifacts')
            .select('*, profiles(name, class)')
            .order('created_at', { ascending: false })
            .limit(100);
        if (error) console.error('Error fetching all artifacts:', error);
        return data || [];
    },

    // Teacher: Submit artifact review
    async submitReview(artifactId, teacherId, scores, feedback) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('artifact_reviews')
            .insert({ artifact_id: artifactId, teacher_id: teacherId, scores, feedback })
            .select()
            .single();
        if (error) console.error('Error submitting review:', error);
        return data;
    }
};

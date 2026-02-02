import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ThinkingContext = createContext(null);

// Storage key prefix
const STORAGE_KEY = 'ct_thinking_';

export const ThinkingProvider = ({ children }) => {
    const { user } = useAuth();
    const [reasoningLogs, setReasoningLogs] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);
    const [aiGateUnlocked, setAiGateUnlocked] = useState(false);

    // Load user's reasoning logs from localStorage
    useEffect(() => {
        if (user?.id) {
            const saved = localStorage.getItem(`${STORAGE_KEY}${user.id}`);
            if (saved) {
                setReasoningLogs(JSON.parse(saved));
            }
        }
    }, [user?.id]);

    // Save logs whenever they change
    useEffect(() => {
        if (user?.id && reasoningLogs.length > 0) {
            localStorage.setItem(`${STORAGE_KEY}${user.id}`, JSON.stringify(reasoningLogs));
        }
    }, [reasoningLogs, user?.id]);

    // Start a new reasoning session
    const startSession = (topic) => {
        const session = {
            id: `session_${Date.now()}`,
            topic,
            startedAt: new Date().toISOString(),
            question: '',
            rawQuestion: '', // Track original question for trajectory
            initialBelief: '',
            uncertaintyExpressed: false, // Did they say "I'm not sure"?
            assumptions: [], // Now optional
            aiGateUnlocked: false,
            aiResponse: null,
            critique: '',
            evidenceNotes: [],
            counterArguments: [],
            beliefRevision: null,
            reflection: '',
            completedAt: null,
        };
        setCurrentSession(session);
        setAiGateUnlocked(false);
        return session;
    };

    // Update current session
    const updateSession = (updates) => {
        if (!currentSession) return;
        setCurrentSession(prev => ({ ...prev, ...updates }));
    };

    // Check if AI gate can be unlocked - assumptions now OPTIONAL
    const canUnlockAIGate = () => {
        if (!currentSession) return false;
        // Learning Vector Model: We only require curiosity (question) and initial thinking
        // Assumptions are helpful but NOT required - reduces barrier and anxiety
        return (
            currentSession.question.trim().length >= 10 &&
            currentSession.initialBelief.trim().length >= 10
        );
    };

    // Unlock AI gate
    const unlockAIGate = () => {
        if (canUnlockAIGate()) {
            setAiGateUnlocked(true);
            updateSession({ aiGateUnlocked: true });
            return true;
        }
        return false;
    };

    // Record AI response
    const recordAIResponse = (response) => {
        updateSession({ aiResponse: response });
    };

    // Add evidence note
    const addEvidenceNote = (note, isSupporting) => {
        updateSession({
            evidenceNotes: [
                ...(currentSession?.evidenceNotes || []),
                { note, isSupporting, addedAt: new Date().toISOString() }
            ]
        });
    };

    // Add counter-argument
    const addCounterArgument = (argument) => {
        updateSession({
            counterArguments: [
                ...(currentSession?.counterArguments || []),
                { argument, addedAt: new Date().toISOString() }
            ]
        });
    };

    // Record belief revision
    const recordBeliefRevision = (newBelief, newConfidence, reason) => {
        updateSession({
            beliefRevision: {
                newBelief,
                newConfidence,
                reason,
                revisedAt: new Date().toISOString()
            }
        });
    };

    // Complete session and save to logs
    const completeSession = (reflection) => {
        if (!currentSession) return null;

        const completedSession = {
            ...currentSession,
            reflection,
            completedAt: new Date().toISOString(),
        };

        setReasoningLogs(prev => [completedSession, ...prev]);
        setCurrentSession(null);
        setAiGateUnlocked(false);

        return completedSession;
    };

    // ============================================
    // LEARNING VECTOR MODEL - Trajectory Functions
    // We track movement and change, not scores
    // ============================================

    // Get question events over time (for trajectory visualization)
    const getQuestionEvents = () => {
        return reasoningLogs.map(session => ({
            id: session.id,
            date: session.completedAt || session.startedAt,
            topic: session.topic,
            rawQuestion: session.rawQuestion || session.question,
            refinedQuestion: session.question,
            questionChanged: (session.rawQuestion && session.rawQuestion !== session.question),
            uncertaintyExpressed: session.uncertaintyExpressed || false,
        }));
    };

    // Get revision timeline (when beliefs changed)
    const getRevisionTimeline = () => {
        return reasoningLogs
            .filter(session => session.beliefRevision)
            .map(session => ({
                id: session.id,
                date: session.beliefRevision.revisedAt,
                topic: session.topic,
                reason: session.beliefRevision.reason,
            }));
    };

    // Get simple session count (for basic display, not scoring)
    const getSessionCount = () => reasoningLogs.length;

    // Check if thinking is moving (non-numeric assessment)
    const getThinkingMovement = () => {
        if (reasoningLogs.length < 2) return { status: 'just_started', message: 'Keep exploring!' };

        const recentRevisions = reasoningLogs.slice(0, 5).filter(s => s.beliefRevision).length;
        const recentUncertainty = reasoningLogs.slice(0, 5).filter(s => s.uncertaintyExpressed).length;

        if (recentRevisions >= 2) {
            return { status: 'revising', message: 'Your thinking is evolving. You\'ve been revising your beliefs.' };
        }
        if (recentUncertainty >= 2) {
            return { status: 'exploring', message: 'You\'re comfortable with uncertainty. That\'s where learning begins.' };
        }
        return { status: 'questioning', message: 'You\'re asking questions. Keep going!' };
    };

    const value = {
        reasoningLogs,
        currentSession,
        aiGateUnlocked,
        startSession,
        updateSession,
        canUnlockAIGate,
        unlockAIGate,
        recordAIResponse,
        addEvidenceNote,
        addCounterArgument,
        recordBeliefRevision,
        completeSession,
        // Learning Vector Model - trajectory functions
        getQuestionEvents,
        getRevisionTimeline,
        getSessionCount,
        getThinkingMovement,
    };

    return (
        <ThinkingContext.Provider value={value}>
            {children}
        </ThinkingContext.Provider>
    );
};

export const useThinking = () => {
    const context = useContext(ThinkingContext);
    if (!context) {
        throw new Error('useThinking must be used within ThinkingProvider');
    }
    return context;
};

export default ThinkingContext;

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';

const ThinkingContext = createContext(null);

// Storage key prefix
const STORAGE_KEY = 'ct_thinking_';

export const ThinkingProvider = ({ children }) => {
    const { user } = useAuth();
    const [reasoningLogs, setReasoningLogs] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);
    const [aiGateUnlocked, setAiGateUnlocked] = useState(false);

    // New: Track AI interaction mode
    const [aiMode, setAiMode] = useState('socratic'); // 'socratic' | 'standard'

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
    const startSession = useCallback((topic) => {
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
            socraticDialogue: [], // New: Store conversation history
        };
        setCurrentSession(session);
        setAiGateUnlocked(false);
        setAiMode('socratic'); // Default to socratic
        return session;
    }, []);

    // Update current session
    const updateSession = useCallback((updates) => {
        setCurrentSession(prev => {
            if (!prev) return prev;
            return { ...prev, ...updates };
        });
    }, []);

    // Check if AI gate can be unlocked - assumptions now OPTIONAL
    const canUnlockAIGate = useCallback(() => {
        if (!currentSession) return false;
        // Learning Vector Model: We only require curiosity (question) and initial thinking
        // Assumptions are helpful but NOT required - reduces barrier and anxiety
        return (
            currentSession.question.trim().length >= 10 &&
            currentSession.initialBelief.trim().length >= 10
        );
    }, [currentSession]);

    // Unlock AI gate
    const unlockAIGate = useCallback(() => {
        if (canUnlockAIGate()) {
            setAiGateUnlocked(true);
            setCurrentSession(prev => {
                 if (!prev) return prev;
                 return { ...prev, aiGateUnlocked: true };
            });
            return true;
        }
        return false;
    }, [canUnlockAIGate]);

    // Record AI response
    const recordAIResponse = useCallback((response) => {
        updateSession({ aiResponse: response });
    }, [updateSession]);

    // New: Generate Socratic Response (Mocked)
    const generateSocraticQuestion = useCallback(async (userMessage) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const socraticQuestions = [
            "What evidence led you to that conclusion?",
            "Are there any alternative explanations you haven't considered?",
            "How would someone with the opposite view explain this?",
            "What are the implications if your assumption is wrong?",
            "Can you break that down into smaller parts?",
            "What exactly do you mean by that term?",
            "Is there a specific example that comes to mind?"
        ];

        // Simple random selection for MVP
        const randomQuestion = socraticQuestions[Math.floor(Math.random() * socraticQuestions.length)];

        // Add context-aware prefix sometimes
        const prefix = userMessage.length > 50 ? "That's a detailed point. " : "Interesting. ";

        return `${prefix}${randomQuestion}`;
    }, []);

    // New: Add message to Socratic Dialogue
    const addToSocraticDialogue = useCallback((role, text) => {
        setCurrentSession(prev => {
            if (!prev) return prev;
            const newMessage = { role, text, timestamp: new Date().toISOString() };
            return {
                ...prev,
                socraticDialogue: [...(prev.socraticDialogue || []), newMessage]
            };
        });
    }, []);

    // Add evidence note
    const addEvidenceNote = useCallback((note, isSupporting) => {
        setCurrentSession(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                evidenceNotes: [
                    ...(prev.evidenceNotes || []),
                    { note, isSupporting, addedAt: new Date().toISOString() }
                ]
            };
        });
    }, []);

    // Add counter-argument
    const addCounterArgument = useCallback((argument) => {
        setCurrentSession(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                counterArguments: [
                    ...(prev.counterArguments || []),
                    { argument, addedAt: new Date().toISOString() }
                ]
            };
        });
    }, []);

    // Record belief revision
    const recordBeliefRevision = useCallback((newBelief, newConfidence, reason) => {
        setCurrentSession(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                beliefRevision: {
                    newBelief,
                    newConfidence,
                    reason,
                    revisedAt: new Date().toISOString()
                }
            };
        });
    }, []);

    // Complete session and save to logs
    const completeSession = useCallback((reflection) => {
        // We need the *latest* currentSession state, so we use a functional update on setReasoningLogs
        // But completeSession returns the completed object, which is tricky with async state updates.
        // For simplicity, we rely on the closure variable 'currentSession' but acknowledge it might be slightly stale if rapid updates happen.
        // A better pattern would be to pass the final session object directly or use a ref.
        // Given the use case (user clicks "Finish"), currentSession should be stable enough.

        // However, to be safe, let's just use the currentSession from the outer scope, assuming it's up to date due to re-renders.
        // But since this function is memoized with [], it captures the INITIAL currentSession (null).
        // It MUST depend on [currentSession].

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
    }, [currentSession]);

    // ============================================
    // LEARNING VECTOR MODEL - Trajectory Functions
    // We track movement and change, not scores
    // ============================================

    // Get question events over time (for trajectory visualization)
    const getQuestionEvents = useCallback(() => {
        return reasoningLogs.map(session => ({
            id: session.id,
            date: session.completedAt || session.startedAt,
            topic: session.topic,
            rawQuestion: session.rawQuestion || session.question,
            refinedQuestion: session.question,
            questionChanged: (session.rawQuestion && session.rawQuestion !== session.question),
            uncertaintyExpressed: session.uncertaintyExpressed || false,
        }));
    }, [reasoningLogs]);

    // Get revision timeline (when beliefs changed)
    const getRevisionTimeline = useCallback(() => {
        return reasoningLogs
            .filter(session => session.beliefRevision)
            .map(session => ({
                id: session.id,
                date: session.beliefRevision.revisedAt,
                topic: session.topic,
                reason: session.beliefRevision.reason,
            }));
    }, [reasoningLogs]);

    // Get simple session count (for basic display, not scoring)
    const getSessionCount = useCallback(() => reasoningLogs.length, [reasoningLogs]);

    // Check if thinking is moving (non-numeric assessment)
    const getThinkingMovement = useCallback(() => {
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
    }, [reasoningLogs]);

    const value = useMemo(() => ({
        reasoningLogs,
        currentSession,
        aiGateUnlocked,
        aiMode,
        setAiMode,
        startSession,
        updateSession,
        canUnlockAIGate,
        unlockAIGate,
        recordAIResponse,
        generateSocraticQuestion,
        addToSocraticDialogue,
        addEvidenceNote,
        addCounterArgument,
        recordBeliefRevision,
        completeSession,
        // Learning Vector Model - trajectory functions
        getQuestionEvents,
        getRevisionTimeline,
        getSessionCount,
        getThinkingMovement,
    }), [
        reasoningLogs,
        currentSession,
        aiGateUnlocked,
        aiMode,
        startSession,
        updateSession,
        canUnlockAIGate,
        unlockAIGate,
        recordAIResponse,
        generateSocraticQuestion,
        addToSocraticDialogue,
        addEvidenceNote,
        addCounterArgument,
        recordBeliefRevision,
        completeSession,
        getQuestionEvents,
        getRevisionTimeline,
        getSessionCount,
        getThinkingMovement
    ]);

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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useThinking } from '../../contexts/ThinkingContext';
import {
    HelpCircle,
    Lightbulb,
    AlertTriangle,
    Lock,
    Unlock,
    ArrowRight,
    Plus,
    X,
    CheckCircle2,
    Sparkles,
    Brain
} from 'lucide-react';

const StepIndicator = ({ number, title, complete, active }) => (
    <div className={`flex items-center gap-3 ${active ? 'opacity-100' : 'opacity-50'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${complete ? 'bg-emerald-500 text-white' : active ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
            {complete ? <CheckCircle2 className="w-5 h-5" /> : number}
        </div>
        <span className={`font-medium ${active ? 'text-white' : 'text-slate-400'}`}>{title}</span>
    </div>
);

export const ReasoningLogPage = () => {
    const navigate = useNavigate();
    const {
        currentSession,
        startSession,
        updateSession,
        canUnlockAIGate,
        unlockAIGate,
        aiGateUnlocked
    } = useThinking();

    const [step, setStep] = useState(currentSession ? 2 : 1);
    const [topic, setTopic] = useState(currentSession?.topic || '');
    const [question, setQuestion] = useState(currentSession?.question || '');
    const [initialBelief, setInitialBelief] = useState(currentSession?.initialBelief || '');
    const [assumptions, setAssumptions] = useState(currentSession?.assumptions || []);
    const [newAssumption, setNewAssumption] = useState('');

    // Start or continue session
    const handleStartSession = () => {
        if (!topic.trim()) return;
        startSession(topic.trim());
        setStep(2);
    };

    // Save question
    const handleSaveQuestion = () => {
        if (!question.trim()) return;
        updateSession({ question: question.trim() });
        setStep(3);
    };

    // Save initial belief
    const handleSaveBelief = () => {
        if (!initialBelief.trim()) return;
        updateSession({ initialBelief: initialBelief.trim() });
        setStep(4);
    };

    // Add assumption
    const handleAddAssumption = () => {
        if (!newAssumption.trim()) return;
        const updated = [...assumptions, newAssumption.trim()];
        setAssumptions(updated);
        updateSession({ assumptions: updated });
        setNewAssumption('');
    };

    // Remove assumption
    const handleRemoveAssumption = (index) => {
        const updated = assumptions.filter((_, i) => i !== index);
        setAssumptions(updated);
        updateSession({ assumptions: updated });
    };

    // Unlock AI
    const handleUnlockAI = () => {
        if (unlockAIGate()) {
            navigate('/student/workspace');
        }
    };

    // Learning Vector Model: Only question + initial thought required
    const isComplete = question && initialBelief;

    return (
        <div className="max-w-3xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Question Log
                </h1>
                <p className="text-slate-400">
                    Start with curiosity. What are you wondering about?
                </p>
            </motion.div>

            {/* Progress Steps */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-6 mb-6"
            >
                <div className="flex flex-wrap gap-6">
                    <StepIndicator number={1} title="Topic" complete={!!topic && step > 1} active={step === 1} />
                    <StepIndicator number={2} title="Question" complete={!!question && step > 2} active={step === 2} />
                    <StepIndicator number={3} title="Initial Thought" complete={!!initialBelief && step > 3} active={step === 3} />
                    <StepIndicator number={4} title="Assumptions (Optional)" complete={step > 4 || (step === 4 && assumptions.length > 0)} active={step === 4} />
                </div>
            </motion.div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                {/* Step 1: Topic */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-500/20 rounded-xl">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">What do you want to explore?</h2>
                                <p className="text-sm text-slate-400">Name your thinking session</p>
                            </div>
                        </div>

                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., Climate change effects, How does gravity work..."
                            className="w-full px-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white text-lg focus:outline-none focus:border-teal-500 transition-colors mb-4"
                            autoFocus
                        />

                        <button
                            onClick={handleStartSession}
                            disabled={!topic.trim()}
                            className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-400 rounded-xl font-medium transition-colors"
                        >
                            Start Session
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {/* Step 2: Question */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <HelpCircle className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">What is your question?</h2>
                                <p className="text-sm text-slate-400">What exactly are you trying to understand?</p>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-4 mb-4 text-sm text-slate-300">
                            <strong className="text-teal-400">Topic:</strong> {topic || currentSession?.topic}
                        </div>

                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Write your question in full. Be specific about what you want to know..."
                            className="w-full px-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors mb-4 min-h-[120px] resize-none"
                            autoFocus
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="px-4 py-3 text-slate-400 hover:text-white transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSaveQuestion}
                                disabled={!question.trim() || question.length < 10}
                                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-400 rounded-xl font-medium transition-colors"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        {question && question.length < 10 && (
                            <p className="text-amber-400 text-sm mt-3">
                                Write at least 10 characters to continue.
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Step 3: Initial Belief */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-amber-500/20 rounded-xl">
                                <Lightbulb className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">What's your initial thought?</h2>
                                <p className="text-sm text-slate-400">It's okay to be uncertain. Share what comes to mind.</p>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-4 mb-4 text-sm text-slate-300">
                            <strong className="text-blue-400">Question:</strong> {question}
                        </div>

                        <textarea
                            value={initialBelief}
                            onChange={(e) => setInitialBelief(e.target.value)}
                            placeholder="What is your best guess? Why do you think this? It's okay to be unsure..."
                            className="w-full px-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors mb-4 min-h-[120px] resize-none"
                            autoFocus
                        />

                        <div className="mb-6">
                            <p className="block text-sm font-medium text-slate-400 mb-3">
                                Are you certain or uncertain? (It's perfectly fine to be unsure!)
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => updateSession && updateSession({ uncertaintyExpressed: true })}
                                    className="flex-1 px-4 py-2 rounded-xl text-sm bg-purple-500/20 border border-purple-500/50 text-purple-300 hover:bg-purple-500/30 transition-colors"
                                >
                                    🤔 I'm not sure
                                </button>
                                <button
                                    onClick={() => updateSession && updateSession({ uncertaintyExpressed: false })}
                                    className="flex-1 px-4 py-2 rounded-xl text-sm bg-slate-700 border border-slate-600 text-slate-300 hover:bg-slate-600 transition-colors"
                                >
                                    💡 I have an idea
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(2)}
                                className="px-4 py-3 text-slate-400 hover:text-white transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSaveBelief}
                                disabled={!initialBelief.trim() || initialBelief.length < 10}
                                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-400 rounded-xl font-medium transition-colors"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 4: Assumptions */}
                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-red-500/20 rounded-xl">
                                    <AlertTriangle className="w-6 h-6 text-red-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Any assumptions? (Optional)</h2>
                                    <p className="text-sm text-slate-400">Hidden assumptions in your thinking</p>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 rounded-xl p-4 mb-4 text-sm text-slate-300 space-y-2">
                                <div><strong className="text-blue-400">Question:</strong> {question}</div>
                                <div><strong className="text-amber-400">Your belief:</strong> {initialBelief}</div>
                            </div>

                            <p className="text-slate-400 text-sm mb-4">
                                What are you assuming? (Optional — write any assumptions you notice, but you don't need any to continue)
                            </p>

                            {/* Assumption List */}
                            {assumptions.length > 0 && (
                                <div className="space-y-2 mb-4">
                                    {assumptions.map((assumption, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl"
                                        >
                                            <span className="text-red-400 text-sm font-mono">{i + 1}.</span>
                                            <span className="flex-1 text-sm">{assumption}</span>
                                            <button
                                                onClick={() => handleRemoveAssumption(i)}
                                                className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add Assumption Input */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newAssumption}
                                    onChange={(e) => setNewAssumption(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddAssumption()}
                                    placeholder="I'm assuming that..."
                                    className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                                />
                                <button
                                    onClick={handleAddAssumption}
                                    disabled={!newAssumption.trim()}
                                    className="px-4 py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-400 rounded-xl transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <button
                                onClick={() => setStep(3)}
                                className="mt-4 px-4 py-2 text-slate-400 hover:text-white transition-colors"
                            >
                                ← Back
                            </button>
                        </div>

                        {/* AI Gate Unlock */}
                        <motion.div
                            className={`p-6 rounded-2xl border-2 ${isComplete
                                ? 'bg-emerald-950/30 border-emerald-500/50'
                                : 'bg-slate-800/50 border-slate-700'
                                }`}
                            animate={isComplete ? { scale: [1, 1.02, 1] } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-xl ${isComplete ? 'bg-emerald-500/20' : 'bg-slate-700'
                                    }`}>
                                    {isComplete ? (
                                        <Unlock className="w-8 h-8 text-emerald-400" />
                                    ) : (
                                        <Lock className="w-8 h-8 text-slate-400" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold">
                                        {isComplete ? 'AI Gate Ready!' : 'AI Gate Locked'}
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        {isComplete
                                            ? 'Your curiosity is ready. Explore further with AI.'
                                            : `Share your question and initial thought to continue.`}
                                    </p>
                                </div>
                                <button
                                    onClick={handleUnlockAI}
                                    disabled={!isComplete}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isComplete
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white'
                                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    <Brain className="w-5 h-5" />
                                    Unlock AI
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

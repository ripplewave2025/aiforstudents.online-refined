import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThinking } from '../../contexts/ThinkingContext';
import {
    Brain,
    MessageSquare,
    Scale,
    AlertTriangle,
    Search,
    Plus,
    CheckCircle2,
    XCircle,
    Lightbulb,
    Send,
    Loader2,
    RefreshCw
} from 'lucide-react';

const PromptCard = ({ icon: Icon, title, hint, color }) => (
    <div className={`p-4 rounded-xl border ${color}`}>
        <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4" />
            <h4 className="font-semibold text-sm">{title}</h4>
        </div>
        <p className="text-xs opacity-70">{hint}</p>
    </div>
);

export const ThinkingWorkspacePage = () => {
    const {
        currentSession,
        aiGateUnlocked,
        recordAIResponse,
        addEvidenceNote,
        addCounterArgument,
        updateSession
    } = useThinking();

    const [critique, setCritique] = useState(currentSession?.critique || '');
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [newEvidence, setNewEvidence] = useState('');
    const [newCounter, setNewCounter] = useState('');

    // Simulate AI response (MVP - no real API)
    const handleAskAI = async () => {
        if (!aiPrompt.trim()) return;

        setAiLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockResponse = `Based on your question about "${currentSession?.topic || 'this topic'}":

This is a simulated AI response for the MVP. In the full version, this would connect to an actual AI API.

Key points to consider:
• The evidence suggests multiple perspectives exist
• Your assumption about "${currentSession?.assumptions?.[0] || 'the main point'}" is worth examining
• Consider what evidence would change your view

Remember: The goal isn't to get the "right" answer, but to think more clearly about the question.`;

        recordAIResponse({
            prompt: aiPrompt,
            response: mockResponse,
            timestamp: new Date().toISOString()
        });
        setAiPrompt('');
        setAiLoading(false);
    };

    // Add evidence
    const handleAddEvidence = (isSupporting) => {
        if (!newEvidence.trim()) return;
        addEvidenceNote(newEvidence.trim(), isSupporting);
        setNewEvidence('');
    };

    // Add counter-argument
    const handleAddCounter = () => {
        if (!newCounter.trim()) return;
        addCounterArgument(newCounter.trim());
        setNewCounter('');
    };

    // Update critique
    const handleCritiqueChange = (text) => {
        setCritique(text);
        updateSession({ critique: text });
    };

    if (!currentSession) {
        return (
            <div className="max-w-3xl mx-auto pb-20 md:pb-8 text-center py-20">
                <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">No Active Session</h2>
                <p className="text-slate-400 mb-6">Start a reasoning session first to use the thinking workspace.</p>
                <a
                    href="/student/reasoning"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-xl font-medium transition-colors"
                >
                    Start Reasoning
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Critical Thinking Workspace
                </h1>
                <p className="text-slate-400">
                    Examine your reasoning. Challenge your assumptions.
                </p>
            </motion.div>

            {/* Session Context */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-6 mb-6"
            >
                <h3 className="font-bold text-teal-400 mb-2">{currentSession.topic}</h3>
                <p className="text-sm text-slate-300 mb-4">{currentSession.question}</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                    <span><strong>Your belief:</strong> {currentSession.initialBelief?.substring(0, 100)}...</span>
                    <span><strong>Confidence:</strong> {currentSession.beliefConfidence}%</span>
                </div>
            </motion.div>

            {/* Critical Thinking Prompts */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6"
            >
                <PromptCard
                    icon={MessageSquare}
                    title="Claim"
                    hint="What exactly is being claimed?"
                    color="bg-blue-950/30 border-blue-500/30 text-blue-300"
                />
                <PromptCard
                    icon={Search}
                    title="Evidence"
                    hint="What supports this?"
                    color="bg-green-950/30 border-green-500/30 text-green-300"
                />
                <PromptCard
                    icon={AlertTriangle}
                    title="Assumptions"
                    hint="What's taken for granted?"
                    color="bg-amber-950/30 border-amber-500/30 text-amber-300"
                />
                <PromptCard
                    icon={XCircle}
                    title="Disprove"
                    hint="What would prove this wrong?"
                    color="bg-red-950/30 border-red-500/30 text-red-300"
                />
                <PromptCard
                    icon={Scale}
                    title="Disagree"
                    hint="Who might think differently?"
                    color="bg-purple-950/30 border-purple-500/30 text-purple-300"
                />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Left Panel: Your Thinking */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    {/* Critique Panel */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-teal-400" />
                            Your Analysis
                        </h3>
                        <textarea
                            value={critique}
                            onChange={(e) => handleCritiqueChange(e.target.value)}
                            placeholder="Write your critical analysis here. What are the strengths and weaknesses of this claim? What evidence exists?"
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors min-h-[200px] resize-none"
                        />
                    </div>

                    {/* Evidence Panel */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Search className="w-5 h-5 text-green-400" />
                            Evidence Notes
                        </h3>

                        {currentSession.evidenceNotes?.length > 0 && (
                            <div className="space-y-2 mb-4">
                                {currentSession.evidenceNotes.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-start gap-2 p-3 rounded-lg ${item.isSupporting
                                                ? 'bg-green-950/30 border border-green-500/30'
                                                : 'bg-red-950/30 border border-red-500/30'
                                            }`}
                                    >
                                        {item.isSupporting ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                                        ) : (
                                            <XCircle className="w-4 h-4 text-red-400 mt-0.5" />
                                        )}
                                        <span className="text-sm">{item.note}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newEvidence}
                                onChange={(e) => setNewEvidence(e.target.value)}
                                placeholder="Add evidence note..."
                                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                            />
                            <button
                                onClick={() => handleAddEvidence(true)}
                                className="px-3 py-2 bg-green-600/20 text-green-400 rounded-lg text-sm hover:bg-green-600/30"
                            >
                                + Support
                            </button>
                            <button
                                onClick={() => handleAddEvidence(false)}
                                className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg text-sm hover:bg-red-600/30"
                            >
                                + Against
                            </button>
                        </div>
                    </div>

                    {/* Counter-Arguments */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 text-purple-400" />
                            Counter-Arguments
                        </h3>

                        {currentSession.counterArguments?.length > 0 && (
                            <div className="space-y-2 mb-4">
                                {currentSession.counterArguments.map((item, i) => (
                                    <div key={i} className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-lg text-sm">
                                        {item.argument}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newCounter}
                                onChange={(e) => setNewCounter(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddCounter()}
                                placeholder="Someone might argue that..."
                                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                            />
                            <button
                                onClick={handleAddCounter}
                                className="px-3 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Right Panel: AI Assistance */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                >
                    <div className={`rounded-2xl p-6 ${aiGateUnlocked
                            ? 'bg-emerald-950/20 border-2 border-emerald-500/30'
                            : 'bg-slate-800/30 border-2 border-slate-700'
                        }`}>
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Lightbulb className={`w-5 h-5 ${aiGateUnlocked ? 'text-emerald-400' : 'text-slate-500'}`} />
                            AI Exploration
                            {aiGateUnlocked && (
                                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                                    Unlocked
                                </span>
                            )}
                        </h3>

                        {!aiGateUnlocked ? (
                            <div className="text-center py-8 text-slate-400">
                                <p className="mb-2">AI is locked</p>
                                <p className="text-sm">Complete your reasoning log to unlock AI assistance.</p>
                            </div>
                        ) : (
                            <>
                                {/* AI Response Display */}
                                {currentSession.aiResponse && (
                                    <div className="bg-slate-800/50 rounded-xl p-4 mb-4 text-sm">
                                        <p className="text-xs text-slate-500 mb-2">
                                            You asked: "{currentSession.aiResponse.prompt}"
                                        </p>
                                        <p className="text-slate-300 whitespace-pre-line">
                                            {currentSession.aiResponse.response}
                                        </p>
                                    </div>
                                )}

                                {/* AI Input */}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={aiPrompt}
                                        onChange={(e) => setAiPrompt(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                                        placeholder="Ask AI to help explore your question..."
                                        className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                        disabled={aiLoading}
                                    />
                                    <button
                                        onClick={handleAskAI}
                                        disabled={aiLoading || !aiPrompt.trim()}
                                        className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-400 rounded-xl transition-colors"
                                    >
                                        {aiLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Send className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                <p className="text-xs text-slate-500 mt-3">
                                    Remember: AI is a tool for exploration, not a source of truth.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Assumptions Review */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                            Your Assumptions
                        </h3>
                        <div className="space-y-2">
                            {currentSession.assumptions?.map((assumption, i) => (
                                <div key={i} className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg text-sm">
                                    <span className="text-amber-400 font-mono mr-2">{i + 1}.</span>
                                    {assumption}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-4">
                            Which of these assumptions might be wrong?
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

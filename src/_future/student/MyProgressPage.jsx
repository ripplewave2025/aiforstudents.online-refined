import React from 'react';
import { motion } from 'framer-motion';
import { useThinking } from '../../contexts/ThinkingContext';
import {
    TrendingUp,
    Brain,
    RefreshCw,
    MessageSquare,
    Calendar,
    Compass,
    HelpCircle,
    Sparkles
} from 'lucide-react';

// Trajectory Event Card - shows a moment of growth, not a score
const TrajectoryEvent = ({ event, type }) => {
    const icons = {
        revision: RefreshCw,
        question: HelpCircle,
        exploration: Compass,
    };
    const colors = {
        revision: 'border-purple-500/50 bg-purple-950/30 text-purple-300',
        question: 'border-teal-500/50 bg-teal-950/30 text-teal-300',
        exploration: 'border-amber-500/50 bg-amber-950/30 text-amber-300',
    };
    const Icon = icons[type] || MessageSquare;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-xl border ${colors[type]} flex items-start gap-3`}
        >
            <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
                <p className="text-sm font-medium">{event.topic}</p>
                {event.reason && (
                    <p className="text-xs opacity-70 mt-1">"{event.reason}"</p>
                )}
                <p className="text-xs opacity-50 mt-1">
                    {new Date(event.date).toLocaleDateString()}
                </p>
            </div>
        </motion.div>
    );
};

export const MyProgressPage = () => {
    const {
        reasoningLogs,
        getQuestionEvents,
        getRevisionTimeline,
        getSessionCount,
        getThinkingMovement
    } = useThinking();

    const questionEvents = getQuestionEvents();
    const revisionTimeline = getRevisionTimeline();
    const sessionCount = getSessionCount();
    const thinkingMovement = getThinkingMovement();

    return (
        <div className="max-w-4xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                    <Compass className="w-8 h-8 text-teal-400" />
                    My Thinking Trajectory
                </h1>
                <p className="text-slate-400">
                    Your journey of questions, uncertainty, and growth. Not a score — a direction.
                </p>
            </motion.div>

            {/* Thinking Movement Status */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-teal-950/40 to-emerald-950/40 border border-teal-500/30 rounded-2xl p-6 mb-8"
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-teal-500/20 rounded-xl">
                        <Sparkles className="w-8 h-8 text-teal-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-teal-200">
                            {thinkingMovement.message}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">
                            {sessionCount === 0
                                ? "Start your first question to begin your journey."
                                : `${sessionCount} exploration${sessionCount === 1 ? '' : 's'} so far`
                            }
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Revision Moments */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                >
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-purple-400" />
                        Times You Changed Your Mind
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                        Changing your mind is a sign of learning, not weakness.
                    </p>

                    {revisionTimeline.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            <RefreshCw className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No revisions yet — that's okay!</p>
                            <p className="text-xs mt-1">This space fills up as you explore.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {revisionTimeline.slice(0, 5).map((event) => (
                                <TrajectoryEvent
                                    key={event.id}
                                    event={event}
                                    type="revision"
                                />
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Recent Questions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                >
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-teal-400" />
                        Your Recent Questions
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                        Questions are the beginning of understanding.
                    </p>

                    {questionEvents.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No questions yet</p>
                            <p className="text-xs mt-1">Start exploring to see them here.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {questionEvents.slice(0, 5).map((event) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 rounded-xl border border-teal-500/30 bg-teal-950/20"
                                >
                                    <p className="text-sm font-medium text-teal-200">{event.topic}</p>
                                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                                        {event.refinedQuestion}
                                    </p>
                                    {event.uncertaintyExpressed && (
                                        <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
                                            🤔 Expressed uncertainty
                                        </span>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Session Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
            >
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    Your Exploration Journey
                </h3>

                {reasoningLogs.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">
                        Your journey will appear here as you explore.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {reasoningLogs.slice(0, 8).map((log, i) => (
                            <div
                                key={log.id}
                                className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-start gap-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-400">
                                    {reasoningLogs.length - i}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm">{log.topic || 'Untitled'}</h4>
                                    <p className="text-xs text-slate-500 mt-1 truncate">
                                        {log.question}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                        {log.beliefRevision && (
                                            <span className="text-xs text-purple-400">
                                                ✓ Revised thinking
                                            </span>
                                        )}
                                        {log.assumptions?.length > 0 && (
                                            <span className="text-xs text-amber-400">
                                                {log.assumptions.length} assumption{log.assumptions.length === 1 ? '' : 's'} noticed
                                            </span>
                                        )}
                                        {log.uncertaintyExpressed && (
                                            <span className="text-xs text-purple-300">
                                                🤔 Uncertain
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-xs text-slate-600">
                                    {log.completedAt ? new Date(log.completedAt).toLocaleDateString() : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Philosophy Note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center text-sm text-slate-500"
            >
                <p>
                    We don't measure how smart you look. <br />
                    We notice when you question, pause, and revise.
                </p>
            </motion.div>
        </div>
    );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useThinking } from '../../contexts/ThinkingContext';
import {
    Brain,
    MessageSquare,
    Mic,
    TrendingUp,
    Lock,
    Unlock,
    ArrowRight,
    Sparkles,
    Target,
    CheckCircle2
} from 'lucide-react';

const QuickActionCard = ({ icon: Icon, title, description, to, color, locked }) => (
    <Link to={to}>
        <motion.div
            className={`relative p-6 rounded-2xl border-2 transition-all ${color} ${locked ? 'opacity-50' : 'hover:scale-[1.02]'}`}
            whileHover={locked ? {} : { y: -4 }}
            whileTap={locked ? {} : { scale: 0.98 }}
        >
            {locked && (
                <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-slate-400" />
                </div>
            )}
            <Icon className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-sm opacity-80">{description}</p>
            <ArrowRight className="w-4 h-4 mt-4 opacity-60" />
        </motion.div>
    </Link>
);

const MetricPreview = ({ label, value, trend }) => (
    <div className="bg-slate-800/50 rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">{value}</span>
            {trend && (
                <span className={`text-xs ${trend > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {trend > 0 ? '↑' : '→'} {Math.abs(trend)}%
                </span>
            )}
        </div>
    </div>
);

export const StudentDashboardPage = () => {
    const { user } = useAuth();
    const { reasoningLogs, currentSession, getSessionCount, getThinkingMovement } = useThinking();

    const sessionCount = getSessionCount();
    const thinkingMovement = getThinkingMovement();
    const recentSessions = reasoningLogs.slice(0, 3);

    return (
        <div className="max-w-6xl mx-auto pb-20 md:pb-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Welcome back, {user?.name?.split(' ')[0]} 👋
                </h1>
                <p className="text-slate-400">
                    Ready to sharpen your thinking today?
                </p>
            </motion.div>

            {/* AI Gate Status Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-2xl mb-8 ${currentSession?.aiGateUnlocked
                    ? 'bg-emerald-950/30 border-2 border-emerald-500/50'
                    : 'bg-slate-800/50 border-2 border-slate-700'
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${currentSession?.aiGateUnlocked
                        ? 'bg-emerald-500/20'
                        : 'bg-slate-700'
                        }`}>
                        {currentSession?.aiGateUnlocked ? (
                            <Unlock className="w-6 h-6 text-emerald-400" />
                        ) : (
                            <Lock className="w-6 h-6 text-slate-400" />
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold">
                            {currentSession?.aiGateUnlocked
                                ? 'AI Gate Unlocked'
                                : 'AI Gate Locked'}
                        </h3>
                        <p className="text-sm text-slate-400">
                            {currentSession?.aiGateUnlocked
                                ? 'You can now use AI to explore your question.'
                                : 'Submit your reasoning first to unlock AI assistance.'}
                        </p>
                    </div>
                    <Link
                        to="/student/reasoning"
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-xl font-medium transition-colors"
                    >
                        {currentSession ? 'Continue' : 'Start'}
                    </Link>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <QuickActionCard
                        icon={MessageSquare}
                        title="Start Reasoning"
                        description="Ask a question and think through it"
                        to="/student/reasoning"
                        color="bg-purple-950/30 border-purple-500/50 text-purple-300"
                    />
                    <QuickActionCard
                        icon={Brain}
                        title="Think Deeper"
                        description="Open the critical thinking workspace"
                        to="/student/workspace"
                        color="bg-teal-950/30 border-teal-500/50 text-teal-300"
                    />
                    <QuickActionCard
                        icon={Mic}
                        title="Practice Speaking"
                        description="Record and review your explanations"
                        to="/student/speaking"
                        color="bg-amber-950/30 border-amber-500/50 text-amber-300"
                    />
                    <QuickActionCard
                        icon={TrendingUp}
                        title="View Progress"
                        description="See your thinking growth over time"
                        to="/student/progress"
                        color="bg-blue-950/30 border-blue-500/50 text-blue-300"
                    />
                </div>
            </motion.div>

            {/* Thinking Journey Status */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
            >
                <h2 className="text-lg font-bold mb-4">Your Thinking Journey</h2>
                <div className="p-4 bg-gradient-to-br from-teal-950/40 to-emerald-950/40 border border-teal-500/30 rounded-xl">
                    <p className="text-teal-200 font-medium">{thinkingMovement.message}</p>
                    <p className="text-sm text-slate-400 mt-1">
                        {sessionCount === 0
                            ? "Start your first exploration to see your journey."
                            : `${sessionCount} exploration${sessionCount === 1 ? '' : 's'} so far`
                        }
                    </p>
                </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-lg font-bold mb-4">Recent Thinking Sessions</h2>
                {recentSessions.length > 0 ? (
                    <div className="space-y-3">
                        {recentSessions.map((session) => (
                            <div
                                key={session.id}
                                className="p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-teal-500/20 rounded-lg">
                                        <Sparkles className="w-4 h-4 text-teal-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{session.topic || 'Untitled Session'}</p>
                                        <p className="text-sm text-slate-400 truncate">{session.question}</p>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                            <span>{session.assumptions.length} assumptions</span>
                                            <span>{session.evidenceNotes?.length || 0} evidence notes</span>
                                            {session.beliefRevision && (
                                                <span className="text-amber-400">Belief revised</span>
                                            )}
                                        </div>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-700 text-center">
                        <Target className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">No sessions yet</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Start your first reasoning session to begin tracking your thinking growth.
                        </p>
                        <Link
                            to="/student/reasoning"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-xl font-medium transition-colors"
                        >
                            Start Reasoning
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

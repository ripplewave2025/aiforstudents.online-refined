import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Users,
    HelpCircle,
    RefreshCw,
    VolumeX,
    Compass,
    Heart,
    MessageSquare,
    ChevronRight
} from 'lucide-react';

// Mock class data - in production, fetch from Supabase
const mockClassData = {
    className: '8A Critical Thinking',
    totalStudents: 28,
    silenceZones: [
        { studentName: 'Student A', daysSinceQuestion: 5 },
        { studentName: 'Student B', daysSinceQuestion: 4 },
    ],
    confusionClusters: [
        { topic: 'Scientific Method', confusedCount: 8, avgRevisions: 2.3 },
        { topic: 'Logical Fallacies', confusedCount: 6, avgRevisions: 1.8 },
    ],
    revisionMoments: [
        { studentName: 'Tenzin D.', topic: 'Climate Change', reason: 'Realized it\'s about psychology' },
        { studentName: 'Pema T.', topic: 'Evolution', reason: 'Changed view on timescales' },
        { studentName: 'Dawa L.', topic: 'Economics', reason: 'Understood supply/demand link' },
    ],
    weeklyThemes: [
        { theme: 'Environmental Science', count: 12 },
        { theme: 'History', count: 8 },
        { theme: 'Technology Ethics', count: 5 },
    ]
};

// Pattern Card - what we notice, not what we measure
const PatternCard = ({ icon: Icon, title, color, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-slate-900/50 border ${color} rounded-2xl p-6`}
    >
        <h3 className="font-bold mb-4 flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
        </h3>
        {children}
    </motion.div>
);

export const ClassInsightsPage = () => {
    const data = mockClassData;

    return (
        <div className="max-w-5xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                    <Compass className="w-8 h-8 text-teal-400" />
                    Class Learning Patterns
                </h1>
                <p className="text-slate-400">
                    {data.className} • {data.totalStudents} students
                </p>
                <p className="text-sm text-slate-500 mt-1">
                    See where students pause, question, and revise. No rankings — just patterns.
                </p>
            </motion.div>

            {/* Philosophy Reminder */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-pink-950/20 border border-pink-500/30 rounded-xl p-4 mb-8"
            >
                <p className="text-sm text-pink-200">
                    💝 <strong>Philosophy:</strong> These patterns help you understand your class, not rank them.
                    Silence might mean processing. Confusion might mean growth.
                </p>
            </motion.div>

            {/* Grid of Patterns */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Silence Zones */}
                <PatternCard
                    icon={VolumeX}
                    title="Silence Zones"
                    color="border-amber-500/30"
                >
                    <p className="text-sm text-slate-500 mb-4">
                        Students who haven't asked questions recently. They might need a gentle invitation.
                    </p>
                    {data.silenceZones.length === 0 ? (
                        <p className="text-slate-600 text-sm">Everyone is active! 🎉</p>
                    ) : (
                        <div className="space-y-2">
                            {data.silenceZones.map((student, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-amber-950/20 rounded-lg">
                                    <span className="text-amber-200">{student.studentName}</span>
                                    <span className="text-xs text-amber-400">{student.daysSinceQuestion} days</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="text-xs text-slate-600 mt-3 italic">
                        Consider: Private check-in, or adjusting the topic to their interests.
                    </p>
                </PatternCard>

                {/* Confusion Clusters */}
                <PatternCard
                    icon={HelpCircle}
                    title="Confusion Clusters"
                    color="border-purple-500/30"
                >
                    <p className="text-sm text-slate-500 mb-4">
                        Topics where many students paused or revised. This is where teaching might need adjustment.
                    </p>
                    {data.confusionClusters.length === 0 ? (
                        <p className="text-slate-600 text-sm">No major confusion clusters this week.</p>
                    ) : (
                        <div className="space-y-2">
                            {data.confusionClusters.map((cluster, i) => (
                                <div key={i} className="p-3 bg-purple-950/20 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-purple-200 font-medium">{cluster.topic}</span>
                                        <span className="text-xs text-purple-400">{cluster.confusedCount} students</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Avg {cluster.avgRevisions.toFixed(1)} revisions per student
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="text-xs text-slate-600 mt-3 italic">
                        Note: Revisions are signs of learning, not failure.
                    </p>
                </PatternCard>

                {/* Revision Moments */}
                <PatternCard
                    icon={RefreshCw}
                    title="Revision Moments"
                    color="border-emerald-500/30"
                >
                    <p className="text-sm text-slate-500 mb-4">
                        Times when students changed their thinking. These are learning breakthroughs.
                    </p>
                    {data.revisionMoments.length === 0 ? (
                        <p className="text-slate-600 text-sm">No revisions recorded yet this week.</p>
                    ) : (
                        <div className="space-y-2">
                            {data.revisionMoments.map((moment, i) => (
                                <div key={i} className="p-3 bg-emerald-950/20 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-200 font-medium">{moment.studentName}</span>
                                        <span className="text-xs text-slate-500">on {moment.topic}</span>
                                    </div>
                                    <p className="text-xs text-emerald-300 mt-1 italic">
                                        "{moment.reason}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="text-xs text-slate-600 mt-3 italic">
                        Celebrate these moments. They represent genuine growth.
                    </p>
                </PatternCard>

                {/* Weekly Meaning Themes */}
                <PatternCard
                    icon={Heart}
                    title="What Students Find Meaningful"
                    color="border-pink-500/30"
                >
                    <p className="text-sm text-slate-500 mb-4">
                        Topics that students chose to explore. This shows genuine curiosity.
                    </p>
                    {data.weeklyThemes.length === 0 ? (
                        <p className="text-slate-600 text-sm">No themes recorded yet this week.</p>
                    ) : (
                        <div className="space-y-2">
                            {data.weeklyThemes.map((theme, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-pink-950/20 rounded-lg">
                                    <span className="text-pink-200">{theme.theme}</span>
                                    <span className="text-xs text-pink-400">{theme.count} students</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="text-xs text-slate-600 mt-3 italic">
                        Use these themes to guide future lessons.
                    </p>
                </PatternCard>
            </div>

            {/* Warm Weekly Message Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 bg-gradient-to-br from-pink-950/30 to-purple-950/30 border border-pink-500/30 rounded-2xl p-6"
            >
                <h3 className="font-bold mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-pink-400" />
                    Warm Weekly Message
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                    Send a warm message to your class. The AI summarizes patterns, but you add the human touch.
                </p>
                <button className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium transition-colors">
                    Compose Message
                    <ChevronRight className="w-4 h-4" />
                </button>
            </motion.div>

            {/* Philosophy Note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center text-sm text-slate-500"
            >
                <p>
                    No student rankings. No performance scores. <br />
                    Just patterns that help you teach with more humanity.
                </p>
            </motion.div>
        </div>
    );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
    Users,
    Brain,
    TrendingUp,
    AlertTriangle,
    MessageSquare,
    RefreshCw,
    ChevronRight,
    Eye,
    BarChart3
} from 'lucide-react';

// Mock student data for MVP
const MOCK_STUDENTS = [
    {
        id: 's1',
        name: 'Tenzin Dorji',
        sessions: 8,
        avgAssumptions: 2.5,
        revisionRate: 0.6,
        lastActive: '2024-01-15',
        status: 'active'
    },
    {
        id: 's2',
        name: 'Pemba Sherpa',
        sessions: 5,
        avgAssumptions: 1.8,
        revisionRate: 0.4,
        lastActive: '2024-01-14',
        status: 'active'
    },
    {
        id: 's3',
        name: 'Karma Lhamu',
        sessions: 12,
        avgAssumptions: 3.2,
        revisionRate: 0.75,
        lastActive: '2024-01-15',
        status: 'active'
    },
    {
        id: 's4',
        name: 'Dawa Tamang',
        sessions: 3,
        avgAssumptions: 1.2,
        revisionRate: 0.33,
        lastActive: '2024-01-10',
        status: 'needs_attention'
    },
];

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`p-6 rounded-2xl border ${color}`}>
        <Icon className="w-6 h-6 mb-3" />
        <p className="text-3xl font-bold mb-1">{value}</p>
        <p className="text-sm opacity-70">{label}</p>
    </div>
);

const StudentRow = ({ student, onClick }) => (
    <motion.button
        onClick={onClick}
        className="w-full flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700 transition-colors text-left"
        whileHover={{ x: 4 }}
    >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            {student.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
                <h4 className="font-medium truncate">{student.name}</h4>
                {student.status === 'needs_attention' && (
                    <span className="w-2 h-2 bg-amber-500 rounded-full" />
                )}
            </div>
            <p className="text-xs text-slate-500">{student.sessions} sessions</p>
        </div>
        <div className="text-right text-sm">
            <p className="text-slate-400">{student.avgAssumptions.toFixed(1)} avg assumptions</p>
            <p className={`text-xs ${student.revisionRate > 0.5 ? 'text-emerald-400' : 'text-slate-500'}`}>
                {(student.revisionRate * 100).toFixed(0)}% revision rate
            </p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-500" />
    </motion.button>
);

export const TeacherDashboardPage = () => {
    const { user } = useAuth();
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Calculate class stats
    const totalSessions = MOCK_STUDENTS.reduce((s, st) => s + st.sessions, 0);
    const avgAssumptions = MOCK_STUDENTS.reduce((s, st) => s + st.avgAssumptions, 0) / MOCK_STUDENTS.length;
    const avgRevisionRate = MOCK_STUDENTS.reduce((s, st) => s + st.revisionRate, 0) / MOCK_STUDENTS.length;
    const needsAttention = MOCK_STUDENTS.filter(s => s.status === 'needs_attention').length;

    return (
        <div className="max-w-6xl mx-auto pb-20 md:pb-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Welcome, {user?.name?.split(' ')[0]} 👋
                </h1>
                <p className="text-slate-400">
                    Your class thinking dashboard
                </p>
            </motion.div>

            {/* Class Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={Users}
                    label="Students"
                    value={MOCK_STUDENTS.length}
                    color="bg-teal-950/30 border-teal-500/50 text-teal-300"
                />
                <StatCard
                    icon={MessageSquare}
                    label="Total Sessions"
                    value={totalSessions}
                    color="bg-blue-950/30 border-blue-500/50 text-blue-300"
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Avg Assumptions"
                    value={avgAssumptions.toFixed(1)}
                    color="bg-amber-950/30 border-amber-500/50 text-amber-300"
                />
                <StatCard
                    icon={RefreshCw}
                    label="Avg Revision Rate"
                    value={`${(avgRevisionRate * 100).toFixed(0)}%`}
                    color="bg-purple-950/30 border-purple-500/50 text-purple-300"
                />
            </div>

            {/* Attention Needed */}
            {needsAttention > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-amber-950/20 border-2 border-amber-500/30 rounded-2xl p-6 mb-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-500/20 rounded-xl">
                            <AlertTriangle className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-amber-300">
                                {needsAttention} student{needsAttention > 1 ? 's' : ''} may need support
                            </h3>
                            <p className="text-sm text-amber-200/70">
                                Low engagement or reasoning depth detected
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Student List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                >
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-teal-400" />
                        Class 8A Students
                    </h3>
                    <div className="space-y-3">
                        {MOCK_STUDENTS.map(student => (
                            <StudentRow
                                key={student.id}
                                student={student}
                                onClick={() => setSelectedStudent(student)}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                >
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <a
                                href="/teacher/class"
                                className="flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors"
                            >
                                <BarChart3 className="w-5 h-5 text-teal-400" />
                                <span>View Class Insights</span>
                            </a>
                            <a
                                href="/teacher/artifacts"
                                className="flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors"
                            >
                                <Eye className="w-5 h-5 text-purple-400" />
                                <span>Review Artifacts</span>
                            </a>
                        </div>
                    </div>

                    {/* Facilitation Tips */}
                    <div className="bg-teal-950/20 border border-teal-500/30 rounded-2xl p-6">
                        <h3 className="font-bold text-teal-300 mb-3 flex items-center gap-2">
                            <Brain className="w-5 h-5" />
                            Facilitation Tip
                        </h3>
                        <p className="text-sm text-teal-200/80 mb-3">
                            "When a student uses AI well, praise the <strong>question</strong> they asked,
                            not the output they received. This reinforces thinking, not dependency."
                        </p>
                        <p className="text-xs text-teal-400/60">
                            — Critical Thinking First Principle
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Student Detail Modal */}
            {selectedStudent && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedStudent(null)}
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                                {selectedStudent.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                                <p className="text-sm text-slate-400">Last active: {selectedStudent.lastActive}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
                                <p className="text-2xl font-bold">{selectedStudent.sessions}</p>
                                <p className="text-xs text-slate-400">Sessions</p>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
                                <p className="text-2xl font-bold">{selectedStudent.avgAssumptions.toFixed(1)}</p>
                                <p className="text-xs text-slate-400">Avg Assumptions</p>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
                                <p className="text-2xl font-bold">{(selectedStudent.revisionRate * 100).toFixed(0)}%</p>
                                <p className="text-xs text-slate-400">Revision Rate</p>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
                                <p className="text-2xl font-bold capitalize">{selectedStudent.status.replace('_', ' ')}</p>
                                <p className="text-xs text-slate-400">Status</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedStudent(null)}
                            className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Mail,
    Download,
    Search,
    Brain,
    TrendingUp,
    Star,
    Calendar,
    Eye,
    Send
} from 'lucide-react';

// Mock parent data
const MOCK_PARENTS = [
    {
        id: 'p1',
        name: 'Mr. Dorji Family',
        students: [
            { name: 'Tenzin Dorji', grade: '8A', ctIndex: 72, sessions: 15, interests: ['Science', 'Technology'] }
        ],
        email: 'dorji.family@email.com',
        lastSent: '2024-01-10'
    },
    {
        id: 'p2',
        name: 'Sherpa Family',
        students: [
            { name: 'Pemba Sherpa', grade: '8A', ctIndex: 58, sessions: 8, interests: ['Arts', 'Music'] }
        ],
        email: 'sherpa.family@email.com',
        lastSent: '2024-01-05'
    },
    {
        id: 'p3',
        name: 'Tamang Family',
        students: [
            { name: 'Dawa Tamang', grade: '8A', ctIndex: 45, sessions: 5, interests: ['Sports'] },
            { name: 'Karma Tamang', grade: '6B', ctIndex: 62, sessions: 12, interests: ['Mathematics'] }
        ],
        email: 'tamang.family@email.com',
        lastSent: null
    }
];

const generateParentSummary = (parent) => {
    const summary = {
        generatedAt: new Date().toISOString(),
        family: parent.name,
        students: parent.students.map(s => ({
            name: s.name,
            grade: s.grade,
            criticalThinkingIndex: s.ctIndex,
            totalSessions: s.sessions,
            interests: s.interests,
            status: s.ctIndex >= 70 ? 'Excellent' : s.ctIndex >= 50 ? 'Good Progress' : 'Needs Support',
            recommendation: s.ctIndex >= 70
                ? 'Continue encouraging independent exploration'
                : s.ctIndex >= 50
                    ? 'Help them question assumptions in daily conversations'
                    : 'Spend more time discussing "why" questions together'
        }))
    };
    return summary;
};

const ParentCard = ({ parent, onGenerateReport, onPreview }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-5"
    >
        <div className="flex items-start justify-between mb-4">
            <div>
                <h3 className="font-bold">{parent.name}</h3>
                <p className="text-xs text-slate-400">{parent.email}</p>
            </div>
            {parent.lastSent && (
                <span className="text-xs text-slate-500">
                    Last sent: {new Date(parent.lastSent).toLocaleDateString()}
                </span>
            )}
        </div>

        {/* Students */}
        <div className="space-y-3 mb-4">
            {parent.students.map((student, i) => (
                <div key={i} className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-slate-500">Grade {student.grade}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${student.ctIndex >= 70 ? 'bg-emerald-500/20 text-emerald-300' :
                                student.ctIndex >= 50 ? 'bg-amber-500/20 text-amber-300' :
                                    'bg-red-500/20 text-red-300'
                            }`}>
                            CTI: {student.ctIndex}%
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {student.interests.map((interest, j) => (
                            <span key={j} className="px-2 py-0.5 bg-slate-700 rounded text-xs">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <div className="flex gap-2">
            <button
                onClick={() => onPreview(parent)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
            >
                <Eye className="w-4 h-4" />
                Preview
            </button>
            <button
                onClick={() => onGenerateReport(parent)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm transition-colors"
            >
                <Download className="w-4 h-4" />
                Download
            </button>
        </div>
    </motion.div>
);

export const ParentSummariesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [previewModal, setPreviewModal] = useState(null);

    const filteredParents = MOCK_PARENTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.students.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const downloadReport = (parent) => {
        const summary = generateParentSummary(parent);
        const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `parent_summary_${parent.name.replace(/\s+/g, '_').toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const previewReport = (parent) => {
        setPreviewModal(generateParentSummary(parent));
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                    <Users className="w-8 h-8 text-teal-400" />
                    Parent Summaries
                </h1>
                <p className="text-slate-400">
                    Generate and share student progress reports with parents
                </p>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative mb-6"
            >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by family or student name..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                />
            </motion.div>

            {/* Info banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-teal-950/30 border border-teal-500/30 rounded-xl p-4 mb-6"
            >
                <p className="text-sm text-teal-200">
                    💡 <strong>Parent summaries</strong> include critical thinking progress, interests discovered,
                    and personalized recommendations for supporting learning at home.
                </p>
            </motion.div>

            {/* Parents Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredParents.map((parent, i) => (
                    <motion.div
                        key={parent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <ParentCard
                            parent={parent}
                            onGenerateReport={downloadReport}
                            onPreview={previewReport}
                        />
                    </motion.div>
                ))}
            </div>

            {filteredParents.length === 0 && (
                <div className="text-center py-12">
                    <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Families Found</h3>
                    <p className="text-slate-400">Try a different search term.</p>
                </div>
            )}

            {/* Preview Modal */}
            {previewModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setPreviewModal(null)}
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">Parent Summary Preview</h2>
                        <p className="text-sm text-slate-400 mb-4">{previewModal.family}</p>

                        {previewModal.students.map((student, i) => (
                            <div key={i} className="p-4 bg-slate-800/50 rounded-xl mb-4">
                                <h3 className="font-bold mb-2">{student.name}</h3>
                                <p className="text-sm text-slate-400 mb-3">Grade {student.grade}</p>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="p-3 bg-slate-900/50 rounded-lg text-center">
                                        <p className="text-xl font-bold text-teal-400">{student.criticalThinkingIndex}%</p>
                                        <p className="text-xs text-slate-500">CT Index</p>
                                    </div>
                                    <div className="p-3 bg-slate-900/50 rounded-lg text-center">
                                        <p className="text-xl font-bold">{student.totalSessions}</p>
                                        <p className="text-xs text-slate-500">Sessions</p>
                                    </div>
                                </div>

                                <div className={`p-3 rounded-lg mb-3 ${student.status === 'Excellent' ? 'bg-emerald-950/30' :
                                        student.status === 'Good Progress' ? 'bg-amber-950/30' :
                                            'bg-red-950/30'
                                    }`}>
                                    <p className="text-sm font-medium mb-1">Status: {student.status}</p>
                                    <p className="text-xs text-slate-400">{student.recommendation}</p>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {student.interests.map((int, j) => (
                                        <span key={j} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">
                                            {int}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={() => setPreviewModal(null)}
                            className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                        >
                            Close Preview
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

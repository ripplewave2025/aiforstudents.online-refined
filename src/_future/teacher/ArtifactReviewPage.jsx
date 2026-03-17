import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ClipboardList,
    User,
    Eye,
    MessageSquare,
    ChevronRight,
    X,
    CheckCircle2,
    FileText,
    Sparkles,
    Compass,
    RefreshCw
} from 'lucide-react';

// Mock artifacts - in production, fetch from Supabase
const mockArtifacts = [
    {
        id: '1',
        studentName: 'Tenzin Dorji',
        topic: 'Climate Change',
        question: 'Why do some people not believe in climate change despite evidence?',
        date: '2024-01-15',
        status: 'pending',
        sessionData: {
            rawQuestion: 'Why don\'t people believe climate change?',
            refinedQuestion: 'Why do some people not believe in climate change despite evidence?',
            uncertaintyExpressed: true,
            beliefRevision: { reason: 'I realized it\'s more about psychology than information' }
        }
    },
    {
        id: '2',
        studentName: 'Pema Tshering',
        topic: 'Photosynthesis',
        question: 'How do plants create energy from sunlight?',
        date: '2024-01-14',
        status: 'reviewed',
        sessionData: {
            rawQuestion: 'How does photosynthesis work?',
            refinedQuestion: 'How do plants create energy from sunlight?',
            uncertaintyExpressed: false,
            beliefRevision: null
        },
        teacherNotes: 'Good exploration of the chemical process. Student showed genuine curiosity about the molecular level.'
    },
];

// Sensemaking Panel - what we observe, not what we score
const SensemakingPanel = ({ artifact, onClose }) => {
    const [teacherNotes, setTeacherNotes] = useState(artifact.teacherNotes || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // In production: save to Supabase
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsSaving(false);
        onClose();
    };

    const session = artifact.sessionData || {};

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">{artifact.studentName}</h2>
                            <p className="text-slate-400 text-sm">{artifact.topic}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Student's Question Journey */}
                <div className="p-6 border-b border-slate-700">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Compass className="w-5 h-5 text-teal-400" />
                        Student's Question Journey
                    </h3>

                    <div className="space-y-3">
                        {session.rawQuestion && session.rawQuestion !== session.refinedQuestion && (
                            <div className="p-3 bg-slate-800/50 rounded-lg">
                                <p className="text-xs text-slate-500 mb-1">Started with:</p>
                                <p className="text-sm text-slate-300">{session.rawQuestion}</p>
                            </div>
                        )}

                        <div className="p-3 bg-teal-950/30 border border-teal-500/30 rounded-lg">
                            <p className="text-xs text-teal-500 mb-1">Explored:</p>
                            <p className="text-teal-200">{artifact.question}</p>
                        </div>

                        {session.uncertaintyExpressed && (
                            <div className="flex items-center gap-2 text-sm text-purple-300">
                                <span className="px-2 py-1 bg-purple-500/20 rounded-full text-xs">
                                    🤔 Expressed uncertainty
                                </span>
                                <span className="text-slate-500">— a sign of intellectual honesty</span>
                            </div>
                        )}

                        {session.beliefRevision && (
                            <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <RefreshCw className="w-4 h-4 text-purple-400" />
                                    <p className="text-xs text-purple-400">Revised their thinking:</p>
                                </div>
                                <p className="text-purple-200 text-sm">"{session.beliefRevision.reason}"</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Observation (what AI noticed, not judged) */}
                <div className="p-6 border-b border-slate-700">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        What We Noticed
                    </h3>
                    <p className="text-sm text-slate-400 mb-3">
                        These are observations, not evaluations.
                    </p>
                    <div className="space-y-2 text-sm">
                        {session.rawQuestion !== session.refinedQuestion && (
                            <p className="text-slate-300">• Question evolved from raw form to more specific</p>
                        )}
                        {session.uncertaintyExpressed && (
                            <p className="text-slate-300">• Student was comfortable saying "I'm not sure"</p>
                        )}
                        {session.beliefRevision && (
                            <p className="text-slate-300">• Thinking changed after exploration</p>
                        )}
                        {!session.beliefRevision && !session.uncertaintyExpressed && (
                            <p className="text-slate-300">• Student engaged with the question directly</p>
                        )}
                    </div>
                </div>

                {/* Teacher Notes - human voice, not scores */}
                <div className="p-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-pink-400" />
                        Your Notes
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">
                        Share an observation or encouragement. No scores needed.
                    </p>
                    <textarea
                        value={teacherNotes}
                        onChange={(e) => setTeacherNotes(e.target.value)}
                        placeholder="What did you notice about this student's thinking?"
                        className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-white resize-none min-h-[100px] focus:outline-none focus:border-pink-500"
                    />

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            {isSaving ? 'Saving...' : (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Save Notes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Artifact Card - no stars, no scores
const ArtifactCard = ({ artifact, onReview }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
    >
        <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center font-bold">
                    {artifact.studentName.charAt(0)}
                </div>
                <div>
                    <h4 className="font-medium">{artifact.studentName}</h4>
                    <p className="text-sm text-slate-400">{artifact.topic}</p>
                </div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${artifact.status === 'pending'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                {artifact.status === 'pending' ? 'New' : 'Reviewed'}
            </span>
        </div>

        <p className="text-sm text-slate-300 mt-3 line-clamp-2">{artifact.question}</p>

        <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-slate-500">{artifact.date}</span>
            <button
                onClick={() => onReview(artifact)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium transition-colors"
            >
                <Eye className="w-4 h-4" />
                View
            </button>
        </div>
    </motion.div>
);

export const ArtifactReviewPage = () => {
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredArtifacts = mockArtifacts.filter(a =>
        filterStatus === 'all' ? true : a.status === filterStatus
    );

    return (
        <div className="max-w-4xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                    <ClipboardList className="w-8 h-8 text-teal-400" />
                    Student Sensemaking
                </h1>
                <p className="text-slate-400">
                    See how your students are thinking. Notice, don't score.
                </p>
            </motion.div>

            {/* Philosophy Reminder */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-pink-950/20 border border-pink-500/30 rounded-xl p-4 mb-6"
            >
                <p className="text-sm text-pink-200">
                    💝 <strong>Remember:</strong> We observe where students pause, question, and revise.
                    There are no scores — only patterns that help us understand.
                </p>
            </motion.div>

            {/* Filter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 mb-6"
            >
                {['all', 'pending', 'reviewed'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === status
                                ? 'bg-teal-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </motion.div>

            {/* Artifacts List */}
            <div className="space-y-4">
                {filteredArtifacts.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>No student work to review yet.</p>
                    </div>
                ) : (
                    filteredArtifacts.map(artifact => (
                        <ArtifactCard
                            key={artifact.id}
                            artifact={artifact}
                            onReview={setSelectedArtifact}
                        />
                    ))
                )}
            </div>

            {/* Sensemaking Panel Modal */}
            {selectedArtifact && (
                <SensemakingPanel
                    artifact={selectedArtifact}
                    onClose={() => setSelectedArtifact(null)}
                />
            )}
        </div>
    );
};

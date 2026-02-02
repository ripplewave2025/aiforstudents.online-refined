import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Calendar,
    Plus,
    Edit3,
    Trash2,
    X,
    CheckCircle2,
    Sparkles,
    Heart
} from 'lucide-react';

// Weekly prompt - the core ritual
const WEEKLY_PROMPT = "What are 4 things you did this week that felt meaningful to you — and why did you choose them?";

const ReflectionCard = ({ reflection, onEdit, onDelete }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5"
    >
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400">
                    {new Date(reflection.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    })}
                </span>
            </div>
            <div className="flex gap-1">
                <button onClick={onEdit} className="p-1 text-slate-500 hover:text-white">
                    <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={onDelete} className="p-1 text-slate-500 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>

        <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{reflection.content}</p>

        {reflection.tags && reflection.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
                {reflection.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                        #{tag}
                    </span>
                ))}
            </div>
        )}
    </motion.div>
);

export const ReflectionLogPage = () => {
    const [reflections, setReflections] = useState(() => {
        const saved = localStorage.getItem('ct_reflections');
        return saved ? JSON.parse(saved) : [];
    });
    const [isWriting, setIsWriting] = useState(false);
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [editingId, setEditingId] = useState(null);

    // Save reflections to localStorage
    useEffect(() => {
        localStorage.setItem('ct_reflections', JSON.stringify(reflections));
    }, [reflections]);

    // Start new reflection
    const startReflection = () => {
        setIsWriting(true);
    };

    // Save reflection
    const saveReflection = () => {
        if (!content.trim()) return;

        const reflection = {
            id: editingId || `ref_${Date.now()}`,
            date: new Date().toISOString(),
            prompt: WEEKLY_PROMPT,
            content: content.trim(),
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            isWeekly: true
        };

        if (editingId) {
            setReflections(reflections.map(r => r.id === editingId ? reflection : r));
        } else {
            setReflections([reflection, ...reflections]);
        }

        // Reset form
        setContent('');
        setTags('');
        setIsWriting(false);
        setEditingId(null);
    };

    // Edit reflection
    const editReflection = (reflection) => {
        setEditingId(reflection.id);
        setContent(reflection.content);
        setTags(reflection.tags?.join(', ') || '');
        setIsWriting(true);
    };

    // Delete reflection
    const deleteReflection = (id) => {
        setReflections(reflections.filter(r => r.id !== id));
    };

    // Check if reflected this week
    const hasReflectedThisWeek = () => {
        if (reflections.length === 0) return false;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return reflections.some(r => new Date(r.date) > oneWeekAgo);
    };

    const reflectedThisWeek = hasReflectedThisWeek();

    return (
        <div className="max-w-4xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                    <Heart className="w-8 h-8 text-pink-400" />
                    Weekly Meaning Reflection
                </h1>
                <p className="text-slate-400">
                    Once a week, pause and notice what mattered to you.
                </p>
            </motion.div>

            {/* Weekly Status */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-2xl mb-8 ${reflectedThisWeek
                        ? 'bg-emerald-950/30 border-2 border-emerald-500/30'
                        : 'bg-pink-950/30 border-2 border-pink-500/30'
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${reflectedThisWeek ? 'bg-emerald-500/20' : 'bg-pink-500/20'
                        }`}>
                        {reflectedThisWeek ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                            <Sparkles className="w-6 h-6 text-pink-400" />
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className={`font-bold ${reflectedThisWeek ? 'text-emerald-200' : 'text-pink-200'}`}>
                            {reflectedThisWeek
                                ? "You've reflected this week ✨"
                                : "Time for your weekly reflection"
                            }
                        </h3>
                        <p className="text-sm text-slate-400">
                            {reflectedThisWeek
                                ? "Your thoughts are recorded. Come back next week."
                                : "Take a few minutes to think about what mattered."
                            }
                        </p>
                    </div>
                    {!isWriting && !reflectedThisWeek && (
                        <button
                            onClick={startReflection}
                            className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium transition-colors"
                        >
                            Reflect Now
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Writing Area */}
            {isWriting && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 mb-8"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">
                            {editingId ? 'Edit Reflection' : 'This Week\'s Reflection'}
                        </h3>
                        <button onClick={() => { setIsWriting(false); setEditingId(null); setContent(''); }}>
                            <X className="w-5 h-5 text-slate-400 hover:text-white" />
                        </button>
                    </div>

                    {/* Weekly Prompt */}
                    <div className="p-4 bg-pink-950/30 border border-pink-500/30 rounded-xl mb-4">
                        <p className="text-sm text-pink-200">{WEEKLY_PROMPT}</p>
                    </div>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="1. Something that felt meaningful...
2. Another thing...
3. ...
4. ..."
                        className="w-full px-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-pink-500 transition-colors min-h-[200px] resize-none mb-4"
                        autoFocus
                    />

                    {/* Tags (optional, no pressure) */}
                    <div className="mb-4">
                        <label className="block text-sm text-slate-400 mb-2">
                            Themes (optional - helps you find patterns later)
                        </label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="family, learning, creativity..."
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-pink-500 transition-colors"
                        />
                    </div>

                    <button
                        onClick={saveReflection}
                        disabled={!content.trim()}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-700 disabled:text-slate-400 rounded-xl font-medium transition-colors"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        Save Reflection
                    </button>
                </motion.div>
            )}

            {/* Start button if not writing and not reflected this week */}
            {!isWriting && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3 mb-8"
                >
                    <button
                        onClick={startReflection}
                        className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        {reflectedThisWeek ? 'Add Another Thought' : 'Start Weekly Reflection'}
                    </button>
                </motion.div>
            )}

            {/* Past Reflections */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-slate-400" />
                    Your Reflections
                </h3>

                <div className="space-y-4">
                    {reflections.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <Heart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Your Story Starts Here</h3>
                            <p className="text-slate-400 mb-4">
                                Write your first weekly reflection to begin.
                            </p>
                        </motion.div>
                    ) : (
                        reflections.map((reflection) => (
                            <ReflectionCard
                                key={reflection.id}
                                reflection={reflection}
                                onEdit={() => editReflection(reflection)}
                                onDelete={() => deleteReflection(reflection.id)}
                            />
                        ))
                    )}
                </div>
            </motion.div>

            {/* Philosophy Note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center text-sm text-slate-500"
            >
                <p>
                    No streaks. No pressure. <br />
                    Just noticing what matters to you.
                </p>
            </motion.div>
        </div>
    );
};

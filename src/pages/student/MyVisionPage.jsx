import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    Sparkles,
    Star,
    Plus,
    X,
    Edit3,
    TrendingUp,
    Calendar,
    Heart,
    BookOpen,
    Lightbulb,
    Compass,
    Award
} from 'lucide-react';

// Interest categories with icons
const INTEREST_CATEGORIES = [
    { id: 'science', label: 'Science & Nature', icon: '🔬', color: 'bg-emerald-500' },
    { id: 'math', label: 'Mathematics', icon: '📐', color: 'bg-blue-500' },
    { id: 'arts', label: 'Arts & Creativity', icon: '🎨', color: 'bg-pink-500' },
    { id: 'technology', label: 'Technology', icon: '💻', color: 'bg-purple-500' },
    { id: 'literature', label: 'Literature & Writing', icon: '📚', color: 'bg-amber-500' },
    { id: 'history', label: 'History & Culture', icon: '🏛️', color: 'bg-orange-500' },
    { id: 'sports', label: 'Sports & Health', icon: '⚽', color: 'bg-red-500' },
    { id: 'music', label: 'Music', icon: '🎵', color: 'bg-indigo-500' },
    { id: 'social', label: 'Social Sciences', icon: '🌍', color: 'bg-teal-500' },
    { id: 'business', label: 'Business & Economics', icon: '📊', color: 'bg-cyan-500' },
];

const InterestTag = ({ interest, onRemove, showRemove = true }) => {
    const category = INTEREST_CATEGORIES.find(c => c.id === interest.categoryId);
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${category?.color || 'bg-slate-600'} text-white`}
        >
            <span>{category?.icon}</span>
            <span>{interest.label}</span>
            {showRemove && (
                <button onClick={onRemove} className="ml-1 hover:bg-white/20 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                </button>
            )}
        </motion.div>
    );
};

const ScoreCard = ({ label, score, date, trend }) => (
    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
        <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">{label}</span>
            {trend && (
                <span className={`text-xs ${trend > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {trend > 0 ? '↑' : '→'} {Math.abs(trend)}%
                </span>
            )}
        </div>
        <p className="text-2xl font-bold">{score}</p>
        <p className="text-xs text-slate-500">{date}</p>
    </div>
);

export const MyVisionPage = () => {
    // Vision statement
    const [vision, setVision] = useState(() => {
        const saved = localStorage.getItem('ct_student_vision');
        return saved ? JSON.parse(saved) : {
            statement: '',
            updatedAt: null
        };
    });

    // Interests
    const [interests, setInterests] = useState(() => {
        const saved = localStorage.getItem('ct_student_interests');
        return saved ? JSON.parse(saved) : [];
    });

    // Score history (long-term tracking)
    const [scoreHistory, setScoreHistory] = useState(() => {
        const saved = localStorage.getItem('ct_score_history');
        return saved ? JSON.parse(saved) : [];
    });

    // Goals
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem('ct_student_goals');
        return saved ? JSON.parse(saved) : [];
    });

    // UI state
    const [isEditingVision, setIsEditingVision] = useState(false);
    const [tempVision, setTempVision] = useState('');
    const [isAddingInterest, setIsAddingInterest] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newInterestLabel, setNewInterestLabel] = useState('');
    const [isAddingGoal, setIsAddingGoal] = useState(false);
    const [newGoal, setNewGoal] = useState('');

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('ct_student_vision', JSON.stringify(vision));
    }, [vision]);

    useEffect(() => {
        localStorage.setItem('ct_student_interests', JSON.stringify(interests));
    }, [interests]);

    useEffect(() => {
        localStorage.setItem('ct_student_goals', JSON.stringify(goals));
    }, [goals]);

    // Save vision
    const saveVision = () => {
        setVision({
            statement: tempVision,
            updatedAt: new Date().toISOString()
        });
        setIsEditingVision(false);
    };

    // Add interest
    const addInterest = () => {
        if (!selectedCategory || !newInterestLabel.trim()) return;
        setInterests([...interests, {
            id: `int_${Date.now()}`,
            categoryId: selectedCategory,
            label: newInterestLabel.trim(),
            addedAt: new Date().toISOString()
        }]);
        setNewInterestLabel('');
        setSelectedCategory(null);
        setIsAddingInterest(false);
    };

    // Remove interest
    const removeInterest = (id) => {
        setInterests(interests.filter(i => i.id !== id));
    };

    // Add goal
    const addGoal = () => {
        if (!newGoal.trim()) return;
        setGoals([...goals, {
            id: `goal_${Date.now()}`,
            text: newGoal.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        }]);
        setNewGoal('');
        setIsAddingGoal(false);
    };

    // Toggle goal
    const toggleGoal = (id) => {
        setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
    };

    // Delete goal
    const deleteGoal = (id) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    // Calculate thinking streak from localStorage
    const getThinkingStats = () => {
        const logs = JSON.parse(localStorage.getItem('ct_reasoning_logs') || '[]');
        const reflections = JSON.parse(localStorage.getItem('ct_reflections') || '[]');
        return {
            totalSessions: logs.length,
            totalReflections: reflections.length,
            totalQuestions: logs.length
        };
    };

    const stats = getThinkingStats();

    return (
        <div className="max-w-4xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                    <Compass className="w-8 h-8 text-purple-400" />
                    My Vision & Growth
                </h1>
                <p className="text-slate-400">
                    Track your interests, goals, and journey over time.
                </p>
            </motion.div>

            {/* Vision Statement */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-purple-950/40 to-pink-950/40 border border-purple-500/30 rounded-2xl p-6 mb-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-400" />
                        My Vision Statement
                    </h2>
                    {!isEditingVision && (
                        <button
                            onClick={() => { setTempVision(vision.statement); setIsEditingVision(true); }}
                            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {isEditingVision ? (
                    <div>
                        <textarea
                            value={tempVision}
                            onChange={(e) => setTempVision(e.target.value)}
                            placeholder="What do you want to become? What impact do you want to make? Write your vision for your future..."
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors min-h-[120px] resize-none"
                            autoFocus
                        />
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={saveVision}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition-colors"
                            >
                                Save Vision
                            </button>
                            <button
                                onClick={() => setIsEditingVision(false)}
                                className="px-4 py-2 text-slate-400 hover:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : vision.statement ? (
                    <div>
                        <p className="text-lg text-purple-100 leading-relaxed italic">
                            "{vision.statement}"
                        </p>
                        {vision.updatedAt && (
                            <p className="text-xs text-purple-400/60 mt-3">
                                Last updated: {new Date(vision.updatedAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => setIsEditingVision(true)}
                        className="w-full py-8 border-2 border-dashed border-purple-500/30 rounded-xl text-purple-300 hover:border-purple-500/50 transition-colors"
                    >
                        <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <span>Click to write your vision statement</span>
                    </button>
                )}
            </motion.div>

            {/* Interests */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-400" />
                        My Interests
                    </h2>
                    <button
                        onClick={() => setIsAddingInterest(true)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                </div>

                {interests.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {interests.map(interest => (
                            <InterestTag
                                key={interest.id}
                                interest={interest}
                                onRemove={() => removeInterest(interest.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 text-sm">No interests added yet. What excites you?</p>
                )}

                {/* Add Interest Modal */}
                {isAddingInterest && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                            {INTEREST_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`p-2 rounded-lg text-center text-sm transition-all ${selectedCategory === cat.id
                                            ? `${cat.color} text-white`
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                        }`}
                                >
                                    <span className="text-lg">{cat.icon}</span>
                                    <p className="text-xs mt-1">{cat.label.split(' ')[0]}</p>
                                </button>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={newInterestLabel}
                            onChange={(e) => setNewInterestLabel(e.target.value)}
                            placeholder="Specific interest (e.g., Astronomy, Painting, Coding)"
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg mb-3 focus:outline-none focus:border-teal-500"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={addInterest}
                                disabled={!selectedCategory || !newInterestLabel.trim()}
                                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-400 rounded-lg font-medium transition-colors"
                            >
                                Add Interest
                            </button>
                            <button
                                onClick={() => { setIsAddingInterest(false); setSelectedCategory(null); setNewInterestLabel(''); }}
                                className="px-4 py-2 text-slate-400 hover:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Goals */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-400" />
                        My Goals
                    </h2>
                    <button
                        onClick={() => setIsAddingGoal(true)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                </div>

                {goals.length > 0 ? (
                    <div className="space-y-2">
                        {goals.map(goal => (
                            <div
                                key={goal.id}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${goal.completed ? 'bg-emerald-950/30' : 'bg-slate-800/50'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleGoal(goal.id)}
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${goal.completed
                                            ? 'bg-emerald-500 border-emerald-500'
                                            : 'border-slate-600 hover:border-teal-500'
                                        }`}
                                >
                                    {goal.completed && <span className="text-xs">✓</span>}
                                </button>
                                <span className={goal.completed ? 'line-through text-slate-500' : ''}>
                                    {goal.text}
                                </span>
                                <button
                                    onClick={() => deleteGoal(goal.id)}
                                    className="ml-auto p-1 text-slate-500 hover:text-red-400"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 text-sm">No goals yet. What do you want to achieve?</p>
                )}

                {isAddingGoal && (
                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            placeholder="Enter a goal..."
                            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-teal-500"
                            autoFocus
                            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                        />
                        <button
                            onClick={addGoal}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg font-medium transition-colors"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => { setIsAddingGoal(false); setNewGoal(''); }}
                            className="px-4 py-2 text-slate-400 hover:text-white"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </motion.div>

            {/* Achievement Scores */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
            >
                <h2 className="font-bold flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-teal-400" />
                    My Journey Stats
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <ScoreCard label="Thinking Sessions" score={stats.totalSessions} date="All time" />
                    <ScoreCard label="Reflections" score={stats.totalReflections} date="All time" />
                    <ScoreCard label="Questions Asked" score={stats.totalQuestions} date="All time" />
                    <ScoreCard label="Interests" score={interests.length} date="Current" />
                </div>

                <div className="p-4 bg-teal-950/30 border border-teal-500/30 rounded-xl">
                    <p className="text-sm text-teal-200">
                        💡 <strong>Keep Growing!</strong> Your journey is being tracked.
                        Come back years from now to see how far you've come.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
